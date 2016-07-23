var pathTool = (function () {
    return {
        getPathData:function(){
            //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
            var curWwwPath = window.document.location.href;
            //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPath = curWwwPath.substring(0, pos);
            //获取带"/"的项目名，如：/uimcardprj
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

            return {
                path:curWwwPath,
                rootPath:localhostPath,
                pathName:pathName
            }
        },
        /**
         * Joins two paths.
         *
         * @param path1 The first path.
         * @param path2 The second path.
         * @return The joined path.
         */
        join:function(path1, path2){
                if (!path1) {
                    return path2;
                }

                if (!path2) {
                    return path1;
                }

                var schemeMatch = path1.match(/^([^/]*?:)\//);
                var scheme = (schemeMatch && schemeMatch.length > 0) ? schemeMatch[1] : '';
                path1 = path1.substr(scheme.length);

                var urlPrefix;
                if (path1.indexOf('///') === 0 && scheme === 'file:') {
                    urlPrefix = '///';
                } else if (path1.indexOf('//') === 0) {
                    urlPrefix = '//';
                } else if (path1.indexOf('/') === 0) {
                    urlPrefix = '/';
                } else {
                    urlPrefix = '';
                }

                var trailingSlash = path2.slice(-1) === '/' ? '/' : '';

                var url1 = path1.split('/');
                var url2 = path2.split('/');
                var url3 = [];

                for (var i = 0, ii = url1.length; i < ii; ++i) {
                    if (url1[i] === '..') {
                        url3.pop();
                    } else if (url1[i] === '.' || url1[i] === '') {
                        continue;
                    } else {
                        url3.push(url1[i]);
                    }
                }

                for (var i = 0, ii = url2.length; i < ii; ++i) {
                    if (url2[i] === '..') {
                        url3.pop();
                    } else if (url2[i] === '.' || url2[i] === '') {
                        continue;
                    } else {
                        url3.push(url2[i]);
                    }
                }

                return scheme + urlPrefix + url3.join('/') + trailingSlash;
        }
    }
})();
