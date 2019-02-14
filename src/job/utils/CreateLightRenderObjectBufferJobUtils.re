open StateDataMainType;

open RenderType;

open Js.Typed_array;

let execJob = ({gameObjectRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       RenderArrayMeshRendererService.getLightMaterialRenderGameObjectArray(
         RecordMeshRendererMainService.getRecord(state),
       ),
       GetComponentGameObjectService.unsafeGetLightMaterialComponent,
       state
       |> RecordRenderMainService.getRecord
       |> RecordLightRenderObjectMainService.getRecord,
     );