open StateDataMainType;

let isRenderConfigRecordExist = (state) => state.renderConfigRecord |> Js.Option.isSome;

let setRenderConfig = (renderConfig, state) => {...state, renderConfigRecord: Some(renderConfig)};

let createState = ((index, disposedIndexArray, shaderIndices), state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray, shaderIndices),
      state
    ) :
    setRenderConfig(Obj.magic(1), state)
    |> CreateInitMaterialStateMainService.createInitMaterialState((
         index,
         disposedIndexArray,
         shaderIndices
       ));

let createStateWithoutMaterialData = (state) =>
  isRenderConfigRecordExist(state) ?
    CreateInitMaterialStateMainService.createInitMaterialState(
      (0, [||], Js.Typed_array.Uint32Array.make([||])),
      state
    ) :
    setRenderConfig(Obj.magic(1), state)
    |> CreateInitMaterialStateMainService.createInitMaterialState((
         0,
         [||],
         Js.Typed_array.Uint32Array.make([||])
       ));