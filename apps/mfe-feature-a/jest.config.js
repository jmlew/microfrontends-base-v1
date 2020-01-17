module.exports = {
  name: 'mfe-feature-a',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-feature-a',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
