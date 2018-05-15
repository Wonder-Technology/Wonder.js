open StateDataMainType;

open TextureType;

let _restoreTypeArrays = (currentTextureRecord, targetTextureRecord) =>
  currentTextureRecord.wrapSs === targetTextureRecord.wrapSs
  && currentTextureRecord.wrapTs === targetTextureRecord.wrapTs
  && currentTextureRecord.magFilters === targetTextureRecord.magFilters
  && currentTextureRecord.minFilters === targetTextureRecord.minFilters
  && currentTextureRecord.formats === targetTextureRecord.formats
  && currentTextureRecord.types === targetTextureRecord.types
  && currentTextureRecord.isNeedUpdates === targetTextureRecord.isNeedUpdates ?
    (currentTextureRecord, targetTextureRecord) :
    {
      let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
        (
          currentTextureRecord.wrapSs,
          currentTextureRecord.wrapTs,
          currentTextureRecord.magFilters,
          currentTextureRecord.minFilters,
          currentTextureRecord.formats,
          currentTextureRecord.types,
          currentTextureRecord.isNeedUpdates
        )
        |> RecordTextureMainService.setAllTypeArrDataToDefault(currentTextureRecord.index);
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.wrapSs, 0),
        (targetTextureRecord.wrapSs, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.wrapSs)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.wrapTs, 0),
        (targetTextureRecord.wrapTs, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.wrapTs)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.magFilters, 0),
        (targetTextureRecord.magFilters, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.magFilters)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.minFilters, 0),
        (targetTextureRecord.minFilters, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.minFilters)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.formats, 0),
        (targetTextureRecord.formats, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.formats)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.types, 0),
        (targetTextureRecord.types, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.types)
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentTextureRecord.isNeedUpdates, 0),
        (targetTextureRecord.isNeedUpdates, 0),
        Js.Typed_array.Uint8Array.length(targetTextureRecord.isNeedUpdates)
      )
      |> ignore;
      (currentTextureRecord, targetTextureRecord)
    };

let restore = (currentState, targetState) => {
  let currentTextureRecord = RecordTextureMainService.getRecord(currentState);
  let targetTextureRecord = RecordTextureMainService.getRecord(targetState);
  let (currentTextureRecord, targetTextureRecord) =
    _restoreTypeArrays(currentTextureRecord, targetTextureRecord);
  {
    ...targetState,
    textureRecord:
      Some({
        ...targetTextureRecord,
        buffer: currentTextureRecord.buffer,
        wrapSs: currentTextureRecord.wrapSs,
        wrapTs: currentTextureRecord.wrapTs,
        magFilters: currentTextureRecord.magFilters,
        minFilters: currentTextureRecord.minFilters,
        formats: currentTextureRecord.formats,
        types: currentTextureRecord.types,
        isNeedUpdates: currentTextureRecord.isNeedUpdates
      })
  }
};