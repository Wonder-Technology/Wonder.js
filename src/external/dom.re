type htmlElement;

/* type canvasElement; */
type document;

external document : document = "" [@@bs.val];

external createElement : document => string => Js.t {..} = "" [@@bs.send];

external querySelectorAll : document => string => option htmlElement =
  "" [@@bs.return null_to_opt] [@@bs.send];

external requestAnimationFrame : (float => unit) => unit = "" [@@bs.val];

external htmlElementToJsObj : htmlElement => Js.t {..} = "%identity";

/* external htmlElementToCanvasElement : htmlElement => canvasElement = "%identity"; */
external querySelectorAll : document => string => array htmlElement = "" [@@bs.send];

let findFirstHtmlElement document::(document: document) (str: string) :option htmlElement => {
  let elements = querySelectorAll document str;
  switch (Array.length elements) {
  | 0 => None
  | _ => Some elements.(0)
  }
};

let setInnerHtml eleStr::(eleStr: string) htmlElement => {
  htmlElement##innerHTML#=eleStr;
  htmlElement
};

let getFirstChild htmlElement => htmlElement##firstChild;

let _prepend (sourceElement: htmlElement) (targetElement: htmlElement) => {
  let targetEle = htmlElementToJsObj targetElement;
  switch (Js.toOption targetEle##prepend) {
  | None => targetEle##insertBefore sourceElement (getFirstChild targetEle)
  | _ => targetEle##prepend sourceElement
  }
};

let prependTo (sourceElement: htmlElement) targetElement::(targetElement: option htmlElement) =>
  switch targetElement {
  | None => failwith "targetElement should exist"
  | Some targetEle =>
    switch (htmlElementToJsObj sourceElement)##nodeType {
    | 1 =>
      _prepend sourceElement targetEle |> ignore;
      sourceElement
    | _ => sourceElement
    }
  };