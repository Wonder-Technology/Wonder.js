let createState = (state) =>
  RenderConfigTool.isRenderConfigRecordExist(state) ?
    CreateInitMaterialStateMainService.createInitMaterialState(state) :
    RenderConfigTool.setRenderConfig(Obj.magic(1), state)
    |> CreateInitMaterialStateMainService.createInitMaterialState;