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

    describe("bind dom event", () => {
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
              EventTool.getPointEventBindedDom(state),
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
                EventTool.getPointEventBindedDom(state),
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
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });
          });
        };

        describe("bind contextmenu event", () =>
          test("preventDefault", () => {
            let state =
              EventCameraControllerTool.prepareMouseEvent(sandbox);
            let state = state |> NoWorkerJobTool.execInitJobs;
            let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox);
            let stopPropagationFunc =
              createEmptyStubWithJsObjSandbox(sandbox);

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "contextmenu",
              EventTool.getBody(state),
              MouseEventTool.buildMouseEvent(
                ~preventDefaultFunc,
                ~stopPropagationFunc,
                (),
              ),
            );
            let state = EventTool.restore(state);

            (
              preventDefaultFunc |> getCallCount,
              stopPropagationFunc |> getCallCount,
            )
            |> expect == (1, 1);
          })
        );

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
                  EventTool.getPointEventBindedDom(state),
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
                  EventTool.getPointEventBindedDom(state),
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
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(~which=eventButton, ()),
                );
                let state = EventTool.restore(state);

                button^ |> expect == targetButton;
              };

              test("test NoButton", () =>
                _test(0, NoButton)
              );
              test("test Left", () =>
                _test(1, Left)
              );
              test("test Center", () =>
                _test(2, Center)
              );
              test("test Right", () =>
                _test(3, Right)
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
                    EventTool.getPointEventBindedDom(state),
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
                    EventTool.getPointEventBindedDom(state),
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
                  EventTool.getPointEventBindedDom(state),
                  mouseEvent,
                );
                let state = EventTool.restore(state);

                wheel^ |> expect == targetWheel;
              };

              describe("if event.detail exist", () => {
                test("if event.detail !== 0, use it", () =>
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
                      ~detail=Js.Nullable.return(0),
                      ~wheelDelta=Js.Nullable.return(120),
                      (),
                    ),
                    120 / 120,
                  )
                );
              });

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
                  EventTool.getPointEventBindedDom(state),
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
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 2 * 2 - 2;
            })
          );
          test("if browser is unknown, fatal", () => {
            let state =
              MouseEventTool.prepare(
                ~sandbox,
                ~setBrowserFunc=BrowserDetectTool.setUnknown,
                (),
              );

            expect(() => {
              let state = state |> NoWorkerJobTool.execInitJobs;
              ();
            })
            |> toThrowMessage("unknown browser");
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
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                );
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getPointEventBindedDom(state),
                  MouseEventTool.buildMouseEvent(~pageX=30, ~pageY=50, ()),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (30 - 10, 50 - 20);
              })
            )
          );
        });

        describe("bind mousedrag event", () => {
          test("trigger mousedragstart event when mousedown", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDragStart,
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
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });
          test(
            "trigger mousedragover event when mousemove after mousedown", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDragOver,
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
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          });

          test("trigger mousedragdrop event when mouseup", () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onMouseEvent(
                MouseDragDrop,
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
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
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
                ManageEventAPI.onMouseEvent(
                  MouseDragOver,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.offMouseEventByHandleFunc(
                  MouseDragOver,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            })
          );

          describe("test movement", () => {
            let _prepare = () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              MouseEventTool.setNotPointerLocked(.);
              let state = state |> NoWorkerJobTool.execInitJobs;
              let movementX = ref(0);
              let movementY = ref(0);

              let state =
                ManageEventAPI.onMouseEvent(
                  MouseDragOver,
                  0,
                  (. event: mouseEvent, state) => {
                    let (x, y) = event.movementDelta;
                    movementX := x;
                    movementY := y;
                    state;
                  },
                  state,
                );

              (state, (movementX, movementY));
            };

            test(
              "if not set lastXY on mousemove event if mousedragover event is triggering",
              () => {
              let (state, (movementX, movementY)) = _prepare();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=1, ~pageY=2, ()),
              );
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=70, ()),
              );
              let state = EventTool.restore(state);

              (movementX^, movementY^) |> expect == (50 - 10, 70 - 20);
            });
            test("reset lastX,lastY when drag start", () => {
              let (state, (movementX, movementY)) = _prepare();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=1, ~pageY=2, ()),
              );
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=80, ()),
              );
              let state = EventTool.restore(state);

              (movementX^, movementY^) |> expect == (0, 0);
            });
          });

          describe("test locationInView", () => {
            let _prepare = () => {
              let state =
                MouseEventTool.prepare(
                  ~sandbox,
                  ~offsetLeft=0,
                  ~offsetTop=0,
                  (),
                );
              MouseEventTool.setNotPointerLocked(.);
              let state = state |> NoWorkerJobTool.execInitJobs;
              /* let (valueX, valueY) = (ref(0), ref(0)); */
              let locationInViewArr = [||];

              let state =
                ManageEventAPI.onMouseEvent(
                  MouseDragOver,
                  0,
                  (. event: mouseEvent, state) => {
                    /* let (x, y) = event.locationInView; */
                    /* valueX := x;
                       valueY := y; */
                    locationInViewArr
                    |> ArrayService.push(event.locationInView);
                    state;
                  },
                  state,
                );

              (state, locationInViewArr);
            };

            test("test view has no offsetParent", () => {
              let (state, locationInViewArr) = _prepare();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=80, ()),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=55, ~pageY=110, ()),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~pageX=60, ~pageY=110, ()),
              );
              let state = EventTool.restore(state);

              locationInViewArr |> expect == [|(55, 110), (60, 110)|];
            });
          });

          describe("test button", () => {
            let _test = (eventButton, targetButton) => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let button = ref(Right);

              let state =
                ManageEventAPI.onMouseEvent(
                  MouseDragOver,
                  0,
                  (. event: mouseEvent, state) => {
                    button := event.button;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~which=eventButton, ()),
              );
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(state),
                MouseEventTool.buildMouseEvent(~which=eventButton, ()),
              );
              let state = EventTool.restore(state);

              button^ |> expect == targetButton;
            };

            test("test NoButton", () =>
              _test(0, NoButton)
            );
            test("test Left", () =>
              _test(1, Left)
            );
            test("test Center", () =>
              _test(2, Center)
            );
            test("test Right", () =>
              _test(3, Right)
            );
          });
        });
      });

      describe("bind keyboard event", () => {
        let _testKeyboardEvent = (keyboardEventName, keyboardDomEventName) => {
          test("test bind", () => {
            let state = KeyboardEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onKeyboardEvent(
                keyboardEventName,
                0,
                (. event: keyboardEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              {j|$keyboardDomEventName|j},
              EventTool.getKeyboardEventBindedDom(state),
              KeyboardEventTool.buildKeyboardEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () => {
            test("test", () => {
              let state = KeyboardEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: keyboardEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onKeyboardEvent(
                  keyboardEventName,
                  0,
                  handleFunc,
                  state,
                );

              let state =
                ManageEventAPI.offKeyboardEventByHandleFunc(
                  keyboardEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$keyboardDomEventName|j},
                EventTool.getKeyboardEventBindedDom(state),
                KeyboardEventTool.buildKeyboardEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            });
            test("test unbind one handleFunc of the eventName", () => {
              let state = KeyboardEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: keyboardEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onKeyboardEvent(
                  keyboardEventName,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onKeyboardEvent(
                  keyboardEventName,
                  0,
                  (. event: keyboardEvent, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );

              let state =
                ManageEventAPI.offKeyboardEventByHandleFunc(
                  keyboardEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$keyboardDomEventName|j},
                EventTool.getKeyboardEventBindedDom(state),
                KeyboardEventTool.buildKeyboardEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });
          });
        };

        describe("bind keyup event", () => {
          _testKeyboardEvent(KeyUp, "keyup");

          describe("test keyboard event", () => {
            test("test name, ctrlKey, altKey, shiftKey, metaKey,  keyCode", () => {
              let state = KeyboardEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let refEvent = ref(Obj.magic(-1));

              let state =
                ManageEventAPI.onKeyboardEvent(
                  KeyUp,
                  0,
                  (. event: keyboardEvent, state) => {
                    refEvent := event;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "keyup",
                EventTool.getKeyboardEventBindedDom(state),
                KeyboardEventTool.buildKeyboardEvent(
                  ~ctrlKey=true,
                  ~altKey=true,
                  ~shiftKey=true,
                  ~metaKey=true,
                  ~keyCode=9,
                  (),
                ),
              );
              let state = EventTool.restore(state);

              let {name, keyCode, ctrlKey, altKey, shiftKey, metaKey} =
                refEvent^;

              (name, ctrlKey, altKey, shiftKey, metaKey, keyCode)
              |> expect == (KeyUp, true, true, true, true, 9);
            });

            describe("test key", () => {
              test("test keyCode is in specialKeyMap", () => {
                let state = KeyboardEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let key = ref("");

                let state =
                  ManageEventAPI.onKeyboardEvent(
                    KeyUp,
                    0,
                    (. event: keyboardEvent, state) => {
                      key := event.key;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "keyup",
                  EventTool.getKeyboardEventBindedDom(state),
                  KeyboardEventTool.buildKeyboardEvent(~keyCode=9, ()),
                );
                let state = EventTool.restore(state);

                key^ |> expect == "tab";
              });

              describe("else", () =>
                test(
                  "if shiftKey=true, get key from shiftKeyByCharCodeMap", () => {
                  let state = KeyboardEventTool.prepare(~sandbox, ());
                  let state = state |> NoWorkerJobTool.execInitJobs;
                  let keyArr = [||];

                  let state =
                    ManageEventAPI.onKeyboardEvent(
                      KeyUp,
                      0,
                      (. event: keyboardEvent, state) => {
                        keyArr |> ArrayService.push(event.key) |> ignore;
                        state;
                      },
                      state,
                    );
                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "keyup",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(
                      ~shiftKey=true,
                      ~keyCode=51,
                      (),
                    ),
                  );
                  EventTool.triggerDomEvent(
                    "keyup",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(
                      ~shiftKey=true,
                      ~keyCode=52,
                      (),
                    ),
                  );
                  EventTool.triggerDomEvent(
                    "keyup",
                    EventTool.getKeyboardEventBindedDom(state),
                    KeyboardEventTool.buildKeyboardEvent(
                      ~shiftKey=true,
                      ~keyCode=187,
                      (),
                    ),
                  );
                  let state = EventTool.restore(state);

                  keyArr |> expect == [|"#", "$", "+"|];
                })
              );
            });
          });

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              let state = KeyboardEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(5);

              let state =
                ManageEventAPI.onKeyboardEvent(
                  KeyUp,
                  0,
                  (. event: keyboardEvent, state) => {
                    value := value^ + 1;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.onKeyboardEvent(
                  KeyUp,
                  1,
                  (. event: keyboardEvent, state) => {
                    value := value^ * 2;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "keyup",
                EventTool.getKeyboardEventBindedDom(state),
                KeyboardEventTool.buildKeyboardEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 11;
            })
          );
        });

        describe("bind keydown event", () =>
          _testKeyboardEvent(KeyDown, "keydown")
        );

        describe("bind keypress event", () =>
          _testKeyboardEvent(KeyPress, "keypress")
        );
      });

      describe("bind touch event", () => {
        let _testTouchEvent = (touchEventName, touchDomEventName) => {
          test("test bind", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onTouchEvent(
                touchEventName,
                0,
                (. event: touchEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              {j|$touchDomEventName|j},
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () => {
            test("test", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onTouchEvent(
                  touchEventName,
                  0,
                  handleFunc,
                  state,
                );

              let state =
                ManageEventAPI.offTouchEventByHandleFunc(
                  touchEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$touchDomEventName|j},
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            });
            test("test unbind one handleFunc of the eventName", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                };
              let state =
                ManageEventAPI.onTouchEvent(
                  touchEventName,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onTouchEvent(
                  touchEventName,
                  0,
                  (. event: touchEvent, state) => {
                    value := value^ + 10;
                    state;
                  },
                  state,
                );

              let state =
                ManageEventAPI.offTouchEventByHandleFunc(
                  touchEventName,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                {j|$touchDomEventName|j},
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });
          });
        };

        describe("bind touchstart event", () => {
          _testTouchEvent(TouchStart, "touchstart");

          describe("test touch event", () => {
            describe("test locationInView", () =>
              test("test view has no offsetParent", () => {
                let state =
                  TouchEventTool.prepare(
                    ~sandbox,
                    ~offsetLeft=1,
                    ~offsetTop=2,
                    (),
                  );
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onTouchEvent(
                    TouchStart,
                    0,
                    (. event: touchEvent, state) => {
                      let (x, y) = event.locationInView;
                      valueX := x;
                      valueY := y;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "touchstart",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(
                    ~changedTouches=[|
                      TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
                    |],
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (10 - 1, 20 - 2);
              })
            );

            describe("test touchData", () =>
              test("test", () => {
                let state = TouchEventTool.prepare(~sandbox, ());
                let state = state |> NoWorkerJobTool.execInitJobs;
                let value = ref(Obj.magic(0));

                let state =
                  ManageEventAPI.onTouchEvent(
                    TouchStart,
                    0,
                    (. event: touchEvent, state) => {
                      value := event.touchData;
                      state;
                    },
                    state,
                  );
                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "touchstart",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(
                    ~changedTouches=[|
                      TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
                    |],
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                value^
                |> expect
                == {
                     clientX: 0,
                     clientY: 0,
                     pageX: 10,
                     pageY: 20,
                     identifier: 0,
                     screenX: 0,
                     screenY: 0,
                     radiusX: 0,
                     radiusY: 0,
                     rotationAngle: 0,
                     force: 0,
                   };
              })
            );

            describe("test movementDelta", () =>
              describe("compute by lastX,lastY", () => {
                let _test =
                    ((lastX, lastY), (pageX, pageY), (targetX, targetY)) => {
                  let state = TouchEventTool.prepare(~sandbox, ());
                  let state = TouchEventTool.setLastXY(lastX, lastY, state);
                  let state = state |> NoWorkerJobTool.execInitJobs;
                  let (valueX, valueY) = (ref(0), ref(0));

                  let state =
                    ManageEventAPI.onTouchEvent(
                      TouchStart,
                      0,
                      (. event: touchEvent, state) => {
                        let (x, y) = event.movementDelta;
                        valueX := x;
                        valueY := y;
                        state;
                      },
                      state,
                    );
                  let state = MainStateTool.setState(state);
                  EventTool.triggerDomEvent(
                    "touchstart",
                    EventTool.getPointEventBindedDom(state),
                    TouchEventTool.buildTouchEvent(
                      ~changedTouches=[|
                        TouchEventTool.buildTouchData(~pageX, ~pageY, ()),
                      |],
                      (),
                    ),
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
              })
            );
          });

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(2);

              let state =
                ManageEventAPI.onTouchEvent(
                  TouchStart,
                  0,
                  (. event: touchEvent, state) => {
                    value := value^ - 2;
                    state;
                  },
                  state,
                );
              let state =
                ManageEventAPI.onTouchEvent(
                  TouchStart,
                  1,
                  (. event: touchEvent, state) => {
                    value := value^ * 2;
                    state;
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 2 * 2 - 2;
            })
          );
        });

        describe("bind touchend event", () =>
          _testTouchEvent(TouchEnd, "touchend")
        );

        describe("bind touchtap event", () =>
          test("test trigger event after touchstart and touchend event", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onTouchEvent(
                TouchTap,
                0,
                (. event: touchEvent, state) => {
                  value := 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchend",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          })
        );

        describe("bind touchmove event", () => {
          _testTouchEvent(TouchMove, "touchmove");

          describe("test touch event", () =>
            describe("test movementDelta", () =>
              test("set lastX, lastY after handle", () => {
                let state = TouchEventTool.prepare(~sandbox, ());
                let state = TouchEventTool.setLastXY(None, None, state);
                let state = state |> NoWorkerJobTool.execInitJobs;
                let (valueX, valueY) = (ref(0), ref(0));

                let state =
                  ManageEventAPI.onTouchEvent(
                    TouchMove,
                    0,
                    (. event: touchEvent, state) => {
                      let (x, y) = event.movementDelta;
                      valueX := valueX^ + x;
                      valueY := valueY^ + y;
                      state;
                    },
                    state,
                  );

                let state = MainStateTool.setState(state);
                EventTool.triggerDomEvent(
                  "touchmove",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(
                    ~changedTouches=[|
                      TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
                    |],
                    (),
                  ),
                );
                EventTool.triggerDomEvent(
                  "touchmove",
                  EventTool.getPointEventBindedDom(state),
                  TouchEventTool.buildTouchEvent(
                    ~changedTouches=[|
                      TouchEventTool.buildTouchData(~pageX=30, ~pageY=50, ()),
                    |],
                    (),
                  ),
                );
                let state = EventTool.restore(state);

                (valueX^, valueY^) |> expect == (30 - 10, 50 - 20);
              })
            )
          );
        });

        describe("bind touchdrag event", () => {
          test("trigger touchdragstart event when touchstart", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onTouchEvent(
                TouchDragStart,
                0,
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });
          test(
            "trigger touchdragover event when touchmove after touchstart", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onTouchEvent(
                TouchDragOver,
                0,
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          });

          test("trigger touchdragdrop event when touchend", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onTouchEvent(
                TouchDragDrop,
                0,
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchend",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () =>
            test("test", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event: touchEvent, state) => {
                  value := value^ + 1;
                  state;
                };

              let state =
                ManageEventAPI.onTouchEvent(
                  TouchDragOver,
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.offTouchEventByHandleFunc(
                  TouchDragOver,
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            })
          );

          describe("test movement", () => {
            let _prepare = () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let movementX = ref(0);
              let movementY = ref(0);

              let state =
                ManageEventAPI.onTouchEvent(
                  TouchDragOver,
                  0,
                  (. event: touchEvent, state) => {
                    let (x, y) = event.movementDelta;
                    movementX := x;
                    movementY := y;
                    state;
                  },
                  state,
                );

              (state, (movementX, movementY));
            };

            test(
              "if not set lastXY on touchmove event if touchdragover event is triggering",
              () => {
              let (state, (movementX, movementY)) = _prepare();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=1, ~pageY=2, ()),
                  |],
                  (),
                ),
              );
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
                  |],
                  (),
                ),
              );
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=50, ~pageY=70, ()),
                  |],
                  (),
                ),
              );
              let state = EventTool.restore(state);

              (movementX^, movementY^) |> expect == (50 - 10, 70 - 20);
            });
            test("reset lastX,lastY when drag start", () => {
              let (state, (movementX, movementY)) = _prepare();

              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=1, ~pageY=2, ()),
                  |],
                  (),
                ),
              );
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=50, ~pageY=80, ()),
                  |],
                  (),
                ),
              );
              let state = EventTool.restore(state);

              (movementX^, movementY^) |> expect == (0, 0);
            });
          });
        });
      });
    });

    describe("bind dom event to trigger point event", () => {
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
                  (state, event);
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              mouseDomEventName,
              EventTool.getPointEventBindedDom(state),
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
                  (state, event);
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
                    (state, event);
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
                EventTool.getPointEventBindedDom(state),
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
                  (state, event);
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
                    (state, event);
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
                EventTool.getPointEventBindedDom(state),
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

          describe("test point event", () => {
            test("test event", () => {
              let state = MouseEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (. customEvent, state) => {
                    let {event} =
                      customEvent.userData
                      |> OptionService.unsafeGet
                      |> Obj.magic;

                    value :=  Obj.magic(event)##pageX;

                    (state, customEvent);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              let mouseDomEvent =
                MouseEventTool.buildMouseEvent(~pageX=10, ());
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                mouseDomEvent,
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });

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
              let resultArr = [||];

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (. event, state) => {
                    let {
                      name,
                      location,
                      locationInView,
                      button,
                      wheel,
                      movementDelta,
                    } =
                      event.userData |> OptionService.unsafeGet |> Obj.magic;

                    resultArr
                    |> Js.Array.pushMany([|
                         name,
                         location |> Obj.magic,
                         locationInView |> Obj.magic,
                         button |> Obj.magic,
                         wheel |> Obj.magic,
                         movementDelta |> Obj.magic,
                       |]);

                    (state, event);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              let mouseDomEvent =
                MouseEventTool.buildMouseEvent(
                  ~pageX=10,
                  ~pageY=20,
                  ~which=1,
                  ~movementX=1,
                  ~movementY=2,
                  ~detail=Js.Nullable.return(2),
                  ~wheelDelta=Js.Nullable.undefined,
                  (),
                );
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
                mouseDomEvent,
              );
              let state = EventTool.restore(state);

              resultArr
              |> expect
              == [|
                   PointDown,
                   (10, 20) |> Obj.magic,
                   (10 - 1, 20 - 2) |> Obj.magic,
                   Some(Left) |> Obj.magic,
                   Some((-1) * 2) |> Obj.magic,
                   (1, 2) |> Obj.magic,
                 |];
            });
          });

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
                    (state, event);
                  },
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  1,
                  (. event, state) => {
                    value := value^ * 2;
                    (state, event);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(state),
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

        describe("test trigger pointdrag event", () => {
          test(
            "test trigger pointdragstart event when trigger mousedragstart event",
            () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDragStartEventName(),
                0,
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
                },
                state,
              );

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });
          test(
            "test trigger pointdragover event when trigger mousedragover event",
            () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDragOverEventName(),
                0,
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
                },
                state,
              );

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          });
          test(
            "test trigger pointdragdrop event when trigger mousedragdrop event",
            () => {
            let state = MouseEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDragDropEventName(),
                0,
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
                },
                state,
              );

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(state),
              MouseEventTool.buildMouseEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });
        });
      });

      describe("bind touch event to trigger point event", () => {
        let _testPointEvent = (pointEventName, touchDomEventName) => {
          test("test bind", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                pointEventName,
                0,
                (. event, state) => {
                  value := 1;
                  (state, event);
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              touchDomEventName,
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () =>
            test("test unbind one handleFunc of the eventName", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
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
                    (state, event);
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
                touchDomEventName,
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            })
          );

          describe("test unbind by eventName", () =>
            test("test", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
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
                    (state, event);
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
                touchDomEventName,
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 0;
            })
          );
        };

        describe("test trigger pointdown event", () => {
          _testPointEvent(
            CustomEventTool.getPointDownEventName(),
            "touchstart",
          );

          describe("test point event", () => {
            test("test event", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (. customEvent, state) => {
                    let {event} =
                      customEvent.userData
                      |> OptionService.unsafeGet
                      |> Obj.magic;
                    let changedTouches = Obj.magic(event)##changedTouches;

                    value :=  changedTouches[0]##pageX;

                    (state, customEvent);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              let touchDomEvent =
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=10, ()),
                  |],
                  (),
                );
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                touchDomEvent,
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            });

            test(
              "test name, location, locationInView, button, wheel, movementDelta",
              () => {
              let state =
                TouchEventTool.prepare(
                  ~sandbox,
                  ~offsetLeft=1,
                  ~offsetTop=2,
                  ~offsetParent=Js.Nullable.undefined,
                  (),
                );
              let state = state |> NoWorkerJobTool.execInitJobs;
              let resultArr = [||];

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (. event, state) => {
                    let {
                      name,
                      location,
                      locationInView,
                      button,
                      wheel,
                      movementDelta,
                    } =
                      event.userData |> OptionService.unsafeGet |> Obj.magic;

                    resultArr
                    |> Js.Array.pushMany([|
                         name,
                         location |> Obj.magic,
                         locationInView |> Obj.magic,
                         button |> Obj.magic,
                         wheel |> Obj.magic,
                         movementDelta |> Obj.magic,
                       |]);

                    (state, event);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              let touchDomEvent =
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[|
                    TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ()),
                  |],
                  (),
                );

              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                touchDomEvent,
              );
              let state = EventTool.restore(state);

              resultArr
              |> expect
              == [|
                   PointDown,
                   (10, 20) |> Obj.magic,
                   (10 - 1, 20 - 2) |> Obj.magic,
                   None |> Obj.magic,
                   None |> Obj.magic,
                   (0, 0) |> Obj.magic,
                 |];
            });
          });

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(2);

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  0,
                  (. event, state) => {
                    value := value^ - 2;
                    (state, event);
                  },
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointDownEventName(),
                  1,
                  (. event, state) => {
                    value := value^ * 2;
                    (state, event);
                  },
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 2 * 2 - 2;
            })
          );
        });

        describe("test trigger pointup event", () =>
          _testPointEvent(CustomEventTool.getPointUpEventName(), "touchend")
        );

        describe("test trigger pointtap event", () => {
          test("test bind", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointTapEventName(),
                0,
                (. event, state) => {
                  value := 1;
                  (state, event);
                },
                state,
              );
            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchend",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 1;
          });

          describe("test unbind by handleFunc", () =>
            test("test unbind one handleFunc of the eventName", () => {
              let state = TouchEventTool.prepare(~sandbox, ());
              let state = state |> NoWorkerJobTool.execInitJobs;
              let value = ref(0);
              let handleFunc =
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
                };

              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointTapEventName(),
                  0,
                  handleFunc,
                  state,
                );
              let state =
                ManageEventAPI.onCustomGlobalEvent(
                  CustomEventTool.getPointTapEventName(),
                  0,
                  (. event, state) => {
                    value := value^ + 10;
                    (state, event);
                  },
                  state,
                );
              let state =
                ManageEventAPI.offCustomGlobalEventByHandleFunc(
                  CustomEventTool.getPointTapEventName(),
                  handleFunc,
                  state,
                );
              let state = MainStateTool.setState(state);
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              EventTool.triggerDomEvent(
                "touchend",
                EventTool.getPointEventBindedDom(state),
                TouchEventTool.buildTouchEvent(),
              );
              let state = EventTool.restore(state);

              value^ |> expect == 10;
            })
          );
        });

        describe("test trigger pointmove event", () =>
          _testPointEvent(
            CustomEventTool.getPointMoveEventName(),
            "touchmove",
          )
        );

        describe("test trigger pointdrag event", () =>
          test("test trigger event when trigger touchdrag event", () => {
            let state = TouchEventTool.prepare(~sandbox, ());
            let state = state |> NoWorkerJobTool.execInitJobs;
            let value = ref(0);

            let state =
              ManageEventAPI.onCustomGlobalEvent(
                CustomEventTool.getPointDragOverEventName(),
                0,
                (. event, state) => {
                  value := value^ + 1;
                  (state, event);
                },
                state,
              );

            let state = MainStateTool.setState(state);
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(state),
              TouchEventTool.buildTouchEvent(),
            );
            let state = EventTool.restore(state);

            value^ |> expect == 2;
          })
        );
      });
    });
    /* describe("test state", () => {
         let _createStateData = () =>
           CreateStateDataMainService.createStateData();

         describe(
           "event handleFunc can get/set state from/to other stateData instead of StateDataMain.stateData",
           () =>
           test("test mouse event handleFunc", () => {
             let state = MouseEventTool.prepare(~sandbox, ());
             let stateData = _createStateData();
             let state =
               StateAPI.setStateToData(stateData, state)
               |> StateAPI.setUnsafeGetStateFunc((.) =>
                    StateAPI.getStateFromData(stateData)
                  )
               |> StateAPI.setSetStateFunc((. state) =>
                    StateAPI.setStateToData(stateData, state)
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
                 state |> StateAPI.deepCopyForRestore,
               );

             let state = StateAPI.setStateToData(stateData, state);
             EventTool.triggerDomEvent(
               "mousedown",
               EventTool.getPointEventBindedDom(state),
               MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
             );
             let state = EventTool.restore(state);

             value^ |> expect == 1;
           })
         );
       }); */
  });