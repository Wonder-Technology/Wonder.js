@genType
type state

@genType
type component

@genType
type config

@genType
type dataName

type registeredComponent = WonderEngineCoreType.IComponentForJs.registeredComponent<
  state,
  config,
  dataName,
  component,
>

@genType
type usedComponentData = {
  componentName: WonderEngineCoreType.IComponentForJs.componentName,
  mutable state: state,
  createComponentFunc: WonderEngineCoreType.IComponentForJs.createComponentFunc<state, component>,
  getGameObjectsFunc: WonderEngineCoreType.IComponentForJs.getGameObjectsFunc<state, component>,
  addComponentFunc: WonderEngineCoreType.IComponentForJs.addComponentFunc<state, component>,
  hasComponentFunc: WonderEngineCoreType.IComponentForJs.hasComponentFunc<state>,
  getComponentFunc: WonderEngineCoreType.IComponentForJs.getComponentFunc<state, component>,
  getAllComponentsFunc: WonderEngineCoreType.IComponentForJs.getAllComponentsFunc<state, component>,
  getComponentDataFunc: WonderEngineCoreType.IComponentForJs.getComponentDataFunc<
    state,
    dataName,
    component,
  >,
  setComponentDataFunc: WonderEngineCoreType.IComponentForJs.setComponentDataFunc<
    state,
    dataName,
    component,
  >,
}

type componentData = {
  allRegisteredComponentData: WonderCommonlib.ImmutableHashMap.t<
    WonderEngineCoreType.IComponentForJs.componentName,
    registeredComponent,
  >,
  allUsedComponentData: WonderCommonlib.MutableHashMap.t<
    WonderEngineCoreType.IComponentForJs.componentName,
    usedComponentData,
  >,
}
