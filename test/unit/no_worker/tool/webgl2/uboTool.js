var uboTool = (function () {
    return {
        getBindingPoint: function (uboName) {
            return wd.WebGL2GLSLSenderData.uboBindingPointMap[uboName];
        }
    }
})();
