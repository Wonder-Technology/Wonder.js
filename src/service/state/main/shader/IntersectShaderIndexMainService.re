open StateDataMainType;

open ShaderType;

let getIntersectShaderIndexDataArray = (currentState, targetState) => {
  let {shaderIndexMap: currentShaderIndexMap} = currentState.shaderRecord;
  let {shaderIndexMap: targetShaderIndexMap} = targetState.shaderRecord;
  targetShaderIndexMap
  |> HashMapService.entries
  |> Js.Array.filter(
       ((key, _)) => currentShaderIndexMap |> WonderCommonlib.HashMapService.has(key)
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (dataArr, (key, shaderIndex)) => {
           dataArr
           |> Js.Array.push((
                currentShaderIndexMap |> WonderCommonlib.HashMapService.unsafeGet(key),
                shaderIndex
              ))
           |> ignore;
           dataArr
         }
       ),
       [||]
     )
};