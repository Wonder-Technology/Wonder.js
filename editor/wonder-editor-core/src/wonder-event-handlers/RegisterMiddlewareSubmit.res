//TODO should from webpack

let handler = (api: Type.api, e: Type.triggerRegisterMiddlewareSubmitData) => {
  let {middlewareName, getData} = e

  let {onCustomEvent} = api.eventManager

  MiddlewareManager.register(middlewareName, (getData->Obj.magic)()->Obj.magic)

  let middlewareTest1: MiddlewareTest1Type.getData =
    MiddlewareManager.unsafeGet(middlewareName)->Obj.magic

  middlewareTest1.func1("middlewareTest1")
}
