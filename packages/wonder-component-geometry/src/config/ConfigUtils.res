open StateType

let getIsDebug = state => {
  state.config.isDebug
}

let getGeometryCount = state => {
  state.config.geometryCount
}

let getGeometryPointCount = state => {
  state.config.geometryPointCount
}
