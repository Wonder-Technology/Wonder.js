module wd {
    export abstract class ThreeDUI extends Component{
        @virtual
        public update(elapsed:number){
        }

        @require(function(entityObject:GameObject){
            expect(entityObject).instanceOf(GameObject);
        })
        public addToObject(entityObject:GameObject, isShareComponent:boolean = false){
            var engine:ThreeDUIComponentContainer = ThreeDUIComponentContainer.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromEngine(){
            ThreeDUIComponentContainer.getInstance().removeChild(this);
        }
    }
}

