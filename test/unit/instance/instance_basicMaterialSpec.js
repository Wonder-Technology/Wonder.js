describe("instance with basic material", function(){
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var box1,box1Instance1,box1Instance2;
    var box1Child1;

    var renderer;
    var camera;

    function prepareWithoutChild(){
        box1 = instanceTool.createBox();
        box1.name = "box1";

        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = instanceTool.cloneInstance(box1, "0");
        box1Instance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);



    }

    function prepareWithChild(){
        box1 = instanceTool.createBox(1);
        box1.name = "box1";

        box1Child1 = prepareTool.createSphere(1)
        box1Child1.name = "box1Child1";

        box1.addChild(box1Child1);

        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = instanceTool.cloneInstance(box1, "1");
        box1Instance2 = instanceTool.cloneInstance(box1, "2");

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);



        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();


        director.scene.addChild(camera);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("test render count", function(){
        beforeEach(function(){
        });

        it("test no box1Child1", function(){
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
        });
        it("test with child", function(){
            prepareWithChild();

            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(box1Child1.render).toCalledOnce();
            expect(box1Instance1.getChild(0).render).not.toCalled();
            expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(6);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    describe("can vary instance's modelMatrix(position,rotation,scale)", function(){
        var mMatrixPos;

        function judgeModelMatricesInstancesArray(){
            expect(gl.uniformMatrix4fv.withArgs(mMatrixPos)).not.toCalled();

            expect(gl.bufferSubData).toCalledOnce();

            var targetModelMatricesInstancesArray = new Float32Array(1000);
            box1.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 0);
            box1Instance1.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 16);
            box1Instance2.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 32);


            var modelMatricesInstancesArray = gl.bufferSubData.firstCall.args[2];

            for(var i = 0, len = modelMatricesInstancesArray.length; i < len; i++){
                var data = modelMatricesInstancesArray[i];

                expect(data).toEqual(targetModelMatricesInstancesArray[i]);
            }
        }

        function judgeSendModelMatrixVecData(location, index){
            expect(gl.enableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(gl.vertexAttribPointer.withArgs(location, 4, gl.FLOAT, false, 64, index * 16)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 1)).toCalledOnce();
        }

        function judgeUnBindInstancesBuffer(location, index){
            expect(gl.disableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 0)).toCalledOnce();
        }

        beforeEach(function(){
            prepareWithoutChild();
            director._init();
        });

        it("send the model matrix data by send 4 vec4 attribute data(because the max attribute data is vec4, not support mat)", function () {
            box1Instance1.transform.position = wd.Vector3.create(1,1,1);
            box1Instance1.transform.scale = wd.Vector3.create(3,3,3);

            box1Instance2.transform.rotation = wd.Quaternion.create(2,2,2,1);

            mMatrixPos = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

            var offsetLocation0 = 11,
                offsetLocation1 = 12,
                offsetLocation2 = 13,
                offsetLocation3 = 14;

            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0").returns(offsetLocation0);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1").returns(offsetLocation1);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2").returns(offsetLocation2);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3").returns(offsetLocation3);




            director.scene.gameObjectScene.render(renderer);
            renderer.render();




            judgeModelMatricesInstancesArray();

            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3")).toCalledOnce();

            judgeSendModelMatrixVecData(offsetLocation0, 0);
            judgeSendModelMatrixVecData(offsetLocation1, 1);
            judgeSendModelMatrixVecData(offsetLocation2, 2);
            judgeSendModelMatrixVecData(offsetLocation3, 3);

            judgeUnBindInstancesBuffer(offsetLocation0, 0);
            judgeUnBindInstancesBuffer(offsetLocation1, 1);
            judgeUnBindInstancesBuffer(offsetLocation2, 2);
            judgeUnBindInstancesBuffer(offsetLocation3, 3);
        });
    });

    describe("batch draw call", function () {
        it("test when only one instance with children", function () {
            box1 = instanceTool.createBox(1);

            box1Child1 = prepareTool.createSphere(1);

            box1.addChild(box1Child1);

            var instanceArr = [];

            instanceArr.push(box1);

            director.scene.addChildren(instanceArr);

            director.scene.addChild(camera);



            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.drawElements).not.toCalled();

            expect(wd.DebugStatistics.count.drawCalls).toEqual(2);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();
        });
        it("test multi instances", function () {
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.drawElements).not.toCalled();

            expect(wd.DebugStatistics.count.drawCalls).toEqual(1);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();

            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, sinon.match.object).callCount).toEqual(2);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledAfter(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER));
        });

        it("if lastBindedElementBuffer is this element buffer, not bind it", function () {
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            var callCount = gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount;



            director.scene.gameObjectScene.render(renderer);
            renderer.render();


            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount).toEqual(callCount);
        });
    });


    describe("remove object instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children", function () {
            prepareWithChild();

            director._init();



            director.scene.removeChild(box1Instance1);



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(box1Child1.render).toCalledOnce();
            expect(box1Instance1.getChild(0).render).not.toCalled();
            expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
        });
    });

    describe("add object instance after remove", function () {
        beforeEach(function () {
        });

        it("render it and its children", function () {
            prepareWithChild();

            director._init();



            director.scene.removeChild(box1Instance1);
            director.scene.addChild(box1Instance1);



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    describe("remove source instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children and its object instances", function () {
            prepareWithChild();

            director._init();


            director.scene.removeChild(box1);


            director.scene.gameObjectScene.render(renderer);
            renderer.render();


            expect(box1.render).not.toCalled();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(box1Child1.render).not.toCalled();
            expect(box1Instance1.getChild(0).render).not.toCalled();
            expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(0);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        });
    });

    describe("add source instance after remove", function () {
        beforeEach(function () {
        });

        it("render it and its children and its instances", function () {
            prepareWithChild();

            director._init();



            director.scene.removeChild(box1);
            director.scene.addChild(box1);



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    describe("dispose object instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children", function () {
            prepareWithChild();

            director._init();



            box1Instance1.dispose();



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
        });
    });

    describe("dispose source instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children and dispose its object instances", function () {
            testTool.closeContractCheck(sandbox);
            prepareWithChild();

            director._init();


            sandbox.spy(box1Instance1, "dispose");
            var box1Instance1Child = box1Instance1.getChild(0);
            sandbox.spy(box1Instance1Child, "dispose");

            sandbox.spy(box1Instance2, "dispose");


            box1.dispose();

            expect(box1Instance1.dispose).toCalledOnce();
            expect(box1Instance1Child.dispose).toCalledOnce();

            expect(box1Instance2.dispose).toCalledOnce();



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(0);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        });
    });

    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;

            testTool.openContractCheck(sandbox);
        });

        describe("batch draw instances", function(){
            var box1Material;
            var map;
            var program;

            function initDirector(){
                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, box1Material, "box1Program");
            }

            function judge1(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.colorMask.withArgs(false, true, true, true)).toCalledOnce();
                expect(program.use).toCalledOnce();
                expect(map.bindToUnit).toCalledOnce();
                expect(program.sendAttributeData.withArgs("a_position")).toCalledOnce();

                expect(gl.drawElements.callCount).toEqual(3);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            }

            function judge2_1(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, sinon.match.object).callCount).toEqual(6);
            }

            function judge2_2(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, sinon.match.object).callCount).toEqual(2);
            }

            function judge2_3(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                var callCount = gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount;



                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount).toEqual(callCount);
            }

            function judge3(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.drawElements.callCount).toEqual(3);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            }

            function judge4(){
                initDirector();

                var mMatrixPos = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.uniformMatrix4fv.withArgs(mMatrixPos).callCount).toEqual(3);
            }

            function judge5(){
                initDirector();

                expect(glslTool.contain(
                    box1Material.shader.vsSource,
                    "u_mMatrix"
                )).toBeTruthy();
            }

            beforeEach(function(){
                prepareWithoutChild();
                box1Material = box1.getComponent(wd.Geometry).material;

                map = wd.ImageTexture.create({});
                sandbox.stub(map, "bindToUnit");

                box1Material.map = map;
                box1Material.redWrite = false;
            });

            it("set webgl state and use program and bind texture and send glsl data(except mMatrix) only once", function () {
                judge1();
            });

            describe("test bind buffer", function(){
                beforeEach(function(){
                });

                it("not bind array buffer when draw instance", function () {
                    judge2_1();
                });

                it("bind element buffer when draw instance", function () {
                    judge2_2();
                });
                it("if lastBindedElementBuffer is this element buffer, not bind it", function () {
                    judge2_3();
                });
            });

            it("draw one instance in one draw call", function(){
                judge3();
            });
            it("send each instance's mMatrix data to glsl", function () {
                judge4();
            });
            it("vs glsl should contain u_mMatrix", function () {
                judge5();
            });

            describe("test transparent object", function () {
                beforeEach(function(){
                    box1Material.opacity = 0.5;
                });

                it("set webgl state and use program and bind texture and send glsl data(except mMatrix) only once", function () {
                    judge1();

                    expect(program.sendUniformData.withArgs("u_opacity", wd.EVariableType.FLOAT_1, 0.5)).toCalledOnce();
                });

                describe("test bind buffer", function(){
                    beforeEach(function(){
                    });

                    it("not bind array buffer when draw instance", function () {
                        judge2_1();
                    });

                    it("bind element buffer when draw instance", function () {
                        judge2_2();
                    });
                    it("if lastBindedElementBuffer is this element buffer, not bind it", function () {
                        judge2_3();
                    });
                });

                it("draw one instance in one draw call", function(){
                    judge3();
                });
                it("send each instance's mMatrix data to glsl", function () {
                    judge3();
                });
                it("vs glsl should contain u_mMatrix", function () {
                    judge4();
                });
                it("vs glsl should contain u_mMatrix", function () {
                    judge5();
                });
            });

            describe("test multi loops", function () {
                //todo optimize:if elementBuffer not change, not bind again
            });
        });

        describe("remove object instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children", function () {
                prepareWithChild();

                director._init();



                director.scene.removeChild(box1Instance1);



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(box1.render).toCalledOnce();
                expect(box1Instance1.render).not.toCalled();
                expect(box1Instance2.render).not.toCalledOnce();

                expect(box1Child1.render).toCalledOnce();
                expect(box1Instance1.getChild(0).render).not.toCalled();
                expect(box1Instance2.getChild(0).render).not.toCalledOnce();

                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


                expect(gl.drawElements.callCount).toEqual(2 * 2);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });

        describe("add object instance after remove", function () {
            beforeEach(function () {
            });

            it("render it and its children", function () {
                prepareWithChild();

                director._init();



                director.scene.removeChild(box1Instance1);
                director.scene.addChild(box1Instance1);



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


                expect(gl.drawElements.callCount).toEqual(2 * 3);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });

        describe("remove source instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children and its object instances", function () {
                prepareWithChild();

                director._init();


                director.scene.removeChild(box1);


                director.scene.gameObjectScene.render(renderer);
                renderer.render();


                expect(box1.render).not.toCalled();
                expect(box1Instance1.render).not.toCalled();
                expect(box1Instance2.render).not.toCalled();

                expect(box1Child1.render).not.toCalled();
                expect(box1Instance1.getChild(0).render).not.toCalled();
                expect(box1Instance2.getChild(0).render).not.toCalled();

                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(0);


                expect(gl.drawElements).not.toCalled();

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });

        describe("add source instance after remove", function () {
            beforeEach(function () {
            });

            it("render it and its children and its instances", function () {
                prepareWithChild();

                director._init();



                director.scene.removeChild(box1Instance1);
                director.scene.addChild(box1Instance1);



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


                expect(gl.drawElements.callCount).toEqual(2 * 3);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });

        describe("dispose object instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children", function () {
                prepareWithChild();

                director._init();



                box1Instance1.dispose();



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


                expect(gl.drawElements.callCount).toEqual(2 * 2);
            });
        });

        describe("dispose source instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children and dispose its object instances", function () {
                testTool.closeContractCheck(sandbox);
                prepareWithChild();

                director._init();


                box1.dispose();



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(0);


                expect(gl.drawElements).not.toCalled();

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });
    });

    it("if no indices, drawArraysInstancedANGLE", function () {
        testTool.closeContractCheck(sandbox);
        prepareWithoutChild();
        director._init();

        sandbox.stub(box1.getComponent(wd.Geometry).buffers, "getChild").withArgs(wd.EBufferDataType.INDICE).returns(null);
        var vertexBuffer = {
            count:100
        };
        box1.getComponent(wd.Geometry).buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertexBuffer);

        director.scene.gameObjectScene.render(renderer);
        renderer.render();

        expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        expect(extensionInstancedArrays.drawArraysInstancedANGLE).toCalledOnce();
        expect(extensionInstancedArrays.drawArraysInstancedANGLE).toCalledWith(gl.TRIANGLES, 0, 100, 3);
    });

    describe("test instance buffer", function(){
        beforeEach(function(){
        });

        it("create buffer one time only when first draw", function(){
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            var createCount = gl.createBuffer.callCount;
            expect(gl.bufferSubData).toCalledOnce();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.createBuffer.callCount).toEqual(createCount);
            expect(gl.bufferSubData).toCalledTwice();
        });
    });
});
