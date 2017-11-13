open BasicMaterial;

open Wonder_jest;

let _ =
  describe(
    "BasicMaterial",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "createBasicMaterial",
        () =>
          test(
            "create a new material which is just index(int)",
            () => {
              let (_, material) = createBasicMaterial(state^);
              expect(material) == 0
            }
          )
      );
    }
  );