open Wonder_jest;

open EventType;

let _ =
  describe("InitEventJob", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => sandbox := createSandbox());
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("bind dom event", () =>
      describe("bind mouse event", () => {
        let _testMouseEvent = (mouseEventName, mouseDomEventName) => {
          test("test bind", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                mouseEventName,
                0,
                (. event: mouseEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              {j|$mouseDomEventName|j},
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
              let handleFunc =
                (. event: mouseEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onMouseEvent(
                  mouseEventName,
                  0,
                  handleFunc,
                  state,
                );

              let state =
                ManageEventAPI.offMouseEventByHandleFunc(
                  mouseEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$mouseDomEventName|j},
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
              let handleFunc =
                (. event: mouseEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onMouseEvent(
                  mouseEventName,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onMouseEvent(
                  mouseEventName,
                  0,
                  (. event: mouseEvent, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );

              let state =
                ManageEventAPI.offMouseEventByHandleFunc(
                  mouseEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$mouseDomEventName|j},
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });
          });
        };

        describe("bind mousedown event", () => {
          _testMouseEvent(MouseDown, "mousedown");

          describe("test mouse event", () => {
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                let state =
                  MouseEventTool.prepare(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event: mouseEvent, state) => {
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
                  MouseEventTool.prepare(
                    ~sandbox,
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
                  ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event: mouseEvent, state) => {
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
                  ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event: mouseEvent, state) => {
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

            describe("test movementDelta", () => {
              describe("if is pointer locked", () =>
                test("get data from event.movementX/movementY", () => {
                  let state = MouseEventTool.prepare(~sandbox, ());
                  MouseEventTool.setPointerLocked(.);
                  let state = state |> NoWorkerJobTool.execInitJobs;
                  let (valueX, valueY) = (ref(0), ref(0));

                  let state =
                    ManageEventAPI.onMouseEvent(
                      MouseDown,
                      0,
                      (. event: mouseEvent, state) => {
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
                    ManageEventAPI.onMouseEvent(
                      MouseDown,
                      0,
                      (. event: mouseEvent, state) => {
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
                  ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event: mouseEvent, state) => {
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
                  ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event: mouseEvent, state) => {
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
          });

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(2);

              let state =
                ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event: mouseEvent, state) => {
                    value := value^ - 2;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.onMouseEvent(
                  MouseDown,
                  1,
                  (. event: mouseEvent, state) => {
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
          test("if browser is not chrome or firefox, not exec handleFunc", () => {
            let state =
              MouseEventTool.prepare(
                ~sandbox,
                ~setBrowserFunc=BrowserDetectTool.setUnknown,
                (),
              );
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDown,
                0,
                (. event: mouseEvent, state) => {
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
        });

        describe("bind mouseup event", () =>
          _testMouseEvent(MouseUp, "mouseup")
        );

        describe("bind click event", () =>
          _testMouseEvent(Click, "click")
        );

        describe("bind mousewheel event", () =>
          _testMouseEvent(MouseWheel, "mousewheel")
        );

        describe("bind mousemove event", () => {
          _testMouseEvent(MouseMove, "mousemove");

          describe("test mouse event", () =>
            describe("test movementDelta", () =>
              test("set lastX, lastY after handle", () => {
                let state = MouseEventTool.prepare(~sandbox, ());
                MouseEventTool.setNotPointerLocked(.);
                let state = MouseEventTool.setLastXY(None, None, state);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onMouseEvent(
                    MouseMove,
                    0,
                    (. event: mouseEvent, state) => {
                      let (x, y) = event.movementDelta;
                      valueX := valueX^ + x;
                      valueY := valueY^ + y;
                      state;
                    },
                    state,
                  );

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                );
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getBody(),
                  MouseEventTool.buildMouseEvent(~pageX=30, ~pageY=50, ()),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (30 - 10, 50 - 20);
              })
            )
          );
        });

        describe("bind mousedrag event", () => {
          test("test trigger event when mousemove after mousedown", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDrag,
                0,
                (. event: mouseEvent, state) => {
                  value := value^ + 1;
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
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          });

          test("test stop event when mouseup", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDrag,
                0,
                (. event: mouseEvent, state) => {
                  value := value^ + 1;
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
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () =>
            test("test", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: mouseEvent, state) => {
                  value := value^ + 1;
                  state;
                };

              let state =
                ManageEventAPI.onMouseEvent(MouseDrag, 0, handleFunc, state);
              let state =
                ManageEventAPI.offMouseEventByHandleFunc(
                  MouseDrag,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            })
          );
        });
      })
    );

    describe("bind dom event to trigger point event", () =>
      describe("bind mouse event to trigger point event", () => {
        let _testPointEvent = (pointEventName, mouseDomEventName) => {
          test("test bind", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                pointEventName,
                0,
                (. event, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              mouseDomEventName,
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
              let handleFunc =
                (. event, state) => {
                  value := value^ + 1;
                  state;
                };

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  pointEventName,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  pointEventName,
                  0,
                  (. event, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.offCustomGlobalEventByHandleFunc(
                  pointEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                mouseDomEventName,
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
              let handleFunc =
                (. event, state) => {
                  value := value^ + 1;
                  state;
                };

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  pointEventName,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  pointEventName,
                  0,
                  (. event, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.offCustomGlobalEventByEventName(
                  pointEventName,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                mouseDomEventName,
                EventTool.getBody(),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            })
          );
        };

        describe("test trigger pointdown event", () => {
          _testPointEvent(
            CustomEventTool.getPointDownEventName(),
            "mousedown",
          );

          describe("test point event", () =>
            test(
              "test name, location, locationInView, button, wheel, movementDelta",
              () => {
              let state =
                MouseEventTool.prepare(
                  ~sandbox,
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
                  (. event, state) => {
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
                  (. event, state) => {
                    value := value^ - 2;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  1,
                  (. event, state) => {
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
        });

        describe("test trigger pointup event", () =>
          _testPointEvent(CustomEventTool.getPointUpEventName(), "mouseup")
        );

        describe("test trigger pointtap event", () =>
          _testPointEvent(CustomEventTool.getPointTapEventName(), "click")
        );

        describe("test trigger pointscale event", () =>
          _testPointEvent(
            CustomEventTool.getPointScaleEventName(),
            "mousewheel",
          )
        );

        describe("test trigger pointmove event", () =>
          _testPointEvent(
            CustomEventTool.getPointMoveEventName(),
            "mousemove",
          )
        );

        describe("test trigger pointdrag event", () =>
          test("test trigger event when trigger mousedrag event", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDragEventName(),
                0,
                (. event, state) => {
                  value := value^ + 1;
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
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getBody(),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          })
        );
      })
    );
  });