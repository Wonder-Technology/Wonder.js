open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

open Js.Typed_array

let feature = loadFeature("./test/features/get_data.feature")

defineFeature(feature, test => {
  let data: ref<
    WonderCore.IComponentForJs.registeredComponent<
      WonderComponentGeometry.StateType.state,
      WonderComponentGeometry.StateType.config,
      WonderComponentGeometry.DataType.dataName,
      WonderComponentGeometry.StateType.geometry,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<StateType.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~geometryPointCount=10, ~geometryCount=10, ()) => {
    data.contents.createStateFunc(. {
      isDebug: isDebug,
      geometryPointCount: geometryPointCount,
      geometryCount: geometryCount,
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
    let geometryPointCount = 100
    let geometryCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~geometryPointCount, ~geometryCount, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getGeometryPointCount(state.contents),
        ConfigTool.getGeometryCount(state.contents),
      )->expect == (true, geometryPointCount, geometryCount)
    })
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let geometryPointCount = 20
    let geometryCount = 10

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state with geometryPointCount, geometryCount", () => {
      state := _createState(~geometryPointCount, ~geometryCount, ())
    })

    then("dataoriented data is created based on geometryPointCount, geometryCount", () => {
      state.contents.vertices->Js.Typed_array.Float32Array.length->expect == geometryPointCount * 3
      state.contents.indicesInfos->Js.Typed_array.Uint32Array.length->expect == geometryCount * 2
    })
  })

  test(."create a geometry", ({\"when", \"and", then}) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a geometry", () => {
      let (state, geometry) = data.contents.createComponentFunc(. state.contents)

      state.maxIndex->expect == 1
      geometry->expect == 0
    })
  })

  test(."add a geometry to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    then("get the gameObject's geometry should be the added one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == geometry.contents
    })
  })

  test(."add a geometry to a gameObject which alreay has one", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometryl1 = ref(Obj.magic(1))
    let geometryl2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two geometries", () => {
      let (s, g1) = data.contents.createComponentFunc(. state.contents)
      let (s, g2) = data.contents.createComponentFunc(. s)

      state := s
      geometryl1 := g1
      geometryl2 := g2
    })

    \"and"("add the first geometry to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, geometryl1.contents)
    })

    \"and"("add the second geometry to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, geometryl2.contents)
    })

    then("get the gameObject's geometry should be the second one", () => {
      data.contents.getComponentFunc(. state.contents, gameObject)
      ->WonderCommonlib.NullableTool.getExn
      ->expect == geometryl2.contents
    })
  })

  test(."get all geometries", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometryl1 = ref(Obj.magic(1))
    let geometryl2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two geometries", () => {
      let (s, g1) = data.contents.createComponentFunc(. state.contents)
      let (s, g2) = data.contents.createComponentFunc(. s)

      state := s
      geometryl1 := g1
      geometryl2 := g2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, geometryl1.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, geometryl2.contents)
    })

    then("getAllComponentsFunc should get the two geometries", () => {
      data.contents.getAllComponentsFunc(. state.contents)->expect == [
          geometryl1.contents,
          geometryl2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a geometry", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the gameObject", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject, geometry.contents)
    })

    then("hasComponentFunc should return true", () => {
      data.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a geometry's gameObjects", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let geometry = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("add the geometry to the two gameObjects", () => {
      state := data.contents.addComponentFunc(. state.contents, gameObject1, geometry.contents)
      state := data.contents.addComponentFunc(. state.contents, gameObject2, geometry.contents)
    })

    then("getGameObjectsFunc should return the two gameObjects", () => {
      data.contents.getGameObjectsFunc(. state.contents, geometry.contents)->expect == [
          gameObject1,
          gameObject2,
        ]
    })
  })

  test(."get indices's count", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"(%re("/^set geometry's indices to (.*) , (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.indices,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    then(%re("/^get geometry's indices's count should return (.*)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.indicesCount,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == arguments[0]
    })
  })

  test(."operate vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let vertices1 = Float32Array.make([1., 2., 3.])
    let vertices2 = Float32Array.make([3., 5., 5.])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's vertices", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.vertices,
          vertices1->Obj.magic,
        )
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.vertices,
          vertices2->Obj.magic,
        )
    })

    then("get geometry's vertices should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.vertices,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == vertices2
    })
  })

  test(."operate normals", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let normals1 = Float32Array.make([1., 2., 3.])
    let normals2 = Float32Array.make([3., 5., 5.])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's normals", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.normals,
          normals1->Obj.magic,
        )
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.normals,
          normals2->Obj.magic,
        )
    })

    then("get geometry's normals should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.normals,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == normals2
    })
  })

  test(."operate texCoords", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let texCoords1 = Float32Array.make([1., 2.])
    let texCoords2 = Float32Array.make([3., 5.])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's texCoords", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.texCoords,
          texCoords1->Obj.magic,
        )
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.texCoords,
          texCoords2->Obj.magic,
        )
    })

    then("get geometry's texCoords should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.texCoords,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == texCoords2
    })
  })

  test(."operate tangents", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let tangents1 = Float32Array.make([1., 2., 3.])
    let tangents2 = Float32Array.make([3., 5., 5.])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's tangents", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.tangents,
          tangents1->Obj.magic,
        )
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.tangents,
          tangents2->Obj.magic,
        )
    })

    then("get geometry's tangents should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.tangents,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == tangents2
    })
  })

  test(."operate indices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))
    let indices1 = Uint32Array.make([1, 2, 3])

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"when"("set geometry's indices", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.indices,
          indices1->Obj.magic,
        )
    })

    then("get geometry's indices should return the setted data", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.indices,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == indices1
    })
  })

  test(."not has vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then("geometry should not has vertices", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.vertices,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Float32Array.length
      ->expect == 0
    })
  })

  test(."has vertices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("set geometry's vertices", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.vertices,
          Float32Array.make([1., 2., 3.])->Obj.magic,
        )
    })

    then("geometry should has vertices", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.vertices,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Float32Array.length
      ->expect == 3
    })
  })

  test(."has indices", ({\"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    \"and"("set geometry's indices", () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          geometry.contents,
          WonderComponentTypeGeometry.Index.dataName.indices,
          Uint32Array.make([1, 2, 3])->Obj.magic,
        )
    })

    then("geometry should has indices", () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        geometry.contents,
        WonderComponentTypeGeometry.Index.dataName.indices,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->Obj.magic
      ->Uint32Array.length
      ->expect == 3
    })
  })

  test(."texCoords should in [0.0, 1.0]", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState(~isDebug, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re(
        "/^set geometry's texCoords to (.*), (.*) which not in range should throw error message: \"(.*)\"$/"
      )->Obj.magic,
      () => {
        let message =
          (
            %external(arguments)
            ->WonderCommonlib.OptionSt.getExn
            ->WonderCommonlib.ArgumentsTool.getArgumentsArr
          )[2]
        let arguments =
          %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        expect(() => {
          state :=
            data.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              WonderComponentTypeGeometry.Index.dataName.texCoords,
              arguments->Js.Array.slice(~start=0, ~end_=2, _)->Obj.magic,
            )
        })->toThrowMessage(message)
      },
    )
  })

  test(."set enough vertices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's vertices with (\d+) vertex data should not throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            data.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              WonderComponentTypeGeometry.Index.dataName.vertices,
              Float32Array.make([1., 2., 3., 4., 5., 6.])->Obj.magic,
            )
        })->toNotThrow
      },
    )
  })

  test(."set too many vertices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's vertices with (\d+) vertex data should throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            data.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              WonderComponentTypeGeometry.Index.dataName.vertices,
              Float32Array.make([1., 2., 3., 4., 5., 6., 7., 8., 9.])->Obj.magic,
            )
        })->toThrowMessage("offset is out of bounds")
      },
    )
  })

  test(."set too many indices", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with geometryPointCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryPointCount=arguments[0]->Obj.magic, ())
    })

    \"and"("create a geometry", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)

      state := s
      geometry := g
    })

    then(
      %re("/^set geometry's indices with (\d+) indices should throw error$/")->Obj.magic,
      arg0 => {
        expect(() => {
          state :=
            data.contents.setComponentDataFunc(.
              state.contents,
              geometry.contents,
              WonderComponentTypeGeometry.Index.dataName.indices,
              Uint32Array.make([1])->Obj.magic,
            )
        })->toThrowMessage("offset is out of bounds")
      },
    )
  })

  test(."create too many geometries", ({given, \"when", \"and", then}) => {
    let isDebug = true
    let geometry = ref(Obj.magic(1))

    given("open debug", () => {
      ()
    })

    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"(%re("/^create a state with geometryCount:(\d+)$/")->Obj.magic, arg0 => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := _createState(~isDebug, ~geometryCount=arguments[0]->Obj.magic, ())
    })

    then("create two geometries should contract error", () => {
      let (s, g) = data.contents.createComponentFunc(. state.contents)
      expect(() => {
        data.contents.createComponentFunc(. s)
      })->toThrowMessage("expect index: 1 <= maxIndex: 0")
    })
  })
})
