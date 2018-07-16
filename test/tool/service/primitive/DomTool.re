open WonderWebgl.DomExtendType;

open DomExtend;

open Sinon;

external documentToObj : document => obj = "%identity";

let getId = (dom: htmlElement) => htmlElementToJsObj(dom)##id;