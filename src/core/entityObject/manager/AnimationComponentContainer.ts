module wd{
    @singleton()
    export class AnimationComponentContainer extends ComponentContainer{
        public static getInstance():any {}

		private constructor(){super();}

        protected list:wdCb.Collection<Animation>;

        public update(elapsed:number){
            this.list.forEach(function(child:Animation){
                child.update(elapsed);
            });
        }
    }
}

