let _convertToGeometry =
    ({primitives}: GLTFType.mesh)
    : option(WDType.geometry) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not has texCoord_1|j},
                ~actual={j|has|j},
              ),
              () => {
                let {attributes, indices}: GLTFType.primitive =
                  ConvertCommon.getPrimitiveData(primitives);
                attributes.texCoord_1 |> assertNotExist;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  primitives |> Js.Array.length > 1 ?
    None :
    {
      let {attributes, indices}: GLTFType.primitive =
        ConvertCommon.getPrimitiveData(primitives);
      let {position, normal, texCoord_0}: GLTFType.attributes = attributes;
      Some({
        position,
        normal,
        texCoord: texCoord_0,
        index: indices |> OptionService.unsafeGet,
      });
    };
};

let convertToGeometrys = ({meshes}: GLTFType.gltf) =>
  meshes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, mesh) => arr |> ArrayService.push(_convertToGeometry(mesh)),
       [||],
     );