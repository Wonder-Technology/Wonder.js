open Js.Typed_array;

module WAB = {
  open WABType;

  let _readHeader = dataView => {
    let (jsonByteLength, byteOffset) =
      DataViewCommon.getUint32_1(. 0, dataView);

    (byteOffset, jsonByteLength);
  };

  let _getJsonStr = (jsonByteLength, wab) => {
    let decoder = TextDecoder.newTextDecoder("utf-8");

    decoder
    |> TextDecoder.decodeUint8Array(
         Uint8Array.fromBufferRange(
           wab,
           ~offset=GenerateWABUtils.getHeaderTotalByteLength(),
           ~length=jsonByteLength,
         ),
       );
  };

  let parseManifest = wab: manifest => {
    let dataView = DataViewCommon.create(wab);

    let (byteOffset, jsonByteLength) = _readHeader(dataView);

    let jsonStr = _getJsonStr(jsonByteLength, wab);

    jsonStr |> Js.Json.parseExn |> Obj.magic;
  };

  let getWholeHashIdMap = ({wholeHashIdMap}) => wholeHashIdMap;

  let getWholeDependencyRelationMap = ({wholeDependencyRelationMap}) => wholeDependencyRelationMap;

  let unsafeGetHashId = (abRelativePath, {wholeHashIdMap}) =>
    wholeHashIdMap
    |> WonderCommonlib.ImmutableHashMapService.unsafeGet(abRelativePath);
};

module RAB = {
  let parseManifest = rab: RABType.manifest => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, manifestJsonByteLength, contentBufferByteLength) =
      GenerateManifestABUtils.RABAndSAB.readHeader(dataView);

    GenerateManifestABUtils.RABAndSAB.getManifest(manifestJsonByteLength, rab)
    |> Js.Json.parseExn
    |> Obj.magic;
  };
};

module SAB = {
  let parseManifest = sab: SABType.manifest => {
    let dataView = DataViewCommon.create(sab);

    let (byteOffset, manifestJsonByteLength, contentBufferByteLength) =
      GenerateManifestABUtils.RABAndSAB.readHeader(dataView);

    GenerateManifestABUtils.RABAndSAB.getManifest(manifestJsonByteLength, sab)
    |> Js.Json.parseExn
    |> Obj.magic;
  };
};