import { DataBufferConfig } from "../../../config/DataBufferConfig";

export const getAmbientLightBufferCount = () => {
    return DataBufferConfig.ambientLightDataBufferCount;
}

export const getDirectionLightBufferCount = () => {
    return DataBufferConfig.directionLightDataBufferCount;
}

export const getPointLightBufferCount = () => {
    return DataBufferConfig.pointLightDataBufferCount;
}
