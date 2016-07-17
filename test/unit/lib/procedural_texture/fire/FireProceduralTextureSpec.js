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

    describe("initWhenCreate", function(){
        beforeEach(function(){
        });

        it("ensure that the texture should be rendered more than 1 time", function () {
            texture = wd.FireProceduralTexture.create();

            expect(texture.renderRate).toEqual(1);
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

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone fireColorMap", function () {
            var Color = wd.Color;
            var fireColorMap = wdCb.Hash.create({
                        "c1": Color.create("rgb(0.5, 0.2, 0.1)"),
                        "c2": Color.create("rgb(0.9, 0.0, 0.0)"),
                        "c3": Color.create("rgb(0.2, 0.0, 0.0)"),
                        "c4": Color.create("rgb(1.0, 0.9, 0.0)"),
                        "c5": Color.create("rgb(0.1, 0.1, 0.1)"),
                        "c6": Color.create("rgb(0.9, 0.9, 0.9)")
                    });

            texture.fireColorMap = fireColorMap;

            var result = texture.clone();

            expect(result.fireColorMap).toEqual(fireColorMap);
        });

        it("clone data", function () {
            var fireColorType = wd.EFireProceduralTextureColorType.CUSTOM,
                speed = wd.Vector2.create(1,1),
                alphaThreshold = 10,
                shift = 10,
                time = 10;

            cloneTool.extend(texture, {
                    fireColorType: fireColorType,
                    speed: speed,
                alphaThreshold: alphaThreshold,
                shift: shift,
                time: time
            });

            var result = texture.clone();

            expect(result.fireColorType).toEqual(fireColorType);
            expect(result.speed).toEqual(speed);
            expect(result.speed === texture.speed).toBeFalsy();
            expect(result.alphaThreshold).toEqual(alphaThreshold);
            expect(result.shift).toEqual(shift);
            expect(result.time).toEqual(time);
        });
    });
});

