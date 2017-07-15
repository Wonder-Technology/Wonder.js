import { DataBufferConfig } from "../../../config/DataBufferConfig";

export var getAmbientLightBufferCount = () => {
    return DataBufferConfig.ambientLightDataBufferCount;
}

export var getDirectionLightBufferCount = () => {
    return DataBufferConfig.directionLightDataBufferCount;
}

export var getPointLightBufferCount = () => {
    return DataBufferConfig.pointLightDataBufferCount;
}
