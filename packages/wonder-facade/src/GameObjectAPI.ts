import { addComponent, createGameObject, getComponent, hasComponent, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-core"
import { componentName as pbrMaterialComponentName, pbrMaterial } from "wonder-component-type-pbrmaterial"
import { componentName as transformComponentName, transform } from "wonder-component-type-transform"
import { componentName as geometryComponentName, geometry } from "wonder-component-type-geometry"
import { componentName as directionLightComponentName, directionLight } from "wonder-component-type-directionlight"
import { componentName as basicCameraViewComponentName, basicCameraView } from "wonder-component-type-basiccameraview"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection } from "wonder-component-type-perspectivecameraprojection"
import { componentName as arcballCameraControllerComponentName, arcballCameraController } from "wonder-component-type-arcballcameracontroller"
import { gameObject } from "../../wonder-core/src/abstract/scene_graph/IGameObjectForJs.gen"

export let create = createGameObject

export function getTransform(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(transformComponentName)

    return getComponent(data, gameObject)
}

export function addTransform(gameObject: gameObject, transform: transform) {
    let data = unsafeGetRelatedComponentData(transformComponentName)

    setRelatedComponentData(addComponent(data, gameObject, transform), transformComponentName)

    return gameObject
}

export function hasTransform(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(transformComponentName)

    return hasComponent(data, gameObject)
}

export function getGeometry(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(geometryComponentName)

    return getComponent(data, gameObject)
}

export function addGeometry(gameObject: gameObject, geometry: geometry) {
    let data = unsafeGetRelatedComponentData(geometryComponentName)

    setRelatedComponentData(addComponent(data, gameObject, geometry), geometryComponentName)

    return gameObject
}

export function hasGeometry(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(geometryComponentName)

    return hasComponent(data, gameObject)
}

export function getPBRMaterial(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(pbrMaterialComponentName)

    return getComponent(data, gameObject)
}

export function addPBRMaterial(gameObject: gameObject, pbrMaterial: pbrMaterial) {
    let data = unsafeGetRelatedComponentData(pbrMaterialComponentName)

    setRelatedComponentData(addComponent(data, gameObject, pbrMaterial), pbrMaterialComponentName)

    return gameObject
}

export function hasPBRMaterial(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(pbrMaterialComponentName)

    return hasComponent(data, gameObject)
}

export function getDirectionLight(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(directionLightComponentName)

    return getComponent(data, gameObject)
}

export function addDirectionLight(gameObject: gameObject, directionLight: directionLight) {
    let data = unsafeGetRelatedComponentData(directionLightComponentName)

    setRelatedComponentData(addComponent(data, gameObject, directionLight), directionLightComponentName)

    return gameObject
}

export function hasDirectionLight(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(directionLightComponentName)

    return hasComponent(data, gameObject)
}

export function getBasicCameraView(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(basicCameraViewComponentName)

    return getComponent(data, gameObject)
}

export function addBasicCameraView(gameObject: gameObject, basicCameraView: basicCameraView) {
    let data = unsafeGetRelatedComponentData(basicCameraViewComponentName)

    setRelatedComponentData(addComponent(data, gameObject, basicCameraView), basicCameraViewComponentName)

    return gameObject
}

export function hasBasicCameraView(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(basicCameraViewComponentName)

    return hasComponent(data, gameObject)
}

export function getPerspectiveCameraProjection(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(perspectiveCameraProjectionComponentName)

    return getComponent(data, gameObject)
}

export function addPerspectiveCameraProjection(gameObject: gameObject, perspectiveCameraProjection: perspectiveCameraProjection) {
    let data = unsafeGetRelatedComponentData(perspectiveCameraProjectionComponentName)

    setRelatedComponentData(addComponent(data, gameObject, perspectiveCameraProjection), perspectiveCameraProjectionComponentName)

    return gameObject
}

export function hasPerspectiveCameraProjection(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(perspectiveCameraProjectionComponentName)

    return hasComponent(data, gameObject)
}

export function getArcballCameraController(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(arcballCameraControllerComponentName)

    return getComponent(data, gameObject)
}

export function addArcballCameraController(gameObject: gameObject, arcballCameraController: arcballCameraController) {
    let data = unsafeGetRelatedComponentData(arcballCameraControllerComponentName)

    setRelatedComponentData(addComponent(data, gameObject, arcballCameraController), arcballCameraControllerComponentName)

    return gameObject
}

export function hasArcballCameraController(gameObject: gameObject) {
    let data = unsafeGetRelatedComponentData(arcballCameraControllerComponentName)

    return hasComponent(data, gameObject)
}
