describe("Tag", function() {
    var sandbox = null;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    it("support specify slot count when create", function () {
        var tag1 = tagSystemTool.create(1);
        var tag2 = tagSystemTool.create(2);

        var gameObject1 = gameObjectSystemTool.create();
        var gameObject2 = gameObjectSystemTool.create();

        tagSystemTool.addTag(tag1, "aaa");

        gameObjectSystemTool.addComponent(gameObject1, tag1);
        gameObjectSystemTool.addComponent(gameObject2, tag2);


        tagSystemTool.addTag(tag2, "bbb");

        expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject2]);
    });

    describe("addTag", function() {
        beforeEach(function(){
        });

        describe("if add too many tags to equal current max slot count, allocate double slot count", function(){
            it("test1", function () {
                var tag0 = tagSystemTool.create(2);
                var tag1 = tagSystemTool.create(1);
                var tag2 = tagSystemTool.create(2);

                var gameObject1 = gameObjectSystemTool.create();
                var gameObject2 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag1, "aaa");
                tagSystemTool.addTag(tag1, "bbb");

                gameObjectSystemTool.addComponent(gameObject1, tag1);
                gameObjectSystemTool.addComponent(gameObject2, tag2);


                tagSystemTool.addTag(tag2, "ccc");

                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test2", function () {
                var tag0 = tagSystemTool.create(2);
                var tag1 = tagSystemTool.create(1);
                var tag2 = tagSystemTool.create(2);
                var gameObject1 = gameObjectSystemTool.create();
                var gameObject2 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag1, "aaa");

                gameObjectSystemTool.addComponent(gameObject1, tag1);
                gameObjectSystemTool.addComponent(gameObject2, tag2);


                tagSystemTool.addTag(tag2, "ccc");

                tagSystemTool.addTag(tag1, "bbb");

                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test3", function () {
                var tag1 = tagSystemTool.create(1);
                var tag0 = tagSystemTool.create(2);
                var tag2 = tagSystemTool.create(2);
                var gameObject1 = gameObjectSystemTool.create();
                var gameObject2 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag1, "aaa");

                gameObjectSystemTool.addComponent(gameObject1, tag1);
                gameObjectSystemTool.addComponent(gameObject2, tag2);


                tagSystemTool.addTag(tag2, "ccc");

                tagSystemTool.addTag(tag1, "bbb");

                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test4", function () {
                var tag1 = tagSystemTool.create(2);
                var tag2 = tagSystemTool.create(1);
                var tag3 = tagSystemTool.create(3);
                var gameObject1 = gameObjectSystemTool.create();
                var gameObject2 = gameObjectSystemTool.create();
                var gameObject3 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag1, "aaa");
                tagSystemTool.addTag(tag1, "bbb");
                tagSystemTool.addTag(tag1, "ccc");
                tagSystemTool.addTag(tag2, "ccc");
                tagSystemTool.addTag(tag2, "aaa");
                tagSystemTool.addTag(tag3, "bbb");

                gameObjectSystemTool.addComponent(gameObject1, tag1);
                gameObjectSystemTool.addComponent(gameObject2, tag2);
                gameObjectSystemTool.addComponent(gameObject3, tag3);



                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject3]);
                expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject1, gameObject2]);
            });
            it("test double double", function () {
                var tag1 = tagSystemTool.create(2);
                var tag2 = tagSystemTool.create(3);
                var gameObject1 = gameObjectSystemTool.create();
                var gameObject2 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag1, "aaa");
                tagSystemTool.addTag(tag1, "bbb");
                tagSystemTool.addTag(tag1, "ccc");
                tagSystemTool.addTag(tag1, "ddd");
                tagSystemTool.addTag(tag1, "fff");
                tagSystemTool.addTag(tag1, "ggg");
                tagSystemTool.addTag(tag2, "bbb");

                gameObjectSystemTool.addComponent(gameObject1, tag1);
                gameObjectSystemTool.addComponent(gameObject2, tag2);


                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject2]);
                expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject1]);
            })
        });

        it("if add repeated tag, error", function () {
            var tag1 = tagSystemTool.create(2);
            var tag2 = tagSystemTool.create(1);

            var gameObject1 = gameObjectSystemTool.create();

            tagSystemTool.addTag(tag2, "aaa");

            expect(function () {
                tagSystemTool.addTag(tag2, "aaa");
            }).toThrow("tag should not already be added");



            tagSystemTool.addTag(tag1, "aaa");

            expect(function () {
                tagSystemTool.addTag(tag1, "aaa");
            }).toThrow("tag should not already be added");
        });
    });

    describe("removeTag", function() {
        beforeEach(function(){

        });

        it("remove tag of tag component", function(){
            var tag1 = tagSystemTool.create(2);

            var gameObject1 = gameObjectSystemTool.create();

            tagSystemTool.addTag(tag1, "aaa");
            tagSystemTool.addTag(tag1, "bbb");

            gameObjectSystemTool.addComponent(gameObject1, tag1);


            tagSystemTool.removeTag(tag1, "aaa");

            expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
            expect(tagSystemTool.findGameObjectsByTag("aaa")).toEqual([]);
        });
        it("test remove not-existed-tag", function () {
            var tag1 = tagSystemTool.create(2);

            var gameObject1 = gameObjectSystemTool.create();

            tagSystemTool.addTag(tag1, "bbb");

            gameObjectSystemTool.addComponent(gameObject1, tag1);


            tagSystemTool.removeTag(tag1, "aaa");
            tagSystemTool.removeTag(tag1, "bbb");

            expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([]);
        });
        it("if the tag component has been allocated more slot count, not collect yet", function () {
            var tag0 = tagSystemTool.create(2);
            var tag1 = tagSystemTool.create(1);
            var tag2 = tagSystemTool.create(2);

            var gameObject1 = gameObjectSystemTool.create();
            var gameObject2 = gameObjectSystemTool.create();

            tagSystemTool.addTag(tag1, "aaa");
            tagSystemTool.addTag(tag1, "bbb");

            gameObjectSystemTool.addComponent(gameObject1, tag1);
            gameObjectSystemTool.addComponent(gameObject2, tag2);


            tagSystemTool.addTag(tag2, "ccc");


            tagSystemTool.removeTag(tag1, "bbb");
            tagSystemTool.removeTag(tag1, "aaa");
            tagSystemTool.removeTag(tag2, "ccc");

            expect(tagSystemTool.findGameObjectsByTag("aaa")).toEqual([]);
            expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([]);
            expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([]);
        });
    });
    
    describe("disposeComponent", function() {
        var tag1,
            gameObject1;

        beforeEach(function(){
            tag1 = tagSystemTool.create(2);

            gameObject1 = gameObjectSystemTool.create();

            tagSystemTool.addTag(tag1, "aaa");
            tagSystemTool.addTag(tag1, "bbb");

            gameObjectSystemTool.addComponent(gameObject1, tag1);
        });

        it("remove from gameObject", function () {
            testTool.closeContractCheck();

            gameObjectSystemTool.disposeComponent(gameObject1, tag1);

            expect(gameObjectSystemTool.hasComponent(gameObject1, wd.Tag)).toBeFalsy();
            expect(tagSystemTool.getGameObject(tag1)).toBeUndefined();
        });

        describe("dispose component", function(){
            it("find no related gameObjects of disposed tag", function () {
                gameObjectSystemTool.disposeComponent(gameObject1, tag1);

                expect(tagSystemTool.findGameObjectsByTag("aaa")).toEqual([]);
                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([]);
            });
            it("test add new tag after dispose", function () {
                var tag2 = tagSystemTool.create(1);
                var tag3 = tagSystemTool.create(3);
                var gameObject2 = gameObjectSystemTool.create();
                var gameObject3 = gameObjectSystemTool.create();

                tagSystemTool.addTag(tag2, "ccc");
                tagSystemTool.addTag(tag2, "aaa");
                tagSystemTool.addTag(tag3, "bbb");

                gameObjectSystemTool.addComponent(gameObject2, tag2);
                gameObjectSystemTool.addComponent(gameObject3, tag3);



                gameObjectSystemTool.disposeComponent(gameObject3, tag3);

                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);



                var tag4 = tagSystemTool.create(2);
                gameObjectSystemTool.addComponent(gameObject3, tag4);
                tagSystemTool.addTag(tag4, "bbb");

                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject3]);



                gameObjectSystemTool.disposeComponent(gameObject1, tag1);
                gameObjectSystemTool.disposeComponent(gameObject3, tag4);


                expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([]);
                expect(tagSystemTool.findGameObjectsByTag("aaa")).toEqual([gameObject2]);
            });
        });

        it("if tag is disposed, removeTag/addTag/getTagGameObject should error", function () {
            var errMsg = "component should alive";

            gameObjectSystemTool.disposeComponent(gameObject1, tag1);

            expect(function () {
                tagSystemTool.removeTag(tag1, "aaa");
            }).toThrow(errMsg);

            expect(function () {
                tagSystemTool.addTag(tag1, "aaa");
            }).toThrow(errMsg);

            expect(function () {
                tagSystemTool.getGameObject(tag1);
            }).toThrow(errMsg);
        });
    });
    
    describe("findGameObjectsByTag", function() {
        beforeEach(function(){
        });
        
        it("find all gameObjects with the tag", function(){
            var tag1 = tagSystemTool.create(2);
            var tag2 = tagSystemTool.create(1);
            var tag3 = tagSystemTool.create(1);

            var gameObject1 = gameObjectSystemTool.create();
            var gameObject11 = gameObjectSystemTool.create();
            var gameObject2 = gameObjectSystemTool.create();

            gameObjectSystemTool.add(gameObject1, gameObject11);

            tagSystemTool.addTag(tag1, "aaa");
            tagSystemTool.addTag(tag1, "bbb");
            tagSystemTool.addTag(tag2, "aaa");
            tagSystemTool.addTag(tag2, "ccc");
            tagSystemTool.addTag(tag3, "ccc");
            tagSystemTool.addTag(tag3, "bbb");

            gameObjectSystemTool.addComponent(gameObject1, tag1);
            gameObjectSystemTool.addComponent(gameObject11, tag2);
            gameObjectSystemTool.addComponent(gameObject2, tag3);


            expect(tagSystemTool.findGameObjectsByTag("aaa")).toEqual([gameObject1, gameObject11]);
            expect(tagSystemTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject2]);
            expect(tagSystemTool.findGameObjectsByTag("ccc")).toEqual([gameObject11, gameObject2]);
        });
    });
});
