let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.transform,
> = () => {
  componentName: WonderComponentTypeTransform.Index.componentName,
  createStateFunc: (. {isDebug, transformCount, float9Array1, float32Array1}) =>
    CreateStateUtils.createState(isDebug, transformCount, float9Array1, float32Array1),
  createComponentFunc: (. state) => CreateTransformUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddTransformUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasTransformUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetTransformUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetTransformDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetTransformDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllTransformsUtils.getAll(state)
  },
}
