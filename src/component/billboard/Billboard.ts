module wd{
    export class Billboard extends Component{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public entityObject:GameObject;

        public mode:EBillboardMode = EBillboardMode.ALL;

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:BillboardEngine = BillboardEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromObject(entityObject:EntityObject){
            super.removeFromObject(entityObject);

            BillboardEngine.getInstance().removeChild(this);
        }

        public update(elapsed:number){
            var camera = Director.getInstance().scene.currentCamera;

            if (this.mode !== EBillboardMode.NONE && camera) {
                let objToCamProj = Vector3.create(),
                    lookAt = Vector3.create(),
                    //todo optimize:use global Temp class to reduce memory
                    upAux = Vector3.create(),
                    angleCosine = null,
                    objTransform = this.entityObject.transform,
                    objPos = objTransform.position,
                    cameraPos = camera.transform.position;

                // objToCamProj is the vector in world coordinates from the
// local origin to the camera projected in the XZ plane
                objToCamProj.x = cameraPos.x - objPos.x ;
                objToCamProj.y = 0;
                objToCamProj.z = cameraPos.z - objPos.z ;

// This is the original lookAt vector for the object
// in world coordinates
                lookAt.x = 0;
                lookAt.y = 0;
                lookAt.z = 1;


// normalize both vectors to get the cosine directly afterwards
                objToCamProj.normalize();

// easy fix to determine wether the angle is negative or positive
// for positive angles upAux will be a vector pointing in the
// positive y direction, otherwise upAux will point downwards
// effectively reversing the rotation.

                upAux.cross(lookAt, objToCamProj);

// compute the angle
                angleCosine = lookAt.calAngleCos(objToCamProj);

// perform the rotation. The if statement is used for stability reasons
// if the lookAt and objToCamProj vectors are too close together then
// |angleCosine| could be bigger than 1 due to lack of precision
                if ((angleCosine < 0.99990) && (angleCosine > -0.9999))
                    //objTransform.rotate(Math.acos(angleCosine) * 180 / Math.PI, upAux[0], upAux[1], upAux[2]);
                //objTransform.rotate(0, Math.acos(angleCosine) * 180 / Math.PI, 0);
                //todo optimize:use global Temp class to reduce memory
                //objTransform.eulerAngles = Vector3.create(0, Math.acos(angleCosine) * 180 / Math.PI, 0);
                objTransform.rotation = Quaternion.create().setFromAxisAngle(Math.acos(angleCosine) * 180 / Math.PI, upAux);
                    //Vector3.create(0, Math.acos(angleCosine) * 180 / Math.PI, 0);
            }
        }
    }
}

