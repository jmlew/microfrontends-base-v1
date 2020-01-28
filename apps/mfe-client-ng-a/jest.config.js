module.exports = {
  name: 'mfe-client-ng-b',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-client-ng-b',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
