open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

module All = {
  let _getHashId = [%bs.raw
    arrayBuffer => {|
    return crypto.subtle.digest("SHA-256", arrayBuffer)
    .then(hash => {
      // here hash is an arrayBuffer, so we'll convert it to its hex version
      let result = '';
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
      }

      return result;
    });

    |}
  ];

  let buildManifestData =
      (dependencyRelation, (abRelativePath, arrayBuffer), buildManifestFunc) =>
    _getHashId(arrayBuffer)
    |> then_(hashId =>
         buildManifestFunc(
           hashId,
           dependencyRelation
           |> WonderCommonlib.ImmutableHashMapService.get(abRelativePath)
           |> Js.Option.getWithDefault(
                WonderCommonlib.ArrayService.createEmpty(),
              ),
         )
         |> resolve
       )
    |> Most.fromPromise;

  let _writeBuffer =
      (headerAndManifestJsonAlignedByteOffset, buffer, wholeArrayBuffer) => {
    let uint8Array = Uint8Array.fromBuffer(wholeArrayBuffer);

    let uint8Array =
      BufferUtils.mergeArrayBuffer(
        uint8Array,
        buffer,
        headerAndManifestJsonAlignedByteOffset,
      );

    uint8Array |> Uint8Array.buffer;
  };

  let generateAB =
      (bufferTotalAlignedByteLength, manifestJsonUint8Array, buffer) => {
    let (
      manifestJsonByteLength,
      manifestJsonAlignedByteLength,
      totalByteLength,
    ) =
      GenerateABUtils.computeByteLength(
        bufferTotalAlignedByteLength,
        manifestJsonUint8Array,
      );

    let ab = ArrayBuffer.make(totalByteLength);
    let dataView = DataViewCommon.create(ab);

    let byteOffset =
      GenerateABUtils.writeHeader(
        manifestJsonByteLength,
        bufferTotalAlignedByteLength,
        dataView,
      );

    let emptyEncodedUint8Data = GenerateABUtils.getEmptyEncodedUint8Data();

    let (byteOffset, _, dataView) =
      GenerateABUtils.writeJson(
        byteOffset,
        (
          emptyEncodedUint8Data,
          manifestJsonAlignedByteLength,
          manifestJsonUint8Array,
        ),
        dataView,
      );

    _writeBuffer(byteOffset, buffer, dataView |> DataView.buffer);
  };
};

module SAB = {
  let addManifestData = (dependencyRelation, (sabRelativePath, sab)) => {
    let manifestJsonUint8Array =
      All.buildManifestData(
        dependencyRelation,
        (sabRelativePath, sab),
        (hashId, dependencyRelation) =>
        ({hashId, dependencyRelation}: SABType.manifest)
      )
      |> GenerateABUtils.buildJsonUint8Array;

    All.generateAB(
      BufferUtils.alignedLength(sab |> ArrayBuffer.byteLength),
      manifestJsonUint8Array,
      sab,
    );
  };
};

module RAB = {
  let addManifestData = (dependencyRelation, (rabRelativePath, rab)) => {
    let manifestJsonUint8Array =
      All.buildManifestData(
        dependencyRelation,
        (rabRelativePath, rab),
        (hashId, dependencyRelation) =>
        ({hashId, dependencyRelation}: RABType.manifest)
      )
      |> GenerateABUtils.buildJsonUint8Array;

    All.generateAB(
      BufferUtils.alignedLength(rab |> ArrayBuffer.byteLength),
      manifestJsonUint8Array,
      rab,
    );
  };
};

let addManifestData =
    (
      dependencyRelation: DependencyDataType.dependencyRelation,
      (sabDataArr, rabDataArr),
    ) => (
  sabDataArr
  |> Js.Array.map(data => SAB.addManifestData(dependencyRelation, data)),
  rabDataArr
  |> Js.Array.map(data => RAB.addManifestData(dependencyRelation, data)),
);