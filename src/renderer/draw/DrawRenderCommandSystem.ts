import forEach from "wonder-lodash/forEach";
import curry from "wonder-lodash/curry";
import { RenderCommand } from "../command/RenderCommand";
import { Map } from "immutable";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
import { getType, getTypeSize } from "../buffer/IndexBufferSystem";
import { getGL } from "../../device/DeviceManagerSystem";
import { getDrawMode, getIndicesCount, getVerticesCount, hasIndices } from "../../component/geometry/GeometrySystem";

export var draw = curry((state:Map<any, any>, ShaderData:any, GeometryData:any, ArrayBufferData:any, IndexBufferData:any, renderCommandArray:Array<RenderCommand>) => {
    forEach(renderCommandArray, (renderCommand:RenderCommand) => {
        var shaderIndex = renderCommand.shaderIndex,
            geometryIndex = renderCommand.geometryIndex,
            gl = getGL(state);

        use(gl, shaderIndex, ShaderData);

        //todo set state

        sendAttributeData(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
        sendUniformData(gl, shaderIndex, ShaderData, renderCommand);

        if(hasIndices(geometryIndex, GeometryData)){
            bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);

            _drawElements(gl, geometryIndex, GeometryData);
        }
        else{
            _drawArray(gl, geometryIndex, GeometryData);
        }
    })

    return state;
})

var _drawElements = (gl:WebGLRenderingContext, geometryIndex:number, GeometryData:any) => {
    var startOffset: number = 0,
        drawMode = getDrawMode(geometryIndex, GeometryData),
        count = getIndicesCount(geometryIndex, GeometryData),
        type = getType(GeometryData),
        typeSize = getTypeSize(GeometryData);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
}

var _drawArray = (gl:WebGLRenderingContext, geometryIndex:number, GeometryData:any) => {
    var startOffset: number = 0,
        drawMode = getDrawMode(geometryIndex, GeometryData),
        count = getVerticesCount(geometryIndex, GeometryData);

    gl.drawArrays(gl[drawMode], startOffset, count);
}

