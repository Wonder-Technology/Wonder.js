import { initDataHelper } from "../../../component/light/DirectionLightSystem";

export const initData = (DirectionLightData: any) => {
    initDataHelper(DirectionLightData);

    DirectionLightData.lightGLSLDataStructureMemberNameArr = [
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
}
