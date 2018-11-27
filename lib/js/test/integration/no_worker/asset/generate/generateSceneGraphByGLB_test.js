'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$Wonderjs = require("../tool/GLBTool.js");
var GLTFTool$Wonderjs = require("../tool/GLTFTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var ConvertTool$Wonderjs = require("../tool/ConvertTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var ConvertGLBTool$Wonderjs = require("../tool/ConvertGLBTool.js");
var AssembleWDBSystemTool$Wonderjs = require("../tool/AssembleWDBSystemTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var HashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/HashMapService.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("../tool/GenerateSceneGraphSystemTool.js");

describe("generateSceneGraph by glb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(50000, 30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test SuperLowPolyStove glb", (function () {
                Wonder_jest.testPromise("test bufferViews", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n  \"bufferViews\": [\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 0,\n      \"byteLength\": 11472\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 11472,\n      \"byteLength\": 11472\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 22944,\n      \"byteLength\": 7648\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 30592,\n        \"byteLength\": 20208\n          },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 50800,\n              \"byteLength\": 18048\n            },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 68848,\n              \"byteLength\": 18048\n            },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 86896,\n              \"byteLength\": 12032\n            },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 98928,\n              \"byteLength\": 19344\n            },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 118272,\n              \"byteLength\": 2\n            },\n            {\n              \"buffer\": 0,\n              \"byteOffset\": 118276,\n              \"byteLength\": 2\n            }\n          ]\n         ", param[0]);
                                    }), state);
                      }));
                describe("test buffer", (function () {
                        return Wonder_jest.testPromise("test data", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                    var dataMap = GLTFTool$Wonderjs.getSuperLowPolyStoveGeometryData(/* () */0);
                                                    var allGeometryData = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    allGeometryData.length,
                                                                    Caml_array.caml_array_get(allGeometryData, 1)
                                                                  ]), /* tuple */[
                                                                2,
                                                                /* tuple */[
                                                                  "Stove_1",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Stove_1", dataMap)
                                                                ]
                                                              ]);
                                                  }), state);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test BoxTextured glb", (function () {
                Wonder_jest.testPromise("test nodes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n  \"nodes\":[{\"name\":\"gameObject_0\",\"children\":[1],\"rotation\":[-0.7071067690849304,0,0,0.7071067690849304]},{\"name\":\"Mesh\",\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}}]\n  ", param[0]);
                                    }), state);
                      }));
                Wonder_jest.testPromise("test images", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n  \"images\":[{\"name\": \"CesiumLogoFlat.png\", \"bufferView\":4,\"mimeType\":\"image/png\"}]\n  ", param[0]);
                                    }), state);
                      }));
                Wonder_jest.testPromise("test bufferViews", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n  \"bufferViews\": [\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 0,\n      \"byteLength\": 288\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 288,\n      \"byteLength\": 288\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 576,\n      \"byteLength\": 192\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 768,\n      \"byteLength\": 72\n    },\n    {\n      \"buffer\": 0,\n      \"byteOffset\": 840,\n      \"byteLength\": 2\n    }\n  ]\n\n  ", param[0]);
                                    }), state);
                      }));
                describe("test texture", (function () {
                        return Wonder_jest.testPromise("test source", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                        }))), /* array */[{
                                                                  name: "CesiumLogoFlat.png",
                                                                  src: "object_url1"
                                                                }]);
                                                  }), state);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test CesiumMilkTruck glb", (function () {
                Wonder_jest.testPromise("test imageResultUint8ArrayMap", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[1]), /* array */[
                                                  BufferUtils$Wonderjs.convertBase64ToBinary(GenerateSceneGraphSystemTool$Wonderjs.buildBase64Str1(/* () */0)),
                                                  BufferUtils$Wonderjs.convertBase64ToBinary(GenerateSceneGraphSystemTool$Wonderjs.buildBase64Str1(/* () */0))
                                                ]);
                                    }), state);
                      }));
                Wonder_jest.testPromise("test nodes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n                  \"nodes\":[{\"name\":\"gameObject_0\",\"children\":[1,3,5,6,7]},{\"name\":\"gameObject_3\",\"children\":[2],\"translation\":[1.432669997215271,0.4277220070362091,-2.98022992950564e-8]},{\"name\":\"Wheels\",\"rotation\":[0,0,0.08848590403795242,-0.9960774183273315],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"name\":\"gameObject_1\",\"children\":[4],\"translation\":[-1.352329969406128,0.4277220070362091,-2.98022992950564e-8]},{\"name\":\"Wheels\",\"rotation\":[0,0,0.08848590403795242,-0.9960774183273315],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":1}},{\"name\":\"Cesium_Milk_Truck_0\",\"mesh\":1,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":2}},{\"name\":\"Cesium_Milk_Truck_1\",\"mesh\":2,\"extras\":{\"lightMaterial\":2,\"meshRenderer\":3}},{\"name\":\"Cesium_Milk_Truck_2\",\"mesh\":3,\"extras\":{\"lightMaterial\":3,\"meshRenderer\":4}}]\n", param[0]);
                                    }), state);
                      }));
                Wonder_jest.testPromise("test meshes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      return GenerateSceneGraphSystemTool$Wonderjs.contain("\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}],\"name\":\"Wheels\"},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}],\"name\":\"Cesium_Milk_Truck_0\"},{\"primitives\":[{\"attributes\":{\"POSITION\":8,\"NORMAL\":9},\"indices\":10}],\"name\":\"Cesium_Milk_Truck_1\"},{\"primitives\":[{\"attributes\":{\"POSITION\":11,\"NORMAL\":12},\"indices\":13}],\"name\":\"Cesium_Milk_Truck_2\"}]\n          ", param[0]);
                                    }), state);
                      }));
                describe("test buffer", (function () {
                        return Wonder_jest.testPromise("test data", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var dataMap = GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0])), /* array */[
                                                                /* tuple */[
                                                                  "Cesium_Milk_Truck_0",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_0", dataMap)
                                                                ],
                                                                /* tuple */[
                                                                  "Cesium_Milk_Truck_1",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_1", dataMap)
                                                                ],
                                                                /* tuple */[
                                                                  "Cesium_Milk_Truck_2",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_2", dataMap)
                                                                ],
                                                                /* tuple */[
                                                                  "Wheels",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                                ],
                                                                /* tuple */[
                                                                  "Wheels",
                                                                  HashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                                ]
                                                              ]);
                                                  }), state);
                                    }));
                      }));
                describe("test materials", (function () {
                        return Wonder_jest.testPromise("test", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    return GenerateSceneGraphSystemTool$Wonderjs.contain("  \"materials\": [\n    {\n      \"name\": \"wheels\",\n      \"pbrMetallicRoughness\": {\n        \"baseColorTexture\": {\n          \"index\": 0\n        }\n      }\n    },\n    {\n      \"name\": \"truck\",\n      \"pbrMetallicRoughness\": {\n        \"baseColorTexture\": {\n          \"index\": 1\n        }\n      }\n    },\n    {\n      \"name\": \"glass\",\n      \"pbrMetallicRoughness\": {\n        \"baseColorFactor\": [\n          0,\n          0.04050629958510399,\n          0.021240700036287308,\n          1\n        ]\n      }\n    },\n    {\n      \"name\": \"window_trim\",\n      \"pbrMetallicRoughness\": {\n        \"baseColorFactor\": [\n          0.06400000303983688,\n          0.06400000303983688,\n          0.06400000303983688,\n          1\n        ]\n      }\n    }\n  ]\n", param[0]);
                                                  }), state);
                                    }));
                      }));
                describe("test textures and samplers", (function () {
                        return Wonder_jest.testPromise("test", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    return GenerateSceneGraphSystemTool$Wonderjs.contain("\n  \"textures\": [\n    {\n      \"sampler\": 0,\n      \"source\": 0,\n      \"name\": \"texture_1\"\n    },\n    {\n      \"sampler\": 0,\n      \"source\": 0,\n      \"name\": \"texture_0\"\n    }\n  ],\n  \"samplers\": [\n    {\n      \"wrapS\": 10497,\n      \"wrapT\": 10497,\n      \"magFilter\": 9729,\n      \"minFilter\": 9986\n    }\n  ]\n", param[0]);
                                                  }), state);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test AlphaBlendModeTest glb", (function () {
                describe("test texture", (function () {
                        return Wonder_jest.testPromise("test source", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                        }))), /* array */[
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_3",
                                                                  src: "object_url2"
                                                                },
                                                                {
                                                                  name: "image_2",
                                                                  src: "object_url3"
                                                                }
                                                              ]);
                                                  }), state);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test perspectiveCameraProjection", (function () {
                Wonder_jest.testPromise("test nodes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), "\n            \"nodes\":[{\"children\":[1,2,3]},{\"name\":\"gameObject_0\",\"rotation\":[-0.382999986410141,0,0,0.9237499833106995],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"name\":\"gameObject_1\",\"translation\":[0.5,0.5,3],\"camera\":0,\"extras\":{\"basicCameraView\":0}},{\"name\":\"gameObject_2\",\"translation\":[0.5,0.5,3],\"extras\":{\"basicCameraView\":1}}]\n            ", state, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test meshes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), "\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0},\"indices\":1}]\n            ", state, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test accessors and bufferViews", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), "\n            \"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":48},{\"buffer\":0,\"byteOffset\":48,\"byteLength\":12}],\n\n            \"accessors\":[{\"bufferView\":0,\"componentType\":5126,\"count\":4,\"type\":\"VEC3\"},{\"bufferView\":1,\"componentType\":5123,\"count\":6,\"type\":\"SCALAR\"}]\n            ", state, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test cameras", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), "\n            \"cameras\":[{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":1,\"zfar\":100,\"znear\":0.01,\"yfov\":0.7}}]\n            ", state, undefined, /* () */0);
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.testPromise("test gltf->camera has no aspectRatio,zfar", (function () {
                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"perspective\": {\n                \"yfov\": 0.6,\n                \"znear\": 1.0\n            },\n            \"type\": \"perspective\"\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"camera\": 0\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), "\n              \"cameras\":[{\"type\":\"perspective\",\"perspective\":{\"zfar\":100000,\"znear\":1,\"yfov\":0.5999999999999999}}]\n            ", state, undefined, /* () */0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test basicCameraView", (function () {
                Wonder_jest.testPromise("test nodes", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), "\n              \"nodes\":[{\"name\":\"gameObject_0\",\"children\":[1,2],\"mesh\":0,\"camera\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0,\"basicCameraView\":0}},{\"name\":\"gameObject_1\",\"mesh\":0,\"camera\":1,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":1,\"basicCameraView\":1}},{\"name\":\"gameObject_2\",\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":2,\"basicCameraView\":2}}],\n            ", state, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test extras->basicCameraViews", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), "\n              \"basicCameraViews\":[{\"isActive\":true},{\"isActive\":false},{\"isActive\":false}]}\n            ", state, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test cameras", (function () {
                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), "\n              \"cameras\":[{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":2,\"zfar\":1000,\"znear\":2,\"yfov\":0.5}},{\"type\":\"perspective\",\"perspective\":{\"zfar\":100000,\"znear\":1,\"yfov\":0.5999999999999999}}]\n            ", state, undefined, /* () */0);
                            }));
              }));
        describe("test light", (function () {
                Wonder_jest.testPromise("test scene", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), "\n              \"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":2}},\"nodes\":[0],\"extras\":{}}]\n", state, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test extensions", (function () {
                        GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), "\n  \"extensions\": {\n    \"KHR_lights\": {\n      \"lights\": [\n        {\n          \"intensity\": 1,\n          \"color\": [\n            0.5,\n            0.5,\n            1\n          ],\n          \"type\": \"directional\"\n        },\n        {\n          \"range\": 55.5,\n          \"quadraticAttenuation\": 0,\n          \"linearAttenuation\": 1.5,\n          \"constantAttenuation\": 1,\n          \"intensity\": 2.5,\n          \"color\": [\n            0,\n            0,\n            0\n          ],\n          \"type\": \"point\"\n        },\n        {\n          \"color\": [\n            1,\n            0.5,\n            1\n          ],\n          \"type\": \"ambient\"\n        }\n      ]\n    }\n  },\n", state, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test nodes", (function () {
                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), "\n              \"nodes\":[{\"name\":\"gameObject_0\",\"children\":[1,2,3]},{\"name\":\"gameObject_1\",\"translation\":[-1.352329969406128,0.4277220070362091,-2.98022992950564e-8],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"name\":\"gameObject_2\",\"translation\":[10.5,0.4277220070362091,20.100000381469727],\"extensions\":{\"KHR_lights\":{\"light\":0}}},{\"name\":\"gameObject_3\",\"translation\":[2.5,0,-2.9000000953674316],\"rotation\":[0,0,0,1.1180340051651],\"scale\":[1,1,2],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":1},\"extensions\":{\"KHR_lights\":{\"light\":1}}}],\n", state, undefined, /* () */0);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
