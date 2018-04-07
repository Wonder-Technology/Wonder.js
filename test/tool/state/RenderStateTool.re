let createState = (state) =>
  RenderRecordTool.isCameraRecordExist(state) ?
    CreateRenderStateMainService.createRenderState(state) :
    RenderRecordTool.setCameraRecord(Obj.magic(1), state)
    |> CreateRenderStateMainService.createRenderState;