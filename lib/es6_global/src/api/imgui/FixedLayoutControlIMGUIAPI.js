

import * as FixedLayoutControlIMGUIAPI$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/src/api/FixedLayoutControlIMGUIAPI.js";
import * as FixedLayoutControlIMGUIMainService$Wonderjs from "../../service/state/main/imgui/FixedLayoutControlIMGUIMainService.js";

function label(rect, str, align, record) {
  return FixedLayoutControlIMGUIAPI$WonderImgui.label(rect, str, align, record);
}

function image(rect, uv, id, record) {
  return FixedLayoutControlIMGUIAPI$WonderImgui.image(rect, uv, id, record);
}

function sliderFloat(param, param$1, param$2, record) {
  return FixedLayoutControlIMGUIMainService$Wonderjs.sliderFloat(/* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2]
            ], /* tuple */[
              param$2[0],
              param$2[1]
            ], record);
}

export {
  label ,
  image ,
  sliderFloat ,
  
}
/* FixedLayoutControlIMGUIAPI-WonderImgui Not a pure module */
