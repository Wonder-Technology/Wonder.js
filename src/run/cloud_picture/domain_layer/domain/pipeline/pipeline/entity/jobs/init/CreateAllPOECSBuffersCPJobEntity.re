let create = () => JobEntity.create("create_all_po_ecs_buffers");

let _createAndSetAllECSPOs = () => {
  CreatePOTransformCPRepo.createPO()
  ->Result.mapSuccess(transformPO => {transformPO->CPRepo.setTransform});
};

let exec = () => {
  _createAndSetAllECSPOs()->WonderBsMost.Most.just;
};
