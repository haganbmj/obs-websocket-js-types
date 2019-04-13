import * as ObsWebsocketJs from 'obs-websocket-js';

const obs = new ObsWebsocketJs();
obs.connect().then().catch();
obs.connect({address: '127.0.0.1:4445', password: 'fooBarBaz'});

obs.send('GetVersion');
obs.send('GetVersion').then();
obs.send('GetVersion', () => {});

obs.send('Authenticate', {auth: 'foo'});
obs.send('Authenticate', {auth: 'foo'}).then();
obs.send('Authenticate', {auth: 'foo'}, () => {});

// Test missing optional args. Shouldn't error.
obs.send('StartStreaming');
obs.send('StartStreaming', {});

obs.on('SwitchScenes', () => {});

// Missing required args.
// $ExpectError
obs.send('Authenticate', {});

// $ExpectError
obs.send('MadeUpRequestName');

// $ExpectError
obs.on('MadeUpEventName', () => {});

// $ExpectError
obs.send(null);

obs.disconnect();
