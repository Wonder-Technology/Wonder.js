open StateDataMainType;

let label =
  (. rect: (int, int, int, int), str, align, record) =>
    WonderImgui.FixedLayoutControlIMGUIAPI.label(. rect, str, align, record);

let image =
  (. rect: (int, int, int, int), uv, id, record) =>
    WonderImgui.FixedLayoutControlIMGUIAPI.image(. rect, uv, id, record);