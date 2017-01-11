module wd{
    @singleton()
    export abstract class UIComponentContainer extends ComponentContainer{
        public update(elapsed:number){
            this.list.forEach(function(child:ThreeDUI|TwoDUI){
                child.update(elapsed);
            });
        }
    }
}

