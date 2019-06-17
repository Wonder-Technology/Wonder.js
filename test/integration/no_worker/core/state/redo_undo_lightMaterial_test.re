open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo lightMaterial", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _prepareLightMaterialData = state => {
      open LightMaterialAPI;
      open Js.Typed_array;
      let (state, gameObject1, material1) =
        LightMaterialTool.createGameObject(state^);
      let (state, gameObject2, material2) =
        LightMaterialTool.createGameObject(state);
      let (state, gameObject3, material3) =
        LightMaterialTool.createGameObject(state);
      let state = AllMaterialTool.prepareForInit(state);
      /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
         let state = LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
      let diffuseColor2 = [|1., 0.5, 0.0|];
      let specularColor2 = [|0., 1.0, 0.5|];
      let state =
        state |> setLightMaterialDiffuseColor(material2, diffuseColor2);
      let state =
        state |> setLightMaterialSpecularColor(material2, specularColor2);
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        material1,
        material2,
        material3,
      );
    };

    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        RenderJobsTool.initWithJobConfig(
          sandbox,
          LoopRenderJobTool.buildNoWorkerJobConfig(),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deep copy light material record", () => {
      test("shadow copy nameMap, materialArrayForWorkerInit", () =>
        StateDataMainType.(
          LightMaterialType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {nameMap, materialArrayForWorkerInit} =
                  LightMaterialTool.getRecord(state);
                [|
                  nameMap |> Obj.magic,
                  materialArrayForWorkerInit |> Obj.magic,
                |];
              },
              state^,
            )
          )
        )
      );
      test("deep copy gameObjectsMap", () => {
        open StateDataMainType;
        open LightMaterialType;
        let (state, gameObject1, basicMaterial1) =
          LightMaterialTool.createGameObject(state^);
        let {gameObjectsMap} = LightMaterialTool.getRecord(state);
        let originGameObjectsArr = [|1|];
        let originEmptyMapUnitArrayMap = [|2, 1, 0|];
        let copiedOriginGameObjectsArr = originGameObjectsArr |> Js.Array.copy;
        let copiedOriginEmptyMapUnitArrayMap =
          originEmptyMapUnitArrayMap |> Js.Array.copy;
        gameObjectsMap
        |> WonderCommonlib.MutableSparseMapService.set(
             basicMaterial1,
             originGameObjectsArr,
           )
        |> ignore;
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let {gameObjectsMap} = LightMaterialTool.getRecord(copiedState);
        let arr =
          gameObjectsMap
          |> WonderCommonlib.MutableSparseMapService.unsafeGet(basicMaterial1);
        Array.unsafe_set(arr, 0, 2);

        let {gameObjectsMap} = LightMaterialTool.getRecord(state);
        gameObjectsMap
        |> WonderCommonlib.MutableSparseMapService.unsafeGet(basicMaterial1)
        |> expect == copiedOriginGameObjectsArr;
      });
    });

    describe("restore light material record to target state", () =>
      test("test restore typeArrays", () => {
        open LightMaterialType;
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=
              SettingTool.buildBufferConfigStr(~lightMaterialCount=4, ()),
            (),
          );

        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          material1,
          material2,
          material3,
        ) =
          _prepareLightMaterialData(state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let (currentState, gameObject4, material4) =
          LightMaterialTool.createGameObject(state);
        let currentState =
          LightMaterialAPI.setLightMaterialDiffuseColor(
            material4,
            [|1., 0.1, 1.|],
            currentState,
          );
        let currentState =
          LightMaterialAPI.setLightMaterialSpecularColor(
            material4,
            [|0.5, 0.2, 0.|],
            currentState,
          );
        let state = state |> LightMaterialTool.createAndSetMaps(material4);
        let currentState = AllMaterialTool.pregetGLSLData(currentState);
        let _ = MainStateTool.restore(currentState, copiedState);
        let {
          diffuseColors,
          specularColors,
          diffuseTextureIndices,
          specularTextureIndices,
        } =
          MainStateTool.unsafeGetState() |> LightMaterialTool.getRecord;
        let defaultTextureIndex = LightMaterialTool.getDefaultTextureIndex();
        (
          diffuseColors,
          specularColors,
          diffuseTextureIndices,
          specularTextureIndices,
        )
        |> expect
        == (
             Float32Array.make([|
               1.,
               1.,
               1.,
               1.,
               0.5,
               0.,
               1.,
               1.,
               1.,
               1.,
               1.,
               1.,
             |]),
             Float32Array.make([|
               1.,
               1.,
               1.,
               0.,
               1.,
               0.5,
               1.,
               1.,
               1.,
               1.,
               1.,
               1.,
             |]),
             Uint32Array.make([|
               defaultTextureIndex,
               defaultTextureIndex,
               defaultTextureIndex,
               defaultTextureIndex,
             |]),
             Uint32Array.make([|
               defaultTextureIndex,
               defaultTextureIndex,
               defaultTextureIndex,
               defaultTextureIndex,
             |]),
           );
      })
    );
  });