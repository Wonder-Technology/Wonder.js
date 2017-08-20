var Main = wd.Main;

var TestTool = YYC.Class(TestToolBase, {
    Public: {
        // getValues: function (values, digit) {
        //     var digit = digit === undefined ? 7 : digit;
        //
        //     if (values !== undefined) {
        //         if (mathTestUtils.isArray(values) || mathTestUtils.isFloat32Array(values) || mathTestUtils.isUint16Array(values) || mathTestUtils.isUint8Array(values)) {
        //             return mathTestUtils.getValues(values, digit);
        //         }
        //         else if(values.values){
        //             return mathTestUtils.getValues(values.values, digit);
        //         }
        //         else if(values instanceof wd.Quaternion){
        //             return mathTestUtils.getValues([values.x, values.y, values.z, values.w], digit);
        //         }
        //         else {
        //             return mathTestUtils.toFixed(values, digit);
        //         }
        //     }
        //
        //     //return mathTestUtils.getValues(matrix.values);
        // },
        clearInstance: function (sandbox) {
            // wd.EventManager.off();
            //
            for (var i in wd) {
                if (wd.hasOwnProperty(i)) {
                    if (wd[i]) {
                        wd[i]._instance = null;
                    }
                }
            }
            //
            // wd.Entity.uid = 0;
            //
            // wd.ProgramTable.clearAll();
            // wd.BufferTable.clearAll();
            // wd.TextureCache.clearAll();
            //
            // wd.DebugConfig.showDebugPanel = false;
            //
            //
            this.closeContractCheck();
        },

        clearComponentData: function(){
            gameObjectTool.resetData();
            threeDTransformTool.resetData();
            tagTool.resetData();
            geometryTool.resetData();
            materialTool.resetData();
            materialWorkerTool.resetData();
            shaderTool.resetData();
            meshRendererTool.resetData();
            arrayBufferTool.resetData();
            indexBufferTool.resetData();
            deviceManagerTool.resetData();
            cameraControllerTool.resetData();
            lightTool.resetData();
            renderCommandBufferTool.resetData();
            drawRenderCommandBufferTool.resetData();
            sendDrawRendercommandBufferTool.resetData();
            sceneTool.resetData();

            directorSystemTool.resetData();

            webglDetectWorkerTool.resetData();
            gpuDetectTool.resetData();

            vaoTool.resetData();
        },

        clearAndOpenContractCheck: function (sandbox, data) {
            testUtils.prepareBufferForTest(sandbox, data, bufferTool);

            webglWorkerTool.init(sandbox);

            this.clear(sandbox);

            Main.isTest = true;
            wd.InitConfigWorkerData.isTest = true;
            wdrd.InitConfigWorkerData.isTest = true;

            testUtils.initForTest(sandbox);
        },

        closeContractCheck: function () {
            Main.isTest = false;
            wd.InitConfigWorkerData.isTest = false;
            wdrd.InitConfigWorkerData.isTest = false;
        }
    }
});

var testTool = new TestTool();
