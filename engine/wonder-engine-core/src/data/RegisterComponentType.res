@genType
type state

@genType
type component

@genType
type config

@genType
type dataName

type registeredComponent = IComponentForJs.registeredComponent<state, config, dataName, component>

@genType
type usedComponentData = {
  componentName: IComponentForJs.componentName,
  mutable state: state,
  createComponentFunc: IComponentForJs.createComponentFunc<state, component>,
  getGameObjectsFunc: IComponentForJs.getGameObjectsFunc<state, component>,
  addComponentFunc: IComponentForJs.addComponentFunc<state, component>,
  hasComponentFunc: IComponentForJs.hasComponentFunc<state>,
  getComponentFunc: IComponentForJs.getComponentFunc<state, component>,
  getAllComponentsFunc: IComponentForJs.getAllComponentsFunc<state, component>,
  getComponentDataFunc: IComponentForJs.getComponentDataFunc<state, dataName, component>,
  setComponentDataFunc: IComponentForJs.setComponentDataFunc<state, dataName, component>,
}

type componentData = {
  allRegisteredComponentData: WonderCommonlib.ImmutableHashMap.t<
    IComponentForJs.componentName,
    registeredComponent,
  >,
  allUsedComponentData: WonderCommonlib.MutableHashMap.t<
    IComponentForJs.componentName,
    usedComponentData,
  >,
}
