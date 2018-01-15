open MainConfigType;

open Dom;

open DomUtils;

let _getCanvasId = (domId: string) =>
  String.contains(domId, '#') ?
    domId :
    {j|#$domId|j}
    |> WonderLog.Contract.ensureCheck(
         (id) =>
           WonderLog.(
             Contract.(
               Operators.(
                 test(
                   Log.buildAssertMessage(
                     ~expect={j|dom id start with '#'|j},
                     ~actual={j|is $domId|j}
                   ),
                   () => assertTrue(Js.Re.test(id, [%re "/#[^#]+/"]))
                 )
               )
             )
           ),
         StateData.stateData.isDebug
       );

let createCanvas = ({canvasId}) =>
  (
    switch canvasId {
    | None =>
      buildDom("<canvas></canvas>")
      |> prependTo(~targetElement=findFirstHtmlElement(~document, "body"))
    | Some(canvasId) =>
      switch (canvasId |> _getCanvasId |> findFirstHtmlElement(~document)) {
      | None => failwith({j|canvas whose id is $canvasId should exist|j})
      | Some(canvas) => canvas
      }
    }
  )
  |> Obj.magic;

let getFullScreenData = () => ViewSystem.getFullScreenData();

let setToFullScreen =
    ((x, y, width, height, styleWidth, styleHeight) as screenData, gl, canvas, state) => (
  state |> DeviceManagerSystem.setViewport(gl, (x, y, width, height)),
  ViewSystem.setToFullScreen(screenData, canvas)
);