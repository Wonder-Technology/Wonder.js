let convertJobOrdersDOToVO = jobOrders => {
  jobOrders->WonderCommonlib.ArraySt.map((
    {pipelineName, insertElementName, insertAction} as jobOrder: RegisterWorkPluginType.jobOrder,
  ): RegisterWorkPluginVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: switch insertAction {
    | RegisterWorkPluginType.Before => #before
    | RegisterWorkPluginType.After => #after
    },
  })
}
