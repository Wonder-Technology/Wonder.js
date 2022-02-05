open EventType

open Wonder_jest

let _ = describe("BrowserAPI", () => {
  open Expect
  open Expect.Operators
  open Sinon

  let sandbox = getSandboxDefaultVal()

  beforeEach(() => {
    sandbox := createSandbox()
    TestTool.preparePO()
  })
  afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox.contents)))

  describe("setBrowser", () => {
    test("set browser", () => {
      Main.setBrowser(BrowserType.IOS)

      ContainerManager.getPO()->BrowserDoService.getBrowser->expect == BrowserType.IOS
    })
  })
})
