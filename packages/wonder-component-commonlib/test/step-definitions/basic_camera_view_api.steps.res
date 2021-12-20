open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/basic_camera_view_api.feature")

defineFeature(feature, test => {
  let basicCameraViewComponentName = "BasicCameraView"

  let _prepareData = (given, \"and", basicCameraViewComponentName) => {
    given("prepare register", () => {
      WonderCore.CreatePO.createPO()->WonderCore.POContainer.setPO
    })

    \"and"({j`register ${basicCameraViewComponentName} data`}, () => {
      WonderCore.Main.registerComponent(
        WonderComponentBasiccameraview.Main.getData()->Obj.magic,
      )
    })
  }

  test(."getViewWorldToCameraMatrix", ({given, \"when", \"and", then}) => {
    let gameObject = 1
    let basicCameraViewData: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(
      Obj.magic(1),
    )
    let transformData: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(
      Obj.magic(1),
    )
    let transformComponentName = "Transform"
    let basicCameraView = ref(Obj.magic(-1))
    let transform = ref(Obj.magic(1))
    let viewWorldToCameraMatrix = ref(Obj.magic(1))

    _prepareData(given, \"and", basicCameraViewComponentName)

    \"and"({j`register transform data`}, () => {
      WonderCore.Main.registerComponent(WonderComponentTransform.Main.getData()->Obj.magic)
    })

    \"and"("create and set all component states", () => {
      WonderCore.Main.createAndSetComponentState(
        basicCameraViewComponentName,
        (
          {
            isDebug: false,
          }: WonderComponentBasiccameraview.StateType.config
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
      basicCameraViewData :=
        WonderCore.Main.unsafeGetRelatedComponentData(basicCameraViewComponentName)
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

    \"and"(%re("/^set the transform's local position to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        WonderCore.Main.setComponentData(
          transformData.contents,
          transform.contents,
          WonderComponentTypeTransform.Index.dataName.localPosition->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"and"(
      %re("/^set the transform's local rotation to (.*), (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->WonderCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        transformData :=
          WonderCore.Main.setComponentData(
            transformData.contents,
            transform.contents,
            WonderComponentTypeTransform.Index.dataName.localRotation->Obj.magic,
            arguments->Js.Array.slice(~start=0, ~end_=4, _)->Obj.magic,
          )
      },
    )

    \"and"("update the transform", () => {
      transformData :=
        WonderCore.Main.setComponentData(
          transformData.contents,
          transform.contents,
          WonderComponentTypeTransform.Index.dataName.update->Obj.magic,
          Js.Nullable.null->Obj.magic,
        )
    })

    \"and"("create a basicCameraView", () => {
      let (d, b) = WonderCore.Main.createComponent(basicCameraViewData.contents)

      basicCameraViewData := d
      basicCameraView := b
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      basicCameraViewData :=
        WonderCore.Main.addComponent(
          basicCameraViewData.contents,
          gameObject->Obj.magic,
          basicCameraView.contents,
        )
    })

    \"when"("get the basicCameraView's viewWorldToCameraMatrix", () => {
      viewWorldToCameraMatrix :=
        Main.getViewWorldToCameraMatrix(
          basicCameraViewData.contents,
          transformData.contents,
          basicCameraView.contents-> Obj.magic,
        )->WonderCommonlib.NullableTool.getExn
    })

    then("it should be the invert of the transform's localToWorldMatrix", () => {
      viewWorldToCameraMatrix.contents->expect ==
        Js.Typed_array.Float32Array.make([
          0.048192769289016724,
          0.1325301229953766,
          0.22891566157341003,
          0.,
          0.16033364832401276,
          0.26784059405326843,
          0.43466171622276306,
          0.,
          0.21037998795509338,
          0.4439295530319214,
          0.6339203119277954,
          0.,
          -1.,
          -2.,
          -3.,
          1.,
        ])
    })
  })

  let _prepareDataForGetActiveCameraView = (
    (setDataFunc, setCameraView1Func, setCameraView2Func),
    given,
    \"and",
    basicCameraViewComponentName,
    isDebug,
  ) => {
    let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
    let gameObject1 = 1
    let gameObject2 = 2
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))

    given("create and set all component states", () => {
      WonderCore.Main.createAndSetComponentState(
        basicCameraViewComponentName,
        (
          {
            isDebug: isDebug,
          }: WonderComponentBasiccameraview.StateType.config
        )->Obj.magic,
      )
    })

    \"and"("create two gameObjects", () => {
      ()
    })

    \"and"("create two basicCameraViews as cameraView1, cameraView2", () => {
      data := WonderCore.Main.unsafeGetRelatedComponentData(basicCameraViewComponentName)

      let (d, b1) = WonderCore.Main.createComponent(data.contents)
      let (d, b2) = WonderCore.Main.createComponent(d)

      data := d
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add them to the gameObjects one by one", () => {
      data :=
        WonderCore.Main.addComponent(
          data.contents,
          gameObject1->Obj.magic,
          cameraView1.contents,
        )
      data :=
        WonderCore.Main.addComponent(
          data.contents,
          gameObject2->Obj.magic,
          cameraView2.contents,
        )

      setCameraView1Func(cameraView1.contents)
      setCameraView2Func(cameraView2.contents)
      setDataFunc(data.contents)
    })
  }

  test(."test has none", ({given, \"when", \"and", then}) => {
    let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))
    let activeBasicCameraView = ref(Obj.magic(1))
    let isDebug = false

    _prepareData(given, \"and", basicCameraViewComponentName)

    _prepareDataForGetActiveCameraView(
      (d => data := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
      given,
      \"and",
      basicCameraViewComponentName,
      isDebug,
    )

    \"and"("set cameraView1's active to false", () => {
      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          cameraView1.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
          false->Obj.magic,
        )
    })

    \"and"("set cameraView2's active to false", () => {
      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          cameraView2.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
          false->Obj.magic,
        )
    })

    \"when"("get active basicCameraView", () => {
      activeBasicCameraView := Main.getActiveCameraView(data.contents, isDebug)
    })

    then("it should return null", () => {
      activeBasicCameraView.contents->Js.Nullable.isNullable->expect == true
    })
  })

  test(."test has one", ({given, \"when", \"and", then}) => {
    let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))
    let activeBasicCameraView = ref(Obj.magic(1))
    let isDebug = false

    _prepareData(given, \"and", basicCameraViewComponentName)

    _prepareDataForGetActiveCameraView(
      (d => data := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
      given,
      \"and",
      basicCameraViewComponentName,
      isDebug,
    )

    \"and"("set cameraView1's active to true", () => {
      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          cameraView1.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
          true->Obj.magic,
        )
    })

    \"and"("set cameraView2's active to false", () => {
      data :=
        WonderCore.Main.setComponentData(
          data.contents,
          cameraView2.contents,
          WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
          false->Obj.magic,
        )
    })

    \"when"("get active basicCameraView", () => {
      activeBasicCameraView := Main.getActiveCameraView(data.contents, isDebug)
    })

    then("it should return cameraView1", () => {
      activeBasicCameraView.contents->WonderCommonlib.NullableTool.getExn->expect ==
        cameraView1.contents
    })
  })

  //   test(."if has >= 2, contract error", ({given, \"when", \"and", then}) => {
  //     let data: ref<WonderCore.RegisterComponentType.usedComponentData> = ref(Obj.magic(1))
  //     let cameraView1 = ref(Obj.magic(-1))
  //     let cameraView2 = ref(Obj.magic(-1))
  //     let activeBasicCameraView = ref(Obj.magic(1))
  //     let isDebug = true

  //     _prepareData(given, \"and", basicCameraViewComponentName)

  //     _prepareDataForGetActiveCameraView(
  //       (d => data := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
  //       given,
  //       \"and",
  //       basicCameraViewComponentName,
  //       isDebug,
  //     )

  //     given("open debug", () => {
  //       ()
  //     })

  //     \"and"("set cameraView1's active to true", () => {
  //       data :=
  //         WonderCore.Main.setComponentData(
  //           data.contents,
  //           cameraView1.contents,
  //           WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
  //           true->Obj.magic,
  //         )
  //     })

  //     \"and"("set cameraView2's active to true", () => {
  //       data :=
  //         WonderCore.Main.setComponentData(
  //           data.contents,
  //           cameraView2.contents,
  //           WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
  //           true->Obj.magic,
  //         )
  //     })

  //     \"when"("get active basicCameraView", () => {
  //       ()
  //     })

  //     then(%re("/^should contract error: (.*)$/")->Obj.magic, arg0 => {
  //       expect(() => {
  //         Main.getActiveCameraView(data.contents, isDebug)
  //       })->toThrowMessage(arg0->Obj.magic)
  //     })
  //   })
})
