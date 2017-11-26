open Js.Typed_array;

open StateDataType;

open TypeArrayUtils;

open TransformType;

let getMatrix4DataIndex = (index: int) => index * getMatrix4DataSize();

let getVector3DataIndex = (index: int) => index * getVector3DataSize();

/* let setLocalPositionTypeArr =
   [@bs]
   (
     (index: int, position: Js.Array.t(float), localPositions: Float32Array.t) =>
       setFloat3(getVector3DataIndex(index), position, localPositions)
   ); */
let setLocalToWorldMatricesTypeArr =
  [@bs]
  (
    (index: int, mat: Js.Array.t(float), localToWorldMatrices: Float32Array.t) =>
      setFloat16(getMatrix4DataIndex(index), mat, localToWorldMatrices)
  );

let getLocalToWorldMatrix = (index: int, localToWorldMatrices) =>
  getFloat32ArrSubarray(
    localToWorldMatrices,
    getMatrix4DataIndex(index),
    getMatrix4DataIndex(index) + 16
  );

let setPosition =
    (
      localPositionsIndex: int,
      parent: option(transform),
      position: position,
      {localToWorldMatrices, localPositions}
    ) =>
  switch parent {
  | None =>
    setFloat3(localPositionsIndex, TransformCastTypeUtils.tupleToJsArray(position), localPositions)
  | Some(parent) =>
    setFloat3(
      localPositionsIndex,
      TransformCastTypeUtils.tupleToJsArray(
        Vector3System.transformMat4(
          position,
          Matrix4System.invert(
            getLocalToWorldMatrix(getMatrix4DataIndex(parent), localToWorldMatrices)
          )
        )
      ),
      localPositions
    )
  };

/* let isTransform = (transform: transform, isTransformMap) =>
     switch (isTransformMap |> SparseMapSystem.get((transform))) {
     | None => false
     | Some(isTransform) => isTransform == true
     };

   let markIsTransform = (transform: transform, isTransformMap) => {
     isTransformMap |> SparseMapSystem.set((transform), true) |> ignore;
     ()
   };

   let cleanIsTransformMap = (state:StateDataType.state) => {
    TransformStateUtils.getTransformData(state).isTransformMap = SparseMapSystem.createEmpty();
     state;
   }; */
let getLocalPosition = (transform: transform, transformData) =>
  getFloat3(getVector3DataIndex(transform), transformData.localPositions);

let setLocalPosition = (transform: transform, localPosition: position, transformData) => {
  /* let transformData = getTransformData(state); */
  setFloat3(
    getVector3DataIndex(transform),
    TransformCastTypeUtils.tupleToJsArray(localPosition),
    transformData.localPositions
  )
  |> ignore;
  /* addItAndItsChildrenToDirtyArray(transform, transformData) |> ignore; */
  /* state */
  transformData
};