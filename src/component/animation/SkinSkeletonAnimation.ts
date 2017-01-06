module wd{
    export class SkinSkeletonAnimation extends MultiLayerKeyFrameAnimation{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _jointMatrices:Float32Array = null;
        get jointMatrices(){
            return this._jointMatrices;
        }

        get maxJoints(){
            return this.jointNames.length;
        }

        @cloneAttributeAsCloneable()
        public bindShapeMatrix:Matrix4 = null;
        @cloneAttributeAsCustomType(function(source:SkinSkeletonAnimation, target:SkinSkeletonAnimation, memberName:string){
            if(source[memberName] === null){
                return;
            }

            target[memberName] = source[memberName].clone(true);
        })
        public boneMatrixMap:wdCb.Hash<BoneMatrix> = null;
        //todo if jointNames change, re-create!(and should change controller order)
        @cloneAttributeAsCustomType(function(source:SkinSkeletonAnimation, target:SkinSkeletonAnimation, memberName:string){
            if(source[memberName] === null){
                return;
            }

            target[memberName] = CloneUtils.cloneArray(source[memberName]);
        })
        public jointNames:Array<string> = null;
        @cloneAttributeAsCustomType(function(source:SkinSkeletonAnimation, target:SkinSkeletonAnimation, memberName:string){
            if(source[memberName] === null){
                return;
            }

            let arr:Array<Matrix4> = [];

            for(let mat of source[memberName]){
                arr.push(mat.clone());
            }

            target[memberName] = arr;
        })
        public inverseBindMatrices:Array<Matrix4> = null;
        @cloneAttributeAsCloneable()
        public jointTransformData:SkinSkeletonAnimationData = null;

        private _jointOrderMap:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _afterSceneGraphBuildSubcription:wdFrp.IDisposable = null;
        @cloneAttributeAsCloneable()
        private _inverseNodeToRootMatrix:Matrix4 = null;




        //todo refactor
        private _timeLimit:number = 5000;
        get timeLimit(){
            return this._timeLimit;
        }
        set timeLimit(timeLimit:number){
            var self = this;

            if(!!this.controllerList){
                this.controllerList.forEach((controller:JointKeyFrameController) =>
                {
                    controller.timeLimit = timeLimit;
                });
            }
        }





        public initWhenCreate(){
            this._bindPreComputeEvent();
        }

        public init(){
            super.init();

            this._initJointMatrices();
        }

        public dispose(){
            this._afterSceneGraphBuildSubcription && this._afterSceneGraphBuildSubcription.dispose();
        }

        public play(animName:string);
        public play(animIndex:number);

        public play(...args){
            var self = this;

            this.controllerList.forEach((controller:JointKeyFrameController) => {
                controller.resetAnim();
            });

            if(JudgeUtils.isNumber(args[0])){
                let animIndex:number = args[0],
                    i = 0;

                this.jointTransformData.forEach((jointMap:wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>, animName:string) => {
                    if(animIndex === i){
                        jointMap.forEach((jointData:wdCb.Collection<KeyFrameAnimationFrameData>, jointName:string) => {
                            let controller = self.controllerList.getChild(self._jointOrderMap.getChild(jointName));

                            controller.setCurrentAnimData(animName, jointData);
                        });

                        return wdCb.$BREAK;
                    }

                    i++;
                });
            }
            else if(JudgeUtils.isString(args[0])){
                let animName:string = args[0];

                this.jointTransformData.getChild(animName).forEach((jointData:wdCb.Collection<KeyFrameAnimationFrameData>, jointName:string) => {
                    let controller = self.controllerList.getChild(self._jointOrderMap.getChild(jointName));

                    controller.setCurrentAnimData(animName, jointData);
                });
            }

            this.pauseDuration = 0;

            this.controllerList.forEach((controller:JointKeyFrameController) => {
                if(!controller.hasCurrentAnimData()){
                    return;
                }

                controller.isPlayed = true;

                controller.updateCurrentFrameData();
                controller.saveZeroTimeFrameData();
                controller.setFrameCount();
            });

            this.state = EAnimationState.RUN;
        }

        @require(function(){
            it("all joint of jointNames should be used in jointTransformData", () => {
                var jointNamesUsedInJointTransformData = wdCb.Collection.create<string>(),
                    isFailed = false;

                this.jointTransformData.forEach((animationData:wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>) => {
                    animationData.forEach((data:wdCb.Collection<KeyFrameAnimationFrameData>, jointName:string) => {
                        jointNamesUsedInJointTransformData.addChild(jointName);
                    });
                });

                jointNamesUsedInJointTransformData = jointNamesUsedInJointTransformData.removeRepeatItems();

                if(jointNamesUsedInJointTransformData.getCount() !== this.jointNames.length){
                    Log.warn("fail");

                    return;
                }

                for(let name of this.jointNames){
                    if(!jointNamesUsedInJointTransformData.hasChild(name)){
                        Log.warn("fail");
                    }
                }
            }, this);
        })
        protected createControllerMap(){
            var jointNames = this.jointNames;

            for(let i = 0, len = jointNames.length; i < len; i++){
                let jointName = jointNames[i],
                    controller = JointKeyFrameController.create();

                controller.jointName = jointName;

                this.controllerList.addChild(controller);
                this._jointOrderMap.addChild(jointName, i);
            }
        }

        protected handleWhenPause(elapsed:number):void{
        }

        protected handleWhenCurrentFrameFinish(controller:JointKeyFrameController, elapsed:number):void{
            controller.updateFrame(elapsed, this.pauseDuration);

            controller.savePrevFrameData();
        }

        protected handleBeforeJudgeWhetherCurrentFrameFinish(controller:JointKeyFrameController, elapsed:number):void{
            controller.setBeginElapsedTimeOfFirstFrame(this.getCurrentTime());
        }

        protected isCurrentFrameFinish(controller:JointKeyFrameController, elapsed:number):boolean{
            return controller.isCurrentFrameFinish(elapsed, this.pauseDuration);
        }

        protected handleAfterJudgeWhetherCurrentFrameFinish(controller:JointKeyFrameController, elapsed:number):void{
            controller.updateTargets(elapsed, this.pauseDuration);

            this.boneMatrixMap.getChild(controller.jointName).updateLocalMatrix(controller.currentUpdatedTransformMatrix);
        }

        protected handleAfterJudgeWhetherAllCurrentFrameFinish(elapsed:number){
            var len = 0,
                inverseNodeToRootMatrix = this._inverseNodeToRootMatrix,
                bindShapeMatrix = this.bindShapeMatrix,
                inverseBindMatrices = this.inverseBindMatrices,
                boneMatrixMap = this.boneMatrixMap,
                jointMatrices = this.jointMatrices;


            //todo optimize:reduce matrix mul count
            for(let jointName of this.jointNames){
                let index = this._jointOrderMap.getChild(jointName),
                    mat:Matrix4 = null;

                if(bindShapeMatrix !== null){
                    mat = bindShapeMatrix.applyMatrix(inverseBindMatrices[index], true);
                }
                else{
                    mat = inverseBindMatrices[index].clone();
                }

                //todo fix yuanbao!
                if(jointName === "Object_91_pasted__joint12") {
                    mat = Matrix4.create().translate(28,-3,-65);
                    mat.scale(0.5,0.5,0.5)
                }



                // if(jointName === "Object_91_pasted__joint12") {
                //     var a = 1;
                //     mat = Matrix4.create()
                //         .applyMatrix(inverseNodeToRootMatrix)
                //         .cloneToArray(jointMatrices, len);
                // }
                // else{
                mat.applyMatrix(boneMatrixMap.getChild(jointName).globalMatrix)
                    .applyMatrix(inverseNodeToRootMatrix)
                    .cloneToArray(jointMatrices, len);
                // }


                len += 16;
            }
        }

        private _initJointMatrices(){
            var identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                jointMatrices = [];

            for(let i = 0; i < this.maxJoints; i++){
                jointMatrices = jointMatrices.concat(identity);
            }

            this._jointMatrices = new Float32Array(jointMatrices);
        }

        private _bindPreComputeEvent(){
            var self = this;

            this._afterSceneGraphBuildSubcription = EventManager.fromEvent(<any>EEngineEvent.AFTER_SCENEGRAPH_BUILD)
                .subscribe(() => {
                    self._inverseNodeToRootMatrix = self.entityObject.transform.localToWorldMatrix.clone().invert();
                });
        }
    }
}
