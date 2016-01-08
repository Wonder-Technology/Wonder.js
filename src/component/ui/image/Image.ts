module wd {
    //todo support .gif animation(now can only show static picture)
    export class Image extends UI {
        public static create() {
            var obj = new this();

            return obj;
        }

        //todo change source, dirty
        public source:ImageTextureAsset = null;

        //todo support draw a part of image asset

        public update(elapsedTime:number){
            if(this.source === null){
                return;
            }

            //todo extract to UI

            this.context.save();

            this.setCanvasTransformForRotation();

            this.drawInCenterPoint(this.context, this.source.source, 0, 0, this.width, this.height,
                this.entityObject.transform.position, this.width, this.height);


            this.context.restore();
        }
    }
}

