let buildAPI = (): Type.api => {
  // let eventManager: EventManager.getData =
  //   MiddlewareManager.unsafeGetData(middlewareState, "EventManager")->Obj.magic
  // let ui: UI.getData = MiddlewareManager.unsafeGetData("UI")->Obj.magic
  // let registerManager: RegisterManagerType.getData =
  //   MiddlewareManager.unsafeGetData("RegisterManager")->Obj.magic

  {
    // ui: (ui.buildAPI->Obj.magic)(),
    // eventManager: (eventManager.buildAPI->Obj.magic)(),
    commonlib: Obj.magic(1),
    most: Obj.magic(1),
    engineCore: Obj.magic(1),
    middlewareManager: MiddlewareManager.buildAPI(),
    // registerManager: (registerManager.buildAPI->Obj.magic)(),
  }
}

let serializeLib = %raw(`
function(fileStr, libraryName) {
eval('(' + "(function(){" + fileStr + "}())" + ')')

return window[libraryName]
}
`)

let serialize = %raw(`
function(fileStr, libraryName, funcName) {
eval('(' + "(function(){" + fileStr + "}())" + ')')

return window[libraryName][funcName]
}
`)

let getDataFromLib = %raw(`
function(lib, dataName) {
return lib[dataName]
}
`)
