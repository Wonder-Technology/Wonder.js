type t;

type serializable = Js.Json.t;

[@bs.val] external select : (~selector: string) => Js.Promise.t(ElementHandle.t) = "$";

[@bs.val] external selectAll : (~selector: string) => Js.Promise.t(array(ElementHandle.t)) = "$$";

type selectorOptions = {. "visibile": bool, "timeout": float};

[@bs.send.pipe : t]
external waitForSelector : (string, ~options: selectorOptions=?, unit) => Js.Promise.t(unit) =
  "";
/*
 $eval(
   selector: string,
   fn: (...args: Array<Serializable | ElementHandle>) => void
 ): Promise<Serializable>; */
/* external $eval : selector::string => (fn::fun ...args : array serializable => unit) => promise serializable = "$eval" [@@bs.val]; */
