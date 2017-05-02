import * as sinon from "sinon";
import { ThreeDTransform } from "../../../../dist/commonjs/component/transform/ThreeDTransform";
import { GameObject } from "../../../../dist/commonjs/core/entityObject/gameObject/GameObject";
import { Matrix4 } from "../../../../dist/commonjs/math/Matrix4";
import { Vector3 } from "../../../../dist/commonjs/math/Vector3";
import { initData } from "../../../../dist/commonjs/component/transform/ThreeDTransformSystem";
import { ThreeDTransformData } from "../../../../dist/commonjs/component/transform/ThreeDTransformData";
import { GlobalTempData } from "../../../../dist/commonjs/definition/GlobalTempData";

describe("ThreeDTransform", () => {
    var sandbox = null;
    var tra1 = null;
    var tra2;
    var obj;

    function getValues(values, digit){
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    beforeEach(() =>  {
        sandbox = sinon.sandbox.create();

        initData(GlobalTempData, ThreeDTransformData).run();


        tra2 = ThreeDTransform.create();
        obj = GameObject.create();
        tra1 = obj.transform;
    });
    afterEach(() =>  {
        sandbox.restore();
    });

    describe("get parent", () => {
        beforeEach(() => {

        });

        it("default value should be null", () => {
            expect(tra1.parent).toBeNull();
        });
        // it("if get parent before add to entityObject, contract error", () =>  {
        //     expect(() => {
        //         tra2.parent;
        //     }).toThrow();
        // });
    });

    //todo test
    describe("set parent", () => {
        beforeEach(() => {

        });

        it("if set parent before add to entityObject, contract error", () =>  {

        });
    });

    describe("get localToWorldMatrix", () => {
        beforeEach(() => {

        });

        it("default value should be identiy matrix", () => {
            expect(tra1.localToWorldMatrix).toEqual(Matrix4.create().setIdentity());
        });
    });

    describe("get position", () => {
        beforeEach(() => {

        });

        it("default value should be vec3(0,0,0)", () => {
            expect(tra1.position).toEqual(Vector3.create());
        });
    });

    // describe("set position", () => {
    //     beforeEach(() => {
    //
    //     });
    //
    //     it("can set position directly", () => {
    //         var pos = Vector3.create(1,2,3);
    //         tra2.position = pos;
    //
    //         expect(tra2.position).toEqual(pos);
    //     });
    // });

    describe("get local position", () => {
        beforeEach(() => {

        });

        it("default value should be vec3(0,0,0)", () => {
            expect(tra1.localPosition).toEqual(Vector3.create());
        });
    });

    describe("init", () => {
        beforeEach(() => {

        });

        it("can get the setted value which is setted by user after init", () => {
            var pos = Vector3.create(1,2,3);
            tra2.position = pos.clone();

            obj.addComponent(tra2);

            obj.init();

            expect(tra2.position).toEqual(pos);
            expect(tra2.localToWorldMatrix.getTranslation()).toEqual(pos);
        });
        //todo more
    });

    // it("can get the setted value which is setted by user after addComponent", () => {
    //     var pos = Vector3.create(1,2,3);
    //     tra1.position = pos.clone();
    //
    //     // obj.addDataOrientedComponent(tra1);
    //     obj.addComponent(tra1);
    //
    //     // obj.init();
    //
    //     expect(tra1.position).toEqual(pos);
    //     expect(tra1.localToWorldMatrix.getTranslation()).toEqual(pos);
    // });

    describe("defer compute", () => {
        beforeEach(() => {

        });

        it("", () => {

        });
    });

    //todo more
});
