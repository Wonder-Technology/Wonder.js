open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentDirectionlight.StateType.state,
      WonderComponentDirectionlight.StateType.config,
      WonderComponentDirectionlight.DataType.dataName,
      WonderComponentDirectionlight.StateType.directionLight,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~directionLightCount=10, ()) => {
    data.contents.createStateFunc(. {isDebug: isDebug, directionLightCount: directionLightCount})
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
    let directionLightCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~directionLightCount, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getDirectionLightCount(state.contents),
      )->expect == (true, directionLightCount)
    })
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let directionLightCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with directionLightCount", () => {
      state := _createState(~directionLightCount, ())
    })

    then("dataoriented data is created based on directionLightCount", () => {
      state.contents.colors->Js.Typed_array.Float32Array.length->expect == directionLightCount * 3
    })
  })

  test(."create a directionLight", ({\"when", \"and", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a directionLight", () => {
      let (state, light) = data.contents.createComponentFunc(. state.contents)

      state.maxIndex->expect == 1
      light->expect == 0
    })
  })

  test(."add a directionLight to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let light = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    \"and"("add the directionLight to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, light.contents)
    })

    then("get the gameObject's directionLight should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == light.contents
    })
  })

  test(."add a directionLight to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two directionLights", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      material1 := m1
      material2 := m2
    })

    \"and"("add the first directionLight to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material1.contents)
    })

    \"and"("add the second directionLight to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material2.contents)
    })

    then("get the gameObject's directionLight should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == material2.contents
    })
  })

  test(."get all directionLights", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two directionLights", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      material1 := m1
      material2 := m2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, material1.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, material2.contents)
    })

    then("getAllComponentsFunc should get the two directionLights", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          material1.contents,
          material2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a directionLight", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let light = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    \"and"("add the directionLight to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, light.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a directionLight's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let directionLight = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      directionLight := m
    })

    \"and"("add the directionLight to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, directionLight.contents)
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      data.contents.getGameObjectsFunc(. state.contents, directionLight.contents)->expect == [
          gameObject,
        ]
    })
  })

  test(."get default color", ({\"when", \"and", then}) => {
    let light = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    then("get directionLight's color should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        light.contents,
        WonderComponentTypeDirectionlight.Index.dataName.color,
      )->expect == [1., 1., 1.]
    })
  })

  test(."get default intensity", ({\"when", \"and", then}) => {
    let light = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    then("get directionLight\'s intensity should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        light.contents,
        WonderComponentTypeDirectionlight.Index.dataName.intensity,
      )->expect == 1.
    })
  })

  test(."operate color", ({\"when", \"and", then}) => {
    let color = [0.0, 0.5, 1.0]
    let light = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    \"when"("set directionLight's color", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          light.contents,
          WonderComponentTypeDirectionlight.Index.dataName.color,
          color->Obj.magic,
        )
    })

    then("get directionLight's color should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        light.contents,
        WonderComponentTypeDirectionlight.Index.dataName.color,
      )->expect == color
    })
  })

  test(."operate intensity", ({\"when", \"and", then}) => {
    let intensity = 0.5
    let light = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a directionLight", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      light := m
    })

    \"when"("set directionLight's intensity", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          light.contents,
          WonderComponentTypeDirectionlight.Index.dataName.intensity,
          intensity->Obj.magic,
        )
    })

    then("get directionLight's intensity should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        light.contents,
        WonderComponentTypeDirectionlight.Index.dataName.intensity,
      )->expect == intensity
    })
  })

  test(."create too many directionLights", ({given, \"when", \"and", then}) => {
    let isDebug = true

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with directionLightCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~directionLightCount=arguments[0]->Obj.magic, ())
    })

    then("create two directionLights should contract error", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)

      expect(() => {
        data.contents.createComponentFunc(. s)
      })->toThrowMessage("expect index: 1 <= maxIndex: 0")
    })
  })
})
