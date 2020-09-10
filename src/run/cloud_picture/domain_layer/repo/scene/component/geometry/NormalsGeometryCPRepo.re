open Js.Typed_array;

open ReallocatedPointsGeometryCPRepoUtils;

open TypeArrayCPRepoUtils;

open GeometryCPPOType;

let getNormals = index => {
  let {normals, normalsInfos} = CPRepo.getExnGeometry();

  getFloat32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    normals,
    normalsInfos,
  );
};

let setNormals = (index, data) => {
  let {normalsInfos, normals, normalsOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setFloat32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(index),
      normalsInfos,
      normalsOffset,
      Float32Array.length(data),
    ),
    fillFloat32ArrayWithOffset(normals, data),
  )
  ->Result.mapSuccess(normalsOffset => {
      CPRepo.setGeometry({...geometryPO, normalsOffset})
    });
};

let hasNormals = index => {
  let {normalsInfos} = CPRepo.getExnGeometry();

  hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    normalsInfos,
  );
};
