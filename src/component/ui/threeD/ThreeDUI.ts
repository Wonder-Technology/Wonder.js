module wd {
    export abstract class ThreeDUI extends Component{
        @virtual
        public update(elapsed:number){
        }

        @require(function(entityObject:GameObject){
            expect(entityObject).instanceOf(GameObject);
        })
        public addToObject(entityObject:GameObject, isShareComponent:boolean = false){
            var container:ThreeDUIComponentContainer = ThreeDUIComponentContainer.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            ThreeDUIComponentContainer.getInstance().removeChild(this);
        }
    }
}

