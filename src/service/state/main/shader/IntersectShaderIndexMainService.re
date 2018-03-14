open StateDataType;

open ShaderType;

let getIntersectShaderIndexDataArray = (currentState, targetState) => {
  let {shaderIndexMap: currentShaderIndexMap} = currentState.shaderRecord;
  let {shaderIndexMap: targetShaderIndexMap} = targetState.shaderRecord;
  targetShaderIndexMap
  |> HashMapSystem.entries
  |> Js.Array.filter(
       ((key, _)) => currentShaderIndexMap |> WonderCommonlib.HashMapSystem.has(key)
     )
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (dataArr, (key, shaderIndex)) => {
           dataArr
           |> Js.Array.push((
                currentShaderIndexMap |> WonderCommonlib.HashMapSystem.unsafeGet(key),
                shaderIndex
              ))
           |> ignore;
           dataArr
         }
       ),
       [||]
     )
};