module wd{
    export class EmptyShadowMapController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public addTwoDShadowMap(shadowMap:any){
        }

        public addCubemapShadowMap(shadowMap:any){
        }

        public hasTwoDShadowMap(shadowMap:any){
            return false;
        }

        public hasCubemapShadowMap(shadowMap:any){
            return false;
        }

        public getTwoDShadowMapList(){
            return null;
        }

        public getCubemapShadowMapList(){
            return null;
        }

        public getAllMapArr(){
            return null;
        }

        public removeChild(map:Texture){
        }

        public removeAllChildren(){
        }
    }
}

