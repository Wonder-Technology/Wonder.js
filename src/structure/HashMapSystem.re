external stringToJsUndefine : string => Js.undefined string = "%identity";

external jsUndefineToString : Js.undefined string => string = "%identity";

let createEmpty () => Js.Dict.empty ();

let set map (key: string) value => Js.Dict.set map key value;

let get map (key: string) => Js.Dict.get map key;

let unsafeGet map (key: string) => Js.Dict.unsafeGet map key;

let deleteVal map (key: string) => set map key Js.Undefined.empty;