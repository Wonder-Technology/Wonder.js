// import * as sinon from "sinon";
// import { ThreeDTransform } from "../../../../dist/commonjs/component/transform/ThreeDTransform";
// import { GameObject } from "../../../../dist/commonjs/core/entityObject/gameObject/GameObject";
// import { Matrix4 } from "../../../../dist/commonjs/math/Matrix4";
// import { Vector3 } from "../../../../dist/commonjs/math/Vector3";
// import { initData } from "../../../../dist/commonjs/component/transform/ThreeDTransformSystem";
// import { ThreeDTransformData } from "../../../../dist/commonjs/component/transform/ThreeDTransformData";
// import { GlobalTempData } from "../../../../dist/commonjs/definition/GlobalTempData";
// import { testTool } from "../../testTool";

describe("ThreeDTransform", function(){
    var sandbox = null;
    var tra1, tra2, tra3;
    var obj1, obj2;
    var ThreeDTransform = wd.ThreeDTransform,
        GameObject = wd.GameObject,
        Matrix4 = wd.Matrix4,
        Vector3 = wd.Vector3,
        ThreeDTransformData = wd.ThreeDTransformData,
        GlobalTempData = wd.GlobalTempData;
    var initData = wd.initThreeDTransform;
    var updateTransform = wd.updateTransform;
    var director = wd.Director;


    function getValues(values, digit){
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        testTool.stubGetter(sinon, ThreeDTransformData, "count", function(){
            return 10;
        });

        initData(GlobalTempData, ThreeDTransformData).run();

        obj1 = GameObject.create();
        tra1 = obj1.transform;

        obj2 = GameObject.create();
        tra2 = obj2.transform;

        tra3 = ThreeDTransform.create();

        director = wd.Director.getInstance();
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clearInstance();
    });

    describe("get parent", function(){
        beforeEach(function(){

        });

        it("default value should be null", function(){
            expect(tra1.parent).toBeNull();
        });
        // it("if get parent before add to entityObject, contract error", function() {
        //     expect(function(){
        //         tra2.parent;
        //     }).toThrow();
        // });
    });

    //todo test
    describe("set parent", function(){
        beforeEach(function(){

        });

        it("if set parent before add to entityObject, contract error", function() {

        });
    });

    describe("get localToWorldMatrix", function(){
        beforeEach(function(){

        });

        it("default value should be identiy matrix", function(){
            expect(tra1.localToWorldMatrix).toEqual(Matrix4.create().setIdentity());
        });
    });

    describe("get position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.position).toEqual(Vector3.create());
        });
    });

    // describe("set position", function(){
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("can set position directly", function(){
    //         var pos = Vector3.create(1,2,3);
    //         tra2.position = pos;
    //
    //         expect(tra2.position).toEqual(pos);
    //     });
    // });

    describe("get local position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(tra1.localPosition).toEqual(Vector3.create());
        });
    });

    describe("init", function(){
        beforeEach(function(){

        });

        it("can get the setted value which is setted by user after init", function(){
            var pos = Vector3.create(1,2,3);
            tra3.position = pos.clone();
            obj1.disposeComponent(tra1);
            obj1.addComponent(tra3);

            obj1.init();

            expect(tra3.position).toEqual(pos);
            expect(tra3.localToWorldMatrix.getTranslation()).toEqual(pos);
        });
        //todo more
    });
    
    describe("dispose component", function(){
        beforeEach(function(){
        });

        describe("remove related data in ThreeDTransformData", () => {
            beforeEach(() => {
            });
            
            describe("test if dirty", () => {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);

                    director.scene.addChild(obj1);
                    director.scene.addChild(obj2);
                });

                it("reset its transform data after dispose", function(){
                    director._loopBody(0, null);
                    tra1.localPosition = pos.clone();

                    tra1.dispose();
                    director._loopBody(0, null);

                    expect(tra1.position).toEqual(Vector3.create(0,0,0));
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    director._loopBody(0, null);
                    tra1.localPosition = pos.clone();
                    tra2.localPosition = pos2.clone();


                    tra1.dispose();
                    director._loopBody(0, null);

                    expect(tra2.position).toEqual(pos2);
                });
            });

            describe("test if not dirty", function() {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);

                    director.scene.addChild(obj1);
                    director.scene.addChild(obj2);
                });

                it("reset its transform data after dispose", function(){
                    tra1.localPosition = pos.clone();
                    director._loopBody(0, null);

                    tra1.dispose();

                    expect(tra1.position).toEqual(Vector3.create(0,0,0));
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    tra1.localPosition = pos.clone();
                    tra2.localPosition = pos2.clone();
                    director._loopBody(0, null);

                    tra1.dispose();

                    expect(tra2.position).toEqual(pos2);
                });
            });
        });
    });

    describe("defer compute", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    //todo more
});
