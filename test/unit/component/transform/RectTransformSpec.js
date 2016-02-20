describe("RectTransform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector2 = wd.Vector2;
    var Transform = wd.RectTransform;

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

    describe("test cache", function(){
        var matrix;

        //function clearCacheJudge(getMethod, getAttr){
        //    sandbox.stub(tra1, getMethod).returns(matrix);
        //    var m1 = tra1[getAttr];
        //
        //    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
        //
        //    var m2 = tra1[getAttr];
        //
        //    expect(m1 === m2).toBeTruthy();
        //    expect(tra1[getMethod]).toCalledTwice();
        //}

        beforeEach(function(){
            matrix = wd.Matrix4.create();
        });


        it("rotationMatrix(getter)", function(){
            sandbox.stub(tra1, "getMatrix");

            var m1 = tra1.rotationMatrix;
            var m2 = tra1.rotationMatrix;

            expect(m1 === m2).toBeTruthy();
            expect(tra1.getMatrix).toCalledOnce();
        });
        it("localPositionAndScaleMatrix(getter)", function(){
            sandbox.stub(tra1, "getMatrix");

            var m1 = tra1.localPositionAndScaleMatrix;
            var m2 = tra1.localPositionAndScaleMatrix;

            expect(m1 === m2).toBeTruthy();
            expect(tra1.getMatrix).toCalledOnce();
        });

        //it("clear rotationMatrix cache on EndLoop", function () {
        //    tra1.init();
        //    clearCacheJudge("getMatrix", "rotationMatrix");
        //});
        //it("clear localToWorldMatrix cache on EndLoop", function () {
        //    tra1.init();
        //    clearCacheJudge("getMatrix", "localPositionAndScaleMatrix");
        //});
        // more:clear cache when set isXXX true
        // already tested
    });

    describe("localPosition/localScale is the value relative to the parent transform", function(){
        var tra2;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;
        });

        it("localScale", function(){
            tra2.scale = Vector2.create(2, 2);
            tra1.scale = Vector2.create(2, 2);


            expect(getValues(tra1.localScale, 1)).toEqual([1,1]);
            expect(getValues(tra2.localScale, 1)).toEqual([2,2]);
        });
        it("localPosition", function(){
            tra2.scale = Vector2.create(2, 2);

            tra1.translate(300, 100);
            tra2.translate(300, 100);


            expect(getValues(tra1.localPosition, 1)).toEqual([150, 50]);
        });
    });

    //todo test set localPosition/localScale

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

            expect(getValues(tra1.localPositionAndScaleMatrix.getTranslation())).toEqual([3, 4]);

            expect(getValues(tra3.position)).toEqual([2, 2]);
        });
    });

    describe("set rotation", function(){
        var tra2;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;
        });

        it("set rotation around pivot", function(){
            tra2.position = Vector2.create(2, 1);

            tra2.rotate(10);

            tra2.rotation = 20;

            expect(getValues(tra2.rotation)).toEqual(20);
            expect(getValues(tra2.rotationMatrix.getTranslation(), 1)).toEqual([0.5, -0.6]);
        });
    });

    describe("set scale", function() {
        var tra2 = null;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;
        });

        it("set scale", function(){
            tra1.position = Vector2.create(100, -50);

            tra1.scale = Vector2.create(2, 3);

            expect(getValues(tra1.scale)).toEqual([2, 3]);
            expect(getValues(tra1.position)).toEqual([100, -50]);
            expect(getValues(tra2.scale)).toEqual([1, 1]);
        });

        describe("scale shouldn't affect position", function(){
            it("test parent and child scale", function(){
                tra2.scale = Vector2.create(10, 2);
                tra1.scale = Vector2.create(2, 2);
                tra1.translate(300, 100);
                tra2.translate(300, 100);

                expect(getValues(tra1.position)).toEqual([600, 200]);
                expect(getValues(tra2.position)).toEqual([300, 100]);
            });
        });
    });

    describe("test translate,rotate", function(){
        beforeEach(function(){
        });


        describe("test translate", function(){
            var tra2 = null;

            beforeEach(function(){
                tra2 = Transform.create();

                tra1.parent = tra2;
            });

            it("based on canvas space", function(){
                tra2.position = Vector2.create(0, 0);
                tra1.position = Vector2.create(1, 2);


                tra2.translate(Vector2.create(1, 1));



                expect(getValues(tra1.position)).toEqual([2, 3]);




                tra1.translate(Vector2.create(1, 1));



                expect(getValues(tra2.position)).toEqual([1, 1]);
                expect(getValues(tra1.position)).toEqual([3, 4]);
            });
        });

        describe("test rotate", function() {
            var tra2 = null;

            beforeEach(function () {
                tra2 = Transform.create();
                tra1.parent = tra2;
            });

            it('if rotate pivot is not the center point, the actual position will change, but the "position" attr will not change now!', function(){
                tra1.position = Vector2.create(2, 0);

                tra1.rotateAround(90, 3, 0);

                expect(getValues(tra1.position)).toEqual([2, 0]);
                expect(getValues(tra1.position)).not.toEqual([3, -1]);
            });

            describe("rotate will rotate around the pivot point", function () {
                beforeEach(function () {
                });

                it("the default pivot is center point", function () {
                    tra2.rotate(45);

                    expect(getValues(tra2.rotationMatrix.getTranslation())).toEqual([0, 0]);
                    expect(getValues(tra1.rotationMatrix.getTranslation())).toEqual([0, 0]);

                    expect(getValues(tra2.rotation)).toEqual(45);
                    expect(getValues(tra1.rotation)).toEqual(45);
                });
                describe("test change pivot(it is in cartesian coordinates whose center is position point)", function () {
                    it("test change parent pivot", function () {
                        tra2.pivot = Vector2.create(-10, 10);

                        tra2.rotate(45);

                        expect(getValues(tra2.rotationMatrix.getTranslation())).toEqual([-10, 4]);
                        expect(getValues(tra1.rotationMatrix.getTranslation())).toEqual([-10, 4]);

                        expect(getValues(tra2.rotation)).toEqual(45);
                        expect(getValues(tra1.rotation)).toEqual(45);
                    });
                    it("test change child pivot", function () {
                        tra1.pivot = Vector2.create(-10, 10);
                        tra2.rotate(45);

                        expect(getValues(tra2.rotationMatrix.getTranslation())).toEqual([0, 0]);
                        expect(getValues(tra1.rotationMatrix.getTranslation())).toEqual([0, 0]);


                        tra2.rotation = 0;
                        tra1.rotate(45);

                        expect(getValues(tra2.rotationMatrix.getTranslation())).toEqual([0, 0]);
                        expect(getValues(tra1.rotationMatrix.getTranslation())).toEqual([-10, 4]);
                    });
                });
            });

            it("rotate will only affect rotationMatrix, not affect position,scale", function () {
                tra2 = Transform.create();
                tra2.position = Vector2.create(2, 2);
                tra1.position = Vector2.create(1, 1);
                tra1.parent = tra2;
                tra2.rotate(45);
                tra1.rotate(10);

                expect(getValues(tra2.position)).toEqual([2, 2]);
                expect(getValues(tra2.rotation)).toEqual(45);
                expect(getValues(tra1.position)).toEqual([3, 3]);
                expect(getValues(tra1.rotation)).toEqual(55);
            });
            it("if rotation > 90, rotation will be rotation - 360", function () {
                tra2.rotation = 90;
                tra1.rotation = 10;

                tra2.rotate(30);
                tra1.rotate(20);


                expect(getValues(tra2.rotation)).toEqual(-240);
                expect(getValues(tra1.rotation)).toEqual(-210);
            });

            describe("rotateAround", function () {
                it("rotateAround will only affect rotationMatrix, not affect position,scale", function () {
                    var tra2 = Transform.create();
                    tra2.position = Vector2.create(2, 2);
                    tra1.position = Vector2.create(1, 1);
                    tra1.parent = tra2;

                    tra2.rotateAround(45, Vector2.create(2, 3));

                    expect(getValues(tra2.rotation)).toEqual(45);
                    expect(getValues(tra2.rotationMatrix.getTranslation())).toEqual([3, -1])
                    expect(getValues(tra2.position)).toEqual([2, 2]);

                    expect(getValues(tra1.rotation)).toEqual(45);
                    expect(getValues(tra1.position)).toEqual([3, 3]);
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

    describe("test width/height", function(){
        var tra2;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;

            tra2.width = 1000;
            tra2.height = 500;

            tra1.width = 500;
            tra1.height = 100;
        });

        it("scale will affect the width/height", function(){
            tra2.scale = Vector2.create(2, 3);

            expect(tra2.width).toEqual(2000);
            expect(tra2.height).toEqual(1500);

            expect(tra1.width).toEqual(1000);
            expect(tra1.height).toEqual(300);
        });
    });

    describe("test anchor", function(){
        var tra2;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;

            tra2.width = 1000;
            tra2.height = 500;

            tra1.width = 500;
            tra1.height = 100;
        });

        describe("anchorX", function(){
            describe("contain minX, maxX anchor data which is the percent of the parent's width", function(){
                it("test position locate on parent's center point", function(){
                    tra1.anchorX = Vector2.create(0.1, 0.9);

                    expect(getValues(tra1.position)).toEqual([0, 0])
                    expect(getValues(tra1.width)).toEqual(800);
                    expect(tra1.height).toEqual(100);


                    tra2.scale = Vector2.create(2, 2);

                    expect(getValues(tra1.position)).toEqual([0, 0])
                    expect(tra2.width).toEqual(2000);
                    expect(tra2.height).toEqual(1000);

                    expect(getValues(tra1.width)).toEqual(1600);
                    expect(tra1.height).toEqual(200);
                });
                it("test position don't locate on parent's center point", function(){
                    tra1.anchorX = Vector2.create(0.2, 0.9);

                    expect(getValues(tra1.position)).toEqual([50, 0])
                    expect(getValues(tra1.width)).toEqual(700);
                    expect(tra1.height).toEqual(100);


                    tra1.scale = Vector2.create(2, 2);

                    expect(tra2.width).toEqual(1000);
                    expect(tra2.height).toEqual(500);

                    expect(getValues(tra1.position)).toEqual([50, 0])
                    expect(getValues(tra1.width)).toEqual(1400);
                    expect(tra1.height).toEqual(200);
                });
                it("test parent anchor", function(){
                    var tra3 = Transform.create();
                    tra2.parent = tra3;

                    tra3.width = 2000;
                    tra3.height = 1000;

                    tra2.anchorX = Vector2.create(0.2, 0.9);


                    expect(getValues(tra2.position)).toEqual([100, 0]);
                    expect(getValues(tra2.width)).toEqual(1400);
                    expect(tra2.height).toEqual(500);

                    expect(getValues(tra1.position)).toEqual([100, 0]);
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(tra1.height).toEqual(100);
                });
                it("if parent === null, its parent->width is view width;its parent->height is view height;its parent->position is (view width / 2, view height / 2);its parent->scale is (1,1) ", function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        x: 0,
                        y: 0,
                        width: 1000,
                        height: 500
                    });

                    tra1.parent = null;
                    tra1.anchorX = Vector2.create(0.2, 0.9);

                    expect(getValues(tra1.position)).toEqual([550, 0]);
                    expect(getValues(tra1.width)).toEqual(700);
                    expect(getValues(tra1.height)).toEqual(100);
                });
            });

            describe("if minX === maxX", function(){
                beforeEach(function(){
                });

                it("its width should be specified by user", function(){
                    tra1.anchorX = Vector2.create(0.1, 0.1);

                    expect(tra1.width).toEqual(500);
                    expect(tra1.height).toEqual(100);
                });
                it("set position by anchor", function(){
                    tra1.anchorX = Vector2.create(0.1, 0.1);

                    expect(getValues(tra1.position)).toEqual([-400, 0]);
                });
                it("test parent === null", function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        x: 0,
                        y: 0,
                        width: 1000,
                        height: 500
                    });

                    tra1.parent = null;
                    tra1.anchorX = Vector2.create(0.1, 0.1);

                    expect(getValues(tra1.position)).toEqual([100, 0]);
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(getValues(tra1.height)).toEqual(100);
                });
            });
        });

        describe("anchorY", function(){
            describe("contain minY, maxY anchor data which is the percent of the parent's width", function(){
                it("test position locate on parent's center point", function(){
                    tra1.anchorY = Vector2.create(0.1, 0.9);

                    expect(getValues(tra1.position)).toEqual([0, 0]);
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(getValues(tra1.height)).toEqual(400);


                    tra2.scale = Vector2.create(2, 2);

                    expect(getValues(tra1.position)).toEqual([0, 0]);
                    expect(tra2.width).toEqual(2000);
                    expect(tra2.height).toEqual(1000);

                    expect(getValues(tra1.width)).toEqual(1000);
                    expect(getValues(tra1.height)).toEqual(800);
                });
                it("test position don't locate on parent's center point", function(){
                    tra1.anchorY = Vector2.create(0.2, 0.9);

                    expect(getValues(tra1.position)).toEqual([0, 25])
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(getValues(tra1.height)).toEqual(350);


                    tra1.scale = Vector2.create(2, 2);

                    expect(tra2.width).toEqual(1000);
                    expect(tra2.height).toEqual(500);

                    expect(getValues(tra1.position)).toEqual([0, 25])
                    expect(getValues(tra1.width)).toEqual(1000);
                    expect(getValues(tra1.height)).toEqual(700);
                });
                it("test parent anchor", function(){
                    var tra3 = Transform.create();
                    tra2.parent = tra3;

                    tra3.width = 2000;
                    tra3.height = 1000;

                    tra2.anchorY = Vector2.create(0.2, 0.9);


                    expect(getValues(tra2.position)).toEqual([0, 50]);
                    expect(getValues(tra2.width)).toEqual(1000);
                    expect(getValues(tra2.height)).toEqual(700);

                    expect(getValues(tra1.position)).toEqual([0, 50]);
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(tra1.height).toEqual(100);

                });
                it("test parent === null", function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        x: 0,
                        y: 0,
                        width: 1000,
                        height: 500
                    });

                    tra1.parent = null;
                    tra1.anchorY = Vector2.create(0.2, 0.9);

                    expect(getValues(tra1.position)).toEqual([0, 275])
                    expect(getValues(tra1.width)).toEqual(500);
                    expect(getValues(tra1.height)).toEqual(350);
                });
            });

            describe("if minY === maxY", function(){
                beforeEach(function(){
                });

                it("its height should be specified by user", function(){
                    tra1.anchorY = Vector2.create(0.1, 0.1);

                    expect(tra1.width).toEqual(500);
                    expect(tra1.height).toEqual(100);
                });
                it("set position by anchor", function(){
                    tra1.anchorY = Vector2.create(0.1, 0.1);

                    expect(getValues(tra1.position)).toEqual([0, -200]);
                });
                it("test parent === null", function(){
                    sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                        x: 0,
                        y: 0,
                        width: 1000,
                        height: 500
                    });

                    tra1.parent = null;
                    tra1.anchorY = Vector2.create(0.1, 0.1);

                    expect(getValues(tra1.position)).toEqual([0, 50]);
                    expect(tra1.width).toEqual(500);
                    expect(tra1.height).toEqual(100);
                });
            });
        });
    });

    describe("resetPosition", function(){
        it("reset position", function(){
            tra1.position = Vector2.create(2, 1);

            tra1.resetPosition();

            expect(getValues(tra1.position)).toEqual([0, 0]);
        });
    });

    describe("resetScale", function(){
        it("reset scale", function(){
            tra1.scale = Vector2.create(2, 1);

            tra1.resetScale();

            expect(getValues(tra1.scale)).toEqual([1, 1]);
        });
    });

    describe("resetRotation", function(){
        it("reset rotationMatrix", function(){
            tra1.rotation = 20;
            tra1.rotateAround(20, 2, 1);

            tra1.resetRotation();

            expect(getValues(tra1.rotation)).toEqual(0);
            expect(getValues(tra1.rotationMatrix.getTranslation())).toEqual([0, 0]);
        });
    });

    describe("test state", function(){
        describe("isTranslate", function () {
            describe("if set it to be true", function () {
                it("set dirtyLocal to be true", function () {
                    tra1.translate(0, 1);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.rotationMatrix;
                    var m2 = tra1.localPositionAndScaleMatrix;

                    tra1.translate(0, 1);

                    expect(tra1._rotationMatrixCache).toBeNull();
                    expect(tra1._localPositionAndScaleMatrixCache).toBeNull();
                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.translate(0, 1);

                    expect(tra2.isTranslate).toBeTruthy();
                    expect(tra1.isTranslate).toBeTruthy();
                });
            });
        });

        describe("isRotate", function () {
            describe("if set it to be true", function () {
                it("if set it to be true, set dirtyLocal to be true", function () {
                    tra1.rotate(45);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.rotationMatrix;
                    var m2 = tra1.localPositionAndScaleMatrix;

                    tra1.rotate(45);

                    expect(tra1._rotationMatrixCache).toBeNull();
                    expect(tra1._localPositionAndScaleMatrixCache).toBeNull();

                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.rotate(45);

                    expect(tra2.isRotate).toBeTruthy();
                    expect(tra1.isRotate).toBeTruthy();
                });
            });
        });

        describe("isScale", function(){
            it("if set it to be true, set dirtyLocal to be true", function(){
                tra1.scale = wd.Vector2.create(1,1);

                expect(tra1.dirtyLocal).toBeTruthy();
            });
            it("change children state", function(){
                var tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.scale = wd.Vector2.create(1,1);

                expect(tra2.isScale).toBeTruthy();
                expect(tra1.isScale).toBeTruthy();
            });
        });

        describe("isScale", function () {
            describe("if set it to be true", function () {
                it("if set it to be true, set dirtyLocal to be true", function () {
                    tra1.scale = wd.Vector2.create(1,1);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.rotationMatrix;
                    var m2 = tra1.localPositionAndScaleMatrix;

                    tra1.scale = wd.Vector2.create(1,1);

                    expect(tra1._rotationMatrixCache).toBeNull();
                    expect(tra1._localPositionAndScaleMatrixCache).toBeNull();

                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.scale = wd.Vector2.create(1,1);

                    expect(tra2.isScale).toBeTruthy();
                    expect(tra1.isScale).toBeTruthy();
                });
            });
        });
    });
});