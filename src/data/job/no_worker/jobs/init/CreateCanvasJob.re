open Dom;

open DomUtils;

open CanvasConfigType;

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

let _createCanvas = ({canvasId}) =>
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

let execJob = (_, state) =>
  state |> ViewSystem.setCanvas(_createCanvas(CanvasConfigSystem.getConfig(state)));