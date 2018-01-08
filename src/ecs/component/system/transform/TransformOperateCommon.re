open Js.Typed_array;

open TypeArrayUtils;

open TransformType;

open TransformHierachyCommon;

open TransformDirtyCommon;

open TransformStateCommon;

open Matrix4System;

open Contract;

let getLocalToWorldMatrixTypeArray = (transform: transform, localToWorlMatrixMap) =>
  localToWorlMatrixMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "localToWorldMatrix should exist",
             () =>
               localToWorlMatrixMap
               |> WonderCommonlib.SparseMapSystem.get(transform)
               |> assertExist
           )
         )
     );

/* let setLocalToWorldMatrix =
       (transform: transform, matTypeArr: Float32Array.t, localToWorldMatrixMap) => {
     localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.set(transform, matTypeArr)|>ignore;
     localToWorldMatrixMap
   }; */
let getLocalPositionTypeArray = (transform: transform, localPositionMap) =>
  localPositionMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "localPositionshould exist",
             () =>
               localPositionMap |> WonderCommonlib.SparseMapSystem.get(transform) |> assertExist
           )
         )
     );

let getLocalPositionTuple = (transform: transform, localPositionMap) => {
  let typeArr = getLocalPositionTypeArray(transform, localPositionMap);
  (
    Float32Array.unsafe_get(typeArr, 0),
    Float32Array.unsafe_get(typeArr, 1),
    Float32Array.unsafe_get(typeArr, 2)
  )
};

let setLocalPositionByTypeArray =
    (transform: transform, positionTypeArr: Float32Array.t, {localPositionMap} as data) => {
  localPositionMap |> WonderCommonlib.SparseMapSystem.set(transform, positionTypeArr) |> ignore;
  data
};

let setLocalPositionByTuple = (transform: transform, (x, y, z), {localPositionMap} as data) => {
  let typeArr = getLocalPositionTypeArray(transform, localPositionMap);
  Float32Array.unsafe_set(typeArr, 0, x);
  Float32Array.unsafe_set(typeArr, 1, y);
  Float32Array.unsafe_set(typeArr, 2, z);
  data
};

let _getLocalToWorldMatrixFloat32Array = (transform: transform, localToWorldMatrixFloat32ArrayMap) =>
  localToWorldMatrixFloat32ArrayMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "localToWorldMatrixFloat32Array should exist",
             () =>
               localToWorldMatrixFloat32ArrayMap
               |> WonderCommonlib.SparseMapSystem.get(transform)
               |> assertExist
           )
         )
     );

let rec update = (transform: transform, state: StateDataType.state) => {
  let {localToWorldMatrixMap, localPositionMap} as data = getTransformData(state);
  switch (isDirty(transform, data)) {
  | false => state
  | true =>
    mark(transform, false, data) |> ignore;
    switch (getParent(transform, data)) {
    | Some(parent) =>
      let state = update(parent, state);
      multiply(
        getLocalToWorldMatrixTypeArray(parent, localToWorldMatrixMap),
        fromTranslation(
          getLocalPositionTypeArray(transform, localPositionMap),
          GlobalTempSystem.getFloat32Array1(state)
        ),
        getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
      )
      |> ignore;
      state
    | None =>
      fromTranslation(
        getLocalPositionTypeArray(transform, localPositionMap),
        getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap)
      )
      |> ignore;
      state
    }
  }
};

let _getPosition = (transform: transform, getTranslationFunc, state: StateDataType.state) => {
  open Js.Typed_array;
  let {localToWorldMatrixMap} = update(transform, state) |> getTransformData;
  getLocalToWorldMatrixTypeArray(transform, localToWorldMatrixMap) |> getTranslationFunc
};

let getPositionTypeArray = (transform: transform, state: StateDataType.state) =>
  _getPosition(transform, Matrix4System.getTranslationTypeArray, state);

let getPositionTuple = (transform: transform, state: StateDataType.state) =>
  _getPosition(transform, Matrix4System.getTranslationTuple, state);

let setPositionByTypeArray = (transform: transform, position, data, state: StateDataType.state) =>
  switch (getParent(transform, data)) {
  | None =>
    setLocalPositionByTypeArray(transform, position, data) |> ignore;
    data
  | Some(parent) =>
    let data = update(parent, state) |> getTransformData;
    Vector3System.transformMat4TypeArray(
      position,
      invert(
        getLocalToWorldMatrixTypeArray(parent, data.localToWorldMatrixMap),
        GlobalTempSystem.getFloat32Array1(state)
      ),
      getLocalPositionTypeArray(transform, data.localPositionMap)
    )
    |> ignore;
    data
  };

let setPositionByTuple =
    (transform: transform, position: position, data, state: StateDataType.state) =>
  switch (getParent(transform, data)) {
  | None =>
    setLocalPositionByTuple(transform, position, data) |> ignore;
    data
  | Some(parent) =>
    let data = update(parent, state) |> getTransformData;
    setLocalPositionByTuple(
      transform,
      Vector3System.transformMat4Tuple(
        position,
        invert(
          getLocalToWorldMatrixTypeArray(parent, data.localToWorldMatrixMap),
          GlobalTempSystem.getFloat32Array1(state)
        )
      ),
      data
    )
    |> ignore;
    data
  };