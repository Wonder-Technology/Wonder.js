open MainConfigType;

open Dom;

open DomUtils;

open Contract;

let _getCanvasId (domId: string) =>
  String.contains domId '#' ?
    domId :
    {j|#$domId|j}
    |> ensureCheck (
         fun (id: string) =>
           test
             "dom id should start with '#'" (fun () => assertTrue (Js.Re.test id [%re "/#[^#]+/"]))
       );

let createCanvas {canvasId} => {
  let canvas =
    switch canvasId {
    | None =>
      buildDom "<canvas></canvas>"
      |> prependTo targetElement::(findFirstHtmlElement ::document "body")
    | Some canvasId =>
      switch (canvasId |> _getCanvasId |> findFirstHtmlElement ::document) {
      | None => failwith {j|canvas whose id is $canvasId should exist|j}
      | Some canvas => canvas
      }
    };
  canvas
};