let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.basicCameraView,
> = () => {
  componentName: WonderComponentTypeBasiccameraview.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateBasicCameraViewUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddBasicCameraViewUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasBasicCameraViewUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetBasicCameraViewUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetBasicCameraViewDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetBasicCameraViewDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllBasicCameraViewsUtils.getAll(state)
  },
}
