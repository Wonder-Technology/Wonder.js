import { getPosition as getSpecifyLightPositionUtils, getRenderData as getSpecifyLightRenderData } from "./specifyLightUtils";

export var getRenderData = (index: number, AmbientLightDataFromSystem: any) => {
    return getSpecifyLightRenderData(index, AmbientLightDataFromSystem);
}
