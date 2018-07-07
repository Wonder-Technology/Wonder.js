open Wonder_jest;

open EventType;

let _ =
  describe("InitEventJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    /* let MouseEventTool.~sandbox, prepare =
        (
          ~offsetLeft=1,
          ~offsetTop=2,
          ~offsetParent=Js.Nullable.undefined,
          ~setBrowserFunc=BrowserDetectTool.setChrome,
          (),
        ) => {
      let canvasDom =
        EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent));

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
    }
]
        |j},
              (),
            ),
          (),
        );

      let state = ViewTool.setCanvas(canvasDom |> Obj.magic, state^);

      MainStateTool.setState(state) |> ignore;

      setBrowserFunc();

      MainStateTool.unsafeGetState();
    }; */

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind dom event", () =>
      describe("bind mouse event", () =>
        describe("bind mousedown event", () => {
          test("test bind", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onDomEvent(
                MouseDown,
                0,
                (event: mouseEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () => {
            test("test", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc = (event: mouseEvent, state) => {
                value := value^ + 1;
                state;
              };
              let state =
                ManageEventAPI.onDomEvent(MouseDown, 0, handleFunc, state);

              let state =
                ManageEventAPI.offDomEventByHandleFunc(
                  MouseDown,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            });
            test("test unbind one handleFunc of the eventName", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc = (event: mouseEvent, state) => {
                value := value^ + 1;
                state;
              };
              let state =
                ManageEventAPI.onDomEvent(MouseDown, 0, handleFunc, state);
              let state =
                ManageEventAPI.onDomEvent(
                  MouseDown,
                  0,
                  (event: mouseEvent, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );

              let state =
                ManageEventAPI.offDomEventByHandleFunc(
                  MouseDown,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });
          });

          describe("test mouse event", () => {
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                let state = MouseEventTool.prepare(~sandbox, ~offsetLeft=1, ~offsetTop=2, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onDomEvent(
                    MouseDown,
                    0,
                    (event: mouseEvent, state) => {
                      let (x, y) = event.locationInView;
                      valueX := x;
                      valueY := y;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (10 - 1, 20 - 2);
              });
              test("test view has offsetParent", () => {
                let state =
                  MouseEventTool.prepare(~sandbox, 
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    ~offsetParent=
                      Js.Nullable.return({
                        "offsetLeft": 11,
                        "offsetTop": 12,
                        "offsetParent": Js.Nullable.undefined,
                      }),
                    (),
                  );
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onDomEvent(
                    MouseDown,
                    0,
                    (event: mouseEvent, state) => {
                      let (x, y) = event.locationInView;
                      valueX := x;
                      valueY := y;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (10 - 1 - 11, 20 - 2 - 12);
              });
            });

            describe("test button", () => {
              let _test = (eventButton, targetButton) => {
                let state = MouseEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let button = ref(Right);

                let state =
                  ManageEventAPI.onDomEvent(
                    MouseDown,
                    0,
                    (event: mouseEvent, state) => {
                      button := event.button;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~button=eventButton, ()),
                );
                let state = EventTool.restore(state);

                button^ |> expect == targetButton;
              };

              test("test Left", () =>
                _test(0, Left)
              );
              test("test Right", () =>
                _test(1, Right)
              );
              test("test Center", () =>
                _test(2, Center)
              );
            });
          });

          describe("test movementDelta", () => {
            describe("if is pointer locked", () =>
              test("get data from event.movementX/movementY", () => {
                let state = MouseEventTool.prepare(~sandbox, ());
                MouseEventTool.setPointerLocked(.);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onDomEvent(
                    MouseDown,
                    0,
                    (event: mouseEvent, state) => {
                      let (x, y) = event.movementDelta;
                      valueX := x;
                      valueY := y;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(
                    ~movementX=1,
                    ~movementY=2,
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (1, 2);
              })
            );
            describe("else, compute", () => {
              let _test =
                  ((lastX, lastY), (pageX, pageY), (targetX, targetY)) => {
                let state = MouseEventTool.prepare(~sandbox, ());
                MouseEventTool.setNotPointerLocked(.);
                let state = MouseEventTool.setLastXY(lastX, lastY, state);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onDomEvent(
                    MouseDown,
                    0,
                    (event: mouseEvent, state) => {
                      let (x, y) = event.movementDelta;
                      valueX := x;
                      valueY := y;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (targetX, targetY);
              };

              test("test has no lastX, lastY", () =>
                _test((None, None), (0, 0), (0, 0))
              );
              test("test has lastX, lastY", () =>
                _test((Some(1), Some(2)), (10, 11), (10 - 1, 11 - 2))
              );
            });
          });

          describe("test wheel", () => {
            let _test = (mouseEvent, targetWheel) => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let wheel = ref(0);

              let state =
                ManageEventAPI.onDomEvent(
                  MouseDown,
                  0,
                  (event: mouseEvent, state) => {
                    wheel := event.wheel;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                mouseEvent,
              );
              let state = EventTool.restore(state);

              wheel^ |> expect == targetWheel;
            };

            test("if event.detail exist, use it", () =>
              _test(
                MouseEventTool.buildMouseEvent(
                  ~detail=Js.Nullable.return(2),
                  (),
                ),
                (-1) * 2,
              )
            );
            test("else, use event.wheelDelta", () =>
              _test(
                MouseEventTool.buildMouseEvent(
                  ~detail=Js.Nullable.undefined,
                  ~wheelDelta=Js.Nullable.return(120),
                  (),
                ),
                120 / 120,
              )
            );
            test("else, return 0", () =>
              _test(
                MouseEventTool.buildMouseEvent(
                  ~detail=Js.Nullable.undefined,
                  ~wheelDelta=Js.Nullable.undefined,
                  (),
                ),
                0,
              )
            );
          });
          describe("test other data", () =>
            test("test name, location", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let name = ref(MouseUp);
              let (valueX, valueY) = (ref(0), ref(0));

              let state =
                ManageEventAPI.onDomEvent(
                  MouseDown,
                  0,
                  (event: mouseEvent, state) => {
                    let (x, y) = event.location;
                    valueX := x;
                    valueY := y;
                    name := event.name;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
              );
              let state = EventTool.restore(state);

              (name^, valueX^, valueY^) |> expect == (MouseDown, 10, 20);
            })
          );

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(2);

              let state =
                ManageEventAPI.onDomEvent(
                  MouseDown,
                  0,
                  (event: mouseEvent, state) => {
                    value := value^ - 2;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.onDomEvent(
                  MouseDown,
                  1,
                  (event: mouseEvent, state) => {
                    value := value^ * 2;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 2 * 2 - 2;
            })
          );
          /*! can't stub log and judge log called once(because log error is in promise)*/
          test("if browser is not chrome or firefox, not exec handleFunc", () => {
            let state =
              MouseEventTool.prepare(~sandbox, ~setBrowserFunc=BrowserDetectTool.setUnknown, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onDomEvent(
                MouseDown,
                0,
                (event: mouseEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 0;
          });
        })
      )
    );
    /* TODO describe
       ("bind mouseup event",
       (
       () => {

       })
       ); */

    describe("bind dom event to trigger point event", ()
      =>
        describe("bind mouse event to trigger point event", () =>
          describe("test trigger pointdown event", () => {
            test("test bind", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (event, state) => {
                    value := 1;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 1;
            });

            describe("test unbind by handleFunc", () =>
              test("test unbind one handleFunc of the eventName", () => {
                let state = MouseEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let value = ref(0);
                let handleFunc = (event, state) => {
                  value := value^ + 1;
                  state;
                };

                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    handleFunc,
                    state,
                  );
                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    (event, state) => {
                      value := value^ + 10;
                      state;
                    },
                    state,
                  );
                let state =
                  ManageEventAPI.offCustomGlobalEventByHandleFunc(
                    CustomEventTool.getPointDownEventName(),
                    handleFunc,
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(),
                );
                let state = EventTool.restore(state);

                value^ |> expect == 10;
              })
            );

            describe("test unbind by eventName", () =>
              test("test", () => {
                let state = MouseEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let value = ref(0);
                let handleFunc = (event, state) => {
                  value := value^ + 1;
                  state;
                };

                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    handleFunc,
                    state,
                  );
                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    (event, state) => {
                      value := value^ + 10;
                      state;
                    },
                    state,
                  );
                let state =
                  ManageEventAPI.offCustomGlobalEventByEventName(
                    CustomEventTool.getPointDownEventName(),
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(),
                );
                let state = EventTool.restore(state);

                value^ |> expect == 0;
              })
            );

            describe("test point event", () =>
              test(
                "test name, location, locationInView, button, wheel, movementDelta",
                () => {
                let state =
                  MouseEventTool.prepare(~sandbox, 
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    ~offsetParent=Js.Nullable.undefined,
                    (),
                  );
                MouseEventTool.setPointerLocked(.);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let refEvent: ref(pointEvent) = ref(Obj.magic(1));

                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    (event, state) => {
                      refEvent :=
                        event.userData |> OptionService.unsafeGet |> Obj.magic;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(
                    ~pageX=10,
                    ~pageY=20,
                    ~button=0,
                    ~movementX=1,
                    ~movementY=2,
                    ~detail=Js.Nullable.return(2),
                    ~wheelDelta=Js.Nullable.undefined,
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                refEvent^
                |>
                expect == {
                            name: PointDown,
                            location: (10, 20),
                            locationInView: (10 - 1, 20 - 2),
                            button: Left,
                            wheel: (-1) * 2,
                            movementDelta: (1, 2),
                          };
              })
            );

            describe("test priority", () =>
              test("the higher priority handleFunc is executed first", () => {
                let state = MouseEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let value = ref(2);

                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    0,
                    (event, state) => {
                      value := value^ - 2;
                      state;
                    },
                    state,
                  );
                let state =
                  ManageEventAPI.onCustomGlobalEvent(
                    CustomEventTool.getPointDownEventName(),
                    1,
                    (event, state) => {
                      value := value^ * 2;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(),
                );
                let state = EventTool.restore(state);

                value^ |> expect == 2 * 2 - 2;
              })
            );
          })
        )
      );
      /* TODO test pointup */
  });