let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.directionLight,
> = () => {
  componentName: WonderComponentTypeDirectionlight.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount}) =>
    CreateStateUtils.createState(isDebug, directionLightCount),
  createComponentFunc: (. state) => CreateDirectionLightUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddDirectionLightUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasDirectionLightUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetDirectionLightUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetDirectionLightDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetDirectionLightDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllDirectionLightsUtils.getAll(state)
  },
}
