open GameObjectType;

let isDisposed = (uid, disposedUidMap) => disposedUidMap |> HashMapSystem.has(uid);
/* switch (disposedUidMap |> WonderCommonlib.HashMapSystem.get(uid)) {
   | None => false
   | Some(_) => true
   }; */