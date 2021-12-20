let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.perspectiveCameraProjection,
> = () => {
  componentName: WonderComponentTypePerspectivecameraprojection.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreatePerspectiveCameraProjectionUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddPerspectiveCameraProjectionUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPerspectiveCameraProjectionUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPerspectiveCameraProjectionUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetPerspectiveCameraProjectionDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetPerspectiveCameraProjectionDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPerspectiveCameraProjectionsUtils.getAll(state)
  },
}
