


function create(param) {
  return /* record */[
          /* setting */param[0],
          /* mainInitPipelines */param[1],
          /* mainLoopPipelines */param[2],
          /* workerPipelines */param[5],
          /* mainInitJobs */param[3],
          /* mainLoopJobs */param[4],
          /* workerJobs */param[6]
        ];
}

export {
  create ,
  
}
/* No side effect */
