var Main = wd.Main;

var TestToolBase = YYC.AClass({
    Public: {
        getValues: function (values, digit) {
            return testUtils.getValues(values, digit);
        },
        stubGetter: function (sinon, object, attri, getterFunc) {
            if(object[attri] === void 0){
                Object.defineProperty(object, attri, {
                    configurable: true,
                    enumerable: true,
                    get: getterFunc
                })
            }

            sinon.stub(object, attri, {
                get: getterFunc
            });
        },
        stubSetter: function (sinon, object, attri, setterFunc) {
            if(object[attri] === void 0){
                Object.defineProperty(object, attri, {
                    configurable: true,
                    enumerable: true,
                    set: setterFunc
                })
            }

            sinon.stub(object, attri, {
                set: setterFunc
            });
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
        clearAndOpenContractCheck: function (sandbox, data) {
            Main.isTest = true;

            testUtils.prepareBufferForTest(sandbox, data, bufferTool);

            this.clear(sandbox);

            Main.isTest = true;

            testUtils.initForTest(sandbox);

            webglTestTool.initForTest(sandbox);
        },

        openContractCheck: function () {
            Main.isTest = true;
        },

        closeContractCheck: function () {
            Main.isTest = false;
        }
    }
});
