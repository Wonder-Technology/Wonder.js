open Sinon;

open DomTool;

let addTransferControlToOffscreen = [%bs.raw
  {|
  function(canvas) {
    if(canvas.transferControlToOffscreen === undefined){
canvas.transferControlToOffscreen = function(){
  return {}
};
    }

    return canvas;
  }
  |}
];

let buildFakeCanvas = () => DomService.buildCanvas() |> addTransferControlToOffscreen;

let buildFakeDiv = (canvasDom) => {
  let div = DomService.buildDom("<div></div>");
  /* div##appendChild(canvasDom); */
  div
};

let buildFakeCanvasForNotPassCanvasId = (sandbox) => {
  let canvasDom = buildFakeCanvas();
  let div = buildFakeDiv(canvasDom);
  let body = {"prepend": createEmptyStub(refJsObjToSandbox(sandbox^)), "style": {"cssText": ""}};
  let createElementStub =
    createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "createElement");
  createElementStub |> withOneArg("div") |> returns(div) |> ignore;
  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(Dom.document), "querySelectorAll")
  |> withOneArg("body")
  |> returns([body])
  |> ignore
};