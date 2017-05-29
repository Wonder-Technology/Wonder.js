describe("Tag", function() {
    var sandbox = null;

    var TagData = wd.TagData;
    var MemoryConfig = wd.MemoryConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
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
    
    describe("disposeComponent", function() {
        var tag1,
            gameObject1;

        beforeEach(function(){
            tag1 = tagTool.create(2);

            gameObject1 = gameObjectTool.create();

            tagTool.addTag(tag1, "aaa");
            tagTool.addTag(tag1, "bbb");

            gameObjectTool.addComponent(gameObject1, tag1);
        });

        it("remove from gameObject", function () {
            gameObjectTool.disposeComponent(gameObject1, tag1);

            expect(gameObjectTool.hasComponent(gameObject1, wd.Tag)).toBeFalsy();
            expect(tagTool.getGameObject(tag1)).toBeUndefined();
        });

        describe("dispose component", function(){
            it("find no related gameObjects of disposed tag", function () {
                gameObjectTool.disposeComponent(gameObject1, tag1);

                expect(tagTool.findGameObjectsByTag("aaa")).toEqual([]);
                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([]);
            });
            it("test add new tag after dispose", function () {
                var tag2 = tagTool.create(1);
                var tag3 = tagTool.create(3);
                var gameObject2 = gameObjectTool.create();
                var gameObject3 = gameObjectTool.create();

                tagTool.addTag(tag2, "ccc");
                tagTool.addTag(tag2, "aaa");
                tagTool.addTag(tag3, "bbb");

                gameObjectTool.addComponent(gameObject2, tag2);
                gameObjectTool.addComponent(gameObject3, tag3);



                gameObjectTool.disposeComponent(gameObject3, tag3);

                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);



                var tag4 = tagTool.create(2);
                gameObjectTool.addComponent(gameObject3, tag4);
                tagTool.addTag(tag4, "bbb");

                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject3]);



                gameObjectTool.disposeComponent(gameObject1, tag1);
                gameObjectTool.disposeComponent(gameObject3, tag4);


                expect(tagTool.findGameObjectsByTag("bbb")).toEqual([]);
                expect(tagTool.findGameObjectsByTag("aaa")).toEqual([gameObject2]);
            });
            
            describe("reallocate if dispose too many", function() {
                var tag2;
                var gameObject2;

                beforeEach(function(){
                    sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 1);

                    tag2 = tagTool.create(2);

                    gameObject2 = gameObjectTool.create();

                    tagTool.addTag(tag2, "qqq");

                    gameObjectTool.addComponent(gameObject2, tag2);
                });
                
                it("new tagArray should has no holes", function(){
                    gameObjectTool.disposeComponent(gameObject1, tag1);

                    expect(TagData.tagArray).toEqual(["qqq"]);
                });
                it("new gameObjectMap,slotCountMap,usedSlotCountMap,indexMap,indexInTagArrayMap,tagMap should only not-removed data", function(){
                    gameObjectTool.disposeComponent(gameObject1, tag1);

                    expect(TagData.gameObjectMap).toEqual({
                        0:gameObject2
                    });
                    expect(TagData.slotCountMap).toEqual([2]);
                    expect(TagData.usedSlotCountMap).toEqual([1]);
                    expect(TagData.tagMap).toEqual({
                        0:tag2
                    });
                    expect(TagData.indexMap).toEqual([0]);
                });
                it("new indexInTagArrayMap should only not-removed data and next data", function(){
                    gameObjectTool.disposeComponent(gameObject1, tag1);

                    expect(TagData.indexInTagArrayMap).toEqual([0, 2]);
                });
                it("tag index should be update", function () {
                    gameObjectTool.disposeComponent(gameObject1, tag1);

                    expect(tag1.index).toEqual(-1);
                    expect(tag2.index).toEqual(0);
                    expect(tagTool.findGameObjectsByTag("qqq")).toEqual([gameObject2]);
                });
                it("test maxComponentDisposeCount > 1", function () {
                    sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                    var tag3 = tagTool.create(1);

                    var gameObject3 = gameObjectTool.create();

                    tagTool.addTag(tag3, "www");

                    gameObjectTool.addComponent(gameObject3, tag3);

                    gameObjectTool.disposeComponent(gameObject3, tag3);
                    gameObjectTool.disposeComponent(gameObject2, tag2);

                    expect(tag1.index).toEqual(0);
                    expect(tag2.index).toEqual(-1);
                    expect(tag3.index).toEqual(-1);
                    expect(tagTool.findGameObjectsByTag("qqq")).toEqual([]);
                    expect(tagTool.findGameObjectsByTag("www")).toEqual([]);
                    expect(tagTool.findGameObjectsByTag("aaa")).toEqual([gameObject1]);
                    expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1]);
                });

                describe("test add new tag after dispose old one", function () {
                    it("findGameObjects by removed tag should return empty array", function () {
                        gameObjectTool.disposeComponent(gameObject1, tag1);
                        gameObjectTool.disposeComponent(gameObject2, tag2);


                        var tag3 = tagTool.create(1);

                        var gameObject3 = gameObjectTool.create();

                        tagTool.addTag(tag3, "ttt");

                        gameObjectTool.addComponent(gameObject3, tag3);

                        expect(tagTool.findGameObjectsByTag("ttt")).toEqual([gameObject3]);
                    });
                    it("test maxComponentDisposeCount > 1", function () {
                        sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);

                        var tag3 = tagTool.create(1);

                        var gameObject3 = gameObjectTool.create();

                        tagTool.addTag(tag3, "www");

                        gameObjectTool.addComponent(gameObject3, tag3);

                        gameObjectTool.disposeComponent(gameObject3, tag3);
                        gameObjectTool.disposeComponent(gameObject2, tag2);




                        var tag4 = tagTool.create(3);

                        var gameObject4 = gameObjectTool.create();

                        tagTool.addTag(tag4, "ttt");
                        tagTool.addTag(tag4, "mmm");

                        gameObjectTool.addComponent(gameObject4, tag4);

                        expect(tagTool.findGameObjectsByTag("ttt")).toEqual([gameObject4]);
                        expect(tagTool.findGameObjectsByTag("mmm")).toEqual([gameObject4]);
                    });
                });
            });
        });

        it("if tag is disposed, removeTag/addTag should error", function () {
            var errMsg = "component should alive";

            gameObjectTool.disposeComponent(gameObject1, tag1);

            expect(function () {
                tagTool.removeTag(tag1, "aaa");
            }).toThrow(errMsg);

            expect(function () {
                tagTool.addTag(tag1, "aaa");
            }).toThrow(errMsg);
        });
    });
    
    describe("findGameObjectsByTag", function() {
        beforeEach(function(){
        });
        
        it("find all gameObjects with the tag", function(){
            var tag1 = tagTool.create(2);
            var tag2 = tagTool.create(1);
            var tag3 = tagTool.create(1);

            var gameObject1 = gameObjectTool.create();
            var gameObject11 = gameObjectTool.create();
            var gameObject2 = gameObjectTool.create();

            gameObjectTool.add(gameObject1, gameObject11);

            tagTool.addTag(tag1, "aaa");
            tagTool.addTag(tag1, "bbb");
            tagTool.addTag(tag2, "aaa");
            tagTool.addTag(tag2, "ccc");
            tagTool.addTag(tag3, "ccc");
            tagTool.addTag(tag3, "bbb");

            gameObjectTool.addComponent(gameObject1, tag1);
            gameObjectTool.addComponent(gameObject11, tag2);
            gameObjectTool.addComponent(gameObject2, tag3);


            expect(tagTool.findGameObjectsByTag("aaa")).toEqual([gameObject1, gameObject11]);
            expect(tagTool.findGameObjectsByTag("bbb")).toEqual([gameObject1, gameObject2]);
            expect(tagTool.findGameObjectsByTag("ccc")).toEqual([gameObject11, gameObject2]);
        });
    });
});
