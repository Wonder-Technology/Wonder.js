open StateDataMainType;

open RenderType;

open Js.Typed_array;

let _getBasicMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (_, {gameObjectRecord, meshRendererRecord} as state) => {
  ...state,
  renderRecord:
    Some({
      ...RecordRenderMainService.getRecord(state),
      basicRenderObjectRecord:
        state
        |> SetRenderObjectBufferDataMainService.setData(
             state
             |> _getBasicMaterialRenderArray(
                  meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
                ),
             (
               GetComponentGameObjectService.unsafeGetBasicMaterialComponent,
               ShaderIndexBasicMaterialMainService.getShaderIndex
             ),
             state
             |> RecordRenderMainService.getRecord
             |> RecordBasicRenderObjectMainService.getRecord
           )
    })
};