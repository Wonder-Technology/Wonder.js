describe("Entity", function () {
    var sandbox = null;
    var entity = null;

    var resetEntityUid = wd.resetEntityUid;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("uid", function() {
        beforeEach(function(){
            resetEntityUid().run();
        });

        describe("build uid", function() {
            beforeEach(function(){

            });

            it("uid start from 0", function () {
                entity = new wd.Entity();

                expect(entity.uid).toEqual(0);
            });
            it("build unique uid when create", function () {
                entity = new wd.Entity();
                var entity2 = new wd.Entity();

                expect(entity.uid).toEqual(0);
                expect(entity2.uid).toEqual(1);
            });

            //todo more
        });

        //todo more
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

