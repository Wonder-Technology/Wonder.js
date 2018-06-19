open Js.Promise;

open Most;

let createFetchJsonStream = (jsonFilePath, fetchFunc) =>
  fromPromise(fetchFunc(jsonFilePath) |> then_(Fetch.Response.json));