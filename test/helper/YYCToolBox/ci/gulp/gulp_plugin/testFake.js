var convertUtils = require("./convertUtils");

var single = {
    filePath: "/1.ejs",

    getFileContent: function () {
        return convertUtils.toString(function () {/*
         <!--#build:css:replace /aaa/dist/a.css#-->
         <link href="/pc/css/website/index/a.css" type="text/css" rel="stylesheet">
         <link href="/pc/css/website/a.css" type="text/css" rel="stylesheet">
         <!--#endbuild#-->

         <script type="text/javascript" >
         var jiathis_config={
         summary:"",
         shortUrl:false,
         hideMore:false
         }
         </script>

         <!--#build:js:replace /aaa/dist/no_cmd.js#-->
         <script src="/pc/js/bower_components/jquery/dist/jquery.js"></script>
         <script src="/pc/js/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
         <!--#endbuild#-->

         <script type="text/javascript" src="http://v3.jiathis.com/code_mini/jia.js" charset="utf-8"></script>


         <!--#build:js:seajsMain /aaa/dist/cmd.js #-->
         <script src="/pc/js/website/index/main.js"></script>
         <!--#endbuild#-->
         */
        });
    },
    getResourceMap: function () {
        return {
            "/1.ejs": [{
                command: 'replace',
                dist: 'dist/a.css',
                fileUrlArr: ['public/css/website/index/a.css', 'public/css/website/a.css'],
                startLine: 0,
                endLine: 240,
                type: 'css'
            }, {
                command: 'replace',
                dist: 'dist/no_cmd.js',
                fileUrlArr: ['public/js/bower_components/jquery/dist/jquery.js', 'public/js/bower_components/bootstrap/dist/js/bootstrap.min.js'],
                startLine: 415,
                endLine: 1003,
                type: 'js'
            }, {
                command: 'seajsMain',
                dist: 'dist/cmd.js',
                fileUrlArr: ['public/js/website/index/main.js'],
                startLine: 1118,
                endLine: 1261,
                type: 'js'
            }]
        }
    },
    getBuildConfig: function () {
        return {
            "urlMap": [
                {
                    "staticResourcePrefix": "/pc/js",
                    "relativePrefix": "public/js"
                },
                {
                    "staticResourcePrefix": "/pc/css",
                    "relativePrefix": "public/css"
                },
                {
                    "staticResourcePrefix": "/aaa/dist",
                    "relativePrefix": "dist"
                }]
        };
    }
};

var multi = {
    filePath1: single.filePath,
    filePath2: "/2.ejs",

    getFileContent1: function () {
        return single.getFileContent();
    },
    getFileContent2: function () {
        return convertUtils.toString(function () {/*
         <!--#build:css:replace /aaa/dist/a2.css#-->
         <link href="/pc/css/website/index/index.css" type="text/css" rel="stylesheet">
         <link href="/pc/css/website/banner.css" type="text/css" rel="stylesheet">
         <!--#endbuild#-->


         <!--#build:js:replace /aaa/dist/no_cmd2.js#-->
         <script src="/pc/js/website/animation.js"></script>
         <script src="/pc/js/website/nav.js"></script>
         <!--#endbuild#-->
         <script type="text/javascript" src="http://v3.jiathis.com/code_mini/jia.js" charset="utf-8"></script>


         <!--#build:js:seajsMain /aaa/dist/cmd2.js #-->
         <script src="/pc/js/website/news/main.js"></script>
         <!--#endbuild#-->
         */
        });
    },
    getResourceMap: function () {
        var map = single.getResourceMap();

        map["/2.ejs"] =
            [{
                command: 'replace',
                dist: 'dist/a2.css',
                fileUrlArr: ['public/css/website/index/index.css', 'public/css/website/banner.css'],
                startLine: 0,
                endLine: 250,
                type: 'css'
            }, {
                command: 'replace',
                dist: 'dist/no_cmd2.js',
                fileUrlArr: ['public/js/website/animation.js', 'public/js/website/nav.js'],
                startLine: 253,
                endLine: 451,
                type: 'js'
            }, {
                command: 'seajsMain',
                dist: 'dist/cmd2.js',
                fileUrlArr: ['public/js/website/news/main.js'],
                startLine: 565,
                endLine: 708,
                type: 'js'
            }];

        return map;
    },
    getBuildConfig: function () {
        return single.getBuildConfig();
    }
};

module.exports = {
    cwd: "/",
    single: single,
    multi: multi
};
