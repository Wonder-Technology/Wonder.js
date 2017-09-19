import { IMaterialConfig } from "../../renderer/data/material_config_interface";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator_interface";
import { DeviceManagerData } from "../../renderer/device/DeviceManagerData";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import {
    addComponent as addBasicMaterialComponent,
    createTypeArrays as createBasicMaterialTypeArrays,
    disposeComponent as disposeBasicMaterialComponent,
    initMaterial as initBasicMaterial,
    initData as initBasicMaterialData,
    initMaterialWithoutInitMap as initBasicMaterialWithoutInitMap,
    setDefaultData as setBasicMaterialDefaultData
} from "./BasicMaterialSystem";
import {
    addComponent as addLightMaterialComponent,
    createTypeArrays as createLightMaterialTypeArrays,
    disposeComponent as disposeLightMaterialComponent,
    initMaterial as initLightMaterial,
    initData as initLightMaterialData,
    initMaterialWithoutInitMap as initLightMaterialWithoutInitMap,
    setDefaultData as setLightMaterialDefaultData
} from "./LightMaterialSystem";
import { createDefaultColor, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { initData as initMapManagerData, initMapManagers } from "../../renderer/texture/MapManagerSystem";
import {
    addAddComponentHandle as addAddComponentHandleToMap,
    addDisposeHandle as addDisposeHandleToMap,
    addInitHandle as  addInitHandleToMap
} from "../ComponentSystem";
import { Map } from "immutable";
import {
    buildInitShaderDataMap, createTypeArrays,
    initNoMaterialShaders, setShaderIndex
} from "../../renderer/utils/worker/render_file/material/materialUtils";
import {
    getBasicMaterialBufferStartIndex,
    getLightMaterialBufferStartIndex
} from "../../renderer/utils/material/bufferUtils";
import {
    getBasicMaterialBufferCount, getBufferLength,
    getBufferTotalCount, getLightMaterialBufferCount
} from "../../renderer/utils/worker/render_file/material/bufferUtils";
import { createSharedArrayBufferOrArrayBuffer } from "../../utils/arrayBufferUtils";

export const init = (state: Map<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, AmbientLightData, DirectionLightData: any, PointLightData: any, GPUDetectData: any, GLSLSenderData: any, ProgramData: any, VaoData: any, LocationData: any, ShaderData: any) => {
    initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, GPUDetectData, VaoData));

    _initMaterials(state, getBasicMaterialBufferStartIndex(), initBasicMaterialWithoutInitMap, BasicMaterialData);
    _initMaterials(state, getLightMaterialBufferStartIndex(), initLightMaterialWithoutInitMap, LightMaterialData);

    initMapManagers(gl, TextureData);
}

const _initMaterials = (state: Map<any, any>, startIndex: number, initSpecifyMaterialWithoutInitMap: Function, SpecifyMaterialData: any) => {
    for (let i = startIndex; i < SpecifyMaterialData.index; i++) {
        initSpecifyMaterialWithoutInitMap(i, state);
    }
}

export const initData = (TextureCacheData: any, TextureData: any, MapManagerData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    MaterialData.materialMap = [];

    MaterialData.gameObjectMap = [];

    // MaterialData.shaderMap = [];

    MaterialData.workerInitList = [];

    _setMaterialDefaultData(MaterialData);

    initBasicMaterialData(BasicMaterialData);
    setBasicMaterialDefaultData(BasicMaterialData);

    initLightMaterialData(LightMaterialData);
    setLightMaterialDefaultData(LightMaterialData);

    _initBufferData(MaterialData, BasicMaterialData, LightMaterialData);

    initMapManagerData(TextureCacheData, TextureData, MapManagerData);
}

const _setMaterialDefaultData = (MaterialData: any) => {
    MaterialData.defaultShaderIndex = 0;
    MaterialData.defaultColorArr = createDefaultColor().toVector3().toArray();
    MaterialData.defaultOpacity = 1;
    MaterialData.defaultAlphaTest = -1;
}

const _initBufferData = (MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => {
    var buffer: any = null,
        count = getBufferTotalCount(),
        offset: number = null;

    buffer = createSharedArrayBufferOrArrayBuffer(getBufferLength());

    offset = createTypeArrays(buffer, count, MaterialData);

    _setMaterialDefaultTypeArrData(count, MaterialData);

    offset = createBasicMaterialTypeArrays(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialData);
    offset = createLightMaterialTypeArrays(buffer, offset, getLightMaterialBufferCount(), LightMaterialData);

    MaterialData.buffer = buffer;
}

const _setMaterialDefaultTypeArrData = (count: number, MaterialData: any) => {
    var shaderIndex = MaterialData.defaultShaderIndex,
        color = createDefaultColor(),
        opacity = MaterialData.defaultOpacity,
        alphaTest = MaterialData.defaultAlphaTest;

    for (let i = 0; i < count; i++) {
        setShaderIndex(i, shaderIndex, MaterialData);
        setColor(i, color, MaterialData);
        setOpacity(i, opacity, MaterialData);
        setAlphaTest(i, alphaTest, MaterialData);
    }
}

export const addAddComponentHandle = (BasicMaterial: any, LightMaterial: any) => {
    addAddComponentHandleToMap(BasicMaterial, addBasicMaterialComponent);
    addAddComponentHandleToMap(LightMaterial, addLightMaterialComponent);
}

export const addDisposeHandle = (BasicMaterial: any, LightMaterial: any) => {
    addDisposeHandleToMap(BasicMaterial, disposeBasicMaterialComponent);
    addDisposeHandleToMap(LightMaterial, disposeLightMaterialComponent);
}

export const addInitHandle = (BasicMaterial: any, LightMaterial: any) => {
    addInitHandleToMap(BasicMaterial, initBasicMaterial);
    addInitHandleToMap(LightMaterial, initLightMaterial);
}