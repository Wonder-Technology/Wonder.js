//TODO should from webpack

let handler = (api: Type.api, e: UI.registerData) => {
  let {register} = api.ui

  (register->Obj.magic)(e)

  // TODO dispatch
}
