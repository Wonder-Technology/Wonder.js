open StateDataMainType;

open WonderImgui;

let label = (rect, str, align, state) => {
  ...state,
  imguiRecord:
    FixedLayoutControlIMGUIAPI.label(rect, str, align, state.imguiRecord),
};

let image = (rect, uv, texture, state) => {
  ...state,
  imguiRecord:
    FixedLayoutControlIMGUIAPI.image(rect, uv, texture, state.imguiRecord),
};