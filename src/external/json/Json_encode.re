type encoder('a) = 'a => Js.Json.t;

[@bs.val] external null : Js.Json.t = "";

external string : string => Js.Json.t = "%identity";

external float : float => Js.Json.t = "%identity";

external int : int => Js.Json.t = "%identity";

external dict : Js_dict.t(Js.Json.t) => Js.Json.t = "%identity";

external bool : bool => Js.Json.t = "%identity";

let char = c => c |> String.make(1) |> string;

let date = d => d |> Js.Date.toJSON |> string;

let nullable = encode =>
  fun
  | None => null
  | Some(v) => encode(v);

let withDefault = (d, encode) =>
  fun
  | None => d
  | Some(v) => encode(v);

let object_ = props : Js.Json.t => props |> Js.Dict.fromList |> dict;

external jsonArray : array(Js.Json.t) => Js.Json.t = "%identity";

let array = (encode, l) => l |> Array.map(encode) |> jsonArray;

let arrayOf = array;

let list = (encode, l) =>
  l |> List.map(encode) |> Array.of_list |> jsonArray;

let pair = (encodeA, encodeB, (a, b)) =>
  jsonArray([|encodeA(a), encodeB(b)|]);

let tuple2 = pair;

let tuple3 = (encodeA, encodeB, encodeC, (a, b, c)) =>
  jsonArray([|encodeA(a), encodeB(b), encodeC(c)|]);

let tuple4 = (encodeA, encodeB, encodeC, encodeD, (a, b, c, d)) =>
  jsonArray([|encodeA(a), encodeB(b), encodeC(c), encodeD(d)|]);

external stringArray : array(string) => Js.Json.t = "%identity";

external numberArray : array(float) => Js.Json.t = "%identity";

external boolArray : array(bool) => Js.Json.t = "%identity";

external intArray : array(int) => Js.Json.t = "%identity";