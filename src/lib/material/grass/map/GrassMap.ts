module wd{
    export class GrassMap{
        public static create(material:GrassMaterial) {
        	var obj = new this(material);

            obj.initWhenCreate();

        	return obj;
        }

        constructor(material:GrassMaterial){
            this._material = material;
        }

        private _mapData:Array<GrassMapData> = [];
        @requireSetter(function(mapData:Array<GrassMapData>){
            it("should contain 3 sourceRegion data", function () {
                expect(mapData.length).equal(3);

                for(let data of mapData){
                    expect(data.sourceRegion).exist;
                }
            });
        })
        @cloneAttributeAsCustomType(function(source:GrassMaterial, target:GrassMaterial, memberName:string){
            var s = source[memberName],
                t:Array<GrassMapData> = [];

            for(let data of s){
                t.push({
                    sourceRegion:data.sourceRegion.clone()
                });
            }

            target[memberName] = t;
        })
        get mapData(){
            return this._mapData;
        }
        set mapData(mapData:Array<GrassMapData>){
            this._mapData = mapData;
        }

        @cloneAttributeAsCloneable()
        public grassMap:ImageTexture|ProceduralTexture = null;
        @cloneAttributeAsBasicType()
        public alphaTest:number = 0.0001;
        @cloneAttributeAsCloneable()
        public wind:GrassWindModel = GrassWindModel.create();

        private _material:GrassMaterial = null;

        public initWhenCreate(){
            this._material.side = ESide.BOTH;
        }

        public clone(material:GrassMaterial){
            return CloneUtils.clone(this, null, [material]);
        }

        public addMap(mapManager:MapManager){
            mapManager.addMap(this.grassMap, {
                samplerVariableName: VariableNameTable.getVariableName("grassMap")
            });
        }

        public hasData(){
            return this.grassMap !== null;
        }

        public getTextureForRenderSort():Texture{
            return this.grassMap;
        }

        public updateShader(cmd:QuadCommand){
            this._computeTime();
        }

        private _computeTime(){
            this.wind.time += this.wind.speed;
        }
    }

    export class GrassWindModel{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public time:number = 0;
        @cloneAttributeAsBasicType()
        public speed:number = 0.1;
        @cloneAttributeAsCloneable()
        public direction:Vector2 = Vector2.create(1, 1);
        @cloneAttributeAsBasicType()
        public strength:number = 0.002;

        public clone(){
            return CloneUtils.clone(this);
        }
    }

    export type GrassMapData = {
        sourceRegion:RectRegion;
    }
}
