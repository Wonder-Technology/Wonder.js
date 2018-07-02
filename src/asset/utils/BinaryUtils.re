open Js.Typed_array;

let decode = (binary: ArrayBuffer.t, checkFunc) => {
  let dataView = DataViewCommon.create(binary);
  let dataView = checkFunc(dataView);
  let (jsonBufSize, _) = DataViewCommon.getUint32_1(. 12, dataView);
  let decoder = TextDecoder.newTextDecoder("utf-8");

  (
    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(binary, ~offset=20, ~length=jsonBufSize),
       ),
    binary |> ArrayBuffer.sliceFrom(jsonBufSize + 28),
  );
};

let alignedLength = (value: int) : int =>
  switch (value) {
  | 0 => value
  | value =>
    let alignValue = 4;

    switch (value mod alignValue) {
    | 0 => value
    | multiple => value + (alignValue - multiple)
    };
  };

let convertBase64ToBinary = [%raw
  dataURI => {|
    var BASE64_MARKER = ';base64,';

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
    |}
];

let _fatalBase64MimeType = base64Str =>
  WonderLog.Log.fatal(
    WonderLog.Log.buildFatalMessage(
      ~title="getBase64MimeType",
      ~description={j|should has mimeType data|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|base64Str: $base64Str|j},
    ),
  );

let getBase64MimeType = base64Str =>
  switch (
    [%re {|/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/g|}]
    |> Js.Re.exec(base64Str)
  ) {
  | None => _fatalBase64MimeType(base64Str)
  | Some(result) =>
    switch (Js.Nullable.to_opt(Js.Re.captures(result)[1])) {
    | None => _fatalBase64MimeType(base64Str)
    | Some(result) => result
    }
  };