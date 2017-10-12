describe("MeshRenderer", function() {
    var sandbox = null;
    var obj, obj2;
    var renderer, renderer2;

    var MeshRendererData = wd.MeshRendererData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        renderer = meshRendererSystemTool.create();

        obj = gameObjectSystemTool.create();

        gameObjectSystemTool.addComponent(obj, renderer);

        renderer2 = meshRendererSystemTool.create();
        obj2 = gameObjectSystemTool.create();

        gameObjectSystemTool.addComponent(obj2, renderer2);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getRenderList", function() {
        beforeEach(function(){

        });

        it("get gameObject array which has MeshRenderer component", function(){
            expect(meshRendererSystemTool.getRenderList()).toEqual([obj, obj2])
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        describe("remove by swap the target one and the last one", function () {
            it("remove renderGameObjectArray", function () {
                gameObjectSystemTool.disposeComponent(obj, renderer);

                expect(meshRendererSystemTool.getRenderList()).toEqual([obj2])
            });
            it("remove from gameObject", function () {
                gameObjectSystemTool.disposeComponent(obj, renderer);

                expect(gameObjectSystemTool.hasComponent(obj, wd.MeshRenderer)).toBeFalsy();
                componentTool.judgeNotAlive(renderer, "getGameObject", meshRendererSystemTool, expect);
                expect(meshRendererSystemTool.getGameObject(renderer2)).toEqual(obj2);
                expect(MeshRendererData.gameObjectMap.length).toEqual(1);
            });

            describe("remove from meshRendererMap", function () {
                it("mark material removed", function () {
                    gameObjectSystemTool.disposeComponent(obj, renderer);

                    componentTool.judgeIsComponentIndexNotRemoved(renderer, expect);
                });
                it("test remove", function () {
                    gameObjectSystemTool.disposeComponent(obj, renderer);

                    expect(MeshRendererData.meshRendererMap[0]).toEqual(renderer2);
                    expect(MeshRendererData.meshRendererMap.length).toEqual(1);
                });
            });
        });

        it("should not affect other meshRenderers", function () {
            gameObjectSystemTool.disposeComponent(obj, renderer);

            expect(meshRendererSystemTool.getGameObject(renderer2)).toEqual(obj2)
        });
        it("if component is disposed, operate it should error", function () {
            gameObjectSystemTool.disposeComponent(obj, renderer);

            componentTool.judgeNotAlive(renderer, "getGameObject", meshRendererSystemTool, expect);
        });
    });
});
