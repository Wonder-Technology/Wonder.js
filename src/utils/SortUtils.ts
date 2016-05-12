module wd{
    export class SortUtils{
        public static insertSort(targetArr:Array<any>, compareFunc:(a:any, b:any) => boolean, isChangeSelf = false):Array<any>{
            var resultArr:Array<any> = isChangeSelf ? targetArr : wdCb.ExtendUtils.extend([], targetArr);

            for(let i = 1, len = resultArr.length; i < len; i++){
                for(let j = i; j > 0 && compareFunc(resultArr[j], resultArr[j - 1]); j--){
                    this._swap(resultArr, j - 1, j);
                }
            }

            return resultArr;
        }

        //@require(function(targetArr:Array<any>, l:number, r:number){
        //    assert(l >= 0, Log.info.FUNC_SHOULD("l", ">= 0"));
        //    assert(r <= targetArr.length - 1, Log.info.FUNC_SHOULD("r", `<= ${targetArr.length - 1}`));
        //})
        //public static quickSortAsc(targetArr:Array<any>, l:number, r:number):void{
        //    if(l >= r){
        //        return;
        //    }
        //
        //    let i = l, j = r, x = targetArr[l];
        //
        //    while (i < j)
        //    {
        //        while(i < j && targetArr[j] >= x){
        //            j--;
        //        }
        //
        //        if(i < j){
        //            targetArr[i++] = targetArr[j];
        //        }
        //
        //        while(i < j && targetArr[i] < x){
        //            i++;
        //        }
        //
        //        if(i < j){
        //            targetArr[j--] = targetArr[i];
        //        }
        //    }
        //
        //    targetArr[i] = x;
        //
        //    SortUtils.quickSortAsc(targetArr, l, i - 1);
        //    SortUtils.quickSortAsc(targetArr, i + 1, r);
        //}


        public static quickSort(targetArr:Array<any>, compareFunc:(a:any, b:any) => boolean, isChangeSelf = false):Array<any>{
            var resultArr:Array<any> = isChangeSelf ? targetArr : wdCb.ExtendUtils.extend([], targetArr);
            var sort = (l:number, r:number) => {
                if(l >= r){
                    return;
                }

                let i = l, j = r, x = resultArr[l];

                while (i < j)
                {
                    while(i < j && compareFunc(x, resultArr[j])){
                        j--;
                    }

                    if(i < j){
                        resultArr[i++] = resultArr[j];
                    }

                    while(i < j && compareFunc(resultArr[i], x)){
                        i++;
                    }

                    if(i < j){
                        resultArr[j--] = resultArr[i];
                    }
                }

                resultArr[i] = x;

                sort(l, i - 1);
                sort(i + 1, r);
            };

            sort(0, resultArr.length - 1);

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
