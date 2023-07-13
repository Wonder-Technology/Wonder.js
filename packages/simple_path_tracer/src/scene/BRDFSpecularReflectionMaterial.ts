export let createBRDFSpecularReflectionMaterial = ({ isRectAreaLight = false, type = 1 }) => {
    return {
        type,
        isRectAreaLight
    }
}