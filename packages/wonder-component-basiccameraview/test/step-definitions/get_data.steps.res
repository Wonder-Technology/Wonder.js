open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentBasiccameraview.StateType.state,
      WonderComponentBasiccameraview.StateType.config,
      WonderComponentBasiccameraview.DataType.dataName,
      WonderComponentBasiccameraview.StateType.basicCameraView,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    data.contents.createStateFunc(. {isDebug: isDebug})
  }

  test(."componentName", ({\"when", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    then(%re("/^componentName should be \"(.*)\"$/")->Obj.magic, arg0 => {
      data.contents.componentName->expect == arg0
    })
  })

  test(."set config", ({\"when", \"and", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ())
    })

    then("the config is setted", () => {
      ConfigTool.getIsDebug(state.contents)->expect == true
    })
  })

  test(."create a basicCameraView", ({\"when", \"and", then}) => {
    let cameraView = ref(1)

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a basicCameraView", () => {
      let (s, c) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := c

      state.contents.maxIndex->expect == 1
      cameraView.contents->expect == 0
    })
  })

  test(."add a basicCameraView to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, cameraView.contents)
    })

    then("get the gameObject's basicCameraView should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == cameraView.contents
    })
  })

  test(."add a basicCameraView to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two basicCameraViews", () => {
      let (s, b1) = data.contents.createComponentFunc(. state.contents)
      let (s, b2) = data.contents.createComponentFunc(. s)

      state := s
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add the first basicCameraView to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, cameraView1.contents)
    })

    \"and"("add the second basicCameraView to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, cameraView2.contents)
    })

    then("get the gameObject's basicCameraView should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == cameraView2.contents
    })
  })

  test(."get all basicCameraViews", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two basicCameraViews", () => {
      let (s, b1) = data.contents.createComponentFunc(. state.contents)
      let (s, b2) = data.contents.createComponentFunc(. s)

      state := s
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, cameraView1.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, cameraView2.contents)
    })

    then("getAllComponentsFunc should get the two basicCameraViews", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          cameraView1.contents,
          cameraView2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a basicCameraView", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, cameraView.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a basicCameraView's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let basicCameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject, basicCameraView.contents)
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      data.contents.getGameObjectsFunc(. state.contents, basicCameraView.contents)->expect == [
          gameObject,
        ]
    })
  })

  test(."basicCameraView not be added to a gameObject", ({given, \"when", \"and", then}) => {
    let basicCameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := m
    })

    then("getGameObjectsFunc should return empty", () => {
      data.contents.getGameObjectsFunc(. state.contents, basicCameraView.contents)->expect == []
    })
  })

  test(."get unknown data", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    then(%re("/^get basicCameraView's unknown data should error: \"(.+)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        data.contents.getComponentDataFunc(. state.contents, cameraView.contents, 10)
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."set unknown data", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    then(%re("/^set basicCameraView's unknown data should error: \"(.+)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        data.contents.setComponentDataFunc(. state.contents, cameraView.contents, 10, -1->Obj.magic)
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."is active", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("set basicCameraView's active to false", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          false->Obj.magic,
        )
    })

    then("get basicCameraView's active should return false", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == false
    })
  })

  test(."should only has one active basicCameraView", ({\"when", \"and", then}) => {
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))
    let cameraView3 = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"when"(
      %re(
        "/^create three basicCameraViews as cameraView(\d+), cameraView(\d+), cameraView(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, b1) = data.contents.createComponentFunc(. state.contents)
        let (s, b2) = data.contents.createComponentFunc(. s)
        let (s, b3) = data.contents.createComponentFunc(. s)

        state := s
        cameraView1 := b1
        cameraView2 := b2
        cameraView3 := b3
      },
    )

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView1.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView2.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView3.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          true->Obj.magic,
        )
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView1.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == false
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView2.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == false
    })

    then(%re("/^get cameraView(\d+)'s active should return true$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView3.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == true
    })
  })

  test(."unactive one should not affect other ones", ({\"when", \"and", then}) => {
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"when"(
      %re("/^create two basicCameraViews as cameraView(\d+), cameraView(\d+)$/")->Obj.magic,
      () => {
        let (s, b1) = data.contents.createComponentFunc(. state.contents)
        let (s, b2) = data.contents.createComponentFunc(. s)

        state := s
        cameraView1 := b1
        cameraView2 := b2
      },
    )

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView1.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to false$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraView2.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active,
          false->Obj.magic,
        )
    })

    then(%re("/^get cameraView(\d+)'s active should return true$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView1.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == true
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraView2.contents,
        WonderComponentTypeBasiccameraview.Index.dataName.active,
      )->expect == false
    })
  })
})
