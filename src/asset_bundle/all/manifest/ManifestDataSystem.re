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

  let buildManifestData = (wholeDependencyRelation, arrayBuffer) =>
    _getHashId(arrayBuffer)
    |> then_(hashId =>
         (
           {hashId, dependencyRelation: wholeDependencyRelation}: AllABType.manifest
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
  let addManifestData = (wholeDependencyRelation, sab) => {
    let manifestJsonUint8Array =
      All.buildManifestData(wholeDependencyRelation, sab)
      |> GenerateABUtils.buildJsonUint8Array;

    All.generateAB(
      BufferUtils.alignedLength(sab |> ArrayBuffer.byteLength),
      manifestJsonUint8Array,
      sab,
    );
  };
};

module RAB = {
  let addManifestData = (wholeDependencyRelation, rab) => {
    let manifestJsonUint8Array =
      All.buildManifestData(wholeDependencyRelation, rab)
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
      (sabArr, rabArr),
    ) => {
  let wholeDependencyRelation =
    FindDependencyDataSystem.calcWholeDependencyRelation(dependencyRelation);

  (
    sabArr
    |> Js.Array.map(sab => RAB.addManifestData(wholeDependencyRelation, sab)),
    rabArr
    |> Js.Array.map(rab => RAB.addManifestData(wholeDependencyRelation, rab)),
  );
};