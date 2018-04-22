open StateDataMainType;

open RenderType;

open Js.Typed_array;

let _getBasicMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = ({gameObjectRecord, meshRendererRecord} as state) =>{
  WonderLog.Log.print((
    "basicMaterialRenderArray:",

       state
       |> _getBasicMaterialRenderArray(
            meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
          )
  )) |> ignore;

  state
  |> SetRenderObjectBufferDataMainService.setData(
       state
       |> _getBasicMaterialRenderArray(
            meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
          ),
       (
         GetComponentGameObjectService.unsafeGetBasicMaterialComponent
       ),
       state |> RecordRenderMainService.getRecord |> RecordBasicRenderObjectMainService.getRecord
     );
}