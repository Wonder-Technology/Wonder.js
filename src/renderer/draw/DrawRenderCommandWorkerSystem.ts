import curry from "wonder-lodash/curry";
import { RenderCommand } from "../command/RenderCommand";
import { Map } from "immutable";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
import { getType, getTypeSize } from "../buffer/IndexBufferSystem";
import { clear as clearGL, getGL } from "../../device/DeviceManagerSystem";
import { getDrawMode, getIndicesCount, getVerticesCount, hasIndices } from "../../component/geometry/GeometrySystem";
import { IRenderConfig } from "../data/render_config";

export var clear = (state: Map<any, any>, render_config:IRenderConfig, DeviceManagerData: any) => {
    clearGL(getGL(DeviceManagerData, state), render_config.clearColor, DeviceManagerData);

    return state;
}

export var draw = (state: Map<any, any>, DeviceManagerData: any, MaterialData: any, ShaderData: any, ProgramData:any, LocationData:any, GLSLSenderData:any, GeometryData: any, ArrayBufferData: any, IndexBufferData: any, renderCommandArray: Array<RenderCommand>) => {
    for (let renderCommand of renderCommandArray) {
        var shaderIndex = renderCommand.shaderIndex,
            geometryIndex = renderCommand.geometryIndex,
            gl = getGL(DeviceManagerData, state);

        use(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);

        //todo set state

        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
        sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommand);

        if (hasIndices(geometryIndex, GeometryData)) {
            bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);

            _drawElements(gl, geometryIndex, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, GeometryData);
        }
    }

    return state;
}

var _drawElements = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any) => {
    var startOffset: number = 0,
        drawMode = getDrawMode(geometryIndex, GeometryData),
        count = getIndicesCount(geometryIndex, GeometryData),
        type = getType(GeometryData),
        typeSize = getTypeSize(GeometryData);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);

    gl.commit(); // new for webgl in workers
}

var _drawArray = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any) => {
    var startOffset: number = 0,
        drawMode = getDrawMode(geometryIndex, GeometryData),
        count = getVerticesCount(geometryIndex, GeometryData);

    gl.drawArrays(gl[drawMode], startOffset, count);
}

