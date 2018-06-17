open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("GenerateSceneGraphSystem", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.init(
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

    describe("generateEmbededGLTF", () =>
      describe("generate asset", () =>
        testPromise("test", () =>
          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            {|"asset":{"version":"2.0", "generator":"GLTF2WD"}|},
            state,
          )
        )
      )
    );

    describe("generate scene", () =>
      testPromise("test", () =>
        GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          {|"scene": 0, "scenes": [{"nodes": [0]}]|},
          state,
        )
      )
    );

    describe("test by gltf", () => {
      describe("test single node", () =>
        testPromise("test nodes", () =>
          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            {|"nodes":[{"name":"gameObject_0","translation":[10,20,30],"mesh":0,"extension":{"material":0}}]|},
            state,
          )
        )
      );

      describe("test truck", () => {
        testPromise("test nodes", () =>
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
      "extension": {
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
      "extension": {
        "material": 0
      }
    },
    {
      "name": "Cesium_Milk_Truck_0",
      "mesh": 1,
      "extension": {
        "material": 1
      }
    },
    {
      "name": "Cesium_Milk_Truck_1",
      "mesh": 2,
      "extension": {
        "material": 2
      }
    },
    {
      "name": "Cesium_Milk_Truck_2",
      "mesh": 3,
      "extension": {
        "material": 3
      }
    }
  ]

|},
            state,
          )
        );

        testPromise("test meshes", () =>
          GenerateSceneGraphSystemTool.testGLTFResultByGLTF(
            ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
            {| "meshes": [
    {
      "primitives": [
        {
          "attributes": {
            "TEXCOORD_0": 2,
            "POSITION": 0,
            "NORMAL": 1
          },
          "indices": 3
        }
      ]
    },
    {
      "primitives": [
        {
          "attributes": {
            "TEXCOORD_0": 6,
            "POSITION": 4,
            "NORMAL": 5
          },
          "indices": 7
        }
      ]
    },
    {
      "primitives": [
        {
          "attributes": {
            "POSITION": 8,
            "NORMAL": 9
          },
          "indices": 10
        }
      ]
    },
    {
      "primitives": [
        {
          "attributes": {
            "POSITION": 11,
            "NORMAL": 12
          },
          "indices": 13
        }
      ]
    }
  ]
|},
            state,
          )
        );

        describe("test buffer", () =>
          testPromise("test data", ()
            /* TestTool.closeContractCheck(); */
            =>
              GenerateSceneGraphSystemTool.testAssembleResultByGLTF(
                ConvertGLTFTool.buildGLTFJsonOfCesiumMilkTruck(),
                ((state, sceneGameObject)) => {
                  let dataMap = GLTFTool.getTruckGeometryData();

                  AssembleWDSystemTool.getAllGeometryData(
                    sceneGameObject,
                    state,
                  )
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
              )
            )
        );
      });
    });

    describe("test by gameObject", () => {
      let _createGameObjectWithShareGeometry =
          (geometry, addGameObjectGeometryComponentFunc, state) => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open MeshRendererAPI;

        let (state, material) = createLightMaterial(state);
        let (state, meshRenderer) = createMeshRenderer(state);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectLightMaterialComponent(gameObject, material)
          |> addGameObjectGeometryComponentFunc(gameObject, geometry)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        let localPos = (0.5, 11., 12.5);
        let localRotation = (3., 1., 2.5, 1.);
        let localScale = (2.5, 15.5, 1.5);

        let state =
          state
          |> TransformAPI.setTransformLocalPosition(transform, localPos)
          |> TransformAPI.setTransformLocalRotation(transform, localRotation)
          |> TransformAPI.setTransformLocalScale(transform, localScale);

        (
          state,
          gameObject,
          (transform, (localPos, localRotation, localScale)),
          geometry,
          material,
          meshRenderer,
        );
      };

      let _createGameObject1 = state => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open BoxGeometryAPI;
        open MeshRendererAPI;

        let (state, material) = createLightMaterial(state);
        let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
        let (state, meshRenderer) = createMeshRenderer(state);
        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectLightMaterialComponent(gameObject, material)
          |> addGameObjectBoxGeometryComponent(gameObject, geometry)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        let localPos = (10., 11., 12.5);
        let localRotation = (0., 1., 2.5, 1.);
        let localScale = (2., 3.5, 1.5);

        let state =
          state
          |> TransformAPI.setTransformLocalPosition(transform, localPos)
          |> TransformAPI.setTransformLocalRotation(transform, localRotation)
          |> TransformAPI.setTransformLocalScale(transform, localScale);

        (
          state,
          gameObject,
          (transform, (localPos, localRotation, localScale)),
          geometry,
          material,
          meshRenderer,
        );
      };

      let _createGameObject2 = state => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open CustomGeometryAPI;
        open MeshRendererAPI;
        open Js.Typed_array;
        let (state, geometry) = createCustomGeometry(state);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          state
          |> GameObjectAPI.addGameObjectCustomGeometryComponent(
               gameObject,
               geometry,
             );
        let vertices1 =
          Float32Array.make([|
            (-0.04454309865832329),
            (-0.1662379950284958),
            1.0180000066757202,
            2.602089970253733e-18,
            (-6.938890181594472e-18),
            1.0180000066757202,
            (-0.08605089783668518),
            (-0.14904500544071198),
            1.0180000066757202,
          |]);
        let texCoords1 =
          Float32Array.make([|
            0.7119140028953552,
            0.12024599313735962,
            0.7552189826965332,
            0.15945100784301758,
            0.7032840251922607,
            0.13282698392868042,
          |]);
        let normals1 =
          Float32Array.make([|
            (-0.7455800175666809),
            0.47522100806236267,
            (-0.4671989977359772),
            (-0.7843430042266846),
            0.4080820083618164,
            (-0.4671989977359772),
            0.7455800175666809,
            (-0.47522100806236267),
            (-0.46720001101493835),
          |]);
        let indices1 = Uint16Array.make([|0, 2, 1|]);

        let state =
          state
          |> setCustomGeometryVertices(geometry, vertices1)
          |> setCustomGeometryTexCoords(geometry, texCoords1)
          |> setCustomGeometryNormals(geometry, normals1)
          |> setCustomGeometryIndices(geometry, indices1);

        let (state, material) = createLightMaterial(state);
        let (state, meshRenderer) = createMeshRenderer(state);

        let state =
          state
          |> addGameObjectLightMaterialComponent(gameObject, material)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        let localPos = (0.5, (-1.5), 1.5);
        let localRotation = (2., 2.5, 5., 4.5);
        let localScale = (3., 5.5, 1.0);

        let state =
          state
          |> TransformAPI.setTransformLocalPosition(transform, localPos)
          |> TransformAPI.setTransformLocalRotation(transform, localRotation)
          |> TransformAPI.setTransformLocalScale(transform, localScale);

        (
          state,
          gameObject,
          (transform, (localPos, localRotation, localScale)),
          (geometry, (vertices1, texCoords1, normals1, indices1)),
          material,
          meshRenderer,
        );
      };

      let _createGameObject3 = state => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open CustomGeometryAPI;
        open MeshRendererAPI;
        open Js.Typed_array;
        let (state, geometry) = createCustomGeometry(state);
        let (state, gameObject) = GameObjectAPI.createGameObject(state);
        let state =
          state
          |> GameObjectAPI.addGameObjectCustomGeometryComponent(
               gameObject,
               geometry,
             );
        let vertices1 =
          Float32Array.make([|
            2.602089970253733e-18,
            (-6.938890181594472e-18),
            1.0180000066757202,
            (-0.04454309865832329),
            (-0.1662379950284958),
            1.0180000066757202,
            (-0.08605089783668518),
            (-0.14904500544071198),
            1.0180000066757202,
          |]);
        let texCoords1 =
          Float32Array.make([|
            0.5,
            0.15945100784301758,
            0.7119140028953552,
            0.12024599313735962,
            0.7032840251922607,
            0.13282698392868042,
          |]);
        let normals1 =
          Float32Array.make([|
            (-0.7455800175666809),
            0.47522100806236267,
            (-0.4671989977359772),
            0.7455800175666809,
            (-0.47522100806236267),
            (-0.46720001101493835),
            (-0.7843430042266846),
            0.4080820083618164,
            (-0.4671989977359772),
          |]);
        let indices1 = Uint16Array.make([|1, 0, 2|]);

        let state =
          state
          |> setCustomGeometryVertices(geometry, vertices1)
          |> setCustomGeometryTexCoords(geometry, texCoords1)
          |> setCustomGeometryNormals(geometry, normals1)
          |> setCustomGeometryIndices(geometry, indices1);

        let (state, material) = createLightMaterial(state);
        let (state, meshRenderer) = createMeshRenderer(state);

        let state =
          state
          |> addGameObjectLightMaterialComponent(gameObject, material)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        let localPos = (2.5, (-2.5), 0.5);
        let localRotation = (2., 3.5, 5., 4.5);
        let localScale = (3., 8.5, 1.0);

        let state =
          state
          |> TransformAPI.setTransformLocalPosition(transform, localPos)
          |> TransformAPI.setTransformLocalRotation(transform, localRotation)
          |> TransformAPI.setTransformLocalScale(transform, localScale);

        (
          state,
          gameObject,
          (transform, (localPos, localRotation, localScale)),
          (geometry, (vertices1, texCoords1, normals1, indices1)),
          material,
          meshRenderer,
        );
      };

      describe("test basic", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open BoxGeometryAPI;
          open CustomGeometryAPI;
          open MeshRendererAPI;

          let (state, sceneGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              sceneGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            (transform1, (localPos1, localRotation1, localScale1)),
            geometry1,
            material1,
            meshRenderer1,
          ) =
            _createGameObject1(state);

          let (
            state,
            gameObject2,
            (transform2, (localPos2, localRotation2, localScale2)),
            (geometry2, (vertices2, texCoords2, normals2, indices2)),
            material2,
            meshRenderer2,
          ) =
            _createGameObject2(state);

          let (
            state,
            gameObject3,
            (transform3, (localPos3, localRotation3, localScale3)),
            (geometry3, (vertices3, texCoords3, normals3, indices3)),
            material3,
            meshRenderer3,
          ) =
            _createGameObject3(state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform2,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(transform2),
                 transform3,
               );

          (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          );
        };

        test("test nodes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|"nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extension":{"material":0}},{"children":[3],"translation":[$localPos2],"rotation":[$localRotation2],"scale":[$localScale2],"mesh":1,"extension":{"material":1}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":2,"extension":{"material":2}}]|j},
            state,
          );
        });

        test("test meshes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|
                "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4},"indices":5}]},{"primitives":[{"attributes":{"POSITION":6,"NORMAL":7},"indices":8}]}]
                |j},
            state,
          );
        });

        describe("test buffer", () =>
          testPromise("test data", () => {
            let (
              state,
              (sceneGameObject, sceneGameObjectTransform),
              (gameObject1, gameObject2, gameObject3),
              (
                (transform1, (localPos1, localRotation1, localScale1)),
                (transform2, (localPos2, localRotation2, localScale2)),
                (transform3, (localPos3, localRotation3, localScale3)),
              ),
              (
                geometry1,
                (geometry2, (vertices2, texCoords2, normals2, indices2)),
                (geometry3, (vertices3, texCoords3, normals3, indices3)),
              ),
              (material1, material2, material3),
              (meshRenderer1, meshRenderer2, meshRenderer3),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sceneGameObject,
              ((state, sceneGameObject)) =>
                AssembleWDSystemTool.getAllGeometryData(
                  sceneGameObject,
                  state,
                )
                |>
                expect == [|
                            (
                              "gameObject_1",
                              (
                                GLTFTool.getBoxMainVertices(),
                                GLTFTool.getBoxMainNormals(),
                                Float32Array.make([||]),
                                GLTFTool.getBoxMainIndices(),
                              ),
                            ),
                            (
                              "gameObject_2",
                              (
                                vertices2,
                                normals2,
                                Float32Array.make([||]),
                                indices2,
                              ),
                            ),
                            (
                              "gameObject_3",
                              (
                                vertices3,
                                normals3,
                                Float32Array.make([||]),
                                indices3,
                              ),
                            ),
                          |],
              state,
            );
          })
        );
      });

      describe("test dispose", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open BoxGeometryAPI;
          open CustomGeometryAPI;
          open MeshRendererAPI;

          let (state, sceneGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              sceneGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            (transform1, (localPos1, localRotation1, localScale1)),
            geometry1,
            material1,
            meshRenderer1,
          ) =
            _createGameObject1(state);

          let (
            state,
            gameObject2,
            (transform2, (localPos2, localRotation2, localScale2)),
            (geometry2, (vertices2, texCoords2, normals2, indices2)),
            material2,
            meshRenderer2,
          ) =
            _createGameObject2(state);

          let state = GameObjectTool.disposeGameObject(gameObject2, state);

          let (
            state,
            gameObject3,
            (transform3, (localPos3, localRotation3, localScale3)),
            (geometry3, (vertices3, texCoords3, normals3, indices3)),
            material3,
            meshRenderer3,
          ) =
            _createGameObject3(state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform3,
               );

          (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          );
        };

        test("test nodes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|"nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extension":{"material":0}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":1,"extension":{"material":1}}]|j},
            state,
          );
        });

        test("test meshes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              (geometry2, (vertices2, texCoords2, normals2, indices2)),
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|
                "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4},"indices":5}]}]
                |j},
            state,
          );
        });
      });

      describe("test share geometry", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open BoxGeometryAPI;
          open CustomGeometryAPI;
          open MeshRendererAPI;

          let (state, sceneGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              sceneGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            (transform1, (localPos1, localRotation1, localScale1)),
            geometry1,
            material1,
            meshRenderer1,
          ) =
            _createGameObject1(state);

          let (
            state,
            gameObject2,
            (transform2, (localPos2, localRotation2, localScale2)),
            geometry2,
            material2,
            meshRenderer2,
          ) =
            _createGameObjectWithShareGeometry(
              geometry1,
              GameObjectAPI.addGameObjectBoxGeometryComponent,
              state,
            );

          let (
            state,
            gameObject3,
            (transform3, (localPos3, localRotation3, localScale3)),
            (geometry3, (vertices3, texCoords3, normals3, indices3)),
            material3,
            meshRenderer3,
          ) =
            _createGameObject3(state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform2,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(transform2),
                 transform3,
               );

          (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              geometry2,
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          );
        };

        test("test nodes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              geometry2,
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|"nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extension":{"material":0}},{"children":[3],"translation":[$localPos2],"rotation":[$localRotation2],"scale":[$localScale2],"mesh":0,"extension":{"material":1}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":1,"extension":{"material":2}}]|j},
            state,
          );
        });

        test("test meshes", () => {
          let (
            state,
            (sceneGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2, gameObject3),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
              (transform3, (localPos3, localRotation3, localScale3)),
            ),
            (
              geometry1,
              geometry2,
              (geometry3, (vertices3, texCoords3, normals3, indices3)),
            ),
            (material1, material2, material3),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            sceneGameObject,
            {j|
                "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4},"indices":5}]}]
                |j},
            state,
          );
        });

        describe("test buffer", () =>
          testPromise("test data", () => {
            let (
              state,
              (sceneGameObject, sceneGameObjectTransform),
              (gameObject1, gameObject2, gameObject3),
              (
                (transform1, (localPos1, localRotation1, localScale1)),
                (transform2, (localPos2, localRotation2, localScale2)),
                (transform3, (localPos3, localRotation3, localScale3)),
              ),
              (
                geometry1,
                geometry2,
                (geometry3, (vertices3, texCoords3, normals3, indices3)),
              ),
              (material1, material2, material3),
              (meshRenderer1, meshRenderer2, meshRenderer3),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sceneGameObject,
              ((state, sceneGameObject)) => {
                let dataMap = GLTFTool.getTruckGeometryData();

                AssembleWDSystemTool.getAllGeometryData(
                  sceneGameObject,
                  state,
                )
                |>
                expect == [|
                            (
                              "gameObject_1",
                              (
                                GLTFTool.getBoxMainVertices(),
                                GLTFTool.getBoxMainNormals(),
                                Float32Array.make([||]),
                                GLTFTool.getBoxMainIndices(),
                              ),
                            ),
                            (
                              "gameObject_2",
                              (
                                GLTFTool.getBoxMainVertices(),
                                GLTFTool.getBoxMainNormals(),
                                Float32Array.make([||]),
                                GLTFTool.getBoxMainIndices(),
                              ),
                            ),
                            (
                              "gameObject_3",
                              (
                                vertices3,
                                normals3,
                                Float32Array.make([||]),
                                indices3,
                              ),
                            ),
                          |];
              },
              state,
            );
          })
        );
      });
    });
  });