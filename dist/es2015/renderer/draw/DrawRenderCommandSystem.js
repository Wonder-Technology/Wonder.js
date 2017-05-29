import curry from "wonder-lodash/curry";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
import { getType, getTypeSize } from "../buffer/IndexBufferSystem";
import { getGL } from "../../device/DeviceManagerSystem";
import { getDrawMode, getIndicesCount, getVerticesCount, hasIndices } from "../../component/geometry/GeometrySystem";
export var draw = curry(function (state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData, renderCommandArray) {
    for (var _i = 0, renderCommandArray_1 = renderCommandArray; _i < renderCommandArray_1.length; _i++) {
        var renderCommand = renderCommandArray_1[_i];
        var shaderIndex = renderCommand.shaderIndex, geometryIndex = renderCommand.geometryIndex, gl = getGL(DeviceManagerData, state);
        use(gl, shaderIndex, ShaderData);
        sendAttributeData(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
        sendUniformData(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
        if (hasIndices(geometryIndex, GeometryData)) {
            bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);
            _drawElements(gl, geometryIndex, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, GeometryData);
        }
    }
    return state;
});
var _drawElements = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = getDrawMode(geometryIndex, GeometryData), count = getIndicesCount(geometryIndex, GeometryData), type = getType(GeometryData), typeSize = getTypeSize(GeometryData);
    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
};
var _drawArray = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = getDrawMode(geometryIndex, GeometryData), count = getVerticesCount(geometryIndex, GeometryData);
    gl.drawArrays(gl[drawMode], startOffset, count);
};
//# sourceMappingURL=DrawRenderCommandSystem.js.map