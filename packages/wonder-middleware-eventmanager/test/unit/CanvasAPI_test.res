open EventType

open Wonder_jest

let _ = describe("CanvasAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.preparePO()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("setCanvas", () => {
    test("set canvas", () => {
      let canvas = Obj.magic(2)

      CanvasAPI.setCanvas(canvas)

      ContainerManager.getPO()->CanvasDoService.getCanvas->expect == canvas
    })
  })
})
