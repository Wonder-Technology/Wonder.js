open Js.Promise;

open WonderBsMost.Most;

let createFetchJsonStream = (filePath, fetchFunc) =>
  fromPromise(fetchFunc(filePath) |> then_(Fetch.Response.json));

let createFetchArrayBufferStream = (filePath, fetchFunc) =>
  fromPromise(fetchFunc(filePath) |> then_(Fetch.Response.arrayBuffer));