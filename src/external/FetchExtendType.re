open Js.Typed_array;

type readableStream;

type controller = {
  .
  "close": unit => unit,
  "enqueue": Uint8Array.t => unit,
};

type readalbeStreamUnderlyingSource = {
  .
  "start": controller => Js.Promise.t(unit),
};

type streamData = {
  .
  "done": bool,
  "value": Uint8Array.t,
};

type reader = {. "read": unit => Js.Promise.t(streamData)};

type responseBody = {. "getReader": (. unit) => reader};