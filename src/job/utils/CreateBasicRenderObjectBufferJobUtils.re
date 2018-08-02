open StateDataMainType;

open RenderType;

open Js.Typed_array;

let execJob = ({gameObjectRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       RenderArrayMeshRendererService.getBasicMaterialRenderArray(
         RecordMeshRendererMainService.getRecord(state),
       ),
       GetComponentGameObjectService.unsafeGetBasicMaterialComponent,
       state
       |> RecordRenderMainService.getRecord
       |> RecordBasicRenderObjectMainService.getRecord,
     );