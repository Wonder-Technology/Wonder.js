open Wonder_jest;

open Js.Typed_array;

open GLTFType;

let _ =
  describe("generateSceneGraph by glb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        TestTool.initWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=50000,
              ~customGeometryCount=30,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test BoxTextured glb", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "nodes":[{"name":"gameObject_0","children":[1],"rotation":[-0.7071067690849304,0,0,0.7071067690849304]},{"name":"Mesh","mesh":0,"extras":{"lightMaterial":0}}]
  |},
               ),
          state,
        );
      });

      testPromise("test images", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "images":[{"bufferView":4,"mimeType":"image/png"}]
  |},
               ),
          state,
        );
      });

      testPromise("test bufferViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "bufferViews": [
    {
      "buffer": 0,
      "byteOffset": 0,
      "byteLength": 288
    },
    {
      "buffer": 0,
      "byteOffset": 288,
      "byteLength": 288
    },
    {
      "buffer": 0,
      "byteOffset": 576,
      "byteLength": 192
    },
    {
      "buffer": 0,
      "byteOffset": 768,
      "byteLength": 72
    },
    {
      "buffer": 0,
      "byteOffset": 840,
      "byteLength": 2
    }
  ]

  |},
               ),
          state,
        );
      });

      describe("test texture", () =>
        testPromise("test source", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testAssembleResultByGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, rootGameObject)) =>
              AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     diffuseMap,
                     state,
                   )
                 )
              |> expect == [|"object_url1" |> Obj.magic|],
            state,
          );
        })
      );
    });

    describe("test CesiumMilkTruck glb", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
        "nodes": [
    {
      "name": "gameObject_0",
      "children": [
        1,
        3,
        5,
        6,
        7
      ]
    },
    {
      "name": "gameObject_3",
      "children": [
        2
      ],
      "translation": [
        1.432669997215271,
        0.4277220070362091,
        -2.98022992950564e-8
      ]
    },
    {
      "name": "Wheels",
      "rotation": [
        0,
        0,
        0.08848590403795242,
        -0.9960774183273315
      ],
      "mesh": 0,
      "extras": {
        "lightMaterial": 0
      }
    },
    {
      "name": "gameObject_1",
      "children": [
        4
      ],
      "translation": [
        -1.352329969406128,
        0.4277220070362091,
        -2.98022992950564e-8
      ]
    },
    {
      "name": "Wheels",
      "rotation": [
        0,
        0,
        0.08848590403795242,
        -0.9960774183273315
      ],
      "mesh": 0,
      "extras": {
        "lightMaterial": 0
      }
    },
    {
      "name": "Cesium_Milk_Truck_0",
      "mesh": 1,
      "extras": {
        "lightMaterial": 1
      }
    },
    {
      "name": "Cesium_Milk_Truck_1",
      "mesh": 2,
      "extras": {
        "lightMaterial": 2
      }
    },
    {
      "name": "Cesium_Milk_Truck_2",
      "mesh": 3,
      "extras": {
        "lightMaterial": 3
      }
    }
  ]

|},
               ),
          state,
        );
      });

      testPromise("test meshes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}]},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}]},{"primitives":[{"attributes":{"POSITION":8,"NORMAL":9},"indices":10}]},{"primitives":[{"attributes":{"POSITION":11,"NORMAL":12},"indices":13}]}]

          |},
               ),
          state,
        );
      });

      describe("test buffer", () =>
        testPromise("test data", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testAssembleResultByGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((state, rootGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state)
              |>
              expect == [|
                          (
                            "Cesium_Milk_Truck_0",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_0",
                               ),
                          ),
                          (
                            "Cesium_Milk_Truck_1",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_1",
                               ),
                          ),
                          (
                            "Cesium_Milk_Truck_2",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Cesium_Milk_Truck_2",
                               ),
                          ),
                          (
                            "Wheels",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Wheels",
                               ),
                          ),
                          (
                            "Wheels",
                            dataMap
                            |> WonderCommonlib.HashMapService.unsafeGet(
                                 "Wheels",
                               ),
                          ),
                        |];
            },
            state,
          );
        })
      );

      describe("test materials", () =>
        testPromise("test", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((gltf, binBuffer)) =>
              gltf
              |> GenerateSceneGraphSystemTool.contain(
                   {|  "materials": [
    {
      "name": "wheels",
      "pbrMetallicRoughness": {
        "baseColorTexture": {
          "index": 0
        }
      }
    },
    {
      "name": "truck",
      "pbrMetallicRoughness": {
        "baseColorTexture": {
          "index": 1
        }
      }
    },
    {
      "name": "glass",
      "pbrMetallicRoughness": {
        "baseColorFactor": [
          0,
          0.04050629958510399,
          0.021240700036287308,
          1
        ]
      }
    },
    {
      "name": "window_trim",
      "pbrMetallicRoughness": {
        "baseColorFactor": [
          0.06400000303983688,
          0.06400000303983688,
          0.06400000303983688,
          1
        ]
      }
    }
  ]
|},
                 ),
            state,
          );
        })
      );

      describe("test textures and samplers", () =>
        testPromise("test", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            ((gltf, binBuffer)) =>
              gltf
              |> GenerateSceneGraphSystemTool.contain(
                   {|
  "textures": [
    {
      "sampler": 0,
      "source": 0,
      "name": "texture_1"
    },
    {
      "sampler": 0,
      "source": 0,
      "name": "texture_0"
    }
  ],
  "samplers": [
    {
      "wrapS": 10497,
      "wrapT": 10497,
      "magFilter": 9729,
      "minFilter": 9986
    }
  ]
|},
                 ),
            state,
          );
        })
      );
    });

    describe("test AlphaBlendModeTest glb", () =>
      describe("test texture", () =>
        testPromise("test source", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testAssembleResultByGLB(
            sandbox^,
            GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
            ((state, rootGameObject)) =>
              AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     diffuseMap,
                     state,
                   )
                 )
              |>
              expect == [|
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url4" |> Obj.magic,
                          "object_url5" |> Obj.magic,
                        |],
            state,
          );
        })
      )
    );

    describe("test camera", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
            "nodes":[{"children":[1,2,3]},{"name":"gameObject_0","rotation":[-0.382999986410141,0,0,0.9237499833106995],"mesh":0,"extras":{"lightMaterial":0}},{"name":"gameObject_1","translation":[0.5,0.5,3],"camera":0},{"name":"gameObject_2","translation":[0.5,0.5,3]}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test meshes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0},"indices":1}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test accessors and bufferViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
            "bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":48},{"buffer":0,"byteOffset":48,"byteLength":12}],

            "accessors":[{"bufferView":0,"componentType":5126,"count":4,"type":"VEC3"},{"bufferView":1,"componentType":5123,"count":6,"type":"SCALAR"}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test cameras", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
            "cameras":[{"type":"perspective","perspective":{"aspectRatio":1,"zfar":100,"znear":0.01,"yfov":0.7}}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test scenes->extras->isActiveCameraIndex", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameraOfIsActiveCameraIndexExtras(),
          ~targetJsonStr=
            {|
              "extras":{"isActiveCameraIndex":2}
            |},
          ~state,
          (),
        );
      });

      describe("fix bug", () =>
        testPromise("test gltf->camera has no aspectRatio,zfar", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJson(
                ~nodes=
                  {| [
        {
            "mesh": 0,
            "camera": 0
        }
    ]|},
                ~cameras=
                  {|
[
        {
            "perspective": {
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        }
    ]
        |},
                (),
              ),
            ~targetJsonStr=
              {|
              "cameras":[{"type":"perspective","perspective":{"zfar":100000,"znear":1,"yfov":0.5999999999999999}}]
            |},
            ~state,
            (),
          );
        })
      );
    });

    describe("test light", () => {
      testPromise("test scene", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~targetJsonStr=
            {|
              "scenes":[{"extensions":{"KHR_lights":{"light":2}},"nodes":[0],"extras":{}}]
|},
          ~state,
          (),
        );
      });

      testPromise("test extensions", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~targetJsonStr=
            {|
  "extensions": {
    "KHR_lights": {
      "lights": [
        {
          "intensity": 1,
          "color": [
            0.5,
            0.5,
            1
          ],
          "type": "directional"
        },
        {
          "range": 55.5,
          "quadraticAttenuation": 0,
          "linearAttenuation": 1.5,
          "constantAttenuation": 1,
          "intensity": 2.5,
          "color": [
            0,
            0,
            0
          ],
          "type": "point"
        },
        {
          "color": [
            1,
            0.5,
            1
          ],
          "type": "ambient"
        }
      ]
    }
  },
|},
          ~state,
          (),
        );
      });

      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~targetJsonStr=
            {|
  "nodes": [
    {
      "name": "gameObject_0",
      "children": [
        1,
        2,
        3
      ]
    },
    {
      "name": "gameObject_1",
      "translation": [
        -1.352329969406128,
        0.4277220070362091,
        -2.98022992950564e-8
      ],
      "mesh": 0,
      "extras": {
        "lightMaterial": 0
      }
    },
    {
      "name": "gameObject_2",
      "translation": [
        10.5,
        0.4277220070362091,
        20.100000381469727
      ],
      "extensions": {
        "KHR_lights": {
          "light": 0
        }
      }
    },
    {
      "name": "gameObject_3",
      "translation": [
        2.5,
        0,
        -2.9000000953674316
      ],
      "rotation": [
        0,
        0,
        0,
        1.1180340051651
      ],
      "scale": [
        1,
        1,
        2
      ],
      "mesh": 0,
      "extras": {
        "lightMaterial": 0
      },
      "extensions": {
        "KHR_lights": {
          "light": 1
        }
      }
    }
  ],
|},
          ~state,
          (),
        );
      });
    });
  });