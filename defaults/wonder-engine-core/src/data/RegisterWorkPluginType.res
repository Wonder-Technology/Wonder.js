type state

type states = WonderCommonlib.ImmutableHashMap.t<WonderEngineCoreType.IWorkForJs.pluginName, state>

type config

type insertAction =
  | Before
  | After

type jobOrder = {
  pipelineName: WonderEngineCoreType.PipelineType.pipelineName,
  insertElementName: WonderEngineCoreType.PipelineType.elementName,
  insertAction: insertAction,
}

type jobOrders = array<jobOrder>
