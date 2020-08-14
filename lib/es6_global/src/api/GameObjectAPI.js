

import * as Log$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AllGameObjectMainService$Wonderjs from "../service/state/main/gameObject/AllGameObjectMainService.js";
import * as InitGameObjectMainService$Wonderjs from "../service/state/main/gameObject/InitGameObjectMainService.js";
import * as NameGameObjectMainService$Wonderjs from "../service/state/main/gameObject/NameGameObjectMainService.js";
import * as AliveGameObjectMainService$Wonderjs from "../service/state/main/gameObject/AliveGameObjectMainService.js";
import * as CloneGameObjectMainService$Wonderjs from "../service/state/main/gameObject/CloneGameObjectMainService.js";
import * as CreateGameObjectMainService$Wonderjs from "../service/state/main/gameObject/CreateGameObjectMainService.js";
import * as IsRootGameObjectMainService$Wonderjs from "../service/state/main/gameObject/IsRootGameObjectMainService.js";
import * as DisposeGameObjectMainService$Wonderjs from "../service/state/main/gameObject/DisposeGameObjectMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../service/record/main/gameObject/GetComponentGameObjectService.js";
import * as HasComponentGameObjectService$Wonderjs from "../service/record/main/gameObject/HasComponentGameObjectService.js";
import * as GetIsActiveGameObjectMainService$Wonderjs from "../service/state/main/gameObject/GetIsActiveGameObjectMainService.js";
import * as SetIsActiveGameObjectMainService$Wonderjs from "../service/state/main/gameObject/SetIsActiveGameObjectMainService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "../service/state/main/gameObject/AddComponentGameObjectMainService.js";
import * as GetComponentGameObjectMainService$Wonderjs from "../service/state/main/gameObject/GetComponentGameObjectMainService.js";
import * as RemoveComponentGameObjectMainService$Wonderjs from "../service/state/main/gameObject/RemoveComponentGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

var createGameObject = CreateGameObjectMainService$Wonderjs.create;

function _checkGameObjectShouldAlive(gameObject, state) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObject alive", "not"), (function (param) {
                return Contract$WonderLog.assertTrue(AliveGameObjectMainService$Wonderjs.isAlive(gameObject, state));
              }));
}

function addGameObjectScriptComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addScriptComponent(gameObject, component, state);
}

function disposeGameObjectScriptComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeScriptComponent(gameObject, component, state);
}

function unsafeGetGameObjectScriptComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetScriptComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectScriptComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasScriptComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectBasicCameraViewComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addBasicCameraViewComponent(gameObject, component, state);
}

function disposeGameObjectBasicCameraViewComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeBasicCameraViewComponent(gameObject, component, state);
}

function unsafeGetGameObjectBasicCameraViewComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetBasicCameraViewComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectBasicCameraViewComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasBasicCameraViewComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectPerspectiveCameraProjectionComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addPerspectiveCameraProjectionComponent(gameObject, component, state);
}

function disposeGameObjectPerspectiveCameraProjectionComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposePerspectiveCameraProjectionComponent(gameObject, component, state);
}

function unsafeGetGameObjectPerspectiveCameraProjectionComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetPerspectiveCameraProjectionComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectPerspectiveCameraProjectionComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasPerspectiveCameraProjectionComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectFlyCameraControllerComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addFlyCameraControllerComponent(gameObject, component, state);
}

function disposeGameObjectFlyCameraControllerComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeFlyCameraControllerComponent(gameObject, component, state);
}

function unsafeGetGameObjectFlyCameraControllerComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetFlyCameraControllerComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectFlyCameraControllerComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasFlyCameraControllerComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectArcballCameraControllerComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addArcballCameraControllerComponent(gameObject, component, state);
}

function disposeGameObjectArcballCameraControllerComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeArcballCameraControllerComponent(gameObject, component, state);
}

function unsafeGetGameObjectArcballCameraControllerComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetArcballCameraControllerComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectArcballCameraControllerComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasArcballCameraControllerComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectTransformComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addTransformComponent(gameObject, component, state);
}

function disposeGameObjectTransformComponent(gameObject, component, isKeepOrder, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  if (isKeepOrder) {
    return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeTransformComponentForKeepOrder(gameObject, component, state);
  } else {
    return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeTransformComponent(gameObject, component, state);
  }
}

function unsafeGetGameObjectTransformComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectTransformComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasTransformComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectGeometryComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addGeometryComponent(gameObject, component, state);
}

function disposeGameObjectGeometryComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeGeometryComponent(gameObject, component, state);
}

function removeGameObjectGeometryComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return RemoveComponentGameObjectMainService$Wonderjs.removeGeometryComponent(gameObject, component, state);
}

function removeGameObjectBasicMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return RemoveComponentGameObjectMainService$Wonderjs.removeBasicMaterialComponent(gameObject, component, state);
}

function removeGameObjectLightMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return RemoveComponentGameObjectMainService$Wonderjs.removeLightMaterialComponent(gameObject, component, state);
}

function unsafeGetGameObjectGeometryComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetGeometryComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectGeometryComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasGeometryComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectBasicMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addBasicMaterialComponent(gameObject, component, state);
}

function disposeGameObjectBasicMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeBasicMaterialComponent(gameObject, component, state);
}

function unsafeGetGameObjectBasicMaterialComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetBasicMaterialComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectBasicMaterialComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasBasicMaterialComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectLightMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addLightMaterialComponent(gameObject, component, state);
}

function disposeGameObjectLightMaterialComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeLightMaterialComponent(gameObject, component, state);
}

function disposeGameObjectLightMaterialComponentRemoveTexture(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeLightMaterialComponentRemoveTexture(gameObject, component, state);
}

function unsafeGetGameObjectLightMaterialComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetLightMaterialComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectLightMaterialComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasLightMaterialComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectMeshRendererComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addMeshRendererComponent(gameObject, component, state);
}

function disposeGameObjectMeshRendererComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeMeshRendererComponent(gameObject, component, state);
}

function unsafeGetGameObjectMeshRendererComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetMeshRendererComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectMeshRendererComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasMeshRendererComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectDirectionLightComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addDirectionLightComponent(gameObject, component, state);
}

function disposeGameObjectDirectionLightComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeDirectionLightComponent(gameObject, component, state);
}

function unsafeGetGameObjectDirectionLightComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetDirectionLightComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectDirectionLightComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasDirectionLightComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectPointLightComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addPointLightComponent(gameObject, component, state);
}

function disposeGameObjectPointLightComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposePointLightComponent(gameObject, component, state);
}

function unsafeGetGameObjectPointLightComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetPointLightComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectPointLightComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasPointLightComponent(gameObject, state[/* gameObjectRecord */10]);
}

function addGameObjectSourceInstanceComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addSourceInstanceComponent(gameObject, component, state);
}

function unsafeGetGameObjectSourceInstanceComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetSourceInstanceComponent(gameObject, state[/* gameObjectRecord */10]);
}

function hasGameObjectSourceInstanceComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return HasComponentGameObjectService$Wonderjs.hasSourceInstanceComponent(gameObject, state[/* gameObjectRecord */10]);
}

function disposeGameObjectSourceInstanceComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeSourceInstanceComponent(gameObject, component, state);
}

function addGameObjectObjectInstanceComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AddComponentGameObjectMainService$Wonderjs.addObjectInstanceComponent(gameObject, component, state);
}

function unsafeGetGameObjectObjectInstanceComponent(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetComponentGameObjectService$Wonderjs.unsafeGetObjectInstanceComponent(gameObject, state[/* gameObjectRecord */10]);
}

function disposeGameObjectObjectInstanceComponent(gameObject, component, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeComponentGameObjectMainService$Wonderjs.deferDisposeObjectInstanceComponent(gameObject, component, state);
}

var isGameObjectAlive = AliveGameObjectMainService$Wonderjs.isAlive;

function disposeGameObject(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDispose(gameObject, state);
}

function disposeGameObjectKeepOrder(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDisposeKeepOrder(gameObject, state);
}

function disposeGameObjectKeepOrderRemoveGeometry(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDisposeKeepOrderRemoveGeometry(gameObject, state);
}

function disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDisposeKeepOrderRemoveGeometryRemoveMaterial(gameObject, state);
}

function disposeGameObjectDisposeGeometryRemoveMaterial(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDisposeDisposeGeometryRemoveMaterial(gameObject, state);
}

function disposeGameObjectRemoveTexture(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferDisposeRemoveTexture(gameObject, state);
}

function initGameObject(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return InitGameObjectMainService$Wonderjs.initGameObject(gameObject, state);
}

function batchDisposeGameObject(gameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return ArrayService$WonderCommonlib.forEach((function (gameObject) {
                        return _checkGameObjectShouldAlive(gameObject, state);
                      }), gameObjectArray);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferBatchDispose(gameObjectArray, state);
}

function batchDisposeGameObjectKeepOrder(gameObjectArray, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return ArrayService$WonderCommonlib.forEach((function (gameObject) {
                        return _checkGameObjectShouldAlive(gameObject, state);
                      }), gameObjectArray);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return DisposeGameObjectMainService$Wonderjs.deferBatchDisposeKeepOrder(gameObjectArray, state);
}

var cloneGameObject = CloneGameObjectMainService$Wonderjs.clone;

function getGameObjectName(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameGameObjectMainService$Wonderjs.getName(gameObject, state);
}

function unsafeGetGameObjectName(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameGameObjectMainService$Wonderjs.unsafeGetName(gameObject, state);
}

function setGameObjectName(gameObject, name, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return NameGameObjectMainService$Wonderjs.setName(gameObject, name, state);
}

function unsafeGetGameObjectIsRoot(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IsRootGameObjectMainService$Wonderjs.unsafeGetIsRoot(gameObject, state);
}

function setGameObjectIsRoot(gameObject, isRoot, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return IsRootGameObjectMainService$Wonderjs.setIsRoot(gameObject, isRoot, state);
}

function getAllChildrenTransform(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AllGameObjectMainService$Wonderjs.getAllChildrenTransform(gameObject, state);
}

function getAllGameObjects(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return AllGameObjectMainService$Wonderjs.getAllGameObjects(gameObject, state);
}

function unsafeGetGameObjectIsActive(gameObject, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return GetIsActiveGameObjectMainService$Wonderjs.unsafeGetIsActive(gameObject, state);
}

function setGameObjectIsActive(gameObject, isScriptActive, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return _checkGameObjectShouldAlive(gameObject, state);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return SetIsActiveGameObjectMainService$Wonderjs.setIsActive(gameObject, isScriptActive, state);
}

var getAllDirectionLightComponentsOfGameObject = AllGameObjectMainService$Wonderjs.getAllDirectionLightComponentsOfGameObject;

var getAllPointLightComponentsOfGameObject = AllGameObjectMainService$Wonderjs.getAllPointLightComponentsOfGameObject;

var getAllGeometryComponents = GetComponentGameObjectMainService$Wonderjs.getAllGeometryComponents;

var getAllArcballCameraControllerComponents = GetComponentGameObjectMainService$Wonderjs.getAllArcballCameraControllerComponents;

var getAllBasicCameraViewComponents = GetComponentGameObjectMainService$Wonderjs.getAllBasicCameraViewComponents;

var getAllPerspectiveCameraProjectionComponents = GetComponentGameObjectMainService$Wonderjs.getAllPerspectiveCameraProjectionComponents;

var getAllBasicMaterialComponents = GetComponentGameObjectMainService$Wonderjs.getAllBasicMaterialComponents;

var getAllLightMaterialComponents = GetComponentGameObjectMainService$Wonderjs.getAllLightMaterialComponents;

var getAllDirectionLightComponents = GetComponentGameObjectMainService$Wonderjs.getAllDirectionLightComponents;

var getAllPointLightComponents = GetComponentGameObjectMainService$Wonderjs.getAllPointLightComponents;

export {
  createGameObject ,
  _checkGameObjectShouldAlive ,
  addGameObjectScriptComponent ,
  disposeGameObjectScriptComponent ,
  unsafeGetGameObjectScriptComponent ,
  hasGameObjectScriptComponent ,
  addGameObjectBasicCameraViewComponent ,
  disposeGameObjectBasicCameraViewComponent ,
  unsafeGetGameObjectBasicCameraViewComponent ,
  hasGameObjectBasicCameraViewComponent ,
  addGameObjectPerspectiveCameraProjectionComponent ,
  disposeGameObjectPerspectiveCameraProjectionComponent ,
  unsafeGetGameObjectPerspectiveCameraProjectionComponent ,
  hasGameObjectPerspectiveCameraProjectionComponent ,
  addGameObjectFlyCameraControllerComponent ,
  disposeGameObjectFlyCameraControllerComponent ,
  unsafeGetGameObjectFlyCameraControllerComponent ,
  hasGameObjectFlyCameraControllerComponent ,
  addGameObjectArcballCameraControllerComponent ,
  disposeGameObjectArcballCameraControllerComponent ,
  unsafeGetGameObjectArcballCameraControllerComponent ,
  hasGameObjectArcballCameraControllerComponent ,
  addGameObjectTransformComponent ,
  disposeGameObjectTransformComponent ,
  unsafeGetGameObjectTransformComponent ,
  hasGameObjectTransformComponent ,
  addGameObjectGeometryComponent ,
  disposeGameObjectGeometryComponent ,
  removeGameObjectGeometryComponent ,
  removeGameObjectBasicMaterialComponent ,
  removeGameObjectLightMaterialComponent ,
  unsafeGetGameObjectGeometryComponent ,
  hasGameObjectGeometryComponent ,
  addGameObjectBasicMaterialComponent ,
  disposeGameObjectBasicMaterialComponent ,
  unsafeGetGameObjectBasicMaterialComponent ,
  hasGameObjectBasicMaterialComponent ,
  addGameObjectLightMaterialComponent ,
  disposeGameObjectLightMaterialComponent ,
  disposeGameObjectLightMaterialComponentRemoveTexture ,
  unsafeGetGameObjectLightMaterialComponent ,
  hasGameObjectLightMaterialComponent ,
  addGameObjectMeshRendererComponent ,
  disposeGameObjectMeshRendererComponent ,
  unsafeGetGameObjectMeshRendererComponent ,
  hasGameObjectMeshRendererComponent ,
  addGameObjectDirectionLightComponent ,
  disposeGameObjectDirectionLightComponent ,
  unsafeGetGameObjectDirectionLightComponent ,
  hasGameObjectDirectionLightComponent ,
  addGameObjectPointLightComponent ,
  disposeGameObjectPointLightComponent ,
  unsafeGetGameObjectPointLightComponent ,
  hasGameObjectPointLightComponent ,
  addGameObjectSourceInstanceComponent ,
  unsafeGetGameObjectSourceInstanceComponent ,
  hasGameObjectSourceInstanceComponent ,
  disposeGameObjectSourceInstanceComponent ,
  addGameObjectObjectInstanceComponent ,
  unsafeGetGameObjectObjectInstanceComponent ,
  disposeGameObjectObjectInstanceComponent ,
  isGameObjectAlive ,
  disposeGameObject ,
  disposeGameObjectKeepOrder ,
  disposeGameObjectKeepOrderRemoveGeometry ,
  disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial ,
  disposeGameObjectDisposeGeometryRemoveMaterial ,
  disposeGameObjectRemoveTexture ,
  initGameObject ,
  batchDisposeGameObject ,
  batchDisposeGameObjectKeepOrder ,
  cloneGameObject ,
  getGameObjectName ,
  unsafeGetGameObjectName ,
  setGameObjectName ,
  unsafeGetGameObjectIsRoot ,
  setGameObjectIsRoot ,
  getAllChildrenTransform ,
  getAllGameObjects ,
  getAllDirectionLightComponentsOfGameObject ,
  getAllPointLightComponentsOfGameObject ,
  getAllGeometryComponents ,
  getAllArcballCameraControllerComponents ,
  getAllBasicCameraViewComponents ,
  getAllPerspectiveCameraProjectionComponents ,
  getAllBasicMaterialComponents ,
  getAllLightMaterialComponents ,
  getAllDirectionLightComponents ,
  getAllPointLightComponents ,
  unsafeGetGameObjectIsActive ,
  setGameObjectIsActive ,
  
}
/* Log-WonderLog Not a pure module */
