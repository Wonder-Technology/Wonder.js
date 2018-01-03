type t;

[@bs.send.pipe : t] external close : Js.Promise.t(unit) = "";

[@bs.send.pipe : t] external newPage : Js.Promise.t(Page.t) = "";

[@bs.send.pipe : t] external version : Js.Promise.t(string) = "";

[@bs.send.pipe : t] external wsEndpoint : string = "";
