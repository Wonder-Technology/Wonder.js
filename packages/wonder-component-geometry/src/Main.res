let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.geometry,
> = () => {
  componentName: WonderComponentTypeGeometry.Index.componentName,
  createStateFunc: (. {isDebug, geometryPointCount, geometryCount}) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount),
  createComponentFunc: (. state) => CreateGeometryUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddGeometryUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasGeometryUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetGeometryUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetGeometryDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetGeometryDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllGeometrysUtils.getAll(state)
  },
}
