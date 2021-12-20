open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/transform_api.feature")

defineFeature(feature, test => {
  let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
  let transformComponentName = "Transform"

  test(."lookAt", ({given, \"when", \"and", then}) => {
    let transform = ref(Obj.magic(-1))

    BackgroundTool.prepare(
      given,
      \"and",
      "transform",
      transformComponentName,
      WonderComponentTransform.Main.getData,
      (
        {
          isDebug: false,
          transformCount: 2,
          float9Array1: WonderCommonlib.Matrix3.createIdentityMatrix3(),
          float32Array1: WonderCommonlib.Matrix4.createIdentityMatrix4(),
        }: WonderComponentTransform.StateType.config
      ),
    )

    \"and"("create a transform", () => {
      data := WonderCore.Main.unsafeGetRelatedComponentData(transformComponentName)
      let (d, t) = WonderCore.Main.createComponent(data.contents)

      data := d
      transform := t
    })

    \"when"("look at a target", () => {
      data :=
        Main.lookAt(~data=data.contents, ~transform=transform.contents-> Obj.magic, ~target=(0., 0., 1.), ())
    })

    then("change localToWorld matrix", () => {
      WonderCore.Main.getComponentData(
        data.contents,
        transform.contents,
        WonderComponentTypeTransform.Index.dataName.eulerAngles->Obj.magic,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect == (180., -0., 180.)
    })
  })
})
