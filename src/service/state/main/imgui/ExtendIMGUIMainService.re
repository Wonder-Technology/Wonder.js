open StateDataMainType;

module Button = {
  let button =
    (. (rect, str), showData, state) => {
      let (record, isClick) =
        WonderImgui.ExtendButton.CustomControl.button(.
          (rect, str),
          showData,
          ManageIMGUIMainService.getRecord(state),
        );

      (
        ManageIMGUIMainService.setRecord(record, state),
        isClick |> ExtendIMGUIType.outputDataToBool,
      );
    };
};