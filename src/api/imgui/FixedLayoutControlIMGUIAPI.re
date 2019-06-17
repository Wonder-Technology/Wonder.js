open StateDataMainType;

open WonderImgui;

let label =
  (. rect: (int, int, int, int), str, align, record) =>
    FixedLayoutControlIMGUIAPI.label(. rect, str, align, record);

let image =
  (. rect: (int, int, int, int), uv, id, record) =>
    FixedLayoutControlIMGUIAPI.image(. rect, uv, id, record);

let sliderFloat =
  (.
    (rect, textWidth),
    (min, max, numDecimalDigits),
    (defaultValue, str),
    record,
  ) =>
    FixedLayoutControlIMGUIMainService.sliderFloat(.
      (rect, textWidth),
      (min, max, numDecimalDigits),
      (defaultValue, str),
      record,
    );