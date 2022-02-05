open StateType

let getIsDebug = state => {
  state.config.isDebug
}

let getDirectionLightCount = state => {
  state.config.directionLightCount
}
