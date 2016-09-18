describe("one to many instance test", function(){
    var gl = null;
    var device;
    var sandbox;
    var director;
    var gameObject;


    var renderer;
    var camera;

    var extensionInstancedArrays;


    var instanceCount;
    var buffers;

    function createGameObject(){
        var material = wd.ShaderMaterial.create();
        material.read("shaderConfig");





        var geo = wd.InstanceGeometry.create();
        geo.material = material;



        instanceCount = 2;

        for (var i = 0; i < instanceCount; i++) {
            geo.addInstanceAttributes([
                {attributeName: "a_instanceAttribute0", data: buffers.instanceAttribute0[i], size: 1},
                {attributeName: "a_instanceAttribute1", data: buffers.instanceAttribute1[i], size: 2}
            ]);
        }

        geo.indices = buffers.indices;






        gameObject = wd.GameObject.create();

        gameObject.addComponent(wd.MeshRenderer.create());
        gameObject.addComponent(geo);


        var sourceInstanceComponent = wd.OneToManySourceInstance.create();
        gameObject.addComponent(sourceInstanceComponent);


        return gameObject;
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();


        director.scene.addChild(camera);


        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);




        buffers = {
            instanceAttribute0: [
                [0.1],
                [0.3]
            ],
            instanceAttribute1: [
                [0.5, 0.2],
                [0.1,0.1]
            ],

            indices: [0, 1, 2]
        };


    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("if hardware support instance", function(){
        var attributeData,
            shaderDefinitionData,
            vsSource,
            fsSource;


        beforeEach(function(){
            attributeData = [
                1,2,3
            ]

            shaderDefinitionData = {
                attributes: {
                    "a_attribute":{
                        "type":"FLOAT_1",
                        "value": attributeData
                    }
                },
                vsSourceId: "vsSourceId",
                fsSourceId: "fsSourceId"
            };

            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            vsSource = [
                "attribute float a_attribute;",
                "attribute float a_instanceAttribute0;",
                "attribute vec2 a_instanceAttribute1;",

                "void main(void){",
                "gl_Position = u_mvpMatrix * vec4(a_attribute, a_instanceAttribute0, a_instanceAttribute1.x, a_instanceAttribute1.y);",
                "}"
            ].join("\n");

            wd.LoaderManager.getInstance().get.withArgs("vsSourceId").returns(vsSource);

            fsSource = [
                "void main(void){",
                "gl_FragColor = vec4(1.0);",
                "}"
            ].join("\n");

            wd.LoaderManager.getInstance().get.withArgs("fsSourceId").returns(fsSource);


            wd.LoaderManager.getInstance().get.withArgs("shaderConfig").returns(shaderDefinitionData);
        });

        it("there is only one gameObject which has multi instance datas", function () {
            director.scene.addChild(createGameObject());

            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(director.scene.getChildren().getCount()).toEqual(1 + 1);
            var geo = gameObject.getComponent(wd.Geometry);
            expect(geo.attributeData.getCount()).toEqual(instanceCount);
        });
        
        describe("test send instance data", function(){
            function judgeMatricesInstancesArray(){
                var targetMatricesInstancesArray = new Float32Array(1000);


                targetMatricesInstancesArray.set(buffers.instanceAttribute0[0], 0);
                targetMatricesInstancesArray.set(buffers.instanceAttribute1[0], 1);

                targetMatricesInstancesArray.set(buffers.instanceAttribute0[1], 1 + 2);
                targetMatricesInstancesArray.set(buffers.instanceAttribute1[1], 1 + 2 + 1);


                instanceTool.judgeMatricesInstancesArray(targetMatricesInstancesArray)
            }

            function judgeSendMatrixVecData(location, index){
                instanceTool.judgeSendMatrixVecData(location, index);
            }

            function judgeUnBindInstancesBuffer(location, index){
                instanceTool.judgeUnBindInstancesBuffer(location, index);
            }

            beforeEach(function(){
                director.scene.addChild(createGameObject());

                director._init();
            });

            it("test", function () {
                var offsetLocation0 = 11,
                    offsetLocation1 = 12;

                gl.getAttribLocation.withArgs(sinon.match.any, "a_instanceAttribute0").returns(offsetLocation0);
                gl.getAttribLocation.withArgs(sinon.match.any, "a_instanceAttribute1").returns(offsetLocation1);




                director.scene.gameObjectScene.render(renderer);
                renderer.render();




                judgeMatricesInstancesArray();

                expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_instanceAttribute0")).toCalledOnce();
                expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_instanceAttribute1")).toCalledOnce();

                judgeSendMatrixVecData(offsetLocation0, 0);
                var stride = 4 * 1 + 4 * 2;
                expect(gl.vertexAttribPointer).toCalledWith(offsetLocation0, 1, gl.FLOAT, false, stride, 0);


                judgeSendMatrixVecData(offsetLocation1, 1);
                expect(gl.vertexAttribPointer).toCalledWith(offsetLocation1, 2, gl.FLOAT, false, stride, 4 * 1);

                judgeUnBindInstancesBuffer(offsetLocation0, 0);
                judgeUnBindInstancesBuffer(offsetLocation1, 1);
            });

            //todo test cache
        });

        it("test use drawElementsInstancedANGLE to draw", function () {
            director.scene.addChild(createGameObject());

            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();


            expect(gl.drawElements).not.toCalled();

            expect(wd.DebugStatistics.count.drawCalls).toEqual(1);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
        });
        
        describe("test multi gameObjects", function(){
            beforeEach(function(){
            });

            it("the gameObjects can't use drawElementsInstancedANGLE to draw, instead draw one in one draw call", function () {
                var gameObject1 = createGameObject();
                var gameObject2 = gameObject1.clone();

                sandbox.spy(gameObject1, "render");
                sandbox.spy(gameObject2, "render");

                director.scene.addChild(gameObject1);
                director.scene.addChild(gameObject2);

                director._init();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(gameObject1.render).toCalledOnce();
                expect(gameObject2.render).toCalledOnce();

                expect(gl.drawElements).not.toCalled();

                expect(wd.DebugStatistics.count.drawCalls).toEqual(2);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();
            });
        });
    });

    describe("if hardware not support instance", function() {
        var program;

        var attributeData,
            shaderDefinitionData,
            vsSource,
            fsSource;

        function initDirector(){
            director.scene.addChild(createGameObject())
            director._init();
            program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "gameObjectProgram");
        }

        beforeEach(function () {
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;

            testTool.openContractCheck(sandbox);




            attributeData = [
                1,2,3
            ]

            shaderDefinitionData = {
                attributes: {
                    "a_attribute":{
                        "type":"FLOAT_1",
                        "value": attributeData
                    }
                },
                // uniforms:{
                //     "u_instanceAttribute0":{
                //         "type":"FLOAT_1",
                //         "value": buffers.instanceAttribute0
                //     }
                // },
                vsSourceId: "vsSourceId",
                fsSourceId: "fsSourceId"
            };

            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            vsSource = [
                "attribute float a_attribute;",
                "uniform float u_instanceAttribute0;",
                "uniform vec2 u_instanceAttribute1;",

                "void main(void){",
                "gl_Position = u_mvpMatrix * vec4(a_attribute, u_instanceAttribute0, u_instanceAttribute1.x, u_instanceAttribute1.y);",
                "}"
            ].join("\n");

            wd.LoaderManager.getInstance().get.withArgs("vsSourceId").returns(vsSource);

            fsSource = [
                "void main(void){",
                "gl_FragColor = vec4(1.0);",
                "}"
            ].join("\n");

            wd.LoaderManager.getInstance().get.withArgs("fsSourceId").returns(fsSource);


            wd.LoaderManager.getInstance().get.withArgs("shaderConfig").returns(shaderDefinitionData);
        });

        describe("test bind buffer", function(){
            beforeEach(function(){
            });

            it("not bind array buffer when draw instance", function () {
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, sinon.match.object).callCount).toEqual(1);
            });
            it("bind element buffer when draw instance", function () {
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, sinon.match.object).callCount).toEqual(2);
            });
        });

        it("draw one instance in one draw call", function(){
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(gl.drawElements.callCount).toEqual(2);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(2);
                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        });
        it("still only has one gameObject, and it has no instance children", function () {
            initDirector();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gameObject.getChildren().getCount()).toEqual(0);
            expect(director.scene.getChildren().getCount()).toEqual(1 + 1);
        });
        it("send each instance's attribute data", function () {
                initDirector();

                director.scene.gameObjectScene.render(renderer);
                renderer.render();

                expect(program.sendUniformData).toCalledWith("a_instanceAttribute0", wd.EVariableType.FLOAT_1, buffers.instanceAttribute0[0]);
            expect(program.sendUniformData).toCalledWith("a_instanceAttribute0", wd.EVariableType.FLOAT_1, buffers.instanceAttribute0[1]);

            expect(program.sendUniformData).toCalledWith("a_instanceAttribute1", wd.EVariableType.FLOAT_2, buffers.instanceAttribute1[0]);
            expect(program.sendUniformData).toCalledWith("a_instanceAttribute1", wd.EVariableType.FLOAT_2, buffers.instanceAttribute1[1]);
        });
    });
});

