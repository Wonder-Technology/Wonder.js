open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("generate single sab", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithoutBuildFakeDom(~sandbox, ());

      GenerateSingleSABTool.prepare(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("generate single wdb", () => {
      describe("test basic", () => {
        let _createGameObject1 = state => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open MeshRendererAPI;

          let (state, material) = createLightMaterial(state);

          let diffuseColor = [|0., 0.5, 1.|];

          let state =
            LightMaterialAPI.setLightMaterialDiffuseColor(
              material,
              diffuseColor,
              state,
            );

          let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
          let (state, meshRenderer) = createMeshRenderer(state);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state
            |> addGameObjectLightMaterialComponent(gameObject, material)
            |> addGameObjectGeometryComponent(gameObject, geometry)
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
            |> TransformAPI.setTransformLocalRotation(
                 transform,
                 localRotation,
               )
            |> TransformAPI.setTransformLocalScale(transform, localScale);

          (
            state,
            gameObject,
            (transform, (localPos, localRotation, localScale)),
            geometry,
            (material, diffuseColor),
            meshRenderer,
          );
        };

        let _prepareGameObject = state => {
          open GameObjectAPI;

          let state = state^;

          let rootGameObject = SceneAPI.getSceneGameObject(state);

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            (transform1, (localPos1, localRotation1, localScale1)),
            geometry1,
            (material1, diffuseColor1),
            meshRenderer1,
          ) =
            _createGameObject1(state);

          let (
            state,
            gameObject2,
            (transform2, (localPos2, localRotation2, localScale2)),
            geometry2,
            (material2, diffuseColor2),
            meshRenderer2,
          ) =
            _createGameObject1(state);

          let state =
            state
            |> SceneAPI.addSceneChild(transform1)
            |> SceneAPI.addSceneChild(transform2);

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
            ),
            (geometry1, geometry2),
            ((material1, diffuseColor1), (material2, diffuseColor2)),
            (meshRenderer1, meshRenderer2),
          );
        };

        test("test gameObjects", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, gameObject2),
            (
              (transform1, (localPos1, localRotation1, localScale1)),
              (transform2, (localPos2, localRotation2, localScale2)),
            ),
            (geometry1, geometry2),
            ((material1, diffuseColor1), (material2, diffuseColor2)),
            (meshRenderer1, meshRenderer2),
          ) =
            _prepareGameObject(state);

          let sab =
            GenerateSingleSABSystem.generateSingleSAB(
              rootGameObject,
              WonderCommonlib.MutableSparseMapService.createEmpty(),
              true,
              state,
            );

          let content =
            GenerateSingleSABTool.SceneAssetBundleContent.getSceneAssetBundleContent(
              sab,
            );

          content.gameObjects
          |> expect
          == {
               count: 3,
               names: [|"gameObject_0", "gameObject_1", "gameObject_2"|],
               isActives:
                 WonderCommonlib.MutableSparseMapService.createEmpty(),
               isRoots: WonderCommonlib.MutableSparseMapService.createEmpty(),
             };
        });
      });

      describe("test image", () =>
        describe("test image from basicSourceTexture", () => {
          let _prepareGameObject = state => {
            open GameObjectAPI;

            let state = state^;

            let rootGameObject = SceneAPI.getSceneGameObject(state);

            let sceneGameObjectTransform =
              GameObjectAPI.unsafeGetGameObjectTransformComponent(
                rootGameObject,
                state,
              );

            let imageName = "image1";

            let (state, gameObject1, transform1, (material1, texture1)) =
              GenerateSABTool.createGameObjectWithMap(imageName, state);

            let state = state |> SceneAPI.addSceneChild(transform1);

            let (canvas, context, (base64Str1, base64Str2)) =
              GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

            (state, rootGameObject, (imageName, base64Str1));
          };

          test("test images", () => {
            let (state, rootGameObject, (imageName, base64Str1)) =
              _prepareGameObject(state);

            let sab =
              GenerateSingleSABSystem.generateSingleSAB(
                rootGameObject,
                WonderCommonlib.MutableSparseMapService.createEmpty(),
                true,
                state,
              );

            let content =
              GenerateSingleSABTool.SceneAssetBundleContent.getSceneAssetBundleContent(
                sab,
              );

            content.images
            |> expect
            == Some([|
                 {name: imageName, bufferView: 4, mimeType: "image/png"},
               |]);
          });
          test("test image buffer data", () => {
            let (state, rootGameObject, (_, base64Str1)) =
              _prepareGameObject(state);

            let sab =
              GenerateSingleSABSystem.generateSingleSAB(
                rootGameObject,
                WonderCommonlib.MutableSparseMapService.createEmpty(),
                true,
                state,
              );

            let content =
              GenerateSingleSABTool.SceneAssetBundleContent.getSceneAssetBundleContent(
                sab,
              );

            (content.bufferViews |> Array.unsafe_get(_, 4)).byteLength
            |> expect
            == (
                 BufferUtils.convertBase64ToBinary(base64Str1)
                 |> Uint8Array.byteLength
               );
          });
        })
      );
    });
  });