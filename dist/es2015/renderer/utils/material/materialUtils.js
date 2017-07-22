import { getSingleSizeData } from "../common/operateBufferDataUtils";
import { setTypeArrayValue } from "../../../utils/typeArrayUtils";
export var setShaderIndex = function (materialIndex, shaderIndex, MaterialDataFromSystem) {
    setTypeArrayValue(MaterialDataFromSystem.shaderIndices, materialIndex, shaderIndex);
};
export var getOpacity = function (materialIndex, MaterialDataFromSystem) {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.opacities);
};
export var getAlphaTest = function (materialIndex, MaterialDataFromSystem) {
    return getSingleSizeData(materialIndex, MaterialDataFromSystem.alphaTests);
};
export var isTestAlpha = function (alphaTest) {
    return alphaTest >= 0;
};
export var getShaderIndexDataSize = function () { return 1; };
export var getColorDataSize = function () { return 3; };
export var getOpacityDataSize = function () { return 1; };
export var getAlphaTestDataSize = function () { return 1; };
export var createTypeArrays = function (buffer, count, MaterialDataFromSystem) {
    var offset = 0;
    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count * getShaderIndexDataSize());
    offset += count * Uint32Array.BYTES_PER_ELEMENT * getShaderIndexDataSize();
    MaterialDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    MaterialDataFromSystem.opacities = new Float32Array(buffer, offset, count * getOpacityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getOpacityDataSize();
    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, offset, count * getAlphaTestDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getAlphaTestDataSize();
    return offset;
};
export var buildInitShaderDataMap = function (DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, ShaderDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        ShaderDataFromSystem: ShaderDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem
    };
};
//# sourceMappingURL=materialUtils.js.map