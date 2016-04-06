module wd{
    export class ComponentInitOrderTable{
        public static getOrder(component:Component){
            if(component instanceof Shadow){
                return 1;
            }
            if(component instanceof Geometry){
                return 2;
            }

            return 3;
        }
    }
}

