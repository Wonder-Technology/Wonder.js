describe("BitmapFontMaterial", function () {
    var sandbox = null;
    var material = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        material = wd.BitmapFontMaterial.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });
    
    describe("getTextureForRenderSort", function(){
        beforeEach(function(){
        });
        
        it("if bitmap exist, return it", function(){
            material.bitmap = wd.ImageTexture.create({});

            expect(material.getTextureForRenderSort()).toEqual(material.bitmap);
        });
        it("else if page map exist, return first page map", function () {
            var map1 = {},
                map2 = {a:1};
            material.pageMapList = wdCb.Collection.create([
                map1, map2
            ]);

            expect(material.getTextureForRenderSort()).toEqual(map1);
        });
        it("else, return null", function () {
            expect(material.getTextureForRenderSort()).toBeNull();
        });
    });

    describe("clone", function () {
        beforeEach(function () {
        });

        it("clone bitmap", function () {
            var imageTexture = wd.ImageTexture.create({});
            var resultImageTexture = wd.ImageTexture.create({a: 1});

            sandbox.stub(imageTexture, "clone").returns(resultImageTexture);


            cloneTool.extend(material, {
                bitmap: imageTexture
            });


            var result = material.clone();

            expect(result.mapManager === material.mapManager).toBeFalsy();
            expect(result.bitmap).toEqual(resultImageTexture);
        });
        it("shallow clone pageMapList", function () {
            var imageTexture = wd.ImageTexture.create({});
            var resultImageTexture = wd.ImageTexture.create({a: 1});

            sandbox.stub(imageTexture, "clone").returns(resultImageTexture);

            cloneTool.extend(material, {
                pageMapList:wdCb.Collection.create([imageTexture])
            });


            var result = material.clone();

            expect(result.pageMapList === material.pageMapList).toBeFalsy();
            expect(result.pageMapList).toEqual(material.pageMapList);
        });
        it("clone enableSdf,sdfType,alphaTest", function () {
            var sdfType = wd.SdfBitmapFontType.SMOOTH,
                alphaTest = 0.2;

            cloneTool.extend(material, {
                enableSdf: true,
                sdfType: sdfType,
                alphaTest: alphaTest
            });


            var result = material.clone();

            expect(result.enableSdf).toBeTruthy();
            expect(result.sdfType).toEqual(sdfType);
            expect(result.alphaTest).toEqual(alphaTest);
        });
    });
});
