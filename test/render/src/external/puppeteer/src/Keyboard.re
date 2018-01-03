type t;

[@bs.send.pipe : t]
external down : (string, ~options: Js.Dict.t(string)=?, unit) => Js.Promise.t(unit) =
  "";

[@bs.send.pipe : t] external sendCharacter : string => Js.Promise.t(unit) = "";

[@bs.send.pipe : t] external up : string => Js.Promise.t(unit) = "";
