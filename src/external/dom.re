type htmlElement;

type document;

external document : document = "" [@@bs.val];

external createElement : document => string => Js.t {..} = "" [@@bs.send];

external querySelectorAll : document => string => option (Js.t {..}) =
  "" [@@bs.return null_to_opt] [@@bs.send];

external requestAnimationFrame : (float => unit) => unit = "" [@@bs.val];

let setInnerHtml eleStr::(eleStr: string) htmlElement => {
  htmlElement##innerHTML#=eleStr;
  htmlElement
};

let getFirstChild htmlElement  => htmlElement##firstChild;

let prependTo sourceElement targetElement::(targetElement: option (Js.t {..})) =>
  switch targetElement {
  | None => failwith "targetElement should exist"
  | Some targetEle =>
    switch sourceElement##nodeType {
    | 1 =>
      targetEle##prepend sourceElement;
      sourceElement
    | _ => sourceElement
    }
  };