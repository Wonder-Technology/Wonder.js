describe("Transform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector3 = wd.Vector3;
    var Transform = wd.Transform;

    function getValues(values, digit){
        var digit = digit || 0;

        if(values){
            if(mathTestUtils.isFloat32Array(values)){
                return mathTestUtils.getValues(values, digit);
            }
            else{
                return mathTestUtils.getValues(values.values, digit);
            }
        }

        return mathTestUtils.getValues(matrix.values, digit);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        tra1 = Transform.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("the change of parent before setted as parent will affect child", function(){
        var tra2 = Transform.create();
        var tra3 = Transform.create();
        tra2.rotate(Vector3.create(0, 180, 0));
        tra1.parent = tra2;
        tra3.parent = tra2;

        tra2.translateLocal(Vector3.create(1, 1, 1));
        tra1.translateLocal(Vector3.create(1, 1, 1));
        tra3.translate(Vector3.create(1, 1, 1));

        expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
        expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-2, 2, -2)));
        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
        expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(0, 2, 0)));
        expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
    });


    describe("set position", function(){
        var tra2 = null,
            tra3 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra3 = Transform.create();

            tra2.position = Vector3.create(0, 0, 0);
            tra3.position = Vector3.create(0, 0, 0);
            tra1.position = Vector3.create(1, 2, 3);
            tra1.parent = tra2;
            tra3.parent = tra2;

            tra2.position = Vector3.create(2, 2, 2);
        });

        it("set position", function(){
            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(2, 2, 2)));
            expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(2, 2, 2)));
            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(3, 4, 5)));
            expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 2, 3)));
            expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(2, 2, 2)));
            expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(0, 0, 0)));
        });
        it("set local position", function(){
            tra3.localPosition = Vector3.create(1, 1, 1);
            tra2.localPosition = Vector3.create(3, 3, 3);

            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(3, 3, 3)));
            expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(3, 3, 3)));
            expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(4, 4, 4)));
            expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(4, 5, 6)));
            expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 2, 3)));
        });
    });

    describe("set eulerAngles", function(){
        var tra2 = null;

        beforeEach(function(){
            tra2 = Transform.create();
        });

        it("child will follow parent", function(){
            tra2.eulerAngles = Vector3.create(1,2,3);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);

            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(0, 0, 0)));
        });
        it("if child's eulerAngles is zero before setting parent, then it will rotate the same as the parent", function(){
            tra2.eulerAngles = Vector3.create(1,2,3);
            tra1.eulerAngles = Vector3.create(0, 0, 0);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);

            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(0, 0, 0)));
        });
        it("when set child's eulerAngles after setting its parent, it's eulerAngles will be the setting num ignoring parent's eulerAngles", function(){
            tra2.eulerAngles = Vector3.create(1,2,3);
            tra1.eulerAngles = Vector3.create(1, 1, 1);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);
            tra1.eulerAngles = Vector3.create(2, 2, 2);

            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(2, 2, 2)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(0, -1, -2)));
        });
        it("local eulerAngles is relative to the parent(relative to world when parent is null)", function(){
            tra2.localEulerAngles = Vector3.create(1,2,3);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);
            tra1.localEulerAngles = Vector3.create(1, 1, 1);

            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(3, 4, 5)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(1, 1, 1)));
        });
    });

    it("set scale", function(){
        var tra2 = Transform.create();
        tra2.localScale = Vector3.create(2, 2, 0.5);
        tra1.parent = tra2;

        tra2.localScale = Vector3.create(2, 1, 1);
        tra1.localScale = Vector3.create(1, 2, 2);

        expect(getValues(tra2.localScale)).toEqual(getValues(Vector3.create(2, 1, 1)));
        expect(getValues(tra2.scale)).toEqual(getValues(Vector3.create(2, 1, 1)));
        expect(getValues(tra1.localScale)).toEqual(getValues(Vector3.create(1, 2, 2)));
        expect(getValues(tra1.scale)).toEqual(getValues(Vector3.create(2, 2, 2)));
    });

    describe("translate test", function(){
        var tra2 = null;
        beforeEach(function(){
            tra2 = Transform.create();
            tra2.position = Vector3.create(0, 0, 0);
            tra1.position = Vector3.create(1, 2, 3);

            tra1.parent = tra2;
        });

        describe("translate", function(){
            it("based on world space", function(){
                tra2.rotate(Vector3.create(0, 180, 0));
                tra2.translate(Vector3.create(1, 1, 1));
                tra1.translate(Vector3.create(1, 1, 1));

                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(1, 1, 1)));
                expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(1, 4 ,-1)));
                expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(0, 3, 2)));
            });
            //it("child should follow parent, while parent shouldn't follow parent", function(){
            //    tra2.translate(Vector3.create(1, 1, 1));
            //    tra1.rotate(Vector3.create(0, 180, 0));
            //    tra1.translate(Vector3.create(1, 1, 1));
            //
            //    expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(1, 1, 1)));
            //    expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
            //    expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
            //    expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-4, 3, -6)));
            //});

            //describe("relativeTo will affect when no parent", function(){
            //    //will affect tra2 bellow
            //
            //    it("relative to self", function(){
            //        tra2.rotate(Vector3.create(0, 180, 0));
            //        tra2.translate(Vector3.create(1, 1, 1), Space.SELF);
            //        tra1.translate(Vector3.create(1, 1, 1));
            //        tra1.translate(Vector3.create(1, 1, 1), Space.SELF);
            //
            //        expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
            //        expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
            //        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-4, 5, -6)));
            //        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-3, 4, -5)));
            //    });
            //    it("relative to world", function(){
            //        tra2.rotate(Vector3.create(0, 180, 0));
            //        tra2.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //
            //        expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(1, 1, 1)));
            //        expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
            //        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-1 + 1 +1 +1, 2 + 1 + 1 + 1, -3 + 1 +1 +1)));
            //        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 4, -1)));
            //    });
            //})
        });

        //describe("translate in hierarchy", function(){
        //
        //    it("relative to self", function(){
        //        tra1.translate(Vector3.create(1, 1, 1));
        //        tra1.translate(Vector3.create(1, 1, 1), Space.SELF);
        //
        //        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-1, 4, 1)));
        //        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-2, 2, -2)));
        //    });
        //    it("relative to world", function(){
        //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
        //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
        //
        //        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(3, 4, 5)));
        //        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(2, 2, 2)));
        //    });
        //});

        describe("translateLocal", function() {
            it("translate based on self", function () {
                tra2.rotate(Vector3.create(0, 180, 0));
                tra2.translateLocal(Vector3.create(1, 1, 1));
                tra1.translateLocal(Vector3.create(1, 1, 1));

                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
                expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
                expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(2, 3, 4)));
            });
        });
    });

    //describe("test multi layer of hierarchy", function(){
    //    var tra2 = null,
    //        tra3 = null,
    //        tra4 = null;
    //
    //    beforeEach(function(){
    //        tra2 = Transform.create();
    //        tra3 = Transform.create();
    //        tra4 = Transform.create();
    //
    //        tra2.position = Vector3.create(0, 0, 0);
    //
    //        tra1.parent = tra2;
    //        tra3.parent = tra2;
    //
    //        tra3.position = Vector3.create(1, 2, 3);
    //        tra2.rotate(Vector3.create(0, 180, 0));
    //        tra1.position = Vector3.create(1, 2, 3);
    //
    //        tra2.translate(Vector3.create(1, 1, 1));
    //        tra1.translate(Vector3.create(1, 1, 1));
    //        tra3.translate(Vector3.create(1, 1, 1));
    //    });
    //
    //    it("test single layer", function(){
    //        expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
    //        expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
    //        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-1, 4, 1)));
    //        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(0, 3, 2)));
    //        expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
    //        expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-2, 3, -4)));
    //    });
    //
    //    describe("add tra4 as parent", function(){
    //        beforeEach(function(){
    //            tra4.position = Vector3.create(0, 0, 0);
    //            tra4.parent = tra2;
    //            tra1.parent = tra4;
    //            tra4.rotate(Vector3.create(0, 180, 0));
    //            tra3.parent = tra4;
    //
    //            tra2.translate(Vector3.create(1, 1, 1));
    //            tra4.translate(Vector3.create(1, 1, 1));
    //            tra1.translate(Vector3.create(1, 1, 1));
    //            tra3.translate(Vector3.create(1, 1, 1));
    //        });
    //
    //        it("test", function(){
    //            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-2, 2, -2)));
    //            expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-2, 2, -2)));
    //            expect(getValues(tra4.position)).toEqual(getValues(Vector3.create(-2, 2, -2)));
    //            expect(getValues(tra4.localPosition)).toEqual(getValues(Vector3.create(0, 0, 0)));
    //            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(0, 7, -2)));
    //            expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(2, 5, 0)));
    //            expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-6, 7, -8)));
    //            expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-4, 5, -6)));
    //        });
    //
    //        describe("set parent null", function(){
    //            beforeEach(function(){
    //                tra3.parent = null;
    //
    //                tra4.translate(Vector3.create(1, 1, 1));
    //                tra3.translate(Vector3.create(1, 1, 1));
    //            });
    //
    //            it("test", function(){
    //                expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-7, 8, -9)));
    //                expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-7, 8, -9)));
    //                expect(getValues(tra4.position)).toEqual(getValues(Vector3.create(-3, 3, -3)));
    //                expect(getValues(tra4.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
    //            });
    //        });
    //    });
    //});

    describe("rotate test", function(){
        var tra2 = null;

        it("eulerAngle's range is -180 to 180", function(){
            var tra3 = Transform.create();
            tra2 = Transform.create();
            tra2.eulerAngles = Vector3.create(90, 0, 0);

            tra2.rotate(Vector3.create(91, 0, 0));
            tra3.rotate(Vector3.create(180, 0, 0));
            tra1.rotateLocal(Vector3.create(-181, 0, 0));

            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(-179, 0, 0)));
            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(-179, 0, 0)));
            expect(getValues(tra3.localEulerAngles)).toEqual(getValues(Vector3.create(180, 0, 0)));
            expect(getValues(tra3.eulerAngles)).toEqual(getValues(Vector3.create(180, 0, 0)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(179, 0, 0)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(179, 0, 0)));
        });

        describe("rotate", function(){
            it("test eulerAngles when rotate around world", function(){
                tra2 = Transform.create();
                tra2.eulerAngles = Vector3.create(90, 0, 0);
                tra1.eulerAngles = Vector3.create(10, 0, 0);
                tra1.parent = tra2;

                tra2.rotate(Vector3.create(30, 0, 0));
                tra1.rotate(Vector3.create(20, 0, 0));

                expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(120, 0, 0)));
                expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(120, 0, 0)));
                expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(150, 0, 0)));
                expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(30, 0, 0)));
            });
            it("test position when rotate around world(child's rotation will not affect it's position)", function(){
                tra2 = Transform.create();
                tra2.position = Vector3.create(2, 2, 2);
                tra1.position = Vector3.create(1, 1, 1);
                tra1.parent = tra2;
                tra2.rotate(Vector3.create(0, 180, 0));
                tra1.rotate(Vector3.create(180, 0, 180));

                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(2, 2, 2)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(1, 3, 1)));
            });
        });

        describe("rotateLocal", function(){
            it("test eulerAngles when rotate around self", function(){
                tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.rotateLocal(Vector3.create(90, 0, 0));
                tra1.rotateLocal(Vector3.create(0, 90, 0));

                expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(90, 0, 0)));
                expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(90, 0, 0)));
                expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(90, 0, 90)));
                expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(0, 90, 0)));
            });
            it("test position when rotate around self(child's rotation will not affect it's position)", function(){
                tra2 = Transform.create();
                tra2.position = Vector3.create(2, 2, 2);
                tra1.position = Vector3.create(1, 1, 1);
                tra1.parent = tra2;
                tra2.rotateLocal(Vector3.create(90, 0, 0));
                tra1.rotateLocal(Vector3.create(0, 90, 0));

                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(2, 2, 2)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(3, 1, 3)));
            });
        });
        it("rotateAround", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(2, 2, 2);
            tra1.position = Vector3.create(1, 1, 1);
            tra1.parent = tra2;

            tra2.rotateAround(180, Vector3.create(2, 3, 2), Vector3.create(0, 0, 1));

            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(0, 0, 180)));
            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(0, 0, 180)));
            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(2, 4, 2)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(0, 0, 180)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(0, 0, 0)));
            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(1, 3, 3)));
        });
    });

    describe("lookAt", function(){
        it("default up direction is positive y", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(1, 2, 0);
            tra1.position = Vector3.create(1, 1, 1);

            tra1.lookAt(tra2.position);

            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(45, 0, 0)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(45, 0, 0)));
        });
        it("if viewPoint to target is default up axis, should specify the new up direction", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(0, 2, 0);
            tra1.position = Vector3.create(0, 1, 0);

            tra1.lookAt(tra2.position);

            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(NaN, NaN, 0)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(NaN, NaN, NaN)));



            tra2.position = Vector3.create(0, 2, 0);
            tra1.position = Vector3.create(0, 1, 0);

            tra1.lookAt(tra2.position, Vector3.forward);

            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(90, 0, 0)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(90, 0, 0)));
        });
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
            tra1._parent = oldParent;

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

    describe("test state", function(){
        describe("isTranslate", function(){
            it("if set it to be true, set dirtyLocal to be true", function(){
                tra1.translate(0,1,0);

                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("change children state", function(){
                var tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.translate(0,1,0);

                expect(tra2.isTranslate).toBeTruthy();
                expect(tra1.isTranslate).toBeTruthy();
            });
        });

        describe("isRotate", function(){
            it("if set it to be true, set dirtyLocal to be true", function(){
                tra1.rotate(0,1,0);

                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("change children state", function(){
                var tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.rotate(0,1,0);

                expect(tra2.isRotate).toBeTruthy();
                expect(tra1.isRotate).toBeTruthy();
            });
        });

        describe("isScale", function(){
            it("if set it to be true, set dirtyLocal to be true", function(){
                tra1.scale = wd.Vector3.create(1,1,2);

                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("change children state", function(){
                var tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.scale = wd.Vector3.create(1,1,2);

                expect(tra2.isScale).toBeTruthy();
                expect(tra1.isScale).toBeTruthy();
            });
        });
    });
});