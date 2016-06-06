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

    describe("set local transform state", function(){
        var tra2;

        beforeEach(function(){
            tra2 = new Transform();
            tra2.clearCache = sandbox.stub();
            tra1.clearCache = sandbox.stub();

            tra1.parent = tra2;


            sandbox.spy(tra2, "handleWhenSetTransformState");
            sandbox.spy(tra1, "handleWhenSetTransformState");
        });

        describe("not invoke handleWhenSetTransformState, just clear cache and set dirtyLocal = true", function(){
            it("test isLocalTranslate", function(){
                tra2.isLocalTranslate = true;

                expect(tra2.handleWhenSetTransformState).not.toCalled();
                expect(tra2.clearCache).toCalledOnce();
                expect(tra2.dirtyLocal).toBeTruthy();

                expect(tra1.handleWhenSetTransformState).not.toCalled();
                expect(tra1.clearCache).toCalledOnce();
                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("test isLocalRotate", function(){
                tra2.isLocalRotate = true;

                expect(tra2.handleWhenSetTransformState).not.toCalled();
                expect(tra2.clearCache).toCalledOnce();
                expect(tra2.dirtyLocal).toBeTruthy();

                expect(tra1.handleWhenSetTransformState).not.toCalled();
                expect(tra1.clearCache).toCalledOnce();
                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("test isLocalScale", function(){
                tra2.isLocalScale = true;

                expect(tra2.handleWhenSetTransformState).not.toCalled();
                expect(tra2.clearCache).toCalledOnce();
                expect(tra2.dirtyLocal).toBeTruthy();

                expect(tra1.handleWhenSetTransformState).not.toCalled();
                expect(tra1.clearCache).toCalledOnce();
                expect(tra1.dirtyLocal).toBeTruthy();
            });
        });
    });

    describe("dispose", function(){
        it("unbind ENDLOOP event", function(){
            tra1.init();

            tra1.clearCache = sandbox.stub();

            tra1.isTranslate = true;

            tra1.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(tra1.isTranslate).toBeTruthy();
        });
    });
});