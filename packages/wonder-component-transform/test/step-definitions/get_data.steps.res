open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentTransform.StateType.state,
      WonderComponentTransform.StateType.config,
      WonderComponentTransform.DataType.dataName,
      WonderComponentTransform.StateType.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  //   let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (
    ~isDebug=false,
    ~transformCount=10,
    ~float9Array1=Js.Typed_array.Float32Array.make([]),
    ~float32Array1=Js.Typed_array.Float32Array.make([]),
    (),
  ) => {
    data.contents.createStateFunc(. {
      isDebug: isDebug,
      transformCount: transformCount,
      float9Array1: float9Array1,
      float32Array1: float32Array1,
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
    let transformCount = 10
    let float9Array1 = Js.Typed_array.Float32Array.make([1.0])
    let float32Array1 = Js.Typed_array.Float32Array.make([1.0, 0.0])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~transformCount, ~float9Array1, ~float32Array1, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getTransformCount(state.contents),
        ConfigTool.getFloat9Array1(state.contents),
        ConfigTool.getFloat32Array1(state.contents),
      )->expect == (true, transformCount, float9Array1, float32Array1)
    })
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let transformCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with transformCount", () => {
      state := _createState(~transformCount, ())
    })

    then("dataoriented data is created based on transformCount", () => {
      state.contents.localPositions->Js.Typed_array.Float32Array.length->expect ==
        transformCount * 3
    })
  })

  test(."create a transform", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a transform", () => {
      let (state, t) = data.contents.createComponentFunc(. state.contents)

      transform := t

      state.maxIndex->expect == 1
      transform.contents->expect == 0
    })

    \"and"("mark the transform dirty", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.dirty,
      )->expect == true
    })

    \"and"("set the transform's children to empty", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.children,
      )->expect == []
    })
  })

  test(."add a transform to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("get the gameObject's transform should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == transform.contents
    })
  })

  test(."add a transform to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform1 = ref(Obj.magic(1))
    let transform2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two transforms", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      transform1 := m1
      transform2 := m2
    })

    \"and"("add the first transform to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, transform1.contents)
    })

    \"and"("add the second transform to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, transform2.contents)
    })

    then("get the gameObject's transform should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == transform2.contents
    })
  })

  test(."get all transforms", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let transform1 = ref(Obj.magic(1))
    let transform2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two transforms", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      transform1 := m1
      transform2 := m2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, transform1.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, transform2.contents)
    })

    then("getAllComponentsFunc should get the two transforms", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          transform1.contents,
          transform2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a transform", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a transform's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      data.contents.getGameObjectsFunc(. state.contents, transform.contents)->expect == [gameObject]
    })
  })

  test(."get default position", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's position should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )->expect == [0., 0., 0.]
    })
  })

  test(."get default rotation", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's rotation should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.rotation,
      )->expect == [0., 0., 0., 1.]
    })
  })

  test(."get default scale", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's scale should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.scale,
      )->expect == [1., 1., 1.]
    })
  })

  test(."get default euler angles", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's euler angles should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.eulerAngles,
      )->expect == [0., -0., 0.]
    })
  })
})
