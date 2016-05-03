module wd{
    export class SortUtils{
        public static insertSort(targetArr:Array<any>, compareFunc:(a:any, b:any) => boolean):Array<any>{
            var resultArr:Array<any> = wdCb.ExtendUtils.extend([], targetArr);

            for(let i = 1, len = resultArr.length; i < len; i++){
                for(let j = i; j > 0 && compareFunc(resultArr[j], resultArr[j - 1]); j--){
                    this._swap(resultArr, j - 1, j);
                }
            }

            return resultArr;
        }

        private static _swap(children:Array<any>, i:number, j:number){
            var t:any = null;

            t = children[i];
            children[i] = children[j];
            children[j] = t;
        }
    }
}
