open StateDataRenderWorkerType;

module Button = {
  let button =
    (. (rect, str), showData, state) => {
      let (record, isClick) =
        WonderImgui.ExtendButton.CustomControl.button(.
          (rect, str),
          showData,
          ManageIMGUIRenderWorkerService.getRecord(state),
        );

      (
        ManageIMGUIRenderWorkerService.setRecord(record, state),
        isClick |> ExtendIMGUIType.outputDataToBool,
      );
    };
};