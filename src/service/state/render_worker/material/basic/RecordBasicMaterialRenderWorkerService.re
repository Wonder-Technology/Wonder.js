open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let getRecord = ({basicMaterialRecord}) => basicMaterialRecord |> OptionService.unsafeGet;

let unsafeGetShaderIndices = (state) => getRecord(state).shaderIndices |> OptionService.unsafeGet;

/* TODO finish! */
let unsafeGetMapUnits = (state) => Obj.magic(1);
/* let unsafeGetMapUnits = (state) => getRecord(state).mapUnits |> OptionService.unsafeGet; */