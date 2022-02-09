type insertAction = [#before | #after]

type jobOrder = {
  pipelineName: WonderEngineCoreType.PipelineType.pipelineName,
  insertElementName: WonderEngineCoreType.PipelineType.elementName,
  insertAction: insertAction,
}

@genType
type jobOrders = array<jobOrder>
