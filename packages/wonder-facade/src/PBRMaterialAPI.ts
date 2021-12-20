import { componentName, pbrMaterial, diffuseColor, dataName } from "../../wonder-component-type-pbrmaterial"
import { createComponent, setComponentData, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-core"

export function create() {
    let data = unsafeGetRelatedComponentData(componentName)

    let [d, pbrMaterial] = createComponent(data)

    setRelatedComponentData(d, componentName)

    return pbrMaterial

}

export function setDiffuseColor(pbrMaterial: pbrMaterial, diffuseColor: diffuseColor) {
    let data = unsafeGetRelatedComponentData(componentName)


    data = setComponentData(data, pbrMaterial, dataName.diffuseColor, diffuseColor)

    setRelatedComponentData(data, componentName)
}
