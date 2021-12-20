open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentPerspectivecameraprojection.StateType.state,
      WonderComponentPerspectivecameraprojection.StateType.config,
      WonderComponentPerspectivecameraprojection.DataType.dataName,
      WonderComponentPerspectivecameraprojection.StateType.perspectiveCameraProjection,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    data.contents.createStateFunc(. {isDebug: isDebug})
  }

  let _getAllDirtyComponentsFunc = state => {
    data.contents.getAllComponentsFunc(.
      state,
    )->WonderCommonlib.ArraySt.filter(cameraProjection => {
      data.contents.getComponentDataFunc(.
        state,
        cameraProjection,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.dirty,
      )
      ->Obj.magic
      ->WonderCommonlib.JudgeTool.isTrue
    })
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

  test(."create a perspectiveCameraProjection", ({\"when", \"and", then}) => {
    let cameraProjection = ref(1)

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a perspectiveCameraProjection", () => {
      let (s, c) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := c

      state.contents.maxIndex->expect == 1
      cameraProjection.contents->expect == 0
    })

    \"and"("mark the perspectiveCameraProjection dirty", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.dirty,
      )->expect == true
    })

    \"and"(
      %re("/^set the perspectiveCameraProjection's pMatrix to identiy matrix(\d+)$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix,
        )->expect == WonderCommonlib.Matrix4.createIdentityMatrix4()
      },
    )
  })

  test(."add a perspectiveCameraProjection to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject, cameraProjection.contents)
    })

    then("get the gameObject's perspectiveCameraProjection should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == cameraProjection.contents
    })
  })

  test(."add a perspectiveCameraProjection to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("add the first perspectiveCameraProjection to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject, cameraProjection1.contents)
    })

    \"and"("add the second perspectiveCameraProjection to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject, cameraProjection2.contents)
    })

    then("get the gameObject's perspectiveCameraProjection should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == cameraProjection2.contents
    })
  })

  test(."get all perspectiveCameraProjections", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject1, cameraProjection1.contents)
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject2, cameraProjection2.contents)
    })

    then("getAllComponentsFunc should get the two perspectiveCameraProjections", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          cameraProjection1.contents,
          cameraProjection2.contents,
        ]
    })
  })

  test(."get all dirty perspectiveCameraProjections", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("mark the first perspectiveCameraProjection not dirty", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection1.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.dirty,
          false->Obj.magic,
        )
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject1, cameraProjection1.contents)
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject2, cameraProjection2.contents)
    })

    then(
      "get all dirty perspectiveCameraProjections should get [the second perspectiveCameraProjection]",
      () => {
        _getAllDirtyComponentsFunc(state.contents)->expect == [cameraProjection2.contents]
      },
    )
  })

  test(."judge whether a gameObject has a perspectiveCameraProjection", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let cameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(. state.contents, gameObject, cameraProjection.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a perspectiveCameraProjection's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let perspectiveCameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        data.contents.addComponentFunc(.
          state.contents,
          gameObject,
          perspectiveCameraProjection.contents,
        )
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      data.contents.getGameObjectsFunc(.
        state.contents,
        perspectiveCameraProjection.contents,
      )->expect == [gameObject]
    })
  })

  test(."get default pMatrix", ({\"when", \"and", then}) => {
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    then("get perspectiveCameraProjection's pMatrix should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix,
      )->expect == WonderCommonlib.Matrix4.createIdentityMatrix4()
    })
  })

  test(."operate pMatrix", ({\"when", \"and", then}) => {
    let pMatrix = [0.0, 0.5, 1.0]
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's pMatrix", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix,
          pMatrix->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's pMatrix should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix,
      )->expect == pMatrix
    })
  })

  test(."operate fovy", ({\"when", \"and", then}) => {
    let fovy = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's fovy", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy,
          fovy->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's fovy should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy,
      )->expect == fovy
    })
  })

  test(."operate aspect", ({\"when", \"and", then}) => {
    let aspect = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's aspect", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect,
          aspect->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's aspect should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect,
      )->expect == aspect
    })
  })

  test(."operate far", ({\"when", \"and", then}) => {
    let far = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's far", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.far,
          far->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's far should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.far,
      )->expect == far
    })
  })

  test(."operate near", ({\"when", \"and", then}) => {
    let near = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's near", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.near,
          near->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's near should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.near,
      )->expect == near
    })
  })
})
