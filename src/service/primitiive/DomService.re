open Dom;

let buildDom = (domStr: string) =>
  createElement(document, "div") |> setInnerHtml(~eleStr=domStr) |> getFirstChild;
