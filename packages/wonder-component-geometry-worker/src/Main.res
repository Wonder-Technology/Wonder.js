let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  ConfigType.config,
  DataType.dataName,
  StateType.geometry,
> = () => {
  componentName: WonderComponentTypeGeometryWorker.Index.componentName,
  createStateFunc: (. {isDebug, geometryPointCount, geometryCount, buffer}: ConfigType.config) =>
    CreateStateUtils.createState(isDebug, geometryPointCount, geometryCount, buffer),
  createComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  hasComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getGameObjectsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetGeometryDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
}
