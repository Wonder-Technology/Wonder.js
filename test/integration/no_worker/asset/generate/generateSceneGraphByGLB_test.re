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
              ~geometryPointCount=50000,
              ~geometryCount=30,
              (),
            ),
          (),
        );

      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test BoxTextured glb", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "nodes":[{"name":"gameObject_0","children":[1],"rotation":[-0.7071067690849304,0,0,0.7071067690849304], "extras":{"isRoot":true}},{"name":"Mesh","mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}}]
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
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "images":[{"name": "CesiumLogoFlat.png", "bufferView":4,"mimeType":"image/png"}]
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
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
"bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":288},{"buffer":0,"byteOffset":288,"byteLength":288},{"buffer":0,"byteOffset":576,"byteLength":192},{"buffer":0,"byteOffset":768,"byteLength":72},{"buffer":0,"byteOffset":840,"byteLength":227}]
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
            ((state, _, (rootGameObject, _))) =>
              AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     diffuseMap,
                     state,
                   )
                 )
              |> expect
              == [|
                   GLBTool.createFakeImage(
                     ~name="CesiumLogoFlat.png",
                     ~src="object_url1",
                     (),
                   ),
                 |],
            state,
          );
        })
      );
    });

    describe("test SuperLowPolyStove glb", () => {
      testPromise("test bufferViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
"bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":11472},{"buffer":0,"byteOffset":11472,"byteLength":11472},{"buffer":0,"byteOffset":22944,"byteLength":7648},{"buffer":0,"byteOffset":30592,"byteLength":20208},{"buffer":0,"byteOffset":50800,"byteLength":18048},{"buffer":0,"byteOffset":68848,"byteLength":18048},{"buffer":0,"byteOffset":86896,"byteLength":12032},{"buffer":0,"byteOffset":98928,"byteLength":19344},{"buffer":0,"byteOffset":118272,"byteLength":227},{"buffer":0,"byteOffset":118500,"byteLength":167}]
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
            GLBTool.buildGLBFilePath("SuperLowPolyStove.glb"),
            ((state, _, (rootGameObject, _))) => {
              let dataMap = GLTFTool.getSuperLowPolyStoveGeometryData();

              let allGeometryData =
                AssembleWDBSystemTool.getAllGeometryData(
                  rootGameObject,
                  state,
                );

              (allGeometryData |> Js.Array.length, allGeometryData[1])
              |> expect
              == (
                   2,
                   (
                     "Stove_1",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Stove_1",
                        ),
                   ),
                 );
            },
            state,
          );
        })
      );
    });

    describe("test CesiumMilkTruck glb", () => {
      testPromise("test imageResultUint8ArrayMap", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((_, imageResultUint8ArrayMap, _)) =>
            imageResultUint8ArrayMap
            |> expect
            == [|
                 BufferUtils.convertBase64ToBinary(
                   GenerateSceneGraphSystemTool.buildBase64Str1(),
                 ),
                 BufferUtils.convertBase64ToBinary(
                   GenerateSceneGraphSystemTool.buildBase64Str1(),
                 ),
               |],
          state,
        );
      });

      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
                  "nodes":[{"name":"gameObject_0","children":[1,3,5,6,7],"extras":{"isRoot":true}},{"name":"gameObject_3","children":[2],"translation":[1.432669997215271,0.4277220070362091,-2.98022992950564e-8]},{"name":"Wheels","rotation":[0,0,0.08848590403795242,-0.9960774183273315],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"name":"gameObject_1","children":[4],"translation":[-1.352329969406128,0.4277220070362091,-2.98022992950564e-8]},{"name":"Wheels","rotation":[0,0,0.08848590403795242,-0.9960774183273315],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":1}},{"name":"Cesium_Milk_Truck_0","mesh":1,"extras":{"lightMaterial":1,"meshRenderer":2}},{"name":"Cesium_Milk_Truck_1","mesh":2,"extras":{"lightMaterial":2,"meshRenderer":3}},{"name":"Cesium_Milk_Truck_2","mesh":3,"extras":{"lightMaterial":3,"meshRenderer":4}}]
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
          ((gltf, _, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}],"name":"Wheels"},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}],"name":"Cesium_Milk_Truck_0"},{"primitives":[{"attributes":{"POSITION":8,"NORMAL":9},"indices":10}],"name":"Cesium_Milk_Truck_1"},{"primitives":[{"attributes":{"POSITION":11,"NORMAL":12},"indices":13}],"name":"Cesium_Milk_Truck_2"}]
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
            ((state, _, (rootGameObject, _))) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state)
              |> expect
              == [|
                   (
                     "Cesium_Milk_Truck_0",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_0",
                        ),
                   ),
                   (
                     "Cesium_Milk_Truck_1",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_1",
                        ),
                   ),
                   (
                     "Cesium_Milk_Truck_2",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Cesium_Milk_Truck_2",
                        ),
                   ),
                   (
                     "Wheels",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
                          "Wheels",
                        ),
                   ),
                   (
                     "Wheels",
                     dataMap
                     |> WonderCommonlib.MutableHashMapService.unsafeGet(
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
            ((gltf, _, binBuffer)) =>
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
            ((gltf, _, binBuffer)) =>
              gltf
              |> GenerateSceneGraphSystemTool.contain(
                   {|
  "textures": [
    {
      "extras": {
        "flipY": false,
        "format": 1,
        "type_": 0
      },
      "sampler": 0,
      "source": 0,
      "name": "texture_1"
    },
    {
      "extras": {
        "flipY": false,
        "format": 1,
        "type_": 0
      },
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
            ((state, _, (rootGameObject, _))) =>
              AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     diffuseMap,
                     state,
                   )
                 )
              |> expect
              == [|
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_3",
                     ~src="object_url2",
                     (),
                   ),
                   GLBTool.createFakeImage(
                     ~name="image_2",
                     ~src="object_url3",
                     (),
                   ),
                 |],
            state,
          );
        })
      )
    );

    describe("test perspectiveCameraProjection", () => {
      testPromise("test scenes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
"scenes":[{"extensions":{"KHR_lights":{"light":0}},"nodes":[0],"extras":{}}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
          ~targetJsonStr=
            {|
,"nodes":[{"children":[1,2,3],"extras":{"isRoot":true}},{"name":"gameObject_0","rotation":[-0.382999986410141,0,0,0.9237499833106995],"mesh":0},{"name":"gameObject_1","translation":[0.5,0.5,3],"camera":0,"extras":{"basicCameraView":0}},{"name":"gameObject_2","translation":[0.5,0.5,3],"extras":{"basicCameraView":1}}]
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

    describe("test basicCameraView", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
          ~targetJsonStr=
            {|
              "nodes":[{"name":"gameObject_0","children":[1,2],"mesh":0,"camera":0,"extras":{"isRoot": true,"lightMaterial":0,"meshRenderer":0,"basicCameraView":0}},{"name":"gameObject_1","mesh":0,"camera":1,"extras":{"lightMaterial":0,"meshRenderer":1,"basicCameraView":1}},{"name":"gameObject_2","mesh":0,"extras":{"lightMaterial":0,"meshRenderer":2,"basicCameraView":2}}],
            |},
          ~state,
          (),
        );
      });

      testPromise("test extras->basicCameraViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
          ~targetJsonStr=
            {|
              "basicCameraViews":[{"isActive":true},{"isActive":false},{"isActive":false}]}
            |},
          ~state,
          (),
        );
      });

      testPromise("test cameras", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
          ~targetJsonStr=
            {|
              "cameras":[{"type":"perspective","perspective":{"aspectRatio":2,"zfar":1000,"znear":2,"yfov":0.5}},{"type":"perspective","perspective":{"zfar":100000,"znear":1,"yfov":0.5999999999999999}}]
            |},
          ~state,
          (),
        );
      });
    });

    describe("test meshRenderer", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfMeshRenderer(),
          ~targetJsonStr=
            {|
"nodes":[{"name":"gameObject_0","mesh":0,"extras":{"isRoot":true,"lightMaterial":0,"meshRenderer":0}}]
            |},
          ~state,
          (),
        );
      });

      testPromise("test extras->meshRenderers", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfMeshRenderer(
              ~isMeshRenderer2Render=false,
              (),
            ),
          ~targetJsonStr=
            {|
"meshRenderers":[{"isRender":false,"drawMode":3}]
            |},
          ~state,
          (),
        );
      });
    });

    describe("test script", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfScript(),
          ~targetJsonStr=
            {|
  "nodes": [
    {
      "name": "gameObject_0",
      "mesh": 0,
      "extras": {
        "isRoot": true,
        "lightMaterial": 0,
        "script": 0,
        "meshRenderer": 0
      }
    }
  ]
            |},
          ~state,
          (),
        );
      });

      testPromise("test extras->scripts", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfScript(~isActive=false, ()),
          ~targetJsonStr=
            "\"scripts\":[{\"isActive\":false,\"eventFunctionDataMap\":{\"eventFunctionData\":[\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nvarunsafeGetScriptAttributeFieldValue=api.unsafeGetScriptAttributeFieldValue;\\nvarsetScriptAttributeFieldValue=api.setScriptAttributeFieldValue;\\nreturnsetScriptAttributeFieldValue(script,\\n/*tuple*/\\n[scriptAttributeName,\\\"a\\\",unsafeGetScriptAttributeFieldValue(\\\"a\\\",scriptAttribute)+1|0],state);\\n}\",\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nvarunsafeGetScriptAttributeFieldValue=api.unsafeGetScriptAttributeFieldValue;\\nvarsetScriptAttributeFieldValue=api.setScriptAttributeFieldValue;\\nreturnsetScriptAttributeFieldValue(script,\\n/*tuple*/\\n[scriptAttributeName,\\\"a\\\",unsafeGetScriptAttributeFieldValue(\\\"a\\\",scriptAttribute)+1|0],state);\\n}\",null]},\"attributeMap\":{\"scriptAttribute\":{\"a\":[0,1,1],\"b\":[1,0.1,0.1]}}}]",
          ~state,
          (),
        );
      });
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
              "nodes":[{"name":"gameObject_0","children":[1,2,3],"extras":{"isRoot":true}},{"name":"gameObject_1","translation":[-1.352329969406128,0.4277220070362091,-2.98022992950564e-8],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"name":"gameObject_2","translation":[10.5,0.4277220070362091,20.100000381469727],"extensions":{"KHR_lights":{"light":0}}},{"name":"gameObject_3","translation":[2.5,0,-2.9000000953674316],"rotation":[0,0,0,1.1180340051651],"scale":[1,1,2],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":1},"extensions":{"KHR_lights":{"light":1}}}],
|},
          ~state,
          (),
        );
      });
    });
  });