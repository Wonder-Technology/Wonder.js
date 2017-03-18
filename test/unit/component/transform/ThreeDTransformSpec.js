describe("ThreeDTransform", function(){
    var sandbox = null;
    var tra1 = null;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;
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

    describe("get localToWorldMatrix", function(){
        beforeEach(function(){

        });

        it("default value should be identiy matrix", function(){
            expect(tra1.localToWorldMatrix.values).toEqual(Matrix4.create().setIdentity().values);
        });
    });

    describe("get position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){

        });
    });

    // describe("set localToWorldMatrix", function(){
    //     var Matrix4 = wd.Matrix4;
    //     var tra2;
    //     var mat;
    //
    //     beforeEach(function(){
    //         tra2 = Transform.create();
    //
    //         tra1.addChild(tra2);
    //
    //         mat = Matrix4.create().translate(1,2,3);
    //     });
    //
    //     it("if set localToWorldMatrix, get localToWorldMatrix should return the setted one", function(){
    //         tra1.localToWorldMatrix = mat;
    //
    //         expect(tra1.localToWorldMatrix).toEqual(mat);
    //     });
    //     it("clear its and its children' cache", function () {
    //         sandbox.stub(tra1, "clearCache");
    //         sandbox.stub(tra2, "clearCache");
    //
    //         tra1.localToWorldMatrix = mat;
    //
    //         expect(tra1.clearCache).toCalledOnce();
    //         expect(tra2.clearCache).toCalledOnce();
    //     });
    //     it("set its and its children's isTranslate,isScale,isRotate = true", function () {
    //         tra1.localToWorldMatrix = mat;
    //
    //         expect(tra1.isTranslate).toBeTruthy();
    //         expect(tra2.isTranslate).toBeTruthy();
    //     });
    //     it("set its and its children's dirtyLocal = true", function () {
    //         tra1.localToWorldMatrix = mat;
    //
    //         expect(tra1.dirtyLocal).toBeTruthy();
    //         expect(tra2.dirtyLocal).toBeTruthy();
    //     });
    //     it("trigger EEngineEvent.TRANSFORM_TRANSLATE,TRANSFORM_ROTATE,TRANSFORM_SCALE event", function () {
    //         var entityObject1 = wd.GameObject.create();
    //         tra1.entityObject = entityObject1;
    //
    //         var entityObject2 = wd.GameObject.create();
    //         tra2.entityObject = entityObject2;
    //
    //         var sum1 = 0,
    //             sum2 = 0;
    //
    //         wdFrp.fromArray([
    //             wd.EventManager.fromEvent(entityObject1, wd.EEngineEvent.TRANSFORM_TRANSLATE),
    //             wd.EventManager.fromEvent(entityObject1, wd.EEngineEvent.TRANSFORM_ROTATE),
    //             wd.EventManager.fromEvent(entityObject1, wd.EEngineEvent.TRANSFORM_SCALE)
    //         ]).subscribe(function(){
    //                 sum1++;
    //             });
    //
    //
    //         wdFrp.fromArray([
    //             wd.EventManager.fromEvent(entityObject2, wd.EEngineEvent.TRANSFORM_TRANSLATE),
    //             wd.EventManager.fromEvent(entityObject2, wd.EEngineEvent.TRANSFORM_ROTATE),
    //             wd.EventManager.fromEvent(entityObject2, wd.EEngineEvent.TRANSFORM_SCALE)
    //         ]).subscribe(function(){
    //             sum2++;
    //         });
    //
    //
    //
    //
    //         tra1.localToWorldMatrix = mat;
    //
    //
    //         expect(sum1).toEqual(3);
    //         expect(sum2).toEqual(3);
    //     });
    // });
    //
    // it("the change of parent before setted as parent will affect child", function(){
    //     var tra2 = Transform.create();
    //     tra2.translate(1,1,1);
    //     tra1.parent = tra2;
    //
    //     expect(getValues(tra2.position)).toEqual([1,1,1]);
    //     expect(getValues(tra2.localPosition)).toEqual([1,1,1]);
    //     expect(getValues(tra1.position)).toEqual([1,1,1]);
    //     expect(getValues(tra1.localPosition)).toEqual([0,0,0]);
    // });
    //
    // describe("localPosition/localRotation/localScale is the value relative to the parent transform", function(){
    //     var tra2;
    //
    //     beforeEach(function(){
    //         tra2 = Transform.create();
    //         tra1.parent = tra2;
    //     });
    //
    //     it("localScale", function(){
    //         tra2.scale = Vector3.create(2, 2, 1);
    //         tra1.scale = Vector3.create(2, 2, 1);
    //
    //
    //         expect(getValues(tra1.localScale, 1)).toEqual([1,1,1]);
    //         expect(getValues(tra2.localScale, 1)).toEqual([2,2,1]);
    //     });
    //     it("localPosition", function(){
    //         tra2.scale = Vector3.create(2, 2, 1);
    //
    //         tra1.translate(300, 100, 0);
    //         tra2.translate(300, 100, 0);
    //
    //
    //         expect(getValues(tra1.localPosition, 1)).toEqual([150, 50, 0]);
    //     });
    // });
    //
    //
    // describe("set position", function(){
    //     var tra2 = null,
    //         tra3 = null;
    //
    //     beforeEach(function(){
    //         tra2 = Transform.create();
    //         tra3 = Transform.create();
    //
    //         tra2.position = Vector3.create(0, 0, 0);
    //         tra3.position = Vector3.create(0, 0, 0);
    //         tra1.position = Vector3.create(1, 2, 3);
    //         tra1.parent = tra2;
    //         tra3.parent = tra2;
    //
    //         tra2.position = Vector3.create(2, 2, 2);
    //     });
    //
    //     it("not clone if no parent", function () {
    //         var pos = {clone:sandbox.stub()};
    //         tra1.parent = null;
    //
    //         tra1.position = pos;
    //
    //         expect(pos.clone).not.toCalled();
    //     });
    //
    //     it("set position", function(){
    //         expect(getValues(tra2.position)).toEqual([2, 2, 2]);
    //         expect(getValues(tra2.localPosition)).toEqual([2, 2, 2]);
    //         expect(getValues(tra1.position)).toEqual([3, 4, 5]);
    //         expect(getValues(tra1.localPosition)).toEqual([1, 2, 3]);
    //         expect(getValues(tra3.position)).toEqual([2, 2, 2]);
    //         expect(getValues(tra3.localPosition)).toEqual([0, 0, 0]);
    //     });
    //     it("test set GameObject->transform->position", function(){
    //         var obj = wd.GameObject.create();
    //         obj.transform.position = Vector3.create(10, 0, 0);
    //
    //         expect(getValues(obj.transform.position)).toEqual([10, 0, 0]);
    //     });
    //
    //     describe("set local position", function(){
    //         it("test", function () {
    //             sandbox.stub(tra3, "_setLocalTransformState");
    //             sandbox.stub(tra2, "_setLocalTransformState");
    //             tra3.localPosition = Vector3.create(1, 1, 1);
    //             tra2.localPosition = Vector3.create(3, 3, 3);
    //
    //             expect(getValues(tra2.position)).toEqual([3, 3, 3]);
    //             expect(getValues(tra2.localPosition)).toEqual([3, 3, 3]);
    //             expect(getValues(tra3.position)).toEqual([4, 4, 4]);
    //             expect(getValues(tra3.localPosition)).toEqual([1, 1, 1]);
    //             expect(getValues(tra1.position)).toEqual([4, 5, 6]);
    //             expect(getValues(tra1.localPosition)).toEqual([1, 2, 3]);
    //
    //             expect(tra3._setLocalTransformState).toCalledOnce();
    //             expect(tra2._setLocalTransformState).toCalledOnce();
    //         });
    //         it("not clone if no parent", function () {
    //             var pos = {clone:sandbox.stub()};
    //             tra1.parent = null;
    //
    //             tra1.localPosition = pos;
    //
    //             expect(pos.clone).not.toCalled();
    //         });
    //     });
    // });
});
