open StateDataMainType;

open InitMaterialStateTool;

let createStateWithoutMaterialData = (state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitBasicMaterialStateMainService.createInitMaterialState(
      (0, [||], Js.Typed_array.Uint32Array.make([||])),
      state
    ) :
    setRenderConfig(Obj.magic(1), state)
    |> CreateInitBasicMaterialStateMainService.createInitMaterialState((
         0,
         [||],
         Js.Typed_array.Uint32Array.make([||])
       ));