open ShaderType;

let getShaderIndex = (key: string, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapService.get(key);

let setShaderIndex = (key: string, shaderIndex: int, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapService.set(key, shaderIndex);

let genereateShaderIndex = ({index} as record) => {
  record.index = succ(index);
  index
  |> WonderLog.Contract.ensureCheck(
       r => {
         open WonderLog;
         open Contract;
         open Operators;
         let defaultShaderIndex =
           DefaultTypeArrayValueService.getDefaultShaderIndex();
         test(
           Log.buildAssertMessage(
             ~expect={j|not equal default shader index:$defaultShaderIndex |j},
             ~actual={j|equal|j},
           ),
           () =>
           r <>= defaultShaderIndex
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};

let useShaderIndex = (shaderIndex, {usedShaderIndexArray} as record) => {
  usedShaderIndexArray |> ArrayService.push(shaderIndex) |> ignore;

  record;
};

let _hasMaterialUseShader = (shaderIndex, material, materialsMap) =>
  switch (WonderCommonlib.SparseMapService.get(shaderIndex, materialsMap)) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let unuseShaderIndex =
    (shaderIndex, material, {materialsMap, usedShaderIndexArray} as record) => {
  ArrayMapService.removeValue(shaderIndex, material, materialsMap) |> ignore;

  _hasMaterialUseShader(shaderIndex, material, materialsMap) ?
    record :
    {
      let index = Js.Array.indexOf(shaderIndex, usedShaderIndexArray);

      index === (-1) ?
        record :
        {
          usedShaderIndexArray
          |> Js.Array.removeCountInPlace(~pos=index, ~count=1);

          record;
        };
    };
};

let clearShaderIndexMap = shaderRecord => {
  shaderRecord.shaderIndexMap = WonderCommonlib.HashMapService.createEmpty();

  shaderRecord;
};