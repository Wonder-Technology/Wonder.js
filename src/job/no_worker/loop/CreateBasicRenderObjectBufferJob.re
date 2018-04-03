open MainStateDataType;

open RenderType;

open Js.Typed_array;

let _getBasicMaterialRenderArray = (renderArray, state: MainStateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (_, _, {gameObjectRecord, meshRendererRecord} as state) => {
  ...state,
  renderRecord: {
    ...state.renderRecord,
    basicRenderObjectRecord:
      state
      |> CreateRenderObjectBufferMainService.create(
           state
           |> _getBasicMaterialRenderArray(
                meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
              ),
           (
             GetComponentGameObjectService.unsafeGetBasicMaterialComponent,
             ShaderIndexBasicMaterialMainService.getShaderIndex
           )
         )
  }
};