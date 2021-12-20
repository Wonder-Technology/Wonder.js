open StateType

let getPMatrix = (state, cameraProjection) =>
  state.pMatrixMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection)

let setPMatrix = (state, cameraProjection, pMatrix) => {
  let {pMatrixMap} = state

  {
    ...state,
    pMatrixMap: pMatrixMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, pMatrix),
  }
}

let getFovy = (state, cameraProjection) =>
  state.fovyMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection)

let setFovy = (state, cameraProjection, fovy) => {
  let {fovyMap} = state

  {
    ...state,
    fovyMap: fovyMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, fovy),
  }
}

let getAspect = (state, cameraProjection) =>
  state.aspectMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection)

let setAspect = (state, cameraProjection, aspect) => {
  let {aspectMap} = state

  {
    ...state,
    aspectMap: aspectMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, aspect),
  }
}

let getFar = (state, cameraProjection) =>
  state.farMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection)

let setFar = (state, cameraProjection, far) => {
  let {farMap} = state

  {
    ...state,
    farMap: farMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, far),
  }
}

let getNear = (state, cameraProjection) =>
  state.nearMap->WonderCommonlib.ImmutableSparseMap.get(cameraProjection)

let setNear = (state, cameraProjection, near) => {
  let {nearMap} = state

  {
    ...state,
    nearMap: nearMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, near),
  }
}
