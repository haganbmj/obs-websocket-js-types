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

obs.on('SwitchScenes', () => {});

// $ExpectError
obs.send('Authenticate', {});

// $ExpectError
obs.send('MadeUpRequestName');

// $ExpectError
obs.on('MadeUpEventName', () => {});

// $ExpectError
obs.send(null);

obs.disconnect();
