var Main = wd.Main;

var TestTool = YYC.Class(TestToolBase, {
    Public: {
        clearInstance: function (sandbox) {
            for (var i in wd) {
                if (wd.hasOwnProperty(i)) {
                    if (wd[i]) {
                        wd[i]._instance = null;
                    }
                }
            }

            this.closeContractCheck();
        },

        clearComponentData: function(){
            gameObjectTool.resetData();
            gameObjectTool.resetData();
            threeDTransformTool.resetData();
            tagTool.resetData();
            geometryTool.resetData();
            materialTool.resetData();
            meshRendererTool.resetData();
            arrayBufferTool.resetData();
            indexBufferTool.resetData();
            deviceManagerTool.resetData();
            cameraControllerTool.resetData();
            lightTool.resetData();
            renderCommandBufferTool.resetData();
            drawRenderCommandBufferTool.resetData();
            sceneTool.resetData();

            directorSystemTool.resetData();

            gpuDetectTool.resetData();


            shaderTool.resetData();

            vaoTool.resetData();
        },

        clearAndOpenContractCheck: function (sandbox, data) {
            Main.isTest = true;

            testUtils.prepareBufferForTest(sandbox, data, bufferTool);

            this.clear(sandbox);

            Main.isTest = true;

            testUtils.initForTest(sandbox);

            webglTestTool.initForTest(sandbox);
        }
    }
});

var testTool = new TestTool();
