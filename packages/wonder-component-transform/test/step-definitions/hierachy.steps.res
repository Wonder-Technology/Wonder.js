open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/hierachy.feature")

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

  let _createState = (
    ~isDebug=false,
    ~transformCount=10,
    ~float9Array1=WonderCommonlib.Matrix3.createIdentityMatrix3(),
    ~float32Array1=WonderCommonlib.Matrix4.createIdentityMatrix4(),
    (),
  ) => {
    data.contents.createStateFunc(. {
      isDebug: isDebug,
      transformCount: transformCount,
      float9Array1: float9Array1,
      float32Array1: float32Array1,
    })
  }

  let _getDefaultPosition = () => [0., 0., 0.]

  let _addPosition = (pos1, pos2) => {
    [pos1[0] +. pos2[0], pos1[1] +. pos2[1], pos1[2] +. pos2[2]]
  }

  let _getDataAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get data", () => {
      data := Main.getData()
    })

    \"and"("create a state", () => {
      state := _createState()
    })
  }

  test(."test one(parent)-one(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = data.contents.createComponentFunc(. state.contents)
      let (s, c) = data.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })
  })

  test(."test one(parent)-two(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [10., 20., 30.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = data.contents.createComponentFunc(. state.contents)
        let (s, c1) = data.contents.createComponentFunc(. s)
        let (s, c2) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.position,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _addPosition(pos1, pos2)
      },
    )
  })

  test(."can set the same parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = data.contents.createComponentFunc(. state.contents)
      let (s, c) = data.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get child(\d+)'s parent should be parent(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.parent,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == parent1.contents
    })
  })

  test(."can set a different parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let parent2 = ref(Obj.magic(2))
    let child1 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), parent(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p1) = data.contents.createComponentFunc(. state.contents)
        let (s, p2) = data.contents.createComponentFunc(. s)
        let (s, c) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p1
        parent2 := p2
        child1 := c
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent2.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get child(\d+)'s parent should be parent(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.parent,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == parent2.contents
    })
  })

  test(."set different parents should change its current parent\'s children order", ({
    \"when",
    \"and",
    then,
  }) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let child3 = ref(Obj.magic(4))
    let pos1 = [1., 2., 3.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re(
        "/^create four transforms as parent(\d+), child(\d+), child(\d+), child(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, p) = data.contents.createComponentFunc(. state.contents)
        let (s, c1) = data.contents.createComponentFunc(. s)
        let (s, c2) = data.contents.createComponentFunc(. s)
        let (s, c3) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
        child3 := c3
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child3.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to child(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          child3.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(
      %re("/^get parent(\d+)'s children should be \[child(\d+), child(\d+)\]$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.children,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == [child3.contents, child2.contents]
      },
    )
  })

  test(."test two(parent)-two(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let parent2 = ref(Obj.magic(2))
    let child1 = ref(Obj.magic(3))
    let child2 = ref(Obj.magic(4))
    let pos1 = [1., 2., 3.]
    let pos2 = [2., 3., 4.]
    let pos3 = [4., 3., 4.]
    let pos4 = [7., 3., 4.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re(
        "/^create four transforms as parent(\d+), parent(\d+), child(\d+), child(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, p1) = data.contents.createComponentFunc(. state.contents)
        let (s, p2) = data.contents.createComponentFunc(. s)
        let (s, c1) = data.contents.createComponentFunc(. s)
        let (s, c2) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p1
        parent2 := p2
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent2.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent2.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos3->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos4->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent2.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.position,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _addPosition(pos3, pos1)
      },
    )

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.position,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _addPosition(pos4, pos2)
      },
    )
  })

  test(."test one(parent)-one(child) for remove parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = data.contents.createComponentFunc(. state.contents)
      let (s, c) = data.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^remove child(\d+)'s parent$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          Js.Nullable.null->Obj.magic,
        )
    })

    then(%re("/^child(\d+) should not have parent$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.parent,
      )->expect == Js.Nullable.undefined
    })

    \"and"(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return default data$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == _getDefaultPosition()
    })
  })

  test(."test one(parent)-two(child) for remove parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [2., 3., 4.]

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = data.contents.createComponentFunc(. state.contents)
        let (s, c1) = data.contents.createComponentFunc(. s)
        let (s, c2) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^remove child(\d+)'s parent$/")->Obj.magic, arg0 => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          Js.Nullable.null->Obj.magic,
        )
    })

    \"and"(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        data.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        WonderComponentTypeTransform.Index.dataName.localPosition,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        WonderComponentTypeTransform.Index.dataName.position,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == pos2
    })
  })

  test(."has no parent", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create a transform as transform(\d+)$/")->Obj.magic, arg0 => {
      let (s, t) = data.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    then(%re("/^transform(\d+) should not have parent$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.parent,
      )->expect == Js.Nullable.undefined
    })
  })

  test(."has parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = data.contents.createComponentFunc(. state.contents)
      let (s, c) = data.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^child(\d+) should have parent$/")->Obj.magic, arg0 => {
      data.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        WonderComponentTypeTransform.Index.dataName.parent,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == parent1.contents
    })
  })

  test(."get parent\'s all children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))

    _getDataAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = data.contents.createComponentFunc(. state.contents)
        let (s, c1) = data.contents.createComponentFunc(. s)
        let (s, c2) = data.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        data.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          WonderComponentTypeTransform.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(
      %re("/^get parent1's children should return \[child(\d+), child(\d+)\]$/")->Obj.magic,
      () => {
        data.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          WonderComponentTypeTransform.Index.dataName.children,
        )
        ->WonderCommonlib.NullableTool.getExn
        ->expect == [child1.contents, child2.contents]
      },
    )
  })
})
