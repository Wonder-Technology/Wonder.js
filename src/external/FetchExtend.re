open FetchExtendType;

[@bs.new]
external newResponse : readableStream => Fetch.Response.t = "Response";

[@bs.new]
external newReadableStream : readalbeStreamUnderlyingSource => readableStream =
  "ReadableStream";

[@bs.get] external body : Fetch.Response.t => responseBody = "";

let isDone = [%raw streamData => {|
    return streamData.done;
    |}];