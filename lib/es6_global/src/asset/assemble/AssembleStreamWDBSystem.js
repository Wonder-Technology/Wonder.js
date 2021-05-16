

import * as BatchCreateSystem$Wonderjs from "./BatchCreateSystem.js";
import * as SkyboxCubemapSystem$Wonderjs from "./SkyboxCubemapSystem.js";
import * as BatchOperateStreamSystem$Wonderjs from "./BatchOperateStreamSystem.js";
import * as BuildRootGameObjectSystem$Wonderjs from "./BuildRootGameObjectSystem.js";
import * as DisposeGameObjectNotExistInSceneSystem$Wonderjs from "./DisposeGameObjectNotExistInSceneSystem.js";

function assemble(wd, default11Image, state) {
  var match = BatchOperateStreamSystem$Wonderjs.batchOperate(wd, default11Image, BatchCreateSystem$Wonderjs.batchCreate(true, wd, state));
  var match$1 = match[3];
  var match$2 = match$1[2];
  var cubemapTextureArr = match$2[0];
  var match$3 = match$1[1];
  var match$4 = match[2];
  var gameObjectArr = match[1];
  var state$1 = match[0];
  var state$2 = SkyboxCubemapSystem$Wonderjs.setSkyboxCubemap(SkyboxCubemapSystem$Wonderjs.getSkyboxCubemap(wd, cubemapTextureArr, state$1), state$1);
  var match$5 = BuildRootGameObjectSystem$Wonderjs.build(wd, /* tuple */[
        state$2,
        gameObjectArr
      ]);
  var rootGameObject = match$5[1];
  var state$3 = DisposeGameObjectNotExistInSceneSystem$Wonderjs.dispose(rootGameObject, gameObjectArr, match$5[0]);
  return /* tuple */[
          state$3,
          rootGameObject,
          /* tuple */[
            match$4[0],
            match$4[1],
            match$4[2]
          ],
          /* tuple */[
            match$1[0],
            /* tuple */[
              match$3[0],
              match$3[1]
            ],
            /* tuple */[
              cubemapTextureArr,
              match$2[1]
            ]
          ]
        ];
}

export {
  assemble ,
  
}
/* BatchCreateSystem-Wonderjs Not a pure module */
