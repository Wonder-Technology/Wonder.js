describe("basic bitmapFont test", function () {
    var sandbox = null;
    var font;
    var material, geometry;
    var gameObject;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.closeContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        director = wd.Director.getInstance();

        director.scene.addChild(testTool.createCamera());


        font = wd.ThreeDBitmapFont.create();

        geometry = wd.BitmapFontGeometry.create();

        gameObject = wd.GameObject.create();

        gameObject.addComponent(font);
        gameObject.addComponent(geometry);

        gameObject.addComponent(wd.MeshRenderer.create());


        director.scene.addChild(gameObject);





    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test render", function(){
        var program;
        var map;

        function initDirector(){
            director._init();

            program = material.program;
            shaderTool.getAndSpyProgram(sandbox, material, "programA");
        }

        function setWidth(width){
            font.width = width;
        }

        function setHeight(height){
            font.height = height;
        }

        function judgeVertices(vertices, callIndex){
            expect(testTool.getValues(
                program.sendAttributeBuffer.withArgs("a_position").getCall(callIndex || 0).args[2].data
            )).toEqual(
                vertices
            )
        }

        function judgeTexCoords(texCoords, callIndex){
            expect(testTool.getValues(
                program.sendAttributeBuffer.withArgs("a_texCoord").getCall(callIndex || 0).args[2].data
            )).toEqual(
                texCoords
            )
        }

        function judgeIndices(indices, callIndex){
            expect(testTool.getValues(
                wd.BufferTable.bindIndexBuffer.getCall(callIndex || 0).args[0].data)).toEqual(
                indices
            );
        }

        beforeEach(function(){
            font.fntId = "myFont_fnt";


            sandbox.stub(wd.LoaderManager.getInstance(), "get");

            var charData = {
                        rect: {
                            x: 0,
                            y: 0,
                            width: 100,
                            height: 200
                        },
                        xOffset: 1,
                        yOffset: 2,
                        xAdvance: 3
                    };

            wd.LoaderManager.getInstance().get.withArgs(font.fntId).returns({
                fontDefDictionary: {
                    1: charData
                },
                commonHeight:50,
                commonBase:0,
                scaleW:500,
                scaleH:600
            });

            sandbox.stub(font._layout._searchGlyph, "getGlyphById").returns(charData);


            map = wd.ImageTexture.create();
            map.flipY = false;


            material = wd.BasicBitmapFontMaterial.create();
            material.bitmap = map;

            geometry.material = material;


            sandbox.stub(wd.BufferTable, "bindIndexBuffer");
        });

        it("convert font anchor from left top to center", function () {
            font.text = "正";
            setWidth(1000);
            setHeight(500);

            initDirector();

            director._loopBody(1);

            judgeVertices(
                [
                    1 - 1000 / 2, -2 + 500 / 2, 0,
                    1 - 1000 / 2, -202 + 500 / 2, 0,
                    101 - 1000 / 2, -202 + 500 / 2, 0,
                    101 - 1000 / 2, -2 + 500 / 2, 0
                ]
            )
        });

        it("only one gameObject and its geometry contains the whole text data", function () {
            font.text = "正a";
            setWidth(1000);

            initDirector();

            director._loopBody(1);

            judgeVertices(
                [
                    -499, -2, 0, -499, -202, 0, -399, -202, 0, -399, -2, 0, -496, -2, 0, -496, -202, 0, -396, -202, 0, -396, -2, 0
                ]
            )
            judgeTexCoords(
                [
                    0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0, 0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0
                ]
            )
            judgeIndices([
                    0,1,2,0,2,3,4,5,6,4,6,7
                ])
        });

        it("the font gameObject's position should at the zero point", function () {
            font.text = "正a";

            initDirector();

            director._loopBody(1);

            expect(testTool.getValues(gameObject.transform.position)).toEqual([0,0,0]);
        });

        describe("test multi line", function(){
            it("newline text should toward -y axis", function(){
                font.text = "正a";
                setWidth(0);

                initDirector();

                director._loopBody(1);

                judgeVertices(
                    [
                        1, -2, 0,
                        1, -202, 0,
                        101, -202, 0,
                        101, -2, 0,

                        1, -52, 0,
                        1, -252, 0,
                        101, -252, 0,
                        101, -52, 0
                    ]
                )
            });
        });

        describe("map", function(){
            beforeEach(function(){
            });
            
            it("if map is flipY, corresponding modify geometry->texCoords", function(){
                map.flipY = true;

                font.text = "正a";

                setWidth(1000);

                initDirector();

                director._loopBody(1);

                judgeTexCoords(
                    [
                        0, 1, 0, 0.6666667, 0.2, 0.6666667, 0.2, 1, 0, 1, 0, 0.6666667, 0.2, 0.6666667, 0.2, 1
                    ]
                )
            });
        });

        describe("test change text", function(){
            beforeEach(function(){
            });

            it("update geometry->vertices,faces,texCoords", function(){
                font.text = "正a";

                setWidth(1000);

                initDirector();

                director._loopBody(1);


                judgeVertices(
                    [
                        -499, -2, 0, -499, -202, 0, -399, -202, 0, -399, -2, 0, -496, -2, 0, -496, -202, 0, -396, -202, 0, -396, -2, 0
                    ]
                )
                judgeTexCoords(
                    [
                        0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0, 0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0
                    ]
                )
                judgeIndices([
                    0,1,2,0,2,3,4,5,6,4,6,7
                ])


                font.text = "a";

                director._loopBody(2);

                judgeVertices(
                    [
                        -499, -2, 0, -499, -202, 0, -399, -202, 0, -399, -2, 0
                    ]
                )
                judgeTexCoords(
                    [
                        0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0
                    ]
                )
                judgeIndices([
                    0, 1, 2, 0, 2, 3
                ])
            });
        });

        describe("test change width", function(){
            beforeEach(function(){
            });

            it("update geometry->vertices,faces,texCoords", function(){
                font.text = "正a";

                setWidth(1000);

                initDirector();

                director._loopBody(1);


                judgeVertices(
                    [
                        -499, -2, 0, -499, -202, 0, -399, -202, 0, -399, -2, 0, -496, -2, 0, -496, -202, 0, -396, -202, 0, -396, -2, 0
                    ]
                )
                judgeTexCoords(
                    [
                        0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0, 0, 0, 0, 0.3333333, 0.2, 0.3333333, 0.2, 0
                    ]
                )
                judgeIndices([
                    0,1,2,0,2,3,4,5,6,4,6,7
                ])


                setWidth(0);

                director._loopBody(2);

                judgeVertices(
                    [
                        1, -2, 0,
                        1, -202, 0,
                        101, -202, 0,
                        101, -2, 0,

                        1, -52, 0,
                        1, -252, 0,
                        101, -252, 0,
                        101, -52, 0
                    ]
                )
            });
        });
    });

    describe("test more", function(){
        var material,map,quadCmd;

        beforeEach(function(){

            material = wd.BasicBitmapFontMaterial.create();

            quadCmd = rendererTool.createSingleDrawCommand(sandbox);

            quadCmd.material = material;

            geometry.material = material;
        });

        describe("test bitmap", function(){
            it("test bind and send map data", function () {
                var map = wd.ImageTexture.create();


                sandbox.stub(map, "bindToUnit");

                sandbox.stub(map, "update");


                material.bitmap = map;


                material.init();
                shaderTool.stubProgram(sandbox, material);




                material.updateShader(quadCmd);


                expect(map.bindToUnit).toCalledWith(0);

                expect(map.update).toCalledOnce();




                expect(material.program.sendUniformData).toCalledWith("u_bitmapSampler", wd.EVariableType.SAMPLER_2D, 0);
            });
        });
    });
});
