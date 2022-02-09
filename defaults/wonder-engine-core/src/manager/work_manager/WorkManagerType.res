type registeredWorkPlugin = WonderEngineCoreType.IWorkForJs.registeredWorkPlugin<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginData = list<POType.registeredWorkPluginData>

type execFunc = WonderEngineCoreType.IWorkForJs.execFunc<RegisterWorkPluginType.states>

type getExecFuncs = list<WonderEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: WonderEngineCoreType.IWorkForJs.pluginName,
  insertElementName: WonderEngineCoreType.PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  pluginName: WonderEngineCoreType.IWorkForJs.pluginName,
  getExecFunc: WonderEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>,
  pipelineData: WonderEngineCoreType.PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<WonderEngineCoreType.IWorkForJs.pluginName>)

type treeDataList = list<treeData>
