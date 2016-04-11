module wd{
    export class MapArrayController extends MapController{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mapArrayList:wdCb.Collection<ArrayMapData> = wdCb.Collection.create<ArrayMapData>();

        public addMapArray(samplerName:string, mapArray:Array<Texture>){
            this._mapArrayList.addChild({
                samplerName:samplerName,
                mapArray:mapArray
            });
        }

        //todo test
        public sendMapData(program:Program, maxUnitOfBindedSingleMap:number){
            var self = this;

            this._mapArrayList
                .forEach((mapData:ArrayMapData) => {
                    let arrayMapCount = mapData.mapArray
                        .filter((map:Texture) => {
                            return map.active;
                        })
                        .length;

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

            this._mapArrayList.forEach((mapData:ArrayMapData) => {
                arrayMap = arrayMap.concat(mapData.mapArray);
            });

            return arrayMap;
        }

        public removeAllChildren(){
            this._mapArrayList.removeAllChildren();
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

