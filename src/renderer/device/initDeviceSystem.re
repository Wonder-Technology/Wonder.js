open StateData;

open Dom;

open DomUtils;

open Contract;

let _getCanvasId (domId: string) =>
  String.contains domId '#' ?
    domId :
    {
      let r = Format.sprintf "#%s" domId;
      ensureCheck
        (
          fun (id: string) =>
            it
              "dom id should start with '#'"
              (fun () => assertTrue (Js.Re.test id [%re "/#[^#]+/"]))
        )
        r
    };

let createCanvas {mainConfigData} =>
  switch mainConfigData.canvasId {
  | None =>
    buildDom "<canvas></canvas>" |> prependTo targetElement::(querySelectorAll document "body")
  | Some canvasId =>
    switch (canvasId |> _getCanvasId |> querySelectorAll document) {
    | None => failwith (Format.sprintf "canvas whose id is %s should exist" canvasId)
    | Some canvas => canvas
    }
  };