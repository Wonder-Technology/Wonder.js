module wd{
    export class ArrayMapController extends MapController{
        public static create(material:Material) {
            var obj = new this(material);

            return obj;
        }

        private _arrayMapList:wdCb.Collection<ArrayMapData> = wdCb.Collection.create<ArrayMapData>();

        public addArrayMap(samplerName:string, mapArray:Array<Texture>){
            this._arrayMapList.addChild({
                samplerName:samplerName,
                mapArray:mapArray
            });
        }

        public sendMapData(program:Program, maxUnitOfBindedSingleMap:number){
            var self = this;

            this._arrayMapList.forEach((mapData:ArrayMapData) => {
                let arrayMapCount = mapData.mapArray.length;

                program.sendUniformData(`${mapData.samplerName}[0]`, EVariableType.SAMPLER_ARRAY, self._generateArrayMapUnitArray(maxUnitOfBindedSingleMap, maxUnitOfBindedSingleMap + arrayMapCount));

                maxUnitOfBindedSingleMap += arrayMapCount;
            });
        }

        @ensure(function(mapArr:Array<Texture>){
            for(let map of mapArr){
                assert(map instanceof Texture, Log.info.FUNC_SHOULD("each element", "be Texture"));
            }
        })
        public getAllMapArr(){
            var arrayMap = [];

            this._arrayMapList.forEach((mapData:ArrayMapData) => {
                arrayMap = arrayMap.concat(mapData.mapArray);
            });

            return arrayMap;
        }

        public removeAllChildren(){
            this._arrayMapList.removeAllChildren();
        }

        @ensure(function(arr:Array<number>, startUnit:number, endUnit:number){
            assert(arr.length === endUnit - startUnit, Log.info.FUNC_SHOULD("length", `be ${endUnit - startUnit}, but actual is ${arr.length}`));

            if(arr.length > 0){
                assert(arr[0] === startUnit, Log.info.FUNC_SHOULD("first element", `be ${startUnit}, but actual is ${arr[0]}`));
                assert(arr[arr.length - 1] === endUnit - 1, Log.info.FUNC_SHOULD("last element", `be ${endUnit - 1}, but actual is ${arr[arr.length - 1]}`));
            }
        })
        private _generateArrayMapUnitArray(startUnit:number, endUnit:number){
            var arr = [];

            while(endUnit > startUnit){
                arr.push(startUnit);

                startUnit++;
            }

            return arr;
        }
    }

    export type ArrayMapData = {
        samplerName:string;
        mapArray:Array<Texture>;
    }
}

