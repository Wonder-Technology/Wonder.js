/// <reference path="../definitions.d.ts"/>
module dy.render{
    export class WebGLRenderer extends Renderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:dyCb.Collection<QuadCommand> = dyCb.Collection.create<QuadCommand>();
        private _clearOptions:any = {
            color:Color.create("#000000"),
            alpha: 1.0
        };

        public createQuadCommand():QuadCommand{
            return QuadCommand.create();
        }

        public addCommand(command:QuadCommand){
            if(this._commandQueue.hasChild(command)){
                return;
            }

            this._commandQueue.addChild(command);
            command.init();
        }

        public render(){
            GLManager.getInstance().clear(this._clearOptions);

            this._commandQueue.forEach((command) => {
                command.execute();
            });

            this._clearCommand();
        }

        public init(){
            GLManager.getInstance().depthTest = true;
        }

        public setClearColor(color:Color = Color.create("#000000"), alpha:number = 1.0){
            this._setClearOptions({
                color:color,
                alpha:alpha
            });
        }

        private _clearCommand(){
            this._commandQueue.removeAllChildren();
        }

        private _setClearOptions(clearOptions:any){
            dyCb.ExtendUtils.extend(this._clearOptions, clearOptions);
        }
    }
}
