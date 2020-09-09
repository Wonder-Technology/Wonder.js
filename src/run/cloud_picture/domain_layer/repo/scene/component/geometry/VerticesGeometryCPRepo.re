open Js.Typed_array;

open ReallocatedPointsGeometryCPRepoUtils;

open TypeArrayCPRepoUtils;

open GeometryCPPOType;

let getVertices = index => {
  let {vertices, verticesInfos} = CPRepo.getExnGeometry();

  getFloat32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    vertices,
    verticesInfos,
  );
};

let setVertices = (index, data) => {
  let {verticesInfos, vertices, verticesOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setFloat32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(index),
      verticesInfos,
      verticesOffset,
      Float32Array.length(data),
    ),
    fillFloat32ArrayWithOffset(vertices, data),
  )
  ->Result.mapSuccess(verticesOffset => {
      CPRepo.setGeometry({...geometryPO, verticesOffset})
    });
};

let hasVertices = index => {
  let {verticesInfos} = CPRepo.getExnGeometry();

  hasPointData(BufferGeometryCPRepoUtils.getInfoIndex(index), verticesInfos);
};
