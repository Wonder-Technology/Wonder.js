

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OperateOutlineDataJobDataMainService$Wonderjs from "../../service/state/main/jobData/outlineData/OperateOutlineDataJobDataMainService.js";

var getOutlineColor = OperateOutlineDataJobDataMainService$Wonderjs.getColor;

var setOutlineColor = OperateOutlineDataJobDataMainService$Wonderjs.setColor;

var setGameObjectsNeedDrawOutline = OperateOutlineDataJobDataMainService$Wonderjs.setGameObjectsNeedDrawOutline;

function setSkyboxImage(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobDataRecord */45];
  var init$1 = state[/* jobDataRecord */45][/* skyboxData */1];
  newrecord[/* jobDataRecord */45] = /* record */[
    /* outlineData */init[/* outlineData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */init$1[/* skyboxGameObject */0],
      /* needUpdateCubeTexture */init$1[/* needUpdateCubeTexture */1],
      /* nxImage */Caml_option.some(param[1]),
      /* pxImage */Caml_option.some(param[0]),
      /* nyImage */Caml_option.some(param[3]),
      /* pyImage */Caml_option.some(param[2]),
      /* nzImage */Caml_option.some(param[5]),
      /* pzImage */Caml_option.some(param[4]),
      /* cubeTexture */init$1[/* cubeTexture */8]
    ]
  ];
  return newrecord;
}

function setSkyboxNeedUpdateCubeTexture(needUpdateCubeTexture, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* jobDataRecord */45];
  var init$1 = state[/* jobDataRecord */45][/* skyboxData */1];
  newrecord[/* jobDataRecord */45] = /* record */[
    /* outlineData */init[/* outlineData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */init$1[/* skyboxGameObject */0],
      /* needUpdateCubeTexture */needUpdateCubeTexture,
      /* nxImage */init$1[/* nxImage */2],
      /* pxImage */init$1[/* pxImage */3],
      /* nyImage */init$1[/* nyImage */4],
      /* pyImage */init$1[/* pyImage */5],
      /* nzImage */init$1[/* nzImage */6],
      /* pzImage */init$1[/* pzImage */7],
      /* cubeTexture */init$1[/* cubeTexture */8]
    ]
  ];
  return newrecord;
}

export {
  getOutlineColor ,
  setOutlineColor ,
  setGameObjectsNeedDrawOutline ,
  setSkyboxImage ,
  setSkyboxNeedUpdateCubeTexture ,
  
}
/* No side effect */
