describe("Tag", function() {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    it("support specify slot count when create", function () {
        var tag1 = tagTool.create(1);
        var tag2 = tagTool.create(2);

        var gameObject1 = gameObjectTool.create();
        var gameObject2 = gameObjectTool.create();

        tagTool.addTag(tag1, "aaa");

        gameObjectTool.addComponent(gameObject1, tag1);
        gameObjectTool.addComponent(gameObject2, tag2);


        tagTool.addTag(tag2, "bbb");

        expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject2]);
    });

    describe("addTag", function() {
        beforeEach(function(){
        });

        describe("if add too many tags to equal current max slot count, allocate double slot count", function(){
            it("test1", function () {
                var tag0 = tagTool.create(2);
                var tag1 = tagTool.create(1);
                var tag2 = tagTool.create(2);

                var gameObject1 = gameObjectTool.create();
                var gameObject2 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");
                tagTool.addTag(tag1, "bbb");

                gameObjectTool.addComponent(gameObject1, tag1);
                gameObjectTool.addComponent(gameObject2, tag2);


                tagTool.addTag(tag2, "ccc");

                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test2", function () {
                var tag0 = tagTool.create(2);
                var tag1 = tagTool.create(1);
                var tag2 = tagTool.create(2);
                var gameObject1 = gameObjectTool.create();
                var gameObject2 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");

                gameObjectTool.addComponent(gameObject1, tag1);
                gameObjectTool.addComponent(gameObject2, tag2);


                tagTool.addTag(tag2, "ccc");

                tagTool.addTag(tag1, "bbb");

                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test3", function () {
                var tag1 = tagTool.create(1);
                var tag0 = tagTool.create(2);
                var tag2 = tagTool.create(2);
                var gameObject1 = gameObjectTool.create();
                var gameObject2 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");

                gameObjectTool.addComponent(gameObject1, tag1);
                gameObjectTool.addComponent(gameObject2, tag2);


                tagTool.addTag(tag2, "ccc");

                tagTool.addTag(tag1, "bbb");

                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject2]);
            });
            it("test4", function () {
                var tag1 = tagTool.create(2);
                var tag2 = tagTool.create(1);
                var tag3 = tagTool.create(3);
                var gameObject1 = gameObjectTool.create();
                var gameObject2 = gameObjectTool.create();
                var gameObject3 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");
                tagTool.addTag(tag1, "bbb");
                tagTool.addTag(tag1, "ccc");
                tagTool.addTag(tag2, "ccc");
                tagTool.addTag(tag2, "aaa");
                tagTool.addTag(tag3, "bbb");

                gameObjectTool.addComponent(gameObject1, tag1);
                gameObjectTool.addComponent(gameObject2, tag2);
                gameObjectTool.addComponent(gameObject3, tag3);



                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject3]);
                expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject1, gameObject2]);
            });
            it("test double double", function () {
                var tag1 = tagTool.create(2);
                var tag2 = tagTool.create(3);
                var gameObject1 = gameObjectTool.create();
                var gameObject2 = gameObjectTool.create();

                tagTool.addTag(tag1, "aaa");
                tagTool.addTag(tag1, "bbb");
                tagTool.addTag(tag1, "ccc");
                tagTool.addTag(tag1, "ddd");
                tagTool.addTag(tag1, "fff");
                tagTool.addTag(tag1, "ggg");
                tagTool.addTag(tag2, "bbb");

                gameObjectTool.addComponent(gameObject1, tag1);
                gameObjectTool.addComponent(gameObject2, tag2);


                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject2]);
                expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject1]);
            })
        });

        it("if add repeated tag, error", function () {
            var tag1 = tagTool.create(2);
            var tag2 = tagTool.create(1);

            var gameObject1 = gameObjectTool.create();

            tagTool.addTag(tag2, "aaa");

            expect(function () {
                tagTool.addTag(tag2, "aaa");
            }).toThrow("tag should not already be added");



            tagTool.addTag(tag1, "aaa");

            expect(function () {
                tagTool.addTag(tag1, "aaa");
            }).toThrow("tag should not already be added");
        });
    });

    describe("removeTag", function() {
        beforeEach(function(){

        });

        it("remove tag of tag component", function(){
            var tag1 = tagTool.create(2);

            var gameObject1 = gameObjectTool.create();

            tagTool.addTag(tag1, "aaa");
            tagTool.addTag(tag1, "bbb");

            gameObjectTool.addComponent(gameObject1, tag1);


            tagTool.removeTag(tag1, "aaa");

            expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
            expect(tagTool.findGameObjectsByTag("aaa")).toEqual([]);
        });
        it("test remove not-existed-tag", function () {
            var tag1 = tagTool.create(2);

            var gameObject1 = gameObjectTool.create();

            tagTool.addTag(tag1, "bbb");

            gameObjectTool.addComponent(gameObject1, tag1);


            tagTool.removeTag(tag1, "aaa");
            tagTool.removeTag(tag1, "bbb");

            expect(tagTool.findGameObjectsByTag("bbb")).toEqual([]);
        });
        it("if the tag component has been allocated more slot count, not collect yet", function () {
            var tag0 = tagTool.create(2);
            var tag1 = tagTool.create(1);
            var tag2 = tagTool.create(2);

            var gameObject1 = gameObjectTool.create();
            var gameObject2 = gameObjectTool.create();

            tagTool.addTag(tag1, "aaa");
            tagTool.addTag(tag1, "bbb");

            gameObjectTool.addComponent(gameObject1, tag1);
            gameObjectTool.addComponent(gameObject2, tag2);


            tagTool.addTag(tag2, "ccc");


            tagTool.removeTag(tag1, "bbb");
            tagTool.removeTag(tag1, "aaa");
            tagTool.removeTag(tag2, "ccc");

            expect(tagTool.findGameObjectsByTag("aaa")).toEqual([]);
            expect(tagTool.findGameObjectsByTag("bbb")).toEqual([]);
            expect(tagTool.findGameObjectsByTag("ccc")).toEqual([]);
        });
    });
});
