open WDDType;

let assembleWDBData = wdd => {
  BatchCreateDoService.batchCreate(wdd)
  ->Result.bind(BatchOperateDoService.batchOperate(wdd))
  ->Result.bind(BuildRootGameObjectDoService.build(wdd));
};
