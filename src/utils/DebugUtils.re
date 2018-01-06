[@bs.val] [@bs.scope "console"] external trace : 'a => unit = "trace";

external anyToJsJsonT : 'a => Js.Json.t = "%identity";

let trace = (param) => {
  trace(param) |> ignore;
  param
};

let traceJson = (param) => {
  trace(Js.Json.stringify(anyToJsJsonT(param))) |> ignore;
  param
};

let log = (param) => {
  Js.log(param) |> ignore;
  param
};

let logJson = (param) => {
  Js.log(Js.Json.stringify(anyToJsJsonT(param))) |> ignore;
  param
};
