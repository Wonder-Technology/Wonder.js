//应该先加载资源（如加载纹理、模型数据），然后再开始逻辑

var prg = null;
var vertices_num = null;

var mMatrix = Math3D.Matrix.create();
var mvpMatrix = null;
var vMatrix = Math3D.Matrix.create();
var pMatrix = Math3D.Matrix.create();

// canvas对象获取
var c = null;

// webgl的context获取
var gl = null;

function computeMvpMatrix(pMatrix, vMatrix, mMatrix){
    var matrix = pMatrix.copy();

    matrix.concat(vMatrix);
    matrix.concat(mMatrix);

    return matrix;
    //return Math3D.MatrixTool.multiply(Math3D.MatrixTool.multiply(pMatrix, vMatrix), mMatrix);
}

$(function(){
// canvas对象获取
    c = document.getElementById('canvas');

    // Register the event handler
    // Current rotation angle ([y-axis, x-axis] degrees)
    var currentAngle = [0.0, 0.0];
    bindCanvasEvent(c);

// webgl的context获取
    gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    prg = initShaders("vs", "fs");

    //var vertices = new Float32Array([
    //    // Vertex coordinates, texture coordinate
    //    //-0.5,  0.5, -1.0,  0.0, 0.9,
    //    //-0.5, -0.5,  -1.0, 0.0, -0.1,
    //    //0.5,  0.5,   -1.0, 0.9, 0.9,
    //    //0.5, -0.5,  -1.0,  0.9, -0.1
    //    -0.5,  0.5, -1.0,  0.0, 1.0,
    //    -0.5, -0.5,  -1.0, 0.0, 0.0,
    //    0.5,  0.5,   -1.0, 1.0, 1.0,
    //    0.5, -0.5,  -1.0,  1.0, 0.0
    //]);
    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    //var vertices = new Float32Array([   // Vertex coordinates
    //    1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,    // v0-v1-v2-v3 front
    //    1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,    // v0-v3-v4-v5 right
    //    1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,    // v0-v5-v6-v1 up
    //    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,    // v1-v6-v7-v2 left
    //    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,    // v7-v4-v3-v2 down
    //    1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0     // v4-v7-v6-v5 back
    //]);
    //
    //var texCoords = new Float32Array([   // Texture coordinates
    //    1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
    //    0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
    //    1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
    //    1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
    //    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
    //    0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
    //]);
    //
    //// Indices of the vertices
    //var indices = new Uint8Array([
    //    0, 1, 2,   0, 2, 3,    // front
    //    4, 5, 6,   4, 6, 7,    // right
    //    8, 9,10,   8,10,11,    // up
    //    12,13,14,  12,14,15,    // left
    //    16,17,18,  16,18,19,    // down
    //    20,21,22,  20,22,23     // back
    //]);




    //球心坐标
    var pointX = 0.6,
        pointY = 0.2,
        pointZ = -0.1;

    var latitudeBands = 10;
    var longitudeBands = 10;
    var radius = 0.5;




    var data = getSphereDataByLatitudeLongtitude(pointX, pointY, pointZ, latitudeBands, longitudeBands, radius);
    var vertices = data.vertices;
    var indices = data.indices;

    function getSphereDataByLatitudeLongtitude(pointX, pointY, pointZ, latitudeBands, longitudeBands, radius){
        var vertices = [];
        //var normalData = [];
        //var textureCoordData = [];
        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = radius * cosPhi * sinTheta + pointX;
                var y = radius *cosTheta + pointY;
                var z = radius *sinPhi * sinTheta + pointZ;
                //var u = 1 - (longNumber / longitudeBands);
                //var v = 1 - (latNumber / latitudeBands);
                //
                //normalData.push(x);
                //normalData.push(y);
                //normalData.push(z);
                //textureCoordData.push(u);
                //textureCoordData.push(v);
                vertices.push(x);
                vertices.push(y);
                vertices.push(z);
            }
        }



        var indices = [];
        //一圈有经度点longitudeBands个
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                var first = latNumber * (longitudeBands + 1) + longNumber;
                var second = first + longitudeBands + 1;
                indices.push(first);
                indices.push(second);
                indices.push(first + 1);

                indices.push(second);
                indices.push(second + 1);
                indices.push(first + 1);
            }
        }


        //vertices =[0, 0.5, 0, -0, 0.5, 0, 0, 0.5, -0, 0.5, 3.0616171314629196e-17, 0, -0.5, 3.0616171314629196e-17, 6.123234262925839e-17, 0.5, 3.0616171314629196e-17, -1.2246468525851679e-16, 6.123234262925839e-17, -0.5, 0, -6.123234262925839e-17, -0.5, 7.498798786105971e-33, 6.123234262925839e-17, -0.5, -1.4997597572211942e-32] ;
        //vertices = [
        //    1.0,  1.0,  1.0,
        //    -1.0,  1.0,  1.0,
        //    -1.0, -1.0,  1.0,
        //    1.0, -1.0,  1.0,
        //    1.0, -1.0, -1.0,
        //    1.0,  1.0, -1.0,
        //    -1.0,  1.0, -1.0,
        //    -1.0, -1.0, -1.0,
        //    1.0,1.0,1.0
        //
        //
        //
        //
        //
        //];
        ////indices = [0, 3, 1, 3, 4, 1, 1, 4, 2, 4, 5, 2, 3, 6, 4, 6, 7, 4, 4, 7, 5, 7, 8, 5];
        vertices = new Float32Array(vertices);
        indices = new Uint8Array(indices);


        return {
            vertices: vertices,
            indices: indices
        }
    }







    vertices_num = indices.length;
    //var FSize = vertices.BYTES_PER_ELEMENT;
    //var stride = FSize * 6;


    var vbo = createVBO(vertices);

    var a_position = gl.getAttribLocation(prg, "a_position");
    if (a_position < 0) {
        console.log('Failed to get the storage location of a_position');
        return -1;
    }

    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);


    //var a_color = gl.getAttribLocation(prg, "a_color");
    //if (a_color < 0) {
    //    console.log('Failed to get the storage location of a_color');
    //    return -1;
    //}
    //
    //gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, stride, FSize * 3);
    //gl.enableVertexAttribArray(a_color);
    //
    //var texVbo = createVBO(texCoords);
    //
    //var a_texCoord = gl.getAttribLocation(prg, "a_texCoord");
    //if (a_texCoord < 0) {
    //    console.log('Failed to get the storage location of a_texCoord');
    //    return -1;
    //}
    //
    //gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 0, 0);
    //gl.enableVertexAttribArray(a_texCoord);



    var ibo = createIBO(indices);

    initTexture();

    gl.clearColor(0, 0, 0, 1);

    gl.enable(gl.DEPTH_TEST);
    //gl.depthFunc(gl.LEQUAL);

    //gl.enable(gl.POLYGON_OFFSET_FILL);

    //draw(vertices_num);


    mMatrix.setIdentity();

    setLookAt();
    setPerspective();



    var tick = function() {   // Start drawing
        //draw(gl, n, viewProjMatrix, u_MvpMatrix, currentAngle);
        draw(vertices_num);
        requestAnimationFrame(tick);
    };
    tick();

    bindEvent();


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

    function draw(vertices_num){
        //todo 需要修改（绕着圆心转）
        mMatrix.rotate(currentAngle[1], 1.0, 0.0, 0.0);
        mMatrix.rotate(currentAngle[0], 0.0, 1.0, 0.0);

        mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

        var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

        gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, vertices_num, gl.UNSIGNED_BYTE, 0);

        mMatrix.setIdentity();
    }

    function initTexture(){

        var image = new Image();

        image.onload = function(){
            //image = convertImageSize(this);
            var texture = gl.createTexture();
            var u_sampler = gl.getUniformLocation(prg, "u_sampler");

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            //缩小方法采用默认的mip map
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            //生成所有的mip层
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.uniform1i(u_sampler, 0);

            // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            //
            //gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices_num);
        };

        image.src = "../content/1.jpg";
    }
    function convertImageSize(image) {
        //var texture = gl.createTexture();
        //gl.bindTexture(gl.TEXTURE_2D, texture);
        if (!isPowerOfTwo(image.width) || !isPowerOfTwo(image.height)) {
            // Scale up the texture to the next highest power of two dimensions.
            var canvas = document.createElement("canvas");
            canvas.width = nextHighestPowerOfTwo(image.width);
            canvas.height = nextHighestPowerOfTwo(image.height);
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            image = canvas;
        }
        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        //gl.generateMipmap(gl.TEXTURE_2D);
        //gl.bindTexture(gl.TEXTURE_2D, null);
        //return texture;
        return image;
    }

    function isPowerOfTwo(x) {
        return (x & (x - 1)) == 0;
    }

    function nextHighestPowerOfTwo(x) {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }

    function setLookAt(){
        var eyeX = Number($("#lookAt_eye").nextAll("input").eq(0).val()),
            eyeY = Number($("#lookAt_eye").nextAll("input").eq(1).val()),
            eyeZ = Number($("#lookAt_eye").nextAll("input").eq(2).val());
        var centerX = Number($("#lookAt_center").nextAll("input").eq(0).val()),
            centerY = Number($("#lookAt_center").nextAll("input").eq(1).val()),
            centerZ = Number($("#lookAt_center").nextAll("input").eq(2).val());
        var upX = Number($("#lookAt_up").nextAll("input").eq(0).val()),
            upY = Number($("#lookAt_up").nextAll("input").eq(1).val()),
            upZ = Number($("#lookAt_up").nextAll("input").eq(2).val());

        vMatrix.setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ);
        //vMatrix.rotate(currentAngle[0], 1.0, 0.0, 0.0);
        //vMatrix.rotate(currentAngle[1], 0.0, 1.0, 0.0);
    }

    function setPerspective(){
        var near = Number($("#perspective_near").nextAll("input").eq(0).val()),
            far = Number($("#perspective_far").nextAll("input").eq(0).val()),
            angle = Number($("#perspective_angle").nextAll("input").eq(0).val());
        var aspect = c.width / c.height;

        pMatrix.setPerspective(angle, aspect, near, far);
    }

    function bindEvent(){
        $("#lookAt").on("click", function(){
            setLookAt();
            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);
            //mvpMatrix = Math3D.MatrixTool.multiply(vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);

            draw(vertices_num);
        });

        $("#ortho").on("click", function(){
            var near = Number($("#ortho_near").nextAll("input").eq(0).val()),
                far = Number($("#ortho_far").nextAll("input").eq(0).val());

            pMatrix.setOrtho(near, far);

            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);

            draw(vertices_num);
        });

        $("#perspective").on("click", function(){
            setPerspective();
            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

            draw(vertices_num);
        });



        $("#translate").on("click", function(e){
            var x = Number($("#translate_x").val()),
                y = Number($("#translate_y").val()),
                z = Number($("#translate_z").val());


            mMatrix.translate(x, y, z);
            //mvpMatrix = mMatrix.values;
            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);

            draw(vertices_num);
        });
        $("#scale").on("click", function(e){
            var x = Number($("#scale_x").val()),
                y = Number($("#scale_y").val()),
                z = Number($("#scale_z").val());


            mMatrix.scale(x, y, z);
            //mvpMatrix = mMatrix.values;
            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);

            draw(vertices_num);
        });

        $("#rotate").on("click", function(e){
            var angle = Number($("#rotate_angle").val()),
                x = Number($("#rotate_x").val()),
                y = Number($("#rotate_y").val()),
                z = Number($("#rotate_z").val());


            mMatrix.rotate(angle, x, y, z);
            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.values);

            draw(vertices_num);
        });
    }








    function initShaders(vsId, fsId){
        var vs = createShader(vsId),
            fs = createShader(fsId);

        return createProgram(vs, fs);
    }

// 生成着色器的函数
    function createShader(id){
        // 用来保存着色器的变量
        var shader;

        // 根据id从HTML中获取指定的script标签
        var scriptElement = document.getElementById(id);

        // 如果指定的script标签不存在，则返回
        if(!scriptElement){return;}

        // 判断script标签的type属性
        switch(scriptElement.type){

            // 顶点着色器的时候
            case 'x-shader/x-vertex':
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;

            // 片段着色器的时候
            case 'x-shader/x-fragment':
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
            default :
                return;
        }

        // 将标签中的代码分配给生成的着色器
        gl.shaderSource(shader, scriptElement.text);

        // 编译着色器
        gl.compileShader(shader);

        // 判断一下着色器是否编译成功
        if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

            // 编译成功，则返回着色器
            return shader;
        }else{

            // 编译失败，弹出错误消息
            alert(gl.getShaderInfoLog(shader));
        }
    }

// 程序对象的生成和着色器连接的函数
    function createProgram(vs, fs){
        // 程序对象的生成
        var program = gl.createProgram();

        // 向程序对象里分配着色器
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        // 将着色器连接
        gl.linkProgram(program);

        // 判断着色器的连接是否成功
        if(gl.getProgramParameter(program, gl.LINK_STATUS)){

            // 成功的话，将程序对象设置为有效
            gl.useProgram(program);

            // 返回程序对象
            return program;
        }else{

            // 如果失败，弹出错误信息
            alert(gl.getProgramInfoLog(program));
        }
    }

    function createVBO(data){
        var buffer = gl.createBuffer();

        if (!buffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        return buffer;
    }

    function createIBO(data){
        var buffer = gl.createBuffer();

        if (!buffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

        return buffer;
    }

});
