open Js.Promise;

open WonderBsMost.Most;

let createFetchJsonStream = (filePath, fetchFunc) =>
  fromPromise(fetchFunc(filePath) |> then_(Fetch.Response.json));

let createFetchArrayBufferStream = (filePath, fetchFunc) =>
  fromPromise(fetchFunc(filePath) |> then_(Fetch.Response.arrayBuffer));

let createFetchBlobStream = (filePath, fetchFunc) =>
  fromPromise(fetchFunc(filePath) |> then_(Fetch.Response.blob));

let isSupportStreamLoad = [%raw
  response => {|
        return !!response.body && !!response.body.getReader
      |}
];

let getReader = [%raw response => {|
  return response.body.getReader();
  |}];

let getContentLength = [%raw
  response => {|
  return response.headers.get("content-length");
  |}
];