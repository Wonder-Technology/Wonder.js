type libraryName = string

type registeredWorkPluginData = Type.triggerRegisterWorkPluginSubmitData

type state = {
  registeredWorkPluginDataMap: WonderCommonlib.ImmutableHashMap.t<
    libraryName,
    registeredWorkPluginData,
  >,
}
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

let _getFromLocalStorage = %raw(`
function(name) {
  return window.localStorage[name]
}
`)

let _setToLocalStorage = %raw(`
function(name, data) {
  window.localStorage[name] = data
}
`)

let setRegisteredWorkPlugin = (fileStr, libraryName, funcName) => {
  {
    ...unsafeGetState(),
    registeredWorkPluginDataMap: unsafeGetState().registeredWorkPluginDataMap->WonderCommonlib.ImmutableHashMap.set(
      libraryName,
      {fileStr: fileStr, libraryName: libraryName, funcName: funcName},
    ),
  }->setState
}

let setAllSavedToState = () => {
  //TODO implement: invoke setRegisteredWorkPlugin to set all saved
  Obj.magic(1)
}

// TODO save to indexdb instead of localstorage
let saveAllRegisteredWorkPugins = () => {
  let {registeredWorkPluginDataMap} = unsafeGetState()

  registeredWorkPluginDataMap
  ->WonderCommonlib.ImmutableHashMap.getValidValues
  ->WonderCommonlib.ArraySt.forEach(({fileStr, libraryName, funcName}) => {
    _setToLocalStorage({j`${libraryName}_fileStr`}, fileStr)
    _setToLocalStorage({j`${libraryName}_libraryName`}, libraryName)
    _setToLocalStorage({j`${libraryName}_funcName`}, funcName)
  })
}

let registerAllSaved = () => {
  let libraryName = "WorkPluginTest1"

  switch _getFromLocalStorage({j`${libraryName}_fileStr`})->WonderCommonlib.OptionSt.fromNullable {
  | None => ()
  | Some(fileStr) =>
    let libraryName = _getFromLocalStorage({j`${libraryName}_libraryName`})
    let funcName = _getFromLocalStorage({j`${libraryName}_funcName`})

    let getData = Utils.serialize(fileStr, libraryName, funcName)

    WonderEngineCore.Main.registerWorkPlugin(
      ~data=(getData->Obj.magic)()->Obj.magic,
      // TODO get jobOrders from registered data!
      ~jobOrders=[
        {
          pipelineName: "init",
          insertElementName: "init_root_wonder",
          insertAction: #after,
        },
      ],
      (),
    )
  }
}

let buildAPI = (): Type.registerManagerAPI => {
  setRegisteredWorkPlugin: setRegisteredWorkPlugin->Obj.magic,
  saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins->Obj.magic,
}

let init = () => {
  setState({registeredWorkPluginDataMap: WonderCommonlib.ImmutableHashMap.createEmpty()})
}

let getData = (): RegisterManagerType.getData => {
  {
    buildAPI: buildAPI->Obj.magic,
    init: init->Obj.magic,
    setRegisteredWorkPlugin: setRegisteredWorkPlugin->Obj.magic,
    saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins->Obj.magic,
    registerAllSaved: registerAllSaved->Obj.magic,
    setAllSavedToState: setAllSavedToState->Obj.magic,
  }
}
