module wd{
    export class CustomProceduralShader extends ProceduralShader{
        public static create(texture:CustomProceduralTexture){
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        constructor(texture:CustomProceduralTexture){
            super(null);

            this._texture = texture;
        }

        protected libs:wdCb.Collection<CustomProceduralShaderLib>;

        private _texture:CustomProceduralTexture = null;


        public update(cmd:ProceduralCommand){
            super.update(cmd);

            this._texture.mapManager.bindAndUpdate();
            this._texture.mapManager.sendData(this.program);
        }
    }
}

