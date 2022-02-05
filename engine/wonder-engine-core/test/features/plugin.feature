Feature: Plugin
    As a Plugin
    I want to be registered
    So that I can use it

    Background: prepare register
        Given prepare register


    Rule: plugin data

        Scenario: open debug
            When open debug
            Then get is debug should return true

    Rule: register plugin

        Scenario: register one plugin
            When register plugin data
            Then should add plugin data

        Scenario: register two plugins with jobOrders
            When register plugin1 data
            And register plugin2 data with jobOrders2
            Then should add plugin1 and plugin2 data

    Rule: unregister plugin

        Scenario: register one plugin and unregister it
            When register plugin data
            And unregister it
            Then should not has plugin data

        Scenario: register two plugins and unregister the first one
            When register plugin1 data
            And register plugin2 data
            And unregister plugin1 data
            Then should only has plugin2 data

    Rule: init plugins

        Scenario: init plugins
            Given prepare sandbox
            And register plugin1 data
            And register plugin2 data
            When init
            Then invoke plugin1's and plugin2's createStateFunc and store result
            And invoke plugin1's and plugin2's initFunc

    Rule: run pipeline

        Scenario: test register one plugin
            Given register plugin data
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two plugins that plugin has one job
            Given register plugin1 data
            And register plugin2 data
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register two plugins that plugin has two jobs
            Given register plugin1 data
            And register plugin2 data
            And init
            When run init pipeline
            Then run init pipeline's all jobs


        Scenario: test register three plugins case1
            Given register plugin1, plugin2, plugin3 data
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register three plugins case2
            Given register plugin1, plugin2, plugin3 data
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register four plugins
            Given prepare sandbox
            And register plugin1, plugin2, plugin3, plugin4 data
            And init
            When run init pipeline
            Then run init pipeline's all jobs

        Scenario: test register plugins in initFunc
            Given register plugin1 data
            And register plugin2 data in plugin1 data's initFunc
            And init
            When run init pipeline
            Then run init pipeline's all jobs

    Rule: run pipeline special case

        Scenario: test register one plugin with init, update pipeline jobs
            Given prepare sandbox
            And register plugin data with init, update pipeline jobs
            And init
            When run update pipeline
            Then run update pipeline's all jobs

        Scenario: test register three plugins with init, update pipeline jobs
            Given prepare sandbox
            And register plugin1 data with one init pipeline job
            And register plugin2 data with one update pipeline job
            And register plugin3 data with one init pipeline job
            And init
            When run init pipeline
            Then run init pipeline's two jobs

        Scenario: if first_group not in groups, error
            Given register wrong plugin data
            And init
            When run init pipeline
            Then should error: "not in groups"

        Scenario: if first_group has more than one in groups, error
            Given register wrong plugin data
            And init
            When run init pipeline
            Then should error: "has more than one"