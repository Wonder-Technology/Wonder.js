open StateDataMainType;

open RenderType;

open Js.Typed_array;

let execJob = ({gameObjectRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       RenderArrayMeshRendererService.getLightMaterialRenderArray(
         RecordMeshRendererMainService.getRecord(state),
       ),
       GetComponentGameObjectService.unsafeGetLightMaterialComponent,
       state
       |> RecordRenderMainService.getRecord
       |> RecordLightRenderObjectMainService.getRecord,
     );