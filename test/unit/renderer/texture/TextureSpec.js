describe("Texture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.Texture;
        texture = new Texture();
        sandbox.stub(dy.Director, "getInstance").returns({
            gl: testTool.buildFakeGl(sandbox)
        });
        gl = {
            pixelStorei:sandbox.stub(),
            texParameteri:sandbox.stub(),
            generateMipmap:sandbox.stub()

        };
        testTool.extend(dy.Director.getInstance().gl, gl);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sourceRegion", function(){
        it("if sourceRegion is based on canvas coordinate system, convert it to webgl coordinate stystem", function(){
            texture.sourceRegionMapping = dy.TexCoordMapping.CANVAS;

            texture.sourceRegion = dy.RectRegion.create(0.1, 0.1, 0.5, 0.6);

            expect(testTool.getValues(texture.sourceRegion)).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.3, 0.5, 0.6)));
        });
        it("else, directly set it", function(){
            texture.sourceRegionMapping = dy.TexCoordMapping.UV;

            texture.sourceRegion = dy.RectRegion.create(0.1, 0.1, 0.5, 0.6);

            expect(testTool.getValues(texture.sourceRegion)).toEqual(testTool.getValues(dy.RectRegion.create(0.1, 0.1, 0.5, 0.6)));

        });
    });
    
    describe("update", function(){
        beforeEach(function(){
            sandbox.stub(texture, "bindToUnit");
            sandbox.stub(texture, "allocateSourceToTexture");
            sandbox.stub(dy.GPUDetector, "getInstance").returns({
                maxTextureSize: 50
            });
        });

        it("bind texture unit and active it", function(){
            texture.update(0);

            expect(texture.bindToUnit).toCalledWith(0);
        });
        it("if source's size exceed max size, then make souce to be canvas and scale the canvas", function(){
            texture.source = new Image();
            texture.source.width = 50;
            texture.source.height = 100;

            texture.update(0);

            expect(texture.source.width).toEqual(25);
            expect(texture.source.height).toEqual(50);
        });
        //todo complete the test
    });
});
