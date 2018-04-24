
let getIntersectShaderRelatedMap = (intersectShaderIndexDataArray, currentMap) =>
  intersectShaderIndexDataArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (intersectMap, (currentShaderIndex, targetShaderIndex)) => {
           intersectMap
           |> WonderCommonlib.SparseMapService.set(
                targetShaderIndex,
                currentMap |> WonderCommonlib.SparseMapService.unsafeGet(currentShaderIndex)
              );
           intersectMap
         }
       ),
       WonderCommonlib.SparseMapService.createEmpty()
     );