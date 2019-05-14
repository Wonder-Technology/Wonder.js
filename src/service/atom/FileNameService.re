let getFileExtName = str =>
  switch ([%re {|/^.*(\.\w+)$/|}] |> Js.Re.exec(str)) {
  | None => None
  | Some(result) =>
    let resultArr = Js.Re.matches(result);

    resultArr[1]->Some;
  };