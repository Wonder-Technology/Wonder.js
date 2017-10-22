open StateDataType;

open Contract;

let unsafeGetChildren (index: string) (transformData: transformData) =>
  HashMapSystem.unsafeGet transformData.childMap index
  |> ensureCheck (
       fun r =>
         test
           "children should exist"
           (fun () => HashMapSystem.get transformData.childMap index |> assertExist)
     );