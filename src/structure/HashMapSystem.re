open Contract;

external stringToJsUndefine : string => Js.undefined(string) = "%identity";

external jsUndefineToString : Js.undefined(string) => string = "%identity";

type t('a) = Js.Dict.t('a);

let createEmpty = () => Js.Dict.empty();

let set = (key: string, value, map) => {
  Js.Dict.set(map, key, value);
  map
};

let get = (key: string, map) => Js.Dict.get(map, key);

let unsafeGet = (key: string, map) => Js.Dict.unsafeGet(map, key);

let deleteVal = (key: string, map) => {
  requireCheck(
    () => test("val should exist", () => get(key, map) |> Js.Option.isSome |> assertTrue)
  );
  set(key, Js.Undefined.empty, map)
};

let length = (map) => Js.Array.length(Js.Dict.entries(map));

let fromList = Js.Dict.fromList;