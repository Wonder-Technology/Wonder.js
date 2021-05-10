open Wonder_jest;

open Js.Promise;

open WDType;

open Js.Typed_array;

let _ =
  describe("convert glb to wd", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test multi primitives", () => {
      describe("convert multi primitives to gltf nodes", () => {
        let _prepare = () => {
          let gltf =
            ConvertGLTFJsonToRecordSystem.convert(
              ConvertGLBTool.buildGLTFJsonOfMultiPrimitivesWithName()
              |> Js.Json.parseExn,
            );
          ConvertMultiPrimitivesSystem.convertMultiPrimitivesToNodes(gltf);
        };

        test("test nodes", () => {
          open GLTFType;
          let gltfRecord = _prepare();
          gltfRecord.nodes
          |> expect
          == [|
               ConvertGLBTool.buildNode(
                 ~children=Some([|3, 2, 1, 4, 5|]),
                 (),
               ),
               ConvertGLBTool.buildNode(
                 ~name=Some("node1"),
                 ~mesh=Some(1),
                 ~matrix=
                   Some([|
                     1.0,
                     0.0,
                     0.0,
                     0.0,
                     0.0,
                     1.0,
                     0.0,
                     0.0,
                     0.0,
                     0.0,
                     1.0,
                     0.0,
                     10.0,
                     30.0,
                     50.0,
                     1.0,
                   |]),
                 (),
               ),
               ConvertGLBTool.buildNode(
                 ~name=Some("node2"),
                 ~children=Some([|1, 6, 7|]),
                 ~matrix=
                   Some([|
                     1.0,
                     0.0,
                     0.0,
                     0.0,
                     0.0,
                     1.0,
                     0.0,
                     0.0,
                     0.0,
                     0.0,
                     1.0,
                     0.0,
                     1.0,
                     2.0,
                     3.0,
                     1.0,
                   |]),
                 (),
               ),
               ConvertGLBTool.buildNode(~children=Some([|8, 9|]), ()),
               ConvertGLBTool.buildNode(~mesh=Some(3), ()),
               ConvertGLBTool.buildNode(~mesh=Some(4), ()),
               ConvertGLBTool.buildNode(
                 ~name=Some("node2_0"),
                 ~mesh=Some(3),
                 (),
               ),
               ConvertGLBTool.buildNode(
                 ~name=Some("node2_1"),
                 ~mesh=Some(4),
                 (),
               ),
               ConvertGLBTool.buildNode(~mesh=Some(5), ()),
               ConvertGLBTool.buildNode(~mesh=Some(6), ()),
             |];
        });
        test("test meshes", () => {
          open GLTFType;
          let gltfRecord = _prepare();
          gltfRecord.meshes
          |> expect
          == [|
               {
                 name: Some("mesh0"),
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 2,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(0),
                     ~material=Some(0),
                     (),
                   ),
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 6,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(4),
                     ~material=Some(1),
                     (),
                   ),
                 |],
               },
               {
                 name: None,
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 9,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(7),
                     ~material=Some(2),
                     (),
                   ),
                 |],
               },
               {
                 name: None,
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 10,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(8),
                     ~material=Some(2),
                     (),
                   ),
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 6,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(4),
                     ~material=Some(1),
                     (),
                   ),
                 |],
               },
               {
                 name: Some("mesh0_0"),
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 2,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(0),
                     ~material=Some(0),
                     (),
                   ),
                 |],
               },
               {
                 name: Some("mesh0_1"),
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 6,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(4),
                     ~material=Some(1),
                     (),
                   ),
                 |],
               },
               {
                 name: None,
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 10,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(8),
                     ~material=Some(2),
                     (),
                   ),
                 |],
               },
               {
                 name: None,
                 primitives: [|
                   ConvertGLBTool.buildPrimitive(
                     ~attributes={
                       position: 6,
                       normal: None,
                       texCoord_0: None,
                       texCoord_1: None,
                     },
                     ~indices=Some(4),
                     ~material=Some(1),
                     (),
                   ),
                 |],
               },
             |];
        });
      });

      describe("test convert to wdb", () => {
        test("test geometrys", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
            ~state,
            ~testFunc=
              ({geometrys, images}) =>
                geometrys
                |> expect
                == [|
                     ConvertTool.getJsonSerializedNone(),
                     Some({
                       name: "geometry_1",
                       position: 0,
                       normal: ConvertTool.getJsonSerializedNone(),
                       texCoord: ConvertTool.getJsonSerializedNone(),
                       index: 1,
                     }),
                     Some({
                       name: "geometry_2",
                       position: 2,
                       normal: ConvertTool.getJsonSerializedNone(),
                       texCoord: ConvertTool.getJsonSerializedNone(),
                       index: 3,
                     }),
                     Some({
                       name: "geometry_3",
                       position: 4,
                       normal: ConvertTool.getJsonSerializedNone(),
                       texCoord: ConvertTool.getJsonSerializedNone(),
                       index: 5,
                     }),
                   |],
            (),
          )
        );

        test("test meshRenderers", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
            ~state,
            ~testFunc=
              ({meshRenderers}) =>
                meshRenderers
                |> expect
                == [|
                     Some({drawMode: DrawModeType.Triangles, isRender: true}),
                     Some({drawMode: DrawModeType.Triangles, isRender: true}),
                     Some({drawMode: DrawModeType.Triangles, isRender: true}),
                     Some({drawMode: DrawModeType.Triangles, isRender: true}),
                     Some({drawMode: DrawModeType.Triangles, isRender: true}),
                   |],
            (),
          )
        );

        describe("test gameObjects", () =>
          test("test count", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
              ~state,
              ~testFunc=({gameObjects}) => gameObjects.count |> expect == 7,
              (),
            )
          )
        );

        describe("test indices", () =>
          describe("test gameObjectIndices", () => {
            describe("test geometryGameObjectIndices", () =>
              test(
                "test multi primitives geometry should has no gameObject", () =>
                ConvertGLBTool.testGLTFResultByGLTF(
                  ~sandbox=sandbox^,
                  ~embeddedGLTFJsonStr=
                    ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
                  ~state,
                  ~testFunc=
                    ({indices}) =>
                      indices.gameObjectIndices.geometryGameObjectIndexData
                      |> expect
                      == {
                           gameObjectIndices: [|1, 3, 4, 5, 6|],
                           componentIndices: [|1, 2, 3, 2, 3|],
                         },
                  (),
                )
              )
            );

            describe("test meshRendererGameObjectIndices", () =>
              test(
                "test multi primitives corresponding meshRenderer should has no gameObject",
                () =>
                ConvertGLBTool.testGLTFResultByGLTF(
                  ~sandbox=sandbox^,
                  ~embeddedGLTFJsonStr=
                    ConvertGLBTool.buildGLTFJsonOfMultiPrimitives(),
                  ~state,
                  ~testFunc=
                    ({indices}) =>
                      indices.gameObjectIndices.meshRendererGameObjectIndexData
                      |> expect
                      == {
                           gameObjectIndices: [|1, 3, 4, 5, 6|],
                           componentIndices: [|0, 1, 2, 3, 4|],
                         },
                  (),
                )
              )
            );
          })
        );
      });
    });

    /* describe("test set default material", () => {
           describe("test if node has any one material extras", () =>
             test("not add default lightMaterial", () =>
               ConvertGLBTool.testGLTFResultByGLTF(
                 ~sandbox=sandbox^,
                 ~embeddedGLTFJsonStr=
                   ConvertGLBTool.buildGLTFJson(
                     ~nodes=
                       {|[
         {
           "mesh" : 0,
           "extras": {
             "lightMaterial": 0
           }
         }
       ] |},
                     ~materials=
                       {|[
             {
                 "pbrMetallicRoughness": {
                 },
                 "name": "material"
             }
         ]|},
                     ~meshes=
                       {|[
         {
           "primitives" : [ {
             "attributes" : {
               "POSITION" : 1
             },
             "indices" : 0
           } ]
         }
       ]|},
                     (),
                   ),
                 ~state,
                 ~testFunc=
                   ({lightMaterials}) =>
                     lightMaterials[0].name |> expect == "material",
                 (),
               )
             )
           );

           describe("else, if mesh has no material", () => {
             test("add default lightMaterial", () =>
               ConvertGLBTool.testGLTFResultByGLTF(
                 ~sandbox=sandbox^,
                 ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
                 ~state,
                 ~testFunc=
                   ({lightMaterials}) =>
                     lightMaterials
                     |>
                     expect == [|
                                 {
                                   diffuseColor:
                                     ConvertGLBTool.getDefaultDiffuseColor(),
                                   name: "defaultLightMaterial",
                                 },
                               |],
                 (),
               )
             );
             test("test geometrys", () =>
               ConvertGLBTool.testGLTFResultByGLTF(
                 ~sandbox=sandbox^,
                 ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
                 ~state,
                 ~testFunc=
                   ({geometrys}) =>
                     geometrys
                     |>
                     expect == [|
                                 Some({
                                   name: "geometry_0",
                                   position: 0,
                                   normal: ConvertTool.getJsonSerializedNone(),
                                   texCoord: ConvertTool.getJsonSerializedNone(),
                                   index: 1,
                                 }),
                               |],
                 (),
               )
             );
             test("test default material's lightMaterialGameObjectIndexData", () =>
               ConvertGLBTool.testGLTFResultByGLTF(
                 ~sandbox=sandbox^,
                 ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCameras(),
                 ~state,
                 ~testFunc=
                   ({indices}) =>
                     indices.gameObjectIndices.lightMaterialGameObjectIndexData
                     |>
                     expect == ConvertGLBTool.buildComponentIndexData(
                                 [|0|],
                                 [|0|],
                               ),
                 (),
               )
             );
           });
         }); */

    test("test asset", () =>
      ConvertGLBTool.testGLTFResultByGLTF(
        ~sandbox=sandbox^,
        ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
        ~state,
        ~testFunc=
          ({asset}) =>
            asset |> expect == {version: "2.0", generator: "GLTF2WD"},
        (),
      )
    );

    describe("test scene", () => {
      test("test gameObjects", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=({scene}) => scene.gameObjects |> expect == [|0|],
          (),
        )
      );
      test("test ambientLight", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({scene}) =>
              scene.ambientLight |> expect == Some({color: [|1., 0.5, 1.|]}),
          (),
        )
      );
      test("test imgui", () => {
        let execFuncName = "e1";
        let customData = {|[1,2]|};
        let execFunc = ExecIMGUITool.buildEmptyExecFuncStr();
        let execData =
          ConvertGLBTool.buildExecDataToOneExecFuncData(
            ~name=execFuncName,
            ~customData,
            ~func=execFunc,
            (),
          );
        let assetData =
          ConvertGLBTool.buildAssetData(
            ~fntName="fnt",
            ~fntContent="aaa",
            ~bitmapName="bbb",
            ~bitmapBufferView=0,
            ~customImages=[||],
            (),
          );
        let extendData =
          ConvertGLBTool.buildExtendData(
            ~funcMap=
              WonderCommonlib.ImmutableHashMapService.createEmpty()
              |> WonderCommonlib.ImmutableHashMapService.set(
                   "c1",
                   IMGUITool.buildEmptyCustomControlFunc(),
                 ),
            ~allSkinDataMap=
              WonderCommonlib.ImmutableHashMapService.createEmpty()
              |> WonderCommonlib.ImmutableHashMapService.set(
                   "s1",
                   ExtendIMGUIMainService.ExtendData.Skin.createDefaultSkinData(),
                 ),
            (),
          );

        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfIMGUI(
              ~execData,
              ~extendData,
              ~assetData,
              (),
            ),
          ~state,
          ~testFunc=
            ({scene}) =>
              scene.imgui
              |> expect
              == Some({
                   execData:
                     SceneGraphIMGUITool.buildExecDataToOneExecFuncData(
                       ~name=execFuncName,
                       ~customData=
                         customData
                         |> Obj.magic
                         |> Js.Json.parseExn
                         |> Obj.magic,
                       ~func=ExecIMGUITool.buildEmptyExecFunc(),
                       (),
                     ),
                   extendData:
                     SceneGraphIMGUITool.buildExtendData(
                       ~funcMap=
                         WonderCommonlib.ImmutableHashMapService.createEmpty()
                         |> WonderCommonlib.ImmutableHashMapService.set(
                              "c1",
                              IMGUITool.buildEmptyCustomControlFunc(),
                            ),
                       ~allSkinDataMap=
                         WonderCommonlib.ImmutableHashMapService.createEmpty()
                         |> WonderCommonlib.ImmutableHashMapService.set(
                              "s1",
                              ExtendIMGUIMainService.ExtendData.Skin.createDefaultSkinData(),
                            ),
                       (),
                     ),
                   assetData:
                     SceneGraphIMGUITool.buildAssetData(
                       ~fntName="fnt",
                       ~fntContent="aaa",
                       ~bitmapName="bbb",
                       ~bitmapBufferView=0,
                       ~customImages=[||],
                       (),
                     ),
                 }),
          (),
        );
      });
      test("test skybox", () => {
        let cubemap = 0;

        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJsonOfSkyboxAndOneCubemap(~cubemap=0, ()),
          ~state,
          ~testFunc=
            ({scene}) => scene.skybox |> expect == Some({cubemap: cubemap}),
          (),
        );
      });

      describe("test isRoot", () => {
        test("if not has extras, set true", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=({scene}) => scene.isRoot |> expect == true,
            (),
          )
        );

        describe("else", () => {
          test("if extras has no isRoot, set true", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfIMGUI(),
              ~state,
              ~testFunc=({scene}) => scene.isRoot |> expect == true,
              (),
            )
          );
          test("else, set it", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfSceneIsRoot(true),
              ~state,
              ~testFunc=({scene}) => scene.isRoot |> expect == true,
              (),
            )
          );
        });

        describe("test truck glb", () =>
          test("scene->isRoot should be true", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({scene}, binBuffer)) =>
              scene.isRoot |> expect == true
            )
          )
        );
      });
    });

    describe("test directionLights", () =>
      test("test light gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({directionLights}) =>
              directionLights
              |> expect == [|{color: [|0.5, 0.5, 1.|], intensity: 1.}|],
          (),
        )
      )
    );

    describe("test pointLights", () =>
      test("test light gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
          ~state,
          ~testFunc=
            ({pointLights}) =>
              pointLights
              |> expect
              == [|
                   {
                     color: [|0., 0., 0.|],
                     intensity: 2.5,
                     constantAttenuation: 1.,
                     linearAttenuation: 1.5,
                     quadraticAttenuation: 0.,
                     range: 55.5,
                   },
                 |],
          (),
        )
      )
    );

    describe("test gameObjects", () => {
      test("test single node gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({gameObjects}) =>
              gameObjects
              |> expect
              == {
                   count: 1,
                   names: [|"gameObject_0"|],
                   isActives:
                     WonderCommonlib.MutableSparseMapService.createEmpty(),
                   isRoots:
                     WonderCommonlib.MutableSparseMapService.createEmpty(),
                 },
          (),
        )
      );
      test("test truck glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
          (({gameObjects}, binBuffer)) =>
          gameObjects
          |> expect
          == {
               count: 8,
               names: [|
                 "gameObject_0",
                 "gameObject_1",
                 "Wheels",
                 "gameObject_3",
                 "Wheels",
                 "Cesium_Milk_Truck_0",
                 "Cesium_Milk_Truck_1",
                 "Cesium_Milk_Truck_2",
               |],
               isActives:
                 WonderCommonlib.MutableSparseMapService.createEmpty(),
               isRoots: WonderCommonlib.MutableSparseMapService.createEmpty(),
             }
        )
      );

      describe("test isActive", () =>
        test("if extras has isActive, set it", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfNodeIsActive(true),
            ~state,
            ~testFunc=
              ({gameObjects}) =>
                gameObjects.isActives
                |> expect == MutableSparseMapTool.createByArr([|true, true|]),
            (),
          )
        )
      );

      describe("test isRoot", () =>
        test("if extras has isRoot, set it", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfNodeIsRoot(true),
            ~state,
            ~testFunc=
              ({gameObjects}) =>
                gameObjects.isRoots
                |> expect == MutableSparseMapTool.createByArr([|true, true|]),
            (),
          )
        )
      );
    });

    describe("test camera data", () => {
      describe("test basicCameraViews", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({basicCameraViews}) => basicCameraViews |> expect == [||],
            (),
          )
        );

        describe("test has data", () => {
          test("default isActiveIndex is 0", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ({basicCameraViews}) =>
                  basicCameraViews
                  |> expect
                  == [|
                       {isActive: true},
                       {isActive: false},
                       {isActive: false},
                     |],
              (),
            )
          );
          test("test extras", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
              ~state,
              ~testFunc=
                ({basicCameraViews}) =>
                  basicCameraViews
                  |> expect
                  == [|
                       {isActive: false},
                       {isActive: true},
                       {isActive: false},
                     |],
              (),
            )
          );
        });
      });
      describe("test perspectiveCameraProjections", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({perspectiveCameraProjections}) =>
                perspectiveCameraProjections |> expect == [||],
            (),
          )
        );
        test("test has data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
            ~state,
            ~testFunc=
              ({perspectiveCameraProjections}) =>
                perspectiveCameraProjections
                |> expect
                == [|
                     {
                       near: 1.0,
                       far: ConvertTool.getJsonSerializedNone(),
                       aspect: ConvertTool.getJsonSerializedNone(),
                       fovy: 34.37746770784939,
                     },
                     {
                       near: 2.0,
                       far: Some(1000.0),
                       aspect: Some(2.0),
                       fovy: 28.64788975654116,
                     },
                   |],
            (),
          )
        );
      });
    });

    describe("test cameraController data", () => {
      describe("test flyCameraControllers", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({flyCameraControllers}) =>
                flyCameraControllers |> expect == [||],
            (),
          )
        );
        test("test has data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfFlyCameraController(),
            ~state,
            ~testFunc=
              ({flyCameraControllers}) =>
                flyCameraControllers
                |> expect
                == [|
                     {
                       moveSpeed: 2.1,
                       rotateSpeed: 2.3,
                       wheelSpeed: 3.9,
                       isBindEvent: true,
                     },
                   |],
            (),
          )
        );
      });
      describe("test arcballCameraControllers", () => {
        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({arcballCameraControllers}) =>
                arcballCameraControllers |> expect == [||],
            (),
          )
        );
        test("test has data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfArcballCameraController(),
            ~state,
            ~testFunc=
              ({arcballCameraControllers}) =>
                arcballCameraControllers
                |> expect
                == [|
                     {
                       distance: 1.5,
                       minDistance: 1.,
                       phi: 0.8,
                       theta: 0.6,
                       thetaMargin: 1.5,
                       target: (0.0, 0.5, 0.1),
                       moveSpeedX: 2.1,
                       moveSpeedY: 3.1,
                       rotateSpeed: 0.3,
                       wheelSpeed: 0.9,
                       isBindEvent: true,
                     },
                   |],
            (),
          )
        );
      });
    });

    describe("test script data", () =>
      describe("test scripts", () => {
        describe("test isActive", () => {
          test("test is active", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfScript(
                  ~isActive=true,
                  ~eventFunctionDataMap=None,
                  ~attributeMap=None,
                  (),
                ),
              ~state,
              ~testFunc=
                ({scripts}) =>
                  scripts
                  |> expect
                  == [|ConvertGLBTool.buildScript(~isActive=true, ())|],
              (),
            )
          );
          test("test is not active", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfScript(
                  ~isActive=false,
                  ~eventFunctionDataMap=None,
                  ~attributeMap=None,
                  (),
                ),
              ~state,
              ~testFunc=
                ({scripts}) =>
                  scripts
                  |> expect
                  == [|ConvertGLBTool.buildScript(~isActive=false, ())|],
              (),
            )
          );
        });

        test("test no data", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=({scripts}) => scripts |> expect == [||],
            (),
          )
        );

        describe("test has data", () => {
          test("test only has event function data", () => {
            let eventFunctionDataMap =
              SceneGraphScriptTool.buildEventFunctionDataMap();
            let eventFunctionDataMapStr =
              ConvertScriptDataUtils._convertEventFunctionDataMapToStr(
                eventFunctionDataMap,
              );

            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfScript(
                  ~eventFunctionDataMap=Some(eventFunctionDataMap),
                  ~attributeMap=None,
                  (),
                ),
              ~state,
              ~testFunc=
                ({scripts}) =>
                  scripts
                  |> expect
                  == [|
                       ConvertGLBTool.buildScript(
                         ~eventFunctionDataMap=
                           eventFunctionDataMapStr
                           |> Js.Json.parseExn
                           |> Obj.magic,
                         (),
                       ),
                     |],
              (),
            );
          });
          test("test has event function data and attribute data", () => {
            let eventFunctionDataMap =
              SceneGraphScriptTool.buildEventFunctionDataMap();
            let attributeMap = SceneGraphScriptTool.buildAttributeMap();
            let eventFunctionDataMapStr =
              ConvertScriptDataUtils._convertEventFunctionDataMapToStr(
                eventFunctionDataMap,
              );
            let attributeMapStr =
              ConvertScriptDataUtils._convertAttributeMapToStr(attributeMap);

            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfScript(
                  ~eventFunctionDataMap=Some(eventFunctionDataMap),
                  ~attributeMap=Some(attributeMap),
                  (),
                ),
              ~state,
              ~testFunc=
                ({scripts}) =>
                  scripts
                  |> expect
                  == [|
                       ConvertGLBTool.buildScript(
                         ~eventFunctionDataMap=
                           eventFunctionDataMapStr
                           |> Js.Json.parseExn
                           |> Obj.magic,
                         ~attributeMap=
                           attributeMapStr |> Js.Json.parseExn |> Obj.magic,
                         (),
                       ),
                     |],
              (),
            );
          });
        });
      })
    );

    describe("test transforms", () => {
      test("test matrix exist", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({transforms}) =>
              transforms
              |> expect
              == [|
                   {
                     translation: Some((10., 20., 30.)),
                     rotation: Some((0., 0., 0., 1.)),
                     scale: Some((1., 1., 1.)),
                   },
                 |],
          (),
        )
      );
      test("test transform gltf", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfTransform(),
          ~state,
          ~testFunc=
            ({transforms}) =>
              transforms
              |> expect
              == [|
                   {
                     translation: Some((11., 0.5, (-10.5))),
                     rotation: ConvertTool.getJsonSerializedNone(),
                     scale: ConvertTool.getJsonSerializedNone(),
                   },
                   {
                     translation: Some((10., 30., 50.)),
                     rotation: Some((0., 0., 0., 1.)),
                     scale: Some((1., 1., 1.)),
                   },
                   {
                     translation: ConvertTool.getJsonSerializedNone(),
                     rotation: Some((1., 0.1, 1.5, 0.5)),
                     scale: Some((2.5, 2.5, 3.)),
                   },
                 |],
          (),
        )
      );

      describe("fix bug", () =>
        test("fix get rotation bug", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJson(
                ~nodes=
                  {| [
        {
            "matrix": [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            -1.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0
          ]
        }
    ]|},
                (),
              ),
            ~state,
            ~testFunc=
              ({transforms}) =>
                transforms
                |> expect
                == [|
                     {
                       translation: Some((0., 0., 0.)),
                       rotation:
                         Some((
                           (-0.7071067811865475),
                           0.,
                           0.,
                           0.7071067811865476,
                         )),
                       scale: Some((1., 1., 1.)),
                     },
                   |],
            (),
          )
        )
      );
    });

    describe("test basicMaterials", () => {
      test("test no data", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJson(
              ~nodes=
                {| [
        {
            "mesh": 0,
            "extras": {
                "basicMaterial": 0
            }
        }
    ]|},
              ~basicMaterials={j|
[
        {
        }
    ]
        |j},
              (),
            ),
          ~state,
          ~testFunc=
            ({basicMaterials}) =>
              basicMaterials
              |> expect
              == [|
                   {
                     color: ConvertGLBTool.getDefaultDiffuseColor(),
                     name: "basicMaterial_0",
                   },
                 |],
          (),
        )
      );

      describe("test has data", () =>
        test("only set r,g,b components, ignore alpha component", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfBasicMaterial(
                ~colorFactor=[|0.1, 0.2, 0.3, 0.4|],
                ~name="name",
                (),
              ),
            ~state,
            ~testFunc=
              ({basicMaterials}) =>
                basicMaterials
                |> expect == [|{color: [|0.1, 0.2, 0.3|], name: "name"}|],
            (),
          )
        )
      );
    });

    describe("test lightMaterials", () => {
      test("test no data", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({lightMaterials}, _)) =>
          lightMaterials
          |> expect
          == [|
               {
                 diffuseColor: ConvertGLBTool.getDefaultDiffuseColor(),
                 name: "Texture",
               },
             |]
        )
      );
      describe("test has data", () =>
        test("only set r,g,b components, ignore alpha component", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            (({lightMaterials}, binBuffer)) =>
            lightMaterials
            |> expect
            == [|
                 {
                   diffuseColor: ConvertGLBTool.getDefaultDiffuseColor(),
                   name: "truck",
                 },
                 {
                   diffuseColor: [|
                     0.0,
                     0.04050629958510399,
                     0.021240700036287309,
                   |],
                   name: "glass",
                 },
                 {
                   diffuseColor: [|
                     0.06400000303983689,
                     0.06400000303983689,
                     0.06400000303983689,
                   |],
                   name: "window_trim",
                 },
                 {
                   diffuseColor: ConvertGLBTool.getDefaultDiffuseColor(),
                   name: "wheels",
                 },
               |]
          )
        )
      );
    });

    describe("test basicSourceTextures", () => {
      describe("test flipY", () => {
        test("if not has extras, set false", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            (({basicSourceTextures}, binBuffer)) =>
            basicSourceTextures
            |> expect
            == [|ConvertGLBTool.buildBasicSourceTexture(~flipY=false, ())|]
          )
        );

        test("else, set from it", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfBasicSourceTexture(
                ~flipY=true,
                (),
              ),
            ~state,
            ~testFunc=
              ({basicSourceTextures}) =>
                basicSourceTextures
                |> expect
                == [|
                     ConvertGLBTool.buildBasicSourceTexture(~flipY=true, ()),
                   |],
            (),
          )
        );
      });

      describe("test format", () => {
        test("if not has extras, set format by source->mime type", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            (({basicSourceTextures}, binBuffer)) =>
            basicSourceTextures
            |> expect
            == [|
                 ConvertGLBTool.buildBasicSourceTexture(
                   ~format=TextureType.Rgba,
                   (),
                 ),
               |]
          )
        );

        test("else, set from it", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfBasicSourceTexture(
                ~format=TextureType.Rgbas3tcdxt1,
                (),
              ),
            ~state,
            ~testFunc=
              ({basicSourceTextures}) =>
                basicSourceTextures
                |> expect
                == [|
                     ConvertGLBTool.buildBasicSourceTexture(
                       ~format=TextureType.Rgbas3tcdxt1,
                       (),
                     ),
                   |],
            (),
          )
        );
      });

      describe("test type", () => {
        test("if not has extras, set to 0", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("BoxTextured.glb"),
            (({basicSourceTextures}, binBuffer)) =>
            basicSourceTextures
            |> expect
            == [|ConvertGLBTool.buildBasicSourceTexture(~type_=0, ())|]
          )
        );

        test("else, set from it", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfBasicSourceTexture(~type_=2, ()),
            ~state,
            ~testFunc=
              ({basicSourceTextures}) =>
                basicSourceTextures
                |> expect
                == [|ConvertGLBTool.buildBasicSourceTexture(~type_=2, ())|],
            (),
          )
        );
      });

      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({basicSourceTextures}, binBuffer)) =>
          basicSourceTextures
          |> expect
          == [|ConvertGLBTool.buildBasicSourceTexture(~flipY=false, ())|]
        )
      );
      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({basicSourceTextures}, binBuffer)) =>
          basicSourceTextures
          |> expect
          == [|
               ConvertTool.getJsonSerializedNone(),
               ConvertTool.getJsonSerializedNone(),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_2",
                 ~format=TextureType.Rgb,
                 ~flipY=false,
                 (),
               ),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_3",
                 ~format=TextureType.Rgba,
                 ~flipY=false,
                 (),
               ),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_4",
                 ~format=TextureType.Rgba,
                 ~flipY=false,
                 (),
               ),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_5",
                 ~format=TextureType.Rgba,
                 ~flipY=false,
                 (),
               ),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_6",
                 ~format=TextureType.Rgba,
                 ~flipY=false,
                 (),
               ),
               ConvertGLBTool.buildBasicSourceTexture(
                 ~name="basicSourceTexture_7",
                 ~format=TextureType.Rgba,
                 ~flipY=false,
                 (),
               ),
             |]
        )
      );
    });

    describe("test cubemapTextures", () => {
      test("if not has extras, not has cubemapTexture data", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({cubemapTextures}, binBuffer)) =>
          cubemapTextures |> expect == [||]
        )
      );

      describe("else", () => {
        describe("test name", () => {
          test("if has no name, set to default", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfCubemapTexture(~name=None, ()),
              ~state,
              ~testFunc=
                ({cubemapTextures}) =>
                  cubemapTextures
                  |> expect
                  == [|
                       ConvertGLBTool.buildCubemapTexture(
                         ~name=ConvertCommon.buildDefaultCubemapTextureName(),
                         (),
                       ),
                     |],
              (),
            )
          );
          test("else, set to it", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfCubemapTexture(
                  ~name=Some("aaa"),
                  (),
                ),
              ~state,
              ~testFunc=
                ({cubemapTextures}) =>
                  cubemapTextures
                  |> expect
                  == [|ConvertGLBTool.buildCubemapTexture(~name="aaa", ())|],
              (),
            )
          );
        });

        test("test flipY", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=
              ConvertGLBTool.buildGLTFJsonOfCubemapTexture(~flipY=true, ()),
            ~state,
            ~testFunc=
              ({cubemapTextures}) =>
                cubemapTextures
                |> expect
                == [|ConvertGLBTool.buildCubemapTexture(~flipY=true, ())|],
            (),
          )
        );

        describe("test format", () =>
          test("test", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfCubemapTexture(
                  ~pxFormat=BufferCubemapTextureService.getDefaultFormat(),
                  ~nxFormat=TextureType.Rgb,
                  ~pyFormat=TextureType.Alpha,
                  ~nyFormat=TextureType.Alpha,
                  ~pzFormat=TextureType.Alpha,
                  ~nzFormat=TextureType.Alpha,
                  (),
                ),
              ~state,
              ~testFunc=
                ({cubemapTextures}) =>
                  cubemapTextures
                  |> expect
                  == [|
                       ConvertGLBTool.buildCubemapTexture(
                         ~pxFormat=
                           BufferCubemapTextureService.getDefaultFormat(),
                         ~nxFormat=TextureType.Rgb,
                         ~pyFormat=TextureType.Alpha,
                         ~nyFormat=TextureType.Alpha,
                         ~pzFormat=TextureType.Alpha,
                         ~nzFormat=TextureType.Alpha,
                         (),
                       ),
                     |],
              (),
            )
          )
        );

        describe("test type", () =>
          test("test", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfCubemapTexture(
                  ~nxType=0,
                  ~pyType=0,
                  ~nyType=1,
                  ~pzType=2,
                  ~nzType=1,
                  (),
                ),
              ~state,
              ~testFunc=
                ({cubemapTextures}) =>
                  cubemapTextures
                  |> expect
                  == [|
                       ConvertGLBTool.buildCubemapTexture(
                         ~pxType=BufferCubemapTextureService.getDefaultType(),
                         ~nxType=0,
                         ~pyType=0,
                         ~nyType=1,
                         ~pzType=2,
                         ~nzType=1,
                         (),
                       ),
                     |],
              (),
            )
          )
        );
      });
    });

    describe("test samplers", () =>
      test("test", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({samplers}, _)) =>
          samplers
          |> expect
          == [|
               {
                 magFilter: Linear,
                 minFilter: Nearest_mipmap_linear,
                 wrapS: Repeat,
                 wrapT: Repeat,
               },
             |]
        )
      )
    );

    describe("test images", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images
            |> expect
            == [|
                 {
                   name: "CesiumLogoFlat.png",
                   bufferView: 4,
                   mimeType: "image/png",
                 },
               |];
          },
        )
      );

      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images
            |> expect
            == [|
                 ConvertTool.getJsonSerializedNone(),
                 ConvertTool.getJsonSerializedNone(),
                 {name: "image_2", bufferView: 4, mimeType: "image/jpeg"},
                 {name: "image_3", bufferView: 9, mimeType: "image/png"},
               |];
          },
        )
      );
    });

    describe("test bufferViews", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({bufferViews}, binBuffer)) =>
          bufferViews
          |> expect
          == [|
               {
                 buffer: 0,
                 byteOffset: 0,
                 byteLength: 288,
                 byteStride: Some(12),
               },
               {
                 buffer: 0,
                 byteOffset: 288,
                 byteLength: 288,
                 byteStride: Some(12),
               },
               {
                 buffer: 0,
                 byteOffset: 576,
                 byteLength: 192,
                 byteStride: Some(8),
               },
               {
                 buffer: 0,
                 byteOffset: 768,
                 byteLength: 72,
                 byteStride: ConvertTool.getJsonSerializedNone(),
               },
               {
                 buffer: 0,
                 byteOffset: 840,
                 byteLength: 23516,
                 byteStride: ConvertTool.getJsonSerializedNone(),
               },
             |]
        )
      );

      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({bufferViews}, binBuffer)) =>
          (bufferViews |> Js.Array.length, bufferViews[37])
          |> expect
          == (
               38,
               {
                 buffer: 0,
                 byteOffset: 772816,
                 byteLength: 6,
                 byteStride: ConvertTool.getJsonSerializedNone(),
               },
             )
        )
      );
    });

    describe("test buffers", () => {
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|24360|]
        )
      );
      test("test AlphaBlendModeTest glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|3004960|]
        )
      );
    });

    describe("test accessors", () =>
      test("test BoxTextured glb", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({accessors}, binBuffer)) =>
          accessors
          |> expect
          == [|
               {
                 bufferView: 0,
                 byteOffset: 0,
                 componentType: FLOAT,
                 count: 24,
                 type_: VEC3,
               },
               {
                 bufferView: 1,
                 byteOffset: 0,
                 componentType: FLOAT,
                 count: 24,
                 type_: VEC3,
               },
               {
                 bufferView: 2,
                 byteOffset: 0,
                 componentType: FLOAT,
                 count: 24,
                 type_: VEC2,
               },
               {
                 bufferView: 3,
                 byteOffset: 0,
                 componentType: UNSIGNED_SHORT,
                 count: 36,
                 type_: SCALAR,
               },
             |]
        )
      )
    );

    describe("test geometrys", () => {
      test("test single primitive", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          ~state,
          ~testFunc=
            ({geometrys}) =>
              geometrys
              |> expect
              == [|
                   Some({
                     name: "geometry_0",
                     position: 0,
                     normal: Some(1),
                     texCoord: Some(2),
                     index: 3,
                   }),
                 |],
          (),
        )
      );

      describe("not support texCoord_1", () =>
        describe("if attributes has texCoord_1", () =>
          test("should warn only once", () => {
            let warn =
              createMethodStubWithJsObjSandbox(
                sandbox,
                Console.console,
                "warn",
              );

            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfTexCoord1(),
              ~state,
              ~testFunc=
                _ =>
                  warn
                  |> withOneArg("not support texCoord_1")
                  |> expect
                  |> toCalledOnce,
              (),
            );
          })
        )
      );
    });

    describe("test meshRenderers", () => {
      describe("meshRenderers.length should === gameObjects.length", () =>
        test("test single primitive", () =>
          ConvertGLBTool.testGLTFResultByGLTF(
            ~sandbox=sandbox^,
            ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ~state,
            ~testFunc=
              ({meshRenderers}) =>
                meshRenderers |> Js.Array.length |> expect == 1,
            (),
          )
        )
      );

      describe("test isRender", () => {
        describe("if has no extras, isRender should be true", () =>
          test("test single primitive", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({meshRenderers}) =>
                  meshRenderers
                  |> expect
                  == [|
                       Some(
                         ConvertGLBTool.buildMeshRenderer(~isRender=true, ()),
                       ),
                     |],
              (),
            )
          )
        );

        describe(
          "else, isRender should === extras->meshRenderers->isRender", () =>
          test("test", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfMeshRenderer(
                  ~isMeshRenderer1Render=true,
                  ~isMeshRenderer2Render=false,
                  (),
                ),
              ~state,
              ~testFunc=
                ({meshRenderers}) =>
                  meshRenderers
                  |> expect
                  == [|
                       Some(
                         ConvertGLBTool.buildMeshRenderer(
                           ~isRender=true,
                           ~drawMode=DrawModeType.Lines,
                           (),
                         ),
                       ),
                       Some(
                         ConvertGLBTool.buildMeshRenderer(
                           ~isRender=false,
                           ~drawMode=DrawModeType.Line_strip,
                           (),
                         ),
                       ),
                     |],
              (),
            )
          )
        );
      });

      describe("test drawMode", () => {
        describe(
          "if not has extras, drawMode should === gameObjects->mesh->drawMode",
          () => {
          test("test single primitive", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({meshRenderers}) =>
                  meshRenderers
                  |> expect
                  == [|
                       Some(
                         ConvertGLBTool.buildMeshRenderer(
                           ~drawMode=DrawModeType.Triangles,
                           (),
                         ),
                       ),
                     |],
              (),
            )
          );

          describe("test different nodes share the same mesh", () =>
            test("test truck glb", () =>
              ConvertGLBTool.testResult(
                sandbox^,
                GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                (({meshRenderers}, binBuffer)) =>
                meshRenderers
                |> expect
                == [|
                     Some(
                       ConvertGLBTool.buildMeshRenderer(
                         ~drawMode=DrawModeType.Triangles,
                         (),
                       ),
                     ),
                     Some(
                       ConvertGLBTool.buildMeshRenderer(
                         ~drawMode=DrawModeType.Triangles,
                         (),
                       ),
                     ),
                     Some(
                       ConvertGLBTool.buildMeshRenderer(
                         ~drawMode=DrawModeType.Triangles,
                         (),
                       ),
                     ),
                     Some(
                       ConvertGLBTool.buildMeshRenderer(
                         ~drawMode=DrawModeType.Triangles,
                         (),
                       ),
                     ),
                     Some(
                       ConvertGLBTool.buildMeshRenderer(
                         ~drawMode=DrawModeType.Triangles,
                         (),
                       ),
                     ),
                   |]
              )
            )
          );
        });

        describe(
          "else, drawMode should === extras->meshRenderers->drawMode", () =>
          test("test", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfMeshRenderer(),
              ~state,
              ~testFunc=
                ({meshRenderers}) =>
                  meshRenderers
                  |> expect
                  == [|
                       Some(
                         ConvertGLBTool.buildMeshRenderer(
                           ~drawMode=DrawModeType.Lines,
                           (),
                         ),
                       ),
                       Some(
                         ConvertGLBTool.buildMeshRenderer(
                           ~drawMode=DrawModeType.Line_strip,
                           (),
                         ),
                       ),
                     |],
              (),
            )
          )
        );
      });
    });

    describe("test indices", () => {
      describe("test gameObjectIndices", () => {
        let _buildTransformIndexData =
            (parentTransformIndices, childrenTransformIndices) => {
          parentTransformIndices,
          childrenTransformIndices,
        };
        let _buildComponentIndexData = (gameObjectIndices, componentIndices) =>
          ConvertGLBTool.buildComponentIndexData(
            gameObjectIndices,
            componentIndices,
          );

        describe("test childrenTransformIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.childrenTransformIndexData
                  |> expect == _buildTransformIndexData([||], [||]),
              (),
            )
          );
          test("test truck gltf", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.childrenTransformIndexData
              |> expect
              == _buildTransformIndexData(
                   [|0, 1, 3|],
                   [|[|3, 1, 5, 6, 7|], [|2|], [|4|]|],
                 )
            )
          );
        });

        describe("test basicCameraViewGameObjectIndexData", () => {
          test("test no data", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.basicCameraViewGameObjectIndexData
                  |> expect == _buildComponentIndexData([||], [||]),
              (),
            )
          );
          test("test camera gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.basicCameraViewGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0, 1|], [|2, 0|]),
              (),
            )
          );
          test("test basicCameraView gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfBasicCameraView(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.basicCameraViewGameObjectIndexData
                  |> expect
                  == _buildComponentIndexData([|0, 1, 2|], [|1, 0, 2|]),
              (),
            )
          );
        });

        describe("test perspectiveCameraProjectionGameObjectIndexData", () => {
          test("test no data", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.
                    perspectiveCameraProjectionGameObjectIndexData
                  |> expect == _buildComponentIndexData([||], [||]),
              (),
            )
          );
          test("test camera gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfCamera(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.
                    perspectiveCameraProjectionGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0, 1|], [|1, 0|]),
              (),
            )
          );
        });

        describe("test meshRendererGameObjectIndexData", () => {
          test("test extras", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=
                ConvertGLBTool.buildGLTFJsonOfMeshRenderer(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.meshRendererGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|1|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.meshRendererGameObjectIndexData
              |> expect
              == _buildComponentIndexData(
                   [|2, 4, 5, 6, 7|],
                   [|0, 1, 2, 3, 4|],
                 )
            )
          );
        });

        describe("test material GameObjectIndexData", () => {
          describe("test basicMaterialGameObjectIndexData", () =>
            test("test extras", () =>
              ConvertGLBTool.testGLTFResultByGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfBasicMaterial(),
                ~state,
                ~testFunc=
                  ({indices}) =>
                    indices.gameObjectIndices.basicMaterialGameObjectIndexData
                    |> expect == _buildComponentIndexData([|0|], [|0|]),
                (),
              )
            )
          );

          describe("test lightMaterialGameObjectIndexData", () => {
            test("test extras", () =>
              ConvertGLBTool.testGLTFResultByGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfLightMaterial(),
                ~state,
                ~testFunc=
                  ({indices}) =>
                    indices.gameObjectIndices.lightMaterialGameObjectIndexData
                    |> expect == _buildComponentIndexData([|0|], [|1|]),
                (),
              )
            );
            test("test gltf", () =>
              ConvertGLBTool.testGLTFResultByGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfSingleNode(),
                ~state,
                ~testFunc=
                  ({indices}) =>
                    indices.gameObjectIndices.lightMaterialGameObjectIndexData
                    |> expect == _buildComponentIndexData([|0|], [|0|]),
                (),
              )
            );
            test("test truck glb", () =>
              ConvertGLBTool.testResult(
                sandbox^,
                GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
                (({indices}, _)) =>
                indices.gameObjectIndices.lightMaterialGameObjectIndexData
                |> expect
                == _buildComponentIndexData(
                     [|2, 4, 5, 6, 7|],
                     [|3, 3, 0, 1, 2|],
                   )
              )
            );
          });

          describe(
            "test basicMaterial and lightMaterial gameObjectIndexData", () =>
            test("test gltf", () =>
              ConvertGLBTool.testGLTFResultByGLTF(
                ~sandbox=sandbox^,
                ~embeddedGLTFJsonStr=
                  ConvertGLBTool.buildGLTFJsonOfBasicMaterialAndLightMaterial(),
                ~state,
                ~testFunc=
                  ({indices}) =>
                    (
                      indices.gameObjectIndices.
                        basicMaterialGameObjectIndexData,
                      indices.gameObjectIndices.
                        lightMaterialGameObjectIndexData,
                    )
                    |> expect
                    == (
                         _buildComponentIndexData([|0|], [|0|]),
                         _buildComponentIndexData([|1, 2|], [|1, 0|]),
                       ),
                (),
              )
            )
          );
        });

        describe("test transformGameObjectIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.transformGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|0|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.transformGameObjectIndexData
              |> expect
              == _buildComponentIndexData(
                   [|0, 1, 2, 3, 4, 5, 6, 7|],
                   [|0, 1, 2, 3, 4, 5, 6, 7|],
                 )
            )
          );
        });

        describe("test geometryGameObjectIndexData", () => {
          test("test single node gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfSingleNode(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.geometryGameObjectIndexData
                  |> expect == _buildComponentIndexData([|0|], [|0|]),
              (),
            )
          );
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.gameObjectIndices.geometryGameObjectIndexData
              |> expect
              == _buildComponentIndexData(
                   [|2, 4, 5, 6, 7|],
                   [|1, 1, 2, 3, 4|],
                 )
            )
          );
        });

        describe("test directionLightGameObjectIndexData", () =>
          test("test light gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.directionLightGameObjectIndexData
                  |> expect == _buildComponentIndexData([|2|], [|0|]),
              (),
            )
          )
        );

        describe("test pointLightGameObjectIndexData", () =>
          test("test light gltf", () =>
            ConvertGLBTool.testGLTFResultByGLTF(
              ~sandbox=sandbox^,
              ~embeddedGLTFJsonStr=ConvertGLBTool.buildGLTFJsonOfLight(),
              ~state,
              ~testFunc=
                ({indices}) =>
                  indices.gameObjectIndices.pointLightGameObjectIndexData
                  |> expect == _buildComponentIndexData([|3|], [|0|]),
              (),
            )
          )
        );
      });

      describe("test materialIndices", () => {
        let _buildIndexData = (materialIndices, mapIndices) => {
          materialIndices,
          mapIndices,
        };

        describe("test diffuseMapMaterialIndices", () =>
          test("test truck glb", () =>
            ConvertGLBTool.testResult(
              sandbox^,
              GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
              (({indices}, _)) =>
              indices.materialIndices.diffuseMapMaterialIndices
              |> expect == _buildIndexData([|0, 3|], [|0, 1|])
            )
          )
        );
      });

      describe("test imageBasicSourceTextureIndices", () => {
        let _buildIndexData = (textureIndices, imageIndices) => {
          textureIndices,
          imageIndices,
        };
        test("test truck glb", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            (({indices}, _)) =>
            indices.imageBasicSourceTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });

      describe("test samplerTextureIndices", () => {
        let _buildIndexData = (textureIndices, samplerIndices) => {
          textureIndices,
          samplerIndices,
        };
        test("test truck glb", () =>
          ConvertGLBTool.testResult(
            sandbox^,
            GLBTool.buildGLBFilePath("CesiumMilkTruck.glb"),
            (({indices}, _)) =>
            indices.samplerTextureIndices
            |> expect == _buildIndexData([|0, 1|], [|0, 0|])
          )
        );
      });
    });

    describe("fix gltf", () =>
      test("remove scenes->scene->nodes's unexist nodes", () =>
        ConvertGLBTool.testGLTFResultByGLTF(
          ~sandbox=sandbox^,
          ~embeddedGLTFJsonStr=
            ConvertGLBTool.buildGLTFJson(
              ~scenes={|  [
        {
        "nodes": [0, 1]
    }
    ]|},
              ~nodes=
                {| [
        {
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                20.0,
                30.0,
                1.0
            ],
            "mesh": 0
        }
    ]|},
              (),
            ),
          ~state,
          ~testFunc=
            ({scene}) => scene.gameObjects |> Js.Array.length |> expect == 1,
          (),
        )
      )
    );
  });
