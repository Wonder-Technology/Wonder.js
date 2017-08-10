var gpuDetectUtils = (function () {
    return {
        getExtension: function (name) {
            var gl = deviceUtils.createGL();

            return gl.getExtension(name);
        }
    }
}());
