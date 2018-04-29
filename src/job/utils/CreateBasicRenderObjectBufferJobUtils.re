open StateDataMainType;

open RenderType;

open Js.Typed_array;

let execJob = ({gameObjectRecord, meshRendererRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       RenderArrayMeshRendererService.getBasicMaterialRenderArray(meshRendererRecord),
       GetComponentGameObjectService.unsafeGetBasicMaterialComponent,
       state |> RecordRenderMainService.getRecord |> RecordBasicRenderObjectMainService.getRecord
     );