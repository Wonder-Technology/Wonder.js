open Dom;

open DomService;

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
         IsDebugMainService.getIsDebug(StateDataMain.stateData)
       );

let createCanvas = (canvasId) =>
  (
    switch canvasId {
    | None => buildCanvas() |> prependTo(~targetElement=findFirstHtmlElement(~document, "body"))
    | Some(canvasId) =>
      switch (canvasId |> _getCanvasId |> findFirstHtmlElement(~document)) {
      | None => failwith({j|canvas whose id is $canvasId should exist|j})
      | Some(canvas) => canvas
      }
    }
  )
  |> Obj.magic;