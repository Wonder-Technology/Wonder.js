describe("DirectionLight", function() {
    var sandbox = null;
    var light = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        light = new wd.DirectionLight();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
            sandbox.stub(wd.GPUDetector.getInstance(), "maxCubemapTextureSize", 10000);
        });

        it("clone Light data", function(){
            var shadowMapWidth = 1000,
                shadowMapHeight = 2000,
                color = wd.Color.create("#123456"),
                castShadow = true,
                shadowCameraNear = 0.5,
                shadowCameraFar = 100,
                shadowBias = 0.1,
                shadowDarkness = 0.5;


            cloneTool.extend(light, {
                shadowMapWidth: shadowMapWidth,
                shadowMapHeight: shadowMapHeight,
                color: color,
                castShadow: castShadow,
                shadowCameraNear: shadowCameraNear,
                shadowCameraFar: shadowCameraFar,
                shadowBias: shadowBias,
                shadowDarkness: shadowDarkness
            });

            var result = light.clone();

            expect(result === light).toBeFalsy();
            expect(result.shadowMapWidth).toEqual(shadowMapWidth);
            expect(result.shadowMapHeight).toEqual(shadowMapHeight);
            expect(result.color).toEqual(color);
            expect(result.castShadow).toEqual(castShadow);
            expect(result.shadowCameraNear).toEqual(shadowCameraNear);
            expect(result.shadowCameraFar).toEqual(shadowCameraFar);
            expect(result.shadowBias).toEqual(shadowBias);
            expect(result.shadowDarkness).toEqual(shadowDarkness);
        });
        it("clone SourceLight data", function(){
            var intensity = 10;

            cloneTool.extend(light, {
                intensity:intensity
            });

            var result = light.clone();

            expect(result === light).toBeFalsy();
            expect(result.intensity).toEqual(intensity);
        });
        it("clone DirectionLight data", function () {
            var shadowCameraLeft = -2000,
                shadowCameraRight = 2000,
                shadowCameraTop = 2000,
                shadowCameraBottom = -2000;


            cloneTool.extend(light, {
                shadowCameraLeft: shadowCameraLeft,
                shadowCameraRight: shadowCameraRight,
                shadowCameraTop: shadowCameraTop,
                shadowCameraBottom: shadowCameraBottom
            });

            var result = light.clone();

            expect(result === light).toBeFalsy();
            expect(result.shadowCameraLeft).toEqual(shadowCameraLeft);
            expect(result.shadowCameraRight).toEqual(shadowCameraRight);
            expect(result.shadowCameraTop).toEqual(shadowCameraTop);
            expect(result.shadowCameraBottom).toEqual(shadowCameraBottom);
        });
    });
});

