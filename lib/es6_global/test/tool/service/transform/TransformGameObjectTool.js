

import * as Vector3Tool$Wonderjs from "../atom/Vector3Tool.js";
import * as TransformAPI$Wonderjs from "../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";

function setLocalEulerAngles(gameObject, localEulerAngles, state) {
  return TransformAPI$Wonderjs.setTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), localEulerAngles, state);
}

function setLocalScale(gameObject, localScale, state) {
  return TransformAPI$Wonderjs.setTransformLocalScale(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), localScale, state);
}

function getLocalEulerAngles(gameObject, state) {
  return Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalEulerAngles(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state), state));
}

export {
  setLocalEulerAngles ,
  setLocalScale ,
  getLocalEulerAngles ,
  
}
/* TransformAPI-Wonderjs Not a pure module */
