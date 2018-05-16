let testBindMap = (sandbox, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;
  let bindTexture = createEmptyStubWithJsObjSandbox(sandbox);
  let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~bindTexture, ()));
  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
  bindTexture |> expect |> toCalledOnce
};

let testUpdateMap = (sandbox, state) => {
  open Wonder_jest;
  open Expect;
  open Expect.Operators;
  open Sinon;
  let unpackFlipYWebgl = Obj.magic(2);
  let pixelStorei = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~unpackFlipYWebgl, ~pixelStorei, ()));
  let state = state |> RenderJobsTool.init |> DirectorTool.runWithDefaultTime;
  pixelStorei |> withOneArg(unpackFlipYWebgl) |> expect |> toCalledOnce
};