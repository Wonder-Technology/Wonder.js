open Wonder_jest

open Wonderjs

open Js.Typed_array

let _ = describe("test update_textureArray job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  let _prepare = () => {
    open ImageRepoType

    let device = WebGPUDependencyTool.createDeviceObject()
    WebGPUCPTool.setDevice(device)
    let queue = WebGPUDependencyTool.createQueueObject()
    WebGPUCPTool.setQueue(queue)

    let (
      (bsdfMaterialRepo, imageRepo),
      (
        ((material1, material2), _),
        (
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ),
      ),
    ) = BSDFMaterialCPTool.buildRepoWithTwoMaterialsAndMapData(sandbox)

    let (gameObject1, gameObject2) = GameObjectCPTool.createTwoGameObjects()

    SceneGraphRepoDependencyTool.build(
      ~sandbox,
      ~gameObjectRepo=SceneGraphRepoDependencyTool.buildGameObjectRepo(
        ~sandbox,
        ~getAllGameObjectBSDFMaterials=_ => [material1, material2],
        ~getBSDFMaterial=(gameObject: SceneGraphRepoType.gameObject) =>
          switch gameObject {
          | gameObject when JudgeTool.isEqual(gameObject, gameObject1) =>
            Js.Nullable.return(material1)
          | gameObject when JudgeTool.isEqual(gameObject, gameObject2) =>
            Js.Nullable.return(material2)
          },
        (),
      ),
      ~bsdfMaterialRepo,
      (),
    )->SceneGraphRepoDependencyTool.set
    imageRepo->ImageRepoDependencyTool.set
    WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set
    CameraCPTool.buildAndSetAllBufferData(WebGPUDependencyTool.createDeviceObject())

    (
      (device, queue),
      (id1, id2, id3, id4, id5, id6, id7),
      (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
    )
  }

  beforeEach(() => {
    sandbox := createSandbox()
    TestCPTool.init(
      ~sandbox,
      ~updatePipelineData={
        name: "update",
        firstGroup: "frame",
        groups: list{
          {
            name: "frame",
            link: Concat,
            elements: list{{name: "update_textureArray", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("set all the layer index mapped with used image id to po", () =>
    testPromise("test", () => {
      let (
        (device, queue),
        (id1, id2, id3, id4, id5, id6, id7),
        (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
      ) = _prepare()

      DirectorCPTool.initAndUpdate(
        ~handleSuccessFunc=() =>
          (
            TextureArrayCPTool.getLayerIndex(id1),
            TextureArrayCPTool.getLayerIndex(id2),
            TextureArrayCPTool.getLayerIndex(id3),
            TextureArrayCPTool.getLayerIndex(id4),
            TextureArrayCPTool.getLayerIndex(id5),
            TextureArrayCPTool.getLayerIndex(id6),
            TextureArrayCPTool.getLayerIndex(id7),
          )->expect == (Some(2), Some(3), Some(5), Some(1), None, Some(0), Some(4)),
        (),
      )
    })
  )

  describe("build webgpu objects", () => {
    testPromise("create textureArray, textureArrayView, textureSampler", () => {
      let (
        (device, queue),
        (id1, id2, id3, id4, id5, id6, id7),
        (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
      ) = _prepare()
      let textureArray = WebGPUDependencyTool.createTextureObject()
      let createTextureStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->SinonTool.returns(textureArray)
        ->SinonTool.createTwoArgsEmptyStubData
      let createViewStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      let createSamplerStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createTexture=createTextureStubData->SinonTool.getDpFunc,
        ~createView=createViewStubData->SinonTool.getDpFunc,
        ~createSampler=createSamplerStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
        let layerCount = 6
        let (
          textureArrayLayerWidth,
          textureArrayLayerHeight,
        ) = WebGPUCPAPI.getTextureArrayLayerSize()
        (
          createTextureStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            Wonderjs.IWebGPUCoreDp.textureDescriptor(
              ~size={
                "width": textureArrayLayerWidth,
                "height": textureArrayLayerHeight,
                "depth": 1,
              },
              ~arrayLayerCount=layerCount,
              ~mipLevelCount=1,
              ~sampleCount=1,
              ~dimension="2d",
              ~format=Sinon.matchAny,
              ~usage=lor(
                WebGPUCoreDpRunAPI.unsafeGet().textureUsage.copy_dst,
                WebGPUCoreDpRunAPI.unsafeGet().textureUsage.sampled,
              ),
            ),
            device,
          ),
          createViewStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            Wonderjs.IWebGPUCoreDp.textureViewDescriptor(
              ~format=Sinon.matchAny,
              ~baseArrayLayer=0,
              ~arrayLayerCount=layerCount,
              ~dimension="2d-array",
              (),
            ),
            textureArray,
          ),
          createSamplerStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            Wonderjs.IWebGPUCoreDp.samplerDescriptor(
              ~magFilter="linear",
              ~minFilter="linear",
              ~addressModeU="repeat",
              ~addressModeV="repeat",
              ~addressModeW="repeat",
            ),
            device,
          ),
        )->expect == (true, true, true)
      }, ())
    })
    testPromise(
      j`TextureArray's and textureArrayView's format should not has "-srgb" suffix, so not do any sRGB conversions during the reading and writing of color values in the shader`,
      () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let createTextureStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
        let createViewStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createTexture=createTextureStubData->SinonTool.getDpFunc,
          ~createView=createViewStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
          let format = "rgba8unorm"
          (
            createTextureStubData
            ->SinonTool.getStub
            ->getCall(0, _)
            ->SinonTool.calledWithArg2(
              Wonderjs.IWebGPUCoreDp.textureDescriptor(
                ~size=Sinon.matchAny,
                ~arrayLayerCount=Sinon.matchAny,
                ~mipLevelCount=Sinon.matchAny,
                ~sampleCount=Sinon.matchAny,
                ~dimension=Sinon.matchAny,
                ~format,
                ~usage=Sinon.matchAny,
              ),
              device,
            ),
            createViewStubData
            ->SinonTool.getStub
            ->getCall(0, _)
            ->SinonTool.calledWithArg2(
              Wonderjs.IWebGPUCoreDp.textureViewDescriptor(
                ~format,
                ~baseArrayLayer=Sinon.matchAny,
                ~arrayLayerCount=Sinon.matchAny,
                ~dimension=Sinon.matchAny,
                (),
              ),
              Sinon.matchAny,
            ),
          )->expect == (true, true)
        }, ())
      },
    )

    describe("fix bug", () =>
      testPromise("if has no used image id, layer count should be 1 instead of 0", () => {
        let device = WebGPUDependencyTool.createDeviceObject()
        WebGPUCPTool.setDevice(device)
        let queue = WebGPUDependencyTool.createQueueObject()
        WebGPUCPTool.setQueue(queue)
        let textureArray = WebGPUDependencyTool.createTextureObject()
        let createTextureStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(textureArray)
          ->SinonTool.createTwoArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createTexture=createTextureStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=() =>
            createTextureStubData
            ->SinonTool.getStub
            ->getCall(0, _)
            ->expect
            ->SinonTool.toCalledWith((
              Wonderjs.IWebGPUCoreDp.textureDescriptor(
                ~size=Sinon.matchAny,
                ~arrayLayerCount=1,
                ~mipLevelCount=Sinon.matchAny,
                ~sampleCount=Sinon.matchAny,
                ~dimension=Sinon.matchAny,
                ~format=Sinon.matchAny,
                ~usage=Sinon.matchAny,
              ),
              device,
            )),
          (),
        )
      })
    )
  })

  describe("fill textureArray", () => {
    testPromise("create texture buffer only once", () => {
      let (
        (device, queue),
        (id1, id2, id3, id4, id5, id6, id7),
        (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
      ) = _prepare()
      let createBufferStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      let copy_src = 1
      let copy_dst = 2
      let (textureArrayLayerWidth, textureArrayLayerHeight) = (4, 4)
      WebGPUCPAPI.setTextureArrayLayerSize(textureArrayLayerWidth, textureArrayLayerHeight)
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
        ~copy_src_bufferUsage=copy_src,
        ~copy_dst_bufferUsage=copy_dst,
        (),
      )->WebGPUDependencyTool.set
      DirectorCPTool.initAndUpdate(~handleSuccessFunc=() =>
        (
          createBufferStubData->SinonTool.getStub->getCallCount,
          createBufferStubData
          ->SinonTool.getStub
          ->SinonTool.calledWithArg2(
            {
              "size": TextureArrayCPTool.getBytesPerRow() *
              textureArrayLayerHeight *
              Js.Typed_array.Uint8Array._BYTES_PER_ELEMENT,
              "usage": lor(copy_src, copy_dst),
            },
            device,
          ),
        )->expect == (1, true)
      , ())
    })
    describe("test texture buffer data", () => {
      let _getBufferData = (setSubUint8DataStubData, bytesPerRow, callIndex) => {
        let bufferData =
          setSubUint8DataStubData
          ->SinonTool.getStub
          ->getCall(callIndex, _)
          ->getArgs
          ->ListSt.nth(1)
          ->OptionSt.getExn
        (
          bufferData->TypeArrayCPTool.Uint8Array.slice(0, 12),
          bufferData->TypeArrayCPTool.Uint8Array.slice(bytesPerRow, bytesPerRow + 12),
          bufferData->TypeArrayCPTool.Uint8Array.slice(bytesPerRow * 2, bytesPerRow * 2 + 12),
          bufferData->TypeArrayCPTool.Uint8Array.slice(bytesPerRow * 3, bytesPerRow * 3 + 12),
        )
      }
      testPromise("fill image data to buffer data with fixed size", () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let setSubUint8DataStubData =
          createEmptyStub(
            refJsObjToSandbox(sandbox.contents),
          )->SinonTool.createThreeArgsEmptyStubData
        let (textureArrayLayerWidth, textureArrayLayerHeight) = (4, 4)
        WebGPUCPAPI.setTextureArrayLayerSize(textureArrayLayerWidth, textureArrayLayerHeight)
        WebGPUDependencyTool.build(
          ~sandbox,
          ~setSubUint8Data=setSubUint8DataStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set

        DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
          let bytesPerRow = TextureArrayCPTool.getBytesPerRow()
          (
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 0),
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 1),
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 2),
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 3),
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 4),
            _getBufferData(setSubUint8DataStubData, bytesPerRow, 5),
          )->expect ==
            (
              (
                Js.Typed_array.Uint8Array.make([1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
              (
                Js.Typed_array.Uint8Array.make([1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
              (
                Js.Typed_array.Uint8Array.make([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
              (
                Js.Typed_array.Uint8Array.make([1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
              (
                Js.Typed_array.Uint8Array.make([3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
              (
                Js.Typed_array.Uint8Array.make([3, 2, 1, 5, 100, 150, 101, 1, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([102, 150, 101, 3, 97, 150, 101, 5, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                Js.Typed_array.Uint8Array.make([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
              ),
            )
        }, ())
      })
    })
    describe("fill TextureArray's layers", () => {
      testPromise("create commandEncoder", () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let createCommandEncoderStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createCommandEncoder=createCommandEncoderStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=() =>
            createCommandEncoderStubData->SinonTool.getStub->getCallCount->expect == 6,
          (),
        )
      })
      testPromise("set texture buffer's data", () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let textureBuffer = WebGPUDependencyTool.createBufferObject()
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(textureBuffer)
          ->SinonTool.createTwoArgsEmptyStubData
        let setSubUint8DataStubData =
          createEmptyStub(
            refJsObjToSandbox(sandbox.contents),
          )->SinonTool.createThreeArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~setSubUint8Data=setSubUint8DataStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(
          ~handleSuccessFunc=() =>
            (
              setSubUint8DataStubData->SinonTool.getStub->getCallCount,
              setSubUint8DataStubData
              ->SinonTool.getStub
              ->getCall(1, _)
              ->SinonTool.calledWithArg3(0, Sinon.matchAny, textureBuffer),
            )->expect == (6, true),
          (),
        )
      })
      testPromise("copy texture buffer", () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let commandEncoder = WebGPUDependencyTool.createCommandEncoderObject()
        let createCommandEncoderStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(commandEncoder)
          ->SinonTool.createTwoArgsEmptyStubData
        let textureArray = WebGPUDependencyTool.createTextureObject()
        let createTextureStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(textureArray)
          ->SinonTool.createTwoArgsEmptyStubData
        let textureBuffer = WebGPUDependencyTool.createBufferObject()
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(textureBuffer)
          ->SinonTool.createTwoArgsEmptyStubData
        let copyBufferToTextureStubData =
          createEmptyStub(
            refJsObjToSandbox(sandbox.contents),
          )->SinonTool.createFourArgsEmptyStubData
        let (textureArrayLayerWidth, textureArrayLayerHeight) = (4, 4)
        WebGPUCPAPI.setTextureArrayLayerSize(textureArrayLayerWidth, textureArrayLayerHeight)
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~createCommandEncoder=createCommandEncoderStubData->SinonTool.getDpFunc,
          ~createTexture=createTextureStubData->SinonTool.getDpFunc,
          ~copyBufferToTexture=copyBufferToTextureStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
          let bytesPerRow = TextureArrayCPTool.getBytesPerRow()
          (
            copyBufferToTextureStubData->SinonTool.getStub->getCallCount,
            copyBufferToTextureStubData
            ->SinonTool.getStub
            ->getCall(1, _)
            ->SinonTool.calledWithArg4(
              {
                "buffer": textureBuffer,
                "bytesPerRow": bytesPerRow,
                "arrayLayer": 0,
                "mipLevel": 0,
                "textureArrayLayerHeight": 0,
              },
              {
                "texture": textureArray,
                "mipLevel": 0,
                "arrayLayer": 1,
                "origin": {
                  "x": 0,
                  "y": 0,
                  "z": 0,
                },
              },
              {
                "width": textureArrayLayerWidth,
                "height": textureArrayLayerHeight,
                "depth": 1,
              },
              commandEncoder,
            ),
          )->expect == (6, true)
        }, ())
      })
      testPromise("finish and submit", () => {
        let (
          (device, queue),
          (id1, id2, id3, id4, id5, id6, id7),
          (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
        ) = _prepare()
        let commandBufferObject = WebGPUDependencyTool.createCommandBufferObject()
        let finish = createEmptyStub(refJsObjToSandbox(sandbox.contents))
        finish->onCall(1, _)->SinonTool.returns(commandBufferObject)
        let submitStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
        let beginRenderPassStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->SinonTool.returns(pass)
          ->SinonTool.createTwoArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~finish,
          ~submit=submitStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
          let bytesPerRow = TextureArrayCPTool.getBytesPerRow()
          (
            submitStubData->SinonTool.getStub->getCallCount,
            submitStubData
            ->SinonTool.getStub
            ->getCall(1, _)
            ->SinonTool.calledWithArg2([commandBufferObject], queue),
          )->expect == (6, true)
        }, ())
      })
    })
  })

  describe("set textureArrayView, textureSampler to po", () => testPromise("test", () => {
      let (
        (device, queue),
        (id1, id2, id3, id4, id5, id6, id7),
        (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
      ) = _prepare()
      let textureArrayView = WebGPUDependencyTool.createTextureViewObject()
      let createViewStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->SinonTool.returns(textureArrayView)
        ->SinonTool.createTwoArgsEmptyStubData
      let sampler = WebGPUDependencyTool.createSamplerObject()
      let createSamplerStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->SinonTool.returns(sampler)
        ->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createView=createViewStubData->SinonTool.getDpFunc,
        ~createSampler=createSamplerStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      DirectorCPTool.initAndUpdate(
        ~handleSuccessFunc=() =>
          (
            TextureArrayCPTool.getTextureArrayView(),
            TextureArrayCPTool.getTextureSampler(),
          )->expect == (textureArrayView, sampler),
        (),
      )
    }))
  describe("test special cases", () => testPromise("layer count should < 2048", () => {
      let (
        (device, queue),
        (id1, id2, id3, id4, id5, id6, id7),
        (imageData1, imageData2, imageData3, imageData4, imageData5, imageData6, imageData7),
      ) = _prepare()
      WebGPUDependencyTool.build(
        ~sandbox,
        ~getTextureArrayMaxLayerCount=() => 3,
        (),
      )->WebGPUDependencyTool.set
      ExpectStreamTool.toFail(
        ~execFunc=DirectorCPTool.initAndUpdate(~handleAfterInitFunc=() => ()),
        ~message="expect layer count:6 < 3",
      )
    }))
})
