open Contract;

/* let regex_num = [%re "/^\\#([0-9a-f]{6})$/i"]; */
let regex_num = [%re {|/^\#([0-9a-f]{6})$/i|}];

/* todo is bucklescript support bit operation? */

let _getRFromHex: int => float = [%bs.raw
  {| function(hex) {
    return ( hex >> 16 & 255 ) / 255;
}
|}
];

let _getGFromHex: int => float = [%bs.raw
  {| function(hex) {
    return ( hex >> 8 & 255 ) / 255;
}
|}
];

let _getBFromHex: int => float = [%bs.raw {| function(hex) {
    return ( hex & 255 ) / 255;
}
|}];

let _getAFromHex: int => float = [%bs.raw {| function(hex) {
    return 1;
}
|}];

let convert16HexToRGBA = (hexStr: string) =>
  switch (regex_num |> Js.Re.exec(hexStr)) {
  | None => ExceptionHandlerSystem.throwMessage("color should be #xxxxxx")
  | Some(result) =>
    switch (Js.Nullable.to_opt(Js.Re.captures(result)[1])) {
    | None => ExceptionHandlerSystem.throwMessage("color should be #xxxxxx")
    | Some(result) =>
      let hex = Js.Math.floor(Number.parseInt(result, 16));
      (_getRFromHex(hex), _getGFromHex(hex), _getBFromHex(hex), _getAFromHex(hex))
    }
  };