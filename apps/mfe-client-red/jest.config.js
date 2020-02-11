module.exports = {
  name: 'mfe-client-red',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-client-red',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
