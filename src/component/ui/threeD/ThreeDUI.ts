module wd {
    export abstract class ThreeDUI extends Component{
        @virtual
        public update(elapsed:number){
        }

        @require(function(){
            it("ThreeDUI component should add to GameObject", () => {
                expect(this.entityObject).instanceOf(GameObject);
            }, this);
        })
        public addToComponentContainer(){
            var container:ThreeDUIComponentContainer = ThreeDUIComponentContainer.getInstance();

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            ThreeDUIComponentContainer.getInstance().removeChild(this);
        }
    }
}

