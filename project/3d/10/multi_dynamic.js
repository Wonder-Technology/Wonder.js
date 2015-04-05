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
        var scene5 = null;
        var sceneReflectBackground1 = null;
        var sceneReflectBackground2 = null;
        var sceneReflectBackground3 = null;

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
            scene5 = Engine3D.Scene.create(camera);
            //todo should add all objects that need to be real-rendered into one scene
            sceneReflectBackground1 = Engine3D.Scene.create(camera);
            sceneReflectBackground2 = Engine3D.Scene.create(camera);
            sceneReflectBackground3 = Engine3D.Scene.create(camera);



            //set shader
            var vs = Engine3D.Shader.create();
            var fs = Engine3D.Shader.create();

            var skyBoxPrg = Engine3D.Program.create(vs.createShader("skyBox-vs"), fs.createShader("skyBox-fs"));

            scene1.program = skyBoxPrg;

            sceneReflectBackground1.program = skyBoxPrg;

            //scene4.program = skyBoxPrg;


            var dynamicPrg  = Engine3D.Program.create(vs.createShader("texture2D-vs"), fs.createShader("texture2D-fs"));

            scene4.program = dynamicPrg;
            sceneReflectBackground2.program = dynamicPrg;

            var reflectPrg  = Engine3D.Program.create(vs.createShader("reflect-vs"), fs.createShader("reflect-fs"));

            scene5.program = reflectPrg;
            sceneReflectBackground3.program = reflectPrg;


            //add sprites
            skyBox = createSkyBox();


            scene1.addSprites([skyBox]);

            //Initialize framebuffer object (FBO)
            //todo dry
            var OFFSCREEN_WIDTH = 256;
            var OFFSCREEN_HEIGHT = 256;

            var fbo1 = initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            var fbo2 = initCubeMapFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


            var rect = createRectangle(fbo1.texture);
            var cube = createCube(fbo2.texture);


            //sceneReflectBackground1.addSprites([skyBox, rect, cube]);
            sceneReflectBackground1.addSprites([skyBox]);
            sceneReflectBackground2.addSprites([rect]);
            sceneReflectBackground3.addSprites([cube]);


            //todo optimize:only draw objects in view
            //can't contain self
            scene4.setFrameData(fbo1,
                [sceneReflectBackground1, sceneReflectBackground3]
            );
            scene5.setFrameData(fbo2,
                [sceneReflectBackground1, sceneReflectBackground2]
            );




            scene4.addSprites([rect]);
            scene5.addSprites([cube]);







            //add light
            //scene3.ambientColor = ambientLightColor;
            //scene3.addLight(pointLightArr);



            //overwrite hook

            //todo refactor
            sceneReflectBackground3.onSetData = function(sprite, program){
                var mMatrix = sprite.matrix.copy();

                program.setUniformData("u_mMatrix", Engine3D.DataType.FLOAT_MAT4, mMatrix.values);


                var viewPos = this._camera.computeViewPosInWorldCoordinate();
                //vec4转换为vec3
                program.setUniformData("u_viewPos", Engine3D.DataType.FLOAT_3, viewPos);



                var normalMatrix = Math3D.Matrix.create();
                normalMatrix.setInverseOf(mMatrix);
                normalMatrix.transpose();

                program.setUniformData("u_normalMatrix", Engine3D.DataType.FLOAT_MAT4, normalMatrix.values);
            }
            scene5.onSetData = function(sprite, program){
                var mMatrix = sprite.matrix.copy();

                program.setUniformData("u_mMatrix", Engine3D.DataType.FLOAT_MAT4, mMatrix.values);


                var viewPos = this._camera.computeViewPosInWorldCoordinate();
                //vec4转换为vec3
                program.setUniformData("u_viewPos", Engine3D.DataType.FLOAT_3, viewPos);



                var normalMatrix = Math3D.Matrix.create();
                normalMatrix.setInverseOf(mMatrix);
                normalMatrix.transpose();

                program.setUniformData("u_normalMatrix", Engine3D.DataType.FLOAT_MAT4, normalMatrix.values);
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
            scene5.onStartLoop();


            //todo should only update each sprite once
            //so maybe should update sprites in startLoop?

            //draw in frameBuffer shoule before draw in canvas
            scene4.drawScenesInTexture2DFrameBuffer();
            scene5.drawScenesInCubeMapFrameBuffer();




            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer



            scene1.run();
            scene4.run();
            scene5.run();











            scene1.onEndLoop();
            scene4.onEndLoop();
            scene5.onEndLoop();


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



            //todo be infinite
            //o.position.x = 100;
            //o.position.y = 100;
            //o.position.z = 100;


            o.position = {
                x:100,
                y:100,
                z:100
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
                0.3, 0.3, 0.5,
                -0.3, 0.3, 0.5,
                -0.3, -0.3, 0.5,
                0.3, -0.3, 0.5,

                0.3, 0.3, 0.5,
                -0.3, 0.3, 0.5,
                -0.3, -0.3, 0.5,
                0.3, -0.3, 0.5
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3,
                4, 6, 5,  4, 7, 6
            ]);

            var texCoords = new Float32Array([
                //第一面为实时渲染,should be flipX(because it's mirror render)
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,



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


            //o.position.x = 0;
            //o.position.y = 0;
            //o.position.z = 0.2;


            o.position = {
                x:0,
                y:0,
                z:0.2
            };



            var i = 0,
                len = 2;
            var arr = [];

            arr.push({
                material: createMaterial(i, fboTexture),
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_2D", "diffuse"]
                },
                indexCount: 6,
                indexOffset: i * 6
            });


            i = 1;

            arr.push({
                material: createMaterial(i, createTexture(i)),
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_2D", "diffuse"]
                },
                indexCount: 6,
                indexOffset: i * 6
            });

            o.textureArr = arr;



            o.frameBufferData = {
                center:Math3D.Vector3.create(0, 0, 1),
                up:Math3D.Vector3.create(0, 1, 0)
            };


            o.setCULLFACE();


            o.initData = function(){
                //todo add Sequence Action, realize rotate by self(t->r->t-1)
                this.runAction(Engine3D.Action.Rotate.create(
                    //todo vector should all use Vector3/4 class! eg:center: Vector3.create(0, 0, 1);
                    //todo Vector3 should add static vec4 method to convert vec3 to vec4
                    this._matrix, {axis: [0, 1, 0], speed:0.2}
                ));
            };
            o.init();


            return o;
        }

        function createCube(textureCubeMap){
            var vertices = new Float32Array([   // Vertex coordinates
                0.2, 0.2, 0.2,  -0.2, 0.2, 0.2,  -0.2,-0.2, 0.2,   0.2,-0.2, 0.2,    // v0-v1-v2-v3 front
                0.2, 0.2, 0.2,   0.2,-0.2, 0.2,   0.2,-0.2,-0.2,   0.2, 0.2,-0.2,    // v0-v3-v4-v5 right
                0.2, 0.2, 0.2,   0.2, 0.2,-0.2,  -0.2, 0.2,-0.2,  -0.2, 0.2, 0.2,    // v0-v5-v6-v1 up
                -0.2, 0.2, 0.2,  -0.2, 0.2,-0.2,  -0.2,-0.2,-0.2,  -0.2,-0.2, 0.2,    // v1-v6-v7-v2 left
                -0.2,-0.2,-0.2,   0.2,-0.2,-0.2,   0.2,-0.2, 0.2,  -0.2,-0.2, 0.2,    // v7-v4-v3-v2 down
                0.2,-0.2,-0.2,  -0.2,-0.2,-0.2,  -0.2, 0.2,-0.2,   0.2, 0.2,-0.2     // v4-v7-v6-v5 back
            ]);

            var normals = new Float32Array([   // Normal
                0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,     // v0-v1-v2-v3 front
                1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,     // v0-v3-v4-v5 right
                0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,     // v0-v5-v6-v1 up
                -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,     // v1-v6-v7-v2 left
                0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,     // v7-v4-v3-v2 down
                0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0      // v4-v7-v6-v5 back
            ]);

            var indices = new Uint8Array([        // Indices of the vertices
                0, 1, 2,   0, 2, 3,    // front
                4, 5, 6,   4, 6, 7,    // right
                8, 9,10,   8,10,11,    // up
                12,13,14,  12,14,15,    // left
                16,17,18,  16,18,19,    // down
                20,21,22,  20,22,23     // back
            ]);


            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(vertices, 3, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(indices, gl.UNSIGNED_BYTE)
            };


            //o.position.x = 0;
            //o.position.y = 0;
            //o.position.z = 0;

            o.position = {
                x:0,
                y:0,
                z:0
            };



            var i = 0,
                len = 1;
            var arr = [];

            arr.push({
                material: createMaterial(i, textureCubeMap),
                ////todo optimize data structure
                //todo type should be DataType instead of string
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_CUBE", "diffuse"]
                }
            });

            o.textureArr = arr;


            o.initData = function(){
                //todo add Sequence Action, realize rotate by self(t->r->t-1)
                this.runAction(Engine3D.Action.Rotate.create(
                    //todo vector should all use Vector3/4 class! eg:center: Vector3.create(0, 0, 1);
                    //todo Vector3 should add static vec4 method to convert vec3 to vec4
                    this._matrix, {axis: [0, 1, 0], speed:-0.2}
                ));
            };

            o.init();

            return o;

        }

        function initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT) {
            var framebuffer, texture, depthBuffer;

            framebuffer = Engine3D.Texture2DFrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


            framebuffer.init();


            return framebuffer;
        }
        function initCubeMapFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT) {
            var framebuffer, texture, depthBuffer;

            framebuffer = Engine3D.CubeMapFrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);


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

