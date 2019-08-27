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
          TextureType.Repeat,
          state,
        )
        |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
             texture,
             TextureType.Linear,
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
          TextureType.Repeat,
          state,
        )
        |> BasicSourceTextureAPI.setBasicSourceTextureMinFilter(
             texture,
             TextureType.Linear_mipmap_linear,
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

    let _createGameObjectWithMap = (textureName, imageName, state) => {
      open GameObjectAPI;
      open LightMaterialAPI;
      open MeshRendererAPI;

      let (state, material) = createLightMaterial(state);

      let (state, (texture, _), (source, width, height)) =
        _createTexture1(state);

      let state =
        BasicSourceTextureAPI.setBasicSourceTextureName(
          texture,
          textureName,
          state,
        );

      ImageUtils.setImageName(source, imageName);

      let state =
        LightMaterialAPI.setLightMaterialDiffuseMap(material, texture, state);

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

      (state, gameObject, transform);
    };

    let _createGameObjectWithShareMaterial =
        (material, addGameObjectMaterialComponentFunc, state) => {
      open GameObjectAPI;
      open MeshRendererAPI;

      let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
      let (state, meshRenderer) = createMeshRenderer(state);
      let (state, gameObject) = state |> createGameObject;
      let state =
        state
        |> addGameObjectMaterialComponentFunc(gameObject, material)
        |> addGameObjectGeometryComponent(gameObject, geometry)
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
      open GeometryAPI;
      open MeshRendererAPI;
      open Js.Typed_array;
      let (state, geometry) = createGeometry(state);
      let (state, gameObject) = GameObjectAPI.createGameObject(state);
      let state =
        state
        |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
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
        |> setGeometryVertices(geometry, vertices1)
        |> setGeometryTexCoords(geometry, texCoords1)
        |> setGeometryNormals(geometry, normals1)
        |> setGeometryIndices16(geometry, indices1);

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
             TextureType.Repeat,
             state,
           )
           |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
                texture,
                TextureType.Linear,
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
      open GeometryAPI;
      open MeshRendererAPI;
      open Js.Typed_array;
      let (state, geometry) = createGeometry(state);
      let (state, gameObject) = GameObjectAPI.createGameObject(state);
      let state =
        state
        |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
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
        |> setGeometryVertices(geometry, vertices1)
        |> setGeometryTexCoords(geometry, texCoords1)
        |> setGeometryNormals(geometry, normals1)
        |> setGeometryIndices16(geometry, indices1);

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

    beforeAllPromise(() => ConvertTool.buildFakeLoadImage(.));
    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        TestTool.initWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~geometryPointCount=50000,
              ~geometryCount=10,
              (),
            ),
          (),
        );

      ConvertTool.setFakeTransformCount(50);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test basic", () => {
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
          |> SceneAPI.addSceneChild(transform1)
          |> SceneAPI.addSceneChild(transform2)
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(transform2),
               transform3,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
            "nodes":[{"children":[1,2]},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"children":[3],"translation":[0.5,-1.5,1.5],"rotation":[2,2.5,5,4.5],"scale":[3,5.5,1],"mesh":1,"extras":{"lightMaterial":1,"meshRenderer":1}},{"translation":[2.5,-2.5,0.5],"rotation":[2,3.5,5,4.5],"scale":[3,8.5,1],"mesh":2,"extras":{"lightMaterial":2,"meshRenderer":2}}]
          |j},
          state,
        );
      });

      test("test meshes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}]},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}]},{"primitives":[{"attributes":{"POSITION":8,"NORMAL":9,"TEXCOORD_0":10},"indices":11}]}]
                |j},
          state,
        );
      });

      test("test meshRenderers", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
"extras":{"meshRenderers":[{"isRen
der":true,"drawMode":4},{"isRender":true,"drawMode":4},{"isRender":true,"drawMode":4}]}
                |j},
          state,
        );
      });

      test("test materials", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          ((material1, diffuseColor1), _, _, _),
          (meshRenderer1, meshRenderer2, meshRenderer3),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
              "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor1,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":1}}}]
                |j},
          state,
        );
      });

      test("test textures and samplers and images", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
  "textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0,"name":"$name2"},{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":1,"source":1}],"samplers":[{"wrapS":10497,"wrapT":33071,"magFilter":9729,"minFilter":9728},{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"bufferView":12,"mimeType":"image/png"},{"bufferView":13,"mimeType":"image/png"}]
                |j},
          state,
        );
      });

      test("test bufferViews", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
"bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":288},{"buffer":0,"byteOffset":288,"byteLength":288},{"buffer":0,"byteOffset":576,"byteLength":192},{"buffer":0,"byteOffset":768,"byteLength":72},{"buffer":0,"byteOffset":840,"byteLength":36},{"buffer":0,"byteOffset":876,"byteLength":36},{"buffer":0,"byteOffset":912,"byteLength":24},{"buffer":0,"byteOffset":936,"byteLength":6},{"buffer":0,"byteOffset":944,"byteLength":36},{"buffer":0,"byteOffset":980,"byteLength":36},{"buffer":0,"byteOffset":1016,"byteLength":24},{"buffer":0,"byteOffset":1040,"byteLength":6},{"buffer":0,"byteOffset":1048,"byteLength":227},{"buffer":0,"byteOffset":1276,"byteLength":167}]
                |j},
          state,
        );
      });

      describe("test buffer", () =>
        testPromise("test data", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
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
            sandbox^,
            rootGameObject,
            ((state, _, (rootGameObject, _))) =>
              AssembleWDBSystemTool.getAllGeometryData(rootGameObject, state)
              |> expect
              == [|
                   (
                     "geometry_0",
                     (
                       GLTFTool.getBoxMainVertices(),
                       GLTFTool.getBoxMainNormals(),
                       GLTFTool.getBoxMainTexCoords(),
                       GLTFTool.getBoxMainIndices()->Some,
                       None,
                     ),
                   ),
                   (
                     "geometry_1",
                     (vertices2, normals2, texCoords2, indices2->Some, None),
                   ),
                   (
                     "geometry_2",
                     (vertices3, normals3, texCoords3, indices3->Some, None),
                   ),
                 |],
            state,
          );
        })
      );
    });

    describe("test imgui", () => {
      describe("test execData", () => {
        describe("test one exec func data", () => {
          let _prepareGameObject = state => {
            let customData = Obj.magic((1, "cc"));

            let execFunc =
              (. customData, imguiAPIJsObj, state) => {
                let (a, b) = Obj.magic(customData);
                let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

                let imageFunc = imguiAPIJsObj##image |> Obj.magic;
                let state = imageFunc(. a, b, state);

                state;
              };

            let state =
              ExecIMGUITool.addExecFuncData(
                ~state=state^,
                ~customData,
                ~func=execFunc,
                (),
              );

            let (state, rootGameObject) =
              state |> GameObjectAPI.createGameObject;

            (state, rootGameObject);
          };

          test("test", () => {
            let (state, rootGameObject) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              "
\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nvarimageFunc=imguiAPIJsObj.image;\\nreturnimageFunc(customData[0],customData[1],state);\\n}\",\"customData\":\"[1,\\\"cc\\\"]\",\"zIndex\":0,\"name\":\"exec\"}]}}
          ",
              state,
            );
          });
        });

        describe("test two exec func data", () => {
          let _prepareGameObject = state => {
            let customData = Obj.magic((1, "cc"));

            let customData1 = Obj.magic((1, "cc"));
            let execFunc1 =
              (. customData, imguiAPIJsObj, state) => {
                let (a, b) = Obj.magic(customData);
                let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

                let imageFunc = imguiAPIJsObj##image |> Obj.magic;
                let state = imageFunc(. a, b, state);

                state;
              };
            let name1 = "e1";
            let zIndex1 = 2;

            let customData2 = Obj.magic(-1);
            let execFunc2 = (. customData, imguiAPIJsObj, state) => state;
            let name2 = "e2";
            let zIndex2 = 0;

            let state =
              ExecIMGUITool.addExecFuncData(
                ~state=state^,
                ~customData=customData1,
                ~func=execFunc1,
                ~name=name1,
                ~zIndex=zIndex1,
                (),
              )
              |> ExecIMGUITool.addExecFuncData(
                   ~state=_,
                   ~customData=customData2,
                   ~func=execFunc2,
                   ~name=name2,
                   ~zIndex=zIndex2,
                   (),
                 );

            let (state, rootGameObject) =
              state |> GameObjectAPI.createGameObject;

            (state, rootGameObject);
          };

          test("test", () => {
            let (state, rootGameObject) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              "
\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nreturnstate;\\n}\",\"customData\":\"-1\",\"zIndex\":0,\"name\":\"e2\"},{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nvarimageFunc=imguiAPIJsObj.image;\\nreturnimageFunc(customData[0],customData[1],state);\\n}\",\"customData\":\"[1,\\\"cc\\\"]\",\"zIndex\":2,\"name\":\"e1\"}]}}}
          ",
              state,
            );
          });
        });
      });

      describe("test extendData", () => {
        let _prepareGameObject = state => {
          let (state, _) = ExtendIMGUITool.addExtendData(state^);

          let state = ExecIMGUITool.addExecFuncData(~state, ());

          let (state, rootGameObject) =
            state |> GameObjectAPI.createGameObject;

          (state, rootGameObject);
        };

        test("test", () => {
          let (state, rootGameObject) = _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            rootGameObject,
            "
\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{\\\"A1\\\":\\\"function(customControlFuncData,showData,apiJsObj,record){\\\\nvardrawBox=apiJsObj.drawBox;\\\\nvarparseShowData=apiJsObj.parseShowData;\\\\nvarunsafeGetSkinData=apiJsObj.unsafeGetSkinData;\\\\nvarunsafeGetSingleCustomStyleDataMap=apiJsObj.unsafeGetSingleCustomStyleDataMap;\\\\nvarunsafeGetCustomStyleData=apiJsObj.unsafeGetCustomStyleData;\\\\nvarhasSingleCustomStyleName=apiJsObj.hasSingleCustomStyleName;\\\\nvarparseSingleCustomStyleName=apiJsObj.parseSingleCustomStyleName;\\\\nvarhasCustomStyleData=apiJsObj.hasCustomStyleData;\\\\nvarmatch=parseShowData(showData);\\\\nvarsingleCustomStyleNameNullable=match[1];\\\\nvardefaultColor=\\\\n/*array*/\\\\n[0.5,0.1,0.2];\\\\nvarmatch$1=hasSingleCustomStyleName(singleCustomStyleNameNullable);\\\\nvarcolor;\\\\n\\\\nif(match$1){\\\\nvarsingleCustomStyleName=parseSingleCustomStyleName(singleCustomStyleNameNullable);\\\\nvarsingleCustomStyleDataMap=unsafeGetSingleCustomStyleDataMap(singleCustomStyleName,unsafeGetSkinData(match[0],record));\\\\nvarmatch$2=hasCustomStyleData(\\\\\\\"color\\\\\\\",singleCustomStyleDataMap);\\\\ncolor=match$2?unsafeGetCustomStyleData(\\\\\\\"color\\\\\\\",singleCustomStyleDataMap):defaultColor;\\\\n}else{\\\\ncolor=defaultColor;\\\\n}\\\\n\\\\nvarrecord$1=drawBox(customControlFuncData,color,record);\\\\nreturn(\\\\n/*tuple*/\\\\n[record$1,true]\\\\n);\\\\n}\\\"}\"},\"skinData\":{\"allSkinDataMap\":\"{\\\"Skin1\\\":[[[0.35,0.1,0.1],[0.4,0.1,0.1],[0.5,0.1,0.1],null,null,null,1,[1,1,1]],{\\\"CustomStyle1\\\":{\\\"color\\\":[0.5,1,2]}}]}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){returnstate;}\",\"customData\":\"-1\",\"zIndex\":0,\"name\":\"exec\"}]}}}
          ",
            state,
          );
        });
      });

      describe("test assetData", () => {
        let _prepareGameObject = state => {
          let state = SetAssetIMGUITool.buildAndSetAssetData(state^);

          let state = ExecIMGUITool.addExecFuncData(~state, ());

          let (state, rootGameObject) =
            state |> GameObjectAPI.createGameObject;

          (state, rootGameObject);
        };

        test("test imgui->assetData", () => {
          let (state, rootGameObject) = _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            rootGameObject,
            "
\"extras\":{\"imgui\":{\"assetData\":{\"customImages\":{\"customImages\":[{\"id\":\"c1\",\"bufferView\":1,\"mimeType\":\"image/png\"},{\"id\":\"c2\",\"bufferView\":2,\"mimeType\":\"image/jpeg\"}]},\"fontData\":{\"fntData\":{\"name\":\"fnt\",\"content\":\"infoface=\\\"Lato-Regular\\\"size=64bold=0italic=0charset=\\\"\\\"unicode=1stretchH=100smooth=1aa=2padding=0,0,0,0spacing=0,0\\ncommonlineHeight=77base=63scaleW=512scaleH=512pages=1packed=0alphaChnl=0redChnl=0greenChnl=0blueChnl=0\\npageid=0file=\\\"lato.png\\\"\\ncharscount=0\"},\"bitmapData\":{\"name\":\"bitmap\",\"bufferView\":0}}}
          ",
            state,
          );
        });
        test(
          "should add bitmap array buffer, customImagesData array buffer to bufferViews",
          () => {
          let (state, rootGameObject) = _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            rootGameObject,
            {|
            "bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":10},{"buffer":0,"byteOffset":12,"byteLength":20},{"buffer":0,"byteOffset":32,"byteLength":30}]
          |},
            state,
          );
        });
      });
    });

    describe("test skybox", () => {
      describe("test gltf", () => {
        describe("scenes->extras should has skybox data", () => {
          let _prepareGameObject = state => {
            let state = state^;

            let rootGameObject = SceneAPI.getSceneGameObject(state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

            let (canvas, context, _) =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            (state, rootGameObject, cubemapTexture);
          };

          test("test", () => {
            let (state, rootGameObject, _) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"scenes":[{"extensions":{"KHR_lights":{"light":0}},"nodes":[0],"extras":{"skybox":{"cubemap":0}
          |j},
              state,
            );
          });
        });

        describe("test cubemapTextures data", () => {
          let _prepareGameObject = state => {
            let state = state^;

            let rootGameObject = SceneAPI.getSceneGameObject(state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

            let state =
              state
              |> CubemapTextureAPI.setCubemapTextureFlipY(
                   cubemapTexture,
                   true,
                 );

            let state =
              state
              |> CubemapTextureAPI.setCubemapTexturePXFormat(
                   cubemapTexture,
                   TextureType.Rgbas3tcdxt1,
                 )
              |> CubemapTextureAPI.setCubemapTextureNXFormat(
                   cubemapTexture,
                   TextureType.Rgbs3tcdxt1,
                 )
              |> CubemapTextureAPI.setCubemapTexturePZFormat(
                   cubemapTexture,
                   TextureType.Rgba,
                 );
            let state =
              state
              |> CubemapTextureAPI.setCubemapTexturePXType(cubemapTexture, 1)
              |> CubemapTextureAPI.setCubemapTextureNXType(cubemapTexture, 2)
              |> CubemapTextureAPI.setCubemapTexturePZType(cubemapTexture, 2);

            let (canvas, context, _) =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            (state, rootGameObject, cubemapTexture);
          };

          test("extras should has cubemapTextures data", () => {
            let (state, rootGameObject, _) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"extras":{"cubemapTextures":[{"sampler":0,"flipY":true,"pxSource":0,"nxSource":1,"pySource":2,"nySource":3,"pzSource":4,"nzSource":5,"pxFormat":6,"nxFormat":5,"pyFormat":0,"nyFormat":0,"pzFormat":1,"nzFormat":0,"pxType":1,"nxType":2,"pyType":0,"nyType":0,"pzType":2,"nzType":0}]}
          |j},
              state,
            );
          });
          test("test samplers, images", () => {
            let (state, rootGameObject, _) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"samplers":[{"wrapS":33071,"wrapT":33071,"magFilter":9729,"minFilter":9728}],"images":[{"name":"i1","bufferView":0,"mimeType":"image/png"},{"name":"i2","bufferView":1,"mimeType":"image/png"},{"name":"i3","bufferView":2,"mimeType":"image/png"},{"name":"i4","bufferView":3,"mimeType":"image/png"},{"name":"i5","bufferView":4,"mimeType":"image/png"},{"name":"i6","bufferView":5,"mimeType":"image/jpeg"}]
          |j},
              state,
            );
          });
        });

        describe("test has one basicSourceTexture and one cubemapTexture", () => {
          let _prepareGameObject = state => {
            let state = state^;

            let rootGameObject = SceneAPI.getSceneGameObject(state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

            let cubemapTextureName = "cubemap_texture_name";

            let state =
              state
              |> CubemapTextureAPI.setCubemapTextureName(
                   cubemapTexture,
                   cubemapTextureName,
                 );

            let state =
              state
              |> CubemapTextureAPI.setCubemapTextureFlipY(
                   cubemapTexture,
                   true,
                 );

            let state =
              state
              |> CubemapTextureAPI.setCubemapTexturePXFormat(
                   cubemapTexture,
                   TextureType.Rgbas3tcdxt1,
                 )
              |> CubemapTextureAPI.setCubemapTextureNXFormat(
                   cubemapTexture,
                   TextureType.Rgbs3tcdxt1,
                 )
              |> CubemapTextureAPI.setCubemapTexturePZFormat(
                   cubemapTexture,
                   TextureType.Rgba,
                 );
            let state =
              state
              |> CubemapTextureAPI.setCubemapTexturePXType(cubemapTexture, 1)
              |> CubemapTextureAPI.setCubemapTextureNXType(cubemapTexture, 2)
              |> CubemapTextureAPI.setCubemapTexturePZType(cubemapTexture, 2);

            let sceneGameObjectTransform =
              GameObjectAPI.unsafeGetGameObjectTransformComponent(
                rootGameObject,
                state,
              );

            let basicSourceTextureName = "texture_name";
            let basicSourceTextureImageName = "image_name";

            let (state, gameObject1, transform1) =
              _createGameObjectWithMap(
                basicSourceTextureName,
                basicSourceTextureImageName,
                state,
              );

            let state =
              state
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(sceneGameObjectTransform),
                   transform1,
                 );

            let (canvas, context, _) =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              basicSourceTextureImageName,
            );
          };

          test("test extras->cubemapTextures", () => {
            let (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              basicSourceTextureImageName,
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"extras":{"cubemapTextures":[{"sampler":1,"flipY":true,"pxSource":1,"nxSource":2,"pySource":3,"nySource":4,"pzSource":5,"nzSource":6,"pxFormat":6,"nxFormat":5,"pyFormat":0,"nyFormat":0,"pzFormat":1,"nzFormat":0,"pxType":1,"nxType":2,"pyType":0,"nyType":0,"pzType":2,"nzType":0,"name":"$cubemapTextureName"}]
          |j},
              state,
            );
          });
          test("test samplers, images", () => {
            let (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              basicSourceTextureImageName,
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"samplers":[{"wrapS":10497,"wrapT":33071,"magFilter":9729,"minFilter":9728},{"wrapS":33071,"wrapT":33071,"magFilter":9729,"minFilter":9728}],"images":[{"name":"image_name","bufferView":4,"mimeType":"image/png"},{"name":"i1","bufferView":5,"mimeType":"image/png"},{"name":"i2","bufferView":6,"mimeType":"image/png"},{"name":"i3","bufferView":7,"mimeType":"image/png"},{"name":"i4","bufferView":8,"mimeType":"image/png"},{"name":"i5","bufferView":9,"mimeType":"image/jpeg"},{"name":"i6","bufferView":10,"mimeType":"image/png"}]
          |j},
              state,
            );
          });
        });

        describe("test isBuildCubemapFromSceneSkybox = false", () =>
          describe("not has skybox data", () => {
            let _prepareGameObject = state => {
              let state = state^;

              let rootGameObject = SceneAPI.getSceneGameObject(state);

              let (state, cubemapTexture) =
                SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

              let (canvas, context, _) =
                GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                  sandbox,
                );

              (state, rootGameObject, cubemapTexture);
            };

            test("test", () => {
              let (state, rootGameObject, _) = _prepareGameObject(state);

              GenerateSceneGraphSystemTool.testGLTFResultByGameObjectWithConfig(
                ~rootGameObject,
                ~targetJsonStr=
                  {j|
"scenes":[{"extensions":{"KHR_lights":{"light":0}},"nodes":[0],"extras":{"imgui":{"assetData":{},"extendData":{"customControlData":{"funcMap":"{}"},"skinData":{"allSkinDataMap":"{}"}},"execData":{"execFuncDataArr":[]}}}
          |j},
                ~state,
                ~isBuildCubemapFromSceneSkybox=false,
                (),
              );
            });
          })
        );
      });

      describe("test assemble result", () =>
        describe("test has one basicSourceTexture and one cubemapTexture", () => {
          let _prepareGameObject = state => {
            let state = state^;

            let rootGameObject = SceneAPI.getSceneGameObject(state);

            let (state, cubemapTexture) =
              SkyboxTool.prepareCubemapTextureAndSetAllSources(state);

            let cubemapTextureName = "cubemap_texture_name";

            let state =
              state
              |> CubemapTextureAPI.setCubemapTextureName(
                   cubemapTexture,
                   cubemapTextureName,
                 );

            let sceneGameObjectTransform =
              GameObjectAPI.unsafeGetGameObjectTransformComponent(
                rootGameObject,
                state,
              );

            let basicSourceTextureName = "texture_name";
            let basicSourceTextureImageName = "image_name";

            let (state, gameObject1, transform1) =
              _createGameObjectWithMap(
                basicSourceTextureName,
                basicSourceTextureImageName,
                state,
              );

            let state =
              state
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(sceneGameObjectTransform),
                   transform1,
                 );

            let (canvas, context, _) =
              GenerateSceneGraphSystemTool.prepareCanvasForCubemapTexture(
                sandbox,
              );

            (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              (basicSourceTextureName, basicSourceTextureImageName),
            );
          };

          testPromise(
            "test set cubemapTexture and basicSourceTexture->name", () => {
            let (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              (basicSourceTextureName, basicSourceTextureImageName),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, cubemapTextureOpt))) =>
                (
                  CubemapTextureAPI.unsafeGetCubemapTextureName(
                    cubemapTextureOpt |> OptionService.unsafeGet,
                    state,
                  ),
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(map =>
                       BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                         map,
                         state,
                       )
                     ),
                )
                |> expect == (cubemapTextureName, [|basicSourceTextureName|]),
              state,
            );
          });

          testPromise(
            "test set cubemapTexture and basicSourceTexture->source", () => {
            let (
              state,
              rootGameObject,
              (cubemapTexture, cubemapTextureName),
              (basicSourceTextureName, basicSourceTextureImageName),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, cubemapTextureOpt))) =>
                (
                  CubemapTextureAPI.unsafeGetCubemapTexturePXSource(
                    cubemapTextureOpt |> OptionService.unsafeGet,
                    state,
                  ),
                  AssembleWDBSystemTool.getAllDiffuseMaps(
                    rootGameObject,
                    state,
                  )
                  |> Js.Array.map(map =>
                       BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                         map,
                         state,
                       )
                     ),
                )
                |> expect
                == (
                     GLBTool.createFakeImage(
                       ~name="i1",
                       ~src="object_url1",
                       (),
                     ),
                     [|
                       GLBTool.createFakeImage(
                         ~name=basicSourceTextureImageName,
                         ~src="object_url0",
                         (),
                       ),
                     |],
                   ),
              state,
            );
          });
        })
      );
    });

    describe("test dispose", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

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
          (rootGameObject, sceneGameObjectTransform),
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
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
                     "nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extras":{"lightMaterial":0," meshRenderer":0}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":1,"extras":{"lightMaterial":1, "meshRenderer":1}}]
                     |j},
          state,
        );
      });

      test("test meshes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
                   "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}]},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}]}]
                       |j},
          state,
        );
      });

      test("test materials, textures, samplers, images", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
 "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[0,0.5,1,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],"images":[{"bufferView":8,"mimeType":"image/png"}]
                     |j},
          state,
        );
      });

      test("test bufferViews", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
"bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":288},{"buffer":0,"byteOffset":288,"byteLength":288},{"buffer":0,"byteOffset":576,"byteLength":192},{"buffer":0,"byteOffset":768,"byteLength":72},{"buffer":0,"byteOffset":840,"byteLength":36},{"buffer":0,"byteOffset":876,"byteLength":36},{"buffer":0,"byteOffset":912,"byteLength":24},{"buffer":0,"byteOffset":936,"byteLength":6},{"buffer":0,"byteOffset":944,"byteLength":227}]
|j},
          state,
        );
      });
    });

    describe("test share geometry", () => {
      describe("test has no map", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

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
            _createGameObjectWithShareGeometry(
              geometry1,
              GameObjectAPI.addGameObjectGeometryComponent,
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
            (rootGameObject, sceneGameObjectTransform),
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
            (rootGameObject, sceneGameObjectTransform),
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
            rootGameObject,
            {j|"nodes":[{"children":[1,2]},{"translation":[$localPos1],"rotation":[$localRotation1],"scale":[$localScale1],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"children":[3],"translation":[$localPos2],"rotation":[$localRotation2],"scale":[$localScale2],"mesh":0,"extras":{"lightMaterial":1,"meshRenderer":1}},{"translation":[$localPos3],"rotation":[$localRotation3],"scale":[$localScale3],"mesh":1,"extras":{"lightMaterial":2,"meshRenderer":2}}]|j},
            state,
          );
        });

        test("test meshes", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
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
            rootGameObject,
            {j|
               "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1,"TEXCOORD_0":2},"indices":3}]},{"primitives":[{"attributes":{"POSITION":4,"NORMAL":5,"TEXCOORD_0":6},"indices":7}]}]
                   |j},
            state,
          );
        });

        describe("test buffer", () =>
          testPromise("test data", () => {
            let (
              state,
              (rootGameObject, sceneGameObjectTransform),
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
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, _))) => {
                let dataMap = GLTFTool.getTruckGeometryData();

                AssembleWDBSystemTool.getAllGeometryData(
                  rootGameObject,
                  state,
                )
                |> expect
                == [|
                     (
                       "geometry_0",
                       (
                         GLTFTool.getBoxMainVertices(),
                         GLTFTool.getBoxMainNormals(),
                         GLTFTool.getBoxMainTexCoords(),
                         GLTFTool.getBoxMainIndices()->Some,
                         None,
                       ),
                     ),
                     (
                       "geometry_0",
                       (
                         GLTFTool.getBoxMainVertices(),
                         GLTFTool.getBoxMainNormals(),
                         GLTFTool.getBoxMainTexCoords(),
                         GLTFTool.getBoxMainIndices()->Some,
                         None,
                       ),
                     ),
                     (
                       "geometry_1",
                       (
                         vertices3,
                         normals3,
                         texCoords3,
                         indices3->Some,
                         None,
                       ),
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
            (rootGameObject, sceneGameObjectTransform),
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
            rootGameObject,
            {j|
                 "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor1,1]}},{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor2,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],
                 "images":[{"bufferView":8,"mimeType":"image/png"}]
                   |j},
            state,
          );
        });
      });

      describe("test with map", () => {
        let _createGameObjectWithMapAndGeometry =
            (textureName, geometry, state) => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open MeshRendererAPI;

          let (state, material) = createLightMaterial(state);

          let (state, (texture, _), (source, width, height)) =
            _createTexture1(state);

          let state =
            BasicSourceTextureAPI.setBasicSourceTextureName(
              texture,
              textureName,
              state,
            );

          let state =
            LightMaterialAPI.setLightMaterialDiffuseMap(
              material,
              texture,
              state,
            );

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

          (state, gameObject, transform);
        };

        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);

          let texture1Name = "texture_name1";

          let (state, gameObject1, transform1) =
            _createGameObjectWithMapAndGeometry(
              texture1Name,
              geometry,
              state,
            );

          let texture2Name = "texture_name2";
          let imageName2 = "image_name2";

          let (state, gameObject2, transform2) =
            _createGameObjectWithMapAndGeometry(
              texture2Name,
              geometry,
              state,
            );

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform2,
               );

          let (canvas, context, (base64Str1, base64Str2)) =
            GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, texture1Name),
            (gameObject2, texture2Name),
          );
        };

        testPromise(
          {|
          1.create two gameObjects with one geometry and two materials and two maps;
          2.generate wdb;
          3.assemble wdb;

          the assembled->rootGameObject->two gameObjects should has two different maps
          |},
          () => {
            let (
              state,
              (rootGameObject, sceneGameObjectTransform),
              (gameObject1, texture1Name),
              (gameObject2, texture2Name),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, _))) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(map =>
                     BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                       map,
                       state,
                     )
                   )
                |> expect == [|texture1Name, texture2Name|],
              state,
            );
          },
        );
      });
    });

    describe("test share light material", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

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
          _createGameObjectWithShareMaterial(
            material2,
            GameObjectAPI.addGameObjectLightMaterialComponent,
            state,
          );

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
          (rootGameObject, sceneGameObjectTransform),
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
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
                 "nodes":[{"children":[1,2]},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"children":[3],"translation":[0.5,-1.5,1.5],"rotation":[2,2.5,5,4.5],"scale":[3,5.5,1],"mesh":1,"extras":{"lightMaterial":1,"meshRenderer":1}},{"translation":[0.5,11,12.5],"rotation":[3,1,2.5,1],"scale":[2.5,15.5,1.5],"mesh":2,"extras":{"lightMaterial":1,"meshRenderer":2}}]
                   |j},
          state,
        );
      });

      test("test materials, textures, samplers, images", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
                 "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor1,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0,"name":"$name2"}],"samplers":[{"wrapS":10497,"wrapT":33071,"magFilter":9729,"minFilter":9728}],
                 "images":[{"bufferView":12,"mimeType":"image/png"}]
                   |j},
          state,
        );
      });
    });

    describe("test share basic material", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
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
          _createGameObjectWithShareMaterial(
            basicMaterial,
            GameObjectAPI.addGameObjectBasicMaterialComponent,
            state,
          );

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
          (rootGameObject, sceneGameObjectTransform),
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
          (rootGameObject, sceneGameObjectTransform),
          (
            material1,
            (material2, diffuseColor2),
            (material3, texture3),
            (base64Str1, base64Str2),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
                 "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor2,1]}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}}],"textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],
                 "images":[{"bufferView":12,"mimeType":"image/png"}]
                   |j},
          state,
        );
      });
      test("test extras->basicMaterials", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            material1,
            (material2, diffuseColor2),
            (material3, texture3),
            (base64Str1, base64Str2),
          ),
        ) =
          _prepareGameObject(state);

        let color = BasicMaterialTool.getDefaultColor(state);
        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
                 "extras":{"basicMaterials":[{}],
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
          |> addGameObjectGeometryComponent(gameObject, geometry)
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

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
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
          _createGameObjectWithShareMaterial(
            material3,
            GameObjectAPI.addGameObjectLightMaterialComponent,
            state,
          );

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
          (rootGameObject, sceneGameObjectTransform),
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
          (rootGameObject, sceneGameObjectTransform),
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
          rootGameObject,
          {j|
                 "materials":[{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":0}}},{"pbrMetallicRoughness":{"baseColorTexture":{"index":1}}}],"textures":[{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0},{"extras":{
        "flipY": true,
        "format": 1,
        "type_": 0
      },"sampler":0,"source":0}],"samplers":[{"wrapS":33071,"wrapT":10497,"magFilter":9729,"minFilter":9987}],
                 "images":[{"bufferView":16,"mimeType":"image/png"}]
                   |j},
          state,
        );
      });

      describe("contract check", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let (state, texture) =
            ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
              state,
            );

          let state =
            ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureSource(
              texture,
              Uint8Array.make([||]),
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
            _createGameObjectWithShareTexture(texture, state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               );

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material1, texture1),
          );
        };

        test("should only has basicSourceTexture", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material1, texture1),
          ) =
            _prepareGameObject(state);
          TestTool.openContractCheck();

          expect(() =>
            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {||},
              state,
            )
          )
          |> toThrowMessage("expect map be basicSourceTexture");
        });
      });
    });

    describe(
      "if has no maps, geometry should still generate texCoords data", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

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

        let state =
          GameObjectTool.disposeGameObjectLightMaterialComponent(
            gameObject1,
            material1,
            state,
          );

        let state =
          state
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             );

        (state, rootGameObject);
      };

      test("test meshes", () => {
        let (state, rootGameObject) = _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
            "meshes":[{"primitives":[{"attributes":{"POSITION":0,"NORMAL":1, "TEXCOORD_0":2},"indices":3}]}]
                   |j},
          state,
        );
      });
    });

    describe("test basicSourceTextures", () => {
      describe("test flipY", () => {
        let _createGameObjectWithMap = (textureName, state) => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open MeshRendererAPI;

          let (state, material) = createLightMaterial(state);

          let (state, (texture, _), (source, width, height)) =
            _createTexture1(state);

          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureFlipY(texture, true);

          let state =
            BasicSourceTextureAPI.setBasicSourceTextureName(
              texture,
              textureName,
              state,
            );

          let state =
            LightMaterialAPI.setLightMaterialDiffuseMap(
              material,
              texture,
              state,
            );

          let (state, meshRenderer) = createMeshRenderer(state);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state
            |> addGameObjectLightMaterialComponent(gameObject, material)
            /* |> addGameObjectGeometryComponent(gameObject, geometry) */
            |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

          let transform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              gameObject,
              state,
            );

          (state, gameObject, transform);
        };

        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let texture1Name = "texture_name1";

          let (state, gameObject1, transform1) =
            _createGameObjectWithMap(texture1Name, state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               );

          let (canvas, context, (base64Str1, base64Str2)) =
            GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, texture1Name),
          );
        };

        testPromise(
          {|
          1.create one gameObject g1 with one map whose flipY is true;
          2.generate wdb;
          3.assemble wdb;

          the assembled->rootGameObject->g1->map->flipY should be true
          |},
          () => {
            let (
              state,
              (rootGameObject, sceneGameObjectTransform),
              (gameObject1, texture1Name),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, _))) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(map =>
                     BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                       map,
                       state,
                     )
                   )
                |> expect == [|true|],
              state,
            );
          },
        );
      });

      describe("test format, type_", () => {
        let _createGameObjectWithMap = (textureName, state) => {
          open GameObjectAPI;
          open LightMaterialAPI;
          open MeshRendererAPI;

          let (state, material) = createLightMaterial(state);

          let (state, (texture, _), (source, width, height)) =
            _createTexture1(state);

          let format = TextureType.Luminance;
          let type_ = 2;

          let state =
            state
            |> BasicSourceTextureAPI.setBasicSourceTextureFormat(
                 texture,
                 format,
               )
            |> BasicSourceTextureAPI.setBasicSourceTextureType(texture, type_);

          let state =
            BasicSourceTextureAPI.setBasicSourceTextureName(
              texture,
              textureName,
              state,
            );

          let state =
            LightMaterialAPI.setLightMaterialDiffuseMap(
              material,
              texture,
              state,
            );

          let (state, meshRenderer) = createMeshRenderer(state);
          let (state, gameObject) = state |> createGameObject;
          let state =
            state
            |> addGameObjectLightMaterialComponent(gameObject, material)
            |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

          let transform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              gameObject,
              state,
            );

          (state, gameObject, transform, (format, type_));
        };

        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let texture1Name = "texture_name1";

          let (state, gameObject1, transform1, (format1, type1_)) =
            _createGameObjectWithMap(texture1Name, state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform1,
               );

          let (canvas, context, (base64Str1, base64Str2)) =
            GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, texture1Name),
            (format1, type1_),
          );
        };

        testPromise(
          {|
          1.create one gameObject g1 with one map whose format is f1 and type is t1;
          2.generate wdb;
          3.assemble wdb;

          the assembled->rootGameObject->g1->map->format,type should be f1,t1
          |},
          () => {
            let (
              state,
              (rootGameObject, sceneGameObjectTransform),
              (gameObject1, texture1Name),
              (format1, type1_),
            ) =
              _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
              sandbox^,
              rootGameObject,
              ((state, _, (rootGameObject, _))) =>
                AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
                |> Js.Array.map(map =>
                     (
                       BasicSourceTextureAPI.getBasicSourceTextureFormat(
                         map,
                         state,
                       ),
                       BasicSourceTextureAPI.getBasicSourceTextureType(
                         map,
                         state,
                       ),
                     )
                   )
                |> expect == [|(format1, type1_)|],
              state,
            );
          },
        );
      });
    });

    describe("test perspectiveCameraProjection", () => {
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
          |> setPerspectiveCameraProjectionNear(
               perspectiveCameraProjection,
               near,
             )
          |> setPerspectiveCameraProjectionFar(
               perspectiveCameraProjection,
               far,
             )
          |> setPerspectiveCameraProjectionFovy(
               perspectiveCameraProjection,
               fovy,
             )
          |> setPerspectiveCameraProjectionAspect(
               perspectiveCameraProjection,
               aspect,
             );
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

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
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
          BasicCameraViewAPI.activeBasicCameraView(basicCameraView1, state);

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
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            basicCameraView1,
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
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            activedBasicCameraView,
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
          rootGameObject,
          {j|
               "nodes":[{"children":[1,2]},{"camera":0,"extras":{"basicCameraView":0}},{"children":[3],"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"camera":1,"extras":{"basicCameraView":1}}]
                   |j},
          state,
        );
      });

      test("test cameras", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            activedBasicCameraView,
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
          rootGameObject,
          {j|
               "cameras":[{"type":"perspective","perspective":{"aspectRatio":1.5,"zfar":1000.5,"znear":0.1,"yfov":1.0471975511965976}},{"type":"perspective","perspective":{"aspectRatio":1.5,"zfar":1000.5,"znear":0.1,"yfov":1.0471975511965976}}]
                   |j},
          state,
        );
      });
    });

    describe("test basicCameraView", () => {
      let _createCameraGameObject = state => {
        open GameObjectAPI;

        let (state, basicCameraView, perspectiveCameraProjection) =
          CameraTool.createBasicCameraViewPerspectiveCamera(state);

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
          (basicCameraView, perspectiveCameraProjection),
        );
      };

      describe("test dispose case", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            transform1,
            (basicCameraView1, perspectiveCameraProjection1),
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

          let state = GameObjectTool.disposeGameObject(gameObject1, state);
          let (
            state,
            gameObject3,
            transform3,
            (basicCameraView3, perspectiveCameraProjection3),
          ) =
            _createCameraGameObject(state);

          let (
            state,
            gameObject4,
            transform4,
            (basicCameraView4, perspectiveCameraProjection4),
          ) =
            _createCameraGameObject(state);

          let state =
            BasicCameraViewAPI.activeBasicCameraView(basicCameraView3, state);

          let state =
            state
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform2,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform3,
               )
            |> TransformAPI.setTransformParent(
                 Js.Nullable.return(sceneGameObjectTransform),
                 transform4,
               );

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            (
              basicCameraView3,
              (basicCameraView1, perspectiveCameraProjection1),
              (basicCameraView3, perspectiveCameraProjection3),
              (basicCameraView4, perspectiveCameraProjection4),
            ),
          );
        };

        test("test nodes", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            (
              activedBasicCameraView,
              (basicCameraView1, perspectiveCameraProjection1),
              (basicCameraView3, perspectiveCameraProjection3),
              (basicCameraView4, perspectiveCameraProjection4),
            ),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            rootGameObject,
            {j|
               "nodes":[{"children":[1,2,3]},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"camera":$perspectiveCameraProjection3,"extras":{"basicCameraView":$basicCameraView3}},{"camera":$perspectiveCameraProjection4,"extras":{"basicCameraView":$basicCameraView4}}]
                   |j},
            state,
          );
        });
        test("test extras", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            (
              activedBasicCameraView,
              (basicCameraView1, perspectiveCameraProjection1),
              (basicCameraView3, perspectiveCameraProjection3),
              (basicCameraView4, perspectiveCameraProjection4),
            ),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
            rootGameObject,
            {j|
              "extras":{"meshRenderers":[{"isRender":true,"drawMode":4}],"basicCameraViews":[{"isActive":true},{"isActive":false}]}
                   |j},
            state,
          );
        });
      });

      describe("contract check", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

          let sceneGameObjectTransform =
            GameObjectAPI.unsafeGetGameObjectTransformComponent(
              rootGameObject,
              state,
            );

          let (
            state,
            gameObject1,
            transform1,
            (basicCameraView1, perspectiveCameraProjection1),
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
            (basicCameraView3, perspectiveCameraProjection3),
          ) =
            _createCameraGameObject(state);

          let state =
            state
            |> BasicCameraViewAPI.setActiveBasicCameraView(
                 basicCameraView1,
                 true,
               )
            |> BasicCameraViewAPI.setActiveBasicCameraView(
                 basicCameraView3,
                 true,
               );

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
                 transform3,
               );

          (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            (
              basicCameraView3,
              (basicCameraView1, perspectiveCameraProjection1),
              (basicCameraView3, perspectiveCameraProjection3),
            ),
          );
        };

        test("should has at most one active", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            _,
          ) =
            _prepareGameObject(state);

          expect(() =>
            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
                   |j},
              state,
            )
          )
          |> toThrowMessage("expect has at most one active");
        });
      });
    });

    describe("test flyCameraController", () => {
      let _createCameraGameObject = (isBindEvent, state) => {
        let (state, gameObject, transform, (cameraController, _, _)) =
          FlyCameraControllerTool.createGameObject(state);

        let (state, (moveSpeed, rotateSpeed, wheelSpeed)) =
          FlyCameraControllerTool.setFlyCameraControllerData(
            cameraController,
            state,
          );

        let state =
          isBindEvent ?
            FlyCameraControllerAPI.bindFlyCameraControllerEvent(
              cameraController,
              state,
            ) :
            FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
              cameraController,
              state,
            );

        (
          state,
          transform,
          (moveSpeed, rotateSpeed, wheelSpeed, isBindEvent),
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (
          state,
          transform1,
          (moveSpeed1, rotateSpeed1, wheelSpeed1, isBindEvent1),
        ) =
          _createCameraGameObject(false, state);

        let (
          state,
          transform2,
          (moveSpeed2, rotateSpeed2, wheelSpeed2, isBindEvent2),
        ) =
          _createCameraGameObject(true, state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          geometry3,
          (material3, diffuseColor3),
          meshRenderer3,
        ) =
          _createGameObject1(state);

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
               transform3,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (moveSpeed1, rotateSpeed1, wheelSpeed1, isBindEvent1),
            (moveSpeed2, rotateSpeed2, wheelSpeed2, isBindEvent2),
          ),
        );
      };

      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (moveSpeed1, rotateSpeed1, wheelSpeed1, isBindEvent1),
            (moveSpeed2, rotateSpeed2, wheelSpeed2, isBindEvent2),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
            "nodes":[{"children":[1,2,3]},{"camera":0,"extras":{"flyCameraController":0,"basicCameraView":0}},{"camera":1,"extras":{"flyCameraController":1,"basicCameraView":1}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}}]
                   |j},
          state,
        );
      });
      test("test flyCameraController", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (moveSpeed1, rotateSpeed1, wheelSpeed1, isBindEvent1),
            (moveSpeed2, rotateSpeed2, wheelSpeed2, isBindEvent2),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
              "extras":{"flyCameraControllers":[{"moveSpeed":$moveSpeed1,"rotateSpeed":$rotateSpeed1,"wheelSpeed":$wheelSpeed1,"isBindEvent":$isBindEvent1},
              {"moveSpeed":$moveSpeed2,"rotateSpeed":$rotateSpeed2,"wheelSpeed":$wheelSpeed2,"isBindEvent":$isBindEvent2}]
                      |j},
          state,
        );
      });
    });

    describe("test arcballCameraController", () => {
      let _createCameraGameObject = (isBindEvent, state) => {
        let (state, gameObject, transform, (cameraController, _, _)) =
          ArcballCameraControllerTool.createGameObject(state);

        let (
          state,
          (
            distance,
            minDistance,
            phi,
            theta,
            thetaMargin,
            target,
            moveSpeedX,
            moveSpeedY,
            rotateSpeed,
            wheelSpeed,
          ),
        ) =
          ArcballCameraControllerTool.setArcballCameraControllerData(
            cameraController,
            state,
          );

        let state =
          isBindEvent ?
            ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
              cameraController,
              state,
            ) :
            ArcballCameraControllerAPI.unbindArcballCameraControllerEvent(
              cameraController,
              state,
            );

        (
          state,
          transform,
          (
            distance,
            minDistance,
            phi,
            theta,
            thetaMargin,
            target,
            moveSpeedX,
            moveSpeedY,
            rotateSpeed,
            wheelSpeed,
            isBindEvent,
          ),
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (
          state,
          transform1,
          (
            distance1,
            minDistance1,
            phi1,
            theta1,
            thetaMargin1,
            target1,
            moveSpeedX1,
            moveSpeedY1,
            rotateSpeed1,
            wheelSpeed1,
            isBindEvent1,
          ),
        ) =
          _createCameraGameObject(false, state);

        let (
          state,
          transform2,
          (
            distance2,
            minDistance2,
            phi2,
            theta2,
            thetaMargin2,
            target2,
            moveSpeedX2,
            moveSpeedY2,
            rotateSpeed2,
            wheelSpeed2,
            isBindEvent2,
          ),
        ) =
          _createCameraGameObject(true, state);

        let (
          state,
          gameObject3,
          (transform3, (localPos3, localRotation3, localScale3)),
          geometry3,
          (material3, diffuseColor3),
          meshRenderer3,
        ) =
          _createGameObject1(state);

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
               transform3,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (
              distance1,
              minDistance1,
              phi1,
              theta1,
              thetaMargin1,
              target1,
              moveSpeedX1,
              moveSpeedY1,
              rotateSpeed1,
              wheelSpeed1,
              isBindEvent1,
            ),
            (
              distance2,
              minDistance2,
              phi2,
              theta2,
              thetaMargin2,
              target2,
              moveSpeedX2,
              moveSpeedY2,
              rotateSpeed2,
              wheelSpeed2,
              isBindEvent2,
            ),
          ),
        );
      };

      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (
              distance1,
              minDistance1,
              phi1,
              theta1,
              thetaMargin1,
              target1,
              moveSpeedX1,
              moveSpeedY1,
              rotateSpeed1,
              wheelSpeed1,
              isBindEvent1,
            ),
            (
              distance2,
              minDistance2,
              phi2,
              theta2,
              thetaMargin2,
              target2,
              moveSpeedX2,
              moveSpeedY2,
              rotateSpeed2,
              wheelSpeed2,
              isBindEvent2,
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
            "nodes":[{"children":[1,2,3]},{"camera":0,"extras":{"arcballCameraController":0,"basicCameraView":0}},{"camera":1,"extras":{"arcballCameraController":1,"basicCameraView":1}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}}]
                   |j},
          state,
        );
      });
      test("test arcballCameraController", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (
            (
              distance1,
              minDistance1,
              phi1,
              theta1,
              thetaMargin1,
              target1,
              moveSpeedX1,
              moveSpeedY1,
              rotateSpeed1,
              wheelSpeed1,
              isBindEvent1,
            ),
            (
              distance2,
              minDistance2,
              phi2,
              theta2,
              thetaMargin2,
              target2,
              moveSpeedX2,
              moveSpeedY2,
              rotateSpeed2,
              wheelSpeed2,
              isBindEvent2,
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
              "extras":{"arcballCameraControllers":[{"distance":$distance1,"minDistance": $minDistance1,"phi":$phi1,"theta":$theta1,"thetaMargin":$thetaMargin1,"target":[$target1],"moveSpeedX":$moveSpeedX1,"moveSpeedY":$moveSpeedY1,"rotateSpeed":$rotateSpeed1,"wheelSpeed":$wheelSpeed1,"isBindEvent":$isBindEvent1},
              {"distance":$distance2,"minDistance": $minDistance2,"phi":$phi2,"theta":$theta2,"thetaMargin":$thetaMargin2,"target":[$target2],"moveSpeedX":$moveSpeedX2,"moveSpeedY":$moveSpeedY2,"rotateSpeed":$rotateSpeed2,"wheelSpeed":$wheelSpeed2,"isBindEvent":$isBindEvent2}]
                      |j},
          state,
        );
      });
    });

    describe("test meshRenderer", () => {
      let _createMeshRendererGameObject = (isRender, state) => {
        open GameObjectAPI;
        open LightMaterialAPI;
        open MeshRendererAPI;

        let (state, material) = createLightMaterial(state);

        let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
        let (state, meshRenderer) = createMeshRenderer(state);

        let state =
          state
          |> MeshRendererAPI.setMeshRendererIsRender(meshRenderer, isRender);

        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectLightMaterialComponent(gameObject, material)
          |> addGameObjectGeometryComponent(gameObject, geometry)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        (
          state,
          gameObject,
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          ),
          meshRenderer,
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (state, gameObject1, transform1, meshRenderer1) =
          _createMeshRendererGameObject(true, state);

        let (state, gameObject2, transform2, meshRenderer2) =
          _createMeshRendererGameObject(false, state);

        let state =
          state
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             )
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform2,
             );

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (meshRenderer1, meshRenderer2),
        );
      };

      test("test meshRenderers", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (meshRenderer1, meshRenderer2),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
"extras":{"meshRenderers":[{"isRender":true,"drawMode":4},{"isRender":false,"drawMode":4}]}
                |j},
          state,
        );
      });
    });

    describe("test script", () => {
      let _createScriptGameObject = state => {
        open GameObjectAPI;

        let (state, gameObject, script) = ScriptTool.createGameObject(state);
        let state =
          ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.buildScriptData(
            ~script,
            ~state,
            (),
          );

        (
          state,
          gameObject,
          unsafeGetGameObjectTransformComponent(gameObject, state),
          script,
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (state, gameObject1, transform1, script1) =
          _createScriptGameObject(state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          geometry2,
          (material2, diffuseColor2),
          meshRenderer2,
        ) =
          _createGameObject1(state);

        /* let state = GameObjectTool.disposeGameObject(gameObject1, state);
           let (
             state,
             gameObject3,
             transform3,
             (basicCameraView3, perspectiveCameraProjection3),
           ) =
             _createCameraGameObject(state);

           let (
             state,
             gameObject4,
             transform4,
             (basicCameraView4, perspectiveCameraProjection4),
           ) =
             _createCameraGameObject(state);

           let state =
             BasicCameraViewAPI.activeBasicCameraView(basicCameraView3, state); */

        let state =
          state
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             )
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform2,
             );

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          script1,
        );
      };

      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          script1,
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
"nodes":[{"children":[1,2]},{"extras":{"script":$script1}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}}]
                   |j},
          state,
        );
      });
      test("test extras", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          script1,
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          "\"extras\":{\"scripts\":[{\"isActive\":true,\"eventFunctionDataMap\":{\"scriptEventFunctionData1\":[\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute1\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nvarunsafeGetScriptAttributeFieldValue=api.unsafeGetScriptAttributeFieldValue;\\nvarsetScriptAttributeFieldValue=api.setScriptAttributeFieldValue;\\nreturnsetScriptAttributeFieldValue(script,\\n/*tuple*/\\n[scriptAttributeName,\\\"a\\\",unsafeGetScriptAttributeFieldValue(\\\"a\\\",scriptAttribute)+1|0],state);\\n}\",\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute1\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nreturnsetScriptAttributeFloatFieldValue(api,script,scriptAttributeName,\\\"b\\\",unsafeGetScriptAttributeFloatFieldValue$1(api,\\\"b\\\",scriptAttribute)+10,state);\\n}\",\"function(script,api,state){\\nvarunsafeGetScriptGameObject=api.unsafeGetScriptGameObject;\\nvarunsafeGetGameObjectTransformComponent=api.unsafeGetGameObjectTransformComponent;\\nvargetTransformLocalPosition=api.getTransformLocalPosition;\\nvarsetTransformLocalPosition=api.setTransformLocalPosition;\\nvartransform=unsafeGetGameObjectTransformComponent(unsafeGetScriptGameObject(script,state),state);\\nvarmatch=getTransformLocalPosition(transform,state);\\nreturnsetTransformLocalPosition(transform,\\n/*tuple*/\\n[match[0]+10,match[1],match[2]],state);\\n}\"]},\"attributeMap\":{\"scriptAttribute1\":{\"a\":[0,1,1],\"b\":[1,0.1,0.1]}}}]",
          state,
        );
      });

      describe("test event function", () =>
        testPromise("test exec init event function", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (material2, diffuseColor2),
            script1,
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
            sandbox^,
            rootGameObject,
            ((state, _, (rootGameObject, _))) => {
              let state =
                ScriptTool.ExecEventFunction.execAllInitEventFunction(state);

              AssembleWDBSystemTool.getAllScripts(rootGameObject, state)
              |> Js.Array.map(script =>
                   ScriptTool.unsafeGetScriptAttributeIntFieldValue(
                     script,
                     ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeName(),
                     ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getScriptAttributeFieldAName(),
                     state,
                   )
                 )
              |> expect
              == [|
                   ScriptTool.TestCaseWithOneEventFuncAndOneAttribute.getAttributeFieldAValueAfterExecInitEventFunc(),
                 |];
            },
            state,
          );
        })
      );
    });

    describe("test light", () => {
      let _createDirectionLightGameObject = state => {
        open GameObjectAPI;

        let (state, gameObject, light) =
          DirectionLightTool.createGameObject(state);

        let color = [|0., 0., 1.|];
        let intensity = 1.5;

        let state =
          state
          |> DirectionLightAPI.setDirectionLightColor(light, color)
          |> DirectionLightAPI.setDirectionLightIntensity(light, intensity);

        (
          state,
          gameObject,
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          ),
          (light, (color, intensity)),
        );
      };

      let _createPointLightGameObject = state => {
        open GameObjectAPI;

        let (state, gameObject, light) =
          PointLightTool.createGameObject(state);

        let color = [|1., 0., 0.5|];
        let intensity = 3.5;
        let constant = 4.5;
        let linear = 5.;
        let quadratic = 6.5;
        let range = 32.;

        let state =
          state
          |> PointLightAPI.setPointLightColor(light, color)
          |> PointLightAPI.setPointLightIntensity(light, intensity)
          |> PointLightAPI.setPointLightConstant(light, constant)
          |> PointLightAPI.setPointLightLinear(light, linear)
          |> PointLightAPI.setPointLightQuadratic(light, quadratic)
          |> PointLightAPI.setPointLightRange(light, range);

        (
          state,
          gameObject,
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          ),
          (light, (color, intensity, constant, linear, quadratic, range)),
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let ambientLightColor = [|0.5, 0.5, 1.|];

        let state = SceneAPI.setAmbientLightColor(ambientLightColor, state);

        let (state, gameObject1, transform1, (light1, (color1, intensity1))) =
          _createDirectionLightGameObject(state);

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
            light3,
            (color3, intensity3, constant3, linear3, quadratic3, range3),
          ),
        ) =
          _createPointLightGameObject(state);

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
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        );
      };

      test("test extensions", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
     "extensions": {
       "KHR_lights": {
         "lights": [
           {
             "intensity": $intensity1,
             "color": [$color1],
             "type": "directional"
           },
           {
             "range": $range3,
             "quadraticAttenuation": $quadratic3,
             "linearAttenuation": $linear3,
             "constantAttenuation": $constant3,
             "intensity": $intensity3,
             "color": [$color3],
             "type": "point"
           },
           {
             "color": [$ambientLightColor],
             "type": "ambient"
           }
         ]
       }
     },
                   |j},
          state,
        );
      });
      test("test scenes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
            "scenes":[{"extensions":{"KHR_lights":{"light":2}}
                   |j},
          state,
        );
      });
      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
     "nodes":[{"children":[1,2]},{"extensions":{"KHR_lights":{"light":0}}},{"children":[3],"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"lightMaterial":0,"meshRenderer":0}},{"extensions":{"KHR_lights":{"light":1}}}]
                   |j},
          state,
        );
      });

      testPromise("test directionLight data", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
          sandbox^,
          rootGameObject,
          ((state, _, (rootGameObject, _))) =>
            AssembleWDBSystemTool.getAllDirectionLightData(
              rootGameObject,
              state,
            )
            |> expect == [|(color1, intensity1)|],
          state,
        );
      });

      testPromise("test pointLight data", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (material2, diffuseColor2),
          (
            ambientLightColor,
            (light1, (color1, intensity1)),
            (
              light3,
              (color3, intensity3, constant3, linear3, quadratic3, range3),
            ),
          ),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
          sandbox^,
          rootGameObject,
          ((state, _, (rootGameObject, _))) =>
            AssembleWDBSystemTool.getAllPointLightData(rootGameObject, state)
            |> expect
            == [|
                 (color3, intensity3, constant3, linear3, quadratic3, range3),
               |],
          state,
        );
      });
    });

    describe("test drawMode and basicMaterial", () => {
      let _createBasicMaterialGameObject = state => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open GeometryAPI;
        open MeshRendererAPI;

        let (state, material) = createBasicMaterial(state);

        let color = [|0.5, 0.5, 1.|];

        let state = setBasicMaterialColor(material, color, state);

        let (state, gameObject, geometry, _) =
          GeometryTool.createGameObjectAndSetPointData(state);

        let drawMode = DrawModeType.Lines;
        let (state, meshRenderer) = createMeshRenderer(state);
        let state =
          setMeshRendererDrawMode(
            meshRenderer,
            drawMode |> DrawModeType.drawModeToUint8,
            state,
          );

        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject, material)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        (
          state,
          gameObject,
          transform,
          (material, color),
          (meshRenderer, drawMode),
        );
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (
          state,
          gameObject1,
          transform1,
          (material1, color1),
          (meshRenderer1, drawMode1),
        ) =
          _createBasicMaterialGameObject(state);

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
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             )
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform2,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          ((material1, color1), (material2, diffuseColor2)),
          (
            (meshRenderer1, drawMode1),
            (
              meshRenderer2,
              MeshRendererAPI.getMeshRendererDrawMode(meshRenderer2, state),
            ),
          ),
        );
      };

      test("test extras->basicMaterials and meshRenderers", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          ((material1, color1), (material2, diffuseColor2)),
          ((meshRenderer1, drawMode1), (meshRenderer2, drawMode2)),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
      "extras":{"basicMaterials":[{"colorFactor":[$color1,1]}],"meshRenderers":[{"isRender":true, "drawMode":$drawMode1},{"isRender":true,"drawMode":$drawMode2}]}
                   |j},
          state,
        );
      });
      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          ((material1, color1), (material2, diffuseColor2)),
          ((meshRenderer1, drawMode1), (meshRenderer2, drawMode2)),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
      "nodes":[{"children":[1,2]},{"mesh":0,"extras":{"basicMaterial":0,"meshRenderer":0}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":1,"extras":{"lightMaterial":0,"meshRenderer":1}}]
                   |j},
          state,
        );
      });
      test("test materials", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          ((material1, color1), (material2, diffuseColor2)),
          ((meshRenderer1, drawMode1), (meshRenderer2, drawMode2)),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
            "materials":[{"pbrMetallicRoughness":{"baseColorFactor":[$diffuseColor2,1]}}]
                   |j},
          state,
        );
      });
    });

    describe("test toDataURL", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let state = state^;

        let rootGameObject = SceneAPI.getSceneGameObject(state);

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (state, gameObject1, transform1) =
          _createGameObjectWithMap("1", "1.jpg", state);

        let (state, gameObject2, transform2) =
          _createGameObjectWithMap("2", "2.png", state);

        let state =
          state
          |> SceneAPI.addSceneChild(transform1)
          |> SceneAPI.addSceneChild(transform2);

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (state, rootGameObject, canvas);
      };

      test("pass mimeType to toDataURL based on source.name", () => {
        let (state, rootGameObject, canvas) = _prepareGameObject(state);

        let _ =
          GenerateSceneGraphAPI.generateGLBData(
            rootGameObject,
            Js.Nullable.return(
              WonderCommonlib.MutableSparseMapService.createEmpty(),
            ),
            true,
            state,
          );

        (
          Obj.magic(canvas)##toDataURL |> getCall(0) |> getArgs,
          Obj.magic(canvas)##toDataURL |> getCall(1) |> getArgs,
        )
        |> expect == (["image/jpeg"], ["image/png"]);
      });
    });

    describe("test image name", () => {
      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let textureName = "texture_name";
        let imageName = "image_name";

        let (state, gameObject1, transform1) =
          _createGameObjectWithMap(textureName, imageName, state);

        let state =
          state
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          gameObject1,
          (textureName, imageName),
        );
      };

      testPromise(
        "generate wdb->image name should equal the image name before assemble wdb",
        () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            gameObject1,
            (textureName, imageName),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
            sandbox^,
            rootGameObject,
            ((state, _, (rootGameObject, _))) =>
              AssembleWDBSystemTool.getAllDiffuseMaps(rootGameObject, state)
              |> Js.Array.map(map =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     map,
                     state,
                   )
                   |> ImageUtils.getImageName
                 )
              |> expect == [|imageName|],
            state,
          );
        },
      );
    });

    describe("optimize", () =>
      describe("get image base64 from map", () => {
        let _prepareGameObject = state => {
          open GameObjectAPI;

          let (state, rootGameObject) = state^ |> createGameObject;

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
            (rootGameObject, sceneGameObjectTransform),
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
            ),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          );
        };

        test("test images", () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
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
            ),
            (meshRenderer1, meshRenderer2, meshRenderer3),
          ) =
            _prepareGameObject(state);

          let uint8ArrayData1 = ("image/png", Uint8Array.make([|1|]));
          let uint8ArrayData2 = ("image/jpeg", Uint8Array.make([|2|]));

          let imageUint8ArrayMap =
            WonderCommonlib.MutableSparseMapService.createEmpty()
            |> WonderCommonlib.MutableSparseMapService.set(
                 texture2,
                 uint8ArrayData1,
               )
            |> WonderCommonlib.MutableSparseMapService.set(
                 texture3,
                 uint8ArrayData2,
               );

          GenerateSceneGraphSystemTool.testGLTFResultByGameObjectWithImageUint8ArrayDataMap(
            rootGameObject,
            {j|
                "images":[{"bufferView":12,"mimeType":"image/png"},{"bufferView":13,"mimeType":"image/jpeg"}]
                   |j},
            Js.Nullable.return(imageUint8ArrayMap),
            state,
          );
        });
      })
    );

    describe("test gameObject->isActive", () => {
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
        let state =
          state |> GameObjectAPI.setGameObjectIsActive(gameObject1, false);

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
          state |> GameObjectAPI.setGameObjectIsActive(gameObject2, false);

        let state =
          state
          |> SceneAPI.addSceneChild(transform1)
          |> SceneAPI.addSceneChild(transform2);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (gameObject1, gameObject2),
        );
      };

      test("test nodes", () => {
        let (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (gameObject1, gameObject2),
        ) =
          _prepareGameObject(state);

        GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
          rootGameObject,
          {j|
"nodes":[{"children":[1,2]},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"isActive":false,"lightMaterial":0,"meshRenderer":0}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":1,"extras":{"isActive":false,"lightMaterial":1,"meshRenderer":1}}]
          |j},
          state,
        );
      });
    });

    describe("test isRoot", () =>
      describe("test gltf", () => {
        describe("if scene only has one child", () => {
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

            /* let (state, gameObject2, transform2) =
               _createGameObjectWithMap("2", "2.png", state); */

            let state = state |> SceneAPI.addSceneChild(transform1);
            /* |> SceneAPI.addSceneChild(transform2); */

            let isRoot1 = true;
            let isRoot2 = false;
            let state =
              GameObjectAPI.setGameObjectIsRoot(
                rootGameObject,
                isRoot1,
                state,
              );
            let state =
              GameObjectAPI.setGameObjectIsRoot(gameObject1, isRoot2, state);

            (state, rootGameObject, (isRoot1, isRoot2));
          };

          test("scenes shouldn't has isRoot data", () => {
            let (state, rootGameObject, _) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"scenes":[{"extensions":{"KHR_lights":{"light":0}}
          |j},
              state,
            );
          });
          test(
            {|nodes->first one->isRoot should be scene->isRoot;
               second one->isRoot should be scene->child->isRoot;|},
            () => {
              let (state, rootGameObject, (isRoot1, isRoot2)) =
                _prepareGameObject(state);

              GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
                rootGameObject,
                {j|
"nodes":[{"children":[1],"extras":{"isRoot":$isRoot1}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"isRoot":$isRoot2,"lightMaterial":0,"meshRenderer":0}}]
          |j},
                state,
              );
            },
          );
        });

        describe("else", () => {
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

            let isRoot1 = false;
            let isRoot2 = false;
            let isRoot3 = true;
            let state =
              GameObjectAPI.setGameObjectIsRoot(
                rootGameObject,
                isRoot1,
                state,
              );
            let state =
              GameObjectAPI.setGameObjectIsRoot(gameObject1, isRoot2, state);
            let state =
              GameObjectAPI.setGameObjectIsRoot(gameObject2, isRoot3, state);

            (state, rootGameObject, (isRoot1, isRoot2, isRoot3));
          };

          test("scenes shouldn't has isRoot data", () => {
            let (state, rootGameObject, _) = _prepareGameObject(state);

            GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
              rootGameObject,
              {j|
"scenes":[{"extensions":{"KHR_lights":{"light":0}}
          |j},
              state,
            );
          });
          test(
            {|nodes->first one->isRoot should be scene->isRoot;
               second one->isRoot should be scene->first child->isRoot;
               third one->isRoot should be scene->second child->isRoot;
               |},
            () => {
              let (state, rootGameObject, (isRoot1, isRoot2, isRoot3)) =
                _prepareGameObject(state);

              GenerateSceneGraphSystemTool.testGLTFResultByGameObject(
                rootGameObject,
                {j|
  "nodes":[{"children":[1,2],"extras":{"isRoot":$isRoot1}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":0,"extras":{"isRoot":$isRoot2,"lightMaterial":0,"meshRenderer":0}},{"translation":[10,11,12.5],"rotation":[0,1,2.5,1],"scale":[2,3.5,1.5],"mesh":1,"extras":{"isRoot":$isRoot3,"lightMaterial":1,"meshRenderer":1}}]
          |j},
                state,
              );
            },
          );
        });
      })
    );

    describe("fix bug", () => {
      let _createBasicMaterialGameObjectWithShareGeometry = (geometry, state) => {
        open GameObjectAPI;
        open BasicMaterialAPI;
        open GeometryAPI;
        open MeshRendererAPI;

        let (state, material) = createBasicMaterial(state);

        let color = [|0.5, 0.5, 1.|];

        let state = setBasicMaterialColor(material, color, state);

        let (state, meshRenderer) = createMeshRenderer(state);

        let (state, gameObject) = state |> createGameObject;
        let state =
          state
          |> addGameObjectBasicMaterialComponent(gameObject, material)
          |> addGameObjectGeometryComponent(gameObject, geometry)
          |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

        let transform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            gameObject,
            state,
          );

        (state, gameObject, transform, (material, color));
      };

      let _prepareGameObject = state => {
        open GameObjectAPI;

        let (state, rootGameObject) = state^ |> createGameObject;

        let sceneGameObjectTransform =
          GameObjectAPI.unsafeGetGameObjectTransformComponent(
            rootGameObject,
            state,
          );

        let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);

        let (state, gameObject1, transform1, (material1, color1)) =
          _createBasicMaterialGameObjectWithShareGeometry(geometry, state);

        let (
          state,
          gameObject2,
          (transform2, (localPos2, localRotation2, localScale2)),
          geometry2,
          (material2, diffuseColor2),
          meshRenderer2,
        ) =
          _createGameObjectWithShareGeometry(
            geometry,
            GameObjectAPI.addGameObjectGeometryComponent,
            state,
          );

        let (state, (texture, _), (source, width, height)) =
          _createTexture1(state);

        let state =
          LightMaterialAPI.setLightMaterialDiffuseMap(
            material2,
            texture,
            state,
          );

        let state =
          state
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform1,
             )
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(sceneGameObjectTransform),
               transform2,
             );

        let (canvas, context, (base64Str1, base64Str2)) =
          GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        (
          state,
          (rootGameObject, sceneGameObjectTransform),
          (gameObject1, material1),
          (gameObject2, material2, diffuseColor2),
        );
      };

      testPromise(
        {|
          1.create two gameObjects with one geometry and one basic material(set color to c1) and one light material(set color to c2 and set map);
          2.generate wdb;
          3.assemble wdb;

          the assembled->rootGameObject->light material->diffuseColor should be c2
          |},
        () => {
          let (
            state,
            (rootGameObject, sceneGameObjectTransform),
            (gameObject1, material1),
            (gameObject2, material2, diffuseColor2),
          ) =
            _prepareGameObject(state);

          GenerateSceneGraphSystemTool.testAssembleResultByGameObject(
            sandbox^,
            rootGameObject,
            ((state, _, (rootGameObject, _))) =>
              AssembleWDBSystemTool.getAllLightMaterials(
                rootGameObject,
                state,
              )
              |> Js.Array.map(material =>
                   LightMaterialAPI.getLightMaterialDiffuseColor(
                     material,
                     state,
                   )
                 )
              |> expect == [|diffuseColor2|],
            state,
          );
        },
      );
    });
  });