import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";

export var createVao = (gl:any) => {
    return gl.createVertexArray();
}

export var bindVao = (gl:any, vao:WebGLVertexArrayObject) => {
    gl.bindVertexArray(vao);
}

export var unbindVao = (gl:any) => {
    gl.bindVertexArray(null);
}

export var disposeVao = (gl:any, geometryIndex:number, vaos:Array<WebGLVertexArrayObject>) => {
    gl.deleteVertexArray(vaos[geometryIndex]);

    removeVao(geometryIndex, vaos);
}
