open Wonder_jest;

let _ =
  describe(
    "test init_state job",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "set gl state",
        () => {
          describe(
            "set side to FRONT",
            () => {
              let _exec = (state) => {
                let enable = createEmptyStubWithJsObjSandbox(sandbox);
                let getCullFace = 1;
                let back = 2;
                let cullFace = createEmptyStubWithJsObjSandbox(sandbox);
                let state =
                  state^
                  |> FakeGlTool.setFakeGl(
                       FakeGlTool.buildFakeGl(
                         ~sandbox,
                         ~enable,
                         ~getCullFace,
                         ~back,
                         ~cullFace,
                         ()
                       )
                     );
                let state = InitStateJobTool.exec(state);
                (state, (enable, cullFace), (getCullFace, back))
              };
              test(
                "enable cull face",
                () => {
                  let (state, (enable, cullFace), (getCullFace, back)) = _exec(state);
                  enable |> expect |> toCalledWith([|getCullFace|])
                }
              );
              test(
                "cull back face",
                () => {
                  let (state, (enable, cullFace), (getCullFace, back)) = _exec(state);
                  cullFace |> expect |> toCalledWith([|back|])
                }
              )
            }
          );
          test(
            "enable depth test",
            () => {
              let enable = createEmptyStubWithJsObjSandbox(sandbox);
              let getDepthTest = 1;
              let state =
                state^
                |> FakeGlTool.setFakeGl(
                     FakeGlTool.buildFakeGl(~sandbox, ~enable, ~getDepthTest, ())
                   );
              let state = InitStateJobTool.exec(state);
              enable |> expect |> toCalledWith([|getDepthTest|])
            }
          )
        }
      )
    }
  );