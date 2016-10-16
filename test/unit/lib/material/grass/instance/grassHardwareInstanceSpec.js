describe("test grass hardware instance", function() {
    var sandbox = null;

    var grassMap;
    var material;

    var director;

    var extensionInstancedArrays;

    var cmd;

    function prepareCmd(){
        cmd = rendererTool.createQuadCommand(sandbox);
        cmd.material = material;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        material = wd.GrassInstanceMaterial.create();

        grassMap = wd.ImageTexture.create();

        material.map = grassMap;

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("clone", function(){
        it("clone basic data", function () {
            var time = 1,
                speed = 10;

            cloneTool.extend(material, {
                time:time,
                speed:speed
            });

            var result = material.clone();

            expect(result.time).toEqual(time);
            expect(result.speed).toEqual(speed);
        });
        it("clone grassMap", function () {
            var grassMap = wd.ImageTexture.create({});
            var cloneGrassMap = wd.ImageTexture.create({});
            sandbox.stub(grassMap, "clone").returns(cloneGrassMap);

            cloneTool.extend(material, {
                map:grassMap
            });

            var result = material.clone();

            expect(result.map).toEqual(cloneGrassMap);
        });
        it("clone terrainGeometry", function () {
            var geo = wd.TerrainGeometry.create();

            cloneTool.extend(material, {
                terrainGeometry:geo
            });

            var result = material.clone();

            expect(result.terrainGeometry === geo).toBeTruthy();
        });
    });

    describe("test shader", function () {
        beforeEach(function(){
        });

        describe("test bind and send map", function(){
            beforeEach(function(){
                prepareCmd();

                grassInstanceTool.setFakeGeoemtry(material);

                grassInstanceTool.setFakeTerrainGeoemtry(material);

                sandbox.stub(grassMap, "bindToUnit");

                sandbox.stub(grassMap, "update");


                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);



                material.updateShader(cmd);
            });

            it("test bind and update map", function(){
                expect(grassMap.bindToUnit).toCalledWith(0);

                expect(grassMap.update).toCalledOnce();
            });
            it("send map data", function () {
                expect(material.program.sendUniformData).toCalledWith("u_grassMapSampler", wd.EVariableType.SAMPLER_2D, 0);
            });
        });

        describe("test send glsl data", function(){
            var device;
            var gl;
            var camera;
            var director;

            var gameObject;
            var program;


            beforeEach(function(){
                device = wd.DeviceManager.getInstance();

                sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
                gl = device.gl;

                director = wd.Director.getInstance();

                camera = testTool.createCamera();


                director.scene.addChild(camera);


                gameObject = grassInstanceTool.createGrass();
                material = gameObject.getComponent(wd.Geometry).material;

                grassInstanceTool.setFakeTerrainGeoemtry(material);

                director.scene.addChild(gameObject);
            });

            it("test send a_vertexIndex", function () {
                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");

                rendererTool.renderGameObjectScene();

                expect(testTool.getValues(
                    program.sendAttributeBuffer.withArgs("a_vertexIndex").firstCall.args[2].data
                )).toEqual([
                    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
                ]);
            });
            it("should send all buffer data", function () {
                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");
                sandbox.stub(program, "sendAllBufferData");

                rendererTool.renderGameObjectScene();

                expect(program.sendAllBufferData).toCalledOnce();
            });

            describe("test send uniform data", function () {
                beforeEach(function(){
                });

                describe("send basic data", function(){
                    beforeEach(function(){
                        director._init();
                        program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");
                    });

                    it("send u_mMatrix", function () {
                        gameObject.transform.position = wd.Vector3.create(10, 0, 0);

                        rendererTool.renderGameObjectScene();

                        expect(testTool.getValues(
                            program.sendUniformData.withArgs("u_mMatrix").firstCall.args[2],
                            1
                        )).toEqual([
                            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 0, 0, 1
                        ]);
                    });
                    it("send u_vpMatrix", function () {
                        gameObject.transform.position = wd.Vector3.create(10, 0, 0);

                        rendererTool.renderGameObjectScene();

                        expect(testTool.getValues(
                            program.sendUniformData.withArgs("u_vpMatrix").firstCall.args[2],
                            1
                        )).toEqual([
                            1.7, 0, 0, 0, 0, 1.7, 0, 0, 0, 0, -1, -1, 0, 0, 19.8, 20
                        ]);
                    });
                    it("send range", function () {
                        material.geometry.rangeWidth = 2;
                        material.geometry.rangeHeight = 3;

                        rendererTool.renderGameObjectScene();

                        expect(program.sendUniformData).toCalledWith("u_grassRangeWidth", wd.EVariableType.FLOAT_1, 2);
                        expect(program.sendUniformData).toCalledWith("u_grassRangeHeight", wd.EVariableType.FLOAT_1, 3);
                    });
                    it("send u_time", function () {
                        material.time = 2;

                        rendererTool.renderGameObjectScene();

                        expect(program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, material.time);
                    });
                });
            });

            describe("test send instance data", function(){
                function judgeMatricesInstancesArray(targetMatricesInstancesArrData){
                    var targetMatricesInstancesArray = new Float32Array(targetMatricesInstancesArrData);

                    instanceTool.judgeMatricesInstancesArray(targetMatricesInstancesArray);
                }

                beforeEach(function(){
                    sandbox.stub(Math, "random").returns(0.5);

                    director._init();
                    program = shaderTool.getAndSpyProgram(sandbox, gameObject.getComponent(wd.Geometry).material, "grassProgram");
                });

                it("test", function(){
                    var offsetLocation0 = 11,
                        offsetLocation1 = 12;

                    gl.getAttribLocation.withArgs(sinon.match.any, "a_shape").returns(offsetLocation0);
                    gl.getAttribLocation.withArgs(sinon.match.any, "a_offset").returns(offsetLocation1);





                    rendererTool.renderGameObjectScene();




                    judgeMatricesInstancesArray(
                        [
                            0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1, 0.2, 2.1, 0.1, 0.3, 2.5, 0, 2.5, 3.1
                        ]
                    );


                    expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_shape")).toCalledOnce();
                    expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_offset")).toCalledOnce();

                    instanceTool.judgeSendMatrixVecData(offsetLocation0, 0);

                    var stride = 32;
                    expect(gl.vertexAttribPointer).toCalledWith(offsetLocation0, 4, gl.FLOAT, false, stride, 0);

                    instanceTool.judgeSendMatrixVecData(offsetLocation1, 0);
                    expect(gl.vertexAttribPointer).toCalledWith(offsetLocation1, 4, gl.FLOAT, false, stride, 16);

                    instanceTool.judgeUnBindInstancesBuffer(offsetLocation0, 0);
                    instanceTool.judgeUnBindInstancesBuffer(offsetLocation1, 1);
                });
                it("test use drawElementsInstancedANGLE to draw", function () {
                    wd.DebugStatistics.clear();

                    rendererTool.renderGameObjectScene();


                    expect(gl.drawElements).not.toCalled();

                    expect(wd.DebugStatistics.count.drawCalls).toEqual(1);

                    expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
                });
            });
        });
        
        describe("test glsl source", function(){
            beforeEach(function(){
            });

            describe("should contain uniform variables", function(){
                it("test vs source", function () {
                    materialTool.init(material);

                    var source = material.shader.vsSource;

                    expect(glslTool.containMultiLine(
                        source,
                        [
                            "uniform mat4 u_mMatrix;",
                            "uniform mat4 u_vpMatrix;",
                            "uniform float u_grassRangeWidth;",
                            "uniform float u_grassRangeHeight;",
                            "uniform float u_time;"
                            ]
                    )).toBeTruthy();
                });
                it("test fs source", function () {
                    materialTool.init(material);

                    var source = material.shader.fsSource;

                    expect(glslTool.contain(
                        source,
                        "uniform sampler2D u_grassMapSampler"
                    )).toBeTruthy();
                });
            });

            it("should contain attribute variables", function(){
                materialTool.init(material);

                var source = material.shader.vsSource;

                expect(glslTool.contain(
                    source,
                    "attribute vec4 a_offset;"
                )).toBeTruthy();
                expect(glslTool.contain(
                    source,
                    "attribute vec4 a_shape;"
                )).toBeTruthy();
            });

            it("should set precision only once", function () {
                wd.GPUDetector.getInstance().precision = wd.EGPUPrecision.HIGHP;

                materialTool.init(material);


                shaderTool.judgeGLSLContainSpecifyCount(
                    material.shader.vsSource,
                    "precision highp float;",
                    1
                );
                shaderTool.judgeGLSLContainSpecifyCount(
                    material.shader.fsSource,
                    "precision highp float;",
                    1
                );
            });

            it("test define", function () {
                 material.geometry = wd.GrassInstanceGeometry.create();

                materialTool.init(material);

                shaderTool.judgeGLSLDefine(
                    material.shader.vsSource,
                    "BLADE_SEGS",
                    "4.0"
                );
                shaderTool.judgeGLSLDefine(
                    material.shader.vsSource,
                    "BLADE_DIVS",
                    "5.0"
                );
                shaderTool.judgeGLSLDefine(
                    material.shader.vsSource,
                    "BLADE_VERTS",
                    "10.0"
                );
            });
            it("grass anchor should be the center point of the range", function () {
                materialTool.init(material);

                var source = material.shader.vsSource;

                expect(glslTool.containMultiLine(
                    source,
                    [
                        "pos.x += u_grassRangeWidth / 2.0 - a_offset.x;",
                        "pos.z += u_grassRangeHeight / 2.0 - a_offset.z;"
                    ]
                )).toBeTruthy();
            });
        });
    });
});

