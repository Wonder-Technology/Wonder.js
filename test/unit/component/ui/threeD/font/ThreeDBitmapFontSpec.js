describe("ThreeDBitmapFont", function () {
    var sandbox = null;
    var font;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        font = wd.ThreeDBitmapFont.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var text = "A",
                xAlignment = wd.EFontXAlignment.CENTER,
                fntId = "b",
                width = 100,
                height = 200;

            cloneTool.extend(font, {

                text: text,
                xAlignment: xAlignment,
                fntId: fntId,
                width: width,
                height: height
            });

            var result = font.clone();

            expect(result.text).toEqual(text);
            expect(result.xAlignment).toEqual(xAlignment);
            expect(result.fntId).toEqual(fntId);
            expect(result.width).toEqual(width);
            expect(result.height).toEqual(height);
        });
    });
});

