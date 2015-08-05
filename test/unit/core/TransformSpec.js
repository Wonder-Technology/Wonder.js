describe("Transform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector3 = dy.Vector3;
    var Transform = dy.Transform;
    var Space = dy.Space;

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

    describe("set position", function(){
        var tra2 = null,
            tra3 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra3 = Transform.create();

            tra2.setPosition(0, 0, 0);
            tra3.setPosition(0, 0, 0);
            tra1.setPosition(1, 2, 3);
            tra1.parent = tra2;
            tra3.parent = tra2;

            tra2.setPosition(2, 2, 2);
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
            tra3.setLocalPosition(1, 1, 1);
            tra2.setLocalPosition(3, 3, 3);

            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(3, 3, 3)));
            expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(3, 3, 3)));
            expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(4, 4, 4)));
            expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(4, 5, 6)));
            expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 2, 3)));
        });
    });

    describe("set eulerAngles", function(){
        var tra2 = null,
            tra3 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra3 = Transform.create();
            tra2.setEulerAngles(Vector3.create(1,2,3));
            tra1.setEulerAngles(Vector3.create(0, 0, 0));
            tra3.setEulerAngles(Vector3.create(0, 0, 0));
            tra1.parent = tra2;
            tra3.parent = tra2;

            tra2.setEulerAngles(Vector3.create(2, 3, 4));
            tra3.setEulerAngles(Vector3.create(1, 2, 3));
        });
        it("set eulerAngles", function(){
            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra3.eulerAngles)).toEqual(getValues(Vector3.create(1, 2, 3)));
            expect(getValues(tra3.localEulerAngles)).toEqual(getValues(Vector3.create(-1, -1, -1)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(1, 1, 1)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(-1, -2, -3)));
        });

        it("set local eulerAngles", function(){
            tra2.setLocalEulerAngles(Vector3.create(3, 4, 5));
            tra1.setLocalEulerAngles(Vector3.create(1, 1, 1));

            expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(3, 4, 5)));
            expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(3, 4, 5)));
            expect(getValues(tra3.eulerAngles)).toEqual(getValues(Vector3.create(2, 3, 4)));
            expect(getValues(tra3.localEulerAngles)).toEqual(getValues(Vector3.create(-1, -1, -1)));
            expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(4, 5, 6)));
            expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(1, 1, 1)));
        });
    });

    describe("translate test", function(){
        var tra2 = null;
        beforeEach(function(){
            tra2 = Transform.create();
            tra2.setPosition(0, 0, 0);
            tra1.setPosition(1, 2, 3);

            tra1.parent = tra2;
        });

        describe("translate", function(){
            it("child should follow parent, while parent shouldn't follow parent", function(){
                tra2.translate(Vector3.create(1, 1, 1));
                tra1.rotate(Vector3.create(0, 180, 0));
                tra1.translate(Vector3.create(1, 1, 1));

                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(1, 1, 1)));
                expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
                expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-4, 3, -6)));
            });

            describe("relativeTo will affect when no parent", function(){
                //will affect tra2 bellow

                it("relative to self", function(){
                    tra2.rotate(Vector3.create(0, 180, 0));
                    tra2.translate(Vector3.create(1, 1, 1), Space.SELF);
                    tra1.translate(Vector3.create(1, 1, 1));
                    tra1.translate(Vector3.create(1, 1, 1), Space.SELF);

                    expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
                    expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
                    expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-4, 5, -6)));
                    expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-3, 4, -5)));
                });
                it("relative to world", function(){
                    tra2.rotate(Vector3.create(0, 180, 0));
                    tra2.translate(Vector3.create(1, 1, 1), Space.WORLD);
                    tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
                    tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);

                    expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(1, 1, 1)));
                    expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(1, 1, 1)));
                    expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-1 + 1 +1 +1, 2 + 1 + 1 + 1, -3 + 1 +1 +1)));
                    expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(1, 4, -1)));
                });
            })
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
    });

    it("the change before setting parent will not affect child", function(){
        var tra2 = Transform.create();
        tra2.setPosition(0, 0, 0);
        tra2.rotate(Vector3.create(0, 180, 0));
        tra1.setPosition(1, 2, 3);
        tra1.parent = tra2;

        tra1.translate(Vector3.create(1, 1, 1));
        tra2.translate(Vector3.create(1, 1, 1));

        expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
        expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
        expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(1, 4, 3)));
        expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(2, 3, 4)));
    });

    describe("test multi layer of hierarchy", function(){
        var tra2 = null,
            tra3 = null,
            tra4 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra3 = Transform.create();
            tra4 = Transform.create();

            tra2.setPosition(0, 0, 0);

            tra1.parent = tra2;
            tra3.parent = tra2;

            tra3.setPosition(1, 2, 3);
            tra2.rotate(Vector3.create(0, 180, 0));
            tra1.setPosition(1, 2, 3);

            tra2.translate(Vector3.create(1, 1, 1));
            tra1.translate(Vector3.create(1, 1, 1));
            tra3.translate(Vector3.create(1, 1, 1));
        });

        it("test single layer", function(){
            expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-1, 1, -1)));
            expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
            expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-1, 4, 1)));
            expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(0, 3, 2)));
            expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
            expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-2, 3, -4)));
        });

        describe("add tra4 as parent", function(){
            beforeEach(function(){
                tra4.setPosition(0, 0, 0);
                tra4.parent = tra2;
                tra1.parent = tra4;
                tra4.rotate(Vector3.create(0, 180, 0));
                tra3.parent = tra4;

                tra2.translate(Vector3.create(1, 1, 1));
                tra4.translate(Vector3.create(1, 1, 1));
                tra1.translate(Vector3.create(1, 1, 1));
                tra3.translate(Vector3.create(1, 1, 1));
            });

            it("test", function(){
                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(-2, 2, -2)));
                expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(-2, 2, -2)));
                expect(getValues(tra4.position)).toEqual(getValues(Vector3.create(-2, 2, -2)));
                expect(getValues(tra4.localPosition)).toEqual(getValues(Vector3.create(0, 0, 0)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(0, 7, -2)));
                expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(2, 5, 0)));
                expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-6, 7, -8)));
                expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-4, 5, -6)));
            });

            describe("set parent null", function(){
                beforeEach(function(){
                    tra3.parent = null;

                    tra4.translate(Vector3.create(1, 1, 1));
                    tra3.translate(Vector3.create(1, 1, 1));
                });

                it("test", function(){
                    expect(getValues(tra3.position)).toEqual(getValues(Vector3.create(-7, 8, -9)));
                    expect(getValues(tra3.localPosition)).toEqual(getValues(Vector3.create(-7, 8, -9)));
                    expect(getValues(tra4.position)).toEqual(getValues(Vector3.create(-3, 3, -3)));
                    expect(getValues(tra4.localPosition)).toEqual(getValues(Vector3.create(-1, 1, -1)));
                });
            });
        });
    });

    describe("rotate test", function(){
        var tra2 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra2.setEulerAngles(Vector3.create(90, 0, 0));
            tra2.setPosition(2, 2, 2);
            tra1.setEulerAngles(Vector3.create(0, 0, 0));
            tra1.setPosition(1, 1, 1);
            tra1.parent = tra2;
        });

        describe("rotate", function(){
            it("child should follow parent, while parent shouldn't follow parent", function(){
                //tra2.rotate(Vector3.create(0, 180, 360), Space.WORLD);
                tra2.rotate(Vector3.create(90, 0, 0), Space.WORLD);
                tra1.rotate(Vector3.create(0, 180, 0), Space.WORLD);

                expect(getValues(tra2.localEulerAngles)).toEqual(getValues(Vector3.create(180, 0, 0)));
                expect(getValues(tra2.eulerAngles)).toEqual(getValues(Vector3.create(180, 0, 0)));
                expect(getValues(tra2.position)).toEqual(getValues(Vector3.create(2, -2, 2)));
                expect(getValues(tra2.localPosition)).toEqual(getValues(Vector3.create(2, -2, 2)));
                expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(10, 0, 0)));
                expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(11, 2, 3)));
                expect(getValues(tra1.position)).toEqual(getValues(Vector3.create(-3, 4, -5)));
                expect(getValues(tra1.localPosition)).toEqual(getValues(Vector3.create(-4, 3, -6)));
            });
            //
            //describe("relativeTo will affect when no parent", function(){
            //    it("relative to self", function(){
            //        tra1.rotate(Vector3.create(10, 0, 0));
            //
            //        expect(getValues(tra1.localEulerAngles)).toEqual(getValues(Vector3.create(10, 0, 0)));
            //        expect(getValues(tra1.eulerAngles)).toEqual(getValues(Vector3.create(11, 2, 3)));
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

        describe("rotateAround in hierarchy", function(){
            beforeEach(function(){

            });

            it("", function(){

            });
        });
    });

    //todo scale

    //todo lookAt

    //todo up,right,forward
});