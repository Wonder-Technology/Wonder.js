open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentPbrmaterial.StateType.state,
      WonderComponentPbrmaterial.StateType.config,
      WonderComponentPbrmaterial.DataType.dataName,
      WonderComponentPbrmaterial.StateType.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~pbrMaterialCount=10, ()) => {
    data.contents.createStateFunc(. {isDebug: isDebug, pbrMaterialCount: pbrMaterialCount})
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
    let pbrMaterialCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~pbrMaterialCount, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getPBRMaterialCount(state.contents),
      )->expect == (true, pbrMaterialCount)
    })
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let pbrMaterialCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with pbrMaterialCount", () => {
      state := _createState(~pbrMaterialCount, ())
    })

    then("dataoriented data is created based on pbrMaterialCount", () => {
      state.contents.diffuseColors->Js.Typed_array.Float32Array.length->expect ==
        pbrMaterialCount * 3
    })
  })

  test(."create a pbrMaterial", ({\"when", \"and", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a pbrMaterial", () => {
      let (state, material) = data.contents.createComponentFunc(. state.contents)

      state.maxIndex->expect == 1
      material->expect == 0
    })
  })

  test(."add a pbrMaterial to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let material = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"and"("add the pbrMaterial to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material.contents)
    })

    then("get the gameObject's pbrMaterial should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == material.contents
    })
  })

  test(."add a pbrMaterial to a gameObject which alreay has one", ({
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

    \"and"("create two pbrMaterials", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)
      let (s, m2) = data.contents.createComponentFunc(. s)

      state := s
      material1 := m1
      material2 := m2
    })

    \"and"("add the first pbrMaterial to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material1.contents)
    })

    \"and"("add the second pbrMaterial to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material2.contents)
    })

    then("get the gameObject's pbrMaterial should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == material2.contents
    })
  })

  test(."get all pbrMaterials", ({given, \"when", \"and", then}) => {
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

    \"and"("create two pbrMaterials", () => {
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

    then("getAllComponentsFunc should get the two pbrMaterials", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          material1.contents,
          material2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a pbrMaterial", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let material = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"and"("add the pbrMaterial to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, material.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a pbrMaterial's gameObjects", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let material = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"and"("add the pbrMaterial to the two gameObjects", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, material.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, material.contents)
    })

    then("getGameObjectsFunc should return the two gameObjects", () => {
      data.contents.getGameObjectsFunc(. state.contents, material.contents)->expect == [
          gameObject1,
          gameObject2,
        ]
    })
  })

  test(."get default diffuseColor", ({\"when", \"and", then}) => {
    let material = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    then("get pbrMaterial's diffuseColor should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        material.contents,
        WonderComponentTypePbrmaterial.Index.dataName.diffuseColor,
      )->expect == [1., 1., 1.]
    })
  })

  test(."get default specular", ({\"when", \"and", then}) => {
    let material = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    then("get pbrMaterial\'s specular should return default data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        material.contents,
        WonderComponentTypePbrmaterial.Index.dataName.specular,
      )->expect == 1.
    })
  })

  test(."get the data from dataoriented data may not equal to the value which is setted", ({
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    let material = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"when"(%re("/^set pbrMaterial's diffuseColor to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          material.contents,
          WonderComponentTypePbrmaterial.Index.dataName.diffuseColor,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    then(
      %re("/^get pbrMaterial's diffuseColor should return (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        data.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          WonderComponentTypePbrmaterial.Index.dataName.diffuseColor,
        )->expect == arguments->Js.Array.slice(~start=0, ~end_=3, _)
      },
    )
  })

  test(."operate diffuseColor", ({\"when", \"and", then}) => {
    let diffuseColor = [0.0, 0.5, 1.0]
    let material = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"when"("set pbrMaterial's diffuseColor", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          material.contents,
          WonderComponentTypePbrmaterial.Index.dataName.diffuseColor,
          diffuseColor->Obj.magic,
        )
    })

    then("get pbrMaterial's diffuseColor should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        material.contents,
        WonderComponentTypePbrmaterial.Index.dataName.diffuseColor,
      )->expect == diffuseColor
    })
  })

  test(."operate specular", ({\"when", \"and", then}) => {
    let specular = 0.5
    let material = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, m) = data.contents.createComponentFunc(. state.contents)

      state := s
      material := m
    })

    \"when"("set pbrMaterial's specular", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          material.contents,
          WonderComponentTypePbrmaterial.Index.dataName.specular,
          specular->Obj.magic,
        )
    })

    then("get pbrMaterial's specular should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        material.contents,
        WonderComponentTypePbrmaterial.Index.dataName.specular,
      )->expect == specular
    })
  })

  test(."create too many pbrMaterials", ({given, \"when", \"and", then}) => {
    let isDebug = true

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with pbrMaterialCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~pbrMaterialCount=arguments[0]->Obj.magic, ())
    })

    then("create two pbrMaterials should contract error", () => {
      let (s, m1) = data.contents.createComponentFunc(. state.contents)

      expect(() => {
        data.contents.createComponentFunc(. s)
      })->toThrowMessage("expect index: 1 <= maxIndex: 0")
    })
  })
})
