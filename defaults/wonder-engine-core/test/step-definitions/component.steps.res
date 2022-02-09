open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/component.feature")

defineFeature(feature, test => {
  let data = ref(Obj.magic(1))
  let usedData = ref(Obj.magic(1))

  let _buildRegisteredComponentData = (
    ~componentName="componentA",
    ~createStateFunc=(. config) => Obj.magic(1),
    ~getGameObjectsFunc=(. state, _) => Obj.magic(1),
    ~createComponentFunc=(. state) => (state, Obj.magic(1)),
    ~addComponentFunc=(. state, _, _) => state,
    ~hasComponentFunc=(. state, _) => false,
    ~getComponentFunc=(. state, _) => Obj.magic(1),
    ~getAllComponentsFunc=(. state) => Obj.magic(1),
    ~getComponentDataFunc=(. state, _, _) => Obj.magic(1),
    ~setComponentDataFunc=(. state, _, _, _) => state,
    (),
  ): RegisterComponentType.registeredComponent => {
    componentName: componentName,
    createStateFunc: createStateFunc,
    getGameObjectsFunc: getGameObjectsFunc,
    createComponentFunc: createComponentFunc,
    addComponentFunc: addComponentFunc,
    hasComponentFunc: hasComponentFunc,
    getComponentFunc: getComponentFunc,
    getAllComponentsFunc: getAllComponentsFunc,
    getComponentDataFunc: getComponentDataFunc,
    setComponentDataFunc: setComponentDataFunc,
  }

  let _getAllRegisteredComponentData = () => {
    POContainer.unsafeGetPO().componentData.allRegisteredComponentData
  }

  let _prepareRegister = given => {
    given("prepare register", () => {
      CreatePO.createPO()->POContainer.setPO
    })
  }

  test(."register one component", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register component data", () => {
      data := _buildRegisteredComponentData()

      Main.registerComponent(data.contents)
    })

    then("should add component data", () => {
      _getAllRegisteredComponentData()->expect ==
        WonderCommonlib.ImmutableHashMap.createEmpty()->WonderCommonlib.ImmutableHashMap.set(
          data.contents.componentName,
          data.contents,
        )
    })
  })

  test(."register the same component twice", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    given("open debug", () => {
      Main.setIsDebug(true)
    })

    \"when"("register component data", () => {
      data := _buildRegisteredComponentData()

      Main.registerComponent(data.contents)
    })

    \"and"("register component data", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        Main.registerComponent(data.contents)
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."register one component and unregister it", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register component data", () => {
      data := _buildRegisteredComponentData()

      Main.registerComponent(data.contents)
    })

    \"and"("unregister it", () => {
      Main.unregisterComponent(data.contents.componentName)
    })

    then("should not has component data", () => {
      _getAllRegisteredComponentData()->expect == WonderCommonlib.ImmutableHashMap.createEmpty()
    })
  })

  test(."register two components and unregister the first one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let data1 = ref(Obj.magic(1))
    let data2 = ref(Obj.magic(1))

    _prepareRegister(given)

    \"when"("register component1 data", () => {
      data1 := _buildRegisteredComponentData(~componentName="a1", ())

      Main.registerComponent(data1.contents)
    })

    \"and"("register component2 data", () => {
      data2 := _buildRegisteredComponentData(~componentName="a2", ())

      Main.registerComponent(data2.contents)
    })

    \"and"("unregister component1 data", () => {
      Main.unregisterComponent(data1.contents.componentName)
    })

    then("should only has component2 data", () => {
      _getAllRegisteredComponentData()->expect ==
        WonderCommonlib.ImmutableHashMap.createEmpty()->WonderCommonlib.ImmutableHashMap.set(
          data2.contents.componentName,
          data2.contents,
        )
    })
  })

  let _prepareComponent = (\"when", \"and", d) => {
    \"when"("register component data", () => {
      data := d

      Main.registerComponent(data.contents)
    })

    \"and"("create and set component state", () => {
      Main.createAndSetComponentState(d.componentName, Obj.magic(1))
    })
  }

  test(."create component", ({given, \"when", \"and", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "maxIndex": 0,
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = JsObjTool.getObjValue(state, "maxIndex")

          (
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex")->succ,
            }->Obj.magic,
            component,
          )
        },
        (),
      ),
    )

    \"when"("create a component as c1", () => {
      let (d, component) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent

      c1 := component
      usedData := d
    })

    then("c1 should be correct", () => {
      c1.contents->expect == 0->Obj.magic
    })

    \"and"("component state is updated", () => {
      JsObjTool.getObjValue(usedData.contents.state, "maxIndex")->expect == 1
    })
  })

  test(."has component", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": WonderCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->WonderCommonlib.ImmutableSparseMap.set(
              gameObject->Obj.magic,
              component->Obj.magic,
            ),
          }->Obj.magic
        },
        ~hasComponentFunc=(. state, gameObject) => {
          JsObjTool.getObjValue(
            state,
            "gameObjectMeshRendererMap",
          )->WonderCommonlib.ImmutableSparseMap.has(gameObject->Obj.magic)
        },
        (),
      ),
    )

    given("create a gameObject as g1", () => {
      ()
    })

    \"and"("create a component as c1", () => {
      let (d, component) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent

      c1 := component
      usedData := d
    })

    \"and"("add c1 to g1", () => {
      usedData := usedData.contents->Main.addComponent(g1, c1.contents)
    })

    then("g1 should has c1", () => {
      usedData.contents->Main.hasComponent(g1)->expect == true
    })
  })

  test(."get component", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": WonderCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->WonderCommonlib.ImmutableSparseMap.set(
              gameObject->Obj.magic,
              component->Obj.magic,
            ),
          }->Obj.magic
        },
        ~getComponentFunc=(. state, gameObject) => {
          JsObjTool.getObjValue(state, "gameObjectMeshRendererMap")
          ->WonderCommonlib.ImmutableSparseMap.get(gameObject->Obj.magic)
          ->WonderCommonlib.OptionSt.getExn
          ->Obj.magic
        },
        (),
      ),
    )

    given("create a gameObject as g1", () => {
      ()
    })

    \"and"("create a component as c1", () => {
      let (d, component) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent

      c1 := component
      usedData := d
    })

    \"and"("add c1 to g1", () => {
      usedData := usedData.contents->Main.addComponent(g1, c1.contents)
    })

    then("get gameObject's component should return c1", () => {
      usedData.contents->Main.getComponent(g1)->expect == c1.contents->Js.Nullable.return
    })
  })

  test(."get all components", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let g2 = Obj.magic(11)
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(2))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "gameObjectMeshRendererMap": WonderCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "gameObjectMeshRendererMap": JsObjTool.getObjValue(
              state,
              "gameObjectMeshRendererMap",
            )->WonderCommonlib.ImmutableSparseMap.set(
              gameObject->Obj.magic,
              component->Obj.magic,
            ),
          }->Obj.magic
        },
        ~getAllComponentsFunc=(. state) => {
          JsObjTool.getObjValue(state, "gameObjectMeshRendererMap")
          ->WonderCommonlib.ImmutableSparseMap.getValues
          ->Obj.magic
        },
        (),
      ),
    )

    given("create two gameObjects as g1, g2", () => {
      ()
    })

    \"and"("create two components as c1, c2", () => {
      let (d, component1) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent
      let (d, component2) = d->Main.createComponent

      c1 := component1
      c2 := component2
      usedData := d
    })

    \"and"("add c1 to g1", () => {
      usedData := usedData.contents->Main.addComponent(g1, c1.contents)
    })

    \"and"("add c2 to g2", () => {
      usedData := usedData.contents->Main.addComponent(g2, c2.contents)
    })

    then("get all components should return [c1, c2]", () => {
      Main.getAllComponents(usedData.contents)->expect == [c1.contents, c2.contents]
    })
  })

  test(."get component's gameObjects", ({given, \"when", \"and", then}) => {
    let g1 = Obj.magic(10)
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "meshRendererGameObjectMap": WonderCommonlib.ImmutableSparseMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = 1->Obj.magic

          (state, component)
        },
        ~addComponentFunc=(. state, gameObject, component) => {
          {
            "meshRendererGameObjectMap": JsObjTool.getObjValue(
              state,
              "meshRendererGameObjectMap",
            )->WonderCommonlib.ImmutableSparseMap.set(
              component->Obj.magic,
              gameObject->Obj.magic,
            ),
          }->Obj.magic
        },
        ~getGameObjectsFunc=(. state, component) => {
          [
            JsObjTool.getObjValue(state, "meshRendererGameObjectMap")
            ->WonderCommonlib.ImmutableSparseMap.get(component->Obj.magic)
            ->WonderCommonlib.OptionSt.getExn
            ->Obj.magic,
          ]
        },
        (),
      ),
    )

    given("create a gameObject as g1", () => {
      ()
    })

    \"and"("create a component as c1", () => {
      let (d, component) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent

      c1 := component
      usedData := d
    })

    \"and"("add c1 to g1", () => {
      usedData := usedData.contents->Main.addComponent(g1, c1.contents)
    })

    then("get c1's gameObjects should return [g1]", () => {
      Main.getComponentGameObjects(usedData.contents, c1.contents)->expect == [g1]
    })
  })

  test(."operate component's data", ({given, \"when", \"and", then}) => {
    let c1 = ref(Obj.magic(1))
    let componentName = "a1"

    _prepareRegister(given)

    _prepareComponent(
      \"when",
      \"and",
      _buildRegisteredComponentData(
        ~componentName,
        ~createStateFunc=(. _) => {
          {
            "maxIndex": 0,
            "isRenderMap": WonderCommonlib.ImmutableHashMap.createEmpty(),
          }->Obj.magic
        },
        ~createComponentFunc=(. state) => {
          let component = JsObjTool.getObjValue(state, "maxIndex")

          (
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex")->succ,
              "isRenderMap": JsObjTool.getObjValue(
                state,
                "isRenderMap",
              )->WonderCommonlib.ImmutableHashMap.set(component, false),
            }->Obj.magic,
            component,
          )
        },
        ~getComponentDataFunc=(. state, component, dataName) => {
          switch dataName->Obj.magic {
          | "isRender" =>
            JsObjTool.getObjValue(state, "isRenderMap")
            ->WonderCommonlib.ImmutableHashMap.get(component->Obj.magic)
            ->WonderCommonlib.OptionSt.getExn
          }
        },
        ~setComponentDataFunc=(. state, component, dataName, dataValue) => {
          switch dataName->Obj.magic {
          | "isRender" =>
            {
              "maxIndex": JsObjTool.getObjValue(state, "maxIndex"),
              "isRenderMap": JsObjTool.getObjValue(
                state,
                "isRenderMap",
              )->WonderCommonlib.ImmutableHashMap.set(component->Obj.magic, dataValue),
            }->Obj.magic
          }
        },
        (),
      ),
    )

    \"and"("create a component as c1", () => {
      let (d, component) = Main.unsafeGetRelatedComponentData(componentName)->Main.createComponent

      c1 := component
      usedData := d
    })

    \"when"("set c1's data1", () => {
      usedData :=
        usedData.contents->Main.setComponentData(
          c1.contents,
          "isRender"->Obj.magic,
          true->Obj.magic,
        )
    })

    then("get c1's data1 should the setted data", () => {
      Main.getComponentData(usedData.contents, c1.contents, "isRender"->Obj.magic)
      ->Obj.magic
      ->expect == true
    })
  })
})
