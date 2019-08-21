open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test render imgui job", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.initWithJobConfig(
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
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
              ~initJobs=
                {|
[
        {
          "name": "init_imgui"
        }
]
        |},
              ~loopPipelines=
                {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
              ~loopJobs=
                {|
[
        {
          "name": "render_imgui"
        }
]
        |},
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    test("if not load imgui asset, not error", () => {
      let canvas = {"width": 100, "height": 200} |> Obj.magic;
      let state = ViewTool.setCanvas(canvas, state^);
      let state =
        state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));

      expect(() => {
        let state = state |> NoWorkerJobTool.execInitJobs;
        let state = state |> NoWorkerJobTool.execLoopJobs;
        ();
      })
      |> not_
      |> toThrow;
    });

    describe("else, render imgui", () => {
      describe("test render image", () => {
        let _getPositionBufferData = () => [|
          50.,
          60.,
          50.,
          310.,
          200.,
          60.,
          200.,
          310.,
        |];

        beforeEach(() => state := AssetIMGUITool.prepareFontAsset(state^));

        test("send imgui buffers data", () => {
          let state = RenderIMGUITool.prepareFntData(state^);
          let canvas = {"width": 1000, "height": 500} |> Obj.magic;
          let state = ViewTool.setCanvas(canvas, state);
          let array_buffer = 1;
          let dynamic_draw = 2;
          let getExtension =
            WonderImgui.RenderIMGUITool.buildNoVAOExtension(sandbox);
          let bufferData = createEmptyStubWithJsObjSandbox(sandbox);
          let state =
            state
            |> FakeGlTool.setFakeGl(
                 WonderImgui.FakeGlTool.buildFakeGl(
                   ~sandbox,
                   ~array_buffer,
                   ~bufferData,
                   ~dynamic_draw,
                   ~getExtension,
                   (),
                 ),
               );
          let (
            (
              (imageX1, imageY1, imageWidth1, imageHeight1),
              (imageS01, imageT01, imageS11, imageT11),
              textureId1,
            ),
            _,
            _,
          ) =
            WonderImgui.RenderIMGUITool.buildImageData();
          let image1Data = _getPositionBufferData();
          let state =
            ExecIMGUITool.addExecFuncData(
              ~state,
              ~func=
                (. _, imguiAPIJsObj, state) => {
                  let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);
                  let imageFunc = imguiAPIJsObj##image;
                  let state =
                    imageFunc(.
                      (imageX1, imageY1, imageWidth1, imageHeight1),
                      (imageS01, imageT01, imageS11, imageT11),
                      textureId1,
                      state,
                    );

                  state;
                },
              (),
            );
          let state = state |> NoWorkerJobTool.execInitJobs;
          let bufferDataCallCountAfterInit = bufferData |> getCallCount;

          let state = state |> NoWorkerJobTool.execLoopJobs;

          bufferData
          |> getCall(bufferDataCallCountAfterInit + 0)
          |> expect
          |> toCalledWith([|
               array_buffer,
               Float32Array.make(image1Data) |> Obj.magic,
               dynamic_draw,
             |]);
        });
      });

      describe("test render button", () => {
        let _prepareState = () => {
          state :=
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
          "name": "init_imgui"
        }
      ]
    }
  ]
        |},
                  ~initJobs=
                    {|
[

        {
          "name": "init_event"
        },
        {
          "name": "init_imgui"
        }
]
        |},
                  ~loopPipelines=
                    {|
        [
    {
      "name": "default",
      "jobs": [
        {
          "name": "render_imgui"
        }
      ]
    }
  ]
        |},
                  ~loopJobs=
                    {|
[
        {
          "name": "render_imgui"
        }
]
        |},
                  (),
                ),
              (),
            );

          RenderIMGUITool.prepareIMGUI(state);
        };

        describe("test mousedown button", () =>
          describe("test color buffer data", () => {
            let _prepareAndExec = setDefaultSkinDataFunc => {
              let state = _prepareState();
              let (state, array_buffer, dynamic_draw, bufferData) =
                RenderIMGUITool.prepareGl(sandbox, state);
              let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
                WonderImgui.ButtonIMGUITool.buildButtonData1();
              let state =
                ExecIMGUITool.addExecFuncData(
                  ~state,
                  ~customData=buttonData |> Obj.magic,
                  ~func=
                    (. customData, imguiAPIJsObj, state) => {
                      let (
                        (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                        str1,
                      ) =
                        customData |> Obj.magic;
                      let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

                      let buttonFunc = imguiAPIJsObj##button;

                      let (state, isButtonClick) =
                        buttonFunc(.
                          (
                            (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                            str1,
                          ),
                          Js.Nullable.null,
                          state,
                        );

                      state;
                    },
                  (),
                );

              let state = state |> NoWorkerJobTool.execInitJobs;
              let state = setDefaultSkinDataFunc(state);

              let bufferDataCallCountAfterInit = bufferData |> getCallCount;
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(
                  ~pageX=buttonX1,
                  ~pageY=buttonY1,
                  (),
                ),
              );
              let state = EventTool.restore(state);

              let state = MainStateTool.unsafeGetState();
              let state = state |> NoWorkerJobTool.execLoopJobs;

              (
                state,
                array_buffer,
                dynamic_draw,
                bufferDataCallCountAfterInit,
                bufferData,
              );
            };

            test("test fontTexture program", () => {
              let (
                state,
                array_buffer,
                dynamic_draw,
                bufferDataCallCountAfterInit,
                bufferData,
              ) =
                _prepareAndExec(state =>
                  RenderIMGUITool.setDefaultSkinData(
                    ~state,
                    ~fontColor=[|0.1, 0.2, 0.3|],
                    (),
                  )
                );

              bufferData
              |> getCall(bufferDataCallCountAfterInit + 5)
              |> expect
              |> toCalledWith([|
                   array_buffer,
                   Float32Array.make([|
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                   |])
                   |> Obj.magic,
                   dynamic_draw,
                 |]);
            });
            test("test noTexture program", () => {
              let (
                state,
                array_buffer,
                dynamic_draw,
                bufferDataCallCountAfterInit,
                bufferData,
              ) =
                _prepareAndExec(state =>
                  RenderIMGUITool.setDefaultSkinData(
                    ~state,
                    ~clickButtonColor=[|0.1, 0.2, 0.3|],
                    (),
                  )
                );

              bufferData
              |> getCall(bufferDataCallCountAfterInit + 9)
              |> expect
              |> toCalledWith([|
                   array_buffer,
                   Float32Array.make([|
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                     0.1,
                     0.2,
                     0.3,
                   |])
                   |> Obj.magic,
                   dynamic_draw,
                 |]);
            });
          })
        );

        describe("test click button", () =>
          test("test button is click", () => {
            let state = _prepareState();
            let (state, array_buffer, dynamic_draw, bufferData) =
              RenderIMGUITool.prepareGl(sandbox, state);
            let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
              WonderImgui.ButtonIMGUITool.buildButtonData1();
            let isClick = ref(false);
            let state =
              ExecIMGUITool.addExecFuncData(
                ~state,
                ~customData=buttonData |> Obj.magic,
                ~func=
                  (. customData, imguiAPIJsObj, state) => {
                    let (
                      (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                      str1,
                    ) =
                      customData |> Obj.magic;
                    let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

                    let buttonFunc = imguiAPIJsObj##button;

                    let (state, isButtonClick) =
                      buttonFunc(.
                        (
                          (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                          str1,
                        ),
                        Js.Nullable.null,
                        state,
                      );

                    isClick := isButtonClick;

                    state;
                  },
                (),
              );
            let state = state |> NoWorkerJobTool.execInitJobs;
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(
                ~pageX=buttonX1,
                ~pageY=buttonY1,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            let state = MainStateTool.unsafeGetState();
            let state = state |> NoWorkerJobTool.execLoopJobs;

            isClick^ |> expect == true;
          })
        );

        describe("reset io data->point event state when point up", () =>
          test("test button isn't click after point up", () => {
            let state = _prepareState();
            let (state, array_buffer, dynamic_draw, bufferData) =
              RenderIMGUITool.prepareGl(sandbox, state);
            let ((buttonX1, buttonY1, buttonWidth1, buttonHeight1), str1) as buttonData =
              WonderImgui.ButtonIMGUITool.buildButtonData1();
            let isClick = ref(false);
            let state =
              ExecIMGUITool.addExecFuncData(
                ~state,
                ~customData=buttonData |> Obj.magic,
                ~func=
                  (. customData, imguiAPIJsObj, state) => {
                    let (
                      (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                      str1,
                    ) =
                      customData |> Obj.magic;
                    let imguiAPIJsObj = Obj.magic(imguiAPIJsObj);

                    let buttonFunc = imguiAPIJsObj##button;

                    let (state, isButtonClick) =
                      buttonFunc(.
                        (
                          (buttonX1, buttonY1, buttonWidth1, buttonHeight1),
                          str1,
                        ),
                        Js.Nullable.null,
                        state,
                      );

                    isClick := isButtonClick;

                    state;
                  },
                (),
              );
            let state = state |> NoWorkerJobTool.execInitJobs;

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(
                ~pageX=buttonX1,
                ~pageY=buttonY1,
                (),
              ),
            );
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);
            let state = state |> NoWorkerJobTool.execLoopJobs;

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            let state = state |> NoWorkerJobTool.execLoopJobs;

            isClick^ |> expect == false;
          })
        );
      });
    });
  });