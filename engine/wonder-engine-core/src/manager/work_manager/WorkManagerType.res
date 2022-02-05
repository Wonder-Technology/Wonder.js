type registeredWorkPlugin = IWorkForJs.registeredWorkPlugin<
  RegisterWorkPluginType.state,
  RegisterWorkPluginType.states,
>

type allRegisteredWorkPluginData = list<POType.registeredWorkPluginData>

type execFunc = IWorkForJs.execFunc<RegisterWorkPluginType.states>

type getExecFuncs = list<IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>

type jobOrder = {
  insertPluginName: IWorkForJs.pluginName,
  insertElementName: PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type specificPipelineRelatedData = {
  pluginName: IWorkForJs.pluginName,
  getExecFunc: IWorkForJs.getExecFunc<RegisterWorkPluginType.states>,
  pipelineData: PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type treeData = (list<TreeType.tree>, option<IWorkForJs.pluginName>)

type treeDataList = list<treeData>
