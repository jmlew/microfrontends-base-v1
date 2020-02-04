module.exports = {
  name: 'mfe-client-ng-a',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mfe-client-ng-a',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
