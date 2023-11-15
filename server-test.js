import dialog from './index.js';

const response = await dialog.html({
  url: 'fetch.html',
  title: 'Fetch data'
  // message: 'Testing <b>Dialog Node</b>'
});

// eslint-disable-next-line no-console
console.log('response', response);
