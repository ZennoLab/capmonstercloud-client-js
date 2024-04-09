import { DataDomeRequest } from './DataDomeRequest';
import { SerializeObject } from './RequestsSerialization';
import { CapMonsterModules } from '../CapMonsterModules';
import { RecaptchaV2ProxylessRequest } from './RecaptchaV2ProxylessRequest';
import { RecaptchaV2Request } from './RecaptchaV2Request';
import { ImageToTextRequest } from './ImageToTextRequest';
import { RecaptchaV3ProxylessRequest } from './RecaptchaV3ProxylessRequest';
import { FunCaptchaProxylessRequest } from './FunCaptchaProxylessRequest';
import { FunCaptchaRequest } from './FunCaptchaRequest';
import { HCaptchaProxylessRequest } from './HCaptchaProxylessRequest';
import { HCaptchaRequest } from './HCaptchaRequest';
import { GeeTestProxylessRequest } from './GeeTestProxylessRequest';
import { GeeTestRequest } from './GeeTestRequest';
import { RecaptchaV2EnterpriseProxylessRequest } from './RecaptchaV2EnterpriseProxylessRequest';
import { RecaptchaV2EnterpriseRequest } from './RecaptchaV2EnterpriseRequest';
import { ComplexImageHCaptchaRequest } from './ComplexImageHCaptchaRequest';
import { ComplexImageRecaptchaRequest } from './ComplexImageRecaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './ComplexImageFunCaptchaRequest';

describe('Check unit tests for SerializeObject()', () => {
  it(`should serialize RecaptchaV2ProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2ProxylessRequest({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        recaptchaDataSValue: 'some data-s value',
        userAgent: 'PostmanRuntime/7.29.0',
        cookies: 'cookieA=value#A;cookieB=value#B',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'NoCaptchaTaskProxyless',
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        recaptchaDataSValue: 'some data-s value',
        userAgent: 'PostmanRuntime/7.29.0',
        cookies: 'cookieA=value#A;cookieB=value#B',
      },
    });
  });

  it(`should serialize RecaptchaV2Request`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2Request({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        recaptchaDataSValue: 'some data-s value',
        userAgent: 'PostmanRuntime/7.29.0',
        cookies: 'cookieA=value#A;cookieB=value#B',
        proxyType: 'socks4',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'NoCaptchaTask',
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        recaptchaDataSValue: 'some data-s value',
        userAgent: 'PostmanRuntime/7.29.0',
        cookies: 'cookieA=value#A;cookieB=value#B',
        proxyType: 'socks4',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize ImageToTextRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ImageToTextRequest({
        body: 'some base64 body',
        CapMonsterModule: CapMonsterModules.YandexWave,
        Case: true,
        numeric: 1,
        recognizingThreshold: 65,
        math: false,
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'ImageToTextTask',
        body: 'some base64 body',
        CapMonsterModule: 'yandexwave',
        Case: true,
        numeric: 1,
        recognizingThreshold: 65,
        math: false,
      },
    });
  });

  it(`should serialize RecaptchaV3ProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV3ProxylessRequest({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        minScore: 0.6,
        pageAction: 'some-action',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'RecaptchaV3TaskProxyless',
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        minScore: 0.6,
        pageAction: 'some-action',
      },
    });
  });

  it(`should serialize FunCaptchaProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new FunCaptchaProxylessRequest({
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        data: '{"blob":"dyXvXANMbHj1iDyz.Qj97JtSqR2n%2BuoY1V%2FbdgbrG7p%2FmKiqdU9AwJ6MifEt0np4vfYn6TTJDJEfZDlcz9Q1XMn9przeOV%2FCr2%2FIpi%2FC1s%3D"}',
        funcaptchaApiJSSubdomain: 'mywebsite-api.funcaptcha.com',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'FunCaptchaTaskProxyless',
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        data: '{"blob":"dyXvXANMbHj1iDyz.Qj97JtSqR2n%2BuoY1V%2FbdgbrG7p%2FmKiqdU9AwJ6MifEt0np4vfYn6TTJDJEfZDlcz9Q1XMn9przeOV%2FCr2%2FIpi%2FC1s%3D"}',
        funcaptchaApiJSSubdomain: 'mywebsite-api.funcaptcha.com',
      },
    });
  });

  it(`should serialize FunCaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new FunCaptchaRequest({
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        data: '{"blob":"dyXvXANMbHj1iDyz.Qj97JtSqR2n%2BuoY1V%2FbdgbrG7p%2FmKiqdU9AwJ6MifEt0np4vfYn6TTJDJEfZDlcz9Q1XMn9przeOV%2FCr2%2FIpi%2FC1s%3D"}',
        funcaptchaApiJSSubdomain: 'mywebsite-api.funcaptcha.com',
        proxyType: 'socks5',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'FunCaptchaTask',
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        data: '{"blob":"dyXvXANMbHj1iDyz.Qj97JtSqR2n%2BuoY1V%2FbdgbrG7p%2FmKiqdU9AwJ6MifEt0np4vfYn6TTJDJEfZDlcz9Q1XMn9przeOV%2FCr2%2FIpi%2FC1s%3D"}',
        funcaptchaApiJSSubdomain: 'mywebsite-api.funcaptcha.com',
        proxyType: 'socks5',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize HCaptchaProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new HCaptchaProxylessRequest({
        websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
        websiteKey: '472fc7af-86a4-4382-9a49-ca9090474471',
        isInvisible: true,
        data: 'some data',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'HCaptchaTaskProxyless',
        websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
        websiteKey: '472fc7af-86a4-4382-9a49-ca9090474471',
        isInvisible: true,
        data: 'some data',
        userAgent: expect(null == undefined).toBe(true),
      },
    });
  });

  it(`should serialize HCaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new HCaptchaRequest({
        websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
        websiteKey: '472fc7af-86a4-4382-9a49-ca9090474471',
        isInvisible: true,
        data: 'some data',
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'HCaptchaTask',
        websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
        websiteKey: '472fc7af-86a4-4382-9a49-ca9090474471',
        isInvisible: true,
        data: 'some data',
        userAgent: expect(null == undefined).toBe(true),
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize GeeTestProxylessRequestV3`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new GeeTestProxylessRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTaskProxyless',
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
      },
    });
  });

  it(`should serialize GeeTestProxylessRequestV4`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new GeeTestProxylessRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
        version: '4',
        initParameters: {
          riskType: 'slide',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTaskProxyless',
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        version: '4',
        initParameters: {
          riskType: 'slide',
        },
      },
    });
  });

  it(`should serialize GeeTestRequestV3`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new GeeTestRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTask',
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize GeeTestRequestV4`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new GeeTestRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        version: '4',
        initParameters: {
          riskType: 'slide',
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTask',
        websiteURL: 'https://example.com/geetest.php',
        version: '4',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        initParameters: {
          riskType: 'slide',
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxyType: 'https',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize RecaptchaV2EnterpriseProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2EnterpriseProxylessRequest({
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'RecaptchaV2EnterpriseTaskProxyless',
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
      },
    });
  });

  it(`should serialize RecaptchaV2EnterpriseRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2EnterpriseRequest({
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'RecaptchaV2EnterpriseTask',
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
      },
    });
  });

  it(`should serialize ComplexImageHCaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ComplexImageHCaptchaRequest({
        imageUrls: ['https://i.postimg.cc/kg71cbRt/image-1.jpg', 'https://i.postimg.cc/6381Zx2j/image.jpg'],
        metaData: {
          Task: 'Please click each image containing a mountain',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
        exampleImagesBase64: ['image in base64'],
        exampleImageUrls: ['https://i.postimg.cc/kg71cbRt/image-1.jpg'],
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'ComplexImageTask',
        class: 'hcaptcha',
        imageUrls: ['https://i.postimg.cc/kg71cbRt/image-1.jpg', 'https://i.postimg.cc/6381Zx2j/image.jpg'],
        exampleImagesBase64: ['image in base64'],
        exampleImageUrls: ['https://i.postimg.cc/kg71cbRt/image-1.jpg'],
        metadata: {
          Task: 'Please click each image containing a mountain',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      },
    });
  });

  it(`should serialize ComplexImageRecaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ComplexImageRecaptchaRequest({
        imageUrls: ['https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg'],
        metaData: {
          Grid: '3x3',
          Task: 'Please click each image containing a mountain',
          TaskDefinition: '/m/015qff',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'ComplexImageTask',
        class: 'recaptcha',
        imageUrls: ['https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg'],
        metadata: {
          Grid: '3x3',
          Task: 'Please click each image containing a mountain',
          TaskDefinition: '/m/015qff',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      },
    });
  });

  it(`should serialize ComplexImageFunCaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ComplexImageFunCaptchaRequest({
        imageUrls: ['https://i.postimg.cc/gkzX19Gr/funcaptcha.jpg'],
        metaData: {
          Task: 'Pick the elephant',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'ComplexImageTask',
        class: 'funcaptcha',
        imageUrls: ['https://i.postimg.cc/gkzX19Gr/funcaptcha.jpg'],
        metadata: {
          Task: 'Pick the elephant',
        },
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      },
    });
  });

  it(`should serialize DataDomeRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new DataDomeRequest({
        websiteURL: 'site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'DataDome',
        websiteURL: 'site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
        },
      },
    });
  });
});
