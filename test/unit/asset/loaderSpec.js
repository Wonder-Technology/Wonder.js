describe("loader", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.LoaderManager.getInstance();
    });
    afterEach(function () {
        dy.LoaderManager._instance = null;
        dy.GLSLLoader._instance = null;
        sandbox.restore();
    });

    it("load glsl", function(done){
        var current = [],
            total = [];

        dy.LoaderManager.getInstance().load([
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"},
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a2"}
        ]).subscribe(function(data){
            current.push(data.currentLoadedCount);
            total.push(data.assetCount);
        }, function(err){
        }, function(){
            expect(current).toEqual([1, 2]);
            expect(total).toEqual([2, 2]);

            expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
            expect(dy.GLSLLoader.getInstance().get("a2")).toEqual("test");

            done();
        });
    });
    //it("if already load the same id, not load it again", function(done){
    //    sandbox.spy(dyCb.AjaxUtils, "ajax");
    //    var current = [],
    //        total = [];
    //
    //    manager.load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //    ]).subscribe(function(data){}, null, function(){
    //        manager.load([
    //            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //        ]).subscribe(function(data){
    //            current.push(data.currentLoadedCount);
    //            total.push(data.resCount);
    //        }, null, function(){
    //            expect(current).toEqual([]);
    //            expect(total).toEqual([]);
    //            expect(manager.currentLoadedCount).toEqual(1);
    //            expect(manager.resCount).toEqual(1);
    //
    //            expect(dyCb.AjaxUtils.ajax).toCalledOnce();
    //
    //            expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
    //
    //            done();
    //        });
    //    });
    //});
    //it("if error, just log it, don't pass to stream error handler", function(done){
    //    var err = new Error("err");
    //    var promise = new RSVP.Promise(function (resolve, reject) {
    //        reject(err);
    //    });
    //    sandbox.stub(dy.GLSLLoader.getInstance(), "_loadText").returns(promise);
    //    sandbox.stub(dyCb.Log, "log");
    //
    //    manager.load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //    ]).subscribe(function(data){}, function(error){
    //        expect(error).toEqual(err);
    //        expect(dyCb.Log.log).toCalledOnce();
    //
    //        done();
    //    }, function(){
    //    });
    //});
});
