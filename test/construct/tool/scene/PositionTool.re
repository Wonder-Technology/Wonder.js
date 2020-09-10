let create = pos => pos->PositionVO.create;

let value = pos => pos->PositionVO.value;

let add = (pos1, pos2) =>
  Vector3.add(Vector3.Float, value(pos1), value(pos2))->create;
