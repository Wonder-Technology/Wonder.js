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


   var cubic = Engine3D.Cubic.Cube.create();

    var data = cubic.getCubeData();

    var vertices = data.vertices;
    var indices = data.indices;
    var normals = data.normals;
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


    ////指定立方体中心点位置
    //var u_cubicCenter = gl.getUniformLocation(prg, 'u_cubicCenter');
    //
    //var cubicCenter = new Float32Array([
    //    0.5,0.0,0.0
    //]);
    //gl.uniform3fv(u_cubicCenter, cubicCenter);

    var normalVBO = createVBO(normals);

    var a_normal = gl.getAttribLocation(prg, "a_normal");
    if (a_normal < 0) {
        console.log('Failed to get the storage location of a_normal');
        return -1;
    }

    gl.vertexAttribPointer(a_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_normal);




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

        var u_mvpMatrix = gl.getUniformLocation(prg, 'u_mvpMatrix');

        gl.uniformMatrix4fv(u_mvpMatrix, false, mvpMatrix.values);


        var mvMatrix = vMatrix.copy();
        mvMatrix.concat(mMatrix);

        var u_mvMatrix = gl.getUniformLocation(prg, 'u_mvMatrix');

        gl.uniformMatrix4fv(u_mvMatrix, false, mvMatrix.values);





        var normalMatrix = Math3D.Matrix.create();
        normalMatrix.setInverseOf(mMatrix);

        var u_normalMatrix = gl.getUniformLocation(prg, 'u_normalMatrix');

        gl.uniformMatrix4fv(u_normalMatrix, false, normalMatrix.values);






        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawElements(gl.TRIANGLES, vertices_num, gl.UNSIGNED_BYTE, 0);
        //gl.drawArrays(gl.TRIANGLES, vertices_num, gl.UNSIGNED_BYTE, 0);

        //gl.drawArrays(gl.TRIANGLES, 0, vertices_num);

        mMatrix.setIdentity();
    }

    function initTexture(){

        var image = new Image();

        image.onload = function(){
        };

        image.src = "../content/1.jpg";


        var image2 = new Image();
        image2.src = "../content/2.jpg";

        var image3 = new Image();
        image3.src = "../content/3.jpg";

        var image4 = new Image();
        image4.src = "../content/4.jpg";

        var image5 = new Image();
        image5.src = "../content/5.jpg";

        var image6 = new Image();
        image6.src = "../content/6.jpg";


        setTimeout(function(){
            ////image = convertImageSize(this);
            //var texture = gl.createTexture();
            //var u_sampler = gl.getUniformLocation(prg, "u_sampler");
            //
            //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            //gl.activeTexture(gl.TEXTURE0);
            //gl.bindTexture(gl.TEXTURE, texture);
            ////缩小方法采用默认的mip map
            ////gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            //
            //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            ////生成所有的mip层
            //gl.generateMipmap(gl.TEXTURE_2D);
            //gl.uniform1i(u_sampler, 0);



            var texture = gl.createTexture();
            var u_sampler = gl.getUniformLocation(prg, "u_sampler");

            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);


            //立方图纹理需要设置六个方位上的纹理，为了方便区分，我设置了六个不同的纹理图像
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image2);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image3);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image4);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image5);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image6);

            //生成所有的mip层
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);


            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.uniform1i(u_sampler, 0);

            ////这些内容，也要针对立方图纹理进行设置
            //gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            //gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            //gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            //gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);




        }, 1000);
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

