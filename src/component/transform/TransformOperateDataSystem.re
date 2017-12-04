open Js.Typed_array;

open TypeArrayUtils;

open TransformType;

open TransformHierachySystem;

open TransformDirtySystem;

open Matrix4System;

let getMatrix4DataIndex = (index: int) => index * getMatrix4DataSize();

let getVector3DataIndex = (index: int) => index * getVector3DataSize();

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

let rec update = (transform: transform, {localPositions, localToWorldMatrices} as data) =>
  switch (isDirty(transform, data)) {
  | false => data
  | true =>
    let data = mark(transform, false, data);
    let mat = fromTranslation(localPositions, getVector3DataIndex(transform));
    switch (getParent(transform, data)) {
    | Some(parent) =>
      update(parent, data) |> ignore;
      [@bs]
      setLocalToWorldMatricesTypeArr(
        transform,
        multiply(localToWorldMatrices, getMatrix4DataIndex(parent), mat, 0),
        localToWorldMatrices
      )
      |> ignore;
      data
    | None =>
      [@bs] setLocalToWorldMatricesTypeArr(transform, mat, localToWorldMatrices) |> ignore;
      data
    }
  };

let setPosition =
    (
      localPositionsIndex: int,
      parent: option(transform),
      position: position,
      {localToWorldMatrices, localPositions} as data
    ) =>
  switch parent {
  | None =>
    setFloat3(localPositionsIndex, TransformCastTypeSystem.tupleToJsArray(position), localPositions)
    |> ignore;
    data
  | Some(parent) =>
    update(parent, data) |> ignore;
    setFloat3(
      localPositionsIndex,
      TransformCastTypeSystem.tupleToJsArray(
        Vector3System.transformMat4(
          position,
          invert(getLocalToWorldMatrix(getMatrix4DataIndex(parent), localToWorldMatrices))
        )
      ),
      localPositions
    )
    |> ignore;
    data
  };

let getLocalPosition = (transform: transform, transformData) =>
  getFloat3(getVector3DataIndex(transform), transformData.localPositions);

let setLocalPosition = (transform: transform, localPosition: position, transformData) => {
  setFloat3(
    getVector3DataIndex(transform),
    TransformCastTypeSystem.tupleToJsArray(localPosition),
    transformData.localPositions
  )
  |> ignore;
  transformData
};