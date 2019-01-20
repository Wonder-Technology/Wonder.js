open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo transform", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _prepareTransformMatrixData = state => {
      let (state, gameObject1, transform1) =
        GameObjectTool.createGameObject(state^);
      let (state, gameObject2, transform2) =
        GameObjectTool.createGameObject(state);
      let (state, gameObject3, transform3) =
        GameObjectTool.createGameObject(state);
      let state =
        TransformAPI.setTransformParent(
          Js.Nullable.return(transform1),
          transform2,
          state,
        );
      let pos1 = (1., 2., 3.);
      let pos2 = (2., 4., 10.);
      let pos3 = ((-1.), 4., 5.);
      let state =
        TransformAPI.setTransformLocalPosition(transform1, pos1, state);
      let state =
        TransformAPI.setTransformLocalPosition(transform2, pos2, state);
      let state =
        TransformAPI.setTransformLocalPosition(transform3, pos3, state);

      let rotation1 = ((-2.5), 1., 0., 1.);
      let scale1 = (2., 2., 2.5);
      let state =
        state
        |> TransformAPI.setTransformLocalRotation(transform1, rotation1)
        |> TransformAPI.setTransformLocalScale(transform1, scale1);

      let state =
        state
        |> GameObjectTool.disposeGameObjectTransformComponent(
             gameObject3,
             transform3,
             false,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        transform1,
        transform2,
        transform3,
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

    describe("deep copy transform record", () => {
      test("deep copy childMap", () => {
        open TransformType;
        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          transform1,
          transform2,
          transform3,
        ) =
          _prepareTransformMatrixData(state);
        let _ = TransformAPI.getTransformPosition(transform2, state);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let (copiedState, transform4) =
          TransformAPI.createTransform(copiedState);
        let _ =
          copiedState
          |> TransformAPI.setTransformParent(
               Js.Nullable.return(transform4),
               transform2,
             );
        state
        |> TransformAPI.unsafeGetTransformChildren(transform1)
        |> expect == [|transform2|];
      });
      test("clear localToWorldMatrixCacheMap, normalMatrixCacheMap", () => {
        open TransformType;
        let (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          transform1,
          transform2,
          transform3,
        ) =
          _prepareTransformMatrixData(state);
        let _ =
          TransformTool.updateAndGetNormalMatrixTypeArray(transform2, state);
        let copiedState = MainStateTool.deepCopyForRestore(state);
        let (copiedState, transform4) =
          TransformAPI.createTransform(copiedState);
        let {localToWorldMatrixCacheMap, normalMatrixCacheMap} =
          TransformTool.getRecord(copiedState);
        (localToWorldMatrixCacheMap, normalMatrixCacheMap)
        |>
        expect == (
                    WonderCommonlib.MutableSparseMapService.createEmpty(),
                    WonderCommonlib.MutableSparseMapService.createEmpty(),
                  );
      });

      /* describe(
           "optimize deep copy parentMap, childMap, dirtyMap, gameObjectMap", () =>
           describe("if data is dirty, copy it", () =>{

             /* test(
               "if dispose transform, all can-be-dirty-data should be dirty", () => {
               let (
                 state,
                 gameObject1,
                 gameObject2,
                 gameObject3,
                 transform1,
                 transform2,
                 transform3,
               ) =
                 _prepareTransformMatrixData(state);

               let copiedState = MainStateTool.deepCopyForRestore(state);

               let (state, gameObject4, transform4) =
                 GameObjectTool.createGameObject(copiedState);

               let copiedState =
                 GameObjectTool.disposeGameObjectTransformComponent(
                   gameObject4,
                   transform4,
                   true,
                   copiedState,
                 );

               let copiedState2 = MainStateTool.deepCopyForRestore(copiedState);

               let (copiedState2, transform5) =
                 TransformAPI.createTransform(copiedState2);

               let copiedState2 =
                 copiedState2
                 |> TransformAPI.setTransformParent(
                      Js.Nullable.return(transform1),
                      transform5,
                    );

               copiedState
               |> TransformAPI.unsafeGetTransformChildren(transform1)
               |> expect == [|transform2|];
             }); */
           }
           )
         ); */

      describe("fix bug", () =>
        test(
          {|
              create transform t1,t2;
              copy state to copiedState1;
              copy state to copiedState2;
              set t1 to be t2's parent with state;

              t1->children should be empty with copiedState2.
              |},
          () => {
            let (state, gameObject1, transform1) =
              GameObjectTool.createGameObject(state^);
            let (state, gameObject2, transform2) =
              GameObjectTool.createGameObject(state);

            let copiedState1 = MainStateTool.deepCopyForRestore(state);
            let copiedState2 = MainStateTool.deepCopyForRestore(state);
            let state =
              state
              |> TransformAPI.setTransformParent(
                   Js.Nullable.return(transform1),
                   transform2,
                 );

            copiedState2
            |> TransformAPI.unsafeGetTransformChildren(transform1)
            |> expect == [||];
          },
        )
      );
    });

    describe("restore transform record to target state", () => {
      let _test = state => {
        open TransformType;
        let {
          localToWorldMatrices,
          localPositions,
          localRotations,
          localScales,
        } =
          state |> TransformTool.getRecord;
        (localToWorldMatrices, localPositions, localRotations, localScales)
        |>
        expect == (
                    Float32Array.make([|
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      (-2.),
                      (-10.),
                      (-4.),
                      0.,
                      (-10.),
                      (-23.),
                      (-10.),
                      0.,
                      5.,
                      12.5,
                      (-33.75),
                      0.,
                      1.,
                      2.,
                      3.,
                      1.,
                      (-2.),
                      (-10.),
                      (-4.),
                      0.,
                      (-10.),
                      (-23.),
                      (-10.),
                      0.,
                      5.,
                      12.5,
                      (-33.75),
                      0.,
                      7.,
                      15.,
                      (-382.5),
                      1.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      0.,
                      1.,
                    |]),
                    Float32Array.make([|
                      0.,
                      0.,
                      0.,
                      1.,
                      2.,
                      3.,
                      2.,
                      4.,
                      10.,
                      0.,
                      0.,
                      0.,
                      0.,
                      0.,
                      0.,
                    |]),
                    Float32Array.make([|
                      0.,
                      0.,
                      0.,
                      1.,
                      (-2.5),
                      1.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      0.,
                      1.,
                    |]),
                    Float32Array.make([|
                      1.,
                      1.,
                      1.,
                      2.,
                      2.,
                      2.5,
                      1.,
                      1.,
                      1.,
                      1.,
                      1.,
                      1.,
                      1.,
                      1.,
                      1.,
                    |]),
                  );
      };
      test("test restore typeArrays", () => {
        open TransformType;
        state :=
          TestTool.initWithJobConfigWithoutBuildFakeDom(
            ~sandbox,
            ~buffer=SettingTool.buildBufferConfigStr(~transformCount=5, ()),
            (),
          );

        let (state, gameObject1, gameObject2, _, transform1, transform2, _) =
          _prepareTransformMatrixData(state);

        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = TransformTool.update(transform1, state);
        let state = TransformTool.update(transform2, state);
        let copiedState = MainStateTool.deepCopyForRestore(state);

        let currentState = state;
        let (currentState, _, transform4) =
          GameObjectTool.createGameObject(currentState);

        let pos4 = ((-2.), 3., 1.);
        let rotation4 = ((-2.5), 1., 0., 1.);
        let scale4 = (2., 2., 2.5);
        let currentState =
          currentState
          |> TransformAPI.setTransformLocalPosition(transform4, pos4)
          |> TransformAPI.setTransformLocalRotation(transform4, rotation4)
          |> TransformAPI.setTransformLocalScale(transform4, scale4);

        let currentState = TransformTool.update(transform1, currentState);
        let _ = MainStateTool.restore(currentState, copiedState);
        _test(MainStateTool.unsafeGetState());
      });

      describe("test restore to the same state", () =>
        test("should not change typeArrays", () => {
          open TransformType;
          state :=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=SettingTool.buildBufferConfigStr(~transformCount=5, ()),
              (),
            );

          let (state, gameObject1, gameObject2, _, transform1, transform2, _) =
            _prepareTransformMatrixData(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let state = TransformTool.update(transform1, state);
          let state = TransformTool.update(transform2, state);
          let _ = MainStateTool.restore(state, state);
          _test(MainStateTool.unsafeGetState());
        })
      );
    });
  });