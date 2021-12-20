import { prepare as prepareCore, init as initCore, runPipeline, registerWorkPlugin as registerWorkPluginCore, getIsDebug as getIsDebugCore, setIsDebug as setIsDebugCore, registerComponent as registerComponentCore, unregisterComponent as unregisterComponentCore, createComponent as createComponentCore, unsafeGetRelatedComponentData as unsafeGetRelatedComponentDataCore, setRelatedComponentData as setRelatedComponentDataCore, setComponentData as setComponentDataCore, addComponent as addComponentCore, hasComponent as hasComponentCore, getComponent as getComponentCore, getAllComponents as getAllComponentsCore, getComponentData as getComponentDataCore, getComponentGameObjects as getComponentGameObjectsCore, setGameObjectData as setGameObjectDataCore, createAndSetGameObjectState as createAndSetGameObjectStateCore, createGameObject as createGameObjectCore, createAndSetComponentState, } from "wonder-core"
import { getData } from "wonder-work-plugin-root/src/Main"
import { getData as getTransformData } from "wonder-component-transform"
import { getData as getGeometryData } from "wonder-component-geometry"
import { getData as getPBRMaterialData } from "wonder-component-pbrmaterial"
import { getData as getDirectionLightData } from "wonder-component-directionlight"
import { getData as getArcballCameraControllerData } from "wonder-component-arcballcameracontroller"
import { getData as getBasicCameraViewData } from "wonder-component-basiccameraview"
import { getData as getPerspectiveCameraProjectionData } from "wonder-component-perspectivecameraprojection"
import { getData as getGameObjectData } from "wonder-gameobject-dataoriented"
import { componentName as transformComponentName } from "../../wonder-component-type-transform"
import { componentName as geometryComponentName } from "../../wonder-component-type-geometry"
import { componentName as directionLightComponentName } from "../../wonder-component-type-directionlight"
import { componentName as pbrMaterialComponentName } from "../../wonder-component-type-pbrmaterial"
import { componentName as arcballCameraControllerComponentName } from "../../wonder-component-type-arcballcameracontroller"
import { componentName as basicCameraViewComponentName } from "../../wonder-component-type-basiccameraview"
import { componentName as perspectiveCameraProjectionComponentName } from "../../wonder-component-type-perspectivecameraprojection"

export let registerWorkPlugin = registerWorkPluginCore

export function prepare(
    {
        isDebug,
        float9Array1,
        float32Array1,
        transformCount,
        geometryCount,
        geometryPointCount,
        pbrMaterialCount,
        directionLightCount,
    }: {
        isDebug: boolean,
        float9Array1: Float32Array,
        float32Array1: Float32Array,
        transformCount: number,
        geometryCount: number,
        geometryPointCount: number,
        pbrMaterialCount: number,
        directionLightCount: number
    }
) {
    prepareCore()


    setGameObjectData(getGameObjectData())

    createAndSetGameObjectState()



    registerWorkPlugin(getData())

    registerComponent(getTransformData())
    registerComponent(getGeometryData())
    registerComponent(getPBRMaterialData())
    registerComponent(getDirectionLightData())
    registerComponent(getArcballCameraControllerData())
    registerComponent(getBasicCameraViewData())
    registerComponent(getPerspectiveCameraProjectionData())

    createAndSetComponentState(transformComponentName, {
        isDebug, transformCount, float9Array1, float32Array1
    })
    createAndSetComponentState(geometryComponentName, {
        isDebug, geometryCount, geometryPointCount
    })
    createAndSetComponentState(directionLightComponentName, {
        isDebug, directionLightCount
    })
    createAndSetComponentState(pbrMaterialComponentName, {
        isDebug, pbrMaterialCount
    })
    createAndSetComponentState(basicCameraViewComponentName, {
        isDebug
    })
    createAndSetComponentState(perspectiveCameraProjectionComponentName, {
        isDebug
    })
    createAndSetComponentState(arcballCameraControllerComponentName, {
        isDebug
    })
}

export function init() {
    initCore()

    return runPipeline("init").drain()
}

export function update() {
    return runPipeline("update").drain()
}

export function render() {
    return runPipeline("render").drain()
}


export let setGameObjectData = setGameObjectDataCore

export let createAndSetGameObjectState = createAndSetGameObjectStateCore

export let createGameObject = createGameObjectCore


export let registerComponent = registerComponentCore

export let unregisterComponent = unregisterComponentCore

export let createComponent = createComponentCore

export let unsafeGetRelatedComponentData = unsafeGetRelatedComponentDataCore

export let setRelatedComponentData = setRelatedComponentDataCore

export let setComponentData = setComponentDataCore

export let addComponent = addComponentCore

export let hasComponent = hasComponentCore

export let getComponent = getComponentCore

export let getAllComponents = getAllComponentsCore

export let getComponentData = getComponentDataCore

export let getComponentGameObjects = getComponentGameObjectsCore

export let getIsDebug = getIsDebugCore

export let setIsDebug = setIsDebugCore