var Main = wd.Main;

var TestTool = YYC.Class(TestToolBase, {
    Public: {
        clearComponentData: function(){
            wd.initData();
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
