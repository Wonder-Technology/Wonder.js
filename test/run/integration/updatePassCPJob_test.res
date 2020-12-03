open Wonder_jest

let _ = describe("test update_pass job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

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
            elements: list{{name: "update_pass", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("update common buffer data", () => {
    let _prepare = () => {
      let device = WebGPUDependencyTool.createDeviceObject()
      WebGPUCPTool.setDevice(device)
      let window = WebGPUDependencyTool.createWindowObject()
      WebGPUCPTool.setWindow(window)

      PassCPTool.buildAndSetAllBufferData(window, device)
    }

    testPromise("set sample count to buffer data", () => {
      let _ = _prepare()
      let sampleCount = 2
      DirectorCPTool.prepare(~sampleCount, ())

      DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
        let (_, typeArr) = PassCPTool.getCommonBufferData()

        typeArr->Js.Typed_array.Uint32Array.unsafe_get(0)->expect == sampleCount
      }, ())
    })
    testPromise("set buffer's data", () => {
      let _ = _prepare()
      let setSubUint32DataStubData =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->SinonTool.createThreeArgsEmptyStubData
      WebGPUDependencyTool.build(
        ~sandbox,
        ~setSubUint32Data=setSubUint32DataStubData->SinonTool.getDpFunc,
        (),
      )->WebGPUDependencyTool.set
      DirectorCPTool.initAndUpdate(~handleSuccessFunc=() => {
        let (buffer, typeArr) = PassCPTool.getCommonBufferData()

        setSubUint32DataStubData
        ->SinonTool.getStub
        ->expect
        ->SinonTool.toCalledWith((0, typeArr, buffer->UniformBufferVO.value))
      }, ())
    })
  })
})
