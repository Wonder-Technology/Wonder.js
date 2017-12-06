open Sinon;

open DomTool;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = (sandbox) => {
  "VERTEX_SHADER": 0,
  "FRAGMENT_SHADER": 1,
  "HIGH_FLOAT": 2,
  "MEDIUM_FLOAT": 3,
  "getShaderPrecisionFormat":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns({"precision": 1}),
  "getExtension": createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(0))
};

let buildFakeDomForNotPassCanvasId = (sandbox) => {
  let fakeGl = buildFakeGl(sandbox);
  let canvasDom = {"id": "a", "nodeType": 1, "getContext": createGetContextStub(fakeGl, sandbox)};
  let div = {"innerHTML": "", "firstChild": canvasDom};
  let body = {"prepend": createEmptyStub(refJsObjToSandbox(sandbox^))};
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "createElement")
  |> withOneArg("div")
  |> returns(div)
  |> ignore;
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "querySelectorAll")
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  (canvasDom, fakeGl, div, body)
};

let buildMainConfig =
    (
      ~bufferConfig=Js.Nullable.undefined,
      ~canvasId=Js.Nullable.undefined,
      ~isTest=Js.Nullable.undefined,
      ~contextConfig=Js.Nullable.undefined,
      ()
    ) => {
  "bufferConfig": bufferConfig,
  "canvasId": canvasId,
  "isTest": isTest,
  "contextConfig": contextConfig
};