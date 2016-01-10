module wd {
    //todo support .gif animation(now can only show static picture)
    export class Image extends UI {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _source:ImageTextureAsset = null;
        get source(){
            return this._source;
        }
        set source(source:ImageTextureAsset){
            if(source !== this._source){
                this._source = source;

                this.p_dirty = true;
            }
        }

        //todo support draw a part of image asset

        protected shouldNotUpdate(){
            return this.source === null;
        }

        protected draw(elapsedTime:number){
            this.drawInCenterPoint(this.context, this.source.source, this.entityObject.transform.position, this.width, this.height);
        }
    }
}

