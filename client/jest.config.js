module.exports = {
  name: 'client',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__tests__/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/mocks/fileMock.js',
  },
  testRegex: 'client/.*\\.test\\.js$',
  collectCoverage: true,
  coverageDirectory: '../coverage'
};
