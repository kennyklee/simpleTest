var TinyTestHelper = {
    renderStats: function(tests, failures) {
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;
        var summaryText = "Ran " + numberOfTests + " tests: "
                          + successes + " successes, "
                          + failures + " failures"
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryText;
        document.body.appendChild(summaryElement);
    }
}

var TinyTest = {
    run: function(tests) {
        var failures = 0;
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, "color: green;");
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName + '\n%c' + e.message,
                                        'color: red;', 'background: red; color: white;');
                console.error('%c' + e.stack);
                console.groupEnd();
                // console.log(e.columnNumber);
                // console.log(e.filename);
                // console.log(e.lineNumber);
                // console.log(e.message);
                // console.log(e.name);
                // console.log(e.stack);
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
            }
        }, 0);
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },
};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    eqs                = TinyTest.assertStrictEquals.bind(TinyTest), // alias
    tests              = TinyTest.run.bind(TinyTest);
