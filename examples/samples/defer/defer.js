var canvas = document.getElementById("gl-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var gl = canvas.getContext("webgl2");
if (!gl) {
    console.error("WebGL 2 not available");
    document.body.innerHTML = "This example requires WebGL 2 which is unavailable on this system."
}

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

/*! why use blend?
////accumulate in framebuffer using additive blending;

blend gbuffer's textures in light pass
*/

gl.blendFunc(gl.ONE, gl.ONE);

if (!gl.getExtension("EXT_color_buffer_float")) {
    console.error("FLOAT color buffer not available");
    document.body.innerHTML = "This example requires EXT_color_buffer_float which is unavailable on this system."
}


////////////////////////////
// GBUFFER PROGRAM SETUP
////////////////////////////

var geoVsSource =  document.getElementById("geo-vs").text.trim();
var geoFsSource =  document.getElementById("geo-fs").text.trim();

var geoVertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(geoVertexShader, geoVsSource);
gl.compileShader(geoVertexShader);

if (!gl.getShaderParameter(geoVertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(geoVertexShader));
}

var geoFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(geoFragmentShader, geoFsSource);
gl.compileShader(geoFragmentShader);

if (!gl.getShaderParameter(geoFragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(geoFragmentShader));
}

var geoProgram = gl.createProgram();
gl.attachShader(geoProgram, geoVertexShader);
gl.attachShader(geoProgram, geoFragmentShader);
gl.linkProgram(geoProgram);

if (!gl.getProgramParameter(geoProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(geoProgram));
}



//////////////////////////////////////////
// GET GBUFFFER PROGRAM UNIFORM LOCATIONS
//////////////////////////////////////////

var matrixUniformLocation = gl.getUniformBlockIndex(geoProgram, "Matrices");
gl.uniformBlockBinding(geoProgram, matrixUniformLocation, 0);




////////////////////////////
// GBUFFER SETUP
////////////////////////////

var gBuffer = gl.createFramebuffer();
gl.bindFramebuffer(gl.FRAMEBUFFER, gBuffer);

gl.activeTexture(gl.TEXTURE0);

var positionTarget = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, positionTarget);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, positionTarget, 0);

var normalTarget = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, normalTarget);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, normalTarget, 0);

var uvTarget = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, uvTarget);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RG16F, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, uvTarget, 0);

var depthTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, depthTexture);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT16, gl.drawingBufferWidth, gl.drawingBufferHeight);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);

gl.drawBuffers([
    gl.COLOR_ATTACHMENT0,
    gl.COLOR_ATTACHMENT1,
    gl.COLOR_ATTACHMENT2
]);


gl.bindFramebuffer(gl.FRAMEBUFFER, null);








/////////////////////////////
// MAIN PROGRAM SETUP
/////////////////////////////

var mainVsSource =  document.getElementById("main-vs").text.trim();
var mainFsSource =  document.getElementById("main-fs").text.trim();

var mainVertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(mainVertexShader, mainVsSource);
gl.compileShader(mainVertexShader);

if (!gl.getShaderParameter(mainVertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(mainVertexShader));
}

var mainFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(mainFragmentShader, mainFsSource);
gl.compileShader(mainFragmentShader);

if (!gl.getShaderParameter(mainFragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(mainFragmentShader));
}

var mainProgram = gl.createProgram();
gl.attachShader(mainProgram, mainVertexShader);
gl.attachShader(mainProgram, mainFragmentShader);
gl.linkProgram(mainProgram);

if (!gl.getProgramParameter(mainProgram, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(mainProgram));
}

//////////////////////////////////////////////
// GET MAIN PROGRAM UNIFORM LOCATIONS
//////////////////////////////////////////////

var lightUniformsLocation = gl.getUniformBlockIndex(mainProgram, "LightUniforms");
gl.uniformBlockBinding(mainProgram, lightUniformsLocation, 0);

var eyePositionLocation = gl.getUniformLocation(mainProgram, "uEyePosition");

var positionBufferLocation = gl.getUniformLocation(mainProgram, "uPositionBuffer");
var normalBufferLocation = gl.getUniformLocation(mainProgram, "uNormalBuffer");
var uVBufferLocation = gl.getUniformLocation(mainProgram, "uUVBuffer");
var textureMapLocation = gl.getUniformLocation(mainProgram, "uTextureMap");




///////////////////////
// GEOMETRY SET UP
///////////////////////

//vao
var cubeVertexArray = gl.createVertexArray();
gl.bindVertexArray(cubeVertexArray);

var box = utils.createBox();

var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, box.positions, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);

var normalBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
gl.bufferData(gl.ARRAY_BUFFER, box.normals, gl.STATIC_DRAW);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(1);

var uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, box.uvs, gl.STATIC_DRAW);
gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(2);

//todo render quad instead of sphere

var sphereVertexArray = gl.createVertexArray();
gl.bindVertexArray(sphereVertexArray);

var numCubeVertices = box.positions.length / 3;

var sphere = utils.createSphere({
    radiuse: 100
});

positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, sphere.positions, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);

var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW);

var numSphereElements = sphere.indices.length;

gl.bindVertexArray(null);







////////////////////
// UNIFORM DATA
////////////////////

var projMatrix = mat4.create();
mat4.perspective(projMatrix, Math.PI / 2, canvas.width / canvas.height, 0.1, 10.0);

var viewMatrix = mat4.create();
// var eyePosition = vec3.fromValues(1, 1, 1);
var eyePosition = vec3.fromValues(4, 4, 4);
// var eyePosition = vec3.fromValues(0.6, 0.6, 0.6);
mat4.lookAt(viewMatrix, eyePosition, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));

var viewProjMatrix = mat4.create();
mat4.multiply(viewProjMatrix, projMatrix, viewMatrix);



var boxes = [
    {
        scale: [1, 1, 1],
        rotate: [0, 0, 0],
        translate: [0, 0, 0],
        modelMatrix: mat4.create(),
        mvpMatrix: mat4.create(),
    },
    {
        scale: [0.1, 0.1, 0.1],
        rotate: [0, 0, Math.PI / 3],
        translate: [0.8, 0.8, 0.4],
        modelMatrix: mat4.create(),
        mvpMatrix: mat4.create(),
    }
];

var matrixUniformData = new Float32Array(32);
var matrixUniformBuffer = gl.createBuffer();
gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, matrixUniformBuffer);
gl.bufferData(gl.UNIFORM_BUFFER, 128, gl.DYNAMIC_DRAW);

//todo compute
var radius = 2;

var lights = [
    {
        position: vec3.fromValues(0, 1, 0.5),
        color:    vec3.fromValues(0.8, 0.0, 0.0),
        radius: radius,
        uniformData: new Float32Array(24),
        uniformBuffer: gl.createBuffer()
    },
    {
        position: vec3.fromValues(1, 1, 0.5),
        color:    vec3.fromValues(0.0, 0.0, 0.8),
        radius: radius,
        uniformData: new Float32Array(24),
        uniformBuffer: gl.createBuffer()
    },
    {
        position: vec3.fromValues(1, 0, 0.5),
        color:    vec3.fromValues(0.0, 0.8, 0.0),
        radius: radius,
        uniformData: new Float32Array(24),
        uniformBuffer: gl.createBuffer()
    },
    {
        position: vec3.fromValues(0.5, 0, 1),
        color:    vec3.fromValues(0.0, 0.8, 0.8),
        radius: radius,
        uniformData: new Float32Array(24),
        uniformBuffer: gl.createBuffer()
    }
];

var mvpMatrix = mat4.create();
for (var i = 0, len = lights.length; i < len; ++i) {
    utils.xformMatrix(mvpMatrix, lights[i].position);
    mat4.multiply(mvpMatrix, viewProjMatrix, mvpMatrix);
    lights[i].uniformData.set(mvpMatrix);
    lights[i].uniformData.set(lights[i].position, 16);
    lights[i].uniformData.set(lights[i].color, 20);
    // lights[i].uniformData.set(lights[i].position, 0);
    // lights[i].uniformData.set(lights[i].color, 4);

    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, lights[i].uniformBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, lights[i].uniformData, gl.STATIC_DRAW);
}







var image = new Image();

image.onload = function() {
    var colorTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, colorTexture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    var levels = levels = Math.floor(Math.log2(Math.max(this.width, this.height))) + 1;
    gl.texStorage2D(gl.TEXTURE_2D, levels, gl.RGBA8, image.width, image.height);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.generateMipmap(gl.TEXTURE_2D);

    //////////////////
    // BIND TEXTURES
    //////////////////

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, positionTarget);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, normalTarget);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, uvTarget);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, colorTexture);

    //////////////////////////////
    // SET MAIN PROGRAM UNIFORMS
    //////////////////////////////

    gl.useProgram(mainProgram);
    gl.uniform3fv(eyePositionLocation, eyePosition);
    gl.uniform1i(positionBufferLocation, 0);
    gl.uniform1i(normalBufferLocation, 1);
    gl.uniform1i(uVBufferLocation, 2);
    gl.uniform1i(textureMapLocation, 3);

    function draw() {

        /////////////////////////
        // DRAW TO GBUFFER
        /////////////////////////

        gl.bindFramebuffer(gl.FRAMEBUFFER, gBuffer);
        gl.useProgram(geoProgram);
        gl.bindVertexArray(cubeVertexArray);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (var i = 0, len = boxes.length; i < len; ++i) {
            boxes[i].rotate[0] += 0.01;
            boxes[i].rotate[1] += 0.02;

            utils.xformMatrix(boxes[i].modelMatrix, boxes[i].translate, boxes[i].rotate, boxes[i].scale);
            mat4.multiply(boxes[i].mvpMatrix, viewProjMatrix, boxes[i].modelMatrix);

            matrixUniformData.set(boxes[i].modelMatrix);
            matrixUniformData.set(boxes[i].mvpMatrix, 16);

            gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, matrixUniformBuffer);
            gl.bufferSubData(gl.UNIFORM_BUFFER, 0, matrixUniformData);

            gl.drawArrays(gl.TRIANGLES, 0, numCubeVertices);
        }

        /////////////////////////
        // MAIN DRAW PASS
        /////////////////////////

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(mainProgram);
        gl.bindVertexArray(sphereVertexArray);
        gl.depthMask(false);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.FRONT);


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        gl.enable(gl.SCISSOR_TEST);


        for (var i = 0, len = lights.length; i < len; ++i) {
            let viewMat = new THREE.Matrix4();

            viewMat.elements = viewMatrix;

            let projMat = new THREE.Matrix4();

            projMat.elements = projMatrix;


            var sc = getScissorForLight(viewMat, projMat, lights[i], canvas.width, canvas.height);

            if (sc) {
                gl.scissor(sc[0], sc[1], sc[2], sc[3]);
            }


            gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, lights[i].uniformBuffer);
            gl.drawElements(gl.TRIANGLES, numSphereElements, gl.UNSIGNED_SHORT, 0);
        }

        gl.cullFace(gl.BACK);

        gl.disable(gl.SCISSOR_TEST);

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

}

var getScissorForLight = (function() {
    // Pre-allocate for performance - avoids additional allocation
    var a = new THREE.Vector4(0, 0, 0, 0);
    var b = new THREE.Vector4(0, 0, 0, 0);
    var minpt = new THREE.Vector2(0, 0);
    var maxpt = new THREE.Vector2(0, 0);
    var ret = [0, 0, 0, 0];

    return function(view, proj, l, width, height) {
        // front bottom-left corner of sphere's bounding cube
        a.fromArray(l.position);
        a.w = 1;
        a.applyMatrix4(view);
        a.x -= l.radius;
        a.y -= l.radius;
        a.z += l.radius;
        a.applyMatrix4(proj);
        a.divideScalar(a.w);

        // front bottom-left corner of sphere's bounding cube
        b.fromArray(l.position);
        b.w = 1;
        b.applyMatrix4(view);
        b.x += l.radius;
        b.y += l.radius;
        b.z += l.radius;
        b.applyMatrix4(proj);
        b.divideScalar(b.w);

        minpt.set(Math.max(-1, a.x), Math.max(-1, a.y));
        maxpt.set(Math.min( 1, b.x), Math.min( 1, b.y));

        if (maxpt.x < -1 || 1 < minpt.x ||
            maxpt.y < -1 || 1 < minpt.y) {
            return null;
        }

        minpt.addScalar(1.0); minpt.multiplyScalar(0.5);
        maxpt.addScalar(1.0); maxpt.multiplyScalar(0.5);

        ret[0] = Math.round(width * minpt.x);
        ret[1] = Math.round(height * minpt.y);
        ret[2] = Math.round(width * (maxpt.x - minpt.x));
        ret[3] = Math.round(height * (maxpt.y - minpt.y));
        return ret;
    };
})();

image.src = "img/khronos_webgl.png";
