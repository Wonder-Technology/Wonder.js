import { WebGLVertexArrayObject } from "../../../../../extend/interface";

export var createVao = (gl:any) => {
    return gl.createVertexArray();
}

export var bindVao = (gl:any, vao:WebGLVertexArrayObject) => {
    gl.bindVertexArray(vao);
}

export var unbindVao = (gl:any) => {
    gl.bindVertexArray(null);
}

