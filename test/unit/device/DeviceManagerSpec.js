//cull face
//polygonOffset
//blend
describe("Color", function() {
    var sandbox = null;
    var manager = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.DeviceManager.getInstance();
        manager.gl = testTool.buildFakeGl(sandbox);
        gl = manager._gl;
    });
    afterEach(function () {
        dy.DeviceManager._instance = null;
        sandbox.restore();
    });
    
    describe("clear", function(){
        it("clear color passed from options", function(){
            manager.clear({
                color:dy.Color.create("#ffffff")
            });

            expect(gl.clearColor).toCalledWith(1, 1, 1, 1);
        });
        it("clear buffer", function(){
            sandbox.stub(gl, "COLOR_BUFFER_BIT", 1);
            sandbox.stub(gl, "DEPTH_BUFFER_BIT", 10);

            manager.clear({
                color:dy.Color.create("#ffffff")
            });

            expect(gl.clear).toCalledWith(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        });
    });
})
