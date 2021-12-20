let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.arcballCameraController,
> = () => {
  componentName: WonderComponentTypeArcballcameracontroller.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateArcballCameraControllerUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddArcballCameraControllerUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasArcballCameraControllerUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetArcballCameraControllerUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetArcballCameraControllerDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetArcballCameraControllerDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllArcballCameraControllersUtils.getAll(state)
  },
}
