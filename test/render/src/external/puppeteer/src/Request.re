type t = RequestResponse.request;

type response = RequestResponse.response;

type headers = Js.Dict.t(string);

type httpMethod =
  | GET
  | POST
  | PATCH
  | PUT
  | DELETE
  | OPTIONS;

type resourceType =
  | Document
  | Stylesheet
  | Image
  | Media
  | Font
  | Script
  | TextTrack
  | XHR
  | Fetch
  | EventSource
  | WebSocket
  | Manifest
  | Other;

type overrides = {
  .
  url: Js.Nullable.t(string),
  method_: Js.Nullable.t(httpMethod),
  postData: Js.Nullable.t(string),
  headers: Js.Nullable.t(headers)
};

[@bs.send.pipe : t] external abort : Js.Promise.t(unit) = "";

[@bs.send.pipe : t] external continue : (~overrides: overrides=?, unit) => Js.Promise.t(unit) = "";

[@bs.val] external headers : headers = "";

[@bs.val] external method_ : httpMethod = "";

[@bs.val] external postData : string = ""; /* TODO: or undefined */

[@bs.val] external resourceType : resourceType = "";

[@bs.get] external response : t => Js.Nullable.t(response) = "";

[@bs.val] external url : string = "";
