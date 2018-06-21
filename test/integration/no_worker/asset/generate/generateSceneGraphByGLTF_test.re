open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("generateSceneGraph by gltf", () => {
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
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test single node", () =>
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          {|"nodes":[{"name":"gameObject_0","translation":[10,20,30],"mesh":0,"extras":{"material":0}}]|},
          state,
        );
      })
    );

    describe("test truck", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
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
      "scale": [
        2,
        3.5,
        0.5
      ],
      "mesh": 0,
      "extras": {
        "material": 0
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
        "material": 0
      }
    },
    {
      "name": "Cesium_Milk_Truck_0",
      "mesh": 1,
      "extras": {
        "material": 1
      }
    },
    {
      "name": "Cesium_Milk_Truck_1",
      "mesh": 2,
      "extras": {
        "material": 2
      }
    },
    {
      "name": "Cesium_Milk_Truck_2",
      "mesh": 3,
      "extras": {
        "material": 3
      }
    }
  ]

|},
          state,
        );
      });

      testPromise("test meshes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
          {|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}]},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}]},{"primitives":[{"attributes":{"POSITION":8,"NORMAL":9},"indices":10}]},{"primitives":[{"attributes":{"POSITION":11,"NORMAL":12},"indices":13}]}]

          |},
          state,
        );
      });

      describe("test buffer", () =>
        testPromise("test data", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testAssembleResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            ((state, sceneGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDSystemTool.getAllGeometryData(sceneGameObject, state)
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

          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
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
            state,
          );
        })
      );

      describe("test textures and samplers", () =>
        testPromise("test", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            {|    "textures": [
    {
      "sampler": 0,
      "source": 0,
      "name": "texture0"
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
            state,
          );
        })
      );

      describe("test sources", () =>
        testPromise("test", () => {
          let (canvas, context, (base64Str1, base64Str2)) =
            GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            {j|"images":[{"uri":"$base64Str1"}]|j},
            state,
          );
        })
      );
    });

    describe("test camera", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          {|
            "nodes":[{"children":[1,2,3]},{"name":"gameObject_0","rotation":[-0.382999986410141,0,0,0.9237499833106995],"mesh":0,"extras":{"material":0}},{"name":"gameObject_1","translation":[0.5,0.5,3],"camera":0},{"name":"gameObject_2","translation":[0.5,0.5,3]}]
            |},
          state,
        );
      });

      testPromise("test meshes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          {|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0},"indices":1}]
            |},
          state,
        );
      });

      testPromise("test accessors and bufferViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          {|
            "bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":48},{"buffer":0,"byteOffset":48,"byteLength":12}],

            "accessors":[{"bufferView":0,"componentType":5126,"count":4,"type":"VEC3"},{"bufferView":1,"componentType":5123,"count":6,"type":"SCALAR"}]
            |},
          state,
        );
      });

      testPromise("test cameras", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfCameras(),
          {|
            "cameras":[{"type":"perspective","perspective":{"aspectRatio":1,"zfar":100,"znear":0.01,"yfov":0.7}}]
            |},
          state,
        );
      });

      describe("fix bug", () =>
        testPromise("test gltf->camera has no aspectRatio,zfar", () => {
          let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJson(
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
            {|
              "cameras":[{"type":"perspective","perspective":{"zfar":100000,"znear":1,"yfov":0.5999999999999999}}]
            |},
            state,
          );
        })
      );
    });
  });