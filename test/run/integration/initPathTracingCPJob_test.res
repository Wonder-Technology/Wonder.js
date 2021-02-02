open Wonder_jest

open Wonderjs

let _ = describe("test init_pathTracing_pass job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  let _prepare = sandbox => {
    let (
      repo,
      directionLightData,
    ) = DirectionLightTool.buildDirectionLightRepoWithOneDirectionLight(sandbox)

    SceneGraphRepoDependencyTool.build(
      ~sandbox,
      ~directionLightRepo=repo,
      (),
    )->SceneGraphRepoDependencyTool.set

    let device = WebGPUDependencyTool.createDeviceObject()
    WebGPUCPTool.setDevice(device)
    let queue = WebGPUDependencyTool.createQueueObject()
    WebGPUCPTool.setQueue(queue)

    WebGPUDependencyTool.build(~sandbox, ())->WebGPUDependencyTool.set
    WebGPURayTracingDependencyTool.build(~sandbox, ())->WebGPURayTracingDependencyTool.set

    CameraCPTool.buildAndSetAllBufferData(device)

    ((device, queue), directionLightData)
  }

  beforeEach(() => {
    sandbox := createSandbox()
    TestCPTool.init(
      ~sandbox,
      ~initPipelineData={
        name: "init",
        firstGroup: "frame",
        groups: list{
          {
            name: "frame",
            link: Concat,
            elements: list{{name: "init_pathTracing_pass", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("create shader binding table and set to po", () => {
    testPromise("create all shader modules", () => {
      let ((device, _), _) = _prepare(sandbox)
      let baseShaderPath = "src/run/rtx_path_tracer/domain_layer/domain/shader/ray_tracing"
      let buffer = WebGPUDependencyTool.createBufferObject()
      let rayGenGLSL = "a1"
      let rayRChitGLSL = "a2"
      let rayRAhitGLSL = "a3"
      let rayMissGLSL = "a4"
      let rayMissShadowGLSL = "a5"
      let loadGLSL = createEmptyStub(refJsObjToSandbox(sandbox.contents))
      loadGLSL->onCall(0, _)->SinonTool.returns(rayGenGLSL)
      loadGLSL->onCall(1, _)->SinonTool.returns(rayRChitGLSL)
      loadGLSL->onCall(2, _)->SinonTool.returns(rayRAhitGLSL)
      loadGLSL->onCall(3, _)->SinonTool.returns(rayMissGLSL)
      loadGLSL->onCall(4, _)->SinonTool.returns(rayMissShadowGLSL)
      let createShaderModuleStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
        ~loadGLSL,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(
        ~handleSuccessFunc=() =>
          (
            (
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(0, _)
              ->SinonTool.calledWithArg2({"code": rayGenGLSL}, device),
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(1, _)
              ->SinonTool.calledWithArg2({"code": rayRChitGLSL}, device),
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(2, _)
              ->SinonTool.calledWithArg2({"code": rayRAhitGLSL}, device),
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(3, _)
              ->SinonTool.calledWithArg2({"code": rayMissGLSL}, device),
              createShaderModuleStubData
              ->SinonTool.getStub
              ->getCall(4, _)
              ->SinonTool.calledWithArg2({"code": rayMissShadowGLSL}, device),
            ),
            (
              loadGLSL
              ->getCall(0, _)
              ->SinonTool.calledWith(j`$(baseShaderPath)/ray_generation.rgen`),
              loadGLSL
              ->getCall(1, _)
              ->SinonTool.calledWith(j`$(baseShaderPath)/ray_closest_hit.rchit`),
              loadGLSL
              ->getCall(2, _)
              ->SinonTool.calledWith(j`$(baseShaderPath)/ray_anyhit_shadow.rahit`),
              loadGLSL->getCall(3, _)->SinonTool.calledWith(j`$(baseShaderPath)/ray_miss.rmiss`),
              loadGLSL
              ->getCall(4, _)
              ->SinonTool.calledWith(j`$(baseShaderPath)/ray_miss_shadow.rmiss`),
            ),
          )->expect == ((true, true, true, true, true), (true, true, true, true, true)),
        (),
      )
    })
    testPromise("create ray tracing shader binding table", () => {
      let ((device, _), _) = _prepare(sandbox)
      let buffer = WebGPUDependencyTool.createBufferObject()
      let rayGenShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let rayRChitShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let rayRAhitShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let rayMissShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let rayMissShadowShaderModule = WebGPUDependencyTool.createShaderModuleObject()
      let createShaderModuleStubData = createEmptyStub(refJsObjToSandbox(sandbox.contents))
      createShaderModuleStubData->onCall(0, _)->SinonTool.returns(rayGenShaderModule)
      createShaderModuleStubData->onCall(1, _)->SinonTool.returns(rayRChitShaderModule)
      createShaderModuleStubData->onCall(2, _)->SinonTool.returns(rayRAhitShaderModule)
      createShaderModuleStubData->onCall(3, _)->SinonTool.returns(rayMissShaderModule)
      createShaderModuleStubData->onCall(4, _)->SinonTool.returns(rayMissShadowShaderModule)
      let createShaderModuleStubData =
        createShaderModuleStubData->SinonTool.createTwoArgsEmptyStubData
      let createRayTracingShaderBindingTableStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createTwoArgsEmptyStubData
      let ray_generation = 0
      let ray_closest_hit = 1
      let ray_any_hit = 2
      let ray_miss = 3
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createShaderModule=createShaderModuleStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~ray_generation,
        ~ray_closest_hit,
        ~ray_any_hit,
        ~ray_miss,
        ~createRayTracingShaderBindingTable=createRayTracingShaderBindingTableStubData->SinonTool.getDpFunc,
        (),
      )->WebGPURayTracingDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() =>
        createRayTracingShaderBindingTableStubData
        ->SinonTool.getStub
        ->expect
        ->SinonTool.toCalledWith((
          {
            "stages": [
              {"module": rayGenShaderModule, "stage": ray_generation},
              {
                "module": rayRChitShaderModule,
                "stage": ray_closest_hit,
              },
              {"module": rayRAhitShaderModule, "stage": ray_any_hit},
              {"module": rayMissShaderModule, "stage": ray_miss},
              {
                "module": rayMissShadowShaderModule,
                "stage": ray_miss,
              },
            ],
            "groups": [
              Wonderjs.IWebGPURayTracingDp.group(~type_="general-hit-group", ~generalIndex=0, ()),
              Wonderjs.IWebGPURayTracingDp.group(~type_="triangles-hit-group", ~closestHitIndex=1, ()),
              Wonderjs.IWebGPURayTracingDp.group(~type_="triangles-hit-group", ~anyHitIndex=2, ()),
              Wonderjs.IWebGPURayTracingDp.group(~type_="general", ~generalIndex=3, ()),
              Wonderjs.IWebGPURayTracingDp.group(~type_="general", ~generalIndex=4, ()),
            ],
          },
          device,
        ))
      , ())
    })
  })

  describe("create bind group layout and set to po", () => {
    testPromise("create camera bind group layout and set to po", () => {
      let ((device, _), _) = _prepare(sandbox)
      let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(layout)
        ->SinonTool.createTwoArgsEmptyStubData
      let ray_generation = 0
      let ray_closest_hit = 1
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~ray_generation,
        ~ray_closest_hit,
        (),
      )->WebGPURayTracingDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() =>
        (
          createBindGroupLayoutStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            {
              "entries": [
                Wonderjs.IWebGPUCoreDp.layoutBinding(
                  ~binding=0,
                  ~visibility=ray_generation,
                  ~type_="uniform-buffer",
                  (),
                ),
              ],
            },
            device,
          ),
          PathTracingPassCPTool.getCameraBindGroupLayout(),
        )->expect == (true, layout)
      , ())
    })
    testPromise("create direction light bind group layout and set to po", () => {
      let ((device, _), _) = _prepare(sandbox)
      let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(1, _)
        ->SinonTool.returns(layout)
        ->SinonTool.createTwoArgsEmptyStubData
      let ray_generation = 0
      let ray_closest_hit = 1
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      WebGPURayTracingDependencyTool.build(
        ~sandbox,
        ~ray_generation,
        ~ray_closest_hit,
        (),
      )->WebGPURayTracingDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() =>
        (
          createBindGroupLayoutStubData
          ->SinonTool.getStub
          ->getCall(1, _)
          ->SinonTool.calledWithArg2(
            {
              "entries": [
                Wonderjs.IWebGPUCoreDp.layoutBinding(
                  ~binding=0,
                  ~visibility=ray_closest_hit,
                  ~type_="storage-buffer",
                  (),
                ),
              ],
            },
            device,
          ),
          PathTracingPassCPTool.getDirectionLightBindGroupLayout(),
        )->expect == (true, layout)
      , ())
    })
  })

  describe("create bind group and add to po", () => {
    testPromise("create camera bind group and add to po", () => {
      let ((device, _), _) = _prepare(sandbox)
      let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
      let createBindGroupLayoutStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(layout)
        ->SinonTool.createTwoArgsEmptyStubData
      let bindGroup = WebGPUDependencyTool.createBindGroupObject()
      let createBindGroupStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->onCall(0, _)
        ->SinonTool.returns(bindGroup)
        ->SinonTool.createTwoArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
        ~createBindGroup=createBindGroupStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set

      DirectorCPTool.init(~handleSuccessFunc=() => {
        let (cameraBuffer, cameraBufferData) = CameraCPTool.getCameraBufferData()
        (
          createBindGroupStubData
          ->SinonTool.getStub
          ->getCall(0, _)
          ->SinonTool.calledWithArg2(
            {
              "layout": layout,
              "entries": [
                Wonderjs.IWebGPUCoreDp.binding(
                  ~binding=0,
                  ~buffer=cameraBuffer->Wonderjs.UniformBufferVO.value,
                  ~offset=0,
                  ~size=cameraBufferData->Js.Typed_array.Float32Array.byteLength,
                  (),
                ),
              ],
            },
            device,
          ),
          PathTracingPassCPTool.getAllStaticBindGroupData()->ListSt.nth(1)->OptionSt.getExn,
        )->expect == (true, {setSlot: 1, bindGroup: bindGroup})
      }, ())
    })
    describe("create direction light bind group and add to po", () => {
      let _computeDirectionLightBufferSize = directionLightCount =>
        directionLightCount * (4 + 4) * Js.Typed_array.Float32Array._BYTES_PER_ELEMENT

      describe("build direction light buffer data", () => {
        describe("contract check", () => testPromise("should only has one direction light", () => {
            let ((device, _), _) = _prepare(sandbox)
            SceneGraphRepoDependencyTool.build(
              ~sandbox,
              ~directionLightRepo=DirectionLightTool.buildDirectionLightRepoWithTwoDirectionLights(
                sandbox,
              )->SceneGraphRepoDependencyTool.getRepo,
              (),
            )->SceneGraphRepoDependencyTool.set

            ExpectStreamTool.toFail(
              ~execFunc=DirectorCPTool.init,
              ~message="expect only has one direction light",
            )
          }))

        testPromise("create buffer", () => {
          let ((device, _), _) = _prepare(sandbox)
          let directionLightCount = 1
          let buffer = WebGPUDependencyTool.createBufferObject()
          let createBufferStubData =
            createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->onCall(0, _)
            ->SinonTool.returns(buffer)
            ->SinonTool.createTwoArgsEmptyStubData
          let copy_dst = 2
          let storage = 3
          let setSubFloat32DataStubData =
            createEmptyStub(
              refJsObjToSandbox(sandbox.contents),
            )->SinonTool.createThreeArgsEmptyStubData
          WebGPUDependencyTool.build(
            ~sandbox,
            ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
            ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
            ~storage_bufferUsage=storage,
            ~copy_dst_bufferUsage=copy_dst,
            (),
          )->WebGPUDependencyTool.set

          DirectorCPTool.init(~handleSuccessFunc=() =>
            (
              createBufferStubData
              ->SinonTool.getStub
              ->SinonTool.calledWithArg2(
                {
                  "size": directionLightCount->_computeDirectionLightBufferSize,
                  "usage": lor(copy_dst, storage),
                },
                device,
              ),
              setSubFloat32DataStubData
              ->SinonTool.getStub
              ->getCall(0, _)
              ->getArgs
              ->ListSt.nth(2)
              ->OptionSt.getExn,
            )->expect == (true, buffer)
          , ())
        })

        describe("set buffer's data", () => testPromise("test buffer's data", () => {
            let ((device, _), (light, (color, intensity, direction))) = _prepare(sandbox)
            let (device, _) = _prepare(sandbox)
            let createBufferStubData =
              createEmptyStub(
                refJsObjToSandbox(sandbox.contents),
              )->SinonTool.createTwoArgsEmptyStubData
            let setSubFloat32DataStubData =
              createEmptyStub(
                refJsObjToSandbox(sandbox.contents),
              )->SinonTool.createThreeArgsEmptyStubData
            WebGPUDependencyTool.build(
              ~sandbox,
              ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
              ~setSubFloat32Data=setSubFloat32DataStubData->SinonTool.getDpFunc,
              (),
            )->WebGPUDependencyTool.set

            DirectorCPTool.init(~handleSuccessFunc=() => {
              let typeArr =
                setSubFloat32DataStubData
                ->SinonTool.getStub
                ->getCall(0, _)
                ->getArgs
                ->ListSt.nth(1)
                ->OptionSt.getExn
              let (x, y, z) = direction
              typeArr->TypeArrayCPTool.Float32Array.slice(0, 10)->expect ==
                Js.Typed_array.Float32Array.make([intensity, 0., 0., 0., x, y, z, 0.])
            }, ())
          }))
      })
      testPromise("create direction light bind group and add to po", () => {
        let ((device, _), _) = _prepare(sandbox)
        let directionLightCount = 1
        let buffer = WebGPUDependencyTool.createBufferObject()
        let createBufferStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->onCall(0, _)
          ->SinonTool.returns(buffer)
          ->SinonTool.createTwoArgsEmptyStubData
        let layout = WebGPUDependencyTool.createBindGroupLayoutObject()
        let createBindGroupLayoutStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->onCall(1, _)
          ->SinonTool.returns(layout)
          ->SinonTool.createTwoArgsEmptyStubData
        let bindGroup = WebGPUDependencyTool.createBindGroupObject()
        let createBindGroupStubData =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->onCall(1, _)
          ->SinonTool.returns(bindGroup)
          ->SinonTool.createTwoArgsEmptyStubData
        WebGPUDependencyTool.build(
          ~sandbox,
          ~createBuffer=createBufferStubData->SinonTool.getDpFunc,
          ~createBindGroupLayout=createBindGroupLayoutStubData->SinonTool.getDpFunc,
          ~createBindGroup=createBindGroupStubData->SinonTool.getDpFunc,
          (),
        )->WebGPUDependencyTool.set
        DirectorCPTool.init(~handleSuccessFunc=() =>
          (
            createBindGroupStubData
            ->SinonTool.getStub
            ->getCall(1, _)
            ->SinonTool.calledWithArg2(
              {
                "layout": layout,
                "entries": [
                  Wonderjs.IWebGPUCoreDp.binding(
                    ~binding=0,
                    ~buffer,
                    ~offset=0,
                    ~size=directionLightCount->_computeDirectionLightBufferSize,
                    (),
                  ),
                ],
              },
              device,
            ),
            PathTracingPassCPTool.getAllStaticBindGroupData()->ListSt.nth(0)->OptionSt.getExn,
          )->expect == (true, {setSlot: 2, bindGroup: bindGroup})
        , ())
      })
    })
  })
})
