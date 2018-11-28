open StateDataMainType;

open MeshRendererType;

let _restoreTypeArrays = (currentMeshRecord, targetMeshRecord) =>
  currentMeshRecord.drawModes === targetMeshRecord.drawModes
  && currentMeshRecord.isRenders === targetMeshRecord.isRenders ?
    (currentMeshRecord, targetMeshRecord) :
    {
      let (drawModes, isRenders) =
        RecordMeshRendererMainService.setAllTypeArrDataToDefault(
          currentMeshRecord.index,
          (
            BufferMeshRendererService.getDefaultDrawMode()
            |> DrawModeType.drawModeToUint8,
            BufferMeshRendererService.getDefaultIsRender(),
          ),
          (currentMeshRecord.drawModes, currentMeshRecord.isRenders),
        );
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentMeshRecord.drawModes, 0),
        (targetMeshRecord.drawModes, 0),
        Js.Typed_array.Uint8Array.length(targetMeshRecord.drawModes),
      )
      |> ignore;
      TypeArrayService.fillUint8ArrayWithUint8Array(
        (currentMeshRecord.isRenders, 0),
        (targetMeshRecord.isRenders, 0),
        Js.Typed_array.Uint8Array.length(targetMeshRecord.isRenders),
      )
      |> ignore;
      (currentMeshRecord, targetMeshRecord);
    };

let restore = (currentState, targetState) => {
  let currentMeshRecord =
    RecordMeshRendererMainService.getRecord(currentState);
  let targetMeshRecord = RecordMeshRendererMainService.getRecord(targetState);
  let (currentMeshRecord, targetMeshRecord) =
    _restoreTypeArrays(currentMeshRecord, targetMeshRecord);
  {
    ...targetState,
    meshRendererRecord:
      Some({
        ...targetMeshRecord,
        drawModes: currentMeshRecord.drawModes,
        isRenders: currentMeshRecord.isRenders,
      }),
  };
};