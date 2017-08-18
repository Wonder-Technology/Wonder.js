import { WebGLVertexArrayObject } from "../../../../../extend/interface";

export var createVao = (extension:any) => {
    return extension.createVertexArrayOES();
}

export var bindVao = (extension:any, vao:WebGLVertexArrayObject) => {
    extension.bindVertexArrayOES(vao);
}

export var unbindVao = (extension:any) => {
    extension.bindVertexArrayOES(null);
}

