open StateDataRenderWorkerType;

let label =
  (. rect, str, cssData, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.label(.
      rect,
      str,
      cssData,
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

let box =
  (. rect, color, state) =>
    WonderImgui.FixedLayoutControlIMGUIService.box(.
      rect,
      color,
      ManageIMGUIRenderWorkerService.getRecord(state),
    )
    |> ManageIMGUIRenderWorkerService.setRecord(_, state);

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