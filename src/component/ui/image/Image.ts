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

                this.dirty = true;
            }
        }

        public targetSource:ImageTextureAsset = null;

        //todo support draw a part of image asset

        protected shouldNotUpdate(){
            return this._getDrawSource() === null;
        }

        protected draw(elapsedTime:number){
            this.drawInCenterPoint(this.context, this._getDrawSource().source, this.entityObject.transform.position, this.width, this.height);
        }

        private _getDrawSource():ImageTextureAsset{
            if(this.targetSource){
                return this.targetSource;
            }

            return this.source;
        }
    }
}

