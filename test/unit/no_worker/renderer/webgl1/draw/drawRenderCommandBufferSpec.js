describe("draw render command", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraObj;

    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var GeometryData = wd.GeometryData;
    var IndexBufferData = wd.IndexBufferData;
    var EBufferType = wd.EBufferType;
    var DataBufferConfig = wd.DataBufferConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene(false,  null, lightMaterialTool.create());
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraObj = data.cameraGameObject;


        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("send attribute buffer", function () {
        var program1, program2;
        var buffer1, buffer2;
        var ShaderData, GeometryData, ArrayBufferData;
        var pos;

        beforeEach(function () {
            pos = 0;
            program1 = {};
            program2 = { p: 1 };
            buffer1 = {};
            buffer2 = { a: 1 };

            shaderTool.setSendAttributeConfig(0, [
                {
                    "name": "a_position",
                    "buffer": "vertex",
                    "type": "vec3"
                }
            ]);
            shaderTool.setSendAttributeConfig(1, [
                {
                    "name": "a_position",
                    "buffer": "vertex",
                    "type": "vec3"
                }
            ]);
            shaderTool.setAttributeLocation(0, {
                "a_position": pos
            });
            shaderTool.setAttributeLocation(1, {
                "a_position": pos
            });
            shaderTool.setProgram(0, program1);
            shaderTool.setProgram(1, program2);

            ShaderData = wd.ShaderData;



            GeometryData = {}



            arrayBufferTool.setVerticeBuffer(0, buffer1);
            arrayBufferTool.setVerticeBuffer(1, buffer2);

            // arrayBufferTool.setBufferData(0, {
            //     size: 3,
            //     type: "FLOAT"
            // });
            // arrayBufferTool.setBufferData(1, {
            //     size: 3,
            //     type: "FLOAT"
            // });

            ArrayBufferData = wd.ArrayBufferData;
        });

        it("bind array buffer", function () {
            shaderTool.use(gl, 0);

            shaderTool.sendAttributeData(gl, 0, 0);

            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER, buffer1);
        });
        it("attach buffer to attribute", function () {
            shaderTool.use(gl, 0);

            shaderTool.sendAttributeData(gl, 0, 0);

            expect(gl.vertexAttribPointer).toCalledWith(pos, 3, gl["FLOAT"], false, 0, 0);
        });
        describe("enable attribute", function () {
            it("if already enabled since use this program, not enable", function () {
                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0);


                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 1);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(1);
            });
            it("else, enable", function () {
                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0);



                shaderTool.disableVertexAttribArray(gl);

                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 1);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(2);
            });

            it("differenc shader's vertexAttribHistory of the same attribute data pos are independent", function () {
                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0);


                shaderTool.use(gl, 1);

                shaderTool.sendAttributeData(gl, 1, 1);

                expect(gl.enableVertexAttribArray.withArgs(pos).callCount).toEqual(2);
            });
        });

        describe("test cache", function () {
            it("if switch program, clear cache and send it and enableVertexAttribArray", function () {
                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0);


                shaderTool.use(gl, 1);

                shaderTool.sendAttributeData(gl, 1, 1);

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer1)).toCalledOnce();
                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer2)).toCalledOnce();
                expect(gl.enableVertexAttribArray.callCount).toEqual(2);
            });

            it("if last send buffers equal current send buffers, not send again", function () {
                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0);


                shaderTool.use(gl, 0);

                shaderTool.sendAttributeData(gl, 0, 0, GeometryData, ArrayBufferData);

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, buffer1)).toCalledOnce();
                expect(gl.enableVertexAttribArray.callCount).toEqual(1);
            });

            // it("if its buffer data changed, still cache hit", function () {
            // });
        });
    });

    describe("sendUniformData", function () {
        var pos;
        var v;

        beforeEach(function () {
            pos = 1000;
        });

        describe("test cache", function () {
            var mat;
            var pos;

            beforeEach(function(){
                mat = lightMaterialTool.create();

                var texture = textureTool.create();
                textureTool.setSource(texture, {});

                lightMaterialTool.setDiffuseMap(mat, texture);


                var data = sceneTool.createGameObject(null, mat);


                sceneTool.addGameObject(data.gameObject);

                pos = 1;

                gl.getUniformLocation.withArgs(sinon.match.any, "u_specular").returns(pos);
            });

            it("differenc shader's data of the same uniform data name are independent", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.uniform3f.withArgs(pos).callCount).toEqual(2);
            });
            it("if data not equal, cache miss", function () {
                lightMaterialTool.setSpecularColor(mat, Color.create("#123333"));

                directorTool.init(state);

                directorTool.loopBody(state);
                directorTool.loopBody(state);

                expect(gl.uniform3f.withArgs(pos).callCount).toEqual(2);
            });
        });

        describe("test send FLOAT", function () {
            beforeEach(function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_opacity").returns(pos);
            })

            it("test", function () {
                v = 1;
                basicMaterialTool.setOpacity(material, 1);

                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform1f.withArgs(pos, v)).toCalledOnce();
            });
            it("data should be number", function () {
                expect(function () {
                    basicMaterialTool.setOpacity(material, true);
                }).toThrow("to be number");
            });

            describe("test cache", function () {
                beforeEach(function () {
                });

                it("if cached, return cached data", function () {
                    v = 1;
                    basicMaterialTool.setOpacity(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1f.withArgs(pos, v)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    v = 1;
                    basicMaterialTool.setOpacity(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);

                    basicMaterialTool.setOpacity(material, 0.5);

                    directorTool.loopBody(state);


                    expect(gl.uniform1f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send Int", function () {
            beforeEach(function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_lightModel").returns(pos);


                // var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
                // mat = data.material;
            })

            describe("test cache", function () {
                beforeEach(function () {
                });

                it("if cached, return cached data", function () {
                    v = 1;
                    lightMaterialTool.setLightModel(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform1i.withArgs(pos, v)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    v = 1;
                    lightMaterialTool.setLightModel(material, 1);

                    directorTool.init(state);

                    directorTool.loopBody(state);

                    lightMaterialTool.setLightModel(material, 2);

                    directorTool.loopBody(state);


                    expect(gl.uniform1i.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send FLOAT3", function () {
            var vec3;

            beforeEach(function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_specular").returns(pos);

                v = Color.create("#123456");
                vec3 = v.toVector3();
            })

            it("test", function () {
                lightMaterialTool.setSpecularColor(material, v);

                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform3f.withArgs(pos, vec3.x, vec3.y, vec3.z)).toCalledOnce();
            });

            describe("test cache", function () {
                beforeEach(function () {
                });

                it("if cached, return cached data", function () {
                    lightMaterialTool.setSpecularColor(material, v);

                    directorTool.init(state);

                    directorTool.loopBody(state);
                    directorTool.loopBody(state);

                    expect(gl.uniform3f.withArgs(pos)).toCalledOnce();
                });
                it("if data not equal, cache miss", function () {
                    lightMaterialTool.setSpecularColor(material, v);

                    directorTool.init(state);

                    directorTool.loopBody(state);

                    lightMaterialTool.setSpecularColor(material, Color.create("#333333"));

                    directorTool.loopBody(state);

                    expect(gl.uniform3f.withArgs(pos)).toCalledTwice();
                });
            });
        });

        describe("test send VEC3", function () {
            //todo test
        });

        it("test send MAT4", function () {
            var transform = gameObjectTool.getComponent(obj, wd.ThreeDTransform),
                mat = Matrix4.create().setTranslate(1, 2, 3),
                position = mat.getTranslation();
            threeDTransformTool.setPosition(transform, position);
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(pos);

            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.uniformMatrix4fv).toCalledWith(pos, false, mat.values);
        });
        it("test send MAT3", function () {
            sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());


            var transform = gameObjectTool.getComponent(cameraObj, wd.ThreeDTransform),
                mat = Matrix4.create().setTranslate(1, 2, 3),
                position = mat.getTranslation();
            threeDTransformTool.setPosition(transform, position);
            gl.getUniformLocation.withArgs(sinon.match.any, "u_normalMatrix").returns(pos);

            directorTool.init(state);

            directorTool.loopBody(state);

            expect(gl.uniformMatrix3fv).toCalledWith(pos, false, mat.invertTo3x3().transpose().values);
        });
    });

    describe("draw", function() {
        beforeEach(function(){

        });

        it("if geometry has index buffer, bind index buffer and drawElements", function(){
            directorTool.init(state);

            var indexBuffer = {a:1};
            indexBufferTool.setBuffers([indexBuffer]);

            var indices = [1,2,3];
            geometryTool.setIndices(0, indices);
            geometryTool.setIndexType(EBufferType.UNSIGNED_SHORT);
            geometryTool.setIndexTypeSize(Uint16Array.BYTES_PER_ELEMENT);

            directorTool.loopBody(state);


            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)).toCalledOnce();
            expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indices.length, GeometryData.indexType, GeometryData.indexTypeSize * 0);
        });
    });
});

