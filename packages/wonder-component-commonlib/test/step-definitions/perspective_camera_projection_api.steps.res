open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/perspective_camera_projection_api.feature")

defineFeature(feature, test => {
  let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
  let perspectiveCameraProjectionComponentName = "PerspectiveCameraProjection"
  let perspectiveCameraProjection = ref(Obj.magic(-1))

  let _prepare = (given, \"and", isDebug) => {
    given("open debug", () => {
      ()
    })

    BackgroundTool.prepare(
      given,
      \"and",
      "perspectiveCameraProjection",
      perspectiveCameraProjectionComponentName,
      WonderComponentPerspectivecameraprojection.Main.getData,
      (
        {
          isDebug: isDebug,
        }: WonderComponentPerspectivecameraprojection.StateType.config
      ),
    )

    \"and"("create a perspectiveCameraProjection", () => {
      data :=
        WonderCore.Main.unsafeGetRelatedComponentData(perspectiveCameraProjectionComponentName)
      let (d, p) = WonderCore.Main.createComponent(data.contents)

      data := d
      perspectiveCameraProjection := p
    })

    \"and"(%re("/^set the perspectiveCameraProjection's near to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          perspectiveCameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.near->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })

    \"and"(%re("/^set the perspectiveCameraProjection's far to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          perspectiveCameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.far->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })

    \"and"(%re("/^set the perspectiveCameraProjection's fovy to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          perspectiveCameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })
  }

  test(."set aspect", ({given, \"when", \"and", then}) => {
    let isDebug = true

    _prepare(given, \"and", isDebug)

    \"and"(%re("/^set the perspectiveCameraProjection's aspect to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          perspectiveCameraProjection.contents,
          WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })

    \"when"("update the perspectiveCameraProjection", () => {
      data :=
        Main.updatePerspectiveCameraProjection(
          data.contents,
          isDebug,
          perspectiveCameraProjection.contents->Obj.magic,
          (2, 1),
        )
    })

    then("the perspectiveCameraProjection's pMatrix should be builded", () => {
      WonderCore.Main.getComponentData(
        data.contents,
        perspectiveCameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix->Obj.magic,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect ==
        Js.Typed_array.Float32Array.make([
          1.7320508075688776,
          0.,
          0.,
          0.,
          0.,
          1.7320508075688776,
          0.,
          0.,
          0.,
          0.,
          -1.0004000800160033,
          -1.,
          0.,
          0.,
          -0.40008001600320064,
          0.,
        ])
    })
  })

  test(."set canvas size instead of aspect", ({given, \"when", \"and", then}) => {
    let isDebug = true

    _prepare(given, \"and", isDebug)

    \"when"(
      %re("/^update the perspectiveCameraProjection with canvas size: (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        data :=
          Main.updatePerspectiveCameraProjection(
            data.contents,
            isDebug,
            perspectiveCameraProjection.contents->Obj.magic,
            arguments->Js.Array.slice(~start=0, ~end_=2, _)->Obj.magic,
          )
      },
    )

    then("the perspectiveCameraProjection's pMatrix should be builded", () => {
      WonderCore.Main.getComponentData(
        data.contents,
        perspectiveCameraProjection.contents,
        WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix->Obj.magic,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->expect ==
        Js.Typed_array.Float32Array.make([
          1.7320508075688776,
          0.,
          0.,
          0.,
          0.,
          1.7320508075688776,
          0.,
          0.,
          0.,
          0.,
          -1.0004000800160033,
          -1.,
          0.,
          0.,
          -0.40008001600320064,
          0.,
        ])
    })
  })
})
