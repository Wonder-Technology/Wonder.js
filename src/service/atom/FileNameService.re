let getFileExtName = fileName =>
  switch ([%re {|/^.*(\.\w+)$/|}] |> Js.Re.exec(fileName)) {
  | None => None
  | Some(result) =>
    let resultArr = Js.Re.matches(result);

    resultArr[1] |. Some;
  };