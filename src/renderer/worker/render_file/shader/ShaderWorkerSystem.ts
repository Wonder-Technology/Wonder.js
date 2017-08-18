import {
    use as useUtils
} from "../../../utils/worker/render_file/shader/shaderUtils";
import { createMap } from "../../../../utils/objectUtils";

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    //todo fix
    // bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export var use = useUtils;

export var initData = (ShaderWorkerData: any) => {
    ShaderWorkerData.index = 0;
    ShaderWorkerData.count = 0;

    ShaderWorkerData.shaderIndexByMaterialIndexAndShaderNameMap = createMap();
}
