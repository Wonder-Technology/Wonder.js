/**3D学习
 * 作者：YYC
 * 日期：2015-03-12
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */

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
    return Math3D.MatrixTool.multiply(Math3D.MatrixTool.multiply(pMatrix, vMatrix), mMatrix);
}

$(function(){
// canvas对象获取
    c = document.getElementById('canvas');

// webgl的context获取
    gl = c.getContext('webgl') || c.getContext('experimental-webgl');

    prg = initShaders("vs", "fs");

    var vertices = new Float32Array([
        ////彩色三角形在后面
        //-0.5, 0.0, -1.0, 1.0, 0.0, 0.0,
        //0.5, 0.0, -1.0, 0.0, 1.0, 0.0,
        //0.0, 1.0, -1.0, 0.0, 0.0, 1.0,
        //
        ////蓝色三角形在前面
        //-0.2, 0.0, -1.0, 0.4, 0.4, 1.0,
        //0.8, 0.0, -1.0,  0.4, 0.4, 1.0,
        //0.3, 1.0, -1.0,  0.4, 0.4, 1.0


        // Vertex coordinates and color
        // The green triangle
        0.0,  2.5,  -5.0,  0.4,  1.0,  0.4,
        -2.5, -2.5,  -5.0,  0.4,  1.0,  0.4,
        2.5, -2.5,  -5.0,  1.0,  0.4,  0.4,

        // The yellow triagle
        0.0,  3.0,  -5.0,  1.0,  0.4,  0.4,
        -3.0, -3.0, -5.0,  1.0,  1.0,  0.4,
        3.0, -3.0,  -5.0,  1.0,  1.0,  0.4
    ]);
    vertices_num = 6;
    var size = 3;
    var FSize = vertices.BYTES_PER_ELEMENT;
    var stride = FSize * 6;


    var vbo = createVBO(vertices);

    var a_position = gl.getAttribLocation(prg, "a_position");
    if (a_position < 0) {
        console.log('Failed to get the storage location of a_position');
        return -1;
    }

    gl.vertexAttribPointer(a_position, size, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(a_position);


    var a_color = gl.getAttribLocation(prg, "a_color");
    if (a_color < 0) {
        console.log('Failed to get the storage location of a_color');
        return -1;
    }

    gl.vertexAttribPointer(a_color, size, gl.FLOAT, false, stride, FSize * 3);
    gl.enableVertexAttribArray(a_color);




    mMatrix.setIdentity();
    setLookAt();
    setPerspective();
    mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);

    var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);


    gl.clearColor(0, 0, 0, 1);

    gl.enable(gl.DEPTH_TEST);
    //gl.depthFunc(gl.LEQUAL);


    draw(vertices_num);

    bindEvent();



    function draw(vertices_num){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.POLYGON_OFFSET_FILL);

        //green
        gl.drawArrays(gl.TRIANGLES, 0, vertices_num / 2);


        //偏移值是在z值计算后、深度检测之前加上的，此时坐标已经被映射到Normalized Device Coordinates中了，
        //而此时的z轴是向内的（opengl的z轴是向外的），因此多边形偏移量为正值的话，意味着往远处移动，否则往近处移动。
        //可参考下面的说明：
        //The results are summed to produce the depth offset. This offset is applied in screen space, typically with positive Z pointing into the screen.
        //the offset is calculated after the normal Z calculations, but applied before the depth test and before being written to the depth buffer.
        gl.polygonOffset(1.0, 1.0); //设置多边形偏移
        //yellow
        gl.drawArrays(gl.TRIANGLES, vertices_num / 2, vertices_num / 2);

        gl.polygonOffset(0.0, 0.0); //设置多边形偏移
        gl.disable(gl.POLYGON_OFFSET_FILL);
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
            mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);
            //mvpMatrix = Math3D.MatrixTool.multiply(vMatrix.values, mMatrix.values);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

            draw(vertices_num);
        });

        $("#ortho").on("click", function(){
            var near = Number($("#ortho_near").nextAll("input").eq(0).val()),
                far = Number($("#ortho_far").nextAll("input").eq(0).val());

            pMatrix.setOrtho(near, far);

            mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

            draw(vertices_num);
        });

        $("#perspective").on("click", function(){
            setPerspective();
            mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);

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
            mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

            draw(vertices_num);
        });
        $("#scale").on("click", function(e){
            var x = Number($("#scale_x").val()),
                y = Number($("#scale_y").val()),
                z = Number($("#scale_z").val());


            mMatrix.scale(x, y, z);
            //mvpMatrix = mMatrix.values;
            mvpMatrix = computeMvpMatrix(pMatrix.values, vMatrix.values, mMatrix.values);

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

            draw(vertices_num);
        });

        $("#rotate").on("click", function(e){
            var angle = Number($("#rotate_angle").val()),
                x = Number($("#rotate_x").val()),
                y = Number($("#rotate_y").val()),
                z = Number($("#rotate_z").val());


            mMatrix.rotate(angle, x, y, z);
            mvpMatrix = mMatrix.values;

            var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');

            gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

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
        var buffer = gl.createBuffer(),
            a_position = null;

        if (!buffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        return buffer;
    }

});

window.onload = function(){
};

