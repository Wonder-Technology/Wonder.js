import { componentName, dataName, perspectiveCameraProjection } from "../../wonder-component-type-perspectivecameraprojection"
import { createComponent, setComponentData, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-engine-core"

export function create() {
    let data = unsafeGetRelatedComponentData(componentName)

    let [d, perspectiveCameraProjection] = createComponent(data)

    setRelatedComponentData(d, componentName)

    return perspectiveCameraProjection

}

export function setFovy(perspectiveCameraProjection: perspectiveCameraProjection, fovy: number) {
    let data = unsafeGetRelatedComponentData(componentName)

    data = setComponentData(data, perspectiveCameraProjection, dataName.fovy, fovy)

    setRelatedComponentData(data, componentName)
}

export function setAspect(perspectiveCameraProjection: perspectiveCameraProjection, aspect: number) {
    let data = unsafeGetRelatedComponentData(componentName)

    data = setComponentData(data, perspectiveCameraProjection, dataName.aspect, aspect)

    setRelatedComponentData(data, componentName)
}

export function setNear(perspectiveCameraProjection: perspectiveCameraProjection, near: number) {
    let data = unsafeGetRelatedComponentData(componentName)

    data = setComponentData(data, perspectiveCameraProjection, dataName.near, near)

    setRelatedComponentData(data, componentName)
}

export function setFar(perspectiveCameraProjection: perspectiveCameraProjection, far: number) {
    let data = unsafeGetRelatedComponentData(componentName)

    data = setComponentData(data, perspectiveCameraProjection, dataName.far, far)

    setRelatedComponentData(data, componentName)
}