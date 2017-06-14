var Main = wd.Main;

var testTool = (function () {
    return {
        getValues: function (values, digit) {
            var digit = digit === undefined ? 7 : digit;

            if (values !== undefined) {
                if (mathTestUtils.isArray(values) || mathTestUtils.isFloat32Array(values) || mathTestUtils.isUint16Array(values) || mathTestUtils.isUint8Array(values)) {
                    return mathTestUtils.getValues(values, digit);
                }
                else if(values.values){
                    return mathTestUtils.getValues(values.values, digit);
                }
                else if(values instanceof wd.Quaternion){
                    return mathTestUtils.getValues([values.x, values.y, values.z, values.w], digit);
                }
                else {
                    return mathTestUtils.toFixed(values, digit);
                }
            }

            //return mathTestUtils.getValues(matrix.values);
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
            drawRenderCommandTool.resetData();
            sceneTool.resetData();
        },

        clearAndOpenContractCheck: function (sandbox, isInit) {
            var isInit$ = isInit === false ? false : true;

            if(isInit$){
                this.initForTest(sandbox);
            }

            this.clear(sandbox);

            Main.isTest = true;
        },

        initForTest: function(sandbox){
            // wd.ProgramTable.addProgram("\n", wd.Program.create());
            //
            //
            //
            //
            // sandbox.stub(wd.GPUDetector.getInstance(), "maxTextureUnit", 16);
            this.stubGetter(sinon, wd.ThreeDTransformData, "maxCount", function () {
                return 10;
            });
        },

        closeContractCheck: function () {
            Main.isTest = false;
        }
    }
}());
