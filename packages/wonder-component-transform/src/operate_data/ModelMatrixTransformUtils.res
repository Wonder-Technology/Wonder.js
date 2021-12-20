open StateType

let getLocalPosition = (localPositions, transform) =>
  OperateTypeArrayTransformUtils.getLocalPositionTuple(transform, localPositions)

let setLocalPosition = (state, transform, localPosition) => {
  OperateTypeArrayTransformUtils.setLocalPosition(transform, localPosition, state.localPositions)

  HierachyTransformUtils.markHierachyDirty(state, transform)
}

let setPosition = (state, transform, parent, position) =>
  setLocalPosition(
    state,
    transform,
    position->WonderCommonlib.Vector3.transformMat4Tuple(
      ConfigUtils.getFloat32Array1(state)->WonderCommonlib.Matrix4.invert(
        WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
          state.localToWorldMatrices,
          parent,
        ),
      ),
    ),
  )

let getLocalRotation = (localRotations, transform) =>
  OperateTypeArrayTransformUtils.getLocalRotationTuple(transform, localRotations)

let setLocalRotation = (state, transform, localRotation) => {
  OperateTypeArrayTransformUtils.setLocalRotation(transform, localRotation, state.localRotations)

  HierachyTransformUtils.markHierachyDirty(state, transform)
}

let getLocalScale = (localScales, transform) =>
  OperateTypeArrayTransformUtils.getLocalScaleTuple(transform, localScales)

let setLocalScale = (state, transform, localScale) => {
  OperateTypeArrayTransformUtils.setLocalScale(transform, localScale, state.localScales)

  HierachyTransformUtils.markHierachyDirty(state, transform)
}

let setScale = (state, transform, parent, scale) =>
  setLocalScale(
    state,
    transform,
    scale->WonderCommonlib.Vector3.transformMat4Tuple(
      ConfigUtils.getFloat32Array1(state)->WonderCommonlib.Matrix4.invert(
        WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
          state.localToWorldMatrices,
          parent,
        ),
      ),
    ),
  )

let getLocalEulerAngles = (localRotations, transform) =>
  getLocalRotation(localRotations, transform)->WonderCommonlib.Quaternion.getEulerAngles

let setLocalEulerAngles = (state, transform, localEulerAngles) =>
  setLocalRotation(
    state,
    transform,
    localEulerAngles->WonderCommonlib.Quaternion.setFromEulerAngles,
  )

let getNormalMatrix = (state, transform) => {
  ConfigUtils.getFloat9Array1(state)
  ->WonderCommonlib.Matrix4.invertTo3x3(
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      state.localToWorldMatrices,
      transform,
    ),
  )
  ->WonderCommonlib.Matrix3.transposeSelf
}
