module wd{
    export class SolidLineGeometry extends LineGeometry{
        public static create(){
            var geo = new this();

            geo.initWhenCreate();

            return geo;
        }

        public initWhenCreate(){
            this.drawMode = wd.EDrawMode.LINE_STRIP;
        }

        protected computeVertices():Array<number>{
            return this.vertices;
        }
    }
}

