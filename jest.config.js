module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.spec\\.ts$',
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    ['ts-jest']: {
      tsconfig: {
        inlineSourceMap: true,
      },
    },
  },
};
