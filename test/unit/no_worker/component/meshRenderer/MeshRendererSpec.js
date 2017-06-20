describe("MeshRenderer", function() {
    var sandbox = null;
    var obj, obj2;
    var renderer, renderer2;

    var MeshRendererData = wd.MeshRendererData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

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
        });

        describe("remove by swap the target one and the last one", function () {
            it("remove renderGameObjectArray", function () {
                gameObjectTool.disposeComponent(obj, renderer);

                expect(meshRendererTool.getRenderList()).toEqual([obj2])
            });
            it("remove from gameObject", function () {
                gameObjectTool.disposeComponent(obj, renderer);

                expect(gameObjectTool.hasComponent(obj, wd.MeshRenderer)).toBeFalsy();
                componentTool.judgeNotAlive(renderer, "getGameObject", meshRendererTool, expect);
                expect(meshRendererTool.getGameObject(renderer2)).toEqual(obj2);
                expect(MeshRendererData.gameObjectMap.length).toEqual(1);
            });

            describe("remove from meshRendererMap", function () {
                it("mark material removed", function () {
                    gameObjectTool.disposeComponent(obj, renderer);

                    componentTool.judgeIsComponentIndexNotRemoved(renderer, expect);
                });
                it("test remove", function () {
                    gameObjectTool.disposeComponent(obj, renderer);

                    expect(MeshRendererData.meshRendererMap[0]).toEqual(renderer2);
                    expect(MeshRendererData.meshRendererMap.length).toEqual(1);
                });
            });
        });

        it("should not affect other meshRenderers", function () {
            gameObjectTool.disposeComponent(obj, renderer);

            expect(meshRendererTool.getGameObject(renderer2)).toEqual(obj2)
        });
        it("if component is disposed, operate it should error", function () {
            gameObjectTool.disposeComponent(obj, renderer);

            componentTool.judgeNotAlive(renderer, "getGameObject", meshRendererTool, expect);
        });
    });
});
