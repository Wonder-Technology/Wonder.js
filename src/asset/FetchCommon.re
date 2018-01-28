open Js.Promise;

open Most;

let createFetchJsonStream = (jsonFilePath, fetchFunc) =>
  fromPromise([@bs] fetchFunc(jsonFilePath) |> then_(Fetch.Response.json));