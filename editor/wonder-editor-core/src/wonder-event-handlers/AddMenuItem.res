//TODO should from webpack

let handler = (api: Type.api, e: Type.triggerAddMenuItemData<Type.registerEventHandlerUIState>) => {
  let {func, id, stateValue} = e

  let {addExecFunc, removeExecFunc, setState} = api.ui

  (removeExecFunc->Obj.magic)(id)

  (addExecFunc->Obj.magic)(id, func)

  /* ! if stateName exist, replace it */
  (setState->Obj.magic)(id, stateValue)

  // loop()
}
