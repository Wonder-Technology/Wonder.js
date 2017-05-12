var Main = wd.Main;

var testTool = (function () {
    return {
        buildFakeGl: function (sandbox) {
            return {
                FLOAT:"FLOAT",

                DYNAMIC_DRAW:"DYNAMIC_DRAW",
                STATIC_DRAW:"STATIC_DRAW",

                LINES: "LINES",
                TRIANGLES: "TRIANGLES",

                ARRAY_BUFFER:"ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER:"ELEMENT_ARRAY_BUFFER",

                REPEAT: "REPEAT",
                MIRRORED_REPEAT: "MIRRORED_REPEAT",
                CLAMP_TO_EDGE: "CLAMP_TO_EDGE",

                TEXTURE_WRAP_S: "TEXTURE_WRAP_S",
                TEXTURE_WRAP_T: "TEXTURE_WRAP_T",
                TEXTURE_MAG_FILTER: "TEXTURE_MAG_FILTER",
                TEXTURE_MIN_FILTER: "TEXTURE_MIN_FILTER",


                NEAREST: "NEAREST",
                NEAREST_MIPMAP_MEAREST: "NEAREST_MIPMAP_MEAREST",
                NEAREST_MIPMAP_LINEAR: "NEAREST_MIPMAP_LINEAR",
                LINEAR: "LINEAR",
                LINEAR_MIPMAP_NEAREST: "LINEAR_MIPMAP_NEAREST",
                LINEAR_MIPMAP_LINEAR: "LINEAR_MIPMAP_LINEAR",

                TEXTURE_2D: "TEXTURE_2D",
                TEXTURE_CUBE_MAP:"TEXTURE_CUBE_MAP",

                FRAMEBUFFER: "FRAMEBUFFER",
                RENDERBUFFER: "RENDERBUFFER",

                BROWSER_DEFAULT_WEBGL: "BROWSER_DEFAULT_WEBGL",
                NONE: "NONE",

                PACK_ALIGNMENT: "PACK_ALIGNMENT",
                UNPACK_ALIGNMENT: "UNPACK_ALIGNMENT",
                UNPACK_FLIP_Y_WEBGL: "UNPACK_FLIP_Y_WEBGL",
                UNPACK_PREMULTIPLY_ALPHA_WEBGL: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
                UNPACK_COLORSPACE_CONVERSION_WEBGL: "UNPACK_COLORSPACE_CONVERSION_WEBGL",

                COLOR_ATTACHMENT0: "COLOR_ATTACHMENT0",
                DEPTH_ATTACHMENT: "DEPTH_ATTACHMENT",

                UNSIGNED_SHORT: "UNSIGNED_SHORT",
                UNSIGNED_BYTE: "UNSIGNED_BYTE",

                DEPTH_COMPONENT:"DEPTH_COMPONENT",



                getParameter: sandbox.stub().returns(null),
                getExtension: sandbox.stub().returns(null),

                scissor: sandbox.stub(),
                viewport: sandbox.stub(),

                checkFramebufferStatus: sandbox.stub(),
                framebufferRenderbuffer: sandbox.stub(),
                renderbufferStorage: sandbox.stub(),
                framebufferTexture2D: sandbox.stub(),
                createRenderbuffer: sandbox.stub(),
                createFramebuffer: sandbox.stub(),

                uniformMatrix4fv: sandbox.stub(),
                getUniformLocation: sandbox.stub(),
                getAttribLocation: sandbox.stub(),
                vertexAttribPointer: sandbox.stub(),
                enableVertexAttribArray: sandbox.stub(),
                disableVertexAttribArray: sandbox.stub(),
                uniform1i: sandbox.stub(),
                uniform2f: sandbox.stub(),
                uniform3f: sandbox.stub(),
                uniform4f: sandbox.stub(),
                uniformMatrix3fv: sandbox.stub(),
                uniform1f: sandbox.stub(),
                uniform1iv :sandbox.stub(),

                drawArrays: sandbox.stub(),
                drawElements: sandbox.stub(),

                generateMipmap:sandbox.stub(),
                pixelStorei: sandbox.stub(),
                texParameteri: sandbox.stub(),
                useProgram: sandbox.stub(),
                bindFramebuffer: sandbox.stub(),
                bindRenderbuffer: sandbox.stub(),
                createTexture: sandbox.stub().returns({}),
                texImage2D: sandbox.stub(),
                activeTexture: sandbox.stub(),
                bindTexture: sandbox.stub(),

                deleteShader: sandbox.stub(),
                deleteProgram: sandbox.stub(),
                deleteFramebuffer: sandbox.stub(),
                deleteRenderbuffer: sandbox.stub(),
                deleteTexture: sandbox.stub(),
                deleteBuffer: sandbox.stub(),

                bindAttribLocation: sandbox.stub(),
                linkProgram: sandbox.stub(),
                attachShader: sandbox.stub(),
                getProgramInfoLog: sandbox.stub(),
                getShaderParameter: sandbox.stub().returns(true),
                getProgramParameter: sandbox.stub().returns(true),
                compileShader: sandbox.stub(),
                shaderSource: sandbox.stub(),
                createShader: sandbox.stub(),
                bindBuffer: sandbox.stub(),
                bufferData: sandbox.stub(),
                bufferSubData: sandbox.stub(),
                createBuffer: sandbox.stub().returns({}),
                enable: sandbox.stub(),
                disable: sandbox.stub(),
                polygonOffset: sandbox.stub(),
                colorMask: sandbox.stub(),
                depthMask: sandbox.stub(),
                cullFace: sandbox.stub(),
                blendFunc: sandbox.stub(),
                blendEquation: sandbox.stub(),
                blendFuncSeparate: sandbox.stub(),
                blendEquationSeparate: sandbox.stub(),
                createProgram: sandbox.stub().returns({}),
                clearColor: sandbox.stub(),
                clear: sandbox.stub()
            };
        },
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

            gameObjectTool.resetData();
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
            wd.initThreeDTransform(wd.GlobalTempData, wd.ThreeDTransformData);
        },

        openContractCheck: function (sandbox, isInit) {
            Main.isTest = true;

            if(isInit){
                this.initForTest(sandbox);
            }
        },

        initForTest: function(sandbox){
            // wd.ProgramTable.addProgram("\n", wd.Program.create());
            //
            //
            //
            //
            // sandbox.stub(wd.GPUDetector.getInstance(), "maxTextureUnit", 16);
        },

        closeContractCheck: function () {
            Main.isTest = false;
        }
    }
}());
