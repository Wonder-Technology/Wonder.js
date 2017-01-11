module wd{
    @singleton()
    export class BillboardComponentContainer extends ComponentContainer{
        public static getInstance():any {}

		private constructor(){super();}

        public update(elapsed:number){
            this.list.forEach(function(child:Billboard){
                child.update(elapsed);
            });
        }
    }
}

