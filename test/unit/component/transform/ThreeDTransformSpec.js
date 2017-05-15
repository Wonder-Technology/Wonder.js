// import * as sinon from "sinon";
// import { ThreeDTransform } from "../../../../dist/commonjs/component/transform/ThreeDTransform";
// import { GameObject } from "../../../../dist/commonjs/core/entityObject/gameObject/GameObject";
// import { Matrix4 } from "../../../../dist/commonjs/math/Matrix4";
// import { Vector3 } from "../../../../dist/commonjs/math/Vector3";
// import { initData } from "../../../../dist/commonjs/component/transform/ThreeDTransformSystem";
// import { ThreeDTransformData } from "../../../../dist/commonjs/component/transform/ThreeDTransformData";
// import { GlobalTempData } from "../../../../dist/commonjs/definition/GlobalTempData";
// import { testTool } from "../../testTool";

describe("ThreeDTransform", function () {
    var sandbox = null;
    var tra1, tra2, tra3;
    var obj1, obj2;
    var ThreeDTransform = wd.ThreeDTransform,
        GameObject = wd.GameObject,
        Matrix4 = wd.Matrix4,
        Vector3 = wd.Vector3,
        ThreeDTransformData = wd.ThreeDTransformData,
        GlobalTempData = wd.GlobalTempData;
    // var initData = wd.initThreeDTransform;
    var director;
    var updateSystem;

    var defaultPos;


    function getValues(values, digit) {
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        testTool.stubGetter(sinon, ThreeDTransformData, "count", function () {
            return 10;
        });

        // initData(GlobalTempData, ThreeDTransformData);

        obj1 = gameObjectTool.create();
        tra1 = gameObjectTool.getTransform(obj1);
        tra1.name = "tra1";

        obj2 = gameObjectTool.create();
        tra2 = gameObjectTool.getTransform(obj2);
        tra2.name = "tra2";

        tra3 = transformTool.create();
        tra3.name = "tra3";

        director = wd.Director.getInstance();

        updateSystem = director._updateSystem;

        defaultPos = Vector3.create(0, 0, 0);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    //todo pass
    describe("build uid", function() {
        beforeEach(function () {
            testTool.clear(sandbox);
        });

        it("uid start from 0", function () {
            var tra = transformTool.create();

            expect(tra.uid).toEqual(0);
        });
    });

    describe("test cache", function(){
        var matrix;

        function judgeCache(stubFunc, getAttr, judgeStubFunc){
            stubFunc();

            // var m1 = tra1[getAttr];
            // var m2 = tra1[getAttr];

            var m1 = transformTool["get" + getAttr[0].toUpperCase() + getAttr.slice(1)](tra1);
            var m2 = transformTool["get" + getAttr[0].toUpperCase() + getAttr.slice(1)](tra1);

            expect(m1 === m2).toBeTruthy();
            judgeStubFunc();
        }

        beforeEach(function(){
            matrix = wd.Matrix4.create();
        });

        // it("normalMatrix(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.spy(transformTool.getLocalToWorldMatrix(tra1), "invertTo3x3");
        //     }, "normalMatrix", function(){
        //         expect(transformTool.getLocalToWorldMatrix(tra1).invertTo3x3).toCalledOnce();
        //     });
        // });
        it("localToWorldMatrix(getter)", function(){
            judgeCache(function(){
                sandbox.spy(wd.DataUtils, "createMatrix4ByIndex");
            }, "localToWorldMatrix", function(){
                expect(wd.DataUtils.createMatrix4ByIndex).toCalledOnce();
            });
        });
        it("position(getter)", function(){
            judgeCache(function(){
            }, "position", function(){
            });
        });
        it("localPosition(getter)", function(){
            judgeCache(function(){
                sandbox.spy(wd.DataUtils, "createVector3ByIndex");
            }, "localPosition", function(){
                expect(wd.DataUtils.createVector3ByIndex).toCalledOnce();
            });
        });
        // it("rotation(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1._rotation, "setFromMatrix");
        //     }, "rotation", function(){
        //         expect(tra1._rotation.setFromMatrix).toCalledOnce();
        //     });
        // });
        // it("scale(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(transformTool.getLocalToWorldMatrix(tra1), "getScale");
        //     }, "scale", function(){
        //         expect(transformTool.getLocalToWorldMatrix(tra1).getScale).toCalledOnce();
        //     });
        // });
        // it("eulerAngles(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(transformTool.getLocalToWorldMatrix(tra1), "getEulerAngles");
        //     }, "eulerAngles", function(){
        //         expect(transformTool.getLocalToWorldMatrix(tra1).getEulerAngles).toCalledOnce();
        //     });
        // });
        // it("localEulerAngles(getter)", function(){
        //     judgeCache(function(){
        //         sandbox.stub(tra1._localRotation, "getEulerAngles");
        //     }, "localEulerAngles", function(){
        //         expect(tra1._localRotation.getEulerAngles).toCalledOnce();
        //     });
        // });
        it("test batch set", function () {
            sandbox.spy(wd.DataUtils, "createVector3ByIndex");
            var batchTransformDatas = [];
            batchTransformDatas.push({
                transform:tra1,
                localPosition:Vector3.create(0,0,1)
            });

            transformTool.setBatchTransformDatas(batchTransformDatas);

            updateSystem(null, null);
            var pos = transformTool.getLocalPosition(tra1).clone();


            updateSystem(null, null);
            var pos2 = transformTool.getLocalPosition(tra1).clone();


            expect(getValues(pos)).toEqual(getValues(pos2));
            expect(wd.DataUtils.createVector3ByIndex).toCalledOnce();
        });
        it("test parent and children cache", function () {
            sandbox.spy(wd.DataUtils, "createVector3ByIndex");
            transformTool.setParent(tra1, tra2)

            transformTool.setLocalPosition(tra1, Vector3.create(0,0,1));
            transformTool.setLocalPosition(tra2, Vector3.create(4,0,1));

            updateSystem(null, null);
            var pos = transformTool.getLocalPosition(tra1).clone();
            var pos2 = transformTool.getLocalPosition(tra2).clone();

            expect(wd.DataUtils.createVector3ByIndex).toCalledTwice();

            updateSystem(null, null);
            var pos3 = transformTool.getLocalPosition(tra1).clone();
            var pos4 = transformTool.getLocalPosition(tra2).clone();

            expect(getValues(pos)).toEqual(getValues(pos3));
            expect(getValues(pos2)).toEqual(getValues(pos4));
            expect(wd.DataUtils.createVector3ByIndex).toCalledTwice();
        });

        describe("test clear cache", function() {
            beforeEach(function () {
            });

            it("test clear localToWorldMatrix cache", function () {
                transformTool.setPosition(tra1, Vector3.create(0, 0, 1))
                updateSystem(null, null);
                var m1 = transformTool.getLocalToWorldMatrix(tra1).clone();

                transformTool.setPosition(tra1, Vector3.create(1, 2, 3))
                updateSystem(null, null);

                var m2 = transformTool.getLocalToWorldMatrix(tra1).clone()

                expect(getValues(m1)).not.toEqual(getValues(m2));
            });
            // it("test clear normalMatrix cache", function () {
            //     var m1 = tra1.normalMatrix;
            //
            //     transformTool.setPosition(tra1, Vector3.create(1,2,3))
            //
            //     var m2 = tra1.normalMatrix;
            //
            //     expect(m1 === m2).toBeFalsy();
            // });
            it("clear position cache", function () {
                transformTool.setPosition(tra1, Vector3.create(0, 0, 1))
                updateSystem(null, null);
                var pos = transformTool.getPosition(tra1).clone();

                transformTool.setPosition(tra1, Vector3.create(1, 2, 3))
                updateSystem(null, null);

                var pos2 = transformTool.getPosition(tra1).clone();

                expect(getValues(pos)).not.toEqual(getValues(pos2));
            });
            it("clear localPosition cache", function () {
                transformTool.setLocalPosition(tra1, Vector3.create(0, 0, 2));
                updateSystem(null, null);
                var localPos = transformTool.getLocalPosition(tra1).clone();

                transformTool.setLocalPosition(tra1, Vector3.create(1, 0, 2));
                updateSystem(null, null);

                var localPos2 = transformTool.getLocalPosition(tra1).clone();

                expect(getValues(localPos)).not.toEqual(getValues(localPos2));
            });
            //it("clear position,rotation,scale,eulerAngles,localEulerAngles cache", function () {
            //    var m1 = transformTool.getPosition(tra1);
            //    var m2 = tra1.rotation;
            //    var m3 = tra1.scale;
            //    var m4 = tra1.eulerAngles;
            //    var m5 = tra1.localEulerAngles;
            //
            //    wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));
            //
            //    expect(tra1._positionCache).toBeNull();
            //    expect(tra1._rotationCache).toBeNull();
            //    expect(tra1._scaleCache).toBeNull();
            //    expect(tra1._eulerAnglesCache).toBeNull();
            //    expect(tra1._localEulerAnglesCache).toBeNull();
            //});

            it("test batch set", function () {
                var batchTransformDatas = [];
                batchTransformDatas.push({
                    transform:tra1,
                    position: Vector3.create(0, 0, 1)
                });

                transformTool.setBatchTransformDatas(batchTransformDatas);

                updateSystem(null, null);
                var pos = transformTool.getPosition(tra1).clone();


                batchTransformDatas = [];

                batchTransformDatas.push({
                    transform:tra1,
                    position: Vector3.create(1, 2, 3)
                });

                transformTool.setBatchTransformDatas(batchTransformDatas);
                updateSystem(null, null);
                var pos2 = transformTool.getPosition(tra1).clone();


                expect(getValues(pos)).not.toEqual(getValues(pos2));
            });
            it("test clear parent and children cache", function () {
                sandbox.spy(wd.DataUtils, "createVector3ByIndex");
                transformTool.setParent(tra1, tra2)

                transformTool.setLocalPosition(tra1, Vector3.create(0, 0, 1));
                transformTool.setLocalPosition(tra2, Vector3.create(4, 0, 1));

                updateSystem(null, null);
                var pos = transformTool.getLocalPosition(tra1).clone();
                var pos2 = transformTool.getLocalPosition(tra2).clone();


                transformTool.setLocalPosition(tra1, Vector3.create(1, 0, 1));
                transformTool.setLocalPosition(tra2, Vector3.create(7, 1, 1));
                updateSystem(null, null);
                var pos3 = transformTool.getLocalPosition(tra1).clone();
                var pos4 = transformTool.getLocalPosition(tra2).clone();

                expect(getValues(pos)).not.toEqual(getValues(pos3));
                expect(getValues(pos2)).not.toEqual(getValues(pos4));
                expect(wd.DataUtils.createVector3ByIndex.callCount).toEqual(4);
            });
        });
    });

    describe("get parent", function(){
        beforeEach(function(){

        });

        it("default value should be null", function(){
            expect(transformTool.getParent(tra1)).toBeNull();
        });
        // it("if get parent before add to entityObject, contract error", function() {
        //     expect(function(){
        //         transformTool.getParent(tra2);
        //     }).toThrow();
        // });
    });

    describe("set parent", function(){
        beforeEach(function(){
        });

        describe("the change of parent before setted as parent will affect child", function(){
            it("test one(parent)-one(child)", function () {
                var pos = Vector3.create(1,1,1);
                transformTool.setPosition(tra2, pos)
                transformTool.setParent(tra1, tra2)

                updateSystem(null, null);

                expect(transformTool.getPosition(tra2)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra2)).toEqual(pos);
                expect(transformTool.getPosition(tra1)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra1)).toEqual(defaultPos);
            });
            it("test one(parent)-two(child)", function () {
                var pos = Vector3.create(10,10,10);
                transformTool.setPosition(tra2, pos)
                transformTool.setParent(tra1, tra2)

                var pos2 = Vector3.create(2,2,2);
                transformTool.setPosition(tra3, pos2)

                transformTool.setParent(tra3, tra2)


                updateSystem(null, null);

                expect(transformTool.getPosition(tra2)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra2)).toEqual(pos);
                expect(transformTool.getPosition(tra1)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra1)).toEqual(defaultPos);

                expect(transformTool.getPosition(tra3)).toEqual(pos2.clone().add(pos));
                expect(transformTool.getLocalPosition(tra3)).toEqual(pos2);
            });
        });

        describe("if set parent to be null, remove its current parent", function () {
            it("test one(parent)-one(child)", function () {
                var pos = Vector3.create(1,1,1);
                transformTool.setPosition(tra2, pos)
                transformTool.setParent(tra1, tra2)

                updateSystem(null, null);

                transformTool.setParent(tra1, null)

                updateSystem(null, null);

                expect(transformTool.getPosition(tra2)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra2)).toEqual(pos);
                expect(transformTool.getPosition(tra1)).toEqual(defaultPos);
                expect(transformTool.getLocalPosition(tra1)).toEqual(defaultPos);
            });
            it("test one(parent)-two(child)", function () {
                var pos = Vector3.create(1,1,1);
                transformTool.setPosition(tra2, pos)
                transformTool.setParent(tra1, tra2)

                var pos2 = Vector3.create(2,2,2);
                transformTool.setPosition(tra3, pos2)

                transformTool.setParent(tra3, tra2)

                updateSystem(null, null);

                transformTool.setParent(tra1, null)

                updateSystem(null, null);

                expect(transformTool.getPosition(tra2)).toEqual(pos);
                expect(transformTool.getLocalPosition(tra2)).toEqual(pos);
                expect(transformTool.getPosition(tra1)).toEqual(defaultPos);
                expect(transformTool.getLocalPosition(tra1)).toEqual(defaultPos);

                expect(transformTool.getPosition(tra3)).toEqual(pos2.clone().add(pos));
                expect(transformTool.getLocalPosition(tra3)).toEqual(pos2);
            });
        });

        it("if set the same parent, do nothing", function () {
            var pos = Vector3.create(1,1,1);
            transformTool.setPosition(tra2, pos)
            transformTool.setParent(tra1, tra2)

            updateSystem(null, null);

            transformTool.setParent(tra1, tra2)

            updateSystem(null, null);

            expect(transformTool.getPosition(tra2)).toEqual(pos);
            expect(transformTool.getLocalPosition(tra2)).toEqual(pos);
            expect(transformTool.getPosition(tra1)).toEqual(pos);
            expect(transformTool.getLocalPosition(tra1)).toEqual(defaultPos);
        });

        describe("fix bug", function() {
            beforeEach(function(){
            });

            it("description:if dirty parent first, dirty child second, the ThreeDTransformData.transforms[childIndex] will === undefined", function(){
                var pos = Vector3.create(1,1,1);

                transformTool.setPosition(tra2, pos)
                transformTool.setParent(tra1, tra2)

                updateSystem(null, null);

                expect(transformTool.getPosition(tra2)).toEqual(pos);
                expect(transformTool.getPosition(tra1)).toEqual(pos);
            });
        });
    });

    describe("get localToWorldMatrix", function(){
        beforeEach(function(){

        });

        it("default value should be identiy matrix", function(){
            expect(transformTool.getLocalToWorldMatrix(tra1)).toEqual(Matrix4.create().setIdentity());
        });
    });

    describe("get position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(transformTool.getPosition(tra1)).toEqual(Vector3.create());
        });
    });

    describe("get local position", function(){
        beforeEach(function(){

        });

        it("default value should be vec3(0,0,0)", function(){
            expect(transformTool.getLocalPosition(tra1)).toEqual(Vector3.create());
        });
    });

    describe("init", function () {
        beforeEach(function () {

        });

        it("can get the setted value which is setted by user after init", function () {
            var pos = Vector3.create(1, 2, 3);
            transformTool.setPosition(tra3, pos.clone());
            gameObjectTool.disposeComponent(obj1, tra1);
            gameObjectTool.addComponent(obj1, tra3);

            sceneTool.addGameObject(obj1);

            director._init();

            expect(transformTool.getPosition(tra3)).toEqual(pos);
            // expect(transformTool.getPosition(tra3)).toEqual(pos);
            // expect(transformTool.getLocalToWorldMatrix(tra3).getTranslation()).toEqual(pos);
        });
        //todo more
    });

    describe("dispose component", function(){
        beforeEach(function(){
        });

        describe("remove related data in ThreeDTransformData", () => {
            beforeEach(() => {
            });

            it("clear all map datas", function () {
                transformTool.setLocalPosition(tra1, Vector3.create(1,2,3));
                transformTool.dispose(tra1);

                var uid = tra1.uid,
                    index = tra1.index;
                expect(ThreeDTransformData.isTranslateMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.positionCacheMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.localPositionCacheMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.localToWorldMatrixCacheMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.tempLocalToWorldMatrixMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.tempPositionMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.tempLocalPositionMap[uid]).toBeUndefined();
                expect(ThreeDTransformData.transformMap[index]).toBeUndefined();
                expect(ThreeDTransformData.gameObjectMap[uid]).toBeUndefined();
            });
            it("if set/get transform data after dispose, error", function () {
                var errorMsg = "transform should alive";
                var pos = Vector3.create(1,2,3);
                updateSystem(null, null);
                transformTool.setLocalPosition(tra1, pos.clone());

                transformTool.dispose(tra1);
                updateSystem(null, null);

                expect(function(){
                    transformTool.getPosition(tra1);
                }).toThrow(errorMsg);
                expect(function(){
                    transformTool.getLocalToWorldMatrix(tra1);
                }).toThrow(errorMsg);
                expect(function(){
                    transformTool.getLocalPosition(tra1);
                }).toThrow(errorMsg);
                expect(function(){
                    transformTool.setPosition(tra1, pos.clone());
                }).toThrow(errorMsg);
                expect(function(){
                    transformTool.setLocalPosition(tra1, pos.clone());
                }).toThrow(errorMsg);
            });

            describe("test if dirty", () => {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);
                });

                it("reset its transform data after dispose", function(){
                    updateSystem(null, null);
                    transformTool.setLocalPosition(tra1, pos.clone());

                    transformTool.dispose(tra1);
                    updateSystem(null, null);

                    expect(getValues(ThreeDTransformData.localPositions)).toEqual([
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                    ])
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    updateSystem(null, null);
                    transformTool.setLocalPosition(tra1, pos.clone());
                    transformTool.setLocalPosition(tra2, pos2.clone());


                    transformTool.dispose(tra1);
                    updateSystem(null, null);

                    expect(transformTool.getPosition(tra2)).toEqual(pos2);
                });
            });

            describe("test if not dirty", function() {
                var pos;

                beforeEach(function(){
                    pos = Vector3.create(1,2,3);

                    // director.scene.addChild(obj1);
                    // director.scene.addChild(obj2);
                });

                it("reset its transform data after dispose", function(){
                    transformTool.setLocalPosition(tra1, pos.clone());

                    transformTool.dispose(tra1);
                    updateSystem(null, null);

                    expect(getValues(ThreeDTransformData.localPositions)).toEqual([
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                    ])
                });
                it("the dispose of one transform shouldn't affect other transform data", function () {
                    var pos2 = Vector3.create(10,2,3);
                    transformTool.setLocalPosition(tra1, pos.clone());
                    transformTool.setLocalPosition(tra2, pos2.clone());
                    updateSystem(null, null);

                    transformTool.dispose(tra1);

                    expect(transformTool.getPosition(tra2)).toEqual(pos2);
                });
            });
        });
    });

    describe("defer compute", function(){
        beforeEach(function(){

        });

        it("compute all transforms' datas when update", function(){
            var pos = Vector3.create(1,2,3);
            var pos2 = Vector3.create(10,2,3);

            transformTool.setParent(tra2, tra1)

            transformTool.setPosition(tra1, pos.clone())
            transformTool.setPosition(tra2, pos2.clone())


            expect(transformTool.getPosition(tra1)).toEqual(defaultPos);
            expect(transformTool.getPosition(tra2)).toEqual(defaultPos);

            updateSystem(null, null);

            expect(transformTool.getPosition(tra1)).toEqual(pos);
            expect(transformTool.getPosition(tra2)).toEqual(pos.clone().add(pos2));
        });

        describe("before update, can only get the old transform data(last update version)", function(){
            it("test get position", function () {
                var pos = Vector3.create(1,2,3);
                var pos2 = Vector3.create(10,2,3);
                transformTool.setPosition(tra1, pos.clone())

                updateSystem(null, null);

                transformTool.setPosition(tra1, pos2.clone())

                expect(transformTool.getPosition(tra1)).toEqual(pos);
            });
        });

        describe("before update, can get the newest local data", function(){
            it("test get local position", function () {
                var pos = Vector3.create(1,2,3);
                var pos2 = Vector3.create(10,2,3);
                transformTool.setLocalPosition(tra1, pos.clone());

                updateSystem(null, null);

                transformTool.setLocalPosition(tra1, pos2.clone());

                expect(transformTool.getLocalPosition(tra1)).toEqual(pos2);
            });
        });
    });

    describe("batch set transform datas", function() {
        beforeEach(function(){
        });

        it("set local position before set position", function(){
            var batchTransformDatas = [];
            var pos = Vector3.create(1,2,3);
            var pos2 = Vector3.create(10,2,3);
            var pos3 = Vector3.create(5,5,1);

            transformTool.setParent(tra1, tra2)

            batchTransformDatas.push({
    transform:tra1,
                localPosition:pos.clone(),
                position:pos2.clone()
            });
            batchTransformDatas.push({
    transform:tra2,
                position:pos3.clone()
            });

            transformTool.setBatchTransformDatas(batchTransformDatas);
            updateSystem(null, null);

            expect(transformTool.getLocalPosition(tra1)).toEqual(pos2.clone());
            expect(transformTool.getPosition(tra1)).toEqual(pos3.clone().add(pos2))
            expect(transformTool.getLocalPosition(tra2)).toEqual(pos3.clone());
            expect(transformTool.getPosition(tra2)).toEqual(pos3.clone());
        });
    });

    //todo more
});
