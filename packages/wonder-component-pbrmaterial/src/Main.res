let getData: WonderCore.IComponentForJs.getComponentData<
  StateType.state,
  StateType.config,
  DataType.dataName,
  StateType.pbrMaterial,
> = () => {
  componentName: WonderComponentTypePbrmaterial.Index.componentName,
  createStateFunc: (. {isDebug, pbrMaterialCount}) =>
    CreateStateUtils.createState(isDebug, pbrMaterialCount),
  createComponentFunc: (. state) => CreatePBRMaterialUtils.create(state),
  addComponentFunc: (. state, gameObject, component) => {
    AddPBRMaterialUtils.add(state, gameObject, component)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasPBRMaterialUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetPBRMaterialUtils.get(state, gameObject)
  },
  getGameObjectsFunc: (. state, component) => {
    GetGameObjectsUtils.get(state, component)
  },
  getComponentDataFunc: (. state, component, dataName) => {
    GetPBRMaterialDataUtils.getData(. state, component, dataName)
  },
  setComponentDataFunc: (. state, component, dataName, dataValue) => {
    SetPBRMaterialDataUtils.setData(. state, component, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllPBRMaterialsUtils.getAll(state)
  },
}
