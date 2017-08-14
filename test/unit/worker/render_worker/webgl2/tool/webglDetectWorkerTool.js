var webglDetectWorkerTool = (function () {
    return {
        setVersion: function(version){
            wd.WebGLDetectData.version = version;
        },
        resetData: function () {
            wdrd.WebGLDetectWorkerData.version = wd.EWebGLVersion.WEBGL2;
        }
    }
}());

