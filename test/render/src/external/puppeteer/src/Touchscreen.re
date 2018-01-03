type t;

[@bs.send.pipe : t] external tap : (~x: float, ~y: float) => Js.Promise.t(unit) = "";
