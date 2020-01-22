module.exports = {
  name: 'mfe-client-a',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-client-a',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
