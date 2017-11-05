open Contract;

/* let regex_num = [%re "/^\\#([0-9a-f]{6})$/i"]; */
let regex_num = [%re {|/^\#([0-9a-f]{6})$/i|}];

let convert16HexToRGBA = (hexStr: string) =>
  switch (regex_num |> Js.Re.exec(hexStr)) {
  | None => ExceptionHandlerSystem.throwMessage("color should be #xxxxxx")
  | Some(result) =>
    switch (Js.Nullable.to_opt(Js.Re.captures(result)[1])) {
    | None => ExceptionHandlerSystem.throwMessage("color should be #xxxxxx")
    | Some(result) =>
      let hex = Js.Math.floor(Number.parseInt(result, 16));
      (
        float_of_int(hex lsr 16 land 255) /. 255.,
        float_of_int(hex lsr 8 land 255) /. 255.,
        float_of_int(hex land 255) /. 255.,
        1.
      )
    }
  };