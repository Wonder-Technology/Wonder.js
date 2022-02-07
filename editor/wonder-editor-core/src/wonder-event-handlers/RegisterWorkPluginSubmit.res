//TODO should from webpack

let handler = (api: Type.api, e: Type.triggerRegisterWorkPluginSubmitData) => {
  let {getData} = e

  WonderEngineCore.Main.registerWorkPlugin(~data=(getData->Obj.magic)()->Obj.magic, ())
}
