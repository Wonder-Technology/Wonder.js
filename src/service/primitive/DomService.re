open Dom;

let buildDom = (domStr: string) =>
  createElement(document, "div") |> setInnerHtml(~eleStr=domStr) |> getFirstChild;

let buildCanvas = () => createElement(document, "canvas") |> DomType.jsObjToHtmlElement;