type insertAction = [#before | #after]

type jobOrder = {
  pipelineName: PipelineType.pipelineName,
  insertElementName: PipelineType.elementName,
  insertAction: insertAction,
}

@genType
type jobOrders = array<jobOrder>
