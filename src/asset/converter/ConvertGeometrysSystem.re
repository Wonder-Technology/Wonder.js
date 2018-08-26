let _buildDefaultName = geometryIndex =>
  ConvertCommon.buildDefaultName("geometry", geometryIndex);

let _convertToGeometry =
    ({primitives, name}: GLTFType.mesh, index)
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
        name:
          switch (name) {
          | None => _buildDefaultName(index)
          | Some(name) => name
          },
        position,
        normal,
        texCoord: texCoord_0,
        index: indices |> OptionService.unsafeGet,
      });
    };
};

let convertToGeometrys = ({meshes}: GLTFType.gltf) =>
  meshes
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. arr, mesh, index) =>
         arr |> ArrayService.push(_convertToGeometry(mesh, index)),
       [||],
     );