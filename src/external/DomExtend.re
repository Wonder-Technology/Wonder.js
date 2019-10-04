open WonderWebgl.DomExtendType;

[@bs.val] external document : document = "";

[@bs.send] external createElement : (document, string) => Js.t({..}) = "";

[@bs.val] external requestAnimationFrame : (float => unit) => int = "";

[@bs.send]
external querySelectorAll : (document, string) => array(htmlElement) = "";

let findFirstHtmlElement =
    (~document: document, str: string)
    : option(htmlElement) => {
  let elements = querySelectorAll(document, str);
  switch (Array.length(elements)) {
  | 0 => None
  | _ => Some(elements[0])
  };
};

let setInnerHtml = (~eleStr: string, htmlElement) => {
  htmlElement##innerHTML#=eleStr;
  htmlElement;
};

let getFirstChild = htmlElement => htmlElement##firstChild;

let _prepend = (sourceElement: htmlElement, targetElement: htmlElement) => {
  let targetEle = htmlElementToJsObj(targetElement);
  switch (Js.toOption(targetEle##prepend)) {
  | None => targetEle##insertBefore(sourceElement, getFirstChild(targetEle))
  | _ => targetEle##prepend(sourceElement)
  };
};

let prependTo =
    (sourceElement: htmlElement, ~targetElement: option(htmlElement)) =>
  switch (targetElement) {
  | None => failwith("targetElement should exist")
  | Some(targetEle) =>
    let jsObj = htmlElementToJsObj(sourceElement);
    switch (jsObj##nodeType) {
    | 1 =>
      _prepend(sourceElement, targetEle) |> ignore;
      sourceElement;
    | _ => sourceElement
    };
  };

let setBatchStyle = (element: htmlElement, cssText: string) => {
  htmlElementToJsObj(element)##style##cssText#=cssText;
  element;
};

let requestPointerLock = [%raw
  element => {|
  element.requestPointerLock();
  |}
];

let exitPointerLock = [%raw (param) => {|
  document.exitPointerLock();
  |}];