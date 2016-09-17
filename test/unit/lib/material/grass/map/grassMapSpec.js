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

        material.map.grassMap = grassMap;

    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("mapData(setter)", function(){
        beforeEach(function(){
            testTool.openContractCheck(sandbox);
        });

        it("should contain 3 sourceRegion data", function () {
            expect(function(){
                material.map.mapData = [
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    }
                ];
            }).toThrow("should contain 3 sourceRegion data");

            expect(function(){
                material.map.mapData = [
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    }
                ];
            }).not.toThrow();
        });
    });

    describe("clone", function(){
        it("clone basic data", function () {
            var alphaTest = 0.5;

            cloneTool.extend(material.map, {
                alphaTest:alphaTest
            });

            var result = material.clone().map;

            expect(result.alphaTest).toEqual(alphaTest);
        });
        it("clone wind data", function () {
            var wind = wd.GrassWindModel.create();
            wind.direction = wd.Vector2.create(2,3);
            var cloneDirection = wd.Vector2.create(1,5);
            sandbox.stub(wind.direction, "clone").returns(cloneDirection);

            wind.time = 1;
            wind.speed = 10;
            wind.strength = 100;


            cloneTool.extend(material.map, {
                wind:wind
            });

            var result = material.clone().map;

            expect(result.wind.time).toEqual(wind.time);
            expect(result.wind.speed).toEqual(wind.speed);
            expect(result.wind.strength).toEqual(wind.strength);
            expect(result.wind.direction).toEqual(cloneDirection);
        });
        it("clone grassMap", function () {
            var grassMap = wd.ImageTexture.create({});
            var cloneGrassMap = wd.ImageTexture.create({});
            sandbox.stub(grassMap, "clone").returns(cloneGrassMap);

            cloneTool.extend(material.map, {
                grassMap:grassMap
            });

            var result = material.clone().map;

            expect(result.grassMap).toEqual(cloneGrassMap);
        });
        it("deep clone mapData", function () {
            var mapData = [
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    },
                    {
                        sourceRegion:wd.RectRegion.create(1,100, 200,300)
                    }
                ];

            var cloneSourceRegion1 = wd.RectRegion.create(1,100, 200,300);
            var cloneSourceRegion2 = wd.RectRegion.create(2,100, 200,300);
            var cloneSourceRegion3 = wd.RectRegion.create(3,100, 200,300);

            sandbox.stub(mapData[0].sourceRegion, "clone").returns(cloneSourceRegion1);
            sandbox.stub(mapData[1].sourceRegion, "clone").returns(cloneSourceRegion2);
            sandbox.stub(mapData[2].sourceRegion, "clone").returns(cloneSourceRegion3);


            cloneTool.extend(material.map, {
                mapData:mapData
            });


            var result = material.clone().map;

            expect(result.mapData).toEqual([
                    {
                        sourceRegion:cloneSourceRegion1
                    },
                    {
                        sourceRegion:cloneSourceRegion2
                    },
                    {
                        sourceRegion:cloneSourceRegion3
                    }
            ]);
        });
    });

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
    //it("enable blend", function () {
    //    material = wd.GrassMaterial.create();
    //
    //    expect(material.blend).toBeTruthy();
    //});

    describe("test grass map", function () {
        beforeEach(function(){
            prepareCmd();
            makeSureQuadIndexBufferHasData();
        });

        describe("test bind and send grass map", function(){
            beforeEach(function(){
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

                material.map.mapData = mapData;
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
        material.map.alphaTest = 0.2;

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
            material.map.wind.speed = 0.1;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);
            material.updateShader(cmd);

            expect(material.program.sendStructureData).toCalledWith("u_windData.time", wd.EVariableType.FLOAT_1, 0.1);
            expect(material.program.sendStructureData).toCalledWith("u_windData.time", wd.EVariableType.FLOAT_1, 0.2);
        });
        it("send wind direction,strength", function(){
            material.map.wind.direction = wd.Vector2.create(2,0.5);
            material.map.wind.strength = 5;

            materialTool.init(material);
            shaderTool.spyProgram(sandbox, material);

            material.updateShader(cmd);

            expect(material.program.sendStructureData).toCalledWith("u_windData.direction", wd.EVariableType.VECTOR_2, material.map.wind.direction);
            expect(material.program.sendStructureData).toCalledWith("u_windData.strength", wd.EVariableType.FLOAT_1, material.map.wind.strength);
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

