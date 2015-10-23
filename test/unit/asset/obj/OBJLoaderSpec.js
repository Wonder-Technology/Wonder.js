//describe("OBJLoader", function () {
//    var sandbox = null;
//    var loader = null;
//
//    beforeEach(function () {
//        sandbox = sinon.sandbox.create();
//        loader = dy.OBJLoader.getInstance();
//    });
//    afterEach(function () {
//        sandbox.restore();
//    });
//
//    it("load glsl", function(done){
//        var current = [],
//            total = [];
//
//        dy.LoaderManager.getInstance().load([
//            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"},
//            {url: testTool.resPath + "test/res/fragment.glsl", id: "a2"}
//        ]).subscribe(function(data){
//            current.push(data.currentLoadedCount);
//            total.push(data.assetCount);
//        }, function(err){
//        }, function(){
//            expect(current).toEqual([1, 2]);
//            expect(total).toEqual([2, 2]);
//
//            expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
//            expect(dy.GLSLLoader.getInstance().get("a2")).toEqual("test");
//
//            done();
//        });
//    });
//});
