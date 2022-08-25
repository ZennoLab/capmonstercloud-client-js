# Zennolab CapMonsterCloud JS Client

Official JS client library for [capmonster.cloud](https://capmonster.cloud/) captcha recognition service

## Installation

Via [NPM](https://www.npmjs.com/):

    npm i @zennolab_com/capmonstercloud-client

## Usage with Node

```javascript
    const { CapMonsterCloudClientFactory, ClientOptions } = require('@zennolab_com/capmonstercloud-client');

    async function run () {
        const clientOptions = new ClientOptions({ ClientKey: '<your capmonster.cloud API key>' });
        const cmcClient = CapMonsterCloudClientFactory.Create(clientOptions);
        console.log(await cmcClient.getBalance());
        console.log(await cmcClient.getBalance());
        console.log(await cmcClient.getBalance());
    }

    run().then(() => {
        console.log('DONE');
        process.exit(0)
    }).catch(err => {
        console.error(err);
        process.exit(1);
    })
```

## Debug

For debugging set `DEBUG` environmental variable (see [debug module](https://www.npmjs.com/package/debug))

```bash
DEBUG=net,http node app.js
```