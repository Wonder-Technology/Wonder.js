module wd{
    export class CustomProceduralShader extends ProceduralShader{
        public static create(texture:CustomProceduralTexture){
            var obj = new this(texture);

            return obj;
        }

        constructor(texture:CustomProceduralTexture){
            super();

            this._texture = texture;
        }

        protected libs:wdCb.Collection<CustomProceduralShaderLib>;

        private _texture:CustomProceduralTexture = null;


        public update(cmd:ProceduralCommand){
            super.update(cmd);

            //todo
            this._texture.mapManager.update();
            this._texture.mapManager.sendData(this.program);
        }
    }
}

