var testUtils = (function () {
    return {
        getValues: function (values, digit) {
            var digit = digit === undefined ? 7 : digit;

            if (values !== undefined) {
                if (mathTestUtils.isArray(values) || mathTestUtils.isFloat32Array(values) || mathTestUtils.isUint16Array(values) || mathTestUtils.isUint8Array(values)) {
                    return mathTestUtils.getValues(values, digit);
                }
                else if (values.values) {
                    return mathTestUtils.getValues(values.values, digit);
                }
                else if (values instanceof wd.Quaternion) {
                    return mathTestUtils.getValues([values.x, values.y, values.z, values.w], digit);
                }
                else {
                    return mathTestUtils.toFixed(values, digit);
                }
            }
        },
        prepareBufferForTest: function(sandbox, data, bufferTool){
            // sandbox.stub(wd.BufferUtilsForUnitTest, "isDrawRenderCommandBufferDataTypeArrayNotExist").returns(true);

            bufferTool.minBufferCount(sandbox, data);
        },

        initForTest: function(sandbox){
            gpuDetectTool.setGPUDetectData("maxTextureUnit", 16)
            gpuDetectTool.setGPUDetectData("maxUniformBufferBindings", 10);
        }
    }
})();
