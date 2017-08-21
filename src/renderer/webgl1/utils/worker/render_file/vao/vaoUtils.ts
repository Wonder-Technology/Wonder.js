import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";

export var createVao = (extension:any) => {
    return extension.createVertexArrayOES();
}

export var bindVao = (extension:any, vao:WebGLVertexArrayObject) => {
    extension.bindVertexArrayOES(vao);
}

export var unbindVao = (extension:any) => {
    extension.bindVertexArrayOES(null);
}

export var disposeVao = (extension:any, geometryIndex:number, vaos:Array<WebGLVertexArrayObject>) => {
    extension.deleteVertexArrayOES(vaos[geometryIndex]);

    removeVao(geometryIndex, vaos);
}
