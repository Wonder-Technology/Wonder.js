/*!
each direction/point light's max count = 4

here use hard writting instead of generating once when exec js for performance
 */

export const POINT_LIGHT_GLSLDATA_STRUCTURE_MEMBER_NAME = [
    {
        position: "u_pointLights[0].position",
        color: "u_pointLights[0].color",
        intensity: "u_pointLights[0].intensity",
        constant: "u_pointLights[0].constant",
        linear: "u_pointLights[0].linear",
        quadratic: "u_pointLights[0].quadratic",
        range: "u_pointLights[0].range"
    }, {
        position: "u_pointLights[1].position",
        color: "u_pointLights[1].color",
        intensity: "u_pointLights[1].intensity",
        constant: "u_pointLights[1].constant",
        linear: "u_pointLights[1].linear",
        quadratic: "u_pointLights[1].quadratic",
        range: "u_pointLights[1].range"
    }, {
        position: "u_pointLights[2].position",
        color: "u_pointLights[2].color",
        intensity: "u_pointLights[2].intensity",
        constant: "u_pointLights[2].constant",
        linear: "u_pointLights[2].linear",
        quadratic: "u_pointLights[2].quadratic",
        range: "u_pointLights[2].range"
    }, {
        position: "u_pointLights[3].position",
        color: "u_pointLights[3].color",
        intensity: "u_pointLights[3].intensity",
        constant: "u_pointLights[3].constant",
        linear: "u_pointLights[3].linear",
        quadratic: "u_pointLights[3].quadratic",
        range: "u_pointLights[3].range"
    }
];


export const DIRECTION_LIGHT_GLSLDATA_STRUCTURE_MEMBER_NAME = [
    {
        position: "u_directionLights[0].position",
        color: "u_directionLights[0].color",
        intensity: "u_directionLights[0].intensity"
    }, {
        position: "u_directionLights[1].position",
        color: "u_directionLights[1].color",
        intensity: "u_directionLights[1].intensity"
    }, {
        position: "u_directionLights[2].position",
        color: "u_directionLights[2].color",
        intensity: "u_directionLights[2].intensity"
    }, {
        position: "u_directionLights[3].position",
        color: "u_directionLights[3].color",
        intensity: "u_directionLights[3].intensity"
    }
];

