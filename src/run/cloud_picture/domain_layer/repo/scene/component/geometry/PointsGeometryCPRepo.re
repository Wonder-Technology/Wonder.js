open GeometryCPPOType;

let getVertexInfo = index => {
  let {verticesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    verticesInfos,
  )
  ->Result.bind(((startIndex, endIndex)) => {
      (startIndex, endIndex)
      ->Contract.ensureCheck(
          ((startIndex, endIndex)) => {
            open Contract;
            open Operators;

            test(
              Log.buildAssertMessage(
                ~expect={j|equal to the info get from normals|j},
                ~actual={j|not equal|j},
              ),
              () => {
                let {normalsInfos} = CPRepo.getExnGeometry();

                let (startIndexGetFromNormals, endIndexGetFromNormals) =
                  ReallocatedPointsGeometryCPRepoUtils.getInfo(
                    BufferGeometryCPRepoUtils.getInfoIndex(index),
                    normalsInfos,
                  )
                  ->Result.getExn;

                startIndex == startIndexGetFromNormals
                && endIndex == endIndexGetFromNormals;
              },
            );
            test(
              Log.buildAssertMessage(
                ~expect={j|startIndex:$startIndex is 3 times|j},
                ~actual={j|not|j},
              ),
              () => {
                let x = Number.dividInt(startIndex, 3);

                x -. x->Js.Math.floor_float ==. 0.0;
              },
            );
          },
          OtherConfigDpRunAPI.unsafeGet().getIsDebug(),
        )
    });
};

let getIndexInfo = index => {
  let {indicesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(index),
    indicesInfos,
  );
};

let _getVerticesTypeArr = () => {
  CPRepo.getExnGeometry().vertices;
};

let _getTexCoordsTypeArr = () => {
  CPRepo.getExnGeometry().texCoords;
};

let _getNormalsTypeArr = () => {
  CPRepo.getExnGeometry().normals;
};

let _getTangentsTypeArr = () => {
  CPRepo.getExnGeometry().tangents;
};

let _getIndicesTypeArr = () => {
  CPRepo.getExnGeometry().indices;
};

let getVerticesOffset = () => {
  CPRepo.getExnGeometry().verticesOffset;
};

let getVertexCount = () => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          test(
            Log.buildAssertMessage(
              ~expect={j|verticesOffset be 3 times|j},
              ~actual={j|not|j},
            ),
            () => {
              let x = Number.dividInt(getVerticesOffset(), 3);

              x -. x->Js.Math.floor_float ==. 0.0;
            },
          )
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {getVerticesOffset() / 3});
};

let _getTexCoordsOffset = () => {
  CPRepo.getExnGeometry().texCoordsOffset;
};

let getNormalsOffset = () => {
  CPRepo.getExnGeometry().normalsOffset;
};

let _getTangentsOffset = () => {
  CPRepo.getExnGeometry().tangentsOffset;
};

let _getIndicesOffset = () => {
  CPRepo.getExnGeometry().indicesOffset;
};

let getSubUsedVerticesTypeArr = () => {
  Js.Typed_array.Float32Array.subarray(
    ~start=0,
    ~end_=getVerticesOffset(),
    _getVerticesTypeArr(),
  );
};

let getSubUsedTexCoordsTypeArr = () => {
  Js.Typed_array.Float32Array.subarray(
    ~start=0,
    ~end_=_getTexCoordsOffset(),
    _getTexCoordsTypeArr(),
  );
};

let getSubUsedNormalsTypeArr = () => {
  Js.Typed_array.Float32Array.subarray(
    ~start=0,
    ~end_=getNormalsOffset(),
    _getNormalsTypeArr(),
  );
};

let getSubUsedTangentsTypeArr = () => {
  Js.Typed_array.Float32Array.subarray(
    ~start=0,
    ~end_=_getTangentsOffset(),
    _getTangentsTypeArr(),
  );
};

let getSubUsedIndicesTypeArr = () => {
  Js.Typed_array.Uint32Array.subarray(
    ~start=0,
    ~end_=_getIndicesOffset(),
    _getIndicesTypeArr(),
  );
};

let getCopyUsedIndicesTypeArr = () => {
  Js.Typed_array.Uint32Array.slice(
    ~start=0,
    ~end_=_getIndicesOffset(),
    _getIndicesTypeArr(),
  );
};
