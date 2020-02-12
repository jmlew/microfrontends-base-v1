module.exports = {
  name: 'mfe-client-orange',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-client-orange',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
