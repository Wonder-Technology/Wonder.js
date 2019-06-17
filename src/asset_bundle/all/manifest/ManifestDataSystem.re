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

    /* let ab = ArrayBuffer.make(totalByteLength); */
    let dataView = DataViewCommon.create(ArrayBuffer.make(totalByteLength));

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
  let addManifestData = (dependencyRelation, (sabRelativePath, sab)) =>
    All.buildManifestData(
      dependencyRelation,
      (sabRelativePath, sab),
      (hashId, dependencyRelation) =>
      ({hashId, dependencyRelation}: SABType.manifest)
    )
    |> Most.map((manifestData: SABType.manifest) => {
         let manifestJsonUint8Array =
           manifestData |> GenerateABUtils.buildJsonUint8Array;

         (
           manifestData.hashId,
           sabRelativePath,
           All.generateAB(
             BufferUtils.alignedLength(sab |> ArrayBuffer.byteLength),
             manifestJsonUint8Array,
             sab,
           ),
         );
       });
};

module RAB = {
  let addManifestData = (dependencyRelation, (rabRelativePath, rab)) =>
    All.buildManifestData(
      dependencyRelation,
      (rabRelativePath, rab),
      (hashId, dependencyRelation) =>
      ({hashId, dependencyRelation}: RABType.manifest)
    )
    |> Most.map((manifestData: RABType.manifest) => {
         let manifestJsonUint8Array =
           manifestData |> GenerateABUtils.buildJsonUint8Array;

         (
           manifestData.hashId,
           rabRelativePath,
           All.generateAB(
             BufferUtils.alignedLength(rab |> ArrayBuffer.byteLength),
             manifestJsonUint8Array,
             rab,
           ),
         );
       });
};

let _addAllRABManifestData = (rabDataArr, dependencyRelation) =>
  rabDataArr
  |> Js.Array.map(data => RAB.addManifestData(dependencyRelation, data))
  |> Most.mergeArray
  |> Most.reduce(
       ((wholeHashIdMap, newRabDataArr), (hashId, rabRelativePath, rab)) => (
         wholeHashIdMap
         |> WonderCommonlib.ImmutableHashMapService.set(
              rabRelativePath,
              hashId,
            ),
         newRabDataArr |> ArrayService.push((rabRelativePath, rab)),
       ),
       (
         WonderCommonlib.ImmutableHashMapService.createEmpty(),
         WonderCommonlib.ArrayService.createEmpty(),
       ),
     );

let _addAllSABManifestData = (wholeHashIdMap, sabDataArr, dependencyRelation) =>
  sabDataArr
  |> Js.Array.map(data => SAB.addManifestData(dependencyRelation, data))
  |> Most.mergeArray
  |> Most.reduce(
       ((wholeHashIdMap, newSabDataArr), (hashId, sabRelativePath, sab)) => (
         wholeHashIdMap
         |> WonderCommonlib.ImmutableHashMapService.set(
              sabRelativePath,
              hashId,
            ),
         newSabDataArr |> ArrayService.push((sabRelativePath, sab)),
       ),
       (wholeHashIdMap, WonderCommonlib.ArrayService.createEmpty()),
     );

let addManifestData =
    (
      dependencyRelation: DependencyDataType.dependencyRelation,
      (sabDataArr, rabDataArr),
    ) => {
  let wholeHashIdMap = WonderCommonlib.ImmutableHashMapService.createEmpty();

  _addAllRABManifestData(rabDataArr, dependencyRelation)
  |> then_(((wholeHashIdMap, newRabDataArr)) =>
       _addAllSABManifestData(wholeHashIdMap, sabDataArr, dependencyRelation)
       |> then_(((wholeHashIdMap, newSabDataArr)) =>
            (wholeHashIdMap, newRabDataArr, newSabDataArr) |> resolve
          )
     )
  |> Most.fromPromise;
};