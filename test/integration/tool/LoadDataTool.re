open Js.Promise;

let load = (~jsonPathArr, ~fetchFunc, ~nextFunc=(record) => (), ()) =>
  MainStateTool.getStateData()
  |> LoaderManagerSystem.load(jsonPathArr, fetchFunc)
  |> Most.forEach(nextFunc);

let buildFakeFetchJsonResponse = (jsonStr) =>
  {"json": () => jsonStr |> Js.Json.parseExn |> Js.Promise.resolve} |> Js.Promise.resolve;