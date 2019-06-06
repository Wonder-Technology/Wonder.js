open Wonder_jest;

let _ =
  describe("test redo,undo flyCameraController", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _prepareState = () => {
      let state =
        MouseEventTool.prepareWithState(
          ~sandbox,
          ~state=
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~noWorkerJobRecord=
                NoWorkerJobConfigTool.buildNoWorkerJobConfig(
                  ~initPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "init_event"
        },
        {
          "name": "init_camera"
        }
      ]
    }
  ]
        |},
                  ~initJobs=
                    {j|
[

    {
          "name": "init_event"
    },
        {
          "name": "init_camera"
        }
]
        |j},
                  (),
                ),
              (),
            ),
          (),
        );
      MouseEventTool.setPointerLocked(.);

      state;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test redo/undo binded eventHandleFunc map", () =>
      test("test restore pointDragOverEventHandleFuncMap", () => {
        createMethodStubWithJsObjSandbox(sandbox, Console.console, "warn");
        let state = _prepareState();
        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          FlyCameraControllerTool.createGameObject(state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          FlyCameraControllerAPI.bindFlyCameraControllerEvent(
            cameraController,
            state,
          );
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          FlyCameraControllerAPI.unbindFlyCameraControllerEvent(
            cameraController,
            state,
          );

        let restoredState = MainStateTool.restore(state, copiedState);

        let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);

        let restoredState = MainStateTool.setState(restoredState);
        EventTool.triggerDomEvent(
          "mousewheel",
          EventTool.getPointEventBindedDom(state),
          MouseEventTool.buildMouseEvent(~preventDefaultFunc, ()),
        );
        let restoredState = EventTool.restore(restoredState);

        preventDefaultFunc |> expect |> toCalledOnce;
      })
    );
    /* TODO test other eventHandleFuncMap */
    describe("deep copy flyCameraController record", () =>
      test("shadow copy moveSpeed", () => {
        open StateDataMainType;
        let state = _prepareState();
        let state = state |> NoWorkerJobTool.execInitJobs;
        let targetValue = 5.;

        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          FlyCameraControllerTool.createGameObject(state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          FlyCameraControllerAPI.setFlyCameraControllerMoveSpeed(
            cameraController,
            targetValue,
            state,
          );

        let restoredState = MainStateTool.restore(state, copiedState);

        FlyCameraControllerAPI.unsafeGetFlyCameraControllerMoveSpeed(
          cameraController,
          restoredState,
        )
        |> expect != targetValue;
      })
    );
    /* TODO test copy other data */
  });