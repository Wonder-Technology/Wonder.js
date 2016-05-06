var testTool = (function () {
    return {
        resPath: "base/",

        buildFakeGl: function (sandbox) {
            return {
                FLOAT:"FLOAT",

                DYNAMIC_DRAW:"DYNAMIC_DRAW",

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


                getParameter: sandbox.stub(),
                getExtension: sandbox.stub(),
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
                createTexture: sandbox.stub(),
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
        updateAction: function (elapsedTime, gameObject) {
            window.performance.now.returns(elapsedTime);
            gameObject.actionManager.update(elapsedTime);
        },
        getValues: function (values, digit) {
            var digit = digit === undefined ? 7 : digit;

            if (values !== undefined) {
                if (mathTestUtils.isArray(values) || mathTestUtils.isFloat32Array(values) || mathTestUtils.isUint16Array(values)) {
                    return mathTestUtils.getValues(values, digit);
                }
                else if(values.values){
                    return mathTestUtils.getValues(values.values, digit);
                }
                else {
                    return mathTestUtils.toFixed(values, digit);
                }
            }

            //return mathTestUtils.getValues(matrix.values);
        },
        stubGetterSetter: function (sinon, object, attri, getterFunc, setterFunc) {
            /*!
             now sinonjs not support sandbox to stub getter/setter, so use sinon

             refer to https://github.com/cjohansen/Sinon.JS/issues/781


             getterFunc/setterFunc must be function, can't be stub
             */

            sinon.stub(object, attri, {
                get: getterFunc,
                set: setterFunc
            });
        },
        stubGetter: function (sinon, object, attri, getterFunc) {
            sinon.stub(object, attri, {
                get: getterFunc
            });
        },
        stubSetter: function (sinon, object, attri, setterFunc) {
            sinon.stub(object, attri, {
                set: setterFunc
            });
        },
        clearInstance: function (sandbox) {
            wd.EventManager.off();

            for (var i in wd) {
                if (wd.hasOwnProperty(i)) {
                    if (wd[i]) {
                        wd[i]._instance = null;
                    }
                }
            }

            wd.Entity.uid = 0;

            wd.ProgramTable.clearAll();
            wd.BufferTable.clearAll();
            wd.TextureCache.clearAll();


            this.closeContractCheck();
        },

        multiIt: function (its, getArgs) {
            if (!its || !its.forEach) {
                return;
            }

            its.forEach(function (test) {
                if (test.body.forEach) {
                    describe(test.explain, function () {
                        test.body.forEach(function (secondItem) {
                            it(secondItem.explain, function () {
                                secondItem.body.apply(null, getArgs())
                            });
                        });
                    });
                }
                else {
                    it(test.explain, function () {
                        test.body.apply(null, getArgs())
                    });
                }
            });
        },


        /*!
         can only affect In,Out check
         Invariant check will be invoked when load the file
         */
        openContractCheck: function (sandbox) {
            wd.Main.isTest = true;

            this.initForTest();
        },

        initForTest: function(){
            wd.ProgramTable.addProgram("\n", wd.Program.create());

            Object.defineProperty(wd.Shader.prototype, "program", {
                get: function () {
                    return wd.ProgramTable.getProgram(this._getProgramTableKey()) || wd.Program.create();
                }
            });
        },


        closeContractCheck: function () {
            wd.Main.isTest = false;
        },



        createFaces: function(indices, normals){
            return wd.GeometryUtils.convertToFaces(indices, normals);
        },
        createCamera:function (pos, lookAtPoint, near, far, fovy) {
            var camera = wd.GameObject.create();

            var cameraComponent = wd.PerspectiveCamera.create();


            cameraComponent.fovy = fovy || 60;
            //cameraComponent.aspect = canvas.width / canvas.height;
            cameraComponent.aspect = 1;
            cameraComponent.near = near || 0.1;
            cameraComponent.far = far || 1000;


            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            if(pos){
                camera.transform.translate(pos);
            }
            else{
                camera.transform.translate(wd.Vector3.create(0, 0, 20));
            }

            if(lookAtPoint){
                camera.transform.lookAt(lookAtPoint);
            }
            else{
                camera.transform.lookAt(wd.Vector3.create(0, 0, 0));
            }

            return camera
        },
        createOrthoCamera:function (pos, lookAtPoint) {
            var camera = wd.GameObject.create(),
                cameraComponent = wd.OrthographicCamera.create();

            cameraComponent.left = -50;
            cameraComponent.right = 50;
            cameraComponent.top = 50;
            cameraComponent.bottom = -50;
            cameraComponent.near = 0.1;
            cameraComponent.far = 100;


            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            if(pos){
                camera.transform.translate(pos);
            }
            else{
                camera.transform.translate(wd.Vector3.create(0, 0, 20));
            }

            if(lookAtPoint){
                camera.transform.lookAt(lookAtPoint);
            }

            return camera
        },
        shouldExecRunTest: function(msg){
            var str = !msg ? "should exec run test" : "should exec run test: " + msg;

            it(str, function(){
                expect().toPass();
            })
        },
        getAllComponents:function(entityObject, componentClass){
            return entityObject.getComponents().filter(function(component){
                return component instanceof componentClass;
            });
        }
    }
}());
