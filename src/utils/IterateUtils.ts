module wd{
    export class IterateUtils{
        public static forEachAll(entityObject:EntityObject, handler:(entityObject:EntityObject) => void){
            var func = (entityObject:EntityObject) => {
                handler(entityObject);

                entityObject.forEach((child:EntityObject) => {
                    func(child);
                });
            };

            func(entityObject);
        }
    }
}
