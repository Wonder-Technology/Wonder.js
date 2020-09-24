let getTexCoords = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().getTexCoords(
    geometry->GeometryEntity.value,
  )
  ->Result.mapSuccess(TexCoordsVO.create);
};

let setTexCoords = (geometry, texCoords) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect={j|texCoords in [0.0, 1.0]|j},
              ~actual={j|not|j},
            ),
            () => {
            texCoords
            ->TexCoordsVO.value
            ->TypeArrayCPRepoUtils.reduceFloat32Array(true, (. result, value) => {
                result && value >=. 0.0 && value <=. 1.0
              })
          })
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.bind(() => {
      DpContainer.unsafeGetGeometryRepoDp().setTexCoords(
        geometry->GeometryEntity.value,
        texCoords->TexCoordsVO.value,
      )
    });
};

let hasTexCoords = geometry => {
  DpContainer.unsafeGetGeometryRepoDp().hasTexCoords(
    geometry->GeometryEntity.value,
  );
};
