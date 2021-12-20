open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/direction_light_api.feature")

defineFeature(feature, test => {
  let transformData: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
  let directionLightData: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(
    Obj.magic(1),
  )
  let transformComponentName = "Transform"
  let directionLightComponentName = "DirectionLight"
  let transform = ref(Obj.magic(1))
  let directionLight = ref(Obj.magic(1))
  let direction1 = ref(Obj.magic(1))

  let _prepare = (given, \"when", \"and") => {
    let gameObject = 1

    given("prepare register", () => {
      WonderCore.CreatePO.createPO()->WonderCore.POContainer.setPO
    })

    \"and"({j`register transform data`}, () => {
      WonderCore.Main.registerComponent(WonderComponentTransform.Main.getData()->Obj.magic)
    })

    \"and"({j`register directionLight data`}, () => {
      WonderCore.Main.registerComponent(
        WonderComponentDirectionlight.Main.getData()->Obj.magic,
      )
    })

    \"and"("create and set all component states", () => {
      WonderCore.Main.createAndSetComponentState(
        directionLightComponentName,
        (
          {
            isDebug: false,
            directionLightCount: 2,
          }: WonderComponentDirectionlight.StateType.config
        )->Obj.magic,
      )
      WonderCore.Main.createAndSetComponentState(
        transformComponentName,
        (
          {
            isDebug: false,
            transformCount: 2,
            float9Array1: WonderCommonlib.Matrix3.createIdentityMatrix3(),
            float32Array1: WonderCommonlib.Matrix4.createIdentityMatrix4(),
          }: WonderComponentTransform.StateType.config
        )->Obj.magic,
      )

      transformData := WonderCore.Main.unsafeGetRelatedComponentData(transformComponentName)
      directionLightData :=
        WonderCore.Main.unsafeGetRelatedComponentData(directionLightComponentName)
    })

    \"and"("create a gameObject", () => {
      ()
    })

    \"and"("create a transform", () => {
      let (d, t) = WonderCore.Main.createComponent(transformData.contents)

      transformData := d
      transform := t
    })

    \"and"("add the transform to the gameObject", () => {
      transformData :=
        WonderCore.Main.addComponent(
          transformData.contents,
          gameObject->Obj.magic,
          transform.contents,
        )
    })

    \"and"(%re("/^set the transform's local euler angles to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        WonderCore.Main.setComponentData(
          transformData.contents,
          transform.contents,
          WonderComponentTypeTransform.Index.dataName.localEulerAngles->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"and"("create a directionLight", () => {
      let (d, l) = WonderCore.Main.createComponent(directionLightData.contents)

      directionLightData := d
      directionLight := l
    })

    \"and"("add the directionLight to the gameObject", () => {
      directionLightData :=
        WonderCore.Main.addComponent(
          directionLightData.contents,
          gameObject->Obj.magic,
          directionLight.contents,
        )
    })

    \"when"("get the directionLight's direction as d1", () => {
      direction1 :=
        Main.getDirection(
          directionLightData.contents,
          transformData.contents,
          directionLight.contents->Obj.magic,
        )->WonderCommonlib.NullableTool.getExn
    })
  }

  test(."direction shouldn't affected by scale if scale is always postive", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let light = ref(Obj.magic(-1))
    let direction2 = ref(Obj.magic(1))

    _prepare(given, \"when", \"and")

    \"when"(%re("/^set the transform's local scale to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        WonderCore.Main.setComponentData(
          transformData.contents,
          transform.contents,
          WonderComponentTypeTransform.Index.dataName.localScale->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"and"(%re("/^get the directionLight's direction as d(\d+)$/")->Obj.magic, arg0 => {
      direction2 :=
        Main.getDirection(
          directionLightData.contents,
          transformData.contents,
          directionLight.contents->Obj.magic,
        )->WonderCommonlib.NullableTool.getExn
    })

    then(%re("/^d(\d+) should equal d(\d+)$/")->Obj.magic, () => {
      direction1.contents->WonderCommonlib.Vector3Tool.truncate->expect ==
        direction2.contents->WonderCommonlib.Vector3Tool.truncate
    })
  })

  test(."direction should be affected by scale if scale change to negative from positive", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let light = ref(Obj.magic(-1))
    let direction2 = ref(Obj.magic(1))

    _prepare(given, \"when", \"and")

    \"when"(%re("/^set the transform's local scale to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        WonderCore.Main.setComponentData(
          transformData.contents,
          transform.contents,
          WonderComponentTypeTransform.Index.dataName.localScale->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"and"(%re("/^get the directionLight's direction as d(\d+)$/")->Obj.magic, arg0 => {
      direction2 :=
        Main.getDirection(
          directionLightData.contents,
          transformData.contents,
          directionLight.contents->Obj.magic,
        )->WonderCommonlib.NullableTool.getExn
    })

    then(%re("/^d(\d+) should not equal d(\d+)$/")->Obj.magic, () => {
      direction1.contents
      ->WonderCommonlib.Vector3Tool.truncate
      ->expect
      ->toNotEqual(direction2.contents->WonderCommonlib.Vector3Tool.truncate)
    })
  })
})
