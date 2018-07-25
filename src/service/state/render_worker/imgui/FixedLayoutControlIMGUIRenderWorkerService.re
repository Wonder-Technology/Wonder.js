open StateDataRenderWorkerType;

let label =
  (. rect, str, align, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.label(.
      rect,
      str,
      align,
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);

let image =
  (. rect, uv, id, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.image(.
      rect,
      uv,
      id,
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);

let button =
  (. rect, str, state) => {
    let (record, isClick) =
      WonderImgui.FixedLayoutControlIMGUIService.button(.
        rect,
        str,
        ManageIMGUIRenderWorkerService.getRecord(state),
      );

    (ManageIMGUIRenderWorkerService.setRecord(record, state), isClick);
  };

let box =
  (. rect, color, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.box(.
      rect,
      color,
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);

let radioButton =
  (. groupDataArr, defaultSelectIndex, group, state) => {
    let (record, selectIndex) =
      WonderImgui.FixedLayoutControlIMGUIService.radioButton(.
        groupDataArr,
        defaultSelectIndex,
        group,
        ManageIMGUIRenderWorkerService.getRecord(state),
      );

    (ManageIMGUIRenderWorkerService.setRecord(record, state), selectIndex);
  };

let checkbox =
  (. rect, defaultIsSelected, str, state) => {
    let (record, isSelected) =
      WonderImgui.FixedLayoutControlIMGUIService.checkbox(.
        rect,
        defaultIsSelected,
        str,
        ManageIMGUIRenderWorkerService.getRecord(state),
      );

    (ManageIMGUIRenderWorkerService.setRecord(record, state), isSelected);
  };

let sliderInt =
  (. (rect, textWidth), (min, max), (defaultValue, str), state) => {
    let (record, isSelected, value) =
      WonderImgui.FixedLayoutControlIMGUIService.sliderInt(.
        (rect, textWidth),
        (min, max),
        (defaultValue, str),
        ManageIMGUIRenderWorkerService.getRecord(state),
      );

    (
      ManageIMGUIRenderWorkerService.setRecord(record, state),
      isSelected,
      value,
    );
  };

let sliderFloat =
  (.
    (rect, textWidth),
    (min, max, numDecimalDigits),
    (defaultValue, str),
    state,
  ) => {
    let (record, isSelected, value) =
      WonderImgui.FixedLayoutControlIMGUIService.sliderFloat(.
        (rect, textWidth),
        (min, max, numDecimalDigits),
        (defaultValue, str),
        ManageIMGUIRenderWorkerService.getRecord(state),
      );

    (
      ManageIMGUIRenderWorkerService.setRecord(record, state),
      isSelected,
      value,
    );
  };

let beginGroup =
  (. position, state) =>
    WonderImgui.GroupLayoutIMGUIAPI.beginGroup(.
      position,
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);

let endGroup =
  (. state) =>
    WonderImgui.GroupLayoutIMGUIAPI.endGroup(.
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);