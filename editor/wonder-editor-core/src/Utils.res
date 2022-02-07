let buildAPI = (): Type.api => {
  let eventManager: EventManager.getData = MiddlewareManager.unsafeGet("EventManager")->Obj.magic
  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  {
    ui: (ui.buildAPI->Obj.magic)(),
    eventManager: (eventManager.buildAPI->Obj.magic)(),
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
