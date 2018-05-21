type htmlElement;

type imageElement = {. "width": int, "height": int};

type document;

external htmlElementToJsObj : htmlElement => Js.t({..}) = "%identity";

external jsObjToHtmlElement : Js.t({..}) => htmlElement = "%identity";