module ParsePipelineData = {
  // TODO use Result instead of throw err

  open WonderEngineCoreType.PipelineType

  let _getStates = () => {
    POContainer.unsafeGetPO().states
  }

  let _setStates = (states): unit => {
    {
      ...POContainer.unsafeGetPO(),
      states: states,
    }->POContainer.setPO
  }

  let _findGroup = (groupName, groups) => {
    groups
    ->WonderCommonlib.ArraySt.filter(({name}: group) => name === groupName)
    ->WonderCommonlib.ArraySt.length > 1
      ? {
          WonderCommonlib.Exception.throwErr(
            WonderCommonlib.Exception.buildErr(j`groupName:$groupName has more than one in groups`),
          )
        }
      : {
          ()
        }

    switch groups
    ->WonderCommonlib.ListSt.fromArray
    ->WonderCommonlib.ListSt.getBy(({name}: group) => name === groupName) {
    | None =>
      WonderCommonlib.Exception.throwErr(
        WonderCommonlib.Exception.buildErr(j`groupName:$groupName not in groups`),
      )
    | Some(group) => group
    }
  }

  let _buildJobStream = (execFunc): WonderBsMost.Most.stream<unit> => {
    open WonderBsMost.Most
    execFunc->just->flatMap(func => func(_getStates()), _)->map(_setStates, _)
  }

  let rec _getExecFunc = (
    getExecFuncs: WorkManagerType.getExecFuncs,
    pipelineName,
    jobName,
  ): WorkManagerType.execFunc => {
    getExecFuncs->WonderCommonlib.ListSt.length === 0
      ? WonderCommonlib.Exception.throwErr(
          WonderCommonlib.Exception.buildErr(
            WonderCommonlib.Log.buildFatalMessage(
              ~title="_getExecFunc",
              ~description=j`can't get execFunc with pipelineName:${pipelineName}, jobName:${jobName}`,
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
        )
      : {
          let list{headGetExecFunc, ...remainGetExecFuncs} = getExecFuncs

          let result = headGetExecFunc(pipelineName, jobName)

          result->Js.Nullable.isNullable
            ? _getExecFunc(remainGetExecFuncs, pipelineName, jobName)
            : result->WonderCommonlib.OptionSt.fromNullable->WonderCommonlib.OptionSt.getExn
        }
  }

  let _buildJobStreams = (
    (buildPipelineStreamFunc, getExecFuncs),
    (pipelineName, elements),
    groups,
  ) =>
    elements
    ->WonderCommonlib.ListSt.fromArray
    ->WonderCommonlib.ListSt.reduce(list{}, (streams, {name, type_}: element) =>
      switch type_ {
      | #job =>
        let execFunc = _getExecFunc(getExecFuncs, pipelineName, name)

        streams->WonderCommonlib.ListSt.push(_buildJobStream(execFunc))
      | #group =>
        let group = _findGroup(name, groups)
        let stream = buildPipelineStreamFunc(getExecFuncs, pipelineName, group, groups)
        streams->WonderCommonlib.ListSt.push(stream)
      }
    )

  let rec _buildPipelineStream = (getExecFuncs, pipelineName, {name, link, elements}, groups) => {
    let streams = _buildJobStreams(
      (_buildPipelineStream, getExecFuncs),
      (pipelineName, elements),
      groups,
    )

    streams
    ->WonderCommonlib.ListSt.toArray
    ->switch link {
    | #merge => WonderBsMost.Most.mergeArray
    | #concat => WonderCommonlib.MostUtils.concatArray
    }
  }

  let parse = (po, getExecFuncs, {name, groups, first_group}): WonderBsMost.Most.stream<
    POType.po,
  > => {
    let group = _findGroup(first_group, groups)

    po->POContainer.setPO

    _buildPipelineStream(getExecFuncs, name, group, groups)->WonderBsMost.Most.map(
      () => POContainer.unsafeGetPO(),
      _,
    )
  }
}

let registerPlugin = (
  {allRegisteredWorkPluginData} as po: POType.po,
  data: WorkManagerType.registeredWorkPlugin,
  jobOrders: RegisterWorkPluginType.jobOrders,
): POType.po => {
  {
    ...po,
    allRegisteredWorkPluginData: allRegisteredWorkPluginData->WonderCommonlib.ListSt.push((
      data,
      jobOrders,
    )),
  }
}

let unregisterPlugin = (
  {allRegisteredWorkPluginData} as po: POType.po,
  targetPluginName: string,
): POType.po => {
  ...po,
  allRegisteredWorkPluginData: allRegisteredWorkPluginData->WonderCommonlib.ListSt.filter(((
    {pluginName},
    _,
  )) => {
    pluginName !== targetPluginName
  }),
}

let init = ({allRegisteredWorkPluginData} as po: POType.po): POType.po => {
  allRegisteredWorkPluginData->WonderCommonlib.ListSt.reduce(
    {
      ...po,
      states: allRegisteredWorkPluginData->WonderCommonlib.ListSt.reduce(
        WonderCommonlib.ImmutableHashMap.createEmpty(),
        (states, ({pluginName, initFunc, createStateFunc}, _)) => {
          states->WonderCommonlib.ImmutableHashMap.set(pluginName, createStateFunc())
        },
      ),
    },
    ({states} as po, ({pluginName, initFunc}, _)) => {
      po->POContainer.setPO

      initFunc(
        states
        ->WonderCommonlib.ImmutableHashMap.get(pluginName)
        ->WonderCommonlib.OptionSt.unsafeGet,
      )

      POContainer.unsafeGetPO()
    },
  )
}

module MergePipelineData = {
  let _findInsertPluginName = (
    insertElementName,
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
  ): WonderCommonlib.Result.t2<WonderEngineCoreType.IWorkForJs.pluginName> => {
    allRegisteredWorkPluginData
    ->WonderCommonlib.ListSt.find((({pluginName, allPipelineData}, _)) => {
      let {groups} = allPipelineData[0]

      groups->WonderCommonlib.ArraySt.includesByFunc(({elements}) => {
        elements->WonderCommonlib.ArraySt.includesByFunc(({name}) => {
          name === insertElementName
        })
      })
    })
    ->WonderCommonlib.OptionSt.map((({pluginName}, _)) => pluginName)
    ->WonderCommonlib.OptionSt.get
  }

  let _check = (
    ({allPipelineData}, jobOrders) as registeredWorkPluginData: POType.registeredWorkPluginData,
  ) => {
    allPipelineData->WonderCommonlib.ArraySt.length <= 1 &&
      jobOrders->WonderCommonlib.ArraySt.length <= 1
      ? registeredWorkPluginData->WonderCommonlib.Result.succeed
      : WonderCommonlib.Result.failWith(
          WonderCommonlib.Log.buildErrorMessage(
            ~title="allPipelineData or jobOrders should has the same pipeline <= 1",
            ~description="",
            ~reason="",
            ~solution="",
            ~params="",
          ),
        )
  }

  let _findAllSpecificPipelineRelatedData = (
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
    targetPipelineName: WonderEngineCoreType.PipelineType.pipelineName,
  ): WonderCommonlib.Result.t2<list<WorkManagerType.specificPipelineRelatedData>> => {
    allRegisteredWorkPluginData
    ->WonderCommonlib.ListSt.traverseResultM(((
      {allPipelineData} as registeredWorkPlugin,
      jobOrders,
    )) => {
      (
        {
          ...registeredWorkPlugin,
          allPipelineData: allPipelineData->WonderCommonlib.ArraySt.filter(({name}) => {
            name === targetPipelineName
          }),
        },
        jobOrders->WonderCommonlib.ArraySt.filter(({pipelineName}) => {
          pipelineName === targetPipelineName
        }),
      )->_check
    })
    ->WonderCommonlib.Result.mapSuccess(allRegisteredWorkPluginData => {
      allRegisteredWorkPluginData->WonderCommonlib.ListSt.filter(((
        {allPipelineData} as registeredWorkPluginData,
        _,
      )) => {
        allPipelineData->WonderCommonlib.ArraySt.length === 1
      })
    })
    ->WonderCommonlib.Result.bind(allRegisteredWorkPluginData => {
      allRegisteredWorkPluginData
      ->WonderCommonlib.ListSt.map(((
        {pluginName, getExecFunc, allPipelineData} as registeredWorkPluginData,
        jobOrders,
      )) => {
        (
          pluginName,
          getExecFunc,
          allPipelineData[0],
          jobOrders->WonderCommonlib.ArraySt.getFirst,
        )
      })
      ->WonderCommonlib.ListSt.traverseResultM(((
        pluginName,
        getExecFunc,
        pipelineData,
        jobOrderOpt,
      )) => {
        jobOrderOpt
        ->WonderCommonlib.OptionSt.map(({insertElementName, insertAction}) => {
          _findInsertPluginName(
            insertElementName,
            allRegisteredWorkPluginData,
          )->WonderCommonlib.Result.mapSuccess((insertPluginName): WorkManagerType.jobOrder => {
            {
              insertPluginName: insertPluginName,
              insertElementName: insertElementName,
              insertAction: insertAction,
            }
          })
        })
        ->WonderCommonlib.OptionSt.sequenceResultM
        ->WonderCommonlib.Result.mapSuccess((
          jobOrderOpt
        ): WorkManagerType.specificPipelineRelatedData => {
          {
            pluginName: pluginName,
            getExecFunc: getExecFunc,
            pipelineData: pipelineData,
            jobOrder: jobOrderOpt,
          }
        })
      })
    })
  }

  let _handleInsertedAsRootNode = (
    treeDataList,
    (pluginName, getExecFunc, pipelineData, nodeJobOrderOpt, nodeInsertPluginNameOpt),
  ) => {
    treeDataList->WonderCommonlib.ListSt.reduce((list{}, None), (
      (newTreeDataList, insertedTreeOpt),
      (sameLevelTreeList, insertPluginNameOpt) as treeData,
    ) => {
      switch insertPluginNameOpt {
      | Some(insertPluginName) if insertPluginName === pluginName =>
        let insertedTree = TreeNode.buildNode(
          pluginName,
          (getExecFunc, pipelineData, nodeJobOrderOpt),
          sameLevelTreeList,
        )

        (
          newTreeDataList->WonderCommonlib.ListSt.addInReduce((
            list{insertedTree},
            nodeInsertPluginNameOpt,
          )),
          Some(insertedTree),
        )
      | _ => (newTreeDataList->WonderCommonlib.ListSt.addInReduce(treeData), insertedTreeOpt)
      }
    })
  }

  let _isInserted = WonderCommonlib.OptionSt.isSome

  let _add = (
    treeDataList: WorkManagerType.treeDataList,
    node,
    insertPluginNameOpt,
  ): WorkManagerType.treeDataList => {
    list{(list{node}, insertPluginNameOpt), ...treeDataList}
  }

  let _insertToAsChildNodeOrSameLevelTree = (
    treeDataList: WorkManagerType.treeDataList,
    nodeInsertPluginName,
    node: TreeType.tree,
  ): (WorkManagerType.treeDataList, bool) => {
    treeDataList->WonderCommonlib.ListSt.reduce((list{}, false), (
      (newTreeDataList, isInsertTo),
      (sameLevelTreeList, insertPluginNameOpt),
    ) => {
      switch insertPluginNameOpt {
      | Some(insertPluginName) if insertPluginName === nodeInsertPluginName => (
          newTreeDataList->WonderCommonlib.ListSt.addInReduce((
            sameLevelTreeList->WonderCommonlib.ListSt.push(node),
            insertPluginNameOpt,
          )),
          true,
        )
      | _ =>
        let (sameLevelTreeList, isInsertTo) = sameLevelTreeList->WonderCommonlib.ListSt.reduce(
          (list{}, false),
          ((sameLevelTreeList, isInsertTo), tree) => {
            let (tree, isInsertTo) = tree->OperateTree.insertNode(nodeInsertPluginName, node)

            (sameLevelTreeList->WonderCommonlib.ListSt.addInReduce(tree), isInsertTo)
          },
        )

        (
          newTreeDataList->WonderCommonlib.ListSt.addInReduce((
            sameLevelTreeList,
            insertPluginNameOpt,
          )),
          isInsertTo,
        )
      }
    })
  }

  let _removeInsertedTree = (
    treeDataList: WorkManagerType.treeDataList,
    insertedTree,
  ): WorkManagerType.treeDataList => {
    treeDataList
    ->WonderCommonlib.ListSt.map(((sameLevelTreeList, insertPluginNameOpt)) => {
      (
        sameLevelTreeList->WonderCommonlib.ListSt.filter(sameLevelTree =>
          !TreeNode.isEqual(sameLevelTree, insertedTree)
        ),
        insertPluginNameOpt,
      )
    })
    ->WonderCommonlib.ListSt.filter(((sameLevelTreeList, insertPluginNameOpt)) => {
      sameLevelTreeList->WonderCommonlib.ListSt.length > 0
    })
  }

  let _getTree = treeDataList => {
    treeDataList->WonderCommonlib.ListSt.length !== 1
      ? {
          WonderCommonlib.Result.failWith(
            WonderCommonlib.Log.buildErrorMessage(
              ~title="treeDataList.length should be 1",
              ~description="",
              ~reason={
                ""
              },
              ~solution="",
              ~params="",
            ),
          )
        }
      : {
          treeDataList
          ->WonderCommonlib.ListSt.head
          ->WonderCommonlib.OptionSt.get
          ->WonderCommonlib.Result.bind(((sameLevelTreeList, _)) => {
            sameLevelTreeList->WonderCommonlib.ListSt.length !== 1
              ? {
                  WonderCommonlib.Result.failWith(
                    WonderCommonlib.Log.buildErrorMessage(
                      ~title="sameLevelTreeList.length should be 1",
                      ~description="",
                      ~reason={
                        ""
                      },
                      ~solution="",
                      ~params="",
                    ),
                  )
                }
              : {
                  sameLevelTreeList
                  ->WonderCommonlib.ListSt.head
                  ->WonderCommonlib.OptionSt.get
                }
          })
        }
  }

  let _buildTree = (
    allSpecificPipelineRelatedData: list<WorkManagerType.specificPipelineRelatedData>,
  ): WonderCommonlib.Result.t2<TreeType.tree> => {
    allSpecificPipelineRelatedData
    ->WonderCommonlib.ListSt.reduce(list{}, (
      treeDataList,
      {pluginName, getExecFunc, pipelineData, jobOrder},
    ) => {
      switch jobOrder {
      | None =>
        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pluginName,
            getExecFunc,
            pipelineData,
            None,
            None,
          ))

        _isInserted(insertedTreeOpt)
          ? treeDataList
          : treeDataList->_add(
              TreeNode.buildNode(pluginName, (getExecFunc, pipelineData, None), list{}),
              None,
            )
      | Some({insertPluginName, insertElementName, insertAction}) =>
        let nodeJobOrderOpt =
          (
            {insertElementName: insertElementName, insertAction: insertAction}: TreeType.jobOrder
          )->Some

        let (treeDataList, insertedTreeOpt) =
          treeDataList->_handleInsertedAsRootNode((
            pluginName,
            getExecFunc,
            pipelineData,
            nodeJobOrderOpt,
            insertPluginName->Some,
          ))

        switch insertedTreeOpt {
        | Some(insertedTree) =>
          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPluginName, insertedTree)

          isInsertTo ? treeDataList->_removeInsertedTree(insertedTree) : treeDataList
        | None =>
          let node = TreeNode.buildNode(
            pluginName,
            (getExecFunc, pipelineData, nodeJobOrderOpt),
            list{},
          )

          let (treeDataList, isInsertTo) =
            treeDataList->_insertToAsChildNodeOrSameLevelTree(insertPluginName, node)

          isInsertTo ? treeDataList : treeDataList->_add(node, Some(insertPluginName))
        }
      }
    })
    ->_getTree
  }

  let _buildFirstGroupElement = (
    groups: WonderEngineCoreType.PipelineType.groups,
    first_group,
  ): WonderCommonlib.Result.t2<WonderEngineCoreType.PipelineType.element> => {
    groups
    ->WonderCommonlib.ArraySt.find(({name}) => {
      name === first_group
    })
    ->WonderCommonlib.OptionSt.map(({name}): WonderEngineCoreType.PipelineType.element => {
      name: name,
      type_: #group,
    })
    ->WonderCommonlib.OptionSt.get
  }

  let _insertElement = (
    groups: WonderEngineCoreType.PipelineType.groups,
    insertAction,
    insertElementName,
    insertElement: WonderEngineCoreType.PipelineType.element,
  ) => {
    groups->WonderCommonlib.ArraySt.map(({name, elements} as group) => {
      {
        ...group,
        elements: elements->WonderCommonlib.ArraySt.reduceOneParam(
          (. result, {name} as element) => {
            name === insertElementName
              ? {
                  switch insertAction {
                  | RegisterWorkPluginType.Before =>
                    result
                    ->WonderCommonlib.ArraySt.push(insertElement)
                    ->WonderCommonlib.ArraySt.push(element)
                  | RegisterWorkPluginType.After =>
                    result
                    ->WonderCommonlib.ArraySt.push(element)
                    ->WonderCommonlib.ArraySt.push(insertElement)
                  }
                }
              : result->WonderCommonlib.ArraySt.push(element)
          },
          [],
        ),
      }
    })
  }

  let _mergeGroups = (
    groups: WonderEngineCoreType.PipelineType.groups,
    insertGroups: WonderEngineCoreType.PipelineType.groups,
  ): WonderEngineCoreType.PipelineType.groups => {
    Js.Array.concat(groups, insertGroups)
  }

  let _mergeGetExecFuncs = (getExecFuncs: WorkManagerType.getExecFuncs, insertGetExecFuncs) => {
    WonderCommonlib.ListSt.concat(getExecFuncs, insertGetExecFuncs)
  }

  let _mergeToRootNode = (tree: TreeType.tree): WonderCommonlib.Result.t2<(
    list<WonderEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
    WonderEngineCoreType.PipelineType.pipelineData,
  )> => {
    IterateTree.postOrderCataWithParentNode(
      ~tree,
      ~nodeFunc=(
        parentNodeOpt,
        pluginName,
        {getExecFuncs, pipelineData, jobOrder} as nodeData,
        children,
      ) => {
        let node = TreeNode.buildNodeByNodeData(pluginName, nodeData, children)

        switch parentNodeOpt {
        | None => node->WonderCommonlib.Result.succeed
        | Some(parentNode) =>
          let parentNodeData = TreeNode.getNodeData(parentNode)

          jobOrder
          ->WonderCommonlib.OptionSt.get
          ->WonderCommonlib.Result.bind(({insertElementName, insertAction}) => {
            _buildFirstGroupElement(
              pipelineData.groups,
              pipelineData.first_group,
            )->WonderCommonlib.Result.mapSuccess(insertElement => {
              parentNodeData.pipelineData = {
                ...parentNodeData.pipelineData,
                groups: parentNodeData.pipelineData.groups
                ->_insertElement(insertAction, insertElementName, insertElement)
                ->_mergeGroups(pipelineData.groups),
              }
              parentNodeData.getExecFuncs = _mergeGetExecFuncs(
                parentNodeData.getExecFuncs,
                getExecFuncs,
              )

              node
            })
          })
        }
      },
      (),
    )->WonderCommonlib.Result.mapSuccess(tree => {
      let {getExecFuncs, pipelineData} = TreeNode.getNodeData(tree)

      (getExecFuncs, pipelineData)
    })
  }

  let merge = (
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
    pipelineName: WonderEngineCoreType.PipelineType.pipelineName,
  ): WonderCommonlib.Result.t2<(
    list<WonderEngineCoreType.IWorkForJs.getExecFunc<RegisterWorkPluginType.states>>,
    WonderEngineCoreType.PipelineType.pipelineData,
  )> => {
    allRegisteredWorkPluginData
    ->_findAllSpecificPipelineRelatedData(pipelineName)
    ->WonderCommonlib.Result.bind(_buildTree)
    ->WonderCommonlib.Result.bind(_mergeToRootNode)
  }
}

let runPipeline = (
  {allRegisteredWorkPluginData, states} as po: POType.po,
  pipelineName: WonderEngineCoreType.PipelineType.pipelineName,
): WonderCommonlib.Result.t2<WonderBsMost.Most.stream<POType.po>> => {
  // TODO check is allRegisteredWorkPluginData duplicate

  allRegisteredWorkPluginData
  ->MergePipelineData.merge(pipelineName)
  ->WonderCommonlib.Result.mapSuccess(((getExecFuncs, pipelineData)) => {
    ParsePipelineData.parse(po, getExecFuncs, pipelineData)
  })
}
