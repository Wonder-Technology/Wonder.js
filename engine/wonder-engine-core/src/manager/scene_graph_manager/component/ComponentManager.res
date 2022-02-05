let registerComponent = (
  {componentData} as po: POType.po,
  data: RegisterComponentType.registeredComponent,
): WonderCommonlib.Result.t2<POType.po> => {
  WonderCommonlib.ContractResult.requireCheck(() => {
    open WonderCommonlib.ContractResult
    open Operators
    test(
      WonderCommonlib.Log.buildAssertMessage(~expect=j`not register before`, ~actual=j`not`),
      () => {
        componentData.allRegisteredComponentData
        ->WonderCommonlib.ImmutableHashMap.has(data.componentName)
        ->assertFalse
      },
    )
  }, PluginDataManager.getIsDebug())->WonderCommonlib.Result.mapSuccess(() => {
    {
      ...po,
      componentData: {
        ...componentData,
        allRegisteredComponentData: componentData.allRegisteredComponentData->WonderCommonlib.ImmutableHashMap.set(
          data.componentName,
          data,
        ),
      },
    }
  })
}

let unregisterComponent = (
  {componentData} as po: POType.po,
  componentName: IComponentForJs.componentName,
): POType.po => {
  {
    ...po,
    componentData: {
      ...componentData,
      allRegisteredComponentData: componentData.allRegisteredComponentData->WonderCommonlib.ImmutableHashMap.deleteVal(
        componentName,
      ),
    },
  }
}

let unsafeGetUsedComponentData = (
  {componentData}: POType.po,
  componentName: IComponentForJs.componentName,
): RegisterComponentType.usedComponentData => {
  componentData.allUsedComponentData->WonderCommonlib.MutableHashMap.unsafeGet(componentName)
}

let setRelatedComponentData = (
  poState: POType.po,
  data: RegisterComponentType.usedComponentData,
  componentName: IComponentForJs.componentName,
): POType.po => {
  poState.componentData.allUsedComponentData
  ->WonderCommonlib.MutableHashMap.set(componentName, data)
  ->ignore

  poState
}

let createAndSetComponentState = (
  po: POType.po,
  componentName: IComponentForJs.componentName,
  config: RegisterComponentType.config,
): POType.po => {
  let {
    createStateFunc,
    getGameObjectsFunc,
    createComponentFunc,
    addComponentFunc,
    hasComponentFunc,
    getComponentFunc,
    getAllComponentsFunc,
    getComponentDataFunc,
    setComponentDataFunc,
  } =
    po.componentData.allRegisteredComponentData->WonderCommonlib.ImmutableHashMap.unsafeGet(
      componentName,
    )

  {
    ...po,
    componentData: {
      ...po.componentData,
      allUsedComponentData: po.componentData.allUsedComponentData->WonderCommonlib.ImmutableHashMap.set(
        componentName,
        {
          componentName: componentName,
          state: createStateFunc(. config),
          createComponentFunc: createComponentFunc,
          getGameObjectsFunc: getGameObjectsFunc,
          addComponentFunc: addComponentFunc,
          hasComponentFunc: hasComponentFunc,
          getComponentFunc: getComponentFunc,
          getAllComponentsFunc: getAllComponentsFunc,
          getComponentDataFunc: getComponentDataFunc,
          setComponentDataFunc: setComponentDataFunc,
        },
      ),
    },
  }
}

let _setComponentStateToData = (
  componentState: RegisterComponentType.state,
  data: RegisterComponentType.usedComponentData,
): RegisterComponentType.usedComponentData => {
  data.state = componentState

  data
}

let createComponent = (data: RegisterComponentType.usedComponentData): (
  RegisterComponentType.usedComponentData,
  RegisterComponentType.component,
) => {
  let (componentState, component) = data.createComponentFunc(. data.state)

  (_setComponentStateToData(componentState, data), component)
}

let setComponentData = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
  dataName: RegisterComponentType.dataName,
  dataValue: IComponentForJs.dataValue,
): RegisterComponentType.usedComponentData => {
  // let data = po->unsafeGetUsedComponentData(componentName)

  data.setComponentDataFunc(. data.state, component, dataName, dataValue)->_setComponentStateToData(
    data,
  )

  // ->_setComponentStateToData(po, data, componentName, _)

  // po
}

let addComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: IGameObjectForJs.gameObject,
  component: RegisterComponentType.component,
): RegisterComponentType.usedComponentData => {
  data.addComponentFunc(. data.state, gameObject, component)->_setComponentStateToData(data)
}

let hasComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: IGameObjectForJs.gameObject,
): bool => {
  data.hasComponentFunc(. data.state, gameObject)
}

let getComponent = (
  data: RegisterComponentType.usedComponentData,
  gameObject: IGameObjectForJs.gameObject,
): Js.Nullable.t<RegisterComponentType.component> => {
  data.getComponentFunc(. data.state, gameObject)
}

let getAllComponents = (data: RegisterComponentType.usedComponentData): array<
  RegisterComponentType.component,
> => {
  data.getAllComponentsFunc(. data.state)
}

let getComponentData = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
  dataName: RegisterComponentType.dataName,
): Js.Nullable.t<IComponentForJs.dataValue> => {
  data.getComponentDataFunc(. data.state, component, dataName)
}

let getComponentGameObjects = (
  data: RegisterComponentType.usedComponentData,
  component: RegisterComponentType.component,
): array<IGameObjectForJs.gameObject> => {
  data.getGameObjectsFunc(. data.state, component)
}

let getState = (po: POType.po, componentName: IComponentForJs.componentName) => {
  po.componentData.allUsedComponentData
  ->WonderCommonlib.MutableHashMap.get(componentName)
  ->WonderCommonlib.OptionSt.map(({state}) => state)
}
