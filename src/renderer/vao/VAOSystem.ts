export var bindVAO = (gl:any, vao:WebGLVertexArrayObject) => {
    gl.bindVertexArray(vao);
}

export var unbindVAO = (gl:any) => {
    gl.bindVertexArray(null);
}
