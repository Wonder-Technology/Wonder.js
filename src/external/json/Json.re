/*!
  changed from @glennsl/bs-json
  */
module Decode = Json_decode;

module Encode = Json_encode;

exception ParseError(string);

let parse = s =>
  try (Some(Js.Json.parseExn(s))) {
  | _ => None
  };

let parseOrRaise = s =>
  try (Js.Json.parseExn(s)) {
  | Js.Exn.Error(e) =>
    let message =
      switch (Js.Exn.message(e)) {
      | Some(m) => m
      | None => "Unknown error"
      };
    raise @@ ParseError(message);
  };

[@bs.val] external stringify : Js.Json.t => string = "JSON.stringify";