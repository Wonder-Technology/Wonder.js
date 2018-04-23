open StateDataMainType;

open RenderType;

open Js.Typed_array;

let _getLightMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasLightMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = ({gameObjectRecord, meshRendererRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       state
       |> _getLightMaterialRenderArray(
            meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
          ),
       GetComponentGameObjectService.unsafeGetLightMaterialComponent,
       state |> RecordRenderMainService.getRecord |> RecordLightRenderObjectMainService.getRecord
     );