import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";

export var createVao = (gl:any) => {
    return gl.createVertexArray();
}

export var bindVao = (gl:any, vao:WebGLVertexArrayObject) => {
    gl.bindVertexArray(vao);
}

export var unbindVao = (gl:any) => {
    gl.bindVertexArray(null);
}

export var disposeVao = (gl:any, geometryIndex:number, vaoMap:VaoMap, vboArrayMap:VboArrayMap) => {
    gl.deleteVertexArray(vaoMap[geometryIndex]);

    removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
}
