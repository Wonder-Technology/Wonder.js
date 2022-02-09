type jobOrder = {
  insertElementName: WonderEngineCoreType.PipelineType.elementName,
  insertAction: RegisterWorkPluginType.insertAction,
}

type nodeData = {
  mutable getExecFuncs: list<WonderEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
  mutable pipelineData: WonderEngineCoreType.PipelineType.pipelineData,
  jobOrder: option<jobOrder>,
}

type rec tree = Node(WonderEngineCoreType.IWorkForJs.pluginName, nodeData, list<tree>)
