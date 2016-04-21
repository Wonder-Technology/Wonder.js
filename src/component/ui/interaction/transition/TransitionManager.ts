module wd {
    export class TransitionManager {
        public static create(ui:InteractionUI) {
            var obj = new this(ui);

            return obj;
        }

        constructor(ui:InteractionUI) {
            this._ui = ui;
        }

        private _ui:InteractionUI = null;
        @cloneAttributeAsCustomType(function(source:TransitionManager, target:TransitionManager, memberName:string){
            target[memberName] = source[memberName].clone(true);
        })
        private _spriteTransitionMap:wdCb.Hash<Transition> = wdCb.Hash.create<Transition>();
        @cloneAttributeAsCustomType(function(source:TransitionManager, target:TransitionManager, memberName:string){
            target[memberName] = source[memberName].clone(true);
        })
        private _colorTransitionMap:wdCb.Hash<Transition> = wdCb.Hash.create<Transition>();

        public clone(interactionUI:InteractionUI){
            return CloneUtils.clone(this, null, [interactionUI]);
        }

        public getObjectTransition(objectName:EButtonObjectName) {
            var result = this._getTransitionMap().getChild(<any>objectName);

            if (!result) {
                result = this._createTransitionInstance();

                this._getTransitionMap().addChild(<any>objectName, result);
            }

            return result;
        }

        public getObjectTarget(objectName:EButtonObjectName){
            return this.getObjectTransition(objectName).target;
        }

        public changeState(state:EUIState){
            wdFrp.fromArray([
                    this._spriteTransitionMap,
                    this._colorTransitionMap
                ])
                .subscribe((map:wdCb.Hash<Transition>) => {
                    map.forEach((transition:Transition) => {
                        transition.changeState(state);
                    });
                });
        }

        private _getTransitionMap() {
            var map:wdCb.Hash<Transition> = null;

            switch (this._ui.transitionMode) {
                case ETransitionMode.SPRITE:
                    map = this._spriteTransitionMap;
                    break;
                case ETransitionMode.COLOR:
                    map = this._colorTransitionMap;
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }

            return map;
        }

        private _createTransitionInstance(){
            var transition:Transition = null;

            switch (this._ui.transitionMode){
                case ETransitionMode.SPRITE:
                    transition = SpriteTransition.create();
                    break;
                case ETransitionMode.COLOR:
                    transition = ColorTransition.create();
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;
            }

            return transition;
        }
    }
}
