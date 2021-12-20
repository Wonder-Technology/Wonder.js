let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  ConfigType.config,
  DataType.dataName,
  StateType.directionLight,
> = () => {
  componentName: WonderComponentTypeDirectionlightWorker.Index.componentName,
  createStateFunc: (. {isDebug, directionLightCount, buffer}: ConfigType.config) =>
    CreateStateUtils.createState(isDebug, directionLightCount, buffer),
  createComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  hasComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getGameObjectsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetDirectionLightDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
}
