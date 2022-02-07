type data

type middlewareName = string

type state = {dataMap: WonderCommonlib.ImmutableHashMap.t<middlewareName, data>}
type stateContainer = {mutable state: option<state>}

let _createStateContainer = (): stateContainer => {state: None}

let stateContainer = _createStateContainer()

let setState = (state: state) => {
  stateContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  stateContainer.state->Belt.Option.getUnsafe
}

let register = (name: middlewareName, data: data) => {
  {
    ...unsafeGetState(),
    dataMap: unsafeGetState().dataMap->WonderCommonlib.ImmutableHashMap.set(name, data),
  }->setState
}

let unsafeGet = (name: middlewareName) => {
  unsafeGetState().dataMap->WonderCommonlib.ImmutableHashMap.unsafeGet(name)
}

let init = () => {
  setState({dataMap: WonderCommonlib.ImmutableHashMap.createEmpty()})
}
