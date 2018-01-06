/* let regex_num = [%re "/^\\#([0-9a-f]{6})$/i"]; */
let regex_num = [%re {|/^\#([0-9a-f]{6})$/i|}];

let convert16HexToRGBA = (hexStr: string) =>
  switch (regex_num |> Js.Re.exec(hexStr)) {
  | None => ExceptionHandleSystem.throwMessage("color should be #xxxxxx")
  | Some(result) =>
    switch (Js.Nullable.to_opt(Js.Re.captures(result)[1])) {
    | None => ExceptionHandleSystem.throwMessage("color should be #xxxxxx")
    | Some(result) =>
      let hex =
        Js.Math.floor
          /* Int32.to_float(Int32.of_string("0x111111")) ); */
          (NumberUtils.hexFloat_of_string(result));
      (
        float_of_int(hex lsr 16 land 255) /. 255.,
        float_of_int(hex lsr 8 land 255) /. 255.,
        float_of_int(hex land 255) /. 255.,
        1.
      )
    }
  };