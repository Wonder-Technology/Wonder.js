/*
 * seajs(CMD) Module combo pulgin for gulp
 * Author : chenmnkken@gmail.com
 * Date : 2015-03-30
 */

var Promise = require( 'promise' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    through = require( 'through2' ),
    gutil = require( 'gulp-util' ),
    execPlugins = require( './lib/execplugins' ),
    //by yyc
    path = require('path'),
    fileOperator = require('../../gulp_plugin/lib/fileOperator'),

    rFirstStr = /[\s\r\n\=]/,
    rDefine = /define\(\s*(['"](.+?)['"],)?/,
    rDeps = /(['"])(.+?)\1/g,
    rAlias = /alias\s*\:([^\}]+)\}/,
    rPaths = /paths\s*\:([^\}]+)\}/,
    rVars = /vars\s*\:([^\}]+)\}/,
    rVar = /\{([^{]+)}/g,
    rSeajsConfig = /seajs\.config\([^\)]+\);?/g,
    rModId = /([^\\\/?]+?)(\.(?:js))?([\?#].*)?$/,
    rQueryHash = /[\?#].*$/,
    rExistId = /define\(\s*['"][^\[\('"\{\r\n]+['"]\s*,?/,
    rSeajsUse = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*seajs\.use|(?:^|[^$])\bseajs\.use\s*\((.+)/g,

    rRequire = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;

const PLUGIN_NAME = 'gulp-seajs-cmobo';

/*
 * 过滤忽略模块
 * param { Array } 忽略模块列表
 * param { String } 模块名
 * param { String } 模块标识
 * return { Boolean } 是否在忽略列表中
 */
var filterIgnore = function( ignore, id, origId ){
        return ignore.some(function( item ){
            var arr;

            // 含路径的模块id只过滤精确匹配的结果
            if( ~item.indexOf('/') ){
                return item === origId;
            }
            // 不含路径的模块id将过滤所有匹配结果
            // ui 将匹配 ../ui 和 ../../ui
            else{
                // 使用id过滤忽略模块时要去掉自动添加的 gulp-seajs-combo
                if( ~id.indexOf(PLUGIN_NAME) ){
                    arr = id.split( '_' );
                    id = arr.slice( 0, -2 ).join( '_' );
                }

                return item === id;
            }
        });
    },

    /*
     * 初始化插件
     * param { Object } 老配置对象
     * param { Object } 新忽略列表
     */
    initPlugins = function( options, o ){
        var name;

        o.plugins = {};

        options.plugins.forEach(function( item ){
            item.ext.forEach(function( name ){
                o.plugins[ name ] = item.use;
            });
        });
    },

    /*
     * 提取config中的配置，会忽略包含变量的配置，只提取纯字符串
     * param{ String } config字符串
     * return{ Object } 提取出来的配置
     */
    evalConfig = function( configStr ){
        var configArr = configStr,
            config = {};

        configStr = configStr.replace( /\{/, '' );
        configArr = configStr.split( ',' );

        configArr.forEach(function( item ){
            var index, arr, key, value;

            index = item.indexOf( ':' );
            key = item.slice( 0, index ).replace( /['"]/g, '' );
            value = item.slice( index + 1 );

            key = key.trim();
            value = value.trim();

            try{
                value = eval( '(function(){return ' + value +'})()' );
                config[ key ] = value;
            }
            catch( _ ){}
        });

        return config;
    },

    /*
     * 解析config字符串，尝试提取alias、paths、vars
     * param{ String } 文件内容
     * return{ Object } 提取出来的配置和提取后的文件内容
     */
    parseConfig = function( contents ){
        var config = {};

        contents = contents.replace( rSeajsConfig, function( $ ){
            $.replace( rAlias, function( _, $1 ){
                config.alias = evalConfig( $1 );
            });

            $.replace( rPaths, function( _, $1 ){
                config.paths = evalConfig( $1 );
            });

            $.replace( rVars, function( _, $1 ){
                config.vars = evalConfig( $1 );
            });

            return '';
        });

        return {
            contents : contents,
            config : config
        }
    },

    /*
     * 基于base将依赖模块的相对路径转化成绝对路径
     * 同时对seajs.config中的paths、alias、vars，还有options.map进行处理
     * param { Object } 数据存储对象
     * param { Array } 依赖模块的相对路径列表
     * param { String } 基础路径
     * return { Array } 依赖模块的绝对路径列表
     */
    mergePath = function( options, deps, base ){
        var config = options.config;

        return deps.map(function( item, i ){
            var origId = item.origId,
                arr, modId;

            // 防止多次merge
            if( item.path ){
                return;
            }

            // 处理build.json => map
            if( options.map && options.map[origId] ){
                origId = options.map[ origId ];
            }

            // 处理seajs.config => vars
            if( config.vars ){
                if( ~origId.indexOf('{') ){
                    origId = origId.replace( rVar, function( $, $1 ){
                        if( config.vars[$1] ){
                            return config.vars[$1];
                        }

                        return $;
                    });
                }
            }

            // 处理seajs.config => alias
            if( config.alias && config.alias[origId] ){
                origId = config.alias[ origId ];
            }

            // 处理seajs.config => paths
            if( config.paths ){
                arr = origId.split( '/' );
                modId = arr.splice( arr.length - 1, 1 );

                arr.forEach(function( _item, i ){
                    if( config.paths[_item] ){
                        arr[i] = config.paths[ _item ];
                    }
                });

                arr = arr.concat( modId );
                origId = arr.join( '/' );
            }

            return {
                id : item.id,
                extName : item.extName,
                path : path.resolve( base, origId ),
                origId : origId
            };
        });
    },

    /*
     * 解析模块标识
     * param { Object } 配置参数
     * param { String } 模块标识
     * return { Object } filePath: 过滤query和hash后的模块标识,id: 模块id,extName: 模块后缀
     */
    modPathResolve = function( options, filePath ){
        // 过滤query(?)和hash(#)
        filePath = filePath.replace( rQueryHash, '' );

        var id = filePath.match( rModId )[1],
            extName = path.extname( filePath );

        if( extName && extName === '.js' ){
            id = id.replace( extName, '' );
        }

        return {
            id : id,
            path : filePath,
            extName : extName
        };
    },

    /*
     * 解析依赖模块列表，如果有依赖模块则开始解析依赖模块
     * param { Object } 配置参数
     * param { Array } 依赖模块
     * param { promise }
     */
    readDeps = function( options, parentDeps ){
        var childDeps = [];

        promiseArr = parentDeps.map(function( item ){
            return new Promise(function( resolve, reject ){
                var id = item.id,
                    extName = item.extName,
                    filePath = item.path,
                    origId = item.origId,
                    contents, stream, plugins, deps, isIgnore;

                isIgnore = options.ignore ?
                    filterIgnore( options.ignore, id, origId ) :
                    false;

                // 检测该模块是否在忽略列表中
                if( isIgnore ){
                    options.modArr.push({
                        id : id,
                        path : filePath,
                        contents : '',
                        extName : extName,
                        origId : origId
                    });

                    resolve();
                    return;
                }

                // 处理特殊的模块，如 tpl 模块（需额外的插件支持）
                // 根据模块后缀来匹配是否使用插件
                if( extName && !~extName.indexOf('.js') ){
                    if( options.plugins && options.plugins[extName] ){
                        plugins = options.plugins[extName];

                        if( !plugins ){
                            reject( "Can't combo unkonwn module [" + filePath + "]" );
                            return;
                        }
                    }

                    // 有插件则执行插件
                    stream = execPlugins( filePath, plugins );

                    stream.on( 'end', function(){
                        resolve();
                    });

                    stream.pipe( through.obj(function( file, enc, _callback ){
                        parseDeps( options, file.contents.toString(), item );

                        //contents = file.contents.toString();
                        //
                        //deps = parseDeps( options, contents, item );
                        //
                        //if( deps.length ){
                        //    childDeps = childDeps.concat( deps );
                        //}



                        _callback( null, file );
                    }));
                }
                //// 处理普通的js模块
                else{
                    if( !extName && filePath.slice(-3) !== '.js' ){
                        filePath += '.js'
                    }

                    try{
                        contents = fs.readFileSync( filePath, options.encoding );
                    }
                    catch( _ ){
                        reject( "File [" + filePath + "] not found." );
                        return;
                    }

                    deps = parseDeps( options, contents, item );

                    if( deps.length ){
                        childDeps = childDeps.concat( deps );
                    }

                    resolve();
                }
            });
        });

        return Promise.all( promiseArr ).then(function(){
            if( childDeps.length ){
                return readDeps( options, childDeps );
            }
        }, function( err ){
            gutil.log( gutil.colors.red(PLUGIN_NAME + ' Error: ' + err) );
        })
        .catch(function( err ){
            gutil.log( gutil.colors.red( PLUGIN_NAME + ' error: ' + err.message) );
            console.log( err.stack );
        });
    },

    /*
     * 提取依赖模块
     * param { Object } 配置参数
     * param { RegExp } 提取正则
     * param { Object } 文件内容
     * return { Array } 依赖模块列表
     */
    pullDeps = function( options, reg, contents ){
        var deps = [],
            matches, origId;

        reg.lastIndex = 0;

        while( (matches = reg.exec(contents)) !== null ){
            origId = matches[2];

            if( origId && origId.slice(0, 4) !== 'http' ){
                depPathResult = modPathResolve( options, origId );

                deps.push({
                    id : depPathResult.id,
                    origId : depPathResult.path,
                    extName : depPathResult.extName
                });
            }
        }

        return deps;
    },

    /*
     * 解析依赖模块
     * param { Object } 配置参数
     * param { String } 文件内容
     * param { Object } 模块数据
     * return { Array } 依赖模块数据列表
     */
    parseDeps = function( options, contents, modData ){
        var isSeajsUse = !!~contents.indexOf( 'seajs.use(' ),
            id = modData.id,
            deps = [],
            configResult, name, base, matches;

        // 标准模块
        if( !isSeajsUse ){
            deps = pullDeps( options, rRequire, contents );
        }
        // 解析seajs.use
        else{
            configResult = parseConfig( contents );
            contents = configResult.contents;

            for( name in configResult.config ){
                options.config[ name ] = configResult.config[ name ];
            }

            matches = contents.match( rSeajsUse );

            matches.forEach(function( item ){
                var _deps = [];

                if( ~item.indexOf('seajs.use') ){
                    _deps = pullDeps( options, rDeps, item );
                    deps = deps.concat( _deps );
                }
            });
        }

        base = path.resolve( modData.path, '..' );
        deps = mergePath( options, deps, base );

        options.modArr.push({
            id : id,
            deps : deps,
            path : modData.path,
            contents : contents,
            extName : modData.extName,
            origId : modData.origId || id
        });

        return deps;
    },

    /*
     * 转换模块内容
     * param { Object } 配置参数
     * param { Object } 模块数据
     * param { Object } id映射表
     * return { String } 文件内容
     */
    transform = function( options, modData, idMap ){
        var contents = modData.contents,
            isSeajsUse = !!~contents.indexOf( 'seajs.use(' ),
            origId = modData.origId,
            deps = [];

        // 标准模块
        if( !isSeajsUse ){
            contents = contents.replace( rRequire, function( $, _, $2 ){
                var result = $,
                    depId, depOrigId, depPathResult, firstStr;

                if( $2 && $2.slice(0, 4) !== 'http' ){
                    depPathResult = modPathResolve( options, $2 );
                    firstStr = result.charAt( 0 );
                    depOrigId = depPathResult.path;
                    depId = idMap[ depOrigId ] || depPathResult.id;
                    deps.push( depId );

                    result = "require('" + depId + "')";

                    if( rFirstStr.test(firstStr) ){
                        result = firstStr + result;
                    }
                }

                return result;
            });

            // 为匿名模块添加模块名，同时将依赖列表添加到头部
            contents = contents.replace( rDefine, function(){
                var id = idMap[ origId ];

                return deps.length ?
                    "define('" + id + "',['" + deps.join("','") + "']," :
                    "define('" + id + "',";
            });
        }
        else{
            contents = contents.replace( rSeajsUse, function( $ ){
                var result = $;

                if( ~$.indexOf('seajs.use(') ){
                    result = $.replace( rDeps, function( $, _, $2 ){
                        var _result = $,
                            depPathResult, depId;

                        if( $2 && $2.slice(0, 4) !== 'http' ){
                            depPathResult = modPathResolve( options, $2 );
                            depId = depPathResult.id;

                            _result = "'" + depId + "'";
                        }

                        return _result;
                    });
                }

                return result;
            });
        }

        return contents;
    },

    /*
     * 合并模块内容
     * param { Object } 配置参数
     * return { String } 文件内容
     */
    comboContent = function( options ){
        var idUnique = {},
            pathUnique = {},
            contents = '',
            idMap = {},
            newModArr = [];

        options.modArr.forEach(function( item, i ){
            var obj = {},
                id = item.id,
                filePath = item.path;

            if( !pathUnique[filePath] ){
                pathUnique[ filePath ] = true;
                newModArr.push( item );

                if( idUnique[id] ){
                    id = id + '_' + PLUGIN_NAME + '_' + i;
                }
                else{
                    idUnique[id] = true;
                }

                idMap[ item.origId ] = id;
            }
        });

        newModArr.forEach(function( item ){
            var newContents = transform( options, item, idMap );
            if( newContents ){
                contents = newContents + '\n' + contents;
            }

            if( options.verbose ){
                gutil.log( 'gulp-seajs-combo:', '✔ Module [' + filePath + '] combo success.' );
            }
        });

        return new Buffer( contents );
    },

    /*
     * 解析模块的内容，如果有依赖模块则开始解析依赖模块
     * param { Object } 数据存储对象
     * param { String } 文件内容
     * param { String } 模块的绝对路径
     * param { promise }
     */
    parseContent = function( options, contents, filePath ){
        return new Promise(function( resolve ){
            var pathResult = modPathResolve( options, filePath ),
                deps = parseDeps( options, contents, pathResult );

            if( deps.length ){
                resolve( readDeps(options, deps) );
            }
            else{
                resolve();
            }
        });
    },

    // 插件入口函数
    createStream = function( options ){
        var o = {
                modArr : [],
                config : {},
                unique : {},
                uuid : 0,
                contents : '',
                encoding : 'UTF-8',
                verbose : !!~process.argv.indexOf( '--verbose' )
            };

        if( options ){
            if( options.ignore ){
                o.ignore = options.ignore;
            }

            if( options.map ){
                o.map = options.map;
            }

            if( options.encoding ){
                o.encoding = options.encoding;
            }

            if( options.plugins ){
                initPlugins( options, o );
            }
        }






        //add by yyc
        function extendDeep(parent, child) {
            var i = null,
                len = 0,
                toStr = Object.prototype.toString,
                sArr = "[object Array]",
                sOb = "[object Object]",
                type = "",
                _child = null;

            //数组的话，不获得Array原型上的成员。
            if (toStr.call(parent) === sArr) {
                _child = child || [];

                for (i = 0, len = parent.length; i < len; i++) {
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
            }
            //对象的话，要获得原型链上的成员。因为考虑以下情景：
            //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
            else if (toStr.call(parent) === sOb) {
                _child = child || {};

                for (i in parent) {
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
            }
            else {
                _child = parent;
            }

            return _child;
        }
        var backup = extendDeep(o);


        return through.obj(function( file, enc, callback ){
            if( file.isBuffer()){
                //edit by yyc
                //should restore in multi invoke case
                o = extendDeep(backup);

                parseContent( o, file.contents.toString(), file.path )
                    .then(function(){
                        var contents = comboContent( o );

                        //edit by yyc

                        //file.contents = contents;


                        var newFile = fileOperator.createFile(contents, file.dist);
                        //this.push(newFile);




                        //callback( null, file );
                        callback( null, newFile );
                    })
                    .catch(function( err ){
                        gutil.log( gutil.colors.red( PLUGIN_NAME + ' error: ' + err.message) );
                        console.log( err.stack );
                        callback( null, file );
                    });
            }
            else{
                callback( null, file );
            }
        }, function(callback){
            var t = 1;
            callback();
        });
    };

module.exports = createStream;
