open WonderBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/plugin.feature")

defineFeature(feature, test => {
  let data1 = ref(Obj.magic(1))
  let data2 = ref(Obj.magic(1))
  let data3 = ref(Obj.magic(1))
  let usedData = ref(Obj.magic(1))

  let _prepareRegister = given => {
    given("prepare register", () => {
      CreatePO.createPO()->POContainer.setPO
    })
  }

  let _buildRegisteredWorkPluginData = (
    ~pluginName="pluginA",
    ~createStateFunc=() => Obj.magic(1),
    ~initFunc=po => (),
    ~getExecFunc=(_, _) => Js.Nullable.null,
    ~allPipelineData=[],
    (),
  ): WorkManagerType.registeredWorkPlugin => {
    pluginName: pluginName,
    createStateFunc: createStateFunc,
    initFunc: initFunc,
    getExecFunc: getExecFunc,
    allPipelineData: allPipelineData,
  }

  let _buildJobOrder = (
    ~insertElementName,
    ~pipelineName="pipeline",
    ~insertAction=#after,
    (),
  ): RegisterWorkPluginVOType.jobOrder => {
    pipelineName: pipelineName,
    insertElementName: insertElementName,
    insertAction: insertAction,
  }

  let _convertAllRegisteredWorkPluginData = (
    allRegisteredWorkPluginData: WorkManagerType.allRegisteredWorkPluginData,
  ) => {
    allRegisteredWorkPluginData->WonderCommonlib.ListSt.map(((
      registeredWorkPlugin,
      jobOrders,
    )) => {
      (registeredWorkPlugin, jobOrders->VOTool.convertJobOrdersDOToVO)
    })
  }

  let _getAllRegisteredWorkPluginData = () => {
    POContainer.unsafeGetPO().allRegisteredWorkPluginData->_convertAllRegisteredWorkPluginData
  }

  let _getStates = () => {
    POContainer.unsafeGetPO().states
  }

  let _createState1 = (~d1=0, ()) => {
    {
      "d1": d1,
    }->Obj.magic
  }

  let _createState2 = (~d2="aaa", ~dd2=1, ()) => {
    {
      "d2": d2,
      "dd2": dd2,
    }->Obj.magic
  }

  test(."open debug", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("open debug", () => {
      Main.setIsDebug(true)
    })

    then("get is debug should return true", () => {
      Main.getIsDebug()->expect == true
    })
  })

  test(."register one plugin", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin data", () => {
      data1 := _buildRegisteredWorkPluginData()

      Main.registerWorkPlugin(~data=data1.contents, ())
    })

    then("should add plugin data", () => {
      _getAllRegisteredWorkPluginData()->expect == list{(data1.contents, [])}
    })
  })

  test(."register two plugins with jobOrders", ({given, \"when", \"and", then}) => {
    let jobOrders2 = ref(Obj.magic(1))

    _prepareRegister(given)

    \"when"("register plugin1 data", () => {
      data1 := _buildRegisteredWorkPluginData(~pluginName="a1", ())

      Main.registerWorkPlugin(~data=data1.contents, ())
    })

    \"and"("register plugin2 data with jobOrders2", () => {
      jobOrders2 := [_buildJobOrder(~insertElementName="", ())]
      data2 := _buildRegisteredWorkPluginData(~pluginName="a2", ())

      Main.registerWorkPlugin(~data=data2.contents, ~jobOrders=jobOrders2.contents, ())
    })

    then("should add plugin1 and plugin2 data", () => {
      _getAllRegisteredWorkPluginData()->expect ==
        list{(data1.contents, []), (data2.contents, jobOrders2.contents)}
    })
  })

  test(."register one plugin and unregister it", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin data", () => {
      data1 := _buildRegisteredWorkPluginData(~pluginName="a", ())

      Main.registerWorkPlugin(~data=data1.contents, ())
    })

    \"and"("unregister it", () => {
      Main.unregisterWorkPlugin("a")
    })

    then("should not has plugin data", () => {
      _getAllRegisteredWorkPluginData()->expect == list{}
    })
  })

  test(."register two plugins and unregister the first one", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    \"when"("register plugin1 data", () => {
      data1 := _buildRegisteredWorkPluginData(~pluginName="a1", ())

      Main.registerWorkPlugin(~data=data1.contents, ())
    })

    \"and"("register plugin2 data", () => {
      data2 := _buildRegisteredWorkPluginData(~pluginName="a2", ())

      Main.registerWorkPlugin(~data=data2.contents, ())
    })

    \"and"("unregister plugin1 data", () => {
      Main.unregisterWorkPlugin("a1")
    })

    then("should only has plugin2 data", () => {
      _getAllRegisteredWorkPluginData()->expect == list{(data2.contents, [])}
    })
  })

  test(."init plugins", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"when"("register plugin1 data", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      state1 := _createState1()
      data1 :=
        _buildRegisteredWorkPluginData(
          ~pluginName="a1",
          ~createStateFunc=() => state1.contents,
          ~initFunc=state1 => {
            stub1.contents(state1)
          },
          (),
        )

      Main.registerWorkPlugin(~data=data1.contents, ())
    })

    \"and"("register plugin2 data", () => {
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      state2 := _createState2()
      data2 :=
        _buildRegisteredWorkPluginData(
          ~pluginName="a2",
          ~createStateFunc=() => state2.contents,
          ~initFunc=state2 => {
            stub2.contents()
          },
          (),
        )

      Main.registerWorkPlugin(~data=data2.contents, ())
    })

    \"when"("init", () => {
      Main.init()
    })

    then("invoke plugin1's and plugin2's createStateFunc and store result", () => {
      let states = _getStates()
      (
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents))
    })

    \"and"("invoke plugin1's and plugin2's initFunc", () => {
      (
        stub1.contents->Obj.magic->getCallCount,
        stub1.contents->Obj.magic->SinonTool.calledWith(state1.contents),
        stub2.contents->Obj.magic->getCallCount,
      )->expect == (1, true, 1)
    })
  })

  let _prepareData1 = (
    ~changedState1=_createState1(~d1=10, ()),
    ~rootJob=states => {
      states
      ->WonderCommonlib.ImmutableHashMap.set("a1", changedState1)
      ->WonderBsMost.Most.just
    },
    ~state1=_createState1(),
    ~initFunc=state => (),
    (),
  ) => {
    let rootJobName = "root_a1"

    (
      rootJobName,
      _buildRegisteredWorkPluginData(
        ~pluginName="a1",
        ~createStateFunc=() => state1,
        ~initFunc,
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: rootJobName,
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | jobName if EqualTool.isEqual(jobName, rootJobName) => rootJob->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      ),
      changedState1,
    )
  }

  test(."test register one plugin", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin data", () => {
      let (_, data1, s1) = _prepareData1()

      state1 := s1

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      (_getStates()->WonderCommonlib.ImmutableHashMap.get("a1")->expect ==
        Some(state1.contents))
      ->resolve
      ->Obj.magic
    })
  })

  let _prepareData2 = () => {
    let job1Name_a2 = "job1_a2"
    let state2 = _createState2()
    let job1 = states => {
      states
      ->WonderCommonlib.ImmutableHashMap.set("a2", _createState2(~d2="c", ~dd2=100, ()))
      ->WonderBsMost.Most.just
    }
    let job2 = states => {
      states
      ->WonderCommonlib.ImmutableHashMap.set(
        "a2",
        _createState2(
          ~d2="d",
          ~dd2=states
          ->WonderCommonlib.ImmutableHashMap.get("a2")
          ->WonderCommonlib.OptionSt.getExn
          ->JsObjTool.getObjValue("dd2"),
          (),
        ),
      )
      ->WonderBsMost.Most.just
    }
    let data2 = _buildRegisteredWorkPluginData(
      ~pluginName="a2",
      ~createStateFunc=() => state2,
      ~allPipelineData=[
        {
          name: "init",
          groups: [
            {
              name: "first_a2",
              link: #concat,
              elements: [
                {
                  name: job1Name_a2,
                  type_: #job,
                },
                {
                  name: "job2_a2",
                  type_: #job,
                },
              ],
            },
          ],
          first_group: "first_a2",
        },
      ],
      ~getExecFunc=(_, jobName) => {
        switch jobName {
        | jobName if EqualTool.isEqual(jobName, job1Name_a2) => job1->Js.Nullable.return
        | "job2_a2" => job2->Js.Nullable.return
        | _ => Js.Nullable.null
        }
      },
      (),
    )

    (job1Name_a2, data2, _createState2(~d2="d", ~dd2=100, ()))
  }

  test(."test register two plugins that plugin has one job", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin1 data", () => {
      let (rootJobName, data1, s1) = _prepareData1()
      state1 := s1

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("register plugin2 data", () => {
      let (rootJobName, _, _) = _prepareData1()
      let s2 = _createState2()
      let changedState2 = _createState2(~d2="c", ())
      state2 := changedState2
      let job1 = states => {
        states
        ->WonderCommonlib.ImmutableHashMap.set("a2", changedState2)
        ->WonderBsMost.Most.just
      }
      let data2 = _buildRegisteredWorkPluginData(
        ~pluginName="a2",
        ~createStateFunc=() => s2,
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      Main.registerWorkPlugin(
        ~data=data2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register two plugins that plugin has two jobs", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin1 data", () => {
      let (_, data1, s1) = _prepareData1()
      state1 := s1

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("register plugin2 data", () => {
      let (rootJobName, _, _) = _prepareData1()
      let (job1Name_a2, data2, s2) = _prepareData2()
      state2 := s2

      Main.registerWorkPlugin(
        ~data=data2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  let _createState3 = (~d3=222, ()) => {
    {
      "d3": d3,
    }->Obj.magic
  }

  let _prepareForRegisterThreePlugins = () => {
    let (rootJobName, data1, changedState1) = _prepareData1()
    let (job1Name_a2, data2, changedState2) = _prepareData2()
    let state3 = _createState3()
    let changedState3 = _createState3(~d3=2, ())
    let job1 = states => {
      states
      ->WonderCommonlib.ImmutableHashMap.set("a3", changedState3)
      ->WonderBsMost.Most.just
    }
    let data3 = _buildRegisteredWorkPluginData(
      ~pluginName="a3",
      ~createStateFunc=() => state3,
      ~allPipelineData=[
        {
          name: "init",
          groups: [
            {
              name: "first_a3",
              link: #concat,
              elements: [
                {
                  name: "job1_a3",
                  type_: #job,
                },
              ],
            },
          ],
          first_group: "first_a3",
        },
      ],
      ~getExecFunc=(_, jobName) => {
        switch jobName {
        | "job1_a3" => job1->Js.Nullable.return
        | _ => Js.Nullable.null
        }
      },
      (),
    )

    (
      (rootJobName, data1, changedState1),
      (job1Name_a2, data2, changedState2),
      (data3, changedState3),
    )
  }

  test(."test register three plugins case1", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin1, plugin2, plugin3 data", () => {
      let (
        (rootJobName, data1, s1),
        (job1Name_a2, data2, s2),
        (data3, s3),
      ) = _prepareForRegisterThreePlugins()
      state1 := s1
      state2 := s2
      state3 := s3

      Main.registerWorkPlugin(
        ~data=data3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      Main.registerWorkPlugin(~data=data1, ())
      Main.registerWorkPlugin(
        ~data=data2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
        states->WonderCommonlib.ImmutableHashMap.get("a3"),
      )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register three plugins case2", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin1, plugin2, plugin3 data", () => {
      let (
        (rootJobName, data1, s1),
        (job1Name_a2, data2, s2),
        (data3, s3),
      ) = _prepareForRegisterThreePlugins()
      state1 := s1
      state2 := s2
      state3 := s3

      Main.registerWorkPlugin(
        ~data=data3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      Main.registerWorkPlugin(
        ~data=data2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
        states->WonderCommonlib.ImmutableHashMap.get("a3"),
      )->expect == (Some(state1.contents), Some(state2.contents), Some(state3.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register four plugins", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))
    let state3 = ref(Obj.magic(1))
    let state4 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stubJob1_3 = ref(Obj.magic(1))
    let stubJob2_4 = ref(Obj.magic(1))

    let _createState3 = (~d3=222, ()) => {
      {
        "d3": d3,
      }->Obj.magic
    }

    let _createState4 = (~d4=56, ()) => {
      {
        "d4": d4,
      }->Obj.magic
    }

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1, plugin2, plugin3, plugin4 data", () => {
      let (rootJobName, data1, s1) = _prepareData1()
      let (job1Name_a2, data2, s2) = _prepareData2()
      stubJob1_3 := createEmptyStubWithJsObjSandbox(sandbox)
      let s3 = _createState3(~d3=2, ())
      let job1 = states => {
        stubJob1_3.contents()
        states->WonderCommonlib.ImmutableHashMap.set("a3", s3)->WonderBsMost.Most.just
      }
      let data3 = _buildRegisteredWorkPluginData(
        ~pluginName="a3",
        ~createStateFunc=() => _createState3(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a3",
                link: #concat,
                elements: [
                  {
                    name: "job1_a3",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a3",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a3" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )
      stubJob2_4 := createEmptyStubWithJsObjSandbox(sandbox)
      let s4 = _createState4(~d4=5, ())
      let job1 = states => {
        states->WonderCommonlib.ImmutableHashMap.set("a4", s4)->WonderBsMost.Most.just
      }
      let job2 = states => {
        stubJob2_4.contents()
        states->WonderBsMost.Most.just
      }
      let data4 = _buildRegisteredWorkPluginData(
        ~pluginName="a4",
        ~createStateFunc=() => _createState4(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a4",
                link: #concat,
                elements: [
                  {
                    name: "group1_a4",
                    type_: #group,
                  },
                  {
                    name: "job1_a4",
                    type_: #job,
                  },
                ],
              },
              {
                name: "group1_a4",
                link: #concat,
                elements: [
                  {
                    name: "job2_a4",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a4",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a4" => job1->Js.Nullable.return
          | "job2_a4" => job2->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      state1 := s1
      state2 := s2
      state3 := s3
      state4 := s4

      Main.registerWorkPlugin(
        ~data=data3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      Main.registerWorkPlugin(~data=data1, ())
      Main.registerWorkPlugin(
        ~data=data4,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=job1Name_a2,
            ~insertAction=#before,
            (),
          ),
        ],
        (),
      )
      Main.registerWorkPlugin(
        ~data=data2,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName=rootJobName,
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
        states->WonderCommonlib.ImmutableHashMap.get("a3"),
        states->WonderCommonlib.ImmutableHashMap.get("a4"),
        stubJob1_3.contents->Obj.magic->getCallCount,
        stubJob2_4.contents->Obj.magic->getCallCount,
        stubJob2_4.contents->Obj.magic->calledAfter(stubJob1_3.contents->Obj.magic),
      )->expect ==
        (
          Some(state1.contents),
          Some(state2.contents),
          Some(state3.contents),
          Some(state4.contents),
          1,
          1,
          true,
        ))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register plugins in initFunc", ({given, \"when", \"and", then}) => {
    let state1 = ref(Obj.magic(1))
    let state2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("register plugin1 data", () => {
      ()
    })

    \"and"("register plugin2 data in plugin1 data's initFunc", () => {
      let s2 = _createState2(~d2="c", ())
      let job1 = states => {
        states->WonderCommonlib.ImmutableHashMap.set("a2", s2)->WonderBsMost.Most.just
      }
      let data2 = _buildRegisteredWorkPluginData(
        ~pluginName="a2",
        ~createStateFunc=() => _createState2(),
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )
      let (rootJobName, data1, s1) = _prepareData1(~initFunc=state => {
        let rootJobName = "root_a1"

        Main.registerWorkPlugin(
          ~data=data2,
          ~jobOrders=[
            _buildJobOrder(
              ~pipelineName="init",
              ~insertElementName=rootJobName,
              ~insertAction=#after,
              (),
            ),
          ],
          (),
        )

        ()
      }, ())

      state1 := s1
      state2 := s2

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's all jobs", () => {
      let states = _getStates()

      ((
        states->WonderCommonlib.ImmutableHashMap.get("a1"),
        states->WonderCommonlib.ImmutableHashMap.get("a2"),
      )->expect == (Some(state1.contents), Some(state2.contents)))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register one plugin with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state1 = ref(Obj.magic(1))
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin data with init, update pipeline jobs", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      let rootJob1_init = states => {
        stub1.contents()

        states->WonderBsMost.Most.just
      }
      let rootJob1_update = states => {
        stub2.contents()

        states->WonderBsMost.Most.just
      }
      let data1 = _buildRegisteredWorkPluginData(
        ~pluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
          {
            name: "update",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_update_a1",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "root_init_a1" => rootJob1_init->Js.Nullable.return
          | "root_update_a1" => rootJob1_update->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run update pipeline", () => {
      Main.runPipeline("update")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run update pipeline's all jobs", () => {
      ((stub1.contents->Obj.magic->getCallCount, stub2.contents->Obj.magic->getCallCount)->expect ==
        (0, 1))
      ->resolve
      ->Obj.magic
    })
  })

  test(."test register three plugins with init, update pipeline jobs", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let sandbox = ref(Obj.magic(1))
    let stub1 = ref(Obj.magic(1))
    let stub2 = ref(Obj.magic(1))
    let stub3 = ref(Obj.magic(1))

    _prepareRegister(given)

    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    given("register plugin1 data with one init pipeline job", () => {
      stub1 := createEmptyStubWithJsObjSandbox(sandbox)
      let rootJob1_init = states => {
        stub1.contents()

        states->WonderBsMost.Most.just
      }
      let data1 = _buildRegisteredWorkPluginData(
        ~pluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "root_init_a1" => rootJob1_init->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      Main.registerWorkPlugin(~data=data1, ())
    })

    given("register plugin2 data with one update pipeline job", () => {
      stub2 := createEmptyStubWithJsObjSandbox(sandbox)
      let job1 = states => {
        stub2.contents()

        states->WonderBsMost.Most.just
      }
      let data2 = _buildRegisteredWorkPluginData(
        ~pluginName="a2",
        ~allPipelineData=[
          {
            name: "update",
            groups: [
              {
                name: "first_a2",
                link: #concat,
                elements: [
                  {
                    name: "job1_a2",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a2",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job1_a2" => job1->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      Main.registerWorkPlugin(~data=data2, ())
    })

    given("register plugin3 data with one init pipeline job", () => {
      stub3 := createEmptyStubWithJsObjSandbox(sandbox)
      let job2 = states => {
        stub3.contents()

        states->WonderBsMost.Most.just
      }
      let data3 = _buildRegisteredWorkPluginData(
        ~pluginName="a3",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a3",
                link: #concat,
                elements: [
                  {
                    name: "job2_a3",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a3",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          switch jobName {
          | "job2_a3" => job2->Js.Nullable.return
          | _ => Js.Nullable.null
          }
        },
        (),
      )

      Main.registerWorkPlugin(
        ~data=data3,
        ~jobOrders=[
          _buildJobOrder(
            ~pipelineName="init",
            ~insertElementName="root_init_a1",
            ~insertAction=#after,
            (),
          ),
        ],
        (),
      )
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
    })

    then("run init pipeline's two jobs", () => {
      ((
        stub1.contents->Obj.magic->getCallCount,
        stub2.contents->Obj.magic->getCallCount,
        stub3.contents->Obj.magic->getCallCount,
      )->expect == (1, 0, 1))
      ->resolve
      ->Obj.magic
    })
  })

  test(."if first_group not in groups, error", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    given("register wrong plugin data", () => {
      let data1 = _buildRegisteredWorkPluginData(
        ~pluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "aaa",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          Js.Nullable.null
        },
        (),
      )

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      ()
    })

    then(%re("/^should error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."if first_group has more than one in groups, error", ({given, \"when", \"and", then}) => {
    _prepareRegister(given)

    given("register wrong plugin data", () => {
      let data1 = _buildRegisteredWorkPluginData(
        ~pluginName="a1",
        ~allPipelineData=[
          {
            name: "init",
            groups: [
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                  },
                ],
              },
              {
                name: "first_a1",
                link: #concat,
                elements: [
                  {
                    name: "root_init_a1",
                    type_: #job,
                  },
                ],
              },
            ],
            first_group: "first_a1",
          },
        ],
        ~getExecFunc=(_, jobName) => {
          Js.Nullable.null
        },
        (),
      )

      Main.registerWorkPlugin(~data=data1, ())
    })

    \"and"("init", () => {
      Main.init()
    })

    \"when"("run init pipeline", () => {
      ()
    })

    then(%re("/^should error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        Main.runPipeline("init")->WonderBsMost.Most.drain->Obj.magic
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
