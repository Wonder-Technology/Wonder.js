open StateDataMainType;

open SourceInstanceType;

let _isNeedObjectInstanceTransformArrayMapForRender =
    (sourceInstance, {isTransformStaticMap, isSendTransformMatrixDataMap}) =>
  ! StaticSourceInstanceService.isTransformStatic(sourceInstance, isTransformStaticMap)
  || !StaticSourceInstanceService.isSendTransformMatrixData(
       sourceInstance,
       isSendTransformMatrixDataMap
     );

let filterOnlyNeedObjectInstanceTransformArrayMapForRender =
    (objectInstanceTransformArrayMap, sourceInstanceRecord) =>
  objectInstanceTransformArrayMap
  |> SparseMapService.reduceiValid(
       [@bs]
       (
         (resultObjectInstanceTransformArrayMap, objectInstanceTransformArray, sourceInstance) =>
           _isNeedObjectInstanceTransformArrayMapForRender(sourceInstance, sourceInstanceRecord) ?
             resultObjectInstanceTransformArrayMap
             |> WonderCommonlib.SparseMapService.set(sourceInstance, objectInstanceTransformArray) :
             resultObjectInstanceTransformArrayMap
       ),
       WonderCommonlib.SparseMapService.createEmpty()
     );