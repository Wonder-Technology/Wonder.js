module wd {
    export function singleton(isInitWhenCreate:boolean = false) {
        return (target:any) => {
            target._instance = null;

            if (isInitWhenCreate) {
                target.getInstance = () => {
                    if (target._instance === null) {
                        let instance = new target();

                        target._instance = instance;

                        instance.initWhenCreate();
                    }

                    return target._instance;
                };
            }
            else {
                target.getInstance = () => {
                    if (target._instance === null) {
                        target._instance = new target();
                    }

                    return target._instance;
                };
            }
        }
    }
}

