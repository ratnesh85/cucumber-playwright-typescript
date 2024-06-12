var reporter = require('cucumber-html-reporter');


var options = {
        theme: 'simple',
        jsonDir: 'reports/',
        output: 'reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
          
            TestEnvironment: "",
            Browser: process.env.browser,
            url:process.env.url
        },
        failedSummaryReport: true,
    };

reporter.generate(options);