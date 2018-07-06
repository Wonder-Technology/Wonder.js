type htmlElement;

type imageElement = {
  .
  "width": int,
  "height": int,
};

type body;

type document = {. "body": body};

external htmlElementToJsObj : htmlElement => Js.t({..}) = "%identity";

external jsObjToHtmlElement : Js.t({..}) => htmlElement = "%identity";