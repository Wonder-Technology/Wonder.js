module wd{
    export class VerticeSkinSkeletonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "vertice_skinSkeleton";

        @require(function(program:Program, cmd:QuadCommand, material:EngineMaterial){
            it("entityObject should has SkinSkeletonAnimation component", () => {
                expect(cmd.target.hasComponent(SkinSkeletonAnimation)).true;
            });
        })
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            var jointIndiceBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.JOINT_INDICE),
                jointWeightBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.JOINT_WEIGHT);

            if(!!jointIndiceBuffer){
                //todo optimze: send ivec4 data( int data)?
                this.sendAttributeBuffer(program, "a_jointIndice", jointIndiceBuffer);
            }

            if(!!jointWeightBuffer){
                this.sendAttributeBuffer(program, "a_jointWeight", jointWeightBuffer);
            }

            this._sendJointMatrices(program, cmd);
        }

        public setShaderDefinition(cmd:QuadCommand|null, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_jointIndice", "a_jointWeight"]);

            this.vsSourceDefineList.addChild({
                name:"MAX_JOINT_COUNT",
                value:material.geometry.entityObject.getComponent<SkinSkeletonAnimation>(SkinSkeletonAnimation).maxJoints
            });
        }

        private _sendJointMatrices(program:Program, cmd:QuadCommand){
            var anim = cmd.target.getComponent<SkinSkeletonAnimation>(SkinSkeletonAnimation);

            this.sendUniformData(program, "u_jointMatrices", anim.jointMatrices);
        }
    }
}

