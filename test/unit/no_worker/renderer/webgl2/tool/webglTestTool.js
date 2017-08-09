var webglTestTool = (function () {
    return {
        initForTest: function(sandbox){
            wd.WebGLDetectData.version = wd.EWebGLVersion.WEBGL2;

            deferShadingTool.enableDeferShading(sandbox);
        }
    }
})();
