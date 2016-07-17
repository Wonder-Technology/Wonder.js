describe("MarbleProceduralTexture", function () {
    var sandbox = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        texture = new wd.MarbleProceduralTexture();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("test default value", function(){
        expect(texture.tilesHeightNumber).toEqual(3);
        expect(texture.tilesWidthNumber).toEqual(3);
        expect(texture.amplitude).toEqual(9);
        expect(texture.jointColor).toEqual(wd.Color.create("rgb(0.72, 0.72, 0.72)"));
    });

    describe("init", function(){
        it("add MarbleProceduralRenderTargetRenderer to scene", function(){
            sandbox.stub(wd.Director.getInstance().scene, "addProceduralRenderTargetRenderer");

            texture.init();

            expect(wd.Director.getInstance().scene.addProceduralRenderTargetRenderer.firstCall.args[0]).toEqual(jasmine.any(wd.MarbleProceduralRenderTargetRenderer));
        });
    });

    describe("getSamplerName", function(){
        it("get sampler name by unit index", function(){
            expect(texture.getSamplerName(0)).toEqual("u_sampler2D0");
            expect(texture.getSamplerName(1)).toEqual("u_sampler2D1");
        });
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        describe("clone RenderTargetTexture data", function(){
        });

        describe("clone TwoDRenderTargetTexture data", function(){
            beforeEach(function(){
            });

            it("shallow clone renderList", function(){
                var gameObject1 = wd.GameObject.create();
                var renderList = wdCb.Collection.create([gameObject1]);

                cloneTool.extend(texture, {
                    renderList:renderList
                })

                var result = texture.clone();

                expect(result.renderList === renderList).toBeFalsy();
                expect(result.renderList.getChild(0)).toEqual(gameObject1);
            });
            it("clone data", function () {
            });
        });

        describe("clone ProceduralTexture data", function(){
            beforeEach(function(){
            });

            it("clone data", function () {
                var repeatRegion = wd.RectRegion.create(10,10,1,2);


                cloneTool.extend(texture, {
repeatRegion:repeatRegion
                });

                var result = texture.clone();

                expect(result.repeatRegion === texture.repeatRegion).toBeFalsy();
                expect(result.repeatRegion).toEqual(repeatRegion);
            });
        });

        describe("clone MarbleProceduralTexture data", function(){
            beforeEach(function(){
            });

            it("clone data", function () {
                var tilesHeightNumber = 10,
                    tilesWidthNumber = 20,
                    amplitude = 10,
                    jointColor = wd.Color.create("#333433");

                cloneTool.extend(texture, {
                        tilesHeightNumber: tilesHeightNumber,
                        tilesWidthNumber: tilesWidthNumber,
                    amplitude: amplitude,
                    jointColor: jointColor
                });

                var result = texture.clone();

                expect(result.tilesHeightNumber).toEqual(tilesHeightNumber);
                expect(result.tilesWidthNumber).toEqual(tilesWidthNumber);
                expect(result.amplitude).toEqual(amplitude);
                expect(result.jointColor).toEqual(jointColor);
                expect(result.jointColor === texture.jointColor).toBeFalsy();
            });
        });
    });
});

