let _convertJobOrders = (
  jobOrders: RegisterWorkPluginVOType.jobOrders,
): RegisterWorkPluginType.jobOrders => {
  jobOrders->WonderCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder,
  ): RegisterWorkPluginType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | #before => RegisterWorkPluginType.Before
    | #after => RegisterWorkPluginType.After
    },
  })
}

let registerWorkPlugin = (~data, ~jobOrders: RegisterWorkPluginVOType.jobOrders=[], ()) => {
  POContainer.unsafeGetPO()
  ->WorkManager.registerPlugin(data, jobOrders->_convertJobOrders)
  ->POContainer.setPO
}

let unregisterWorkPlugin = targetPluginName => {
  POContainer.unsafeGetPO()->WorkManager.unregisterPlugin(targetPluginName)->POContainer.setPO
}

let prepare = () => {
  let po = CreatePO.createPO()

  POContainer.setPO(po)
}

let init = () => {
  POContainer.unsafeGetPO()->WorkManager.init->POContainer.setPO
}

let runPipeline = (pipelineName: WonderEngineCoreType.PipelineType.pipelineName) => {
  POContainer.unsafeGetPO()
  ->WorkManager.runPipeline(pipelineName)
  ->WonderCommonlib.Result.mapSuccess(WonderBsMost.Most.map(POContainer.setPO, _))
  ->WonderCommonlib.Result.handleFail(WonderCommonlib.Exception.throwErr)
}

let getIsDebug = () => {
  PluginDataManager.getIsDebug()
}

let setIsDebug = isDebug => {
  PluginDataManager.setIsDebug(isDebug)
}

let registerComponent = data => {
  POContainer.unsafeGetPO()
  ->ComponentManager.registerComponent(data)
  ->WonderCommonlib.Result.mapSuccess(POContainer.setPO)
  ->WonderCommonlib.Result.handleFail(WonderCommonlib.Exception.throwErr)
}

let unregisterComponent = componentName => {
  POContainer.unsafeGetPO()->ComponentManager.unregisterComponent(componentName)->POContainer.setPO
}

let createAndSetComponentState = (componentName, config) => {
  POContainer.unsafeGetPO()
  ->ComponentManager.createAndSetComponentState(componentName, config)
  ->POContainer.setPO
}

let unsafeGetRelatedComponentData = componentName => {
  POContainer.unsafeGetPO()->ComponentManager.unsafeGetUsedComponentData(componentName)
}

let setRelatedComponentData = (data, componentName) => {
  POContainer.unsafeGetPO()
  ->ComponentManager.setRelatedComponentData(data, componentName)
  ->POContainer.setPO
}

let createComponent = data => {
  data->ComponentManager.createComponent
}

let setComponentData = (data, component, dataName, dataValue) => {
  data->ComponentManager.setComponentData(component, dataName, dataValue)
}

let addComponent = (data, gameObject, component) => {
  data->ComponentManager.addComponent(gameObject, component)
}

let hasComponent = (data, gameObject) => {
  data->ComponentManager.hasComponent(gameObject)
}

let getComponent = (data, gameObject) => {
  data->ComponentManager.getComponent(gameObject)
}

let getAllComponents = data => {
  data->ComponentManager.getAllComponents
}

let getComponentData = (data, component, dataName) => {
  data->ComponentManager.getComponentData(component, dataName)
}

let getComponentGameObjects = (data, component) => {
  data->ComponentManager.getComponentGameObjects(component)
}

let setGameObjectData = data => {
  POContainer.unsafeGetPO()->GameObjectManager.setGameObjectData(data)->POContainer.setPO
}

let createAndSetGameObjectState = () => {
  POContainer.unsafeGetPO()->GameObjectManager.createAndSetState->POContainer.setPO
}

let createGameObject = () => {
  let (po, gameObject) = POContainer.unsafeGetPO()->GameObjectManager.createGameObject

  po->POContainer.setPO

  gameObject
}

let getAllGameObjects = () => {
  POContainer.unsafeGetPO()->GameObjectManager.getAllGameObjects
}

let getState = (componentName: WonderEngineCoreType.IComponentForJs.componentName) => {
  POContainer.unsafeGetPO()
  ->ComponentManager.getState(componentName)
  ->WonderCommonlib.OptionSt.toNullable
}
