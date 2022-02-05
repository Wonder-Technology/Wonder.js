import { basicCameraView, componentName, dataName } from "../../wonder-component-type-basiccameraview"
import { createComponent, setComponentData, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-engine-core"

export function create() {
    let data = unsafeGetRelatedComponentData(componentName)

    let [d, basicCameraView] = createComponent(data)

    setRelatedComponentData(d, componentName)

    return basicCameraView
}

export function active(basicCameraView: basicCameraView) {
    let data = unsafeGetRelatedComponentData(componentName)


    data = setComponentData(data, basicCameraView, dataName.active, true)

    setRelatedComponentData(data, componentName)
}