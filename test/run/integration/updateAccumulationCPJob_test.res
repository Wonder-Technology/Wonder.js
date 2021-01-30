open Wonder_jest

let _ = describe("test update_accumulation_pass job", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestCPTool.init(
      ~sandbox,
      ~renderPipelineData={
        name: "render",
        firstGroup: "frame",
        groups: list{
          {
            name: "frame",
            link: Concat,
            elements: list{{name: "update_accumulation_pass", type_: Job}},
          },
        },
      },
      (),
    )
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  testPromise("increase total sample count", () => {
    let sampleCount = 2
    DirectorCPTool.prepare(~sampleCount, ())
    let totalSampleCount = 10
    PassCPTool.setTotalSampleCount(totalSampleCount)

    DirectorCPTool.initAndRender(
      ~handleSuccessFunc=() =>
        PassCPTool.getTotalSampleCount()->expect == totalSampleCount + sampleCount,
      (),
    )
  })
})
