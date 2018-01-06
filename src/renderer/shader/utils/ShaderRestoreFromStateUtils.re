let getIntersectShaderRelatedMap = (intersectShaderIndexDataArray, currentMap) =>
  intersectShaderIndexDataArray
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (intersectMap, (currentShaderIndex, targetShaderIndex)) => {
           intersectMap
           |> WonderCommonlib.SparseMapSystem.set(
                targetShaderIndex,
                currentMap |> WonderCommonlib.SparseMapSystem.unsafeGet(currentShaderIndex)
              );
           intersectMap
         }
       ),
       WonderCommonlib.SparseMapSystem.createEmpty()
     );