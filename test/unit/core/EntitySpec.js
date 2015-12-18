describe("Entity", function() {
    var sandbox = null;
    var entity = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        entity = new wd.Entity();
    });
    afterEach(function () {
        sandbox.restore();
    });


    describe("addTag", function () {
        it("add a tag", function () {
            entity.addTag("a");
            entity.addTag("b");

            expect(entity.getTagList().getChildren()).toEqual(["a", "b"]);
        });
    });

    describe("removeTag", function () {
        it("remove a tag", function () {
            entity.addTag("a");
            entity.addTag("b");
            entity.addTag("c");

            entity.removeTag("a");
            entity.removeTag("c");

            expect(entity.getTagList().getChildren()).toEqual(["b"]);
        });
    });

    describe("hasTag", function () {
        it("judge whether has the tag(complete match)", function () {
            entity.addTag("abc");

            expect(entity.hasTag("b")).toBeFalsy();
            expect(entity.hasTag("abc")).toBeTruthy();
        });
    });

    describe("containTag", function () {
        it("judge whether has the tag(partial match)(case sensitive)", function () {
            entity.addTag("abc");

            expect(entity.containTag("A")).toBeFalsy();
            expect(entity.containTag("a")).toBeTruthy();
            expect(entity.containTag("bc")).toBeTruthy();
        });
    });
});
