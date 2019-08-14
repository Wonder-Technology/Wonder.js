open StateDataMainType;

let label =
  (. rect, str, align, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.label(.
      rect,
      str,
      align,
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);

let image =
  (. rect, uv, id, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.image(.
      rect,
      uv,
      id,
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);

let box =
  (. rect, color, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.box(.
      rect,
      color,
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);

let beginGroup =
  (. position, state) =>
    WonderImgui.GroupLayoutIMGUIAPI.beginGroup(.
      position,
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);

let endGroup =
  (. state) =>
    WonderImgui.GroupLayoutIMGUIAPI.endGroup(.
      ManageIMGUIMainService.getRecord(state),
    )
    |> ManageIMGUIMainService.setRecord(_, state);