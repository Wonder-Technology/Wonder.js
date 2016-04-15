module wd{
    export class ComponentInitOrderTable{
        public static getOrder(component:Component){
            if(component instanceof SourceInstance){
                return 1;
            }
            if(component instanceof Shadow){
                return 2;
            }
            if(component instanceof Geometry){
                return 3;
            }

            return 4;
        }
    }
}

