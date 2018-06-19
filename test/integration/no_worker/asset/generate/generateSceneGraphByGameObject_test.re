open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("generateSceneGraph by gameObject", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _createTexture1 = state => {
      let (state, texture) =
        BasicSourceTextureAPI.createBasicSourceTexture(state);

      let name = "texture_1";

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureName(texture, name, state);

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureWrapS(
          texture,
          SourceTextureType.REPEAT,
          state,
        )
        |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
             texture,
             SourceTextureType.LINEAR,
           );

      let width = 30;
      let height = 50;

      let source = BasicSourceTextureTool.buildSource(width, height);

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureSource(
          texture,
          source,
          state,
        );

      (state, (texture, name), (source, width, height));
    };

    let _createTexture2 = state => {
      let (state, texture) =
        BasicSourceTextureAPI.createBasicSourceTexture(state);

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureWrapT(
          texture,
          SourceTextureType.REPEAT,
          state,
        )
        |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
             texture,
             SourceTextureType.LINEAR_MIPMAP_LINEAR,
           );

      let width = 32;
      let height = 60;

      let source = BasicSourceTextureTool.buildSource(width, height);

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureSource(
          texture,
          source,
          state,
        );

      (state, texture, (source, width, height));
    };

    let _createGameObjectWithShareMaterial = (material, state) => {
      open GameObjectAPI;
      open LightMaterialAPI;
      open MeshRendererAPI;

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

    let _createGameObjectWithShareGeometry =
        (geometry, addGameObjectGeometryComponentFunc, state) => {
      open GameObjectAPI;
      open LightMaterialAPI;
      open MeshRendererAPI;

      let (state, material) = createLightMaterial(state);

      let diffuseColor = [|1., 0.5, 0.5|];

      let state =
        LightMaterialAPI.setLightMaterialDiffuseColor(
          material,
          diffuseColor,
          state,
        );

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
        (material, diffuseColor),
        meshRenderer,
      );
    };

    let _createGameObject1 = state => {
      open GameObjectAPI;
      open LightMaterialAPI;
      open BoxGeometryAPI;
      open MeshRendererAPI;

      let (state, material) = createLightMaterial(state);

      let diffuseColor = [|0., 0.8, 0.2|];

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
        (material, diffuseColor),
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

      /* let (state, texture) =
           BasicSourceTextureAPI.createBasicSourceTexture(state);

         let name = "texture_1";

         let state =
           BasicSourceTextureAPI.setBasicSourceTextureName(
             texture,
             name,
             state,
           );

         let state =
           BasicSourceTextureAPI.setBasicSourceTextureWrapS(
             texture,
             SourceTextureType.REPEAT,
             state,
           )
           |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                texture,
                SourceTextureType.LINEAR,
              );

         let width = 30;
         let height = 50;

         let source = BasicSourceTextureTool.buildSource(width, height);

         let state =
           BasicSourceTextureAPI.setBasicSourceTextureSource(
             texture,
             source,
             state,
           ); */

      let (state, (texture, name), (source, width, height)) =
        _createTexture1(state);

      let state =
        LightMaterialAPI.setLightMaterialDiffuseMap(material, texture, state);

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
        (material, (texture, name), (source, width, height)),
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

      let (state, texture, (source, width, height)) =
        _createTexture2(state);

      let state =
        LightMaterialAPI.setLightMaterialDiffuseMap(material, texture, state);

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
        (material, texture, (source, width, height)),
        meshRenderer,
      );
    };

    beforeAllPromise(() => ConvertGLTFTool.buildFakeLoadImage());
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

    describe("test basic", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

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
          (material1, diffuseColor1),
          meshRenderer1,
        ) =
          _createGameObject1(state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          (geometry2, (vertices2, texCoords2, normals2, indices2)),
          (material2, (texture2, name2), (source2, width2, height2)),
          meshRenderer2,
        ) =
          _createGameObject2(state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          (geometry3, (vertices3, texCoords3, normals3, indices3)),
          (material3, texture3, (source3, width3, height3)),
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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

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
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
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
          _,
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
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4,"TEXCOORD_0":5},"indices":6}]},{"primitives":[{"attributes":{"POSITION":7,"NORMAL":8,"TEXCOORD_0":9},"indices":10}]}]
                |j},
          state,
        );
      });

      test("test materials", () => {
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
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.800000011920929,0.20000000298023224,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":1}}}]
                |j},
          state,
        );
      });

      test("test textures and samplers and images", () => {
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
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "textures":[{"sampler":0,"source":0,"name":"$name2"},{"sampler":1,"source":1}],"samplers":[{"wrapS":10497,"wrapT":33071,"magFilter":9729,"minFilter":9728},{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"uri":"$base64Str1"},{"uri":"$base64Str2"}]
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
            _,
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
            sceneGameObject,
            ((state, sceneGameObject)) =>
              AssembleWDSystemTool.getAllGeometryData(sceneGameObject, state)
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
                            (vertices2, normals2, texCoords2, indices2),
                          ),
                          (
                            "gameObject_3",
                            (vertices3, normals3, texCoords3, indices3),
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
          (material1, diffuseColor1),
          meshRenderer1,
        ) =
          _createGameObject1(state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          (geometry2, (vertices2, texCoords2, normals2, indices2)),
          (material2, (texture2, name2), (source2, width2, height2)),
          meshRenderer2,
        ) =
          _createGameObject2(state);

        let state = GameObjectTool.disposeGameObject(gameObject2, state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          (geometry3, (vertices3, texCoords3, normals3, indices3)),
          (material3, texture3, (source3, width3, height3)),
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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

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
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
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
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extension":{"material":0}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":1,"extension":{"material":1}}]

              |j},
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
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4,"TEXCOORD_0":5},"indices":6}]}]
                |j},
          state,
        );
      });

      test("test materials, textures, samplers, images", () => {
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
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
"materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.800000011920929,0.20000000298023224,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],
              "textures":[{"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"uri":"$base64Str1"}]
                |j},
          state,
        );
      });
    });

    describe("test share geometry", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

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
          (material3, texture3, (source3, width3, height3)),
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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

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
          (
            (material1, diffuseColor1),
            (material2, diffuseColor2),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
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
          _,
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
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1},"indices":2}]},{"primitives":[{"attributes":{"POSITION":3,"NORMAL":4,"TEXCOORD_0":5},"indices":6}]}]
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
            _,
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
            sceneGameObject,
            ((state, sceneGameObject)) => {
              let dataMap = GLTFTool.getTruckGeometryData();

              AssembleWDSystemTool.getAllGeometryData(sceneGameObject, state)
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
                            (vertices3, normals3, texCoords3, indices3),
                          ),
                        |];
            },
            state,
          );
        })
      );

      test("test materials, textures, samplers, images", () => {
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
          (
            (material1, diffuseColor1),
            (material2, diffuseColor2),
            (material3, texture3, (source3, width3, height3)),
            (base64Str1, base64Str2),
          ),
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.800000011920929,0.20000000298023224,1]}},{"pbrMetallicRoughness":{"baseColorFactor":[1,0.5,0.5,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"uri":"$base64Str1"}]
                |j},
          state,
        );
      });
    });

    describe("test share material", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

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
          (material1, diffuseColor1),
          meshRenderer1,
        ) =
          _createGameObject1(state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          (geometry2, (vertices2, texCoords2, normals2, indices2)),
          (material2, (texture2, name2), (source2, width2, height2)),
          meshRenderer2,
        ) =
          _createGameObject2(state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          geometry3,
          material3,
          meshRenderer3,
        ) =
          _createGameObjectWithShareMaterial(material2, state);

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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

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
            geometry3,
          ),
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            material3,
            (base64Str1, base64Str2),
          ),
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
          _,
          _,
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "nodes":[{"children":[1,2]},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extension":{"material":0}},{"children":[3],"translation":[0.5,-1.5,1.5],"rotation":[2,2.5,5,4.5],"scale":[3,5.5,1],"mesh":1,"extension":{"material":1}},{"translation":[0.5,11,12.5],"rotation":[3,1,2.5,1],"scale":[2.5,15.5,1.5],"mesh":2,"extension":{"material":1}}]
                |j},
          state,
        );
      });

      test("test materials, textures, samplers, images", () => {
        let (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (gameObject1, gameObject2, gameObject3),
          (
            (transform1, (localPos1, localRotation1, localScale1)),
            (transform2, (localPos2, localRotation2, localScale2)),
            (transform3, (localPos3, localRotation3, localScale3)),
          ),
          _,
          (
            (material1, diffuseColor1),
            (material2, (texture2, name2), (source2, width2, height2)),
            material3,
            (base64Str1, base64Str2),
          ),
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.800000011920929,0.20000000298023224,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"sampler":0,"source":0,"name":"$name2"}],"samplers":[{"wrapS":10497,"wrapT":33071,"magFilter":9729,"minFilter":9728}],"images":[{"uri":"$base64Str1"}]
                |j},
          state,
        );
      });
    });

    describe("test share texture, share sampler, share source", () => {
      let _createGameObjectWithShareTexture = (texture, state) => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open MeshRendererAPI;

        /* let (state, (texture, name), (source, width, height)) =
           _createTexture1(state); */

        let (state, material) = createLightMaterial(state);

        let state =
          LightMaterialAPI.setLightMaterialDiffuseMap(
            material,
            texture,
            state,
          );

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
          (material, texture),
          meshRenderer,
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, sceneGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          );

        let (state, newTexture1, (source1, _, _)) = _createTexture2(state);

        let (state, newTexture2, _) = _createTexture2(state);

        let state =
          BasicSourceTextureAPI.setBasicSourceTextureSource(
            newTexture2,
            source1,
            state,
          );

        let (
          state,
          gameObject1,
          (transform1, (localPos1, localRotation1, localScale1)),
          geometry1,
          (material1, texture1),
          meshRenderer1,
        ) =
          _createGameObjectWithShareTexture(newTexture1, state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          geometry2,
          (material2, texture2),
          meshRenderer2,
        ) =
          _createGameObjectWithShareTexture(newTexture1, state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          geometry3,
          (material3, texture3),
          meshRenderer3,
        ) =
          _createGameObjectWithShareTexture(newTexture2, state);

        let (
          state,
          gameObject4,
          (transform4, (localPos4, localRotation4, localScale4)),
          geometry4,
          material4,
          meshRenderer4,
        ) =
          _createGameObjectWithShareMaterial(material3, state);

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
               Js.Nullable.return(sceneGameObjectTransform),
               transform4,
             )
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(transform2),
               transform3,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (
            (material1, texture1),
            (material2, texture2),
            (material3, texture3),
            material4,
            (base64Str1, base64Str2),
          ),
        );
      };

      test("test materials, textures, samplers, images", () => {
        let (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (
            (material1, texture1),
            (material2, texture2),
            (material3, texture3),
            material4,
            (base64Str1, base64Str2),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":1}}}],"textures":[{"sampler":0,"source":0},{"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"uri":"$base64Str1"}]
                |j},
          state,
        );
      });
    });

    describe("test basic material", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, sceneGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          );

        let (state, basicMaterial) =
          BasicMaterialAPI.createBasicMaterial(state);

        let (
          state,
          gameObject1,
          (transform1, (localPos1, localRotation1, localScale1)),
          geometry1,
          material1,
          meshRenderer1,
        ) =
          _createGameObjectWithShareMaterial(basicMaterial, state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          geometry2,
          (material2, diffuseColor2),
          meshRenderer2,
        ) =
          _createGameObject1(state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          geometry3,
          (material3, texture3, _),
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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (
            material1,
            (material2, diffuseColor2),
            (material3, texture3),
            (base64Str1, base64Str2),
          ),
        );
      };

      test("test materials, textures, samplers, images", () => {
        let (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (
            material1,
            (material2, diffuseColor2),
            (material3, texture3),
            (base64Str1, base64Str2),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.800000011920929,0.20000000298023224,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"uri":"$base64Str1"}]
                |j},
          state,
        );
      });
    });

    describe("test camera", () => {
      let _createBasicCameraViewPerspectiveCamera = state => {
        open BasicCameraViewAPI;
        open PerspectiveCameraProjectionAPI;

        let (state, perspectiveCameraProjection) =
          createPerspectiveCameraProjection(state);
        let (state, basicCameraView) = createBasicCameraView(state);
        let near = 0.1;
        let far = 1000.5;
        let fovy = 60.;
        let aspect = 1.5;
        let state =
          state
          |> setPerspectiveCameraNear(perspectiveCameraProjection, near)
          |> setPerspectiveCameraFar(perspectiveCameraProjection, far)
          |> setPerspectiveCameraFovy(perspectiveCameraProjection, fovy)
          |> setPerspectiveCameraAspect(perspectiveCameraProjection, aspect);
        (
          state,
          basicCameraView,
          (perspectiveCameraProjection, near, far, fovy, aspect),
        );
      };

      let _createCameraGameObject = state => {
        open GameObjectAPI;

        let (
          state,
          basicCameraView,
          (perspectiveCameraProjection, near, far, fovy, aspect),
        ) =
          _createBasicCameraViewPerspectiveCamera(state);
        let (state, gameObject) = state |> GameObjectAPI.createGameObject;
        let state =
          state
          |> addGameObjectBasicCameraViewComponent(
               gameObject,
               basicCameraView,
             );
        let state =
          state
          |> addGameObjectPerspectiveCameraProjectionComponent(
               gameObject,
               perspectiveCameraProjection,
             );
        (
          state,
          gameObject,
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          ),
          (
            basicCameraView,
            (perspectiveCameraProjection, near, far, fovy, aspect),
          ),
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, sceneGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            sceneGameObject,
            state,
          );

        let (
          state,
          gameObject1,
          transform1,
          (
            basicCameraView1,
            (perspectiveCameraProjection1, near1, far1, fovy1, aspect1),
          ),
        ) =
          _createCameraGameObject(state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          geometry2,
          (material2, diffuseColor2),
          meshRenderer2,
        ) =
          _createGameObject1(state);

        let (
          state,
          gameObject3,
          transform3,
          (
            basicCameraView3,
            (perspectiveCameraProjection3, near3, far3, fovy3, aspect3),
          ),
        ) =
          _createCameraGameObject(state);

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

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            (
              basicCameraView1,
              (perspectiveCameraProjection1, near1, far1, fovy1, aspect1),
            ),
            (
              basicCameraView3,
              (perspectiveCameraProjection3, near3, far3, fovy3, aspect3),
            ),
          ),
        );
      };

      test("test nodes", () => {
        let (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            (
              basicCameraView1,
              (perspectiveCameraProjection1, near1, far1, fovy1, aspect1),
            ),
            (
              basicCameraView3,
              (perspectiveCameraProjection3, near3, far3, fovy3, aspect3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
            "nodes":[{"children":[1,2]},{"camera":0},{"children":[3],"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extension":{"material":0}},{"camera":1}]
                |j},
          state,
        );
      });

      test("test cameras", () => {
        let (
          state,
          (sceneGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            (
              basicCameraView1,
              (perspectiveCameraProjection1, near1, far1, fovy1, aspect1),
            ),
            (
              basicCameraView3,
              (perspectiveCameraProjection3, near3, far3, fovy3, aspect3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          sceneGameObject,
          {j|
            "cameras":[{"type":"perspective","perspective":{"aspectRatio":1.5,"zfar":1000.5,"znear":0.1,"yfov":1.0471975511965976}},{"type":"perspective","perspective":{"aspectRatio":1.5,"zfar":1000.5,"znear":0.1,"yfov":1.0471975511965976}}]
                |j},
          state,
        );
      });
    });
  });