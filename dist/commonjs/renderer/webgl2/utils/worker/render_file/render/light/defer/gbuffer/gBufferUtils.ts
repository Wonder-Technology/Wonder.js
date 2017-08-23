//todo dispose gbuffer(textures...)

export var init = (gl: any, GBufferData: any) => {
    //todo support pass emission color in gbuffer or not in

    var gBuffer = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, gBuffer);

    let positionTarget = _createPositionTarget(gl),
        normalTarget = _createNormalTarget(gl),
        colortarget = _createColorTarget(gl),
        depthTexture = _createDepthTexture(gl);

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
}

var _createPositionTarget = (gl: any) => {
    var positionTarget = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, positionTarget);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //todo watch out gl.RGBA16F(vec4), gl.RG16F(vec2)!
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, positionTarget, 0);

    return positionTarget;
}

var _createNormalTarget = (gl: any) => {
    //todo use rbg16F?
    // (should use EXT_color_buffer_half_float extension)
    // refer to https://www.khronos.org/registry/webgl/extensions/EXT_color_buffer_float/
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
}

var _createColorTarget = (gl: any) => {
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
}

var _createDepthTexture = (gl: any) => {
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
}

export var bindGBufferTargets = (gl: any, GBufferData: any) => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.positionTarget);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.normalTarget);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, GBufferData.colorTarget);
    gl.activeTexture(gl.TEXTURE3);
}

export var sendGBufferTargetData = (gl: any, lightPassProgram: WebGLProgram) => {
    var positionBufferLocation = gl.getUniformLocation(lightPassProgram, "u_positionBuffer"),
        normalBufferLocation = gl.getUniformLocation(lightPassProgram, "u_normalBuffer"),
        colorBufferLocation = gl.getUniformLocation(lightPassProgram, "u_colorBuffer");

    gl.uniform1i(positionBufferLocation, 0);
    gl.uniform1i(normalBufferLocation, 1);
    gl.uniform1i(colorBufferLocation, 2);
}

export var bindGBuffer = (gl: any, GBufferData: any) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, GBufferData.gBuffer);
}

export var unbindGBuffer = (gl: any) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

export var getNewTextureUnitIndex = () => 3;
