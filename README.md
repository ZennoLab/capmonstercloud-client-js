# Zennolab CapMonsterCloud JS Client

Official JS client library for [capmonster.cloud](https://capmonster.cloud/) captcha recognition service

## Installation

Via [NPM](https://www.npmjs.com/package/@zennolab_com/capmonstercloud-client):

    npm i @zennolab_com/capmonstercloud-client

## Usage with Node

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

## Debug

For debugging set `DEBUG` environmental variable to one of [possible values](/src/Logger.ts) (see [debug module](https://www.npmjs.com/package/debug))

```bash
DEBUG=cmc-* node app.js
```

## Supported captcha recognition requests:

- [FunCaptchaProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/643629079/FunCaptchaTaskProxyless+solving+FunCaptcha)
- [FunCaptchaRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/735805497/FunCaptchaTask+solving+FunCaptcha)
- [GeeTestProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940291626/GeeTestTaskProxyless+GeeTest+captcha+recognition+without+proxy)
- [GeeTestRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1940357159/GeeTestTask+GeeTest+captcha+recognition)
- [HCaptchaProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240977/HCaptchaTaskProxyless+hCaptcha+puzzle+solving)
- [HCaptchaRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/1203240988/HCaptchaTask+hCaptcha+puzzle+solving)
- [ImageToTextRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/655469/ImageToTextTask+solve+image+captcha)
- [RecaptchaV2ProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/373161985/NoCaptchaTaskProxyless+solving+Google+recaptcha)
- [RecaptchaV2Request](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/680689685/NoCaptchaTask+solving+Google+recaptcha)
- [RecaptchaV3ProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/566853650/RecaptchaV3TaskProxyless+solving+Google+ReCaptcha+v.3)
- [RecaptchaV2EnterpriseProxylessRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/2178383893/RecaptchaV2EnterpriseTaskProxyless+solving+Google+reCAPTCHA+Enterprise+without+proxy)
- [RecaptchaV2EnterpriseRequest](https://zennolab.atlassian.net/wiki/spaces/APIS/pages/2179104769/RecaptchaV2EnterpriseTask+solving+Google+reCAPTCHA+Enterprise)