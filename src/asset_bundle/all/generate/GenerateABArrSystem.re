/* open DependencyDataType; */

let generate = (dependencyRelation, (sabDataArr, rabDataArr), state) => {
    FindDependencyDataSystem.checkCircleDependency(dependencyRelation) ? 
    WonderLog.Log.fatal(WonderLog.Log.buildFatalMessage(~title="GenerateABArrSystem->generate", ~description={j|dependencyRelation shouldn't be circle|j}, ~reason="", ~solution={j||j}, ~params={j||j})) : {



    }



};