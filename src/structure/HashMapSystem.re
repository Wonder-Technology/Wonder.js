let createEmpty () => {
    Js.Dict.empty();
};

let set map ( key:string ) value => {
    Js.Dict.set map key value;
    map;
};

let get map (key:string) => {
    Js.Dict.get map key;
};

