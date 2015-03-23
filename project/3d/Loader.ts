module Engine3D{
    export class Loader{
        constructor(){
            this._resourceContainer = {};
            this._count = 0;
        }

        load(resourceArr){
            var i = null;
            var self = this;

            this._total = resourceArr.length;

            resourceArr.forEach(function(obj){
                var image = new Image();
                image.src = obj.src;
                image.onload = function(){
                    self._resourceContainer[obj.id] = this;
                    self._count = self._count + 1;
                }
            });


            //todo 待重构
            setTimeout(function(){
                if(self._count === self._total){
                    self._onload();
                    return;
                }

                console.log("资源未加载完");
            }, 2000);
        //}, 100);
        }

        getResource(id){
            return this._resourceContainer[id];
        }

        private _count = null;
        private _total = null;
        private _resourceContainer:{} = null;
        private _onload= null;

        set onload(onload){
            this._onload = onload;
        }

        public static create(){
            var obj = new Loader();

            return obj;
        }

    }
}
