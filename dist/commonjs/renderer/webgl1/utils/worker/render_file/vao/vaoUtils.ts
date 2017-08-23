import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { removeVao } from "../../../../../utils/worker/render_file/vao/vaoUtils";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";

export var createVao = (extension:any) => {
    return extension.createVertexArrayOES();
}

export var bindVao = (extension:any, vao:WebGLVertexArrayObject) => {
    extension.bindVertexArrayOES(vao);
}

export var unbindVao = (extension:any) => {
    extension.bindVertexArrayOES(null);
}

export var disposeVao = (gl:any, extension:any, geometryIndex:number, vaoMap:VaoMap, vboArrayMap:VboArrayMap) => {
    extension.deleteVertexArrayOES(vaoMap[geometryIndex]);

    removeVao(gl, geometryIndex, vaoMap, vboArrayMap);
}
