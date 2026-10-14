import { DataDomeRequest } from './DataDomeRequest';
import { ImpervaRequest } from './ImpervaRequest';
import { SerializeObject } from './RequestsSerialization';
import { CapMonsterModules } from '../CapMonsterModules';
import { RecaptchaV2Request } from './RecaptchaV2Request';
import { ImageToTextRequest } from './ImageToTextRequest';
import { RecaptchaV3ProxylessRequest } from './RecaptchaV3ProxylessRequest';
import { FunCaptchaRequest } from './FunCaptchaRequest';
import { HCaptchaRequest } from './HCaptchaRequest';
import { GeeTestRequest } from './GeeTestRequest';
import { TenDIRequest } from './TenDIRequest';
import { RecaptchaV2EnterpriseRequest } from './RecaptchaV2EnterpriseRequest';
import { ComplexImageHCaptchaRequest } from './ComplexImageHCaptchaRequest';
import { ComplexImageRecaptchaRequest } from './ComplexImageRecaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './ComplexImageFunCaptchaRequest';
import { AmazonRequest } from './AmazonRequest';
import { AltchaRequest } from './AltchaRequest';
import { AlibabaRequest } from './AlibabaRequest';
import { FriendlyRequest } from './FriendlyRequest';
import { RecaptchaV3EnterpriseRequest } from './RecaptchaV3EnterpriseRequest';
import { CommonCaptchaRequest } from './CommonCaptchaRequest';

describe('Check unit tests for SerializeObject()', () => {
  it(`should serialize CommonCaptchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new CommonCaptchaRequest({
        task: {
          type: 'RecaptchaV2Task',
          websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
          websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'RecaptchaV2Task',
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      },
    });
  });

  it(`should throw for invalid websiteURL`, () => {
    expect(
      () =>
        new RecaptchaV2Request({
          websiteURL: 'websiteURL',
          websiteKey: 'websiteKey',
        }),
    ).toThrow('websiteURL must be a valid http or https URL');
  });

  it(`should serialize RecaptchaV2ProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2Request({
        websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        recaptchaDataSValue: 'some data-s value',
        userAgent: 'PostmanRuntime/7.29.0',
        cookies: 'cookieA=value#A;cookieB=value#B',
        isInvisible: true,
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
        isInvisible: true,
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
        isInvisible: true,
        proxy: {
          proxyType: 'socks4',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
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
        isInvisible: true,
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
        isEnterprise: true,
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
        isEnterprise: true,
      },
    });
  });

  it(`should serialize FunCaptchaRequest without optional fields`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new FunCaptchaRequest({
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
          proxyLogin: 'login',
          proxyPassword: 'password',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'FunCaptchaTask',
        websiteURL: 'https://funcaptcha.com/fc/api/nojs/?pkey=69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        websitePublicKey: '69A21A01-CC7B-B9C6-0F9A-E7FA06677FFC',
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'login',
        proxyPassword: 'password',
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
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        proxy: {
          proxyType: 'socks5',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
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
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
      task: new HCaptchaRequest({
        websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
        websiteKey: '472fc7af-86a4-4382-9a49-ca9090474471',
        isInvisible: true,
        data: 'some data',
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
        userAgent: expect(true).toBe(true),
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
        proxy: {
          proxyType: 'https',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
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
        userAgent: expect(true).toBe(true),
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
      task: new GeeTestRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
        version: 3,
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTask',
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
      },
    });
  });

  it(`should serialize GeeTestProxylessRequestV4`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new GeeTestRequest({
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        challenge: 'd93591bdf7860e1e4ee2fca799911215',
        version: 4,
        initParameters: {
          riskType: 'slide',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTask',
        websiteURL: 'https://example.com/geetest.php',
        gt: '81dc9bdb52d04dc20036dbd8313ed055',
        version: 4,
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
        version: 3,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxy: {
          proxyType: 'https',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
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
        version: 4,
        initParameters: {
          riskType: 'slide',
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        proxy: {
          proxyType: 'https',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'GeeTestTask',
        websiteURL: 'https://example.com/geetest.php',
        version: 4,
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
      task: new RecaptchaV2EnterpriseRequest({
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
        apiDomain: 'www.recaptcha.net',
        cookies: 'cookieA=value#A',
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
        apiDomain: 'www.recaptcha.net',
        cookies: 'cookieA=value#A',
      },
    });
  });

  it(`should serialize RecaptchaV2EnterpriseRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV2EnterpriseRequest({
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
        enterprisePayload: {
          s: 'SOME_ADDITIONAL_TOKEN',
        },
        pageAction: 'login',
        apiDomain: 'www.recaptcha.net',
        cookies: 'cookieA=value#A',
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
          proxyLogin: 'proxyLoginHere',
          proxyPassword: 'proxyPasswordHere',
        },
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
        pageAction: 'login',
        apiDomain: 'www.recaptcha.net',
        cookies: 'cookieA=value#A',
      },
    });
  });

  it(`should serialize RecaptchaV3EnterpriseProxylessRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new RecaptchaV3EnterpriseRequest({
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        minScore: 0.7,
        pageAction: 'login',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'RecaptchaV3EnterpriseTask',
        websiteURL: 'https://mydomain.com/page-with-recaptcha-enterprise',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        minScore: 0.7,
        pageAction: 'login',
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
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
          datadomeVersion: 'new',
        },
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'DataDome',
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
          datadomeVersion: 'new',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
      },
    });
  });

  it(`should serialize DataDomeRequest with proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new DataDomeRequest({
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
        },
        proxy: {
          proxyType: 'socks4',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'DataDome',
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          captchaUrl: 'https://geo.captcha-delivery.com/captcha/?initialCid=12434324',
          datadomeCookie: '',
        },
        proxyType: 'socks4',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize ImpervaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ImpervaRequest({
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          incapsulaScriptUrl: '_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3',
          incapsulaCookies: 'incap_ses_1166_2930313=br7iX33ZNCtf3HlpEXcuEDzz72cAAAAA0suDnBGrq/iA0J4oERYzjQ==',
          reese84UrlEndpoint: 'Built-with-the-For-hopence-Hurleysurfecting-the-',
        },
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'Imperva',
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          incapsulaScriptUrl: '_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3',
          incapsulaCookies: 'incap_ses_1166_2930313=br7iX33ZNCtf3HlpEXcuEDzz72cAAAAA0suDnBGrq/iA0J4oERYzjQ==',
          reese84UrlEndpoint: 'Built-with-the-For-hopence-Hurleysurfecting-the-',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
      },
    });
  });

  it(`should serialize ImpervaRequest with proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new ImpervaRequest({
        websiteURL: 'https://www.example.com',
        metadata: {
          incapsulaScriptUrl: '_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3',
          incapsulaCookies: 'incap_ses_1166_2930313=br7iX33ZNCtf3HlpEXcuEDzz72cAAAAA0suDnBGrq/iA0J4oERYzjQ==',
        },
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
          proxyLogin: 'proxyLoginHere',
          proxyPassword: 'proxyPasswordHere',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'Imperva',
        websiteURL: 'https://www.example.com',
        metadata: {
          incapsulaScriptUrl: '_Incapsula_Resource?SWJIYLWA=719d34d31c8e3a6e6fffd425f7e032f3',
          incapsulaCookies: 'incap_ses_1166_2930313=br7iX33ZNCtf3HlpEXcuEDzz72cAAAAA0suDnBGrq/iA0J4oERYzjQ==',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });
  });

  it(`should serialize AltchaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AltchaRequest({
        websiteURL: 'https://site.com',
        websiteKey: 'websiteKey',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          challenge: '3dd28253be6cc0c54d95f7f98c517e68744597cc6e66109619d1ac975c39181c',
          iterations: '5000',
          salt: '46d5b1c8871e5152d902ee3f?edk=1493462145de1ce33a52fb569b27a364&codeChallenge=464Cjs7PbiJJhJZ_ReJ-y9UGGDndcpsnP6vS8x1nEJyTkhjQkJyL2jcnYEuMKcrG&expires=1761048664',
          signature: '4b1cf0e0be0f4e5247e50b0f9a449830f1fbca44c32ff94bc080146815f31a18',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'altcha',
        websiteURL: 'https://site.com',
        websiteKey: 'websiteKey',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          challenge: '3dd28253be6cc0c54d95f7f98c517e68744597cc6e66109619d1ac975c39181c',
          iterations: '5000',
          salt: '46d5b1c8871e5152d902ee3f?edk=1493462145de1ce33a52fb569b27a364&codeChallenge=464Cjs7PbiJJhJZ_ReJ-y9UGGDndcpsnP6vS8x1nEJyTkhjQkJyL2jcnYEuMKcrG&expires=1761048664',
          signature: '4b1cf0e0be0f4e5247e50b0f9a449830f1fbca44c32ff94bc080146815f31a18',
        },
      },
    });
  });

  it(`should serialize AltchaRequest with proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AltchaRequest({
        websiteURL: 'https://site.com',
        websiteKey: 'websiteKey',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          challenge: '3dd28253be6cc0c54d95f7f98c517e68744597cc6e66109619d1ac975c39181c',
          iterations: '5000',
          salt: '46d5b1c8871e5152d902ee3f?edk=1493462145de1ce33a52fb569b27a364&codeChallenge=464Cjs7PbiJJhJZ_ReJ-y9UGGDndcpsnP6vS8x1nEJyTkhjQkJyL2jcnYEuMKcrG&expires=1761048664',
          signature: '4b1cf0e0be0f4e5247e50b0f9a449830f1fbca44c32ff94bc080146815f31a18',
        },
        proxy: {
          proxyType: 'socks4',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'altcha',
        websiteURL: 'https://site.com',
        websiteKey: 'websiteKey',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          challenge: '3dd28253be6cc0c54d95f7f98c517e68744597cc6e66109619d1ac975c39181c',
          iterations: '5000',
          salt: '46d5b1c8871e5152d902ee3f?edk=1493462145de1ce33a52fb569b27a364&codeChallenge=464Cjs7PbiJJhJZ_ReJ-y9UGGDndcpsnP6vS8x1nEJyTkhjQkJyL2jcnYEuMKcrG&expires=1761048664',
          signature: '4b1cf0e0be0f4e5247e50b0f9a449830f1fbca44c32ff94bc080146815f31a18',
        },
        proxyType: 'socks4',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize TenDIRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new TenDIRequest({
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        metadata: {
          captchaUrl: 'https://example.com/captcha',
          aidEncrypted: 'HHuVfL451oAYXSwVa87xnU4QHER9ufsPpaSomCugX5Il',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'TenDI',
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        metadata: {
          captchaUrl: 'https://example.com/captcha',
          aidEncrypted: 'HHuVfL451oAYXSwVa87xnU4QHER9ufsPpaSomCugX5Il',
        },
      },
    });
  });

  it(`should serialize TenDIRequest with Proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new TenDIRequest({
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        metadata: {
          captchaUrl: 'https://example.com/captcha',
        },
        proxy: {
          proxyType: 'socks4',
          proxyAddress: 'https://proxy.com',
          proxyPort: 6045,
          proxyLogin: 'login',
          proxyPassword: 'p@ssword',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'TenDI',
        websiteURL: 'https://site.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        metadata: {
          captchaUrl: 'https://example.com/captcha',
        },
        proxyType: 'socks4',
        proxyAddress: 'https://proxy.com',
        proxyPort: 6045,
        proxyLogin: 'login',
        proxyPassword: 'p@ssword',
      },
    });
  });

  it(`should serialize AmazonRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AmazonRequest({
        websiteURL: 'https://site.com',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        challengeScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.token.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/challenge.js',
        captchaScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.captcha.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/captcha.js',
        context: 'qoJYgnKsc...aormh/dYYK+Y=',
        iv: 'CgAAXFFFFSAAABVk',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'AmazonTask',
        websiteURL: 'https://site.com',
        websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
        challengeScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.token.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/challenge.js',
        captchaScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.captcha.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/captcha.js',
        context: 'qoJYgnKsc...aormh/dYYK+Y=',
        iv: 'CgAAXFFFFSAAABVk',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
  });

  it('should serialize Amazon captcha script flow', () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AmazonRequest({
        websiteURL: 'https://site.com',
        websiteKey: 'h15hX7brbaRTRZa1_1',
        captchaScript: 'https://example.com/jsapi.js',
      }),
    });

    expect(JSON.parse(JSON.stringify(serialized.task))).toEqual({
      type: 'AmazonTask',
      websiteURL: 'https://site.com',
      websiteKey: 'h15hX7brbaRTRZa1_1',
      captchaScript: 'https://example.com/jsapi.js',
    });
  });

  it('should serialize Amazon invisible challenge flow', () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AmazonRequest({
        websiteURL: 'https://site.com',
        challengeScript: 'https://example.com/challenge.js',
        context: '',
        iv: '',
      }),
    });

    expect(serialized).toMatchObject({
      task: {
        type: 'AmazonTask',
        websiteURL: 'https://site.com',
        challengeScript: 'https://example.com/challenge.js',
        context: '',
        iv: '',
      },
    });
  });

  it('should reject an Amazon request that mixes captcha script and challenge fields', () => {
    expect(
      () =>
        new AmazonRequest({
          websiteURL: 'https://site.com',
          websiteKey: 'key',
          captchaScript: 'https://example.com/jsapi.js',
          challengeScript: 'https://example.com/challenge.js',
        } as never),
    ).toThrow(/one documented flow/);
  });

  it(`should serialize AlibabaRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AlibabaRequest({
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          sceneId: '1ww7426c4',
          prefix: 'dlw3kug',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'alibaba',
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          sceneId: '1ww7426c4',
          prefix: 'dlw3kug',
        },
      },
    });
  });

  it(`should serialize AlibabaRequest with proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new AlibabaRequest({
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          sceneId: '1ww7426c4',
          prefix: 'dlw3kug',
          userId: 'HpadJlQnz2zSKcSmjXBaqQvjYUvP4jMJIk/ZwGNDNiM=',
        },
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
          proxyLogin: 'proxyLoginHere',
          proxyPassword: 'proxyPasswordHere',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'alibaba',
        websiteURL: 'https://www.example.com',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          sceneId: '1ww7426c4',
          prefix: 'dlw3kug',
          userId: 'HpadJlQnz2zSKcSmjXBaqQvjYUvP4jMJIk/ZwGNDNiM=',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });
  });

  it(`should serialize FriendlyRequest`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new FriendlyRequest({
        websiteURL: 'https://example.com',
        websiteKey: 'FFMGEMAD2K3JJ35P',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          apiGetLib: 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.15/widget.module.min.js',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'friendly',
        websiteURL: 'https://example.com',
        websiteKey: 'FFMGEMAD2K3JJ35P',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          apiGetLib: 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.15/widget.module.min.js',
        },
      },
    });
  });

  it(`should serialize FriendlyRequest with proxy`, () => {
    const serialized = SerializeObject({
      clientKey: '<your capmonster.cloud API key>',
      task: new FriendlyRequest({
        websiteURL: 'https://example.com',
        websiteKey: 'FFMGEMAD2K3JJ35P',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          apiGetLib: 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.15/widget.module.min.js',
        },
        proxy: {
          proxyType: 'http',
          proxyAddress: '8.8.8.8',
          proxyPort: 8080,
          proxyLogin: 'proxyLoginHere',
          proxyPassword: 'proxyPasswordHere',
        },
      }),
    });

    expect(serialized).toMatchObject({
      clientKey: '<your capmonster.cloud API key>',
      task: {
        type: 'CustomTask',
        class: 'friendly',
        websiteURL: 'https://example.com',
        websiteKey: 'FFMGEMAD2K3JJ35P',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        metadata: {
          apiGetLib: 'https://cdn.jsdelivr.net/npm/friendly-challenge@0.9.15/widget.module.min.js',
        },
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });
  });
});
