let createEmpty () => {
    Js.Dict.empty();
};

let set map ( key:string ) value => {
    Js.Dict.set map key value;
};

let get map (key:string) => {
    Js.Dict.get map key;
};

let unsafeGet map (key:string) => {
    Js.Dict.unsafeGet map key;
};

