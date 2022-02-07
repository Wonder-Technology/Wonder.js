let handler = (api: Type.api, e: Type.triggerRegisterWorkPluginSubmitData) => {
  let {fileStr, libraryName, funcName} = e

  let {setRegisteredWorkPlugin, saveAllRegisteredWorkPugins} = api.registerManager

  (setRegisteredWorkPlugin->Obj.magic)(fileStr, libraryName, funcName)

  // TODO move out to refresh for register work-plugin button's click!
  (saveAllRegisteredWorkPugins->Obj.magic)()
  // TODO need refresh page
}
