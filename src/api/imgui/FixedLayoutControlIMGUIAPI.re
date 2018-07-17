open StateDataMainType;

open WonderImgui;

let label = (rect, str, align, record) =>
  FixedLayoutControlIMGUIAPI.label(rect, str, align, record);

let image = (rect, uv, texture, record) =>
  FixedLayoutControlIMGUIAPI.image(rect, uv, texture, record);