open Wonder_jest;

let _ =
  describe("test redo,undo arcballCameraController", () => {
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
          ArcballCameraControllerTool.createGameObject(state);
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state =
          ArcballCameraControllerAPI.bindArcballCameraControllerEvent(
            cameraController,
            state,
          );
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          ArcballCameraControllerAPI.unbindArcballCameraControllerEvent(
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
    describe("deep copy arcballCameraController record", () =>
      test("shadow copy distanceMap", () => {
        open StateDataMainType;
        let state = _prepareState();
        let state = state |> NoWorkerJobTool.execInitJobs;

        let (
          state,
          gameObject,
          transform,
          (cameraController, basicCameraView, perspectiveCameraProjection),
        ) =
          ArcballCameraControllerTool.createGameObject(state);
        let state =
          state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

        let copiedState = state |> MainStateTool.deepCopyForRestore;

        let state =
          ArcballCameraControllerAPI.setArcballCameraControllerDistance(
            cameraController,
            5.,
            state,
          );

        let restoredState = MainStateTool.restore(state, copiedState);

        ArcballCameraControllerAPI.unsafeGetArcballCameraControllerDistance(
          cameraController,
          restoredState,
        )
        |> expect != 5.;
      })
    );
    /* TODO test copy other data */
  });