module wd{
    export class ShadowUtils{
        public static isReceive(gameObject:GameObject){
            var shadow:Shadow = null,
                parent:GameObject = gameObject,
                result:boolean = false;

            do{
                shadow = parent.getComponent<Shadow>(Shadow);

                if(!!shadow && shadow.receive){
                    result = true;
                    break;
                }

                parent = parent.parent;
            } while(parent);


            return result;
        }
    }
}
