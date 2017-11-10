open Sinon;

open DomTool;

let buildFakeDomForNotPassCanvasId = (sandbox) => {
  let canvasDom = {
    "id": "a",
    "nodeType": 1,
    "getContext": createEmptyStub(refJsObjToSandbox(sandbox^))
  };
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
  (canvasDom, div, body)
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
