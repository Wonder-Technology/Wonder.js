open StateDataMainType;

open InitMaterialStateTool;

let getRecord = (state) => RecordBasicMaterialMainService.getRecord(state);

let createStateWithoutMaterialData = (state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitBasicMaterialStateMainService.createInitMaterialState(
      (0, [||]),
      {
        ...state,
        basicMaterialRecord:
          Some({...getRecord(state), shaderIndices: Js.Typed_array.Uint32Array.make([||])})
      }
    ) :
    {
      let state = setRenderConfig(Obj.magic(1), state);
      CreateInitBasicMaterialStateMainService.createInitMaterialState(
        (0, [||]),
        {
          ...state,
          basicMaterialRecord:
            Some({...getRecord(state), shaderIndices: Js.Typed_array.Uint32Array.make([||])})
        }
      )
    };