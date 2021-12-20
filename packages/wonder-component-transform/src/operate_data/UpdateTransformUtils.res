open StateType

let rec mutableUpdate = (state, transform) => {
  let {
    dirtyMap,
    parentMap,
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
  } = state

  DirtyTransformUtils.isDirty(state, transform)
    ? {
        let state = DirtyTransformUtils.mark(state, transform, false)

        switch HierachyTransformUtils.getParent(parentMap, transform) {
        | Some(parent) =>
          let {
            localToWorldMatrices,
            localPositions,
            localRotations,
            localScales,
          } as state = mutableUpdate(state, parent)

          let parentLocalToWorldMatrix = WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
            localToWorldMatrices,
            parent,
          )
          let childLocalToWorldMatrix = WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
            localToWorldMatrices,
            transform,
          )

          WonderCommonlib.Matrix4.multiply(
            childLocalToWorldMatrix,
            parentLocalToWorldMatrix,
            ConfigUtils.getFloat32Array1(
              state,
            )->WonderCommonlib.Matrix4.fromTranslationRotationScale(
              ModelMatrixTransformUtils.getLocalPosition(localPositions, transform),
              ModelMatrixTransformUtils.getLocalRotation(localRotations, transform),
              ModelMatrixTransformUtils.getLocalScale(localScales, transform),
            ),
          )->ignore

          state
        | None =>
          let localToWorldMatrix = WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
            localToWorldMatrices,
            transform,
          )

          localToWorldMatrix
          ->WonderCommonlib.Matrix4.fromTranslationRotationScale(
            ModelMatrixTransformUtils.getLocalPosition(localPositions, transform),
            ModelMatrixTransformUtils.getLocalRotation(localRotations, transform),
            ModelMatrixTransformUtils.getLocalScale(localScales, transform),
          )
          ->ignore

          state
        }
      }
    : state
}

let updateAndGetPosition = (state, transform) => {
  let {localToWorldMatrices} as state = mutableUpdate(state, transform)

  (
    state,
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )->WonderCommonlib.Matrix4.getTranslationTuple,
  )
}

let updateAndSetPosition = (state, transform, position) => {
  let {parentMap, localPositions} = state

  switch HierachyTransformUtils.getParent(parentMap, transform) {
  | None => ModelMatrixTransformUtils.setLocalPosition(state, transform, position)
  | Some(parent) =>
    let state = mutableUpdate(state, parent)

    ModelMatrixTransformUtils.setPosition(state, transform, parent, position)
  }
}

let updateAndGetRotation = (state, transform) => {
  let {localToWorldMatrices} as state = mutableUpdate(state, transform)

  (
    state,
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )->WonderCommonlib.Matrix4.getRotationTuple,
  )
}

let updateAndSetRotation = (state, transform, rotation) => {
  let {parentMap, localRotations} = state

  switch HierachyTransformUtils.getParent(parentMap, transform) {
  | None => ModelMatrixTransformUtils.setLocalRotation(state, transform, rotation)
  | Some(parent) =>
    let (state, r) = updateAndGetRotation(state, parent)

    ModelMatrixTransformUtils.setLocalRotation(
      state,
      transform,
      r->WonderCommonlib.Quaternion.invert->WonderCommonlib.Quaternion.multiply(rotation),
    )
  }
}

let updateAndGetScale = (state, transform) => {
  let {localToWorldMatrices} as state = mutableUpdate(state, transform)

  (
    state,
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )->WonderCommonlib.Matrix4.getScaleTuple,
  )
}

let updateAndSetScale = (state, transform, scale) => {
  let {parentMap, localScales} = state

  switch HierachyTransformUtils.getParent(parentMap, transform) {
  | None => ModelMatrixTransformUtils.setLocalScale(state, transform, scale)
  | Some(parent) =>
    let state = mutableUpdate(state, parent)

    ModelMatrixTransformUtils.setScale(state, transform, parent, scale)
  }
}

let updateAndGetEulerAngles = (state, transform) => {
  let {localToWorldMatrices} as state = mutableUpdate(state, transform)

  (
    state,
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )->WonderCommonlib.Matrix4.getEulerAngles,
  )
}

let updateAndSetEulerAngles = (state, transform, eulerAngles) =>
  updateAndSetRotation(
    state,
    transform,
    eulerAngles->WonderCommonlib.Quaternion.setFromEulerAngles,
  )
