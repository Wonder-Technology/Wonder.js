var mMatrix = Math3D.Matrix.create();
var mvpMatrix = null;



var keyState = {};
var isRotate = false;

$(function(){
    var webgl = Engine3D.Webgl.create();

    webgl.init();

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




    var camera = Engine3D.Camera.create({
       eyeX: 0,
            eyeY: 0,
            eyeZ:0,
            centerX:0,
            centerY:0,
            centerZ: -1,
            upX:0,
            upY: 1,
            upZ: 0
    },
        {
            angle: 60,
            aspect : c.width / c.height,
            near : 0.1,
            far : 10
        });


    var onload = function(){
        var skyBox = null;
        var rectangle = null;



        init();

        loop();


        function init(){
            var vs = Engine3D.Shader.create();
            var fs = Engine3D.Shader.create();

            var skyBoxPrg = Engine3D.Program.create(vs.createShader("skyBox-vs"), fs.createShader("skyBox-fs"));

            skyBox = createSkyBox();

            skyBox.program = skyBoxPrg;

            var rectanglePrg  = Engine3D.Program.create(vs.createShader("rectangle-vs"), fs.createShader("rectangle-fs"));

            rectangle = createRectangle();
            rectangle.program = rectanglePrg;




            gl.clearColor(0, 0, 0, 1);

            gl.enable(gl.DEPTH_TEST);



            //init Matrix

            mMatrix.setIdentity();


            camera.init();
        }


        function loop(){
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer


            camera.onStartLoop();

            move();
            if(isRotate){
                camera.rotate();
            }
            zoom();


            camera.run();



            drawSprites();

            setAllFalse();
            isRotate = false;



            requestAnimationFrame(loop);
        }


        function drawSprites(){
            var o = skyBox;
            o.program.use();


            mvpMatrix = camera.computeMvpMatrix(mMatrix);

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




           o = rectangle;
            o.program.use();


            mvpMatrix = camera.computeMvpMatrix(mMatrix);

            dataArr = [{
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
                    type:  Engine3D.DataType.SAMPLER_2D,
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
        }

        function move(){
            if(keyState["a"]){
                camera.moveLeft();
            }
            else if(keyState["d"]){
                camera.moveRight();
            }
            else if(keyState["w"]){
                camera.moveBack();
            }
            else if(keyState["s"]){
                camera.moveFront();
            }
        }

        function zoom(){
            var speed = 10;

            if(keyState["g"]){
                camera.zoomOut();
            }
            else if(keyState["h"]){
                camera.zoomIn();
            }
        }

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

        function createRectangle() {
            var vertices = new Float32Array([
                0.5, 0.5, 0.5,
                -0.5, 0.5, 0.5,
                -0.5, -0.5, 0.5,
                0.5, -0.5, 0.5
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3
            ]);

            var texCoords = new Float32Array([
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ]);


            var o = Engine3D.Sprite.create("TRIANGLES");

            o.setBuffers({
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            });




            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            var texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            });
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(0);
            texture.createTextureArea(
                loader.getResource("1")
            );

            texture.unBind();


            o.texture = texture;

            return o;
        }
        //bindEvent();
    };



    loader.onload = onload;


    function setAllFalse(){
        var i = null;

        for(i in keyState){
            if(keyState.hasOwnProperty(i)){
                keyState[i] = false;
            }
        }
    }
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

                camera.rotateSpeedX = dx;
                camera.rotateSpeedY = dy;


                isRotate = true;
            }
            lastX = x;
            lastY = y;
        };

        //todo 使用引擎的key模块来重构

        $("body").on("keydown", function(event){
            var keyCode = {
                65: "a",
                87: "w",
                83: "s",
                68: "d",
                    71: "g",
                72: "h"
            };

            setAllFalse();

            keyState[keyCode[event.keyCode]] = true;
        });
    }
});

