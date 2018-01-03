type t = RequestResponse.response;

type request = RequestResponse.request;

[@bs.get] external buffer : t => Js.Promise.t(Buffer.t) = "";

[@bs.get] external ok : t => bool = "";

[@bs.get] external headers : t => Js.Dict.t(string) = "";

[@bs.get] external request : t => request = "";

[@bs.get] external status : t => int = "";

[@bs.send.pipe : t] external text : Js.Promise.t(string) = "";

[@bs.get] external url : t => string = "";

[@bs.get] external json : t => Js.Promise.t(Js.Json.t) = "";
