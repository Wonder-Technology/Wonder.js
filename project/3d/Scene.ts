/// <reference path="Camera.ts"/>
/// <reference path="Sprite.ts"/>
/// <reference path="Light.ts"/>
/// <reference path="Program.ts"/>
module Engine3D {
    declare var gl:any;

    export class Scene {
        constructor(camera) {
            this._camera = camera;
        }

        private _sprites:Sprite[] = null;
        private _pointLightArr:Light.PointLight[] = null;
        private _frameBuffer = null;
        private _isDrawInFrameBuffer:boolean = null;


        private _scenesInFrameBuffer:Scene[] = null;
        get scenesInFrameBuffer() {
            return this._scenesInFrameBuffer;
        }

        set scenesInFrameBuffer(scenesInFrameBuffer:Scene[]) {
            this._scenesInFrameBuffer = scenesInFrameBuffer;
        }

        private _camera:Camera = null;
        get camera() {
            return this._camera;
        }

        set camera(camera:Camera) {
            this._camera = camera;
        }

        private _program:Program = null;
        get program() {
            return this._program;
        }

        set program(program:Program) {
            this._program = program;
        }

        private _ambientColor:number[] = null;
        get ambientColor() {
            return this._ambientColor;
        }

        set ambientColor(ambientColor:number[]) {
            this._ambientColor = ambientColor;
        }


        addSprites(spriteArr) {
            this._sprites = this._sprites.concat(spriteArr);
        }

        addLight(pointLightArr) {
            this._pointLightArr = pointLightArr;
        }

        onStartLoop() {
            this._sprites.forEach(x => x.onStartLoop());
        }

        onEndLoop() {
            this._sprites.forEach(x => x.onEndLoop());
        }

        run() {
            var self = this;

            this._program.use();



            this._sprites.forEach((sprite)=> {
                //draw in frameBuffer is before this draw
                //and already update in that draw!
                //todo refactor
                if (!self._isDrawInFrameBuffer) {
                    sprite.update();
                }

                self._setData(sprite);

                sprite.draw(self._program);
            });
        }

        setFrameData(frameBuffer, data){
            this._frameBuffer = frameBuffer;
            this._scenesInFrameBuffer = data;
        }


        drawScenesInFrameBuffer(){
            //draw 6 face
            //todo if not all faces be real-render?
            var i = 0,
                len = TextureCubeMap.faceTargets.length;

            var self = this;

            for(i = 0; i < len; i++){
                this._frameBuffer.bind(i);

                //gl.clearColor(0,0,1,0);
                //gl.clearDepth(1);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);



                var vpMatrix = self.getVPMatrix(i);

                this._scenesInFrameBuffer.forEach(function(scene){
                    scene.drawInFrameBuffer(vpMatrix);
                });
            }



            this._frameBuffer.unBind();


        }

        getVPMatrix(index){
            var faceViews = [
                { target: [ 1, 0, 0], up: [0,-1, 0]},
                { target: [-1, 0, 0], up: [0,-1, 0]},
                { target: [ 0, 1, 0], up: [0, 0, 1]},
                { target: [ 0,-1, 0], up: [0, 0,-1]},
                { target: [ 0, 0, 1], up: [0,-1, 0]},
                { target: [ 0, 0,-1], up: [0,-1, 0]},
            ];

            //todo how to decide eye?eye should be dynamic
            //eye is in center point of sphere, center(target) is towards -z axis
            var eyeX = 0,
                eyeY = 0,
                eyeZ = 0;


            var vpMatrix = Math3D.Matrix.create();
            var center = faceViews[index].target;
            var up = faceViews[index].up;




                vpMatrix.lookAt(
                    eyeX, eyeY, eyeZ,
                    center[0], center[1], center[2],
                    up[0], up[1], up[2]);

                vpMatrix.perspective(60, this._frameBuffer.width / this._frameBuffer.height,
                    0.1, 10);



            return vpMatrix;
        }

        drawInFrameBuffer(vpMatrix){
            var self = this;

            this._program.use();

            this._isDrawInFrameBuffer = true;



            this._sprites.forEach((sprite)=> {
                sprite.update();

                self._setData(sprite, vpMatrix);

                sprite.draw(self._program);
            });

        }


        private _setData(sprite, vpMatrix?){
            var dataArr = [];
            var self = this;

            this.onSetData(sprite, this._program);

            if(sprite.buffers.vertexBuffer){
                dataArr.push({
                    name: "a_position",
                    buffer: sprite.buffers.vertexBuffer  ,
                    category: "attribute"
                });
            }
            if(sprite.buffers.texCoordBuffer){
                dataArr.push({
                    name: "a_texCoord",
                    buffer: sprite.buffers.texCoordBuffer ,
                    category: "attribute"
                });
            }
            if(sprite.buffers.normalBuffer){
                dataArr.push({
                    name: "a_normal",
                    buffer: sprite.buffers.normalBuffer ,
                    category: "attribute"
                });
            }

            if(this._hasLight()){
                var viewPos = this._camera.computeViewPosInWorldCoordinate();
                var normalMatrix = Math3D.Matrix.create();

                normalMatrix.setInverseOf(sprite.matrix);
                normalMatrix.transpose();


                dataArr = dataArr.concat([{
                    name:"u_normalMatrix",
                    type: Engine3D.DataType.FLOAT_MAT4,
                    val: normalMatrix.values,
                    category: "uniform"
                },
                    {
                        name:"u_mMatrix",
                        type: Engine3D.DataType.FLOAT_MAT4,
                        val: sprite.matrix.values,
                        category: "uniform"
                    },
                    {
                        name:"u_ambient",
                        type: Engine3D.DataType.FLOAT_3,
                        val: this._ambientColor,
                        category: "uniform"
                    },
                    {
                        name:"u_viewPos",
                        type: Engine3D.DataType.FLOAT_3,
                        val: viewPos,
                        category: "uniform"
                    }]);

                this._pointLightArr.forEach((light, index) => {
                    dataArr.push({
                        name:"u_pointLights[" + index + "]",
                        type: Engine3D.DataType.STRUCT,
                        val: {
                            member: [
                                ["FLOAT_3", "position"],
                                ["FLOAT_3", "color"],
                                ["FLOAT", "intensity"],
                                ["FLOAT", "range"],
                                ["FLOAT", "constant"],
                                ["FLOAT", "linear"],
                                ["FLOAT", "quadratic"]
                            ],
                            val:light
                        },
                        category: "uniform"
                    });
                });
            }



            ////todo refactor
            ////todo make it public?
            var mvpMatrix = this._computeMvpMatrix(sprite, vpMatrix);

            dataArr.push({
                name:"u_mvpMatrix",
                type: Engine3D.DataType.FLOAT_MAT4,
                val: mvpMatrix.values,
                category: "uniform"
            });



            dataArr.forEach((dataObj) => {
                switch (dataObj.category){
                    case "attribute":
                        self._program.setAttributeData(dataObj.name, dataObj.buffer);
                        break;
                    case "uniform":
                        self._program.setUniformData(dataObj.name, dataObj.type,dataObj.val);
                        break;
                    default:
                        break;

                }
            });
        }



        private _computeMvpMatrix(sprite, vpMatrix){
                if(vpMatrix) {
                    var vp = vpMatrix;
                    var mvpMatrix = sprite.matrix.copy().concat(vp);

                    return mvpMatrix;
                }

            return sprite.matrix.copy().concat(this._camera.computeVpMatrix());
        }

        private _hasLight(){
            return !!(this._pointLightArr && this._pointLightArr.length > 0);
        }


        initWhenCreate() {
            this._sprites = [];
            this._isDrawInFrameBuffer = false;
        }

        public static create(camera) {
            var obj = new this(camera);

            obj.initWhenCreate();

            return obj;
        }


        //hook
        onSetData(sprite, program){
        }
    }
}
