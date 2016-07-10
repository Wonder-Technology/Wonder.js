describe("threeD bitmapFont test", function () {
    var sandbox = null;
    var font;
    var material, geometry;
    var gameObject;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

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
        var texture;
        var program;

        function initDirector(){
            director._init();

            program = material.program;
            shaderTool.getAndStubProgram(sandbox, material, "programA");
        }

        function setWidth(width){
            font.width = width;
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


            texture = wd.ImageTexture.create();
            texture.flipY = false;


            material = wd.BasicMaterial.create();
            material.map = texture;

            geometry.material = material;


            sandbox.stub(wd.BufferTable, "bindIndexBuffer");
        });

        it("only one gameObject and its geometry contains the whole text data", function () {
            font.text = "正a";
            setWidth(1000);

            initDirector();

            director._loopBody(1);

            judgeVertices(
                [
                    1, -2, 0,
                    1, -202, 0,
                    101, -202, 0,
                    101, -2, 0,

                    4, -2, 0,
                    4, -202, 0,
                    104, -202, 0,
                    104, -2, 0
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

        describe("texture", function(){
            beforeEach(function(){
            });
            
            it("if texture is flipY, corresponding modify geometry->texCoords", function(){
                texture.flipY = true;

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
                        1, -2, 0,
                        1, -202, 0,
                        101, -202, 0,
                        101, -2, 0,

                        4, -2, 0,
                        4, -202, 0,
                        104, -202, 0,
                        104, -2, 0
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
                        1, -2, 0,
                        1, -202, 0,
                        101, -202, 0,
                        101, -2, 0
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
                        1, -2, 0,
                        1, -202, 0,
                        101, -202, 0,
                        101, -2, 0,

                        4, -2, 0,
                        4, -202, 0,
                        104, -202, 0,
                        104, -2, 0
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
});
