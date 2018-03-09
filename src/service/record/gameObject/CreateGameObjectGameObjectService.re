open GameObjectType;

let create = ({uid, aliveUidArray} as record) => {
  record.uid = UidService.increase(uid);
  aliveUidArray |> Js.Array.push(uid) |> ignore;
  (record, uid)
};