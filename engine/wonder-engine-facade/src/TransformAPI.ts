import { componentName, dataName, position, transform } from "../../wonder-component-type-transform"
import { createComponent, setComponentData, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-engine-core"
import { lookAt as transformLookAt } from "wonder-component-commonlib"


export function create() {
    let data = unsafeGetRelatedComponentData(componentName)

    let [d, transform] = createComponent(data)

    setRelatedComponentData(d, componentName)

    return transform

}

export let setLocalPosition = (transform: transform, position: position) => {
    let data = unsafeGetRelatedComponentData(componentName)

    data = setComponentData(data, transform, dataName.localPosition, position)

    setRelatedComponentData(data, componentName)
}


export let lookAt = (transform: transform, target: [number, number, number]) => {
    let data = unsafeGetRelatedComponentData(componentName)

    data = transformLookAt(data, transform, target)

    setRelatedComponentData(data, componentName)
}