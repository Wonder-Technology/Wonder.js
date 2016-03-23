describe("ThreeDTransform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector3 = wd.Vector3;
    var Transform = wd.ThreeDTransform;

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

        function judgeCache(stubFunc, getAttr, judgeStubFunc){
            stubFunc();

            var m1 = tra1[getAttr];
            var m2 = tra1[getAttr];

            expect(m1 === m2).toBeTruthy();
            judgeStubFunc();
        }

        //function judgeClearCache(getMethod, getAttr){
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

        it("localToWorldMatrix(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1, "getMatrix");
            }, "localToWorldMatrix", function(){
                expect(tra1.getMatrix).toCalledOnce();
            });
        });
        it("position(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1.localToWorldMatrix, "getTranslation");
            }, "position", function(){
                expect(tra1.localToWorldMatrix.getTranslation).toCalledOnce();
            });
        });
        it("rotation(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1._rotation, "setFromMatrix");
            }, "rotation", function(){
                expect(tra1._rotation.setFromMatrix).toCalledOnce();
            });
        });
        it("scale(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1.localToWorldMatrix, "getScale");
            }, "scale", function(){
                expect(tra1.localToWorldMatrix.getScale).toCalledOnce();
            });
        });
        it("eulerAngles(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1.localToWorldMatrix, "getEulerAngles");
            }, "eulerAngles", function(){
                expect(tra1.localToWorldMatrix.getEulerAngles).toCalledOnce();
            });
        });
        it("localEulerAngles(getter)", function(){
            judgeCache(function(){
                sandbox.stub(tra1._localRotation, "getEulerAngles");
            }, "localEulerAngles", function(){
                expect(tra1._localRotation.getEulerAngles).toCalledOnce();
            });
        });

        //describe("clear cache on EndLoop", function(){
        //    beforeEach(function(){
        //        tra1.init();
        //    });
        //
        //    it("clear localToWorldMatrix cache", function () {
        //        judgeClearCache("getMatrix", "localToWorldMatrix");
        //    });
        //    it("clear position,rotation,scale,eulerAngles,localEulerAngles cache", function () {
        //        var m1 = tra1.position;
        //        var m2 = tra1.rotation;
        //        var m3 = tra1.scale;
        //        var m4 = tra1.eulerAngles;
        //        var m5 = tra1.localEulerAngles;
        //
        //        wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
        //
        //        expect(tra1._positionCache).toBeNull();
        //        expect(tra1._rotationCache).toBeNull();
        //        expect(tra1._scaleCache).toBeNull();
        //        expect(tra1._eulerAnglesCache).toBeNull();
        //        expect(tra1._localEulerAnglesCache).toBeNull();
        //    });
        //});

        // more:clear cache when set isXXX true
        // already tested
    });

    it("the change of parent before setted as parent will affect child", function(){
        var tra2 = Transform.create();
        tra2.translate(1,1,1);
        tra1.parent = tra2;

        expect(getValues(tra2.position)).toEqual([1,1,1]);
        expect(getValues(tra2.localPosition)).toEqual([1,1,1]);
        expect(getValues(tra1.position)).toEqual([1,1,1]);
        expect(getValues(tra1.localPosition)).toEqual([0,0,0]);
    });

    describe("localPosition/localRotation/localScale is the value relative to the parent transform", function(){
        var tra2;

        beforeEach(function(){
            tra2 = Transform.create();
            tra1.parent = tra2;
        });

        it("localScale", function(){
            tra2.scale = Vector3.create(2, 2, 1);
            tra1.scale = Vector3.create(2, 2, 1);


            expect(getValues(tra1.localScale, 1)).toEqual([1,1,1]);
            expect(getValues(tra2.localScale, 1)).toEqual([2,2,1]);
        });
        it("localPosition", function(){
            tra2.scale = Vector3.create(2, 2, 1);

            tra1.translate(300, 100, 0);
            tra2.translate(300, 100, 0);


            expect(getValues(tra1.localPosition, 1)).toEqual([150, 50, 0]);
        });
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

        it("not clone if no parent", function () {
            var pos = {clone:sandbox.stub()};
            tra1.parent = null;

            tra1.position = pos;

            expect(pos.clone).not.toCalled();
        });

        it("set position", function(){
            expect(getValues(tra2.position)).toEqual([2, 2, 2]);
            expect(getValues(tra2.localPosition)).toEqual([2, 2, 2]);
            expect(getValues(tra1.position)).toEqual([3, 4, 5]);
            expect(getValues(tra1.localPosition)).toEqual([1, 2, 3]);
            expect(getValues(tra3.position)).toEqual([2, 2, 2]);
            expect(getValues(tra3.localPosition)).toEqual([0, 0, 0]);
        });
        it("test set GameObject->transform->position", function(){
            var obj = wd.GameObject.create();
            obj.transform.position = Vector3.create(10, 0, 0);

            expect(getValues(obj.transform.position)).toEqual([10, 0, 0]);
        });

        describe("set local position", function(){
            it("test", function () {
                sandbox.stub(tra3, "_setLocalTransformState");
                sandbox.stub(tra2, "_setLocalTransformState");
                tra3.localPosition = Vector3.create(1, 1, 1);
                tra2.localPosition = Vector3.create(3, 3, 3);

                expect(getValues(tra2.position)).toEqual([3, 3, 3]);
                expect(getValues(tra2.localPosition)).toEqual([3, 3, 3]);
                expect(getValues(tra3.position)).toEqual([4, 4, 4]);
                expect(getValues(tra3.localPosition)).toEqual([1, 1, 1]);
                expect(getValues(tra1.position)).toEqual([4, 5, 6]);
                expect(getValues(tra1.localPosition)).toEqual([1, 2, 3]);

                expect(tra3._setLocalTransformState).toCalledOnce();
                expect(tra2._setLocalTransformState).toCalledOnce();
            });
            it("not clone if no parent", function () {
                var pos = {clone:sandbox.stub()};
                tra1.parent = null;

                tra1.localPosition = pos;

                expect(pos.clone).not.toCalled();
            });
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

            expect(getValues(tra2.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra2.localEulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.localEulerAngles)).toEqual([0, 0, 0]);
        });
        it("if child's eulerAngles is zero before setting parent, then it will rotate the same as the parent", function(){
            tra2.eulerAngles = Vector3.create(1,2,3);
            tra1.eulerAngles = Vector3.create(0, 0, 0);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);

            expect(getValues(tra2.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra2.localEulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.localEulerAngles)).toEqual([0, 0, 0]);
        });
        it("when set child's eulerAngles after setting its parent, it's eulerAngles will be the setting num ignoring parent's eulerAngles", function(){
            tra2.eulerAngles = Vector3.create(1,2,3);
            tra1.eulerAngles = Vector3.create(1, 1, 1);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);
            tra1.eulerAngles = Vector3.create(2, 2, 2);

            expect(getValues(tra2.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra2.localEulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.eulerAngles)).toEqual([2, 2, 2]);
            expect(getValues(tra1.localEulerAngles)).toEqual([0, -1, -2]);
        });
        it("local eulerAngles is relative to the parent(relative to world when parent is null)", function(){
            tra2.localEulerAngles = Vector3.create(1,2,3);
            tra1.parent = tra2;

            tra2.eulerAngles = Vector3.create(2, 3, 4);
            tra1.localEulerAngles = Vector3.create(1, 1, 1);

            expect(getValues(tra2.eulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra2.localEulerAngles)).toEqual([2, 3, 4]);
            expect(getValues(tra1.eulerAngles)).toEqual([3, 4, 5]);
            expect(getValues(tra1.localEulerAngles)).toEqual([1, 1, 1]);
        });
    });

    describe("set scale", function(){
        beforeEach(function(){
        });

        describe("set scale", function(){
            it("not clone if no parent", function () {
                var data = {clone:sandbox.stub()};
                tra1.parent = null;

                tra1.scale = data;

                expect(data.clone).not.toCalled();
            });
            it("test scale", function(){
                var tra2 = Transform.create();
                tra2.parent = tra1;

                tra1.position = Vector3.create(100, -50, 0);

                tra2.scale = Vector3.create(2, 3, 1);

                expect(getValues(tra2.scale)).toEqual([2, 3, 1]);
            });
        });

        describe("set local scale", function(){
            it("not clone if no parent", function () {
                var data = {clone:sandbox.stub()};
                tra1.parent = null;

                tra1.localScale = data;

                expect(data.clone).not.toCalled();
            });
            it("test", function () {
                var tra2 = Transform.create();
                sandbox.stub(tra2, "_setLocalTransformState");
                sandbox.stub(tra1, "_setLocalTransformState");


                tra2.localScale = Vector3.create(2, 2, 0.5);
                tra1.parent = tra2;

                tra2.localScale = Vector3.create(2, 1, 1);
                tra1.localScale = Vector3.create(1, 2, 2);

                expect(getValues(tra2.localScale)).toEqual([2, 1, 1]);
                expect(getValues(tra2.scale)).toEqual([2, 1, 1]);
                expect(getValues(tra1.localScale)).toEqual([1, 2, 2]);
                expect(getValues(tra1.scale)).toEqual([2, 2, 2]);

                expect(tra2._setLocalTransformState).toCalledTwice();
                expect(tra1._setLocalTransformState).toCalledOnce();
            });
        });
    });


    describe("test translate", function(){
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

                expect(getValues(tra2.position)).toEqual([1, 1, 1]);
                expect(getValues(tra2.localPosition)).toEqual([1, 1, 1]);
                expect(getValues(tra1.position)).toEqual([1, 4 ,-1]);
                expect(getValues(tra1.localPosition)).toEqual([0, 3, 2]);
            });
            //it("child should follow parent, while parent shouldn't follow parent", function(){
            //    tra2.translate(Vector3.create(1, 1, 1));
            //    tra1.rotate(Vector3.create(0, 180, 0));
            //    tra1.translate(Vector3.create(1, 1, 1));
            //
            //    expect(getValues(tra2.position)).toEqual([1, 1, 1]);
            //    expect(getValues(tra2.localPosition)).toEqual([1, 1, 1]);
            //    expect(getValues(tra1.position)).toEqual([-3, 4, -5]);
            //    expect(getValues(tra1.localPosition)).toEqual([-4, 3, -6]);
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
            //        expect(getValues(tra2.position)).toEqual([-1, 1, -1]);
            //        expect(getValues(tra2.localPosition)).toEqual([-1, 1, -1]);
            //        expect(getValues(tra1.position)).toEqual([-4, 5, -6]);
            //        expect(getValues(tra1.localPosition)).toEqual([-3, 4, -5]);
            //    });
            //    it("relative to world", function(){
            //        tra2.rotate(Vector3.create(0, 180, 0));
            //        tra2.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
            //
            //        expect(getValues(tra2.position)).toEqual([1, 1, 1]);
            //        expect(getValues(tra2.localPosition)).toEqual([1, 1, 1]);
            //        expect(getValues(tra1.position)).toEqual([-1 + 1 +1 +1, 2 + 1 + 1 + 1, -3 + 1 +1 +1]);
            //        expect(getValues(tra1.localPosition)).toEqual([1, 4, -1]);
            //    });
            //})
        });

        //describe("translate in hierarchy", function(){
        //
        //    it("relative to self", function(){
        //        tra1.translate(Vector3.create(1, 1, 1));
        //        tra1.translate(Vector3.create(1, 1, 1), Space.SELF);
        //
        //        expect(getValues(tra1.position)).toEqual([-1, 4, 1]);
        //        expect(getValues(tra1.localPosition)).toEqual([-2, 2, -2]);
        //    });
        //    it("relative to world", function(){
        //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
        //        tra1.translate(Vector3.create(1, 1, 1), Space.WORLD);
        //
        //        expect(getValues(tra1.position)).toEqual([3, 4, 5]);
        //        expect(getValues(tra1.localPosition)).toEqual([2, 2, 2]);
        //    });
        //});

        describe("translateLocal", function() {
            it("translate based on local space", function () {
                tra2.rotate(Vector3.create(0, 180, 0));
                tra2.translateLocal(Vector3.create(1, 1, 1));
                tra1.translateLocal(Vector3.create(1, 1, 1));

                expect(getValues(tra2.position)).toEqual([-1, 1, -1]);
                expect(getValues(tra2.localPosition)).toEqual([-1, 1, -1]);
                expect(getValues(tra1.position)).toEqual([-3, 4, -5]);
                expect(getValues(tra1.localPosition)).toEqual([2, 3, 4]);
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
    //        expect(getValues(tra2.position)).toEqual([-1, 1, -1]);
    //        expect(getValues(tra2.localPosition)).toEqual([-1, 1, -1]);
    //        expect(getValues(tra1.position)).toEqual([-1, 4, 1]);
    //        expect(getValues(tra1.localPosition)).toEqual([0, 3, 2]);
    //        expect(getValues(tra3.position)).toEqual([-3, 4, -5]);
    //        expect(getValues(tra3.localPosition)).toEqual([-2, 3, -4]);
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
    //            expect(getValues(tra2.position)).toEqual([-2, 2, -2]);
    //            expect(getValues(tra2.localPosition)).toEqual([-2, 2, -2]);
    //            expect(getValues(tra4.position)).toEqual([-2, 2, -2]);
    //            expect(getValues(tra4.localPosition)).toEqual([0, 0, 0]);
    //            expect(getValues(tra1.position)).toEqual([0, 7, -2]);
    //            expect(getValues(tra1.localPosition)).toEqual([2, 5, 0]);
    //            expect(getValues(tra3.position)).toEqual([-6, 7, -8]);
    //            expect(getValues(tra3.localPosition)).toEqual([-4, 5, -6]);
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
    //                expect(getValues(tra3.position)).toEqual([-7, 8, -9]);
    //                expect(getValues(tra3.localPosition)).toEqual([-7, 8, -9]);
    //                expect(getValues(tra4.position)).toEqual([-3, 3, -3]);
    //                expect(getValues(tra4.localPosition)).toEqual([-1, 1, -1]);
    //            });
    //        });
    //    });
    //});

    describe("test rotate", function(){
        var tra2 = null;

        it("eulerAngle's range is -180 to 180", function(){
            var tra3 = Transform.create();
            tra2 = Transform.create();
            tra2.eulerAngles = Vector3.create(90, 0, 0);

            tra2.rotate(Vector3.create(91, 0, 0));
            tra3.rotate(Vector3.create(180, 0, 0));
            tra1.rotateLocal(Vector3.create(-181, 0, 0));

            expect(getValues(tra2.localEulerAngles)).toEqual([-179, 0, 0]);
            expect(getValues(tra2.eulerAngles)).toEqual([-179, 0, 0]);
            expect(getValues(tra3.localEulerAngles)).toEqual([180, 0, 0]);
            expect(getValues(tra3.eulerAngles)).toEqual([180, 0, 0]);
            expect(getValues(tra1.localEulerAngles)).toEqual([179, 0, 0]);
            expect(getValues(tra1.eulerAngles)).toEqual([179, 0, 0]);
        });

        describe("rotate", function(){
            it("test eulerAngles when rotate on world space", function(){
                tra2 = Transform.create();
                tra2.eulerAngles = Vector3.create(90, 0, 0);
                tra1.eulerAngles = Vector3.create(10, 0, 0);
                tra1.parent = tra2;

                tra2.rotate(Vector3.create(30, 0, 0));
                tra1.rotate(Vector3.create(20, 0, 0));

                expect(getValues(tra2.localEulerAngles)).toEqual([120, 0, 0]);
                expect(getValues(tra2.eulerAngles)).toEqual([120, 0, 0]);
                expect(getValues(tra1.eulerAngles)).toEqual([150, 0, 0]);
                expect(getValues(tra1.localEulerAngles)).toEqual([30, 0, 0]);
            });
            it("test position when rotate on world space(one's rotation will not affect its position, only affect its children's position)", function(){
                tra2 = Transform.create();
                tra2.position = Vector3.create(2, 2, 2);
                tra1.position = Vector3.create(1, 1, 1);
                tra1.parent = tra2;
                tra2.rotate(Vector3.create(0, 180, 0));
                tra1.rotate(Vector3.create(180, 0, 180));

                expect(getValues(tra2.position)).toEqual([2, 2, 2]);
                expect(getValues(tra1.position)).toEqual([1, 3, 1]);
            });
        });

        describe("rotateLocal", function(){
            it("test eulerAngles when rotate on local space", function(){
                tra2 = Transform.create();
                tra1.parent = tra2;

                tra2.rotateLocal(Vector3.create(90, 0, 0));
                tra1.rotateLocal(Vector3.create(0, 90, 0));

                expect(getValues(tra2.localEulerAngles)).toEqual([90, 0, 0]);
                expect(getValues(tra2.eulerAngles)).toEqual([90, 0, 0]);
                expect(getValues(tra1.eulerAngles)).toEqual([90, 0, 90]);
                expect(getValues(tra1.localEulerAngles)).toEqual([0, 90, 0]);
            });
            it("test position when rotate on local space(child's rotation will not affect it's position)", function(){
                tra2 = Transform.create();
                tra2.position = Vector3.create(2, 2, 2);
                tra1.position = Vector3.create(1, 1, 1);
                tra1.parent = tra2;
                tra2.rotateLocal(Vector3.create(90, 0, 0));
                tra1.rotateLocal(Vector3.create(0, 90, 0));

                expect(getValues(tra2.position)).toEqual([2, 2, 2]);
                expect(getValues(tra1.position)).toEqual([3, 1, 3]);
            });
        });
        it("rotateAround", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(2, 2, 2);
            tra1.position = Vector3.create(1, 1, 1);
            tra1.parent = tra2;

            tra2.rotateAround(180, Vector3.create(2, 3, 2), Vector3.create(0, 0, 1));

            expect(getValues(tra2.localEulerAngles)).toEqual([0, 0, 180]);
            expect(getValues(tra2.eulerAngles)).toEqual([0, 0, 180]);
            expect(getValues(tra2.position)).toEqual([2, 4, 2]);
            expect(getValues(tra1.eulerAngles)).toEqual([0, 0, 180]);
            expect(getValues(tra1.localEulerAngles)).toEqual([0, 0, 0]);
            expect(getValues(tra1.position)).toEqual([1, 3, 3]);
        });
    });

    describe("lookAt", function(){
        it("default up direction is positive y", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(1, 2, 0);
            tra1.position = Vector3.create(1, 1, 1);

            tra1.lookAt(tra2.position);

            expect(getValues(tra1.eulerAngles)).toEqual([45, 0, 0]);
            expect(getValues(tra1.localEulerAngles)).toEqual([45, 0, 0]);
        });
        it("if viewPoint to target is default up axis, should specify the new up direction", function(){
            var tra2 = Transform.create();
            tra2.position = Vector3.create(0, 2, 0);
            tra1.position = Vector3.create(0, 1, 0);

            tra1.lookAt(tra2.position);

            expect(getValues(tra1.eulerAngles)).toEqual([NaN, NaN, 0]);
            expect(getValues(tra1.localEulerAngles)).toEqual([NaN, NaN, NaN]);



            tra2.position = Vector3.create(0, 2, 0);
            tra1.position = Vector3.create(0, 1, 0);

            tra1.lookAt(tra2.position, Vector3.forward);

            expect(getValues(tra1.eulerAngles)).toEqual([90, 0, 0]);
            expect(getValues(tra1.localEulerAngles)).toEqual([90, 0, 0]);
        });
    });

    describe("test state", function() {
        describe("isTranslate", function () {
            describe("if set it to be true", function () {
                it("set dirtyLocal to be true", function () {
                    tra1.translate(0, 1, 0);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.localToWorldMatrix;

                    tra1.translate(0, 1, 0);

                    expect(tra1._localToWorldMatrixCache).toBeNull();
                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.translate(0, 1, 0);

                    expect(tra2.isTranslate).toBeTruthy();
                    expect(tra1.isTranslate).toBeTruthy();
                });
            });
        });

        describe("isRotate", function () {
            describe("if set it to be true", function () {
                it("if set it to be true, set dirtyLocal to be true", function () {
                    tra1.rotate(0, 1, 0);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.localToWorldMatrix;

                    tra1.rotate(0, 1, 0);

                    expect(tra1._localToWorldMatrixCache).toBeNull();
                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.rotate(0, 1, 0);

                    expect(tra2.isRotate).toBeTruthy();
                    expect(tra1.isRotate).toBeTruthy();
                });
            });
        });

        describe("isScale", function () {
            describe("if set it to be true", function () {
                it("if set it to be true, set dirtyLocal to be true", function () {
                    tra1.scale = wd.Vector3.create(1, 1, 2);

                    expect(tra1.dirtyLocal).toBeTruthy();
                });
                it("clear cache", function () {
                    var m = tra1.localToWorldMatrix;

                    tra1.scale = wd.Vector3.create(1, 1, 2);

                    expect(tra1._localToWorldMatrixCache).toBeNull();
                });
                it("change children state", function () {
                    var tra2 = Transform.create();
                    tra1.parent = tra2;

                    tra2.scale = wd.Vector3.create(1, 1, 2);

                    expect(tra2.isScale).toBeTruthy();
                    expect(tra1.isScale).toBeTruthy();
                });
            });
        });
    });

    describe("dispose", function(){
        it("unbind ENDLOOP event", function(){
            tra1.init();

            tra1.isTranslate = true;

            tra1.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

            expect(tra1.isTranslate).toBeTruthy();
        });
    });
    
    describe("clone", function(){
        beforeEach(function(){
            
        });
        
        describe("clone position,rotate,scale, localPosition,localRotation, localScale", function(){
            var result;

            function judge(){
                expect(result !== tra1).toBeTruthy();
                expect(result.position).toEqual(tra1.position);
                expect(result.scale).toEqual(tra1.scale);
                expect(testTool.getValues(result.rotation)).toEqual(testTool.getValues(tra1.rotation));

                expect(result.localPosition).toEqual(tra1.localPosition);
                expect(result.localScale).toEqual(tra1.localScale);
                expect(testTool.getValues(result.localRotation)).toEqual(testTool.getValues(tra1.localRotation));
            }

            it("test1", function () {
                tra1.position = wd.Vector3.create(1,2,3);
                tra1.scale = wd.Vector3.create(2,2,3);
                tra1.rotate(1,2,3);

                result = tra1.clone();

                judge();
            });
            it("test2", function () {
                tra1.position = wd.Vector3.create(1,2,3);
                tra1.rotation = wd.Quaternion.create(1,20,30,1);
                tra1.scale = wd.Vector3.create(2,2,3);

                result = tra1.clone();

                judge();
            });
            it("test3", function () {
                tra1.position = wd.Vector3.create(1,2,3);
                tra1.eulerAngles = wd.Vector3.create(10,20,30);
                tra1.scale = wd.Vector3.create(2,2,3);

                result = tra1.clone();

                judge();
            });
            it("test3", function () {
                tra1.position = wd.Vector3.create(1,2,3);
                tra1.localRotation = wd.Quaternion.create(1,20,30,1);
                tra1.localScale = wd.Vector3.create(2,2,3);

                result = tra1.clone();

                judge();
            });
        });
        it("set parent", function () {
            var parent = Transform.create();
            tra1.parent = parent;

            var result = tra1.clone();

            expect(result.parent === tra1.parent).toBeTruthy();
        });
    });
});
