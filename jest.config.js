module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory : '<rootDir>/build/coverage',
  transform: {
    '^.+\\.ts(x?)?$': 'ts-jest',
    '^.+\\.js(x?)?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)(x?)?$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};