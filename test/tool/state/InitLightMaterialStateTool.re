open StateDataMainType;

open InitMaterialStateTool;

let createStateWithoutMaterialData = (state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (0, [||], Js.Typed_array.Uint32Array.make([||])),
      state
    ) :
    setRenderConfig(Obj.magic(1), state)
    |> CreateInitLightMaterialStateMainService.createInitMaterialState((
         0,
         [||],
         Js.Typed_array.Uint32Array.make([||])
       ));