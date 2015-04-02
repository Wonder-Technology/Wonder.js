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
        var rectangle = null;
        var cube = null;
        var sphere = null;
        var reflectedSphere = null;

        var scene1 = null;
        var scene2 = null;
        var scene3 = null;
        var scene4 = null;
        var sceneReflectBackground1 = null;
        var sceneReflectBackground2 = null;

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
            //light
            var pointLightArr = [
            ];


            var pointLightPos = [0.0, 0.0, 0.15];
            var pointColor = [1.0, 1.0, 0.0];
            var pointIntensity = 0.8;


            var attenuation = Engine3D.Light.Attenuation.create(4);

            pointLightArr.push(Engine3D.Light.PointLight.create(
                pointLightPos,
                pointColor,
                pointIntensity,
                attenuation
            ));

            pointLightPos = [0.15, 0.0, 0.0];
            pointColor = [0.0, 1.0, 0.0];
            pointIntensity = 1.0;


            attenuation = Engine3D.Light.Attenuation.create(4);

            pointLightArr.push(Engine3D.Light.PointLight.create(
                pointLightPos,
                pointColor,
                pointIntensity,
                attenuation
            ));




            var ambientLightColor = [0.2, 0.2, 0.2];






            scene1 = Engine3D.Scene.create(camera);
            scene2 = Engine3D.Scene.create(camera);
            scene3 = Engine3D.Scene.create(camera);
            scene4 = Engine3D.Scene.create(camera);
            //todo should add all objects that need to be real-rendered into one scene
            sceneReflectBackground1 = Engine3D.Scene.create(camera);
            sceneReflectBackground2 = Engine3D.Scene.create(camera);



            //set shader
            var vs = Engine3D.Shader.create();
            var fs = Engine3D.Shader.create();

            var skyBoxPrg = Engine3D.Program.create(vs.createShader("skyBox-vs"), fs.createShader("skyBox-fs"));

            scene1.program = skyBoxPrg;

            sceneReflectBackground1.program = skyBoxPrg;


            var texture2DPrg  = Engine3D.Program.create(vs.createShader("texture2D-vs"), fs.createShader("texture2D-fs"));

            scene2.program = texture2DPrg;


            sceneReflectBackground2.program = texture2DPrg;


            var lightPrg  = Engine3D.Program.create(vs.createShader("texture2D-light-vs"), fs.createShader("texture2D-light-fs"));

            scene3.program = lightPrg;


            var reflectPrg  = Engine3D.Program.create(vs.createShader("reflect-vs"), fs.createShader("reflect-fs"));

            scene4.program = reflectPrg;


            //add sprites
            skyBox = createSkyBox();
            rectangle = createRectangle();
            cube = createCube();
            sphere = createSphere();


            scene1.addSprites([skyBox]);
            scene2.addSprites([rectangle]);
            scene3.addSprites([cube, sphere]);




            sceneReflectBackground1.addSprites([skyBox]);
            sceneReflectBackground2.addSprites([rectangle]);


            //Initialize framebuffer object (FBO)
            //todo dry
            var OFFSCREEN_WIDTH = 256;
            var OFFSCREEN_HEIGHT = 256;

            var fbo = initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

            scene4.setFrameData(fbo,
                [sceneReflectBackground1, sceneReflectBackground2]
            );


            reflectedSphere = createReflectedCubeMap(fbo.texture);

            scene4.addSprites([reflectedSphere]);







            //add light
            scene3.ambientColor = ambientLightColor;
            scene3.addLight(pointLightArr);



            //overwrite hook

            //todo refactor
            scene4.onSetData = function(sprite, program){
                var mMatrix = sprite.matrix;


                var mvMatrix = mMatrix.copy();
                mvMatrix.concat(this.camera.vMatrix);


                program.setUniformData("u_mvMatrix", Engine3D.DataType.FLOAT_MAT4, mvMatrix.values);



                //no need to copy
                var mInverseCamera = this.camera.vMatrix.copy().inverseOf();

                program.setUniformData("u_mInverseCamera", Engine3D.DataType.FLOAT_MAT4, mInverseCamera.values);


                var normalMatrix = Math3D.Matrix.create();
                normalMatrix.setInverseOf(mMatrix);

                //var u_normalMatrix = gl.getUniformLocation(prg, 'u_normalMatrix');
                //
                //gl.uniformMatrix4fv(u_normalMatrix, false, normalMatrix.values);
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



            scene1.onStartLoop();
            scene2.onStartLoop();
            scene3.onStartLoop();
            scene4.onStartLoop();



            //draw in frameBuffer shoule before draw in canvas
            scene4.drawScenesInFrameBuffer();




            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer


            scene1.run();
            scene2.run();
            scene3.run();

            scene4.run();




            //
            ////todo should do this in Scene
            ////todo invoke sprite's method to add frame texture
            //var i = 0;
            //var arr = [];
            //
            //arr.push({
            //    material: createMaterial(i, createReflectTexture(scene4._frameBuffer.texture, i)),
            //    //todo type should be DataType instead of string
            //    uniformData:{
            //        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
            //        "u_sampler":["TEXTURE_CUBE", "diffuse"]
            //    }
            //});
            //
            //reflectedSphere.textureArr = arr;









            scene1.onEndLoop();
            scene2.onEndLoop();
            scene3.onEndLoop();
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
            //
            //for(i = 0;i < len; i++){
            arr.push({
                material: createMaterial(i, createTextureSkyBox(i)),
                ////todo optimize data structure
                //todo type should be DataType instead of string
                uniformData:{
                    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    "u_sampler":["TEXTURE_CUBE", "diffuse"]
                }
                //indexCount: 6,
                //indexOffset: i * 6
            });
            //}

            o.textureArr = arr;



            o.init();

            return o;
        }



        function createRectangle() {
            var vertices = new Float32Array([
                0.3, 0.3, 0.3,
                -0.3, 0.3, 0.3,
                -0.3, -0.3, 0.3,
                0.3, -0.3, 0.3,

                0.3, 0.3, 0.3,
                -0.3, 0.3, 0.3,
                -0.3, -0.3, 0.3,
                0.3, -0.3, 0.3
            ]);

            // Indices of the vertices
            var indices = new Uint8Array([
                0, 1, 2,   0, 2, 3,
                4, 6, 5,  4, 7, 6
            ]);

            var texCoords = new Float32Array([
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,

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

            for(i = 0;i < len; i++){
                arr.push({
                    material: createMaterial(i, createTexture(i)),
                    uniformData:{
                        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                        "u_sampler":["TEXTURE_2D", "diffuse"]
                    },
                    indexCount: 6,
                    indexOffset: i * 6
                });
            }

            o.textureArr = arr;

            o.setCULLFACE();


            o.init();

            return o;
        }



        /*!
         实现正方体每个面不同纹理的方法：
         1、将6个面的纹理压缩到一张图片上，通过uv map
         2、绘制6次，每次画一个面
         3、使用cube map

         此处使用第2个方法
         */
        function createCube(){
            var data = Engine3D.Cubic.Cube.create().getCubeData();
            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(data.vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(data.texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(data.normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(data.indices, gl.UNSIGNED_BYTE)
            };

            //todo 按2d引擎思路，重构出action和animation？
            //o.actionData = {
            //    "rotate": {
            //        axis: [0, 1, 0],
            //        speed:10
            //    }
            //};
            //
            //o.addActions(
            //    {"rotate":Engine3D.Action.Rotate.create(
            //        {axis: [0, 1, 0], speed:10}
            //    )
            //    }
            //);


            var i = 0;
            var arr = [];

            for(i = 0;i < 6; i++){
                arr.push({
                    material:createMaterial(i, createTexture(i)),
                    //uniformData:{
                    //    //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                    //    //add light map?
                    //    "u_sampler":["TEXTURE_2D", "diffuse"]
                    //},
                    uniformData:{
                        "u_diffuseSampler":["INT", "diffuse"],
                        "u_specularSampler":["INT", "specular"],
                        "u_shininess":["FLOAT", "shininess"]
                    },
                    indexCount: 6,
                    indexOffset: (2 * i) * 6
                });
                //arr.push({
                //    material:createMaterial(i, createTexture(i)),
                //    uniformData:{
                //        "u_diffuseSampler":["INT", "diffuse"],
                //        "u_specularSampler":["INT", "specular"],
                //        "u_shininess":["FLOAT", "shininess"]
                //    },
                //    indexCount: 6,
                //    indexOffset: (2 * i + 1) * 6
                //});
            }

            o.textureArr = arr;


            o.setCULLFACE(gl.CW);

            o.init();

            return o;
        }

        function createSphere(){
            var data = Engine3D.Cubic.Sphere.create().getSphereDataByLatitudeLongtitude(
                0, 0, 0, 30, 30, 0.1
            );
            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(data.vertices, 3, gl.FLOAT),
                texCoordBuffer: Engine3D.ArrayBuffer.create(data.texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(data.normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(data.indices, gl.UNSIGNED_SHORT)
            };



            var i = 0;
            var arr = [];
            var len = 1;

            for(i = 0;i < len; i++){
                arr.push({
                    material:createMaterial(i, createTexture(i)),
                    uniformData:{
                        "u_diffuseSampler":["INT", "diffuse"],
                        "u_specularSampler":["INT", "specular"],
                        "u_shininess":["FLOAT", "shininess"]
                    }
                });
            }

            o.textureArr = arr;


            o.initData = function(){
                this.runAction(this.getRotateAction());
                this.runAction(this.getTranslateAction());
            };

            o.init();

            return o;
        }


        function createReflectedCubeMap(texture){
            var data = Engine3D.Cubic.Sphere.create().getSphereDataByLatitudeLongtitude(
                0, 0, 0.85, 30, 30, 0.1
                //0, 0, 0, 30, 30, 0.1
            );
            var o = Engine3D.Sprite.create("TRIANGLES");

            o.buffers = {
                vertexBuffer:Engine3D.ArrayBuffer.create(data.vertices, 3, gl.FLOAT),
                //texCoordBuffer: Engine3D.ArrayBuffer.create(data.texCoords, 2, gl.FLOAT),
                normalBuffer: Engine3D.ArrayBuffer.create(data.normals, 3, gl.FLOAT),
                indexBuffer: Engine3D.ElementBuffer.create(data.indices, gl.UNSIGNED_SHORT)
            };







// Size of off screen
            var OFFSCREEN_WIDTH = 256;
            var OFFSCREEN_HEIGHT = 256;

            //var pMatrixFBO = Math3D.Matrix.create();

            //
            ////setPerspective(OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT, pMatrixFBO);
            ////
            ////pMatrixFBO.concat(vMatrix);
            //
            ////
            ////var vpMatrix = Math3D.Matrix.create();
            ////
            //////todo shoude be dynamic by reflect object(sphere)
            //////eye is in center point of sphere, center(target) is towards -z axis
            ////vpMatrix.lookAt(
            ////    0.0, 0.0, 8.5,
            ////    0, 0, -1,
            ////    0, 1, 0
            ////);
            //////todo vpMatrix should be dynamic,not fixed!
            ////vpMatrix.perspective(60, OFFSCREEN_WIDTH / OFFSCREEN_HEIGHT,
            ////    0.1, 10);
            //
            //
            //
            ////todo vpMatrix should be decided by reflectObj
            ////todo vpMatrix should be placed in Scene!
            //o.setFrameData(fbo,
            //    //{
            //    //    sceneArr: [sceneReflectBackground1, sceneReflectBackground2],
            //    //    vpMatrix: vpMatrix
            //    //}
            //    [sceneReflectBackground1, sceneReflectBackground2]
            //);






            var arr = [];
            var i = 0,
                len = 1;

            //for(i = 0;i < len; i++){
                arr.push({
                    material: createMaterial(i, texture),
                    //todo type should be DataType instead of string
                    uniformData:{
                        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
                        "u_sampler":["TEXTURE_CUBE", "diffuse"]
                    }
                });
            //}
            //
            o.textureArr = arr;



            //o.initData = function(){
            //};

            o.init();



            //o.initFrameBuffer(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);



            return o;
        }

        function initFramebufferObject(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT) {
            var framebuffer, texture, depthBuffer;

            //// Define the error handling function
            //var error = function() {
            //    if (framebuffer) gl.deleteFramebuffer(framebuffer);
            //    if (texture) gl.deleteTexture(texture);
            //    if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
            //    return null;
            //}

            // Create a frame buffer object (FBO)
            ////framebuffer = Engine3D.FrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

            framebuffer = Engine3D.CubeMapFrameBuffer.create(OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

            //if (!framebuffer) {
            //    console.log('Failed to create frame buffer object');
            //    return error();
            //}
            //
            //texture = Engine3D.Texture2D.create({
            //    "TEXTURE_MIN_FILTER": "LINEAR"
            //}, false);
            //texture.createTextureArea(null, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            //framebuffer.texture = texture; // Store the texture object


            //    gl.texImage2D(tdl.textures.CubeMap.faceTargets[ff],
            //        0,                 // level
            //        gl.RGBA,           // internalFormat
            //        this.size,         // width
            //        this.size,         // height
            //        0,                 // border
            //        gl.RGBA,           // format
            //        gl.UNSIGNED_BYTE,  // type
            //        null);             // data
            //}

            //var i = 0,
            //    len = 1;
            //var arr = [];
            //
            ////for(i = 0;i < len; i++){
            //arr.push({
            //    material: createMaterial(i, createReflectTexture(fboTexture, i)),
            //    //todo type should be DataType instead of string
            //    uniformData:{
            //        //todo for no light map object,it should refactor Material,now just set diffuse to pass.
            //        "u_sampler":["TEXTURE_CUBE", "diffuse"]
            //    }
            //});
            ////}
            //
            //framebuffer.texture = arr;


            //framebuffer.createTexture();
            //
            //
            //
            //depthBuffer = framebuffer.createRenderBuffer("DEPTH_COMPONENT16", OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);
            //
            //
            //framebuffer.attachTexture();
            //framebuffer.attachRenderBuffer("DEPTH_ATTACHMENT", depthBuffer);
            //
            //
            //framebuffer.check();
            //
            //framebuffer.unBind();

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

        function createReflectTexture(fboTexture, index){
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
                fboTexture     //-z axis
            ]);


            texture.unBind();

            return texture;
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

