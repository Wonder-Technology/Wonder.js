module wd{
    export class ClassUtils{
        @ensure(function(className:string){
            it("should get class name from objInstance.className", () => {
                expect(className).exist;
                expect(className !== "").true
            });
        })
        public static getClassName(objInstance:any){
            return objInstance.constructor.name;
        }

        public static getClass(className:string){
            return wd[className];
        }


        @require(function(className:string, emptyClassName:string){
            it("should exist empty class if class not exist", () => {
                if(this.getClass(className) === void 0){
                    expect(this.getClass(emptyClassName)).exist;
                }
            }, this);
        })
        public static getClassOrEmpty(className:string, emptyClassName:string) {
            var _class = this.getClass(className);

            if (_class === void 0) {
                _class = this.getClass(emptyClassName);
            }

            return _class;
        }

        public static hasComponent(entityObject:EntityObject, className:string){
            var _class = this.getClass(className);

            if(_class === void 0){
                return false;
            }

            return entityObject.hasComponent(_class);
        }

        public static createClassInstance(className:string, ...args:Array<any>){
            var _class = ClassUtils.getClass(className);

            if(_class !== void 0){
                return _class.create.apply(_class, args);
            }

            return null;
        }

        @require(function(className:string, emptyClassName:string, ...args:Array<any>){
            it("should exist empty class if class not exist", () => {
                if(this.getClass(className) === void 0){
                    expect(this.getClass(emptyClassName)).exist;
                }
            }, this);
        })
        public static createClassInstanceOrEmpty(className:string, emptyClassName:string, ...args:Array<any>){
            var _class = ClassUtils.getClassOrEmpty(className, emptyClassName);

            return _class.create.apply(_class, args);
        }

        public static execSingletonMethod(className:string, method:string, arg?:any){
            let Engine = this.getClass(className);

            if(Engine !== void 0){
                let instance = Engine.getInstance();

                if(arg !== void 0){
                    instance[method](arg);
                }
                else{
                    instance[method]();
                }
            }
        }
    }
}
