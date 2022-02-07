//TODO should from webpack

type transformComponentConfig = {
  isDebug: bool,
  transformCount: int,
  float9Array1: Js.Typed_array.Float32Array.t,
  float32Array1: Js.Typed_array.Float32Array.t,
}

let handler = (api: Type.api, e: Type.triggerRegisterComponentSubmitData) => {
  let {getData} = e

  WonderEngineCore.Main.registerComponent((getData->Obj.magic)()->Obj.magic)
  WonderEngineCore.Main.createAndSetComponentState(
    "Transform",
    (
      {
        isDebug: true,
        transformCount: 10,
        float9Array1: Js.Typed_array.Float32Array.make([]),
        float32Array1: Js.Typed_array.Float32Array.make([]),
      }: transformComponentConfig
    )->Obj.magic,
  )

  let data = WonderEngineCore.Main.unsafeGetRelatedComponentData("Transform")

  let (data, transform) = WonderEngineCore.Main.createComponent(data)

  Js.log((transform, WonderEngineCore.Main.getAllComponents(data)))
}
