import { initDataHelper } from "../../../component/light/PointLightSystem";

export var initData = (PointLightData: any) => {
    initDataHelper(PointLightData);

    PointLightData.lightGLSLDataStructureMemberNameArr = [
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
}
