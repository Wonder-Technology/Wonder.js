describe("MeshRenderer", function() {
    var sandbox = null;
    var obj, obj2;
    var renderer, renderer2;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        renderer = meshRendererTool.create();

        obj = gameObjectTool.create();

        gameObjectTool.addComponent(obj, renderer);

        renderer2 = meshRendererTool.create();
        obj2 = gameObjectTool.create();

        gameObjectTool.addComponent(obj2, renderer2);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getRenderList", function() {
        beforeEach(function(){

        });

        it("get gameObject array which has MeshRenderer component", function(){
            expect(meshRendererTool.getRenderList()).toEqual([obj, obj2])
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
            gameObjectTool.disposeComponent(obj, renderer);
        });

        it("dispose by swap the target one and the last one", function () {
            var renderer3 = meshRendererTool.create();

            gameObjectTool.addComponent(obj, renderer3);

            expect(meshRendererTool.getRenderList()).toEqual([obj2, obj])
        });
        it("should not affect other meshRenderers", function () {
            expect(meshRendererTool.getGameObject(renderer2)).toEqual(obj2)
        });
        it("remove from gameObject", function () {
            expect(gameObjectTool.hasComponent(obj, wd.MeshRenderer)).toBeFalsy();
            expect(meshRendererTool.getGameObject(renderer)).toBeUndefined();
        });
    });
});
