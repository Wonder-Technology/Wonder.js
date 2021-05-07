let _buildDefaultName = geometryIndex =>
  ConvertCommon.buildDefaultGeometryName(geometryIndex);

let _convertToGeometry = (mesh, index): option(WDType.geometry) => {
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
              () =>
              !ArrayService.isNotValid(mesh) ?
                {
                  let {primitives}: GLTFType.mesh = mesh;

                  let {attributes, indices}: GLTFType.primitive =
                    ConvertCommon.getPrimitiveData(primitives);
                  attributes.texCoord_1 |> assertNotExist;
                } :
                assertPass()
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  ArrayService.isNotValid(mesh) ?
    None :
    {
      /* ConvertMultiPrimitivesSystem.isMultiPrimitives(primitives) ?
         None : */


      let {primitives, name}: GLTFType.mesh = mesh;

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
        index: indices,
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
