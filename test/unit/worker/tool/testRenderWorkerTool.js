var Main = wd.Main;

var testRenderWorkerTool = (function () {
    return {
        getValues: function (values, digit) {
            return testUtils.getValues(values, digit);
        },
        clear: function(sandbox){
            this.clearInstance(sandbox);
            this.clearComponentData();
        },
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
            shaderTool.resetData();
            meshRendererTool.resetData();
            arrayBufferTool.resetData();
            indexBufferTool.resetData();
            deviceManagerTool.resetData();
            cameraControllerTool.resetData();
            renderCommandBufferTool.resetData();
            drawRenderCommandBufferTool.resetData();
            sceneTool.resetData();
        },

        clearAndOpenContractCheck: function (sandbox, data) {
            testUtils.prepareBufferForTest(sandbox, data, bufferTool);

            workerTool.init(sandbox);

            this.clear(sandbox);

            Main.isTest = true;
        },
        closeContractCheck: function () {
            Main.isTest = false;
        }
    }
}());
