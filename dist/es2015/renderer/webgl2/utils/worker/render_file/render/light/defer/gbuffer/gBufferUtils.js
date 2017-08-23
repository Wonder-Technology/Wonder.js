export var init = function (gl, GBufferData) {
    var gBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, gBuffer);
    var positionTarget = _createPositionTarget(gl), normalTarget = _createNormalTarget(gl), colortarget = _createColorTarget(gl), depthTexture = _createDepthTexture(gl);
    gl.drawBuffers([
        gl.COLOR_ATTACHMENT0,
        gl.COLOR_ATTACHMENT1,
        gl.COLOR_ATTACHMENT2
    ]);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    GBufferData.gBuffer = gBuffer;
    GBufferData.positionTarget = positionTarget;
    GBufferData.normalTarget = normalTarget;
    GBufferData.colorTarget = colortarget;
    GBufferData.depthTexture = depthTexture;
};
var _createPositionTarget = function (gl) {
    var positionTarget = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, positionTarget);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, positionTarget, 0);
    return positionTarget;
};
var _createNormalTarget = function (gl) {
    var normalTarget = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, normalTarget);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, normalTarget, 0);
    return normalTarget;
};
var _createColorTarget = function (gl) {
    var colorTarget = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, colorTarget);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, colorTarget, 0);
    return colorTarget;
};
var _createDepthTexture = function (gl) {
    var depthTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, depthTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT16, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);
    return depthTexture;
};
export var bindGBufferTargets = function (gl, GBufferData) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.positionTarget);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.normalTarget);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.colorTarget);
    gl.activeTexture(gl.TEXTURE3);
};
export var sendGBufferTargetData = function (gl, lightPassProgram) {
    var positionBufferLocation = gl.getUniformLocation(lightPassProgram, "u_positionBuffer"), normalBufferLocation = gl.getUniformLocation(lightPassProgram, "u_normalBuffer"), colorBufferLocation = gl.getUniformLocation(lightPassProgram, "u_colorBuffer");
    gl.uniform1i(positionBufferLocation, 0);
    gl.uniform1i(normalBufferLocation, 1);
    gl.uniform1i(colorBufferLocation, 2);
};
export var bindGBuffer = function (gl, GBufferData) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, GBufferData.gBuffer);
};
export var unbindGBuffer = function (gl) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
export var getNewTextureUnitIndex = function () { return 3; };
//# sourceMappingURL=gBufferUtils.js.map