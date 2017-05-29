"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var ShaderSystem_1 = require("../shader/ShaderSystem");
var IndexBufferSystem_1 = require("../buffer/IndexBufferSystem");
var DeviceManagerSystem_1 = require("../../device/DeviceManagerSystem");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
exports.draw = curry_1.default(function (state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData, renderCommandArray) {
    for (var _i = 0, renderCommandArray_1 = renderCommandArray; _i < renderCommandArray_1.length; _i++) {
        var renderCommand = renderCommandArray_1[_i];
        var shaderIndex = renderCommand.shaderIndex, geometryIndex = renderCommand.geometryIndex, gl = DeviceManagerSystem_1.getGL(DeviceManagerData, state);
        ShaderSystem_1.use(gl, shaderIndex, ShaderData);
        ShaderSystem_1.sendAttributeData(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
        ShaderSystem_1.sendUniformData(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
        if (GeometrySystem_1.hasIndices(geometryIndex, GeometryData)) {
            ShaderSystem_1.bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);
            _drawElements(gl, geometryIndex, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, GeometryData);
        }
    }
    return state;
});
var _drawElements = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = GeometrySystem_1.getDrawMode(geometryIndex, GeometryData), count = GeometrySystem_1.getIndicesCount(geometryIndex, GeometryData), type = IndexBufferSystem_1.getType(GeometryData), typeSize = IndexBufferSystem_1.getTypeSize(GeometryData);
    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
};
var _drawArray = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = GeometrySystem_1.getDrawMode(geometryIndex, GeometryData), count = GeometrySystem_1.getVerticesCount(geometryIndex, GeometryData);
    gl.drawArrays(gl[drawMode], startOffset, count);
};
//# sourceMappingURL=DrawRenderCommandSystem.js.map