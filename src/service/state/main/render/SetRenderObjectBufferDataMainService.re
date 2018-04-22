open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let setData =
    (
      renderArray,
      unsafeGetMaterialComponentFunc,
      {transformIndices, materialIndices, geometryIndices, sourceInstanceIndices, geometryTypes} as renderObjectRecord,
      {gameObjectRecord} as state
    ) => {
  let count = renderArray |> Js.Array.length;
  let (transformIndices, materialIndices, geometryIndices, sourceInstanceIndices, geometryTypes) =
    renderArray
    |> WonderCommonlib.ArrayService.reduceOneParami(
         [@bs]
         (
           (
             (
               transformIndices,
               materialIndices,
               geometryIndices,
               sourceInstanceIndices,
               geometryTypes
             ),
             uid,
             index
           ) => {
             let materialIndex = [@bs] unsafeGetMaterialComponentFunc(uid, gameObjectRecord);
             /* WonderLog.Log.print({j|set data->materialIndex: $materialIndex|j}) |> ignore; */
             let (geometryIndex, type_) =
               GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord);
             (
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord),
                 transformIndices
               ),
               setComponent(index, materialIndex, materialIndices),
               setComponent(index, geometryIndex, geometryIndices),
               switch (
                 [@bs]
                 GetComponentGameObjectService.getSourceInstanceComponent(uid, gameObjectRecord)
               ) {
               | None => sourceInstanceIndices
               | Some(sourceInstance) => setComponent(index, sourceInstance, sourceInstanceIndices)
               },
               TypeArrayService.setInt8_1(index, type_, geometryTypes)
             )
           }
         ),
         (transformIndices, materialIndices, geometryIndices, sourceInstanceIndices, geometryTypes)
       );
  Some({
    ...renderObjectRecord,
    count,
    transformIndices,
    materialIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes
  })
};