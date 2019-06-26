let removeNewLines = str =>
  str |> Js.String.replaceByRe([%re {|/\n/img|}], "");

let removeSpaces = str => str |> Js.String.replaceByRe([%re {|/\s/img|}], "");

let removeNewLinesAndSpaces = str => str |> removeNewLines |> removeSpaces;