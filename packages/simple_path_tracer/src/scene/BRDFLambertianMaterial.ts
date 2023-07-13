export let createBRDFLambertianMaterial = ({ color = [0.0, 0.0, 0.0], isRectAreaLight = false, type=0 }) => {
    return {
        color,
        type,
        isRectAreaLight
    }
}