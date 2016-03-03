module wd {
    export class MarbleProceduralRenderTargetRenderer extends ProceduralRenderTargetRenderer{
        public static create(texture:MarbleProceduralTexture) {
            var obj = new this(texture);

            obj.initWhenCreate();

            return obj;
        }

        protected texture:MarbleProceduralTexture;
    }
}

