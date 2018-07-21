open StateDataMainType;

open RenderType;

open Js.Typed_array;

let execJob = ({gameObjectRecord, meshRendererRecord} as state) =>
  state
  |> SetRenderObjectBufferDataMainService.setData(
       RenderArrayMeshRendererService.getLightMaterialRenderArray(
         meshRendererRecord,
       ),
       GetComponentGameObjectService.unsafeGetLightMaterialComponent,
       state
       |> RecordRenderMainService.getRecord
       |> RecordLightRenderObjectMainService.getRecord,
     );