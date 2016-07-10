module wd{
    //todo optimize:Component add "initOrder" attri
    export class ComponentInitOrderTable{
        public static getOrder(component:Component){
            if(component instanceof SourceInstance){
                return 1;
            }
            if(component instanceof Shadow){
                return 2;
            }
            if(component instanceof ThreeDBitmapFont){
                return 3;
            }
            if(component instanceof Geometry){
                return 4;
            }

            return 5;
        }
    }
}

