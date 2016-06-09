exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['**/*spec.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  baseUrl: "http://localhost:9000"
};