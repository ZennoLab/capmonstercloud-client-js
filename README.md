# Zennolab CapMonsterCloud JS Client

Official JS client library for [capmonster.cloud](https://capmonster.cloud/) captcha recognition service

## Installation

Via [NPM](https://www.npmjs.com/package/@zennolab_com/capmonstercloud-client):

    npm i @zennolab_com/capmonstercloud-client

## Usage with Node (with or without Typescript)

```javascript
const { CapMonsterCloudClientFactory, ClientOptions, RecaptchaV2ProxylessRequest } = require('@zennolab_com/capmonstercloud-client');

async function run() {
  const cmcClient = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: '<your capmonster.cloud API key>' }));
  console.log(await cmcClient.getBalance());

  const recaptchaV2ProxylessRequest = new RecaptchaV2ProxylessRequest({
    websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
    websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
  });

  console.log(await cmcClient.Solve(recaptchaV2ProxylessRequest));
}

run()
  .then(() => {
    console.log('DONE');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
```

## Usage with Browser (with or without Typescript)

Browser implementation use [fetch](https://caniuse.com/fetch) instead of [http(s)](https://nodejs.org/api/http.html).
For browser usage you need some Module Bundler (e.g. [Webpack](https://webpack.js.org/)).

```javascript
import { CapMonsterCloudClientFactory, ClientOptions, RecaptchaV2Request } from '@zennolab_com/capmonstercloud-client';

document.addEventListener('DOMContentLoaded', async () => {
  const cmcClient = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: '<your capmonster.cloud API key>' }));
  console.log(await cmcClient.getBalance());

  const recaptchaV2Request = new RecaptchaV2Request({
    websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
    websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
    proxyType: 'http',
    proxyAddress: '8.8.8.8',
    proxyPort: 8080,
    proxyLogin: 'proxyLoginHere',
    proxyPassword: 'proxyPasswordHere',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
  });

  console.log(await cmcClient.Solve(recaptchaV2Request));
});
```

## Debug

For debugging set `DEBUG` environmental variable to one of [possible values](/src/Logger.ts) (see [debug module](https://www.npmjs.com/package/debug))

```bash
DEBUG=cmc-* node app.js
```

## Supported captcha recognition requests:

- [GeeTestProxylessRequest](https://docs.capmonster.cloud/docs/captchas/geetest-task)
- [GeeTestRequest](https://docs.capmonster.cloud/docs/captchas/geetest-task)
- [ImageToTextRequest](https://docs.capmonster.cloud/docs/captchas/image-to-text)
- [RecaptchaV2ProxylessRequest](https://docs.capmonster.cloud/docs/captchas/no-captcha-task)
- [RecaptchaV2Request](https://docs.capmonster.cloud/docs/captchas/no-captcha-task)
- [RecaptchaV3ProxylessRequest](https://docs.capmonster.cloud/docs/captchas/recaptcha-v3-task)
- [RecaptchaV2EnterpriseProxylessRequest](https://docs.capmonster.cloud/docs/captchas/recaptcha-v2-enterprise-task)
- [RecaptchaV2EnterpriseRequest](https://docs.capmonster.cloud/docs/captchas/recaptcha-v2-enterprise-task)
- [TurnstileProxylessRequest](https://docs.capmonster.cloud/docs/captchas/tunrstile-task)
- [TurnstileRequest](https://docs.capmonster.cloud/docs/captchas/tunrstile-task)
- [RecaptchaComplexImageTaskRequest](https://docs.capmonster.cloud/docs/captchas/recaptcha-click)
- [DataDome](https://docs.capmonster.cloud/docs/captchas/datadome)
- [TenDI](https://docs.capmonster.cloud/docs/captchas/tendi)
- [Amazon](https://docs.capmonster.cloud/docs/captchas/amazon-task)
