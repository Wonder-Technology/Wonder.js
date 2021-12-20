import { componentName, dataName, geometry } from "../../wonder-component-type-geometry"
import { createComponent, setComponentData, setRelatedComponentData, unsafeGetRelatedComponentData } from "wonder-core"

export function create() {
    let data = unsafeGetRelatedComponentData(componentName)

    let [d, geometry] = createComponent(data)

    setRelatedComponentData(d, componentName)

    return geometry
}

export function setVertices(geometry: geometry, vertices: Float32Array) {
    let data = unsafeGetRelatedComponentData(componentName)


    data = setComponentData(data, geometry, dataName.vertices, vertices)

    setRelatedComponentData(data, componentName)
}

export function setIndices(geometry: geometry, indices: Uint32Array) {
    let data = unsafeGetRelatedComponentData(componentName)


    data = setComponentData(data, geometry, dataName.indices, indices)

    setRelatedComponentData(data, componentName)
}