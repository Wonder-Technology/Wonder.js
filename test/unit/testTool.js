var testTool = (function () {
    return {
        resPath: "base/",

        buildFakeGl: function (sandbox) {
            return {
                LINES: "LINES",
                TRIANGLES: "TRIANGLES",

                ARRAY_BUFFER:"ARRAY_BUFFER",

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
                uniform1i: sandbox.stub(),
                uniform2f: sandbox.stub(),
                uniform3f: sandbox.stub(),
                uniform4f: sandbox.stub(),
                uniformMatrix3fv: sandbox.stub(),
                uniform1f: sandbox.stub(),
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
                createProgram: sandbox.stub(),
                clearColor: sandbox.stub(),
                clear: sandbox.stub()
            };
        },
        extend: function (destination, source) {
            var property = "";

            for (property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        extendDeep: function (parent, child, filter) {
            var i = null,
                len = 0,
                toStr = Object.prototype.toString,
                sArr = "[object Array]",
                sOb = "[object Object]",
                type = "",
                filter = filter || function(){
                        return true;
                    },
                _child = null;

            //数组的话，不获得Array原型上的成员。
            if (toStr.call(parent) === sArr) {
                _child = child || [];

                for (i = 0, len = parent.length; i < len; i++) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }

                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
            }
            //对象的话，要获得原型链上的成员。因为考虑以下情景：
            //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
            else if (toStr.call(parent) === sOb) {
                _child = child || {};

                for (i in parent) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }

                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {    //如果为数组或object对象
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    } else {
                        _child[i] = parent[i];
                    }
                }
            }
            else {
                _child = parent;
            }

            return _child;
        },
        updateAction: function (time, gameObject) {
            window.performance.now.returns(time);
            gameObject.actionManager.update(time);
        },
        getValues: function (values, digit) {
            var digit = digit || 7;

            if (values) {
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
        clearInstance: function () {
            for (var i in wd) {
                if (wd.hasOwnProperty(i)) {
                    if (wd[i]) {
                        wd[i]._instance = null;
                    }
                }
            }
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
            sandbox.stub(wd.Main, "isTest", true);
        },



        createFaces: function(indices, normals){
            return wd.GeometryUtils.convertToFaces(indices, normals);
        },
        createCamera:function () {
            var camera = wd.GameObject.create();

            var cameraComponent = wd.PerspectiveCamera.create();


            cameraComponent.fovy = 60;
            //cameraComponent.aspect = canvas.width / canvas.height;
            cameraComponent.aspect = 1;
            cameraComponent.near = 0.1;
            cameraComponent.far = 100;


            var controller = wd.BasicCameraController.create(cameraComponent);
            camera.addComponent(controller);

            camera.transform.translate(wd.Vector3.create(0, 0, 20));

            //var script = wd.Script.create();
            //
            //script.url = "../camera.js";
            //
            //camera.addComponent(script);

            return camera
        },
        shouldExecRunTest: function(msg){
            var str = !msg ? "should exec run test" : "should exec run test: " + msg;

            it(str, function(){
                expect().toPass();
            })
        }
    }
}());
