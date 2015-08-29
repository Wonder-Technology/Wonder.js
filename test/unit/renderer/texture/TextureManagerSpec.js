describe("TextureManager", function() {
    var sandbox = null;
    var Manger = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Manager = dy.TextureManager;
        manager = new Manager();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("addChild", function(){
        var texture = null,
            copyTexture = null;

        beforeEach(function(){
            copyTexture = {
                init:sandbox.stub().returns({})
            };
            texture = {
                copy: sandbox.stub().returns(copyTexture)
            };
        });
        it("add the copied texture", function(){
            manager.addChild(texture);

            manager.getChild(0).a = 1;
            expect(texture.a).toBeUndefined();
        });
        it("init the texture", function(){
            manager.addChild(texture);

            expect(copyTexture.init).toCalledOnce();
        });
    });
});
