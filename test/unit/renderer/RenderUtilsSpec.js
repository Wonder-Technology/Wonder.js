describe("RenderUtils", function() {
    var sandbox;
    var Utils;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);


        instanceTool.prepareExtensionInstancedArrays(sandbox);

        Utils = wd.RenderUtils;
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("getGameObjectRenderListFromSpacePartition", function(){
        beforeEach(function(){

        });

        //describe("test instance", function(){
        //    beforeEach(function(){
        //    });
        //
        //    describe("if the instanceSource obj is culled but it's instance isn't culled, it's instance should be rendered", function(){
        //        it("test instance toRenderInstanceList", function(){
        //            var box1 = instanceTool.createBox();
        //            box1.name = "box1";
        //            var child1 = prepareTool.createSphere(1)
        //            var child11 = prepareTool.createSphere(1)
        //
        //            var child2 = prepareTool.createSphere(1)
        //
        //            child1.addChild(child11);
        //            box1.addChild(child1);
        //            box1.addChild(child2);
        //
        //            var instanceArr = [];
        //
        //            //instanceArr.push(box1);
        //
        //            var boxInstance1 = instanceTool.cloneInstance(box1, "0");
        //            var boxInstance2 = instanceTool.cloneInstance(box1, "1");
        //
        //            instanceArr.push(boxInstance1, boxInstance2);
        //
        //            var renderList = wdCb.Collection.create(
        //                instanceArr
        //            );
        //
        //
        //            var list = Utils.getGameObjectRenderListFromSpacePartition(renderList);
        //
        //            expect(list.getCount()).toEqual(1);
        //            expect(list.hasChild(box1)).toBeTruthy();
        //
        //
        //            var box1SourceInstance = box1.getComponent(wd.SourceInstance);
        //            expect(box1SourceInstance._toRenderInstanceList.getCount()).toEqual(2);
        //            expect(box1SourceInstance._toRenderInstanceList.hasChild(boxInstance1)).toBeTruthy();
        //            expect(box1SourceInstance._toRenderInstanceList.hasChild(boxInstance2)).toBeTruthy();
        //
        //            var box1Child1SourceInstance = child1.getComponent(wd.SourceInstance);
        //            expect(box1Child1SourceInstance._toRenderInstanceList.getCount()).toEqual(2);
        //            expect(box1Child1SourceInstance._toRenderInstanceList.hasChild(boxInstance1.getChild(0))).toBeTruthy();
        //            expect(box1Child1SourceInstance._toRenderInstanceList.hasChild(boxInstance2.getChild(0))).toBeTruthy();
        //
        //
        //
        //            var box1Child11SourceInstance = child11.getComponent(wd.SourceInstance);
        //            expect(box1Child11SourceInstance._toRenderInstanceList.getCount()).toEqual(2);
        //            expect(box1Child11SourceInstance._toRenderInstanceList.hasChild(boxInstance1.getChild(0).getChild(0))).toBeTruthy();
        //            expect(box1Child11SourceInstance._toRenderInstanceList.hasChild(boxInstance2.getChild(0).getChild(0))).toBeTruthy();
        //
        //
        //            var box1Child2SourceInstance = child2.getComponent(wd.SourceInstance);
        //            expect(box1Child2SourceInstance._toRenderInstanceList.getCount()).toEqual(2);
        //            expect(box1Child2SourceInstance._toRenderInstanceList.hasChild(boxInstance1.getChild(1))).toBeTruthy();
        //            expect(box1Child2SourceInstance._toRenderInstanceList.hasChild(boxInstance2.getChild(1))).toBeTruthy();
        //        });
        //    });
        //});
    });
});
