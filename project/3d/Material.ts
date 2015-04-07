module Engine3D {
    export class Material {
        constructor(diffuse, specular, shininess) {
            this._diffuse = diffuse;
            this._specular = specular;
            this._shininess = shininess;
        }

        private _diffuse:number = null;
        get diffuse(){
            return this._diffuse;
        }
        set diffuse(diffuse:number){
            this._diffuse = diffuse;
        }

        private _specular:number = null;
        get specular(){
            return this._specular;
        }
        set specular(specular:number){
            this._specular = specular;
        }

        //todo change to enum type
        private _shininess:number = null;
        get shininess(){
            return this._shininess;
        }
        set shininess(shininess:number){
            this._shininess = shininess;
        }


        initWhenCreate() {
        }

        public static create(diffuse, specular, shininess) {
            var obj = new this(diffuse, specular, shininess);

            obj.initWhenCreate();

            return obj;
        }
    }
}
