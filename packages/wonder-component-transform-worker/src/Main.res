let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  ConfigType.config,
  DataType.dataName,
  StateType.transform,
> = () => {
  componentName: WonderComponentTypeTransformWorker.Index.componentName,
  createStateFunc: (. {isDebug, transformCount, buffer}: ConfigType.config) =>
    CreateStateUtils.createState(isDebug, transformCount, buffer),
  createComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  hasComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getGameObjectsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetTransformDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
}
