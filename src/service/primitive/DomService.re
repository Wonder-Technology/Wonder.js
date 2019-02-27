open DomExtend;

let buildDom = (domStr: string) =>
  createElement(document, "div")
  |> setInnerHtml(~eleStr=domStr)
  |> getFirstChild;

let buildCanvas =
  (.) =>
    createElement(document, "canvas")
    |> WonderWebgl.DomExtendType.jsObjToHtmlElement;