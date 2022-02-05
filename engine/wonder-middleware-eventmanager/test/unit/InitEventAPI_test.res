open EventType

open Wonder_jest

let _ = describe("InitEventAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.preparePO()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("bind dom event", () => {
    describe("bind mouse event", () => {
        let _testMouseEvent = (mouseEventName, mouseDomEventName) => {
          test("test bind", () => {
             MouseEventTool.prepare(~sandbox, ())
            let value = ref(0)

             ManageEventAPI.onMouseEvent(
              mouseEventName,
              0,
              (. event, po) => {
                value := 1
                po
              },
            )
            EventTool.triggerDomEvent(
mouseDomEventName,
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 1
          })

          describe("test unbind by handleFunc", () => {
            test("test", () => {
              MouseEventTool.prepare(~sandbox, ())
              let value = ref(0)
              let handleFunc = (. event, po) => {
                value := value.contents + 1
                po
              }
               ManageEventAPI.onMouseEvent(mouseEventName, 0, handleFunc)

               ManageEventAPI.offMouseEventByHandleFunc(mouseEventName, handleFunc)
              
              EventTool.triggerDomEvent(
                j`$mouseDomEventName`,
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.restore()

              value.contents -> expect == 0
            })
            test("test unbind one handleFunc of the eventName", () => {
              MouseEventTool.prepare(~sandbox, ())

              let value = ref(0)
              let handleFunc = (. event, po) => {
                value := value.contents + 1
                po
              }
               ManageEventAPI.onMouseEvent(mouseEventName, 0, handleFunc)
               ManageEventAPI.onMouseEvent(
                mouseEventName,
                0,
                (. event, po) => {
                  value := value.contents + 10
                  po
                },
              )

               ManageEventAPI.offMouseEventByHandleFunc(mouseEventName, handleFunc)
              EventTool.triggerDomEvent(
                j`$mouseDomEventName`,
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.restore()

              value.contents -> expect == 10
            })
          })
        }

      describe("bind contextmenu event", () => {
        test("preventDefault", () => {
            BodyAPI.setBody(
BodyTool.getBody()
            )
            InitEventAPI.initEvent();
          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox)
          let stopPropagationFunc = createEmptyStubWithJsObjSandbox(sandbox)

          EventTool.triggerDomEvent(
            "contextmenu",
EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(~preventDefaultFunc, ~stopPropagationFunc, ()),
          )
          EventTool.restore()

          (preventDefaultFunc->getCallCount, stopPropagationFunc->getCallCount)->expect == (1, 1)
        })
      })

        describe("bind mousedown event", () => {
          _testMouseEvent(MouseDown, "mousedown")

          describe("test mouse event", () => {
            describe("test locationInView", () => {
              test("test view has no offsetParent", () => {
                 MouseEventTool.prepare(~sandbox, ~offsetLeft=1, ~offsetTop=2, ())
                
                let (valueX, valueY) = (ref(0), ref(0))

                 ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event, po) => {
                    let (x, y) = event.locationInView
                    valueX := x
                    valueY := y
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                )
                EventTool.restore()

                (valueX.contents, valueY.contents) -> expect == (10 - 1, 20 - 2)
              })
              test("test view has offsetParent", () => {
                MouseEventTool.prepare(
                  ~sandbox,
                  ~offsetLeft=1,
                  ~offsetTop=2,
                  ~offsetParent=Js.Nullable.return({
                    "offsetLeft": 11,
                    "offsetTop": 12,
                    "offsetParent": Js.Nullable.undefined,
                  }),
                  (),
                )
                
                let (valueX, valueY) = (ref(0), ref(0))

                 ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event, po) => {
                    let (x, y) = event.locationInView
                    valueX := x
                    valueY := y
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                )
                EventTool.restore()

                (valueX.contents, valueY.contents) -> expect == (10 - 1 - 11, 20 - 2 - 12)
              })
            })

            describe("test button", () => {
              let _test = (eventButton, targetButton) => {
                MouseEventTool.prepare(~sandbox, ())
                
                let button = ref(Right)

                 ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event, po) => {
                    button := event.button
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~which=eventButton, ()),
                )
                EventTool.restore()

                button.contents -> expect == targetButton
              }

              test("test NoButton", () => _test(0, NoButton))
              test("test Left", () => _test(1, Left))
              test("test Center", () => _test(2, Center))
              test("test Right", () => _test(3, Right))
            })

            describe("test movementDelta", () => {
              describe("if is pointer locked", () =>
                test("get data from event.movementX/movementY", () => {
                  MouseEventTool.prepare(~sandbox, ())
                  MouseEventTool.setPointerLocked(.)
                  
                  let (valueX, valueY) = (ref(0), ref(0))

                   ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event, po) => {
                      let (x, y) = event.movementDelta
                      valueX := x
                      valueY := y
                      po
                    },
                  )
                  
                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getPointEventBindedDom(),
                    MouseEventTool.buildMouseEvent(~movementX=1, ~movementY=2, ()),
                  )
                  EventTool.restore()

                  (valueX.contents, valueY.contents) -> expect == (1, 2)
                })
              )
              describe("else, compute", () => {
                let _test = ((lastX, lastY), (pageX, pageY), (targetX, targetY)) => {
                  MouseEventTool.prepare(~sandbox, ())
                  MouseEventTool.setNotPointerLocked(.)
                   MouseEventTool.setLastXY(lastX, lastY)
                  
                  let (valueX, valueY) = (ref(0), ref(0))

                   ManageEventAPI.onMouseEvent(
                    MouseDown,
                    0,
                    (. event, po) => {
                      let (x, y) = event.movementDelta
                      valueX := x
                      valueY := y
                      po
                    },
                  )
                  
                  EventTool.triggerDomEvent(
                    "mousedown",
                    EventTool.getPointEventBindedDom(),
                    MouseEventTool.buildMouseEvent(~pageX, ~pageY, ()),
                  )
                  EventTool.restore()

                  (valueX.contents, valueY.contents) -> expect == (targetX, targetY)
                }

                test("test has no lastX, lastY", () => _test((None, None), (0, 0), (0, 0)))
                test("test has lastX, lastY", () =>
                  _test((Some(1), Some(2)), (10, 11), (10 - 1, 11 - 2))
                )
              })
            })

            describe("test wheel", () => {
              let _test = (mouseEvent, targetWheel) => {
                MouseEventTool.prepare(~sandbox, ())
                
                let wheel = ref(0)

                 ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event, po) => {
                    wheel := event.wheel
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(),
                  mouseEvent,
                )
                EventTool.restore()

                wheel.contents -> expect == targetWheel
              }

              describe("if event.detail exist", () => {
                test("if event.detail !== 0, use it", () =>
                  _test(MouseEventTool.buildMouseEvent(~detail=Js.Nullable.return(2), ()), -1 * 2)
                )
                test("else, use event.wheelDelta", () =>
                  _test(
                    MouseEventTool.buildMouseEvent(
                      ~detail=Js.Nullable.return(0),
                      ~wheelDelta=Js.Nullable.return(120),
                      (),
                    ),
                    120 / 120,
                  )
                )
              })

              test("else, use event.wheelDelta", () =>
                _test(
                  MouseEventTool.buildMouseEvent(
                    ~detail=Js.Nullable.undefined,
                    ~wheelDelta=Js.Nullable.return(120),
                    (),
                  ),
                  120 / 120,
                )
              )
              test("else, return 0", () =>
                _test(
                  MouseEventTool.buildMouseEvent(
                    ~detail=Js.Nullable.undefined,
                    ~wheelDelta=Js.Nullable.undefined,
                    (),
                  ),
                  0,
                )
              )
            })
            describe("test other data", () =>
              test("test name, location", () => {
                MouseEventTool.prepare(~sandbox, ())
                
                let name = ref(MouseUp)
                let (valueX, valueY) = (ref(0), ref(0))

                 ManageEventAPI.onMouseEvent(
                  MouseDown,
                  0,
                  (. event, po) => {
                    let (x, y) = event.location
                    valueX := x
                    valueY := y
                    name := event.name
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "mousedown",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                )
                EventTool.restore()

                (name.contents, valueX.contents, valueY.contents) -> expect == (MouseDown, 10, 20)
              })
            )
          })

          describe("test priority", () =>
            test("the higher priority handleFunc is executed first", () => {
              MouseEventTool.prepare(~sandbox, ())
              
              let value = ref(2)

               ManageEventAPI.onMouseEvent(
                MouseDown,
                0,
                (. event, po) => {
                  value := value.contents - 2
                  po
                },
              )
               ManageEventAPI.onMouseEvent(
                MouseDown,
                1,
                (. event, po) => {
                  value := value.contents * 2
                  po
                },
              )
              
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.restore()

              value.contents -> expect == 2 * 2 - 2
            })
          )
        //   test("if browser is unknown, fatal", () => {
        //     MouseEventTool.prepare(
        //       ~sandbox,
        //       ~setBrowserFunc=BrowserDetectTool.setUnknown,
        //       (),
        //     )

        //     expect(() => {
        //       
        //     }) -> toThrowMessage("unknown browser")
        //   })
        })

        describe("bind mouseup event", () => _testMouseEvent(MouseUp, "mouseup"))

        describe("bind click event", () => _testMouseEvent(Click, "click"))

        describe("bind mousewheel event", () => _testMouseEvent(MouseWheel, "mousewheel"))

        describe("bind mousemove event", () => {
          _testMouseEvent(MouseMove, "mousemove")

          describe("test mouse event", () =>
            describe("test movementDelta", () =>
              test("set lastX, lastY after handle", () => {
                MouseEventTool.prepare(~sandbox, ())
                MouseEventTool.setNotPointerLocked(.)
                 MouseEventTool.setLastXY(None, None)
                
                let (valueX, valueY) = (ref(0), ref(0))

                 ManageEventAPI.onMouseEvent(
                  MouseMove,
                  0,
                  (. event, po) => {
                    let (x, y) = event.movementDelta
                    valueX := valueX.contents + x
                    valueY := valueY.contents + y
                    po
                  },
                )

                
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
                )
                EventTool.triggerDomEvent(
                  "mousemove",
                  EventTool.getPointEventBindedDom(),
                  MouseEventTool.buildMouseEvent(~pageX=30, ~pageY=50, ()),
                )
                EventTool.restore()

                (valueX.contents, valueY.contents) -> expect == (30 - 10, 50 - 20)
              })
            )
          )
        })

        describe("bind mousedrag event", () => {
          test("trigger mousedragstart event when mousedown", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)

             ManageEventAPI.onMouseEvent(
              MouseDragStart,
              0,
              (. event, po) => {
                value := value.contents + 1
                po
              },
            )
            
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 1
          })
          test("trigger mousedragover event when mousemove after mousedown", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)

             ManageEventAPI.onMouseEvent(
              MouseDragOver,
              0,
              (. event, po) => {
                value := value.contents + 1
                po
              },
            )
            
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.triggerFirstMouseDragOverEvent(MouseEventTool.buildMouseEvent())
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 2
          })

          test("trigger mousedragdrop event when mouseup", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)

             ManageEventAPI.onMouseEvent(
              MouseDragDrop,
              0,
              (. event, po) => {
                value := value.contents + 1
                po
              },
            )
            
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.triggerDomEvent(
              "mouseup",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.triggerDomEvent(
              "mousemove",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 1
          })

          describe("test unbind by handleFunc", () =>
            test("test", () => {
              MouseEventTool.prepare(~sandbox, ())
              
              let value = ref(0)
              let handleFunc = (. event, po) => {
                value := value.contents + 1
                po
              }

               ManageEventAPI.onMouseEvent(MouseDragOver, 0, handleFunc)
               ManageEventAPI.offMouseEventByHandleFunc(MouseDragOver, handleFunc)
              
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.restore()

              value.contents -> expect == 0
            })
          )

          describe("test movement", () => {
            let _prepare = () => {
              MouseEventTool.prepare(~sandbox, ())
              MouseEventTool.setNotPointerLocked(.)
              
              let movementX = ref(0)
              let movementY = ref(0)

               ManageEventAPI.onMouseEvent(
                MouseDragOver,
                0,
                (. event, po) => {
                  let (x, y) = event.movementDelta
                  movementX := x
                  movementY := y
                  po
                },
              )

               (movementX, movementY)
            }

            test("if not set lastXY on mousemove event if mousedragover event is triggering", () => {
              let  (movementX, movementY) = _prepare()
              
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~pageX=1, ~pageY=2, ()),
              )
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.triggerFirstMouseDragOverEvent(
                MouseEventTool.buildMouseEvent(~pageX=10, ~pageY=20, ()),
              )
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=70, ()),
              )
              EventTool.restore()

              (movementX.contents, movementY.contents) -> expect == (50 - 10, 70 - 20)
            })
            test("reset lastX,lastY when drag start", () => {
              let  (movementX, movementY) = _prepare()
              
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~pageX=1, ~pageY=2, ()),
              )
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(),
              )
              EventTool.triggerFirstMouseDragOverEvent(
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=80, ()),
              )
              EventTool.restore()

              (movementX.contents, movementY.contents) -> expect == (0, 0)
            })
          })

          describe("test locationInView", () => {
            let _prepare = () => {
               MouseEventTool.prepare(~sandbox, ~offsetLeft=0, ~offsetTop=0, ())
              MouseEventTool.setNotPointerLocked(.)
              
              /* let (valueX, valueY) = (ref(0), ref(0)); */
              let locationInViewArr = []

               ManageEventAPI.onMouseEvent(
                MouseDragOver,
                0,
                (. event, po) => {
                  /* let (x, y) = event.locationInView; */
                  /* valueX := x;
                   valueY := y; */
                  locationInViewArr -> WonderCommonlib.ArraySt.push(event.locationInView) -> ignore

                  po
                },
              )

               locationInViewArr
            }

            test("test view has no offsetParent", () => {
              let locationInViewArr = _prepare()

              
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~pageX=50, ~pageY=80, ()),
              )
              EventTool.triggerFirstMouseDragOverEvent(
                MouseEventTool.buildMouseEvent(~pageX=55, ~pageY=110, ()),
              )
              EventTool.triggerDomEvent(
                "mousemove",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~pageX=60, ~pageY=110, ()),
              )
              EventTool.restore()

              locationInViewArr -> expect == [(55, 110), (60, 110)]
            })
          })

          describe("test button", () => {
            let _test = (eventButton, targetButton) => {
              MouseEventTool.prepare(~sandbox, ())
              
              let button = ref(Right)

               ManageEventAPI.onMouseEvent(
                MouseDragOver,
                0,
                (. event, po) => {
                  button := event.button
                  po
                },
              )
              
              
              EventTool.triggerDomEvent(
                "mousedown",
                EventTool.getPointEventBindedDom(),
                MouseEventTool.buildMouseEvent(~which=eventButton, ()),
              )
              EventTool.triggerFirstMouseDragOverEvent(
                MouseEventTool.buildMouseEvent(~which=eventButton, ()),
              )
              EventTool.restore()

              button.contents -> expect == targetButton
            }

            test("test NoButton", () => _test(0, NoButton))
            test("test Left", () => _test(1, Left))
            test("test Center", () => _test(2, Center))
            test("test Right", () => _test(3, Right))
          })
        })
    })

    describe("bind keyboard event", () => {
      let _testKeyboardEvent = (keyboardEventName, keyboardDomEventName) => {
        test("test bind", () => {
           KeyboardEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onKeyboardEvent(
            keyboardEventName,
            0,
            (. event: keyboardEvent, po) => {
              value := 1
              po
            },
          )
          
          EventTool.triggerDomEvent(
            j`$keyboardDomEventName`,
            EventTool.getKeyboardEventBindedDom(),
            KeyboardEventTool.buildKeyboardEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () => {
          test("test", () => {
             KeyboardEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event: keyboardEvent, po) => {
              value := value.contents + 1
              po
            }
            ManageEventAPI.onKeyboardEvent(keyboardEventName, 0, handleFunc)

            ManageEventAPI.offKeyboardEventByHandleFunc(
              keyboardEventName,
              handleFunc,
            )
            
            EventTool.triggerDomEvent(
              j`$keyboardDomEventName`,
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 0
          })
          test("test unbind one handleFunc of the eventName", () => {
            KeyboardEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event: keyboardEvent, po) => {
              value := value.contents + 1
              po
            }
            ManageEventAPI.onKeyboardEvent(keyboardEventName, 0, handleFunc)
            ManageEventAPI.onKeyboardEvent(
              keyboardEventName,
              0,
              (. event: keyboardEvent, po) => {
                value := value.contents + 10
                po
              },
            )

            ManageEventAPI.offKeyboardEventByHandleFunc(
              keyboardEventName,
              handleFunc,
            )
            
            EventTool.triggerDomEvent(
              j`$keyboardDomEventName`,
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 10
          })
        })
      }

      describe("bind keyup event", () => {
        _testKeyboardEvent(KeyUp, "keyup")

        describe("test keyboard event", () => {
          test("test name, ctrlKey, altKey, shiftKey, metaKey,  keyCode", () => {
            KeyboardEventTool.prepare(~sandbox, ())
            
            let refEvent = ref(Obj.magic(-1))

            ManageEventAPI.onKeyboardEvent(
              KeyUp,
              0,
              (. event: keyboardEvent, po) => {
                refEvent := event
                po
              },
            )
            
            EventTool.triggerDomEvent(
              "keyup",
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(
                ~ctrlKey=true,
                ~altKey=true,
                ~shiftKey=true,
                ~metaKey=true,
                ~keyCode=9,
                (),
              ),
            )
            EventTool.restore()

            let {name, keyCode, ctrlKey, altKey, shiftKey, metaKey} = refEvent.contents

            (name, ctrlKey, altKey, shiftKey, metaKey, keyCode)
            -> expect == (KeyUp, true, true, true, true, 9)
          })

          describe("test key", () => {
            test("test keyCode is in specialKeyMap", () => {
              KeyboardEventTool.prepare(~sandbox, ())
              
              let key = ref("")

              ManageEventAPI.onKeyboardEvent(
                KeyUp,
                0,
                (. event: keyboardEvent, po) => {
                  key := event.key
                  po
                },
              )
              
              EventTool.triggerDomEvent(
                "keyup",
                EventTool.getKeyboardEventBindedDom(),
                KeyboardEventTool.buildKeyboardEvent(~keyCode=9, ()),
              )
              EventTool.restore()

              key.contents -> expect == "tab"
            })

            describe("else", () =>
              test("if shiftKey=true, get key from shiftKeyByCharCodeMap", () => {
                KeyboardEventTool.prepare(~sandbox, ())
                
                let keyArr = []

                ManageEventAPI.onKeyboardEvent(
                  KeyUp,
                  0,
                  (. event: keyboardEvent, po) => {
                    keyArr -> WonderCommonlib.ArraySt.push(event.key) -> ignore
                    po
                  },
                )
                
                EventTool.triggerDomEvent(
                  "keyup",
                  EventTool.getKeyboardEventBindedDom(),
                  KeyboardEventTool.buildKeyboardEvent(~shiftKey=true, ~keyCode=51, ()),
                )
                EventTool.triggerDomEvent(
                  "keyup",
                  EventTool.getKeyboardEventBindedDom(),
                  KeyboardEventTool.buildKeyboardEvent(~shiftKey=true, ~keyCode=52, ()),
                )
                EventTool.triggerDomEvent(
                  "keyup",
                  EventTool.getKeyboardEventBindedDom(),
                  KeyboardEventTool.buildKeyboardEvent(~shiftKey=true, ~keyCode=187, ()),
                )
                EventTool.restore()

                keyArr -> expect == ["#", "$", "+"]
              })
            )
          })
        })

        describe("test priority", () =>
          test("the higher priority handleFunc is executed first", () => {
            KeyboardEventTool.prepare(~sandbox, ())
            
            let value = ref(5)

            ManageEventAPI.onKeyboardEvent(
              KeyUp,
              0,
              (. event: keyboardEvent, po) => {
                value := value.contents + 1
                po
              },
            )
            ManageEventAPI.onKeyboardEvent(
              KeyUp,
              1,
              (. event: keyboardEvent, po) => {
                value := value.contents * 2
                po
              },
            )
            
            EventTool.triggerDomEvent(
              "keyup",
              EventTool.getKeyboardEventBindedDom(),
              KeyboardEventTool.buildKeyboardEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 11
          })
        )
      })

      describe("bind keydown event", () => _testKeyboardEvent(KeyDown, "keydown"))

      describe("bind keypress event", () => _testKeyboardEvent(KeyPress, "keypress"))
    })

    describe("bind touch event", () => {
      let _testTouchEvent = (touchEventName, touchDomEventName) => {
        test("test bind", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

          ManageEventAPI.onTouchEvent(
            touchEventName,
            0,
            (. event: touchEvent, po) => {
              value := 1
              po
            },
            
          )
          
          EventTool.triggerDomEvent(
          touchDomEventName,
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () => {
          test("test", () => {
            TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            }
            ManageEventAPI.onTouchEvent(touchEventName, 0, handleFunc)

            ManageEventAPI.offTouchEventByHandleFunc(touchEventName, handleFunc)
            
            EventTool.triggerDomEvent(
              j`$touchDomEventName`,
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 0
          })
          test("test unbind one handleFunc of the eventName", () => {
            TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            }
            ManageEventAPI.onTouchEvent(touchEventName, 0, handleFunc)
            ManageEventAPI.onTouchEvent(
              touchEventName,
              0,
              (. event: touchEvent, po) => {
                value := value.contents + 10
                po
              },
              
            )

            ManageEventAPI.offTouchEventByHandleFunc(touchEventName, handleFunc)
            
            EventTool.triggerDomEvent(
              j`$touchDomEventName`,
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 10
          })
        })
      }

      describe("bind touchstart event", () => {
        _testTouchEvent(TouchStart, "touchstart")

        describe("test touch event", () => {
          describe("test locationInView", () =>
            test("test view has no offsetParent", () => {
              TouchEventTool.prepare(~sandbox, ~offsetLeft=1, ~offsetTop=2, ())
              
              let (valueX, valueY) = (ref(0), ref(0))

              ManageEventAPI.onTouchEvent(
                TouchStart,
                0,
                (. event: touchEvent, po) => {
                  let (x, y) = event.locationInView
                  valueX := x
                  valueY := y
                  po
                },
                
              )
              
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
                  (),
                ),
              )
              EventTool.restore()

              (valueX.contents, valueY.contents) -> expect == (10 - 1, 20 - 2)
            })
          )

          describe("test touchData", () =>
            test("test", () => {
              TouchEventTool.prepare(~sandbox, ())
              
              let value = ref(Obj.magic(0))

              ManageEventAPI.onTouchEvent(
                TouchStart,
                0,
                (. event: touchEvent, po) => {
                  value := event.touchData
                  po
                },
                
              )
              
              EventTool.triggerDomEvent(
                "touchstart",
                EventTool.getPointEventBindedDom(),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
                  (),
                ),
              )
              EventTool.restore()

              value.contents
              -> expect == {
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
                }
            })
          )

          describe("test movementDelta", () =>
            describe("compute by lastX,lastY", () => {
              let _test = ((lastX, lastY), (pageX, pageY), (targetX, targetY)) => {
                TouchEventTool.prepare(~sandbox, ())
                TouchEventTool.setLastXY(lastX, lastY)
                
                let (valueX, valueY) = (ref(0), ref(0))

                ManageEventAPI.onTouchEvent(
                  TouchStart,
                  0,
                  (. event: touchEvent, po) => {
                    let (x, y) = event.movementDelta
                    valueX := x
                    valueY := y
                    po
                  },
                  
                )
                
                EventTool.triggerDomEvent(
                  "touchstart",
                  EventTool.getPointEventBindedDom(),
                  TouchEventTool.buildTouchEvent(
                    ~changedTouches=[TouchEventTool.buildTouchData(~pageX, ~pageY, ())],
                    (),
                  ),
                )
                EventTool.restore()

                (valueX.contents, valueY.contents) -> expect == (targetX, targetY)
              }

              test("test has no lastX, lastY", () => _test((None, None), (0, 0), (0, 0)))
              test("test has lastX, lastY", () =>
                _test((Some(1), Some(2)), (10, 11), (10 - 1, 11 - 2))
              )
            })
          )
        })

        describe("test priority", () =>
          test("the higher priority handleFunc is executed first", () => {
            TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(2)

            ManageEventAPI.onTouchEvent(
              TouchStart,
              0,
              (. event: touchEvent, po) => {
                value := value.contents - 2
                po
              },
              
            )
            ManageEventAPI.onTouchEvent(
              TouchStart,
              1,
              (. event: touchEvent, po) => {
                value := value.contents * 2
                po
              },
              
            )
            
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 2 * 2 - 2
          })
        )
      })

      describe("bind touchend event", () => _testTouchEvent(TouchEnd, "touchend"))

      describe("bind touchtap event", () =>
        test("test trigger event after touchstart and touchend event", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

          ManageEventAPI.onTouchEvent(
            TouchTap,
            0,
            (. event: touchEvent, po) => {
              value := 1
              po
            },
            
          )
          
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchend",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 1
        })
      )

      describe("bind touchmove event", () => {
        _testTouchEvent(TouchMove, "touchmove")

        test("preventDefault", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let preventDefaultFunc = createEmptyStubWithJsObjSandbox(sandbox)
          let stopPropagationFunc = createEmptyStubWithJsObjSandbox(sandbox)

          ManageEventAPI.onTouchEvent(
            TouchMove,
            0,
            (. event: touchEvent, po) => po
          )

          
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(
              ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
              ~preventDefaultFunc,
              ~stopPropagationFunc,
              (),
            ),
          )
          EventTool.restore()

          (preventDefaultFunc -> getCallCount, stopPropagationFunc -> getCallCount)
          -> expect == (1, 1)
        })

        describe("test touch event", () =>
          describe("test movementDelta", () =>
            test("set lastX, lastY after handle", () => {
              TouchEventTool.prepare(~sandbox, ())
              TouchEventTool.setLastXY(None, None)
              
              let (valueX, valueY) = (ref(0), ref(0))

              ManageEventAPI.onTouchEvent(
                TouchMove,
                0,
                (. event: touchEvent, po) => {
                  let (x, y) = event.movementDelta
                  valueX := valueX.contents + x
                  valueY := valueY.contents + y
                  po
                },
                
              )

              
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
                  (),
                ),
              )
              EventTool.triggerDomEvent(
                "touchmove",
                EventTool.getPointEventBindedDom(),
                TouchEventTool.buildTouchEvent(
                  ~changedTouches=[TouchEventTool.buildTouchData(~pageX=30, ~pageY=50, ())],
                  (),
                ),
              )
              EventTool.restore()

              (valueX.contents, valueY.contents) -> expect == (30 - 10, 50 - 20)
            })
          )
        )
      })

      describe("bind touchdrag event", () => {
        test("trigger touchdragstart event when touchstart", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

          ManageEventAPI.onTouchEvent(
            TouchDragStart,
            0,
            (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            },
            
          )
          
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 1
        })
        test("trigger touchdragover event when touchmove after touchstart", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

          ManageEventAPI.onTouchEvent(
            TouchDragOver,
            0,
            (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            },
            
          )
          
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 2
        })

        test("trigger touchdragdrop event when touchend", () => {
          TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

          ManageEventAPI.onTouchEvent(
            TouchDragDrop,
            0,
            (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            },
            
          )
          
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchend",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () =>
          test("test", () => {
            TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event: touchEvent, po) => {
              value := value.contents + 1
              po
            }

            ManageEventAPI.onTouchEvent(TouchDragOver, 0, handleFunc)
            ManageEventAPI.offTouchEventByHandleFunc(TouchDragOver, handleFunc)
            
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.restore()

            value.contents -> expect == 0
          })
        )

        describe("test movement", () => {
          let _prepare = () => {
            TouchEventTool.prepare(~sandbox, ())
            
            let movementX = ref(0)
            let movementY = ref(0)

            ManageEventAPI.onTouchEvent(
              TouchDragOver,
              0,
              (. event: touchEvent, po) => {
                let (x, y) = event.movementDelta
                movementX := x
                movementY := y
                po
              },
              
            )

            ( (movementX, movementY))
          }

          test("if not set lastXY on touchmove event if touchdragover event is triggering", () => {
            let ( (movementX, movementY)) = _prepare()

            
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(
                ~changedTouches=[TouchEventTool.buildTouchData(~pageX=1, ~pageY=2, ())],
                (),
              ),
            )
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(
                ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
                (),
              ),
            )
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(
                ~changedTouches=[TouchEventTool.buildTouchData(~pageX=50, ~pageY=70, ())],
                (),
              ),
            )
            EventTool.restore()

            (movementX.contents, movementY.contents) -> expect == (50 - 10, 70 - 20)
          })
          test("reset lastX,lastY when drag start", () => {
            let ( (movementX, movementY)) = _prepare()

            
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(
                ~changedTouches=[TouchEventTool.buildTouchData(~pageX=1, ~pageY=2, ())],
                (),
              ),
            )
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.triggerDomEvent(
              "touchmove",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(
                ~changedTouches=[TouchEventTool.buildTouchData(~pageX=50, ~pageY=80, ())],
                (),
              ),
            )
            EventTool.restore()

            (movementX.contents, movementY.contents) -> expect == (0, 0)
          })
        })
      })
    })
  })

describe("bind dom event to trigger point event", () => {
    describe("bind mouse event to trigger point event", () => {
      let _testPointEvent = (pointEventName, mouseDomEventName) => {
        test("test bind", () => {
          MouseEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            pointEventName,
            0,
            (. event, po) => {
              value := 1
              (po, event)
            },
          )
           
          EventTool.triggerDomEvent(
            mouseDomEventName,
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () =>
          test("test unbind one handleFunc of the eventName", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event, po) => {
              value := value.contents + 1
              (po, event)
            }

             ManageEventAPI.onCustomGlobalEvent(pointEventName, 0, handleFunc)
             ManageEventAPI.onCustomGlobalEvent(
              pointEventName,
              0,
              (. event, po) => {
                value := value.contents + 10
                (po, event)
              },
            )
             ManageEventAPI.offCustomGlobalEventByHandleFunc(
              pointEventName,
              handleFunc,
            )
             
            EventTool.triggerDomEvent(
              mouseDomEventName,
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 10
          })
        )

        describe("test unbind by eventName", () =>
          test("test", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event, po) => {
              value := value.contents + 1
              (po, event)
            }

             ManageEventAPI.onCustomGlobalEvent(pointEventName, 0, handleFunc)
             ManageEventAPI.onCustomGlobalEvent(
              pointEventName,
              0,
              (. event, po) => {
                value := value.contents + 10
                (po, event)
              },
            )
             ManageEventAPI.offCustomGlobalEventByEventName(pointEventName)
             
            EventTool.triggerDomEvent(
              mouseDomEventName,
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 0
          })
        )
      }

      describe("test trigger pointdown event", () => {
        _testPointEvent(CustomEventTool.getPointDownEventName(), "mousedown")

        describe("test point event", () => {
          test("test event", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(0)

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. customEvent, po) => {
                let {event} = customEvent.userData -> WonderCommonlib.OptionSt.unsafeGet -> Obj.magic

                value := Obj.magic(event)["pageX"]

                (po, customEvent)
              },
            )
             
            let mouseDomEvent = MouseEventTool.buildMouseEvent(~pageX=10, ())
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              mouseDomEvent,
            )
             EventTool.restore()

            value.contents -> expect == 10
          })

          test("test name, location, locationInView, button, wheel, movementDelta", () => {
             MouseEventTool.prepare(
              ~sandbox,
              ~offsetLeft=1,
              ~offsetTop=2,
              ~offsetParent=Js.Nullable.undefined,
              (),
            )
            MouseEventTool.setPointerLocked(.)
            
            let resultArr = []

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. event, po) => {
                let {name, location, locationInView, button, wheel, movementDelta} =
                  event.userData -> WonderCommonlib.OptionSt.unsafeGet -> Obj.magic

                resultArr -> Js.Array.pushMany([
                  name,
                  location -> Obj.magic,
                  locationInView -> Obj.magic,
                  button -> Obj.magic,
                  wheel -> Obj.magic,
                  movementDelta -> Obj.magic,
                ], _) -> ignore

                (po, event)
              },
            )
             
            let mouseDomEvent = MouseEventTool.buildMouseEvent(
              ~pageX=10,
              ~pageY=20,
              ~which=1,
              ~movementX=1,
              ~movementY=2,
              ~detail=Js.Nullable.return(2),
              ~wheelDelta=Js.Nullable.undefined,
              (),
            )
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              mouseDomEvent,
            )
             EventTool.restore()

            resultArr
            -> expect == [
                PointDown,
                (10, 20) -> Obj.magic,
                (10 - 1, 20 - 2) -> Obj.magic,
                Some(Left) -> Obj.magic,
                Some(-1 * 2) -> Obj.magic,
                (1, 2) -> Obj.magic,
              ]
          })
        })

        describe("test priority", () =>
          test("the higher priority handleFunc is executed first", () => {
            MouseEventTool.prepare(~sandbox, ())
            
            let value = ref(2)

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. event, po) => {
                value := value.contents - 2
                (po, event)
              },
            )
             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              1,
              (. event, po) => {
                value := value.contents * 2
                (po, event)
              },
            )
             
            EventTool.triggerDomEvent(
              "mousedown",
              EventTool.getPointEventBindedDom(),
              MouseEventTool.buildMouseEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 2 * 2 - 2
          })
        )
      })

      describe("test trigger pointup event", () =>
        _testPointEvent(CustomEventTool.getPointUpEventName(), "mouseup")
      )

      describe("test trigger pointtap event", () =>
        _testPointEvent(CustomEventTool.getPointTapEventName(), "click")
      )

      describe("test trigger pointscale event", () =>
        _testPointEvent(CustomEventTool.getPointScaleEventName(), "mousewheel")
      )

      describe("test trigger pointmove event", () =>
        _testPointEvent(CustomEventTool.getPointMoveEventName(), "mousemove")
      )

      describe("test trigger pointdrag event", () => {
        test("test trigger pointdragstart event when trigger mousedragstart event", () => {
          MouseEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            CustomEventTool.getPointDragStartEventName(),
            0,
            (. event, po) => {
              value := value.contents + 1
              (po, event)
            },
          )

           
          EventTool.triggerDomEvent(
            "mousedown",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 1
        })
        test("test trigger pointdragover event when trigger mousedragover event", () => {
          MouseEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            CustomEventTool.getPointDragOverEventName(),
            0,
            (. event, po) => {
              value := value.contents + 1
              (po, event)
            },
          )

           
          EventTool.triggerDomEvent(
            "mousedown",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
          EventTool.triggerFirstMouseDragOverEvent(MouseEventTool.buildMouseEvent())
          EventTool.triggerDomEvent(
            "mousemove",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 2
        })
        test("test trigger pointdragdrop event when trigger mousedragdrop event", () => {
          MouseEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            CustomEventTool.getPointDragDropEventName(),
            0,
            (. event, po) => {
              value := value.contents + 1
              (po, event)
            },
          )

           
          EventTool.triggerDomEvent(
            "mousedown",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
          EventTool.triggerFirstMouseDragOverEvent(MouseEventTool.buildMouseEvent())
          EventTool.triggerDomEvent(
            "mouseup",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
          EventTool.triggerDomEvent(
            "mouseup",
            EventTool.getPointEventBindedDom(),
            MouseEventTool.buildMouseEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 1
        })
      })
    })

    describe("bind touch event to trigger point event", () => {
      let _testPointEvent = (pointEventName, touchDomEventName) => {
        test("test bind", () => {
           TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            pointEventName,
            0,
            (. event, po) => {
              value := 1
              (po, event)
            },
          )
           
          EventTool.triggerDomEvent(
            touchDomEventName,
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () =>
          test("test unbind one handleFunc of the eventName", () => {
             TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event, po) => {
              value := value.contents + 1
              (po, event)
            }

             ManageEventAPI.onCustomGlobalEvent(pointEventName, 0, handleFunc)
             ManageEventAPI.onCustomGlobalEvent(
              pointEventName,
              0,
              (. event, po) => {
                value := value.contents + 10
                (po, event)
              },
            )
             ManageEventAPI.offCustomGlobalEventByHandleFunc(
              pointEventName,
              handleFunc,
            )
             
            EventTool.triggerDomEvent(
              touchDomEventName,
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 10
          })
        )

        describe("test unbind by eventName", () =>
          test("test", () => {
             TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event, po) => {
              value := value.contents + 1
              (po, event)
            }

             ManageEventAPI.onCustomGlobalEvent(pointEventName, 0, handleFunc)
             ManageEventAPI.onCustomGlobalEvent(
              pointEventName,
              0,
              (. event, po) => {
                value := value.contents + 10
                (po, event)
              },
            )
             ManageEventAPI.offCustomGlobalEventByEventName(pointEventName)
             
            EventTool.triggerDomEvent(
              touchDomEventName,
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 0
          })
        )
      }

      describe("test trigger pointdown event", () => {
        _testPointEvent(CustomEventTool.getPointDownEventName(), "touchstart")

        describe("test point event", () => {
          test("test event", () => {
             TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. customEvent, po) => {
                let {event} = customEvent.userData -> WonderCommonlib.OptionSt.unsafeGet -> Obj.magic
                let changedTouches = Obj.magic(event)["changedTouches"]

                value := changedTouches[0]["pageX"]

                (po, customEvent)
              },
            )
             
            let touchDomEvent = TouchEventTool.buildTouchEvent(
              ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ())],
              (),
            )
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              touchDomEvent,
            )
             EventTool.restore()

            value.contents -> expect == 10
          })

          test("test name, location, locationInView, button, wheel, movementDelta", () => {
             TouchEventTool.prepare(
              ~sandbox,
              ~offsetLeft=1,
              ~offsetTop=2,
              ~offsetParent=Js.Nullable.undefined,
              (),
            )
            
            let resultArr = []

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. event, po) => {
                let {name, location, locationInView, button, wheel, movementDelta} =
                  event.userData -> WonderCommonlib.OptionSt.unsafeGet -> Obj.magic

                resultArr -> Js.Array.pushMany([
                  name,
                  location -> Obj.magic,
                  locationInView -> Obj.magic,
                  button -> Obj.magic,
                  wheel -> Obj.magic,
                  movementDelta -> Obj.magic,
                ], _) -> ignore

                (po, event)
              },
            )
             
            let touchDomEvent = TouchEventTool.buildTouchEvent(
              ~changedTouches=[TouchEventTool.buildTouchData(~pageX=10, ~pageY=20, ())],
              (),
            )

            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              touchDomEvent,
            )
             EventTool.restore()

            resultArr
            -> expect == [
                PointDown,
                (10, 20) -> Obj.magic,
                (10 - 1, 20 - 2) -> Obj.magic,
                None -> Obj.magic,
                None -> Obj.magic,
                (0, 0) -> Obj.magic,
              ]
          })
        })

        describe("test priority", () =>
          test("the higher priority handleFunc is executed first", () => {
             TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(2)

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              0,
              (. event, po) => {
                value := value.contents - 2
                (po, event)
              },
            )
             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointDownEventName(),
              1,
              (. event, po) => {
                value := value.contents * 2
                (po, event)
              },
            )
             
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 2 * 2 - 2
          })
        )
      })

      describe("test trigger pointup event", () =>
        _testPointEvent(CustomEventTool.getPointUpEventName(), "touchend")
      )

      describe("test trigger pointtap event", () => {
        test("test bind", () => {
           TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            CustomEventTool.getPointTapEventName(),
            0,
            (. event, po) => {
              value := 1
              (po, event)
            },
          )
           
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchend",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 1
        })

        describe("test unbind by handleFunc", () =>
          test("test unbind one handleFunc of the eventName", () => {
             TouchEventTool.prepare(~sandbox, ())
            
            let value = ref(0)
            let handleFunc = (. event, po) => {
              value := value.contents + 1
              (po, event)
            }

             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointTapEventName(),
              0,
              handleFunc,
            )
             ManageEventAPI.onCustomGlobalEvent(
              CustomEventTool.getPointTapEventName(),
              0,
              (. event, po) => {
                value := value.contents + 10
                (po, event)
              },
            )
             ManageEventAPI.offCustomGlobalEventByHandleFunc(
              CustomEventTool.getPointTapEventName(),
              handleFunc,
            )
             
            EventTool.triggerDomEvent(
              "touchstart",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
            EventTool.triggerDomEvent(
              "touchend",
              EventTool.getPointEventBindedDom(),
              TouchEventTool.buildTouchEvent(),
            )
             EventTool.restore()

            value.contents -> expect == 10
          })
        )
      })

      describe("test trigger pointmove event", () =>
        _testPointEvent(CustomEventTool.getPointMoveEventName(), "touchmove")
      )

      describe("test trigger pointdrag event", () =>
        test("test trigger event when trigger touchdrag event", () => {
           TouchEventTool.prepare(~sandbox, ())
          
          let value = ref(0)

           ManageEventAPI.onCustomGlobalEvent(
            CustomEventTool.getPointDragOverEventName(),
            0,
            (. event, po) => {
              value := value.contents + 1
              (po, event)
            },
          )
           
          EventTool.triggerDomEvent(
            "touchstart",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
          EventTool.triggerDomEvent(
            "touchmove",
            EventTool.getPointEventBindedDom(),
            TouchEventTool.buildTouchEvent(),
          )
           EventTool.restore()

          value.contents -> expect == 2
        })
      )
    })
  })
})
