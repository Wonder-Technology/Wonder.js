let isSupportRenderWorkerAndSharedArrayBuffer = () => {
  let isSupportSharedArrayBuffer = Worker.isSupportSharedArrayBuffer();

  ! isSupportSharedArrayBuffer ?
    false :
    DetectService.hasProperty(
      "transferControlToOffscreen",
      DomService.buildCanvas(.) |> Obj.magic,
    );
};