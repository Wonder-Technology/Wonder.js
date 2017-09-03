var Main = wd.Main;

var TestTool = YYC.Class(TestToolBase, {
    Public: {
        clearComponentData: function(){
            wd.initAllData();
            wd.initWorkerDataWhenInitGL();

            deviceManagerTool.resetData();
            materialWorkerTool.resetData();
            webglDetectWorkerTool.resetData();
            lightTool.resetData();
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
