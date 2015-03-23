var mMatrix = Math3D.Matrix.create();
var mvpMatrix = null;
var vMatrix = Math3D.Matrix.create();
var pMatrix = Math3D.Matrix.create();

function computeMvpMatrix(pMatrix, vMatrix, mMatrix){
    var matrix = pMatrix.copy();

    matrix.concat(vMatrix);
    matrix.concat(mMatrix);

    return matrix;
}

$(function(){
    var webgl = Engine3D.Webgl.create();

    webgl.init();

    // Current rotation angle ([y-axis, x-axis] degrees)
    var currentAngle = [0.0, 0.0];
    bindCanvasEvent(c);

    var loader = Engine3D.Loader.create();

    loader.load([{
        src: "../content/1.jpg",
        id: "1"
        //type: "texture"
    },
    {
        src: "../content/2.jpg",
        id: "2"
        //type: "texture"
    },
    {
        src: "../content/3.jpg",
        id: "3"
        //type: "texture"
    },
    {
        src: "../content/4.jpg",
        id: "4"
        //type: "texture"
    },
    {
        src: "../content/5.jpg",
        id: "5"
        //type: "texture"
    },
    {
        src: "../content/6.jpg",
        id: "6"
        //type: "texture"
    }]);




    var onload = function(){
        var vs = Engine3D.Shader.create();
        var fs = Engine3D.Shader.create();

        var prg = Engine3D.Program.create(vs.createShader("vs"), fs.createShader("fs"));

        var skyBox = createSkyBox();

        skyBox.program = prg;

        function createSkyBox() {
            var vertices = new Float32Array([
                1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0, -1.0,  1.0,
                1.0, -1.0,  1.0,
                1.0, -1.0, -1.0,
                1.0,  1.0, -1.0,
                -1.0,  1.0, -1.0,
                -1.0, -1.0, -1.0
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3,    // front
                0, 3, 4,   0, 4, 5,    // right
                0, 5, 6,   0, 6, 1,    // up
                1, 6, 7,   1, 7, 2,    // left
                7, 4, 3,   7, 3, 2,    // down
                4, 7, 6,   4, 6, 5     // back
            ]);

            var texCoords = vertices;


            var o = Engine3D.Sprite.create("TRIANGLES");

            o.setBuffers({
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            });




            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            var texture = Engine3D.TextureCubeMap.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            });
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(0);
            texture.createTextureArea([
                loader.getResource("1"),
                loader.getResource("2"),
                loader.getResource("3"),
                loader.getResource("4"),
                loader.getResource("5"),
                loader.getResource("6")
            ]);

            texture.unBind();


            o.texture = texture;

            return o;
        }

        gl.clearColor(0, 0, 0, 1);

        gl.enable(gl.DEPTH_TEST);



        // Calculate the view projection matrix
        setLookAt();

        setPerspective();



        var tick = function() {   // Start drawing
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer


            var o = skyBox;
            o.program.use();

            mMatrix.setIdentity();

            //todo 需要修改（绕着圆心转）
            mMatrix.rotate(currentAngle[1], 1.0, 0.0, 0.0);
            mMatrix.rotate(currentAngle[0], 0.0, 1.0, 0.0);

            mvpMatrix = computeMvpMatrix(pMatrix, vMatrix, mMatrix);



            var dataArr = [{
                name: "a_position",
                buffer: o.buffers.vertexBuffer  ,
                category: "attribute"
            },
                {
                    name: "a_texCoord",
                    buffer: o.buffers.texCoordBuffer  ,
                    category: "attribute"
                },
                {
                    name:"u_sampler",
                    type:  Engine3D.DataType.SAMPLER_CUBE,
                    val: 0,
                    category: "uniform"
                },
                {
                    name:"u_mvpMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: mvpMatrix.values,
                    category: "uniform"
                }];

            o.texture.bindToUnit(0);

            o.draw(dataArr);

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

