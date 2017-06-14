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
        Quaternion = wd.Quaternion,
        ThreeDTransformData = wd.ThreeDTransformData,
        GlobalTempData = wd.GlobalTempData;
    var director;
    var updateSystem;

    var defaultPos;
    var defaultScale;
    var defaultRotation;


    function getValues(values, digit) {
        var digit = digit === undefined ? 0 : digit;

        return testTool.getValues(values, digit);
    }

    function getScale(tra){
        return threeDTransformTool.getLocalToWorldMatrix(tra).getScale();
    }

    function getRotation(tra){
        return threeDTransformTool.getLocalToWorldMatrix(tra).getRotation();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        defaultPos = Vector3.create(0, 0, 0);
        defaultScale = Vector3.create(1, 1, 1);
        defaultRotation = Quaternion.create(0,0,0,1);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("test common cases", function() {
        beforeEach(function(){
            testTool.stubGetter(sinon, ThreeDTransformData, "maxCount", function () {
                return 10;
            });

            threeDTransformTool.resetData();

            obj1 = gameObjectTool.create();
            tra1 = gameObjectTool.getTransform(obj1);
            tra1.name = "tra1";

            obj2 = gameObjectTool.create();
            tra2 = gameObjectTool.getTransform(obj2);
            tra2.name = "tra2";

            tra3 = threeDTransformTool.create();
            tra3.name = "tra3";

            director = directorTool.getDirector();

            updateSystem = director._updateSystem;
        })

        describe("build uid", function() {
            beforeEach(function () {
                testTool.clear(sandbox);
            });

            it("uid start from 0", function () {
                var tra = threeDTransformTool.create();

                expect(tra.uid).toEqual(0);
            });
        });

        describe("test cache", function(){
            var matrix;

            function judgeCache(stubFunc, getAttr, judgeStubFunc){
                // stubFunc();

                // var m1 = tra1[getAttr];
                // var m2 = tra1[getAttr];

                var m1 = threeDTransformTool["get" + getAttr[0].toUpperCase() + getAttr.slice(1)](tra1);
                var m2 = threeDTransformTool["get" + getAttr[0].toUpperCase() + getAttr.slice(1)](tra1);

                expect(m1 === m2).toBeTruthy();
                // judgeStubFunc();
            }

            beforeEach(function(){
                matrix = wd.Matrix4.create();
            });

            // it("normalMatrix(getter)", function(){
            //     judgeCache(function(){
            //         sandbox.spy(threeDTransformTool.getLocalToWorldMatrix(tra1), "invertTo3x3");
            //     }, "normalMatrix", function(){
            //         expect(threeDTransformTool.getLocalToWorldMatrix(tra1).invertTo3x3).toCalledOnce();
            //     });
            // });
            it("localToWorldMatrix(getter)", function(){
                judgeCache(function(){
                    // sandbox.spy(wd, "createMatrix4ByIndex");
                }, "localToWorldMatrix", function(){
                    // expect(wd.createMatrix4ByIndex).toCalledOnce();
                });
            });
            it("position(getter)", function(){
                judgeCache(function(){
                }, "position", function(){
                });
            });
            it("localPosition(getter)", function(){
                judgeCache(function(){
                    // sandbox.spy(wd, "createVector3ByIndex");
                }, "localPosition", function(){
                    // expect(wd.createVector3ByIndex).toCalledOnce();
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
            //         sandbox.stub(threeDTransformTool.getLocalToWorldMatrix(tra1), "getScale");
            //     }, "scale", function(){
            //         expect(threeDTransformTool.getLocalToWorldMatrix(tra1).getScale).toCalledOnce();
            //     });
            // });
            // it("eulerAngles(getter)", function(){
            //     judgeCache(function(){
            //         sandbox.stub(threeDTransformTool.getLocalToWorldMatrix(tra1), "getEulerAngles");
            //     }, "eulerAngles", function(){
            //         expect(threeDTransformTool.getLocalToWorldMatrix(tra1).getEulerAngles).toCalledOnce();
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
                // sandbox.spy(wd, "createVector3ByIndex");
                var batchTransformDatas = [];
                batchTransformDatas.push({
                    transform:tra1,
                    localPosition:Vector3.create(0,0,1)
                });

                threeDTransformTool.setBatchTransformDatas(batchTransformDatas);

                updateSystem(null, null);
                var pos = threeDTransformTool.getLocalPosition(tra1).clone();


                updateSystem(null, null);
                var pos2 = threeDTransformTool.getLocalPosition(tra1).clone();


                expect(getValues(pos)).toEqual(getValues(pos2));
                // expect(wd.createVector3ByIndex).toCalledOnce();
            });
            it("test parent and children cache", function () {
                // sandbox.spy(wd, "createVector3ByIndex");
                threeDTransformTool.setParent(tra1, tra2)

                threeDTransformTool.setLocalPosition(tra1, Vector3.create(0,0,1));
                threeDTransformTool.setLocalPosition(tra2, Vector3.create(4,0,1));

                updateSystem(null, null);
                var pos = threeDTransformTool.getLocalPosition(tra1).clone();
                var pos2 = threeDTransformTool.getLocalPosition(tra2).clone();

                // expect(wd.createVector3ByIndex).toCalledTwice();

                updateSystem(null, null);
                var pos3 = threeDTransformTool.getLocalPosition(tra1).clone();
                var pos4 = threeDTransformTool.getLocalPosition(tra2).clone();

                expect(getValues(pos)).toEqual(getValues(pos3));
                expect(getValues(pos2)).toEqual(getValues(pos4));
                // expect(wd.createVector3ByIndex).toCalledTwice();
            });

            describe("test clear cache", function() {
                beforeEach(function () {
                });

                it("test clear localToWorldMatrix cache", function () {
                    threeDTransformTool.setPosition(tra1, Vector3.create(0, 0, 1))
                    updateSystem(null, null);
                    var m1 = threeDTransformTool.getLocalToWorldMatrix(tra1).clone();

                    threeDTransformTool.setPosition(tra1, Vector3.create(1, 2, 3))
                    updateSystem(null, null);

                    var m2 = threeDTransformTool.getLocalToWorldMatrix(tra1).clone()

                    expect(getValues(m1)).not.toEqual(getValues(m2));
                });
                // it("test clear normalMatrix cache", function () {
                //     var m1 = tra1.normalMatrix;
                //
                //     threeDTransformTool.setPosition(tra1, Vector3.create(1,2,3))
                //
                //     var m2 = tra1.normalMatrix;
                //
                //     expect(m1 === m2).toBeFalsy();
                // });
                it("clear position cache", function () {
                    threeDTransformTool.setPosition(tra1, Vector3.create(0, 0, 1))
                    updateSystem(null, null);
                    var pos = threeDTransformTool.getPosition(tra1).clone();

                    threeDTransformTool.setPosition(tra1, Vector3.create(1, 2, 3))
                    updateSystem(null, null);

                    var pos2 = threeDTransformTool.getPosition(tra1).clone();

                    expect(getValues(pos)).not.toEqual(getValues(pos2));
                });
                it("clear localPosition cache", function () {
                    threeDTransformTool.setLocalPosition(tra1, Vector3.create(0, 0, 2));
                    updateSystem(null, null);
                    var localPos = threeDTransformTool.getLocalPosition(tra1).clone();

                    threeDTransformTool.setLocalPosition(tra1, Vector3.create(1, 0, 2));
                    updateSystem(null, null);

                    var localPos2 = threeDTransformTool.getLocalPosition(tra1).clone();

                    expect(getValues(localPos)).not.toEqual(getValues(localPos2));
                });
                //it("clear position,rotation,scale,eulerAngles,localEulerAngles cache", function () {
                //    var m1 = threeDTransformTool.getPosition(tra1);
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

                    threeDTransformTool.setBatchTransformDatas(batchTransformDatas);

                    updateSystem(null, null);
                    var pos = threeDTransformTool.getPosition(tra1).clone();


                    batchTransformDatas = [];

                    batchTransformDatas.push({
                        transform:tra1,
                        position: Vector3.create(1, 2, 3)
                    });

                    threeDTransformTool.setBatchTransformDatas(batchTransformDatas);
                    updateSystem(null, null);
                    var pos2 = threeDTransformTool.getPosition(tra1).clone();


                    expect(getValues(pos)).not.toEqual(getValues(pos2));
                });
                it("test clear parent and children cache", function () {
                    // sandbox.spy(wd, "createVector3ByIndex");
                    threeDTransformTool.setParent(tra1, tra2)

                    threeDTransformTool.setLocalPosition(tra1, Vector3.create(0, 0, 1));
                    threeDTransformTool.setLocalPosition(tra2, Vector3.create(4, 0, 1));

                    updateSystem(null, null);
                    var pos = threeDTransformTool.getLocalPosition(tra1).clone();
                    var pos2 = threeDTransformTool.getLocalPosition(tra2).clone();


                    threeDTransformTool.setLocalPosition(tra1, Vector3.create(1, 0, 1));
                    threeDTransformTool.setLocalPosition(tra2, Vector3.create(7, 1, 1));
                    updateSystem(null, null);
                    var pos3 = threeDTransformTool.getLocalPosition(tra1).clone();
                    var pos4 = threeDTransformTool.getLocalPosition(tra2).clone();

                    expect(getValues(pos)).not.toEqual(getValues(pos3));
                    expect(getValues(pos2)).not.toEqual(getValues(pos4));
                    // expect(wd.createVector3ByIndex.callCount).toEqual(4);
                });
            });
        });

        describe("get parent", function(){
            beforeEach(function(){

            });

            it("default value should be null", function(){
                expect(threeDTransformTool.getParent(tra1)).toBeNull();
            });
            // it("if get parent before add to entityObject, contract error", function() {
            //     expect(function(){
            //         threeDTransformTool.getParent(tra2);
            //     }).toThrow();
            // });
        });

        describe("set parent", function(){
            beforeEach(function(){
            });

            describe("the change of parent before setted as parent will affect child", function(){
                it("test one(parent)-one(child)", function () {
                    var pos = Vector3.create(1,1,1);
                    threeDTransformTool.setPosition(tra2, pos)
                    threeDTransformTool.setParent(tra1, tra2)

                    updateSystem(null, null);

                    expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(defaultPos);
                });
                it("test one(parent)-two(child)", function () {
                    var pos = Vector3.create(10,10,10);
                    threeDTransformTool.setPosition(tra2, pos)
                    threeDTransformTool.setParent(tra1, tra2)

                    var pos2 = Vector3.create(2,2,2);
                    threeDTransformTool.setPosition(tra3, pos2)

                    threeDTransformTool.setParent(tra3, tra2)


                    updateSystem(null, null);

                    expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(defaultPos);

                    expect(threeDTransformTool.getPosition(tra3)).toEqual(pos2.clone().add(pos));
                    expect(threeDTransformTool.getLocalPosition(tra3)).toEqual(pos2);
                });
            });

            describe("if set parent to be null, remove its current parent", function () {
                it("test one(parent)-one(child)", function () {
                    var pos = Vector3.create(1,1,1);
                    threeDTransformTool.setPosition(tra2, pos)
                    threeDTransformTool.setParent(tra1, tra2)

                    updateSystem(null, null);

                    threeDTransformTool.setParent(tra1, null)

                    updateSystem(null, null);

                    expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getPosition(tra1)).toEqual(defaultPos);
                    expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(defaultPos);
                });
                it("test one(parent)-two(child)", function () {
                    var pos = Vector3.create(1,1,1);
                    threeDTransformTool.setPosition(tra2, pos)
                    threeDTransformTool.setParent(tra1, tra2)

                    var pos2 = Vector3.create(2,2,2);
                    threeDTransformTool.setPosition(tra3, pos2)

                    threeDTransformTool.setParent(tra3, tra2)

                    updateSystem(null, null);

                    threeDTransformTool.setParent(tra1, null)

                    updateSystem(null, null);

                    expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getPosition(tra1)).toEqual(defaultPos);
                    expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(defaultPos);

                    expect(threeDTransformTool.getPosition(tra3)).toEqual(pos2.clone().add(pos));
                    expect(threeDTransformTool.getLocalPosition(tra3)).toEqual(pos2);
                });
            });

            it("if set the same parent, do nothing", function () {
                var pos = Vector3.create(1,1,1);
                threeDTransformTool.setPosition(tra2, pos)
                threeDTransformTool.setParent(tra1, tra2)

                updateSystem(null, null);

                threeDTransformTool.setParent(tra1, tra2)

                updateSystem(null, null);

                expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos);
                expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(defaultPos);
            });

            describe("fix bug", function() {
                beforeEach(function(){
                });

                it("description:if dirty parent first, dirty child second, the ThreeDTransformData.transforms[childIndex] will === undefined", function(){
                    var pos = Vector3.create(1,1,1);

                    threeDTransformTool.setPosition(tra2, pos)
                    threeDTransformTool.setParent(tra1, tra2)

                    updateSystem(null, null);

                    expect(threeDTransformTool.getPosition(tra2)).toEqual(pos);
                    expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                });
            });
        });

        describe("get localToWorldMatrix", function(){
            beforeEach(function(){

            });

            it("default value should be identiy matrix", function(){
                expect(threeDTransformTool.getLocalToWorldMatrix(tra1)).toEqual(Matrix4.create().setIdentity());
            });
        });

        describe("get position", function(){
            beforeEach(function(){

            });

            it("default value should be vec3(0,0,0)", function(){
                expect(threeDTransformTool.getPosition(tra1)).toEqual(Vector3.create());
            });
        });

        describe("get local position", function(){
            beforeEach(function(){

            });

            it("default value should be vec3(0,0,0)", function(){
                expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(Vector3.create());
            });

            describe("fix bug", function () {
                it("test get after get localToWorldMatrix", function () {
                    var pos = Vector3.create(1,2,3);
                    threeDTransformTool.setLocalPosition(tra1, pos);

                    var mat = threeDTransformTool.getLocalToWorldMatrix(tra1)
                    var localPos = threeDTransformTool.getLocalPosition(tra1)

                    expect(localPos).toEqual(pos);
                });
            });
        });

        describe("init", function () {
            var state;

            beforeEach(function () {
                state = stateTool.createAndSetFakeGLState(sandbox);
            });

            it("can get the setted value which is setted by user after init", function () {
                var pos = Vector3.create(1, 2, 3);
                threeDTransformTool.setPosition(tra3, pos.clone());
                gameObjectTool.disposeComponent(obj1, tra1);
                gameObjectTool.addComponent(obj1, tra3);

                sceneTool.addGameObject(obj1);

                directorTool.init(state);

                expect(threeDTransformTool.getPosition(tra3)).toEqual(pos);
                // expect(threeDTransformTool.getPosition(tra3)).toEqual(pos);
                // expect(threeDTransformTool.getLocalToWorldMatrix(tra3).getTranslation()).toEqual(pos);
            });
            //todo more
        });

        describe("dispose component", function(){
            beforeEach(function(){
            });

            // it("remove from gameObject", function () {
            //     gameObjectTool.disposeComponent(obj1, tra1);
            //
            //     expect(threeDTransformTool.getGameObject(tra1)).toBeUndefined();
            // });

            describe("remove related data in tra1Data", () => {
                beforeEach(() => {
                });

                // it("clear all map datas", function () {
                //     threeDTransformTool.setLocalPosition(tra1, Vector3.create(1,2,3));
                //     gameObjectTool.disposeComponent(obj1, tra1);
                //
                //     var uid = tra1.uid,
                //         index = tra1.index;
                //     expect(ThreeDTransformData.isTranslateMap[uid]).toBeUndefined();
                //     expect(ThreeDTransformData.cacheMap[uid]).toBeUndefined();
                //     expect(ThreeDTransformData.tempMap[uid]).toBeUndefined();
                //     expect(ThreeDTransformData.transformMap[index]).toBeUndefined();
                //     expect(ThreeDTransformData.gameObjectMap[uid]).toBeUndefined();
                // });
                it("if set/get transform data after dispose, error", function () {
                    var errorMsg = "should alive";
                    var pos = Vector3.create(1,2,3);
                    updateSystem(null, null);
                    threeDTransformTool.setLocalPosition(tra1, pos.clone());

                    gameObjectTool.disposeComponent(obj1, tra1);
                    updateSystem(null, null);

                    expect(function(){
                        threeDTransformTool.getPosition(tra1);
                    }).toThrow(errorMsg);
                    expect(function(){
                        threeDTransformTool.getLocalToWorldMatrix(tra1);
                    }).toThrow(errorMsg);
                    expect(function(){
                        threeDTransformTool.getLocalPosition(tra1);
                    }).toThrow(errorMsg);
                    expect(function(){
                        threeDTransformTool.setPosition(tra1, pos.clone());
                    }).toThrow(errorMsg);
                    expect(function(){
                        threeDTransformTool.setLocalPosition(tra1, pos.clone());
                    }).toThrow(errorMsg);
                });

                describe("test if dirty", () => {
                    var pos;

                    beforeEach(function(){
                        pos = Vector3.create(1,2,3);
                    });

                    // it("reset its transform data after dispose", function(){
                    //     updateSystem(null, null);
                    //     threeDTransformTool.setLocalPosition(tra1, pos.clone());
                    //
                    //     gameObjectTool.disposeComponent(obj1, tra1);
                    //     updateSystem(null, null);
                    //
                    //     expect(getValues(ThreeDTransformData.localPositions)).toEqual([
                    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                    //     ])
                    // });
                    it("the dispose of one transform shouldn\t affect other transform data", function () {
                        var pos2 = Vector3.create(10,2,3);
                        updateSystem(null, null);
                        threeDTransformTool.setLocalPosition(tra1, pos.clone());
                        threeDTransformTool.setLocalPosition(tra2, pos2.clone());


                        gameObjectTool.disposeComponent(obj1, tra1);
                        updateSystem(null, null);

                        expect(threeDTransformTool.getPosition(tra2)).toEqual(pos2);
                    });
                });

                describe("test if not dirty", function() {
                    var pos;

                    beforeEach(function(){
                        pos = Vector3.create(1,2,3);

                        // director.scene.addChild(obj1);
                        // director.scene.addChild(obj2);
                    });

                    // it("reset its transform data after dispose", function(){
                    //     threeDTransformTool.setLocalPosition(tra1, pos.clone());
                    //
                    //     gameObjectTool.disposeComponent(obj1, tra1);
                    //     updateSystem(null, null);
                    //
                    //     expect(getValues(ThreeDTransformData.localPositions)).toEqual([
                    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
                    //     ])
                    // });
                    it("the dispose of one transform shouldn't affect other transform data", function () {
                        var pos2 = Vector3.create(10,2,3);
                        threeDTransformTool.setLocalPosition(tra1, pos.clone());
                        threeDTransformTool.setLocalPosition(tra2, pos2.clone());
                        updateSystem(null, null);

                        gameObjectTool.disposeComponent(obj1, tra1);

                        expect(threeDTransformTool.getPosition(tra2)).toEqual(pos2);
                    });
                });
            });

            it("if component is disposed, getThreeDTransformPosition/setThreeDTransformPosition/getThreeDTransformLocalToWorldMatrix/getThreeDTransformLocalPosition/setThreeDTransformLocalPosition/getThreeDTransformParent/setThreeDTransformParent/getThreeDTransformGameObject should error", function () {
                var errMsg = "component should alive";

                gameObjectTool.disposeComponent(obj1, tra1);

                expect(function () {
                    threeDTransformTool.getPosition(tra1);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.setPosition(tra1, null);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.getLocalToWorldMatrix(tra1);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.getLocalPosition(tra1);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.setLocalPosition(tra1, null);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.getParent(tra1);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.setParent(tra1, null);
                }).toThrow(errMsg);

                expect(function () {
                    threeDTransformTool.getGameObject(tra1);
                }).toThrow(errMsg);
            });
        });

        describe("defer compute", function(){
            beforeEach(function(){

            });

            it("compute all transforms' datas when update", function(){
                var pos = Vector3.create(1,2,3);
                var pos2 = Vector3.create(10,2,3);

                threeDTransformTool.setParent(tra2, tra1)

                threeDTransformTool.setPosition(tra1, pos.clone())
                threeDTransformTool.setPosition(tra2, pos2.clone())


                expect(threeDTransformTool.getPosition(tra1)).toEqual(defaultPos);
                expect(threeDTransformTool.getPosition(tra2)).toEqual(defaultPos);

                updateSystem(null, null);

                expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                expect(threeDTransformTool.getPosition(tra2)).toEqual(pos.clone().add(pos2));
            });

            describe("before update, can only get the old transform data(last update version)", function(){
                it("test get position", function () {
                    var pos = Vector3.create(1,2,3);
                    var pos2 = Vector3.create(10,2,3);
                    threeDTransformTool.setPosition(tra1, pos.clone())

                    updateSystem(null, null);

                    threeDTransformTool.setPosition(tra1, pos2.clone())

                    expect(threeDTransformTool.getPosition(tra1)).toEqual(pos);
                });
            });

            describe("before update, can get the newest local data", function(){
                it("test get local position", function () {
                    var pos = Vector3.create(1,2,3);
                    var pos2 = Vector3.create(10,2,3);
                    threeDTransformTool.setLocalPosition(tra1, pos.clone());

                    updateSystem(null, null);

                    threeDTransformTool.setLocalPosition(tra1, pos2.clone());

                    expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(pos2);
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

                threeDTransformTool.setParent(tra1, tra2)

                batchTransformDatas.push({
        transform:tra1,
                    localPosition:pos.clone(),
                    position:pos2.clone()
                });
                batchTransformDatas.push({
        transform:tra2,
                    position:pos3.clone()
                });

                threeDTransformTool.setBatchTransformDatas(batchTransformDatas);
                updateSystem(null, null);

                expect(threeDTransformTool.getLocalPosition(tra1)).toEqual(pos2.clone());
                expect(threeDTransformTool.getPosition(tra1)).toEqual(pos3.clone().add(pos2))
                expect(threeDTransformTool.getLocalPosition(tra2)).toEqual(pos3.clone());
                expect(threeDTransformTool.getPosition(tra2)).toEqual(pos3.clone());
            });
        });
    });

    describe("fix bug", function(){
        describe("dispose one and create one with the same index", function() {
            beforeEach(function(){
                testTool.closeContractCheck();

                testTool.stubGetter(sinon, ThreeDTransformData, "maxCount", function () {
                    return 5;
                });

                threeDTransformTool.resetData();

                obj1 = gameObjectTool.create();
                tra1 = gameObjectTool.getTransform(obj1);
                tra1.name = "tra1";

                obj2 = gameObjectTool.create();
                tra2 = gameObjectTool.getTransform(obj2);
                tra2.name = "tra2";


                director = directorTool.getDirector();

                updateSystem = director._updateSystem;
            });

            it("the new one's transform data should be default value", function () {
                threeDTransformTool.setPosition(tra1, Vector3.create(1,2,3));
                threeDTransformTool.setPosition(tra2, Vector3.create(2,2,3));


                updateSystem(null, null);




                gameObjectTool.disposeComponent(obj1, tra1);


                obj1 = gameObjectTool.create();
                tra1 = gameObjectTool.getTransform(obj1);

                expect(
                    threeDTransformTool.getPosition(tra1)
                ).toEqual(defaultPos);

                expect(getScale(tra1)).toEqual(defaultScale);
                expect(getRotation(tra1)).toEqual(defaultRotation);







                gameObjectTool.disposeComponent(obj2, tra2);


                obj2 = gameObjectTool.create();
                tra2 = gameObjectTool.getTransform(obj2);


                expect(
                    threeDTransformTool.getPosition(tra2)
                ).toEqual(defaultPos);
                expect(getScale(tra2)).toEqual(defaultScale);
                expect(getRotation(tra2)).toEqual(defaultRotation);
            });
        });
    });
});
