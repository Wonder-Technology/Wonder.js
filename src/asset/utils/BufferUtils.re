open Js.Typed_array;

let convertType = type_ =>
  switch (type_) {
  | "SCALAR" => WDType.SCALAR
  | "VEC2" => WDType.VEC2
  | "VEC3" => WDType.VEC3
  | "VEC4" => WDType.VEC4
  | "MAT2" => WDType.MAT2
  | "MAT3" => WDType.MAT3
  | "MAT4" => WDType.MAT4
  | type_ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="convertToAccessors",
        ~description={j|unknown type_:$type_|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let getAccessorTypeSize = (type_: WDType.accessorType) =>
  switch (type_) {
  | SCALAR => 1
  | VEC2 => 2
  | VEC3 => 3
  | VEC4 => 4
  | MAT2 => 4
  | MAT3 => 9
  | MAT4 => 16
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getAccessorTypeSize",
        ~description={j|unknown type_:$type_ |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let checkByteLengthShouldBeAligned = byteLength =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(
          ~expect={j|byteLength:$byteLength aligned with multiple of 4|j},
          ~actual={j|is $byteLength|j},
        ),
        () =>
        byteLength mod 4 == 0
      )
    )
  );

let copyUint8ArrayToArrayBuffer =
    (
      byteOffset,
      (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
      dataView,
    ) => {
  let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength;
  let byteOffset = ref(byteOffset);
  let uint8ArrayByteLength = uint8Array |> Uint8Array.length;

  for (i in 0 to uint8ArrayAlignedByteLength - 1) {
    let value =
      if (i >= uint8ArrayByteLength) {
        emptyUint8Data;
      } else {
        TypeArrayService.getUint8_1(i, uint8Array);
      };

    byteOffset := DataViewCommon.writeUint8_1(. value, byteOffset^, dataView);
  };

  (resultByteOffset, uint8Array, dataView);
};

let computeTypeArrayLengthByAccessorData = (count, type_) =>
  count * getAccessorTypeSize(type_);

let computeByteLengthByAccessorData = (count, componentType, type_) =>
  computeTypeArrayLengthByAccessorData(count, type_)
  * (
    switch (componentType) {
    | 5120 => 1
    | 5121 => 1
    | 5122 => 2
    | 5123 => 2
    | 5125 => 4
    | 5126 => 4
    | componentType =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="computeByteLengthByAccessorData",
          ~description={j|unknown componentType: $componentType|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )
    }
  );

let getHeaderByteLength = () => 12;

let getGLBChunkHeaderByteLength = () => 8;

let getWDBChunkHeaderByteLength = () => 4;

let getWDBHeaderTotalByteLength = () =>
  getHeaderByteLength() + getWDBChunkHeaderByteLength() * 3;

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

/* let getWDBChunkBufferByteLength = chunkActualByteLength =>
   chunkActualByteLength |> alignedLength; */

let _removeAlignedEmptyChars = decodedStr => decodedStr |> Js.String.trim;

let decodeGLB = (binary: ArrayBuffer.t, checkFunc) => {
  let dataView = DataViewCommon.create(binary);
  let dataView = checkFunc(dataView);
  let (jsonChunkLength, _) =
    DataViewCommon.getUint32_1(. getHeaderByteLength(), dataView);
  let decoder = TextDecoder.newTextDecoder("utf-8");

  (
    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(
           binary,
           ~offset=getHeaderByteLength() + getGLBChunkHeaderByteLength(),
           ~length=jsonChunkLength,
         ),
       )
    |> _removeAlignedEmptyChars,
    binary
    |> ArrayBuffer.sliceFrom(
         getHeaderByteLength()
         + getGLBChunkHeaderByteLength()
         + jsonChunkLength
         + getGLBChunkHeaderByteLength(),
       ),
  );
};

let getWDBJsonChunkStr = (jsonChunkLength, binary) => {
  let decoder = TextDecoder.newTextDecoder("utf-8");

  decoder
  |> TextDecoder.decodeUint8Array(
       Uint8Array.fromBufferRange(
         binary,
         ~offset=getWDBHeaderTotalByteLength(),
         ~length=jsonChunkLength,
       ),
     );
};

let decodeWDB = (binary: ArrayBuffer.t, checkFunc) => {
  let dataView = DataViewCommon.create(binary);
  let dataView = checkFunc(dataView);

  let (jsonChunkLength, _) =
    DataViewCommon.getUint32_1(. getHeaderByteLength(), dataView);

  let (streamChunkLength, _) =
    DataViewCommon.getUint32_1(.
      getHeaderByteLength() + getWDBChunkHeaderByteLength(),
      dataView,
    );

  (
    getWDBJsonChunkStr(jsonChunkLength, binary),
    binary
    |> ArrayBuffer.slice(
         ~start=
           getWDBHeaderTotalByteLength() + jsonChunkLength |> alignedLength,
         ~end_=
           getWDBHeaderTotalByteLength() + jsonChunkLength + streamChunkLength,
       ),
    binary
    |> ArrayBuffer.sliceFrom(
         getWDBHeaderTotalByteLength()
         + (jsonChunkLength |> alignedLength)
         + (streamChunkLength |> alignedLength),
       ),
  );
};

let convertBase64ToBinary = [%raw
  dataURI => {|
    var BASE64_MARKER = ';base64,';

    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(var i = 0; i < rawLength; i++) {
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

let unsafeGetAccessorByteOffset = ({byteOffset}: GLTFType.accessor) =>
  switch (byteOffset) {
  | None => 0
  | Some(byteOffset) => byteOffset
  };

let unsafeGetBufferViewByteOffset = ({byteOffset}: GLTFType.bufferView) =>
  switch (byteOffset) {
  | None => 0
  | Some(byteOffset) => byteOffset
  };

let mergeUint8Array = (sourceUint8Array, targetUint8Array, offset) => {
  sourceUint8Array
  |> Uint8Array.setArrayOffset(targetUint8Array |> Obj.magic, offset);

  sourceUint8Array;
};