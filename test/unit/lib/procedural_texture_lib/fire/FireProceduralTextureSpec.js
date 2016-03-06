describe("FireProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.FireProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.fireColorType).toEqual(wd.EFireProceduralTextureColorType.RED);
        expect(texture.time).toEqual(0);
        expect(texture.speed).toEqual(wd.Vector2.create(0.5, 0.3));
        expect(texture.alphaThreshold).toEqual(0.5);
        expect(texture.shift).toEqual(1);
    });

    describe("fireColorMap(getter)", function(){
        beforeEach(function(){
        });

        it("if color type === custom, return setter data", function(){
            texture.fireColorType = wd.EFireProceduralTextureColorType.CUSTOM;
            var map = wdCb.Hash.create({
                "c1": wd.Color.create("rgb(0.8, 1.0, 0.0)"),
                "c2": wd.Color.create("rgb(0.9, 0.0, 0.0)"),
                "c3": wd.Color.create("rgb(0.2, 0.0, 0.0)"),
                "c4": wd.Color.create("rgb(1.0, 0.9, 0.0)"),
                "c5": wd.Color.create("rgb(0.1, 0.1, 0.1)"),
                "c6": wd.Color.create("rgb(0.9, 0.9, 0.9)")
            });
            texture.fireColorMap = map;

            expect(texture.fireColorMap).toEqual(map);
        });
        it("if color type === red, return red data", function(){
            texture.fireColorType = wd.EFireProceduralTextureColorType.RED;

            expect(texture.fireColorMap).toEqual(wdCb.Hash.create({
                "c1": wd.Color.create("rgb(0.5, 0.0, 0.1)"),
                "c2": wd.Color.create("rgb(0.9, 0.0, 0.0)"),
                "c3": wd.Color.create("rgb(0.2, 0.0, 0.0)"),
                "c4": wd.Color.create("rgb(1.0, 0.9, 0.0)"),
                "c5": wd.Color.create("rgb(0.1, 0.1, 0.1)"),
                "c6": wd.Color.create("rgb(0.9, 0.9, 0.9)")
            }));
        });
        it("if color type === blue, return red data", function(){
            texture.fireColorType = wd.EFireProceduralTextureColorType.BLUE;

            expect(texture.fireColorMap).toEqual(wdCb.Hash.create({
                "c1": wd.Color.create("rgb(0.1, 0.0, 0.5)"),
                "c2": wd.Color.create("rgb(0.0, 0.0, 0.5)"),
                "c3": wd.Color.create("rgb(0.1, 0.0, 0.2)"),
                "c4": wd.Color.create("rgb(0.0, 0.0, 1.0)"),
                "c5": wd.Color.create("rgb(0.1, 0.2, 0.3)"),
                "c6": wd.Color.create("rgb(0.0, 0.2, 0.9)")
            }));
        });
        it("if color type === purple, return red data", function(){
            texture.fireColorType = wd.EFireProceduralTextureColorType.PURPLE;

            expect(texture.fireColorMap).toEqual(wdCb.Hash.create({
                "c1": wd.Color.create("rgb(0.5, 0.0, 1.0)"),
                "c2": wd.Color.create("rgb(0.9, 0.0, 1.0)"),
                "c3": wd.Color.create("rgb(0.2, 0.0, 1.0)"),
                "c4": wd.Color.create("rgb(1.0, 0.9, 1.0)"),
                "c5": wd.Color.create("rgb(0.1, 0.1, 1.0)"),
                "c6": wd.Color.create("rgb(0.9, 0.9, 1.0)")
            }));
        });
        it("if color type === green, return red data", function(){
            texture.fireColorType = wd.EFireProceduralTextureColorType.GREEN;

            expect(texture.fireColorMap).toEqual(wdCb.Hash.create({
                "c1": wd.Color.create("rgb(0.5, 1.0, 0.0)"),
                "c2": wd.Color.create("rgb(0.5, 1.0, 0.0)"),
                "c3": wd.Color.create("rgb(0.3, 0.4, 0.0)"),
                "c4": wd.Color.create("rgb(0.5, 1.0, 0.0)"),
                "c5": wd.Color.create("rgb(0.2, 0.0, 0.0)"),
                "c6": wd.Color.create("rgb(0.5, 1.0, 0.0)")
            }));
        });
    });

    describe("fireColorMap(setter)", function(){
        beforeEach(function(){
        });

        it("data should contain 6 colors", function(){
            testTool.openContractCheck(sandbox);

            expect(function(){
                texture.fireColorMap = wdCb.Hash.create({
                    "c1": wd.Color.create("rgb(0.8, 1.0, 0.0)"),
                    "c2": wd.Color.create("rgb(0.9, 0.0, 0.0)"),
                    "c3": wd.Color.create("rgb(0.2, 0.0, 0.0)"),
                    "c4": wd.Color.create("rgb(1.0, 0.9, 0.0)"),
                    "c5": wd.Color.create("rgb(0.1, 0.1, 0.1)")
                });
            }).toThrow();
        });
    });

    describe("init", function(){
        it("add FireProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.FireProceduralRenderTargetRenderer));
        });
    });

    describe("computeTime", function(){
        it("compute time", function(){
            texture.time = 0;

            texture.computeTime();

            expect(texture.time).toEqual(0.1);
        });
    });
});

