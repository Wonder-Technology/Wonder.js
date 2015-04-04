var keyState = {};
var isRotate = false;

var camera = null;

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






    var onload = function(){
        var skyBox = null;
        var sphere = null;
        var reflectedSphere = null;

        var scene1 = null;
        var scene4 = null;
        var sceneReflectBackground1 = null;

        camera = Engine3D.Camera.create({
                eyeX: 1.0,
                eyeY: 0.0,
                eyeZ: 1.0,
                centerX:0,
                centerY:0,
                centerZ: -1,
                upX:0,
                upY: 1,
                upZ: 0
            },
            //    eyeX: -0.5,
            //        eyeY: -0.5,
            //        eyeZ:-0.5 ,
            //        centerX:-0.5,
            //        centerY:-0.5,
            //        centerZ: -1,
            //        upX:0,
            //        upY: 1,
            //        upZ: 0
            //},
            {
                angle: 60,
                aspect : c.width / c.height,
                near : 0.1,
                far : 10
            });

        init();

        loop();


        //todo extract Director class
        function init(){
            _initScene();





            gl.clearColor(0, 0, 0, 1);

            gl.enable(gl.DEPTH_TEST);




            camera.init();
        }

        function _initScene(){
            scene1 = Engine3D.Scene.create(camera);
            scene4 = Engine3D.Scene.create(camera);
            //todo should add all objects that need to be real-rendered into one scene
            sceneReflectBackground1 = Engine3D.Scene.create(camera);



            //set shader
            var vs = Engine3D.Shader.create();
            var fs = Engine3D.Shader.create();

            var skyBoxPrg = Engine3D.Program.create(vs.createShader("skyBox-vs"), fs.createShader("skyBox-fs"));

            scene1.program = skyBoxPrg;

            sceneReflectBackground1.program = skyBoxPrg;

            //scene4.program = skyBoxPrg;


            var dynamicPrg  = Engine3D.Program.create(vs.createShader("texture2D-vs"), fs.createShader("texture2D-fs"));

            scene4.program = dynamicPrg;


            //add sprites
            skyBox = createSkyBox();


            scene1.addSprites([skyBox]);




            sceneReflectBackground1.addSprites([skyBox]);


            //Initialize framebuffer object (FBO)
            //todo dry
            var OFFSCREEN_WIDTH = 256;
            var OFFSCREEN_HEIGHT = 256;

            var fbo = initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

            scene4.setFrameData(fbo,
                [sceneReflectBackground1]
            );



            var rect = createRectangle(fbo.texture);

            scene4.addSprites([rect]);







            //add light
            //scene3.ambientColor = ambientLightColor;
            //scene3.addLight(pointLightArr);



            //overwrite hook

            //todo refactor
            scene4.onSetData = function(sprite, program){
                //var mMatrix = sprite.matrix.copy();
                //
                //program.setUniformData("u_mMatrix", Engine3D.DataType.FLOAT_MAT4, mMatrix.values);
                //
                //
                //var viewPos = this._camera.computeViewPosInWorldCoordinate();
                ////vec4转换为vec3
                //program.setUniformData("u_viewPos", Engine3D.DataType.FLOAT_3, viewPos);
                //
                //
                //
                //var normalMatrix = Math3D.Matrix.create();
                //normalMatrix.setInverseOf(mMatrix);
                //normalMatrix.transpose();
                //
                //program.setUniformData("u_normalMatrix", Engine3D.DataType.FLOAT_MAT4, normalMatrix.values);
            }
        }


        function loop(){


            camera.onStartLoop();

            move();
            if(isRotate){
                camera.rotate();
            }
            zoom();


            camera.run();


            //todo 参考three.js重构
            //sceneRexxx


            scene1.onStartLoop();
            scene4.onStartLoop();



            //draw in frameBuffer shoule before draw in canvas
            scene4.drawScenesInTexture2DFrameBuffer({
                center:[0,0,1],
                up:[1,0,0]
            });




            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer



            scene1.run();
            scene4.run();











            //scene1.onEndLoop();
            scene4.onEndLoop();


            camera.onEndLoop();

            setAllFalse();
            isRotate = false;



            requestAnimationFrame(loop);
        }


        function move(){
            if(keyState["a"]){
                camera.moveLeft();
            }
            else if(keyState["d"]){
                camera.moveRight();
            }
            else if(keyState["w"]){
                camera.moveFront();
            }
            else if(keyState["s"]){
                camera.moveBack();
            }
        }

        function zoom(){
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

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            };






            var i = 0,
                len = 1;
            var arr = [];

            arr.push({
                material: createMaterial(i, createTextureSkyBox(i)),
                ////todo optimize data structure
                //todo type should be DataType instead of string
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_CUBE", "diffuse"]
                }
            });

            o.textureArr = arr;



            o.init();

            return o;
        }



        function createRectangle(fboTexture) {
            var vertices = new Float32Array([
                0.3, 0.3, 0.3,
                -0.3, 0.3, 0.3,
                -0.3, -0.3, 0.3,
                0.3, -0.3, 0.3
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

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(texCoords, 2, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            };








            var i = 0,
                len = 2;
            var arr = [];

            arr.push({
                material: createMaterial(i, fboTexture),
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_2D", "diffuse"]
                }
            });

            o.textureArr = arr;


            o.init();

            return o;
        }


        function initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT) {
            var framebuffer, texture, depthBuffer;

            framebuffer = Engine3D.Texture2DFrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


            framebuffer.init();


            return framebuffer;
        }

        function createMaterial(index, texture){
            var material = Engine3D.Material.create(
                index,
                index,
                64
            );

            material.texture = texture;

            return material;
        }
        function createTextureSkyBox(index){
            //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            var texture = Engine3D.TextureCubeMap.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            });
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            texture.createTextureArea([
                loader.getResource("1"),
                loader.getResource("2"),
                loader.getResource("3"),
                loader.getResource("4"),
                loader.getResource("5"),
                loader.getResource("6")
            ]);

            texture.unBind();

            return texture;
        }
        function createTexture(index){
            var texture = Engine3D.Texture2D.create({
                "TEXTURE_MIN_FILTER":"LINEAR"
            }, true);
            if (!texture) {
                console.log('Failed to create the texture object');
                return null;
            }
            texture.bindToUnit(index);
            texture.createTextureArea(
                loader.getResource(String(index + 1))
            );

            texture.unBind();

            return texture;
        }
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

                //此处为针对视图坐标系的角度变换！
                camera.rotateSpeedY = -dx;
                camera.rotateSpeedX = -dy;


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

