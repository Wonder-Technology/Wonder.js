describe("Transform", function(){
    var sandbox = null;
    var tra1 = null;
    var Transform = wd.Transform;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        tra1 = new Transform();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("set parent", function(){
        var oldParent,
            newParent;

        function buildParent(){
            return {
                removeChild:sandbox.stub(),
                addChild: sandbox.stub()
            }
        }

        beforeEach(function(){
            oldParent = buildParent();
            newParent = buildParent();
        });

        it("if old parent exist, remove from the old parent", function(){
            tra1.p_parent = oldParent;

            tra1.parent = newParent;

            expect(oldParent.removeChild).toCalledWith(tra1);
        });
        it("if new parent is null, then set parent null", function(){
            tra1.parent = null;

            expect(tra1.parent).toBeNull();
        });
        it("else, set parent to be newParent and added to the newParent", function(){
            tra1.parent = newParent;

            expect(tra1.parent).toEqual(newParent);
            expect(newParent.addChild).toCalledWith(tra1);
        });
    });
});