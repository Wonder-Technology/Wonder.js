describe("GameObject", function() {
    var sandbox = null;
    var gameObject;

    function shouldAlive(gameObject, testFunc) {
        gameObjectTool.dispose(gameObject);

        var result = testFunc(gameObject);

        expect(result === null || result === false).toBeTruthy();
    }

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        gameObject = gameObjectTool.create();
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("add ThreeDTransform component after be created", function(){
        it("should has ThreeDTransform component", function () {
            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
    });

    describe("dispose", function() {
        beforeEach(function(){
        });

        it("use uid as a weak reference, so only remove uid to make isAlive() return false", function(){
            expect(gameObjectTool.isAlive(gameObject)).toBeTruthy();

            gameObjectTool.dispose(gameObject);

            expect(gameObjectTool.isAlive(gameObject)).toBeFalsy();
        });
    });

    describe("addComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.addComponent(gameObject, transformTool.create());
            })
        });
        it("if alreay has this type of component, error", function () {
            expect(function(){
               gameObjectTool.addComponent(gameObject, transformTool.create());
            }).toThrow("should not has this type of component, please dispose it");
        });
    });

    describe("getComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.getComponent(gameObject, wd.ThreeDTransform);
            })
        });
        it("if component exist, return it", function(){
            expect(gameObjectTool.getComponent(gameObject, wd.ThreeDTransform)).toBeInstanceOf(wd.ThreeDTransform);
        });
        it("else, return null", function () {
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.getComponent(gameObject, wd.ThreeDTransform)).toBeNull();
        });
    });

    describe("getTransform", function() {
        beforeEach(function(){

        });

        it("return transform component", function(){
            expect(gameObjectTool.getTransform(gameObject)).toBeInstanceOf(wd.ThreeDTransform);
        });
    });

    describe("hasComponent", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform);
            })
        });
        it("if has component, return true", function(){
            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeTruthy();
        });
        it("else, return false", function () {
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                return gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));
            })
        });
        it("remove component", function(){
            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(gameObjectTool.hasComponent(gameObject, wd.ThreeDTransform)).toBeFalsy();
        });
        it("dispose component", function () {
            var transform = gameObjectTool.getTransform(gameObject);
            var pos = wd.Vector3.create(1,2,3);
            transformTool.setPosition(transform, pos);

            gameObjectTool.disposeComponent(gameObject, gameObjectTool.getComponent(gameObject, wd.ThreeDTransform));

            expect(transformTool.getPosition(transform)).toEqual(wd.Vector3.create(0,0,0));
        });
    });

    describe("build uid", function() {
        beforeEach(function(){
            testTool.clear(sandbox);
        });

        it("uid start from 0", function () {
            gameObject = gameObjectTool.create();

            expect(gameObject.uid).toEqual(0);
        });
        it("build unique uid when create", function () {
            gameObject = gameObjectTool.create();
            var gameObject2 = gameObjectTool.create();

            expect(gameObject.uid).toEqual(0);
            expect(gameObject2.uid).toEqual(1);
        });
        // it("test uid recycle", function () {
        //     var uidArr = [];
        //     var gameObjectArr = [];
        //
        //     for(var i = 0; i < 50; i++){
        //         gameObject = gameObjectTool.create();
        //         uidArr.push(gameObject.uid);
        //         gameObjectArr.push(gameObject);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObjectTool.dispose(gameObjectArr[i]);
        //     }
        //
        //
        //     for(var i = 0; i < 5; i++){
        //         gameObject = gameObjectTool.create();
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
                var child = gameObjectTool.create();
                return gameObjectTool.add(gameObject, child);
            })
        });
        it("if child already has parent, remove it from old parent", function(){
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var parent2 = gameObjectTool.create();
            gameObjectTool.add(parent2, gameObject);

            expect(gameObjectTool.has(parent, gameObject)).toBeFalsy();
            expect(gameObjectTool.has(parent2, gameObject)).toBeTruthy();
        });
        it("set transform's parent", function () {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var childTran = gameObjectTool.getTransform(gameObject);
            var parentTran = gameObjectTool.getTransform(parent);

            expect(transformTool.getParent(childTran)).toEqual(parentTran);
        });
        it("add child", function () {
            var parent = gameObjectTool.create();

            var child1 = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            var child3 = gameObjectTool.create();
            var child31 = gameObjectTool.create();
            var child311 = gameObjectTool.create();
            gameObjectTool.add(parent, child1);
            gameObjectTool.add(parent, child2);
            gameObjectTool.add(parent, child3);
            gameObjectTool.add(child3, child31);
            gameObjectTool.add(child31, child311);

            expect(gameObjectTool.has(parent, child1)).toBeTruthy();
            expect(gameObjectTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectTool.has(child3, child31)).toBeTruthy();
            expect(gameObjectTool.has(child31, child311)).toBeTruthy();
        });
    });

    describe("removeChild", function() {
        beforeEach(function(){

        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectTool.create();
                gameObjectTool.add(gameObject, child);

                return gameObjectTool.remove(gameObject, child);
            })
        });
        it("remove from parent", function() {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            gameObjectTool.remove(parent, gameObject);

            expect(gameObjectTool.has(parent, gameObject)).toBeFalsy();
        });
        it("remove child->transform from its parent", function () {
            var parent = gameObjectTool.create();
            gameObjectTool.add(parent, gameObject);

            var childTran = gameObjectTool.getTransform(gameObject);
            var parentTran = gameObjectTool.getTransform(parent);

            gameObjectTool.remove(parent, gameObject);

            expect(transformTool.getParent(childTran)).toBeNull();
        });
        it("remove child", function () {
            var parent = gameObjectTool.create();
            var child1 = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            var child3 = gameObjectTool.create();
            var child31 = gameObjectTool.create();
            var child311 = gameObjectTool.create();
            gameObjectTool.add(parent, child1);
            gameObjectTool.add(parent, child2);
            gameObjectTool.add(parent, child3);
            gameObjectTool.add(child3, child31);
            gameObjectTool.add(child31, child311);

            gameObjectTool.remove(parent, child1);
            gameObjectTool.remove(child3, child31);

            expect(gameObjectTool.has(parent, child1)).toBeFalsy();
            expect(gameObjectTool.has(parent, child2)).toBeTruthy();
            expect(gameObjectTool.has(parent, child3)).toBeTruthy();
            expect(gameObjectTool.has(child3, child31)).toBeFalsy();
            expect(gameObjectTool.has(child31, child311)).toBeTruthy();
        });
    });
    
    describe("hasChild", function() {
        beforeEach(function(){
            
        });

        it("if gameObject not alive, return null", function() {
            shouldAlive(gameObject, function (gameObject) {
                var child = gameObjectTool.create();
                gameObjectTool.add(gameObject, child);

                return gameObjectTool.has(gameObject, child);
            })
        });
        it("if has no children, return false", function(){
            var child = gameObjectTool.create();
            // gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child)).toBeFalsy();
        });
        it("if not has it, return false", function(){
            var child = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child2)).toBeFalsy();
        });
        it("else, return true", function(){
            var child = gameObjectTool.create();
            var child2 = gameObjectTool.create();
            gameObjectTool.add(gameObject, child);

            expect(gameObjectTool.has(gameObject, child)).toBeTruthy();
        });
    });

    //todo test tag
    // describe("test tag", function() {
    //     beforeEach(function(){
    //         entity = new wd.Entity();
    //     });
    //
    //     describe("addTag", function () {
    //         it("add a tag", function () {
    //             entity.addTag("a");
    //             entity.addTag("b");
    //
    //             expect(entity.getTagList()).toEqual(["a", "b"]);
    //         });
    //     });
    //
    //     describe("removeTag", function () {
    //         it("remove a tag", function () {
    //             entity.addTag("a");
    //             entity.addTag("b");
    //             entity.addTag("c");
    //
    //             entity.removeTag("a");
    //             entity.removeTag("c");
    //
    //             expect(entity.getTagList()).toEqual(["b"]);
    //         });
    //     });
    //
    //     describe("hasTag", function () {
    //         it("judge whether has the tag(complete match)", function () {
    //             entity.addTag("abc");
    //
    //             expect(entity.hasTag("b")).toBeFalsy();
    //             expect(entity.hasTag("abc")).toBeTruthy();
    //         });
    //     });
    //
    //     describe("containTag", function () {
    //         it("judge whether has the tag(partial match)(case sensitive)", function () {
    //             entity.addTag("abc");
    //
    //             expect(entity.containTag("A")).toBeFalsy();
    //             expect(entity.containTag("a")).toBeTruthy();
    //             expect(entity.containTag("bc")).toBeTruthy();
    //         });
    //     });
    // });
});