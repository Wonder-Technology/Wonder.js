/// <reference path="../definitions.d.ts"/>
module dy {
    //todo add more attribute refer to unity

    export class Material {
        //todo abstract
        public shader:render.Shader = null;

        private _blendType:BlendType = null;
        get blendType(){
            if(this._blendType){
                return this._blendType;
            }

            if ( (this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NONE;
            }
            else if ((this.blendSrc === BlendFunction.SRC_ALPHA)
                && (this.blendDst === BlendFunction.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.NORMAL;
            }
            else if ((this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVE;
            }
            else if ((this.blendSrc === BlendFunction.SRC_ALPHA)
                && (this.blendDst === BlendFunction.ONE)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.ADDITIVEALPHA;
            }
            else if ((this.blendSrc === BlendFunction.DST_COLOR)
                && (this.blendDst === BlendFunction.ZERO)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.MULTIPLICATIVE;
            }
            else if ((this.blendSrc === BlendFunction.ONE)
                && (this.blendDst === BlendFunction.ONE_MINUS_SRC_ALPHA)
                && (this.blendEquation === BlendEquation.ADD)) {
                return BlendType.PREMULTIPLIED;
            }
            else {
                return BlendType.NORMAL;
            }
        }
        set blendType(blendType:BlendType){
            switch (blendType) {
                case BlendType.NONE:
                    this.blend = false;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ZERO;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.NORMAL:
                    this.blend = true;
                    this.blendSrc = BlendFunction.SRC_ALPHA;
                    this.blendDst = BlendFunction.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.PREMULTIPLIED:
                    this.blend = true;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ONE_MINUS_SRC_ALPHA;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunction.ONE;
                    this.blendDst = BlendFunction.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.ADDITIVEALPHA:
                    this.blend = true;
                    this.blendSrc = BlendFunction.SRC_ALPHA;
                    this.blendDst = BlendFunction.ONE;
                    this.blendEquation = BlendEquation.ADD;
                    break;
                case BlendType.MULTIPLICATIVE:
                    this.blend = true;
                    this.blendSrc = BlendFunction.DST_COLOR;
                    this.blendDst = BlendFunction.ZERO;
                    this.blendEquation = BlendEquation.ADD;
                    break;
            }

            this._blendType = blendType;
        }

        public color:Color = Color.create("0xffffff");
        public program:render.Program = null;
        //public depthTest:boolean = true;
        //public depthWrite:boolean = true;
        public redWrite:boolean = true;
        public greenWrite:boolean = true;
        public blueWrite:boolean = true;
        public alphaWrite:boolean = true;
        public polygonOffsetMode:PolygonOffsetMode = PolygonOffsetMode.NONE;
        public cullMode:CullMode = CullMode.BACK;
        public blend:boolean = false;
        public blendSrc:BlendFunction = BlendFunction.SRC_COLOR;
        public blendDst:BlendFunction = BlendFunction.DST_COLOR;
        public blendEquation:BlendEquation = BlendEquation.ADD;

        public textureManager:TextureManager = TextureManager.create();

        public init(){
            this.textureManager.init();
            this.shader.init();

            this.program = this._createProgramWithShader(this.shader);
        }

        public dispose(){
            this.textureManager.dispose();
        }

        public updateShader(quadCmd:render.QuadCommand){
            this._sendCommonShaderVariables(quadCmd);
        }

        private _sendCommonShaderVariables(quadCmd:render.QuadCommand) {
            var program = this.program;


            this._sendAttributeVariables(quadCmd);

            program.setUniformData("u_mMatrix", render.VariableType.FLOAT_MAT4, quadCmd.mMatrix);
            program.setUniformData("u_vMatrix", render.VariableType.FLOAT_MAT4, quadCmd.vMatrix);
            program.setUniformData("u_pMatrix", render.VariableType.FLOAT_MAT4, quadCmd.pMatrix);
        }

        private _sendAttributeVariables(quadCmd:render.QuadCommand){
            var program = this.program;

            if (quadCmd.buffers.hasChild("vertexBuffer")) {
                program.setAttributeData("a_position", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }

            if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
                program.setAttributeData("a_texCoord", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            }

            if (quadCmd.buffers.hasChild("normalBuffer")) {
                program.setAttributeData("a_normal", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            if(quadCmd.buffers.hasChild("colorBuffer")){
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */


                program.setAttributeData("a_color", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("colorBuffer"));
            }
        }

        private _createProgramWithShader(shader:render.Shader){
            //todo optimize: batch init program(if it's the same as the last program, not initWithShader)
            return render.Program.create().initWithShader(shader);
        }
    }
}
