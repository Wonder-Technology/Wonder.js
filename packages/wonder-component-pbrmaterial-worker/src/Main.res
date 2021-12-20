let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  ConfigType.config,
  DataType.dataName,
  StateType.pbrMaterial,
> = () => {
  componentName: WonderComponentTypePbrmaterialWorker.Index.componentName,
  createStateFunc: (. {isDebug, pbrMaterialCount, buffer}: ConfigType.config) =>
    CreateStateUtils.createState(isDebug, pbrMaterialCount, buffer),
  createComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.createComponentFunc,
  addComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.addComponentFunc,
  hasComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.hasComponentFunc,
  getComponentFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getComponentFunc,
  getGameObjectsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getGameObjectsFunc,
  getComponentDataFunc: (. state, component, dataName) => {
    GetPBRMaterialDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.setComponentDataFunc,
  getAllComponentsFunc: WonderComponentWorkerUtils.DefaultGetDataUtils.getAllComponentsFunc,
}
