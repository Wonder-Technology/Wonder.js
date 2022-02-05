open Wonder_jest

let _ = describe("ManageEventAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.preparePO()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  // describe("test custom gameObject event", () => {
  //   describe("test bind", () => {
  //     test("test bind one gameObject", () => {
  //       let value = ref(0)
  //       let (po, gameObject) = GameObjectAPI.createGameObject(po.contents)

  //       let po = ManageEventAPI.onCustomGameObjectEvent(
  //         CustomEventTool.getPointDownEventName(),
  //         gameObject,
  //         0,
  //         (. event, po) => {
  //           value := 1
  //           (po, event)
  //         },
  //         po,
  //       )
  //       let po = ManageEventAPI.triggerCustomGameObjectEvent(
  //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //         gameObject,
  //         po,
  //       )

  //       value.contents -> expect == 1
  //     })
  //     // test("test bind three gameObjects", () => {
  //     //   let value = ref(1)
  //     //   let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
  //     //   let (po, gameObject2) = GameObjectAPI.createGameObject(po)
  //     //   let (po, gameObject3) = GameObjectAPI.createGameObject(po)

  //     //   let po = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject1,
  //     //     0,
  //     //     (. event, po) => {
  //     //       value := value.contents * 2
  //     //       (po, event)
  //     //     },
  //     //     po,
  //     //   )
  //     //   let po = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject2,
  //     //     0,
  //     //     (. event, po) => {
  //     //       value := value.contents * 3
  //     //       (po, event)
  //     //     },
  //     //     po,
  //     //   )
  //     //   let po = ManageEventAPI.onCustomGameObjectEvent(
  //     //     CustomEventTool.getPointDownEventName(),
  //     //     gameObject2,
  //     //     0,
  //     //     (. event, po) => {
  //     //       value := value.contents * 4
  //     //       (po, event)
  //     //     },
  //     //     po,
  //     //   )
  //     //   let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  //     //     CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //     //     gameObject2,
  //     //     po,
  //     //   )
  //     //   let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  //     //     CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  //     //     gameObject3,
  //     //     po,
  //     //   )

  //     //   value.contents -> expect == 1 * 3 * 4
  //     // })
  //   })

  // //   describe("test unbind by handleFunc", () =>
  // //     test("test", () => {
  // //       let (po, gameObject) = GameObjectAPI.createGameObject(po.contents)
  // //       let value = ref(0)
  // //       let handleFunc = (. event, po) => {
  // //         value := value.contents + 1
  // //         (po, event)
  // //       }

  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         0,
  // //         handleFunc,
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 10
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.offCustomGameObjectEventByHandleFunc(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject,
  // //         handleFunc,
  // //         po,
  // //       )
  // //       let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject,
  // //         po,
  // //       )

  // //       value.contents -> expect == 10
  // //     })
  // //   )

  // //   describe("test unbind by target", () =>
  // //     test("test", () => {
  // //       let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
  // //       let value = ref(0)
  // //       let handleFunc = (. event, po) => {
  // //         value := value.contents + 1
  // //         (po, event)
  // //       }

  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         handleFunc,
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 10
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.offCustomGameObjectEventByTarget(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         po,
  // //       )
  // //       let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         po,
  // //       )

  // //       value.contents -> expect == 0
  // //     })
  // //   )

  // //   describe("test priority", () =>
  // //     test("the higher priority handleFunc is executed first", () => {
  // //       let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
  // //       let value = ref(2)

  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         1,
  // //         (. event, po) => {
  // //           value := value.contents - 3
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents * 2
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         po,
  // //       )

  // //       value.contents -> expect == -2
  // //     })
  // //   )

  // //   describe("test broadcast custom gameObject event", () =>
  // //     test("trigger gameObject's and its all children' custom event", () => {
  // //       let value = ref(0)
  // //       let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
  // //       let (po, gameObject2) = GameObjectAPI.createGameObject(po)
  // //       let (po, gameObject3) = GameObjectAPI.createGameObject(po)

  // //       let po =
  // //         po
  // //         -> GameObjectTool.addChild(gameObject1, gameObject2)
  // //         -> GameObjectTool.addChild(gameObject2, gameObject3)

  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 1
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject2,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 2
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject3,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 3
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.broadcastCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject1,
  // //         po,
  // //       )

  // //       value.contents -> expect == 0 + 1 + 2 + 3
  // //     })
  // //   )

  // //   describe("test emit custom gameObject event", () =>
  // //     test("trigger gameObject's and its all parents' custom event", () => {
  // //       let value = ref(2)
  // //       let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
  // //       let (po, gameObject2) = GameObjectAPI.createGameObject(po)
  // //       let (po, gameObject3) = GameObjectAPI.createGameObject(po)

  // //       let po =
  // //         po
  // //         -> GameObjectTool.addChild(gameObject1, gameObject2)
  // //         -> GameObjectTool.addChild(gameObject2, gameObject3)

  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject1,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 1
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject2,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents + 2
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.onCustomGameObjectEvent(
  // //         CustomEventTool.getPointDownEventName(),
  // //         gameObject3,
  // //         0,
  // //         (. event, po) => {
  // //           value := value.contents * 3
  // //           (po, event)
  // //         },
  // //         po,
  // //       )
  // //       let po = ManageEventAPI.emitCustomGameObjectEvent(
  // //         CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
  // //         gameObject3,
  // //         po,
  // //       )

  // //       value.contents -> expect == 2 * 3 + 2 + 1
  // //     })
  // //   )
  // // })

  describe("test stopPropagation", () => {
    // describe("test custom gameObject event", () =>
    //   test(
    //     "if stopPropagation, gameObject's less priority handleFunc shouldn't be executed",
    //     () => {
    //       let (po, gameObject1) = GameObjectAPI.createGameObject(po.contents)
    //       let value = ref(2)

    //       let po = ManageEventAPI.onCustomGameObjectEvent(
    //         CustomEventTool.getPointDownEventName(),
    //         gameObject1,
    //         1,
    //         (. event, po) => {
    //           value := value.contents - 3

    //           (po, ManageEventAPI.stopPropagationCustomEvent(event))
    //         },
    //         po,
    //       )
    //       let po = ManageEventAPI.onCustomGameObjectEvent(
    //         CustomEventTool.getPointDownEventName(),
    //         gameObject1,
    //         0,
    //         (. event, po) => {
    //           value := value.contents * 2
    //           (po, event)
    //         },
    //         po,
    //       )
    //       let (po, _) = ManageEventAPI.triggerCustomGameObjectEvent(
    //         CustomEventTool.createCustomEvent(
    //           ~eventName=CustomEventTool.getPointDownEventName(),
    //           (),
    //         ),
    //         gameObject1,
    //         po,
    //       )

    //       value.contents -> expect == -1
    //     },
    //   )
    // )

    describe("test custom global event", () =>
      test("if stopPropagation, less priority handleFunc shouldn't be executed", () => {
        let value = ref(2)

        ManageEventAPI.onCustomGlobalEvent(CustomEventTool.getPointDownEventName(), 1, (.
          event,
          po,
        ) => {
          value := value.contents - 3

          (po, ManageEventAPI.stopPropagationCustomEvent(event))
        })
        let po = ManageEventAPI.onCustomGlobalEvent(CustomEventTool.getPointDownEventName(), 0, (.
          event,
          po,
        ) => {
          value := value.contents * 2
          (po, event)
        })
        ManageEventAPI.triggerCustomGlobalEvent(
          CustomEventTool.createCustomEvent(~eventName=CustomEventTool.getPointDownEventName(), ()),
        )

        value.contents->expect == -1
      })
    )
  })
})
