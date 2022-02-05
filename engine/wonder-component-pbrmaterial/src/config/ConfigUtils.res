open StateType

let getIsDebug = state => {
  state.config.isDebug
}

// let setIsDebug = (state, isDebug) => {
//   ...state,
//   config: {
//     ...state.config,
//     isDebug: isDebug,
//   },
// }

let getPBRMaterialCount = state => {
  state.config.pbrMaterialCount
}

// let setPBRMaterialCount = (state, count) => {
//   ...state,
//   config: {
//     ...state.config,
//     pbrMaterialCount: count,
//   },
// }
