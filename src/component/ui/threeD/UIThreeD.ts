module wd {
    export abstract class UIThreeD extends Component{
        @virtual
        public update(elapsed:number){
        }

        @require(function(entityObject:GameObject){
            expect(entityObject).instanceOf(GameObject);
        })
        public addToObject(entityObject:GameObject, isShareComponent:boolean = false){
            var engine:ThreeDUIEngine = ThreeDUIEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromObject(entityObject:GameObject){
            super.removeFromObject(entityObject);

            ThreeDUIEngine.getInstance().removeChild(this);
        }
    }
}

