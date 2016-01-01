describe("TwoDTransform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector2 = wd.Vector2;
    var Transform = wd.TwoDTransform;

    function getValues(values, digit){
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
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

            tra2.position = Vector2.create(0, 0);
            tra3.position = Vector2.create(0, 0);
            tra1.position = Vector2.create(1, 2);
            tra1.parent = tra2;
            tra3.parent = tra2;

            tra2.position = Vector2.create(2, 2);
        });

        it("set position", function(){
            expect(getValues(tra2.position)).toEqual([2, 2]);
            expect(getValues(tra1.position)).toEqual([3, 4]);

            expect(getValues(tra1.worldMatrix.getTranslation())).toEqual([3, 4]);

            expect(getValues(tra3.position)).toEqual([2, 2]);
        });
    });

    describe("set scale", function() {
        beforeEach(function () {
        });

        it("set scale", function(){
            var tra2 = Transform.create();
            tra2.parent = tra1;

            tra2.position = Vector2.create(100, -50);

            tra2.scale = Vector2.create(2, 3);

            expect(getValues(tra2.scale)).toEqual([2, 3]);
            expect(getValues(tra2.position)).toEqual([100, -50]);
            expect(getValues(tra1.scale)).toEqual([1, 1]);
        });
    });

    describe("test translate,rotate,zoom(it behave likes canvas context->translate/rotate/scale)", function(){
        beforeEach(function(){
        });


        describe("test translate", function(){
            var tra2 = null;

            beforeEach(function(){
                tra2 = Transform.create();

                tra1.parent = tra2;
            });

            describe("translate", function(){
                it("based on canvas space", function(){
                    tra2.position = Vector2.create(0, 0);
                    tra1.position = Vector2.create(1, 2);


                    tra2.translate(Vector2.create(1, 1));



                    expect(getValues(tra1.position)).toEqual([2, 3]);




                    tra1.translate(Vector2.create(1, 1));



                    expect(getValues(tra2.position)).toEqual([1, 1]);
                    expect(getValues(tra1.position)).toEqual([3, 4]);
                });
                it("if parent rotate, translate parent will move parent along its direction", function(){
                    tra2.rotate(45);


                    tra2.translate(Vector2.create(1, 0));


                    expect(getValues(tra2.position, 1)).toEqual([0.7, 0.7]);


                    tra2.rotate(45);


                    tra2.translate(Vector2.create(0, 1));

                    expect(getValues(tra2.position, 1)).toEqual([-0.3, 0.7]);
                });
                it("if child rotate, translate parent will move child horizontally", function(){
                    tra1.rotate(45);


                    tra2.translate(Vector2.create(1, 1));


                    expect(getValues(tra1.position, 1)).toEqual([1, 1]);
                });
            });
        });

        describe("test rotate", function(){
            var tra2 = null;

            describe("rotate", function(){
                it("test rotation when rotate on world space", function(){
                    tra2 = Transform.create();
                    tra2.rotation = 90;
                    tra1.rotation = 10;
                    tra1.parent = tra2;

                    tra2.rotate(30);
                    tra1.rotate(20);


                    expect(getValues(tra2.rotation)).toEqual(-240);
                    expect(getValues(tra1.rotation)).toEqual(-210);
                });
                it("test position when rotate on world space", function(){
                    tra2 = Transform.create();
                    tra2.position = Vector2.create(2, 2);
                    tra1.position = Vector2.create(1, 1);
                    tra1.parent = tra2;
                    tra2.rotate(45);
                    tra1.rotate(10);

                    expect(getValues(tra2.position)).toEqual([2, 2]);
                    expect(getValues(tra2.rotation)).toEqual(45);
                    expect(getValues(tra1.position)).toEqual([2, 3]);
                    expect(getValues(tra1.rotation)).toEqual(55);
                });
            });

            it("rotateAround", function(){
                var tra2 = Transform.create();
                tra2.position = Vector2.create(2, 2);
                tra1.position = Vector2.create(1, 1);
                tra1.parent = tra2;

                tra2.rotateAround(45, Vector2.create(2, 3));

                expect(getValues(tra2.rotation)).toEqual(45);
                expect(getValues(tra2.position)).toEqual([3, 2]);
                expect(getValues(tra1.rotation)).toEqual(45);
                expect(getValues(tra1.position)).toEqual([3, 4]);
            });
        });

        describe("test zoom", function(){
            var tra2 = null;

            describe("zoom", function(){
                it("zoom", function(){
                    tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.scale = wd.Vector2.create(2, 3);

                    tra2.zoom(2,2);
                    tra1.zoom(3,1);


                    expect(getValues(tra2.position)).toEqual([0,0]);
                    expect(getValues(tra1.position)).toEqual([0,0]);
                    expect(getValues(tra2.rotation)).toEqual(0);
                    expect(getValues(tra1.rotation)).toEqual(0);

                    expect(getValues(tra2.scale)).toEqual([4,6]);
                    expect(getValues(tra1.scale)).toEqual([12,6]);
                });
                it("rotate and zoom", function(){
                    tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.rotate(30);
                    tra1.rotate(30);

                    tra2.zoom(2,3);
                    tra1.zoom(3,1);


                    expect(getValues(tra2.rotation)).toEqual(30);
                    expect(getValues(tra2.scale)).toEqual([2,3]);

                    /*!
                     here zoom tra2 when tra2 rotate will affect tra1->rotation,scale
                     */
                    expect(getValues(tra1.rotation)).toEqual(51);
                    expect(getValues(tra1.scale)).toEqual([7, 3]);
                });
            });
        });
    });

    it("test >= 2 parent", function(){
        var tra2 = Transform.create();
        tra1.parent = tra2;


        var tra3 = Transform.create();
        tra2.parent = tra3;

        tra3.rotate(10);
        tra2.rotate(30);
        tra1.rotate(30);


        expect(getValues(tra3.rotation)).toEqual(10);
        expect(getValues(tra2.rotation)).toEqual(40);
        expect(getValues(tra1.rotation)).toEqual(70);
    });
});