describe("GameObject", function() {
    var sandbox = null;
    var gameObject;

    var Vector3 = wd.Vector3;

    function shouldAlive(gameObject, testFunc) {
        gameObjectSystemTool.dispose(gameObject);

        expect(function () {
            testFunc(gameObject)
        }).toThrow("gameObject is diposed, should release it");
    }

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        gameObject = gameObjectSystemTool.create();
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("add ThreeDTransform component after be created", function(){
        it("should has ThreeDTransform component", function () {
            expect(gameObjectSystemTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
    });

    describe("dispose", function() {
        var parent,child,child11;

        beforeEach(function(){
            parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            child = gameObjectSystemTool.create();
            gameObjectSystemTool.add(gameObject, child);

            child11 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(child, child11);

            testTool.closeContractCheck();
        });

        describe("test alive", function() {
            beforeEach(function(){

            });

            it("disposed one should not alive", function(){
                expect(gameObjectSystemTool.isAlive(gameObject)).toBeTruthy();

                gameObjectSystemTool.dispose(gameObject);

                expect(gameObjectSystemTool.isAlive(gameObject)).toBeFalsy();
            });
            it("the children of disposed one should not alive", function () {
                expect(gameObjectSystemTool.isAlive(gameObject)).toBeTruthy();

                gameObjectSystemTool.dispose(gameObject);

                expect(gameObjectSystemTool.isAlive(child)).toBeFalsy();
                expect(gameObjectSystemTool.isAlive(child11)).toBeFalsy();
            });
        });

        // it("its parent should remove it", function () {
        //     var child2 = gameObjectSystemTool.create();
        //     gameObjectSystemTool.add(parent, child2);
        //
        //     gameObjectSystemTool.dispose(gameObject);
        //
        //     expect(gameObjectSystemTool.has(parent, gameObject)).toBeFalsy();
        //     expect(gameObjectSystemTool.has(parent, child2)).toBeTruthy();
        // });
        it("should remove children", function () {
            gameObjectSystemTool.dispose(gameObject);

            expect(gameObjectSystemTool.has(gameObject, child)).toBeFalsy();
            expect(gameObjectSystemTool.has(child, child11)).toBeFalsy();
        });
        it("its all components should be disposed", function () {
            testTool.openContractCheck();

            var tra = gameObjectSystemTool.getTransform(gameObject),
                tra1 = gameObjectSystemTool.getTransform(child),
                tra11 = gameObjectSystemTool.getTransform(child11);

            gameObjectSystemTool.dispose(gameObject);

            threeDTransformSystemTool.isNotAlive(tra);
            threeDTransformSystemTool.isNotAlive(tra1);
            threeDTransformSystemTool.isNotAlive(tra11);
        });


        describe("if child is disposed", function() {
            beforeEach(function () {
            });

            it("should not affect dispose parent's datas", function () {
                testTool.openContractCheck();

                gameObjectSystemTool.dispose(child11);
                gameObjectSystemTool.dispose(child);

                var tra = gameObjectSystemTool.getTransform(gameObject),
                    tra1 = gameObjectSystemTool.getTransform(child),
                    tra11 = gameObjectSystemTool.getTransform(child11);

                threeDTransformSystemTool.isAlive(tra);
                threeDTransformSystemTool.isNotAlive(tra1);
                threeDTransformSystemTool.isNotAlive(tra11);
            });
        });
    });

    // describe("disposeBatchChildren", function() {
    //     var parent,child1,child2,child3,child11;
    //     var disposedChildren;
    //
    //     beforeEach(function(){
    //         parent = gameObjectSystemTool.create();
    //
    //         child1 = gameObjectSystemTool.create();
    //         gameObjectSystemTool.add(parent, child1);
    //
    //         child11 = gameObjectSystemTool.create();
    //         gameObjectSystemTool.add(child1, child11);
    //
    //         child2 = gameObjectSystemTool.create();
    //         gameObjectSystemTool.add(parent, child2);
    //
    //         child3 = gameObjectSystemTool.create();
    //         gameObjectSystemTool.add(parent, child3);
    //
    //         disposedChildren = [
    //             child1,
    //             child2
    //         ]
    //     });
    //
    //     it("if disposed children not alive, error", function() {
    //         shouldAlive(child1, function (gameObject) {
    //             return gameObjectSystemTool.disposeBatchChildren(disposedChildren, parent);
    //         })
    //
    //         shouldAlive(child2, function (gameObject) {
    //             return gameObjectSystemTool.disposeBatchChildren(disposedChildren, parent);
    //         })
    //     });
    //
    //     it("remove from childrenMap", function () {
    //         gameObjectSystemTool.disposeBatchChildren(disposedChildren, parent);
    //
    //         expect(gameObjectSystemTool.has(parent, child1)).toBeFalsy();
    //         expect(gameObjectSystemTool.has(parent, child2)).toBeFalsy();
    //         expect(gameObjectSystemTool.has(parent, child3)).toBeTruthy();
    //     });
    //     it("disposed children all components should be disposed", function () {
    //         var tra = gameObjectSystemTool.getTransform(parent),
    //             tra1 = gameObjectSystemTool.getTransform(child1),
    //             tra2 = gameObjectSystemTool.getTransform(child2),
    //             tra3 = gameObjectSystemTool.getTransform(child3),
    //             tra11 = gameObjectSystemTool.getTransform(child11);
    //
    //         gameObjectSystemTool.disposeBatchChildren(disposedChildren, parent);
    //
    //         threeDTransformSystemTool.isAlive(tra);
    //         threeDTransformSystemTool.isNotAlive(tra1);
    //         threeDTransformSystemTool.isNotAlive(tra2);
    //         threeDTransformSystemTool.isNotAlive(tra3);
    //         threeDTransformSystemTool.isNotAlive(tra11);
    //     });
    // });

    describe("getAliveChildren", function() {
        beforeEach(function(){
        });

        it("get alive children", function(){
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            var child = gameObjectSystemTool.create();
            gameObjectSystemTool.add(gameObject, child);

            var child11 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(child, child11);

            gameObjectSystemTool.dispose(child);

            var parentChildren = gameObjectSystemTool.getChildren(parent);
            var gameObjectChildren = gameObjectSystemTool.getChildren(gameObject);
            expect(parentChildren).toEqual([gameObject]);
            expect(gameObjectChildren).toEqual([]);
        });
    });

    describe("initGameObject", function() {
        describe("init gameObject's all added components", function(){
            var material,geo;
            var gl;
            var state;

            beforeEach(function(){
                var data = sceneSystemTool.prepareGameObjectAndAddToScene(true);
                gameObject = data.gameObject;
                material = data.material;
                geo = data.geometry;

                state = stateTool.createFakeGLState(sandbox);
                stateTool.setState(state);

                gl = stateTool.getGLFromFakeGLState(state);
            });

            it("init material", function () {
                sceneSystemTool.addCameraObject();

                directorTool.init(state);
                directorTool.loopBody(state);

                expect(gl.attachShader).toCalled();
            });
            it("init geometry", function () {
                gameObjectSystemTool.init(gameObject);

                expect(testTool.getValues(
                    geometrySystemTool.getVertices(geo)
                )).toEqual([
                        -10, -10, 10, -10, 10, 10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, 10, 10, -10, 10, -10, 10, 10, 10, 10, 10, -10, 10, -10, 10, 10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10, 10, 10, 10, -10, -10, 10, 10, -10, -10, -10, -10, -10, 10, -10, -10, -10, 10, -10, 10, 10
                ])
            });
        });
    });

    describe("addComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, error", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectSystemTool.addComponent(gameObject, threeDTransformSystemTool.create());
            })
        });
        it("if alreay has this type of component, error", function () {
            expect(function(){
               gameObjectSystemTool.addComponent(gameObject, threeDTransformSystemTool.create());
            }).toThrow("should not has this type of component, please dispose it");
        });
    });

    describe("getComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform);
            })
        });
        it("if component exist, return it", function(){
            expect(gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform)).toBeInstanceOf(wd.ThreeDTransform);
        });
        it("else, return null", function () {
            gameObjectSystemTool.disposeComponent(gameObject, gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform)).toBeNull();
        });
    });

    describe("getTransform", function() {
        beforeEach(function(){

        });

        it("return transform component", function(){
            expect(gameObjectSystemTool.getTransform(gameObject)).toBeInstanceOf(wd.ThreeDTransform);
        });
    });

    describe("hasComponent", function() {
        beforeEach(function(){

        });

        // it("if gameObject not alive, return null", function() {
        //     shouldAlive(gameObject, function (gameObject) {
        //         return gameObjectSystemTool.hasComponent(gameObject, wd.ThreeDTransform);
        //     })
        // });
        it("if has component, return true", function(){
            expect(gameObjectSystemTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
        it("else, return false", function () {
            gameObjectSystemTool.disposeComponent(gameObject, gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectSystemTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectSystemTool.disposeComponent(gameObject, gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform));
            })
        });
        it("remove component", function(){
            gameObjectSystemTool.disposeComponent(gameObject, gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectSystemTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
        it("dispose component", function () {
            testTool.openContractCheck();

            var transform = gameObjectSystemTool.getTransform(gameObject);
            var pos = wd.Vector3.create(1,2,3);
            threeDTransformSystemTool.setPosition(transform, pos);

            gameObjectSystemTool.disposeComponent(gameObject, gameObjectSystemTool.getComponent(gameObject, wd.ThreeDTransform));

            threeDTransformSystemTool.isNotAlive(transform);
        });
    });

    describe("build uid", function() {
        beforeEach(function(){
            testTool.clear(sandbox);
        });

        it("uid start from 0", function () {
            gameObject = gameObjectSystemTool.create();

            expect(gameObject.uid).toEqual(0);
        });
        it("build unique uid when create", function () {
            gameObject = gameObjectSystemTool.create();
            var gameObject2 = gameObjectSystemTool.create();

            expect(gameObject.uid).toEqual(0);
            expect(gameObject2.uid).toEqual(1);
        });
        // it("test uid recycle", function () {
        //     var uidArr = [];
        //     var gameObjectArr = [];
        //
        //     for(var i = 0; i < 50; i++){
        //         gameObject = gameObjectSystemTool.create();
        //         uidArr.push(gameObject.uid);
        //         gameObjectArr.push(gameObject);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObjectSystemTool.dispose(gameObjectArr[i]);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObject = gameObjectSystemTool.create();
        //         uidArr.push(gameObject.uid);
        //     }
        //
        //     expect(uidArr).toEqual([])
        // });
    });

    describe("addChild", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectSystemTool.create();
                return gameObjectSystemTool.add(gameObject, child);
            })
        });
        it("if child already has parent, remove it from old parent", function(){
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            var parent2 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent2, gameObject);

            expect(gameObjectSystemTool.has(parent, gameObject)).toBeFalsy();
            expect(gameObjectSystemTool.has(parent2, gameObject)).toBeTruthy();
        });
        it("set transform's parent", function () {
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            var childTran = gameObjectSystemTool.getTransform(gameObject);
            var parentTran = gameObjectSystemTool.getTransform(parent);

            expect(threeDTransformSystemTool.getParent(childTran)).toEqual(parentTran);
        });
        it("add child", function () {
            var parent = gameObjectSystemTool.create();

            var child1 = gameObjectSystemTool.create();
            var child2 = gameObjectSystemTool.create();
            var child3 = gameObjectSystemTool.create();
            var child31 = gameObjectSystemTool.create();
            var child311 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, child1);
            gameObjectSystemTool.add(parent, child2);
            gameObjectSystemTool.add(parent, child3);
            gameObjectSystemTool.add(child3, child31);
            gameObjectSystemTool.add(child31, child311);

            expect(gameObjectSystemTool.has(parent, child1)).toBeTruthy();
            expect(gameObjectSystemTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectSystemTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectSystemTool.has(child3, child31)).toBeTruthy();
            expect(gameObjectSystemTool.has(child31, child311)).toBeTruthy();
        });
    });

    describe("removeChild", function() {
        beforeEach(function(){
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectSystemTool.create();
                gameObjectSystemTool.add(gameObject, child);

                return gameObjectSystemTool.remove(gameObject, child);
            })
        });
        it("remove from parent", function() {
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            gameObjectSystemTool.remove(parent, gameObject);

            expect(gameObjectSystemTool.has(parent, gameObject)).toBeFalsy();
        });
        it("remove child->transform from its parent", function () {
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, gameObject);

            var childTran = gameObjectSystemTool.getTransform(gameObject);
            var parentTran = gameObjectSystemTool.getTransform(parent);

            gameObjectSystemTool.remove(parent, gameObject);

            expect(threeDTransformSystemTool.getParent(childTran)).toBeNull();
        });
        it("remove child", function () {
            var parent = gameObjectSystemTool.create();
            var child1 = gameObjectSystemTool.create();
            var child2 = gameObjectSystemTool.create();
            var child3 = gameObjectSystemTool.create();
            var child31 = gameObjectSystemTool.create();
            var child311 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(parent, child1);
            gameObjectSystemTool.add(parent, child2);
            gameObjectSystemTool.add(parent, child3);
            gameObjectSystemTool.add(child3, child31);
            gameObjectSystemTool.add(child31, child311);

            gameObjectSystemTool.remove(parent, child1);
            gameObjectSystemTool.remove(child3, child31);

            expect(gameObjectSystemTool.has(parent, child1)).toBeFalsy();
            expect(gameObjectSystemTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectSystemTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectSystemTool.has(child3, child31)).toBeFalsy();
            expect(gameObjectSystemTool.has(child31, child311)).toBeTruthy();
        });

        describe("fix bug", function() {
            var gameObject;
            var state;
            var gl;

            beforeEach(function(){
                var data = sceneSystemTool.prepareGameObjectAndAddToScene();
                gameObject = data.gameObject;

                state = stateTool.createFakeGLState(sandbox);
                stateTool.setState(state);

                gl = stateTool.getGLFromFakeGLState(state);
            });

            it("removed gameObject shouldn't be rendered", function(){
                directorTool.init(state);
                directorTool.loopBody(state);


                var callCount = gl.drawElements.callCount;

                sceneSystemTool.removeGameObject(gameObject);

                directorTool.loopBody(state);

                expect(gl.drawElements.callCount).toEqual(callCount);
            });
        });
    });

    describe("addRemovedChild", function() {
            var gameObject;
            var state;
            var gl;

        beforeEach(function(){
            var data = sceneSystemTool.prepareGameObjectAndAddToScene();
            gameObject = data.gameObject;

            state = stateTool.createFakeGLState(sandbox);
            stateTool.setState(state);

            gl = stateTool.getGLFromFakeGLState(state);
        });

        it("add removed child, add it to render list", function(){
            directorTool.init(state);
            directorTool.loopBody(state);


            sceneSystemTool.removeGameObject(gameObject);


            directorTool.loopBody(state);

            var callCount = gl.drawElements.callCount;

            gameObjectSystemTool.addRemoved(sceneSystemTool.getScene(), gameObject);

            directorTool.loopBody(state);

            expect(gl.drawElements.callCount).toEqual(callCount + 1);
        });
    });

    describe("hasChild", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectSystemTool.create();
                gameObjectSystemTool.add(gameObject, child);

                return gameObjectSystemTool.has(gameObject, child);
            })
        });
        it("if has no children, return false", function(){
            var child = gameObjectSystemTool.create();
            // gameObjectSystemTool.add(gameObject, child);

            expect(gameObjectSystemTool.has(gameObject, child)).toBeFalsy();
        });
        it("if not has it, return false", function(){
            var child = gameObjectSystemTool.create();
            var child2 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(gameObject, child);

            expect(gameObjectSystemTool.has(gameObject, child2)).toBeFalsy();
        });
        it("else, return true", function(){
            var child = gameObjectSystemTool.create();
            var child2 = gameObjectSystemTool.create();
            gameObjectSystemTool.add(gameObject, child);

            expect(gameObjectSystemTool.has(gameObject, child)).toBeTruthy();
        });
    });

    describe("setParent", function() {
        beforeEach(function(){
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectSystemTool.create();

                return gameObjectSystemTool.setParent(gameObject, child);
            })
        });
        it("set transform's parent", function () {
            var parent = gameObjectSystemTool.create();
            gameObjectSystemTool.setParent(parent, gameObject);

            var childTran = gameObjectSystemTool.getTransform(gameObject);
            var parentTran = gameObjectSystemTool.getTransform(parent);

            expect(threeDTransformSystemTool.getParent(childTran)).toEqual(parentTran);
        });

        describe("set gameObject's parent", function() {
            it("test", function () {
                var parent = gameObjectSystemTool.create();

                gameObjectSystemTool.setParent(parent, gameObject);

                expect(gameObjectSystemTool.getParent(gameObject)).toEqual(parent);
            });
            it("if child already has parent, be it's new parent", function(){
                var parent = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent, gameObject);

                var parent2 = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent2, gameObject);

                expect(gameObjectSystemTool.getParent(gameObject)).toEqual(parent2);
            });
            it("gameObject should as parent's child after set", function () {
                var parent = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent, gameObject);

                expect(gameObjectSystemTool.getChildren(parent)).toEqual([gameObject]);
            });
            it("if child already has parent, remove it from old parent", function(){
                var parent = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent, gameObject);

                var parent2 = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent2, gameObject);

                expect(gameObjectSystemTool.has(parent, gameObject)).toBeFalsy();
                expect(gameObjectSystemTool.getChildren(parent)).toEqual([]);
                expect(gameObjectSystemTool.has(parent2, gameObject)).toBeTruthy();
                expect(gameObjectSystemTool.getChildren(parent2)).toEqual([gameObject]);
            });
        });

        describe("fix bug", function() {
            var parent;
            var director;

            var updateSystem;

            beforeEach(function(){
                director = directorTool.getDirector();

                updateSystem = directorTool.updateSystem;
            });

            // it("test set child's position", function(){
            //     // gameObjectSystemTool.setParent(parent, child2);
            //
            //
            //
            //     parent = gameObjectSystemTool.create();
            //
            //
            //     sceneSystemTool.addGameObject(parent);
            //
            //
            //
            //
            //     var child2 = gameObjectSystemTool.create();
            //
            //     var childTran = gameObjectSystemTool.getTransform(gameObject);
            //     var child2Tran = gameObjectSystemTool.getTransform(child2);
            //     var pos = Vector3.create(1,2,3);
            //     var pos2 = Vector3.create(3,2,3);
            //
            //
            //
            //     // var parentTran = gameObjectSystemTool.getTransform(parent);
            //     // threeDTransformSystemTool.setPosition(parentTran, pos);
            //
            //
            //     threeDTransformSystemTool.setPosition(childTran, pos);
            //     threeDTransformSystemTool.setPosition(child2Tran, pos2);
            //
            //
            //
            //     // gameObjectSystemTool.setParent(parent, gameObject);
            //     // gameObjectSystemTool.add(parent, gameObject);
            //     sceneSystemTool.addGameObject(gameObject);
            //     sceneSystemTool.addGameObject(child2);
            //
            //
            //
            //
            //     // var parent2 = gameObjectSystemTool.create();
            //     gameObjectSystemTool.setParent(parent, gameObject);
            //     gameObjectSystemTool.setParent(parent, child2);
            //
            //
            //
            //
            //     updateSystem(null, null);
            //
            //     expect(threeDTransformSystemTool.getPosition(childTran)).toEqual(pos);
            //     expect(threeDTransformSystemTool.getPosition(child2Tran)).toEqual(pos2);
            // });
            it("if child already has parent, not dispose child's MeshRenderer component", function () {
                var meshRenderer = meshRendererSystemTool.create();

                gameObjectSystemTool.addComponent(gameObject, meshRenderer);

                var parent = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent, gameObject);

                var parent2 = gameObjectSystemTool.create();
                gameObjectSystemTool.setParent(parent2, gameObject);

                expect(meshRendererSystemTool.getRenderList()).toEqual([gameObject])
            });
        });
    });
});