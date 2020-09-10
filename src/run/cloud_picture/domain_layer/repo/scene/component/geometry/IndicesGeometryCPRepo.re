open Js.Typed_array;

open ReallocatedPointsGeometryCPRepoUtils;

open TypeArrayCPRepoUtils;

open GeometryCPPOType;

let getIndices = index => {
  let {indices, indicesInfos} = CPRepo.getExnGeometry();

  getUint32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    indices,
    indicesInfos,
  );
};

let setIndices = (index, data) => {
  let {indicesInfos, indices, indicesOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setUint32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(index),
      indicesInfos,
      indicesOffset,
      Uint32Array.length(data),
    ),
    fillUint32ArrayWithOffset(indices, data),
  )
  ->Result.mapSuccess(indicesOffset => {
      CPRepo.setGeometry({...geometryPO, indicesOffset})
    });
};

let hasIndices = index => {
  ReallocatedPointsGeometryCPRepoUtils.hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    CPRepo.getExnGeometry().indicesInfos,
  );
};

let getIndicesCount = index => {
  getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    CPRepo.getExnGeometry().indicesInfos,
  )
  ->Result.mapSuccess(((startIndex, endIndex)) => {endIndex - startIndex});
};
