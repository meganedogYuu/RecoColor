module.exports = {
  roots: ['<rootDir>/'],
  testMatch: [
    // "**/__tests__/**/*.+(ts|tsx|js)",
    // TODO: 1テストファイルを修正するのが重いので、1つずつ直していく
    '**/__tests__/check.spec.js',
    '**/__tests__/convert.spec.js',
    '**/__tests__/util.spec.js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
