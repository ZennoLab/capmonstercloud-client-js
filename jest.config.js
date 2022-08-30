module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '__tests__',
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
