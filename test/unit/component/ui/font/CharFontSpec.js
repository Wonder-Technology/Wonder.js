describe("CharFont", function () {
    var sandbox = null;
    var CharFont = null;
    var font;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        CharFont = wd.CharFont;

        font = CharFont.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 800
        });
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("not support clone", function(){
            expect(function(){
                font.clone();
            }).toThrow();
        });
    });
});
