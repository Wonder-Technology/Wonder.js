var mMatrix = Math3D.Matrix.create();
var mvpMatrix = null;
var vMatrix = Math3D.Matrix.create();
var pMatrix = Math3D.Matrix.create();

// Size of off screen
var OFFSCREEN_WIDTH = 256;
var OFFSCREEN_HEIGHT = 256;

var pMatrixFBO = Math3D.Matrix.create();

function computeMvpMatrix(pMatrix, vMatrix, mMatrix){
    var matrix = pMatrix.copy();

    matrix.concat(vMatrix);
    matrix.concat(mMatrix);

    return matrix;
    //return Math3D.MatrixTool.multiply(Math3D.MatrixTool.multiply(pMatrix, vMatrix), mMatrix);
}

$(function(){
    var webgl = Engine3D.Webgl.create();

    webgl.init();

// canvas对象获取
//    c = document.getElementById('canvas');

    // Register the event handler
    // Current rotation angle ([y-axis, x-axis] degrees)
    var currentAngle = [0.0, 0.0];
    bindCanvasEvent(c);

//// webgl的context获取
//    gl = c.getContext('webgl') || c.getContext('experimental-webgl');
//
// gl.canvas = c;

    var loader = Engine3D.Loader.create();

    loader.load([{
        src: "../content/1.jpg",
        id: "1"
        //type: "texture"
    }]);




    var onload = function(){
        var vs = Engine3D.Shader.create();
        var fs = Engine3D.Shader.create();

        var prg = Engine3D.Program.create(vs.createShader("vs"), fs.createShader("fs"));

        //prg.setAttributeData("a_position", )


        //prg.a_position = gl.getAttribLocation(prg, "a_position");
        //prg.a_texCoord = gl.getAttribLocation(prg, "a_texCoord");
        //prg.u_mvpMatrix = gl.getUniformLocation(prg, 'u_mvpMatrix');
        //prg.u_sampler = gl.getUniformLocation(prg, 'u_sampler');


        //prg.setUniformData("a_")

        var plane = initVertexBuffersForPlane();

        plane.program = prg;


        var sphereModel = initVertexBuffers();
        sphereModel.program = prg;

        var texture = initTextures();
        sphereModel.texture = texture;

        // Initialize framebuffer object (FBO)
        var fbo = initFramebufferObject(gl);

        plane.texture = fbo.texture;

        function initVertexBuffersForPlane() {
            // Create face
            //  v1------v0
            //  |        |
            //  |        |
            //  |        |
            //  v2------v3

            // Vertex coordinates
            var vertices = new Float32Array([
                1.0, 1.0, 0.0,  -1.0, 1.0, 0.0,  -1.0,-1.0, 0.0,   1.0,-1.0, 0.0    // v0-v1-v2-v3
            ]);

            // Texture coordinates
            var texCoords = new Float32Array([1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0]);

            // Indices of the vertices
            var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);

            //var o = new Object(); // Create the "Object" object to return multiple objects.
            var o = Engine3D.Sprite.create("TRIANGLES");

            //o.setData({
            //    vertices:vertices,
            //    texCoords: texCoords,
            //    indices: indices
            //});

            o.setBuffers({
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            });
            //o.setBuffers([
            //    Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
            //    Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
            //    Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            //]);

            return o;
        }
        function initVertexBuffers() {
            var sphere = Cubic.Sphere.create();


            var pointX = 0.6,
                pointY = 0.2,
                pointZ = -0.1;
            //var pointX = 0,
            //    pointY = 0,
            //    pointZ = 0;

            var radius = 1.0;

            var latitudeBands = 10;
            var longitudeBands = 10;

            var data = sphere.getSphereDataByLatitudeLongtitude(pointX, pointY, pointZ, latitudeBands, longitudeBands, radius);

            var vertices = data.vertices;

            var normals = data.normals;

            var texCoords = data.texCoords;

            var indices = data.indices;

            var o = Engine3D.Sprite.create("TRIANGLES");


            o.setBuffers({
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            });
            //var o = new Object(); // Utilize Object to to return multiple buffer objects together
            //
            //// Write vertex information to buffer object
            //o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
            //o.normalBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
            //o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
            //o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
            ////if (!o.vertexBuffer || !o.normalBuffer || !o.texCoordBuffer || !o.indexBuffer) return null;
            //
            //o.numIndices = indices.length;

            //// Unbind the buffer object
            //gl.bindBuffer(gl.ARRAY_BUFFER, null);
            //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

            return o;
        }


        //todo 要先加载纹理，然后才进入游戏！
        function initTextures() {
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            var texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            }, true);
            //var texture = gl.createTexture();   // Create a texture object
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            // Get storage location of u_Sampler
            //if (!u_sampler) {
            //    console.log('Failed to get the storage location of u_sampler');
            //    return null;
            //}

            //var image = new Image();  // Create a image object
            //if (!image) {
            //    console.log('Failed to create the image object');
            //    return null;
            //}
            //// Register the event handler to be called when image loading is completed
            //image.onload = function() {
            texture.bindToUnit(0);
            texture.createTextureArea(loader.getResource("1"));

            texture.unBind();
            //// Write the image data to texture object
            //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
            //gl.activeTexture(gl.TEXTURE0);
            //gl.bindTexture(gl.TEXTURE_2D, texture);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            //
            //// Pass the texure unit 0 to u_Sampler
            //gl.useProgram(program);
            //gl.uniform1i(program.u_sampler, 0);
            //
            //gl.bindTexture(gl.TEXTURE_2D, null); // Unbind texture
            //};
            //
            //// Tell the browser to load an Image
            //image.src = '../content/1.jpg';

            return texture;
        }
        function initFramebufferObject() {
            var framebuffer, texture, depthBuffer;

            //// Define the error handling function
            //var error = function() {
            //    if (framebuffer) gl.deleteFramebuffer(framebuffer);
            //    if (texture) gl.deleteTexture(texture);
            //    if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
            //    return null;
            //}

            // Create a frame buffer object (FBO)
            framebuffer = Engine3D.FrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            if (!framebuffer) {
                console.log('Failed to create frame buffer object');
                return error();
            }

            texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER": "LINEAR"
            }, false);
            texture.createTextureArea(null, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            //// Create a texture object and set its size and parameters
            //texture = gl.createTexture(); // Create a texture object
            //if (!texture) {
            //    console.log('Failed to create texture object');
            //    return error();
            //}
            //gl.bindTexture(gl.TEXTURE_2D, texture); // Bind the object to target
            ////内容为null，表明创建空的纹理区域
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            framebuffer.texture = texture; // Store the texture object



            depthBuffer = framebuffer.createRenderBuffer("DEPTH_COMPONENT16", OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            //// Create a renderbuffer object and Set its size and parameters
            //depthBuffer = gl.createRenderbuffer("DEPTH_COMPONENT16", OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Create a renderbuffer object
            //if (!depthBuffer) {
            //    console.log('Failed to create renderbuffer object');
            //    return error();
            //}
            //gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
            //gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


            framebuffer.attachTexture2D("COLOR_ATTACHMENT0", texture.texture);
            framebuffer.attachRenderBuffer("DEPTH_ATTACHMENT", depthBuffer);
            //// Attach the texture and the renderbuffer object to the FBO
            //gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            //gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);


            framebuffer.check();
            //// Check if FBO is configured correctly
            //var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            //if (gl.FRAMEBUFFER_COMPLETE !== e) {
            //    console.log('Frame buffer object is incomplete: ' + e.toString());
            //    return error();
            //}

            framebuffer.unBind();
            //// Unbind the buffer object
            //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            //gl.bindTexture(gl.TEXTURE_2D, null);
            //gl.bindRenderbuffer(gl.RENDERBUFFER, null);


            return framebuffer;
        }


        gl.clearColor(0, 0, 0, 1);

        gl.enable(gl.DEPTH_TEST);
        //gl.depthFunc(gl.LEQUAL);

        //gl.enable(gl.POLYGON_OFFSET_FILL);

        //draw(vertices_num);


        //mMatrix.setIdentity();
        //
        //setLookAt();
        //setPerspective();

        // Calculate the view projection matrix
        setLookAt();

        setPerspective();



        //设置帧缓冲区的投影矩阵

        setPerspective(OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT, pMatrixFBO);

        pMatrixFBO.concat(vMatrix);




        //// Calculate the view projection matrix
        //var viewProjMatrix = new Matrix4();
        //viewProjMatrix.setPerspective(30.0, canvas.width/canvas.height, 1.0, 100.0);
        //viewProjMatrix.lookAt(0.0, 0.0, 15.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);


        var tick = function() {   // Start drawing
            draw(fbo, plane, sphereModel, vMatrix, pMatrixFBO);

            requestAnimationFrame(tick);
        };
        tick();

        //bindEvent();
    };



    loader.onload = onload;


    function bindCanvasEvent(canvas) {
        var dragging = false;         // Dragging or not
        var lastX = -1, lastY = -1;   // Last position of the mouse

        canvas.onmousedown = function(ev) {   // Mouse is pressed
            var x = ev.clientX, y = ev.clientY;
            // Start dragging if a moue is in <canvas>
            var rect = ev.target.getBoundingClientRect();
            if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
                lastX = x; lastY = y;
                dragging = true;
            }
        };

        canvas.onmouseup = function(ev) { dragging = false;  }; // Mouse is released

        canvas.onmousemove = function(ev) { // Mouse is moved
            var x = ev.clientX, y = ev.clientY;
            if (dragging) {
                var factor = 100/canvas.height; // The rotation ratio
                var dx = factor * (x - lastX);
                var dy = factor * (y - lastY);
                // Limit x-axis rotation angle to -90 to 90 degrees
                currentAngle[0] = currentAngle[0] + dx;
                currentAngle[1] = Math.max(Math.min(currentAngle[1] + dy, 90.0), -90.0);
            }
            lastX = x;
            lastY = y;
        };
    }


    function draw(fbo, plane, cube, viewProjMatrix, viewProjMatrixFBO) {
        fbo.bind();

        gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO

        drawTexCube(cube, viewProjMatrixFBO);   // Draw the cube

        fbo.unBind();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer

        drawTexturedPlane(plane, viewProjMatrix);  // Draw the plane
    }

    function drawTexCube(o, viewProjMatrixFBO) {
        o.program.use();

        mMatrix.setIdentity();

        //setLookAt();
        //setPerspective();
        //// Calculate a model matrix
        //g_modelMatrix.setTranslate(x, 0.0, 0.0);
        //g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
        //g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
        //
        //// Calculate transformation matrix for normals and pass it to u_NormalMatrix
        //g_normalMatrix.setInverseOf(g_modelMatrix);
        //g_normalMatrix.transpose();
        //gl.uniformMatrix4fv(program.u_NormalMatrix, false, g_normalMatrix.elements);

        //
        //// Calculate model view projection matrix and pass it to u_MvpMatrix
        //g_mvpMatrix.set(viewProjMatrix);
        //g_mvpMatrix.multiply(g_modelMatrix);
        //gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

        //todo 需要修改（绕着圆心转）
        mMatrix.rotate(currentAngle[1], 1.0, 0.0, 0.0);
        mMatrix.rotate(currentAngle[0], 0.0, 1.0, 0.0);

        //mvpMatrix = computeMvpMatrix(pMatrix, viewProjMatrix, mMatrix);
        var viewProjMatrixFBO = viewProjMatrixFBO.copy();
        viewProjMatrixFBO.concat(mMatrix);


        drawTexturedObject(o, [{
            name: "a_position",
            buffer: o.buffers.vertexBuffer  ,
            category: "attribute"
        },
            {
                name: "a_texCoord",
                buffer: o.buffers.texCoordBuffer  ,
                category: "attribute"
            },{
                name:"u_sampler",
                type:  Engine3D.DataType.SAMPLER_2D,
                val: 0,
                category: "uniform"
            },
            {
                name:"u_mvpMatrix",
                type: Engine3D.DataType.FLOAT_MAT4,
                val: viewProjMatrixFBO.values,
                category: "uniform"
            }]);

    }


    function drawTexturedPlane(o, viewProjMatrix) {
        o.program.use();

        mMatrix.setIdentity();

        //todo 需要修改（绕着圆心转）
        mMatrix.rotate(currentAngle[1], 1.0, 0.0, 0.0);
        mMatrix.rotate(currentAngle[0], 0.0, 1.0, 0.0);

        mvpMatrix = computeMvpMatrix(pMatrix, viewProjMatrix, mMatrix);

        //gl.uniformMatrix4fv(program.u_mvpMatrix, false, mvpMatrix.values);

        drawTexturedObject(o, [{
            name: "a_position",
            buffer: o.buffers.vertexBuffer  ,
            category: "attribute"
        },
            {
                name: "a_texCoord",
                buffer: o.buffers.texCoordBuffer  ,
                category: "attribute"
            },{
                name:"u_mvpMatrix",
                type: Engine3D.DataType.FLOAT_MAT4,
                val: mvpMatrix.values,
                category: "uniform"
            }]);
        //
        //gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);   // Draw
        //// Calculate a model matrix
        //g_modelMatrix.setTranslate(0, 0, 1);
        //g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
        //g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
        //
        //// Calculate the model view project matrix and pass it to u_MvpMatrix
        //g_mvpMatrix.set(viewProjMatrix);
        //g_mvpMatrix.multiply(g_modelMatrix);
        //gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
        //
        //drawTexturedObject(gl, program, o, texture);
    }

    function drawTexturedObject(o, dataArr) {
        o.texture.bindToUnit(0);

        o.draw(dataArr);
    }


    function setLookAt(matrix){
        var eyeX = Number($("#lookAt_eye").nextAll("input").eq(0).val()),
            eyeY = Number($("#lookAt_eye").nextAll("input").eq(1).val()),
            eyeZ = Number($("#lookAt_eye").nextAll("input").eq(2).val());
        var centerX = Number($("#lookAt_center").nextAll("input").eq(0).val()),
            centerY = Number($("#lookAt_center").nextAll("input").eq(1).val()),
            centerZ = Number($("#lookAt_center").nextAll("input").eq(2).val());
        var upX = Number($("#lookAt_up").nextAll("input").eq(0).val()),
            upY = Number($("#lookAt_up").nextAll("input").eq(1).val()),
            upZ = Number($("#lookAt_up").nextAll("input").eq(2).val());

        var matrix = matrix || vMatrix;

        matrix.setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
        //vMatrix.rotate(currentAngle[0], 1.0, 0.0, 0.0);
        //vMatrix.rotate(currentAngle[1], 0.0, 1.0, 0.0);
    }

    function setPerspective(aspect, matrix){
        var near = Number($("#perspective_near").nextAll("input").eq(0).val()),
            far = Number($("#perspective_far").nextAll("input").eq(0).val()),
            angle = Number($("#perspective_angle").nextAll("input").eq(0).val());
        var aspect = aspect || c.width / c.height;
        var matrix = matrix || pMatrix;

        matrix.setPerspective(angle, aspect, near, far);
    }
});

