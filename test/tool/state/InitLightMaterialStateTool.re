open StateDataMainType;

open InitMaterialStateTool;

let createStateWithoutMaterialData = (state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (0, [||]),
      {
        ...state,
        lightMaterialRecord:
          Some({
            ...LightMaterialTool.getRecord(state),
            shaderIndices: Js.Typed_array.Uint32Array.make([||])
          })
      }
    ) :
    {
      let state = setRenderConfig(Obj.magic(1), state);
      CreateInitLightMaterialStateMainService.createInitMaterialState(
        (0, [||]),
        {
          ...state,
          lightMaterialRecord:
            Some({
              ...LightMaterialTool.getRecord(state),
              shaderIndices: Js.Typed_array.Uint32Array.make([||])
            })
        }
      )
    };