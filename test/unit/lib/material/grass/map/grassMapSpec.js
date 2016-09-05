describe("grass map", function() {
    var sandbox = null;

    var grassMap;
    var material;

    var director;

    var cmd;

    function prepareCmd(){
        cmd = rendererTool.createSingleDrawCommand(sandbox);
        cmd.material = material;
    }

    function makeSureQuadIndexBufferHasData(){
        var buffer = {};
        sandbox.stub(cmd.buffers, "getChild").withArgs(wd.EBufferDataType.CUSTOM, "quadIndices").returns(buffer);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        material = wd.GrassMaterial.create();

        grassMap = wd.ImageTexture.create();

        material.grassMap = grassMap;

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    //todo assert data

    describe("use grass map to implement grass", function () {
        var geometry;
        var gameObject;
        var program;

        beforeEach(function(){
            geometry = wd.GrassMapGeometry.create();
            geometry.material = material;
            geometry.width = 10;
            geometry.height = 20;



            gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            director.scene.addChild(gameObject);
        });

        describe("one grass geometry consist of 3 rect", function () {
            beforeEach(function(){
                sandbox.stub(wd.BufferTable, "bindIndexBuffer");

                director._init();
                program = material.program;
                shaderTool.getAndSpyProgram(sandbox, material, "programA");
            });

            it("test vertices", function () {
                director._loopBody(1);

                geometryTool.judgeVertices(
                    [
                        5, 10, 0, -5, 10, 0, -5, -10, 0, 5, -10, 0, 3.5355339, 10, -3.5355339, -3.5355339, 10, 3.5355339, -3.5355339, -10, 3.5355339, 3.5355339, -10, -3.5355339, 3.5355339, 10, 3.5355339, -3.5355339, 10, -3.5355339, -3.5355339, -10, -3.5355339, 3.5355339, -10, 3.5355339
                    ],
                    program, 0);
            });
            it("each rect has independent texCoord datas", function () {
                director._loopBody(1);

                geometryTool.judgeTexCoords(
                    [
                        1, 1, 0, 1, 0, 0, 1, 0,
                        1, 1, 0, 1, 0, 0, 1, 0,
                        1, 1, 0, 1, 0, 0, 1, 0
                    ],
                    program, 0);
            });
            it("normal data should all in up direction", function () {
                director._loopBody(1);

                geometryTool.judgeNormals(
                    [
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0,
                        0, 1, 0
                    ],
                    program, 0);
            });
            it("test indices", function () {
                director._loopBody(1);

                geometryTool.judgeIndices(
                    [
                        0, 1, 2, 0, 2, 3,
                        4, 5, 6, 4, 6, 7,
                        8, 9, 10, 8, 10, 11
                    ],
                    program, 0);
            });

            describe("quadIndices data decide mapping which part of texture to the corresponding rect", function () {
                it("send quadIndex buffer", function () {
                    director._loopBody(1);

                    geometryTool.judgeAttributeBufferData("a_quadIndex",
                    [
                        0,0,0,0,
                        1,1,1,1,
                        2,2,2,2
                    ], program, 0);
                });

                describe("test glsl source", function () {
                    it("get corresponding sourceRegion of grass map data by judge quadIndex data", function () {
                        director._loopBody(1);

                        expect(glslTool.contain(material.shader.fsSource, "if(v_quadIndex == 0.0){")).toBeTruthy();
                        expect(glslTool.contain(material.shader.fsSource, "sourceRegion = grassMapDatas[0].sourceRegion;")).toBeTruthy();

                        expect(glslTool.contain(material.shader.fsSource, "if(v_quadIndex == 1.0){")).toBeTruthy();
                        expect(glslTool.contain(material.shader.fsSource, "sourceRegion = grassMapDatas[1].sourceRegion;")).toBeTruthy();

                        expect(glslTool.contain(material.shader.fsSource, "if(v_quadIndex == 2.0){")).toBeTruthy();
                        expect(glslTool.contain(material.shader.fsSource, "sourceRegion = grassMapDatas[2].sourceRegion;")).toBeTruthy();
                    });
                });
            });
        });
    });

    it("be visible on both sides", function () {
        material = wd.GrassMaterial.create();

        expect(material.side).toEqual(wd.ESide.BOTH);
    });
    it("enable blend", function () {
        material = wd.GrassMaterial.create();

        expect(material.blend).toBeTruthy();
    });

    describe("test grass map", function () {
        beforeEach(function(){
            prepareCmd();
            makeSureQuadIndexBufferHasData();
        });

        describe("test bind and send grass map", function(){
            beforeEach(function(){
                //var cmd = rendererTool.createSingleDrawCommand(sandbox);
                //
                //cmd.material = material;
                //
                //
                //
                //grassMap = wd.ImageTexture.create();
                //
                //
                //sandbox.stub(grassMap, "bindToUnit");
                //
                //sandbox.stub(grassMap, "update");
                //
                //
                //material.grassMap = grassMap;


                sandbox.stub(grassMap, "bindToUnit");

                sandbox.stub(grassMap, "update");


                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);




                material.updateShader(cmd);
            });

            it("test bind and update grass map", function(){
                expect(grassMap.bindToUnit).toCalledWith(0);

                expect(grassMap.update).toCalledOnce();
            });
            it("only support one grass map", function () {
                expect(material.program.sendUniformData).toCalledWith("u_grassMapSampler", wd.EVariableType.SAMPLER_2D, 0);
                expect(material.program.sendUniformData.withArgs(sinon.match.string, wd.EVariableType.SAMPLER_2D, sinon.match.number)).toCalledOnce();
            });
        });

        describe("test send grass map data", function(){
            var mapData;

            beforeEach(function(){
                grassMap.width = 1024;
                grassMap.height = 128;
                var width = grassMap.width / 4,
                    height = grassMap.height;
                mapData = [
                    {
                        sourceRegion:wd.RectRegion.create(0, 0, width, height)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(width, 0, width, height)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(width * 2, 0, width, height)
                    }
                ];

                material.mapData = mapData;
            });

            it("send 3 sourceRegion data which are converted to uv coordinate for the corresponding part of grass map on the rect", function () {
                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);

                mapData.forEach(function(data, index){
                    expect(material.program.sendStructureData).toCalledWith("u_grassMapDatas[" + index + "].sourceRegion", wd.EVariableType.VECTOR_4, wd.GlobalTextureUtils.convertSourceRegionCanvasMapToUV(data.sourceRegion, grassMap.width, grassMap.height));
                });
            });
            it("not support repeatRegion", function () {
                grassMap.repeatRegion = wd.RectRegion.create(0.1, 0.2, 1, 2);
                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);

                mapData.forEach(function(data, index){
                    expect(material.program.sendStructureData).not.toCalledWith("u_grassMapDatas[" + index + "].repeatRegion");
                });
            });
        });
    });

    it("enable alpha test", function () {
        material.alphaTest = 0.2;

        materialTool.init(material);
        material.updateShader(cmd);

        expect(glslTool.contain(material.shader.fsSource, "if (totalColor.a < 0.2){")).toBeTruthy();
    });

    describe("test animation", function(){
        beforeEach(function(){
            prepareCmd();
            makeSureQuadIndexBufferHasData();
        });

        it("test time increase at each frame", function(){
            material.wind.speed = 0.1;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);
            material.updateShader(cmd);

            expect(material.program.sendStructureData).toCalledWith("u_windData.time", wd.EVariableType.FLOAT_1, 0.1);
            expect(material.program.sendStructureData).toCalledWith("u_windData.time", wd.EVariableType.FLOAT_1, 0.2);
        });
        it("send wind direction,strength", function(){
            material.wind.direction = wd.Vector2.create(2,0.5);
            material.wind.strength = 5;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);

            expect(material.program.sendStructureData).toCalledWith("u_windData.direction", wd.EVariableType.VECTOR_2, material.wind.direction);
            expect(material.program.sendStructureData).toCalledWith("u_windData.strength", wd.EVariableType.FLOAT_1, material.wind.strength);
        });

        describe("test fs glsl source", function () {
            var fsSource;

            beforeEach(function(){
                materialTool.init(material);
                shaderTool.spyProgram(sandbox, material);

                material.updateShader(cmd);

                fsSource = material.shader.fsSource;
            });

            it("only affect top part of grass", function () {
                expect(glslTool.containMultiLine(fsSource, [
                    "bool isTopPartOfGrass(){",
                    "return v_grassTexCoord.y > 0.1;",
                    "}"
                ])).toBeTruthy();
            });
            it("use sin function to generate animation effect", function () {
                expect(glslTool.contain(fsSource, "float windPower = sin(u_windData.time) * u_windData.strength;"));
            });
            it("affect v_grassTexCoord", function () {
                expect(glslTool.containMultiLine(fsSource, [
                    "if(isTopPartOfGrass()){",
                    "grassTexCoord = v_grassTexCoord + u_windData.direction *  getWindPower();",
                    "}"
                ])).toBeTruthy();
            });
        });
    });
});

