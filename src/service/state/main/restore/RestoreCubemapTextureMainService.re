open StateDataMainType;

open CubemapTextureType;

let _restoreTypeArrays = (currentTextureRecord, targetTextureRecord) =>
  currentTextureRecord.wrapSs === targetTextureRecord.wrapSs
  && currentTextureRecord.wrapTs === targetTextureRecord.wrapTs
  && currentTextureRecord.magFilters === targetTextureRecord.magFilters
  && currentTextureRecord.minFilters === targetTextureRecord.minFilters
  && currentTextureRecord.pxFormats === targetTextureRecord.pxFormats
  && currentTextureRecord.nxFormats === targetTextureRecord.nxFormats
  && currentTextureRecord.pyFormats === targetTextureRecord.pyFormats
  && currentTextureRecord.nyFormats === targetTextureRecord.nyFormats
  && currentTextureRecord.pzFormats === targetTextureRecord.pzFormats
  && currentTextureRecord.nzFormats === targetTextureRecord.nzFormats
  && currentTextureRecord.pxTypes === targetTextureRecord.pxTypes
  && currentTextureRecord.nxTypes === targetTextureRecord.nxTypes
  && currentTextureRecord.pyTypes === targetTextureRecord.pyTypes
  && currentTextureRecord.nyTypes === targetTextureRecord.nyTypes
  && currentTextureRecord.pzTypes === targetTextureRecord.pzTypes
  && currentTextureRecord.nzTypes === targetTextureRecord.nzTypes
  && currentTextureRecord.isNeedUpdates === targetTextureRecord.isNeedUpdates
  && currentTextureRecord.flipYs === targetTextureRecord.flipYs ?
    (currentTextureRecord, targetTextureRecord) :
    {
      let (
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        pxFormats,
        nxFormats,
        pyFormats,
        nyFormats,
        pzFormats,
        nzFormats,
        pxTypes,
        nxTypes,
        pyTypes,
        nyTypes,
        pzTypes,
        nzTypes,
        isNeedUpdates,
        flipYs,
      ) =
        (
          currentTextureRecord.wrapSs,
          currentTextureRecord.wrapTs,
          currentTextureRecord.magFilters,
          currentTextureRecord.minFilters,
          currentTextureRecord.pxFormats,
          currentTextureRecord.nxFormats,
          currentTextureRecord.pyFormats,
          currentTextureRecord.nyFormats,
          currentTextureRecord.pzFormats,
          currentTextureRecord.nzFormats,
          currentTextureRecord.pxTypes,
          currentTextureRecord.nxTypes,
          currentTextureRecord.pyTypes,
          currentTextureRecord.nyTypes,
          currentTextureRecord.pzTypes,
          currentTextureRecord.nzTypes,
          currentTextureRecord.isNeedUpdates,
          currentTextureRecord.flipYs,
        )
        |> RecordCubemapTextureMainService.setAllTypeArrDataToDefault(
             currentTextureRecord.index,
           );
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.wrapSs, 0),
        (targetTextureRecord.wrapSs, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.wrapSs),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.wrapTs, 0),
        (targetTextureRecord.wrapTs, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.wrapTs),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.magFilters, 0),
        (targetTextureRecord.magFilters, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.magFilters),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.minFilters, 0),
        (targetTextureRecord.minFilters, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.minFilters),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pxFormats, 0),
        (targetTextureRecord.pxFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pxFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nxFormats, 0),
        (targetTextureRecord.nxFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nxFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pyFormats, 0),
        (targetTextureRecord.pyFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pyFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nyFormats, 0),
        (targetTextureRecord.nyFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nyFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pzFormats, 0),
        (targetTextureRecord.pzFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pzFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nzFormats, 0),
        (targetTextureRecord.nzFormats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nzFormats),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pxTypes, 0),
        (targetTextureRecord.pxTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pxTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nxTypes, 0),
        (targetTextureRecord.nxTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nxTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pyTypes, 0),
        (targetTextureRecord.pyTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pyTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nyTypes, 0),
        (targetTextureRecord.nyTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nyTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.pzTypes, 0),
        (targetTextureRecord.pzTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.pzTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.nzTypes, 0),
        (targetTextureRecord.nzTypes, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.nzTypes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.isNeedUpdates, 0),
        (targetTextureRecord.isNeedUpdates, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.isNeedUpdates),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.flipYs, 0),
        (targetTextureRecord.flipYs, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.flipYs),
      )
      |> ignore;
      (currentTextureRecord, targetTextureRecord);
    };

let restore = (currentState, targetState) => {
  let currentTextureRecord =
    RecordCubemapTextureMainService.getRecord(currentState);
  let targetTextureRecord =
    RecordCubemapTextureMainService.getRecord(targetState);
  let (currentTextureRecord, targetTextureRecord) =
    _restoreTypeArrays(currentTextureRecord, targetTextureRecord);
  {
    ...targetState,
    cubemapTextureRecord:
      Some({
        ...targetTextureRecord,
        wrapSs: currentTextureRecord.wrapSs,
        wrapTs: currentTextureRecord.wrapTs,
        magFilters: currentTextureRecord.magFilters,
        minFilters: currentTextureRecord.minFilters,
        pxFormats: currentTextureRecord.pxFormats,
        nxFormats: currentTextureRecord.nxFormats,
        pyFormats: currentTextureRecord.pyFormats,
        nyFormats: currentTextureRecord.nyFormats,
        pzFormats: currentTextureRecord.pzFormats,
        nzFormats: currentTextureRecord.nzFormats,
        pxTypes: currentTextureRecord.pxTypes,
        nxTypes: currentTextureRecord.nxTypes,
        pyTypes: currentTextureRecord.pyTypes,
        nyTypes: currentTextureRecord.nyTypes,
        pzTypes: currentTextureRecord.pzTypes,
        nzTypes: currentTextureRecord.nzTypes,
        isNeedUpdates: currentTextureRecord.isNeedUpdates,
        flipYs: currentTextureRecord.flipYs,
      }),
  };
};