import { createServerMock } from '../tests/helpers';
import { CapMonsterCloudClientFactory } from './CapMonsterCloudClientFactory';
import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { ErrorType } from './ErrorType';
import { RecaptchaV2Request } from './Requests/RecaptchaV2Request';
import { ComplexImageRecaptchaRequest } from './Requests/ComplexImageRecaptchaRequest';
import { ComplexImageHCaptchaRequest } from './Requests/ComplexImageHCaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './Requests/ComplexImageFunCaptchaRequest';
import { TenDIRequest } from './Requests/TenDIRequest';

import { BasiliskRequest } from './Requests/BasiliskRequest';
import { ImpervaRequest } from './Requests/ImpervaRequest';
import { BinanceRequest } from './Requests/BinanceRequest';
import { ComplexImageTaskRecognitionRequest } from './Requests/ComplexImageTaskRecognitionRequest';
import { AmazonRequest } from './Requests/AmazonRequest';
import { HCaptchaRequest } from './Requests/HCaptchaRequest';
const { version } = require('../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires

describe('Check integration tests for CapMonsterCloudClientFactory()', () => {
  it(`should send user-agent header from node with version ${version}`, async () => {
    expect.assertions(2);

    const srv = await createServerMock({ responses: [{ responseBody: '{"errorId":0,"balance":345.678}' }] });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    await cmcClient.getBalance();

    expect(srv.caughtRequests[0]).toHaveProperty('userAgent', `${CapMonsterCloudClientFactory.productName}/${version}`);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call getBalance method with specified object', async () => {
    expect.assertions(2);

    const srv = await createServerMock({ responses: [{ responseBody: '{"errorId":0,"balance":345.678}' }] });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    await cmcClient.getBalance();

    expect(srv.caughtRequests[0]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>"}');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call createTask and getTaskResult methods with specified objects', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":7654321}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2ProxylessRequest = new RecaptchaV2Request({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
    });

    const task = await cmcClient.Solve(recaptchaV2ProxylessRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654321}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.gRecaptchaResponse', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call createTask and getTaskResult methods with specified objects for HCaptcha', async () => {
    expect.assertions(7);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":7654321}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer", "userAgent": "userAgent", "respKey": "respKey"}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const HRecaptachRequest = new HCaptchaRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      fallbackToActualUA: true,
    });

    const task = await cmcClient.Solve(HRecaptachRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"HCaptchaTask","websiteURL":"https://lessons.zennolab.com/captchas/hcaptcha/?level=easy","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd","fallbackToActualUA":true},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":7654321}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.gRecaptchaResponse', 'answer');
    expect(task).toHaveProperty('solution.userAgent', 'userAgent');
    expect(task).toHaveProperty('solution.respKey', 'respKey');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call createTask with proxy parameters and getTaskResult methods with specified objects', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });

    const task = await cmcClient.Solve(recaptchaV2Request);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.gRecaptchaResponse', 'answer');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should call terminate createTask by AbortController', async () => {
    expect.assertions(3);

    const srv = await createServerMock({
      responses: [{ responseBody: '{"errorId":0,"taskId":1234567}' }],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
      userAgent: 'userAgent',
    });

    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), 0);

    try {
      await cmcClient.Solve(recaptchaV2Request, undefined, abortController);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err).toHaveProperty('name', 'AbortError');
    }

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should return failed task by createTask from server', async () => {
    expect.assertions(4);

    const srv = await createServerMock({
      responses: [
        {
          responseBody:
            '{"errorId":1,"errorCode":"ERROR_KEY_DOES_NOT_EXIST","errorDescription":"Account authorization key not found in the system or has incorrect format","taskId":0}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
      userAgent: 'userAgent',
    });

    const task = await cmcClient.Solve(recaptchaV2Request);

    expect(task).toBeInstanceOf(CaptchaResult);
    expect(task.solution).toBeUndefined();
    expect(task).toHaveProperty('error', 'KEY_DOES_NOT_EXIST');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should terminate task while waiting for first request delay', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
      userAgent: 'userAgent',
    });

    const abortController = new AbortController();
    // abort after 2sec while Solve should wait for 3sec firstRequestDelay
    setTimeout(() => abortController.abort(), 1000 * 2);

    const task = await cmcClient.Solve(
      recaptchaV2Request,
      {
        firstRequestDelay: 1000 * 3,
        firstRequestNoCacheDelay: 0,
        requestsInterval: 1000 * 100,
        timeout: 1000 * 180,
      },
      abortController,
    );

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","websiteURL":"websiteURL","websiteKey":"websiteKey","userAgent":"userAgent"},"softId":54}',
    );
    expect(task).toBeInstanceOf(CaptchaResult);
    expect(task.solution).toBeUndefined();
    expect(task).toHaveProperty('error', ErrorType.Timeout);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should terminate task while waiting for first request delay by nocache', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"gRecaptchaResponse":"answer"}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
      userAgent: 'userAgent',
      nocache: true,
    });

    const abortController = new AbortController();
    // abort after 1sec while Solve should wait for 2sec firstRequestNoCacheDelay
    setTimeout(() => abortController.abort(), 1000 * 1);

    const task = await cmcClient.Solve(
      recaptchaV2Request,
      {
        firstRequestDelay: 1000 * 100,
        firstRequestNoCacheDelay: 1000 * 2,
        requestsInterval: 1000 * 100,
        timeout: 1000 * 180,
      },
      abortController,
    );

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","nocache":true,"websiteURL":"websiteURL","websiteKey":"websiteKey","userAgent":"userAgent"},"softId":54}',
    );
    expect(task).toBeInstanceOf(CaptchaResult);
    expect(task.solution).toBeUndefined();
    expect(task).toHaveProperty('error', ErrorType.Timeout);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should return failed task by whole timeout', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"processing"}', responseDelay: 2000 },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
    });

    const task = await cmcClient.Solve(recaptchaV2Request, {
      firstRequestDelay: 0,
      firstRequestNoCacheDelay: 0,
      requestsInterval: 1000 * 100,
      timeout: 1000,
    });

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTask","websiteURL":"websiteURL","websiteKey":"websiteKey"},"softId":54}',
    );
    expect(task).toBeInstanceOf(CaptchaResult);
    expect(task.solution).toBeUndefined();
    expect(task).toHaveProperty('error', ErrorType.Timeout);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should return failed task by GetTaskResult from server', async () => {
    expect.assertions(4);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":1,"errorCode":"ERROR_TOO_BIG_CAPTCHA_FILESIZE","errorDescription":"The size of the captcha you are uploading is more than 500,000 bytes.","taskId":1234567}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
    });

    const task = await cmcClient.Solve(recaptchaV2Request);

    expect(task).toBeInstanceOf(CaptchaResult);
    expect(task.solution).toBeUndefined();
    expect(task).toHaveProperty('error', 'TOO_BIG_CAPTCHA_FILESIZE');

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should terminate task while waiting for requestsInterval', async () => {
    expect.assertions(3);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"processing"}' },
        { responseBody: '{"errorId":0,"status":"processing"}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const recaptchaV2Request = new RecaptchaV2Request({
      websiteURL: 'websiteURL',
      websiteKey: 'websiteKey',
    });

    const abortController = new AbortController();
    // abort after 2sec while Solve should wait for 2sec requestsInterval
    setTimeout(() => abortController.abort(), 1000 * 1);

    try {
      await cmcClient.Solve(
        recaptchaV2Request,
        {
          firstRequestDelay: 0,
          firstRequestNoCacheDelay: 0,
          requestsInterval: 1000 * 2,
          timeout: 1000 * 180,
        },
        abortController,
      );
    } catch (err) {
      expect(err).toBeDefined();
      expect(srv.caughtRequests.length).toBe(2);
    }

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve Complex Image Recaptcha Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"answer":[true, false]}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const complexImageRecaptchaRequest = new ComplexImageRecaptchaRequest({
      imageUrls: ['https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg'],
      metaData: {
        Grid: '3x3',
        Task: 'Please click each image containing a mountain',
        TaskDefinition: '/m/015qff',
      },
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
    });

    const task = await cmcClient.Solve(complexImageRecaptchaRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"ComplexImageTask","class":"recaptcha","imageUrls":["https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg"],"metadata":{"Grid":"3x3","Task":"Please click each image containing a mountain","TaskDefinition":"/m/015qff"},"websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.answer', [true, false]);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve Complex Image HCaptcha Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"answer":[true, false]}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const complexImageHCaptchaRequest = new ComplexImageHCaptchaRequest({
      imageUrls: ['https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg'],
      metaData: {
        Task: 'Please click each image containing a mountain',
      },
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
    });

    const task = await cmcClient.Solve(complexImageHCaptchaRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"ComplexImageTask","class":"hcaptcha","imageUrls":["https://i.postimg.cc/yYjg75Kv/payloadtraffic.jpg"],"metadata":{"Task":"Please click each image containing a mountain"},"websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.answer', [true, false]);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve Complex Image FunCaptcha Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        { responseBody: '{"errorId":0,"status":"ready","solution":{"answer":[false, false, false, true, false, false]}}' },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const complexImageFunCaptchaRequest = new ComplexImageFunCaptchaRequest({
      imageUrls: ['https://i.postimg.cc/gkzX19Gr/funcaptcha.jpg'],
      metaData: {
        Task: 'Pick the elephant',
      },
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
    });

    const task = await cmcClient.Solve(complexImageFunCaptchaRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"ComplexImageTask","class":"funcaptcha","imageUrls":["https://i.postimg.cc/gkzX19Gr/funcaptcha.jpg"],"metadata":{"Task":"Pick the elephant"},"websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.answer', [false, false, false, true, false, false]);

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve TenDI Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"data": {"randstr": "@EcL", "ticket": "tr03lHUhdnuW3neJZu.....7LrIbs*"}, "headers": { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" }}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const tenDIRequest = new TenDIRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
    });

    const task = await cmcClient.Solve(tenDIRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","class":"TenDI"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.data', { randstr: '@EcL', ticket: 'tr03lHUhdnuW3neJZu.....7LrIbs*' });

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve TenDI Task with Proxy', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"data": {"randstr": "@EcL", "ticket": "tr03lHUhdnuW3neJZu.....7LrIbs*"}, "headers": { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" }}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const tenDIRequest = new TenDIRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });

    const task = await cmcClient.Solve(tenDIRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","class":"TenDI","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.data', { randstr: '@EcL', ticket: 'tr03lHUhdnuW3neJZu.....7LrIbs*' });

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve Basilisk Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"data": {"captcha_response": "5620301f30daf284b829fba66fa9b3d0"}, "headers": { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" }}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const basiliskRequest = new BasiliskRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
    });

    const task = await cmcClient.Solve(basiliskRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","class":"Basilisk"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.data', { captcha_response: '5620301f30daf284b829fba66fa9b3d0' });

    expect(await srv.destroy()).toBeUndefined();
  });

  it('should solve Basilisk Task with Proxy', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"data": {"captcha_response": "5620301f30daf284b829fba66fa9b3d0"}, "headers": { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" }}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const basiliskRequest = new BasiliskRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });

    const task = await cmcClient.Solve(basiliskRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","class":"Basilisk","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.data', { captcha_response: '5620301f30daf284b829fba66fa9b3d0' });

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve Amazon Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution": { "cookies": { "aws-waf-token": "10115f5b-ebd8-45c7-851e-cfd4f6a82e3e:EAoAua1QezAhAAAA:dp7sp2rXIRcnJcmpWOC1vIu+yq/A3EbR6b6K7c67P49usNF1f1bt/Af5pNcZ7TKZlW+jIZ7QfNs8zjjqiu8C9XQq50Pmv2DxUlyFtfPZkGwk0d27Ocznk18/IOOa49Rydx+/XkGA7xoGLNaUelzNX34PlyXjoOtL0rzYBxMAQy0D1tn+Q5u97kJBjs5Mytqu9tXPIPCTSn4dfXv5llSkv9pxBEnnhwz6HEdmdJMdfur+YRW1MgCX7i3L2Y0/CNL8kd8CEhTMzwyoXekrzBM="}, "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36" }}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const amazonRequest = new AmazonRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
      challengeScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.token.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/challenge.js',
      captchaScript: 'https://41bcdd4fb3cb.610cd090.us-east-1.captcha.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/captcha.js',
      context: 'qoJYgnKsc...aormh/dYYK+Y=',
      iv: 'CgAAXFFFFSAAABVk',
    });

    const task = await cmcClient.Solve(amazonRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"AmazonTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","challengeScript":"https://41bcdd4fb3cb.610cd090.us-east-1.token.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/challenge.js","captchaScript":"https://41bcdd4fb3cb.610cd090.us-east-1.captcha.awswaf.com/41bcdd4fb3cb/0d21de737ccb/cd77baa6c832/captcha.js","websiteKey":"websiteKey","context":"qoJYgnKsc...aormh/dYYK+Y=","iv":"CgAAXFFFFSAAABVk"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.cookies', {
      'aws-waf-token':
        '10115f5b-ebd8-45c7-851e-cfd4f6a82e3e:EAoAua1QezAhAAAA:dp7sp2rXIRcnJcmpWOC1vIu+yq/A3EbR6b6K7c67P49usNF1f1bt/Af5pNcZ7TKZlW+jIZ7QfNs8zjjqiu8C9XQq50Pmv2DxUlyFtfPZkGwk0d27Ocznk18/IOOa49Rydx+/XkGA7xoGLNaUelzNX34PlyXjoOtL0rzYBxMAQy0D1tn+Q5u97kJBjs5Mytqu9tXPIPCTSn4dfXv5llSkv9pxBEnnhwz6HEdmdJMdfur+YRW1MgCX7i3L2Y0/CNL8kd8CEhTMzwyoXekrzBM=',
    });

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve Imperva Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"domains": { "site.com" : { "cookies": { "___utmvc": "NMB", "reese84": "reese84"}} } }}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const impervaRequest = new ImpervaRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      metadata: {
        incapsulaScriptBase64: 'dmFyIF8weGQ2ZmU9Wydce..eDUzXHg2YV',
        incapsulaSessionCookie: 'l/LsGnrvyB9lNhXI8borDKa2IGc',
      },
    });

    const task = await cmcClient.Solve(impervaRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","metadata":{"incapsulaScriptBase64":"dmFyIF8weGQ2ZmU9Wydce..eDUzXHg2YV","incapsulaSessionCookie":"l/LsGnrvyB9lNhXI8borDKa2IGc"},"class":"Imperva"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');

    expect(task).toHaveProperty('solution.domains', { 'site.com': { cookies: { ___utmvc: 'NMB', reese84: 'reese84' } } });

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve Imperva Task with Proxy', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"domains": { "site.com" : { "cookies": { "___utmvc": "NMB", "reese84": "reese84"}} } }}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const impervaRequest = new ImpervaRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      metadata: {
        incapsulaScriptBase64: 'dmFyIF8weGQ2ZmU9Wydce..eDUzXHg2YV',
        incapsulaSessionCookie: 'l/LsGnrvyB9lNhXI8borDKa2IGc',
      },
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });

    const task = await cmcClient.Solve(impervaRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"CustomTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","metadata":{"incapsulaScriptBase64":"dmFyIF8weGQ2ZmU9Wydce..eDUzXHg2YV","incapsulaSessionCookie":"l/LsGnrvyB9lNhXI8borDKa2IGc"},"class":"Imperva","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');

    expect(task).toHaveProperty('solution.domains', { 'site.com': { cookies: { ___utmvc: 'NMB', reese84: 'reese84' } } });

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve Binance Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"token":"captcha#09ba4905a79f44f2a99e44f234439644-ioVA7neog7eRHCDAsC0MixpZvt5kc99maS943qIsquNP9D77","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const binanceRequest = new BinanceRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
      validateId: 'validateId',
      proxy: {
        proxyType: 'http',
        proxyAddress: '8.8.8.8',
        proxyPort: 8080,
        proxyLogin: 'proxyLoginHere',
        proxyPassword: 'proxyPasswordHere',
      },
    });

    const task = await cmcClient.Solve(binanceRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"BinanceTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","validateId":"validateId","proxyType":"http","proxyAddress":"8.8.8.8","proxyPort":8080,"proxyLogin":"proxyLoginHere","proxyPassword":"proxyPasswordHere"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty(
      'solution.token',
      'captcha#09ba4905a79f44f2a99e44f234439644-ioVA7neog7eRHCDAsC0MixpZvt5kc99maS943qIsquNP9D77',
    );

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve Binance Task Proxyless', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody:
            '{"errorId":0,"status":"ready","solution":{"token":"captcha#09ba4905a79f44f2a99e44f234439644-ioVA7neog7eRHCDAsC0MixpZvt5kc99maS943qIsquNP9D77","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const binanceRequest = new BinanceRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle',
      websiteKey: 'websiteKey',
      validateId: 'validateId',
    });

    const task = await cmcClient.Solve(binanceRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"BinanceTask","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=middle","websiteKey":"websiteKey","validateId":"validateId"},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty(
      'solution.token',
      'captcha#09ba4905a79f44f2a99e44f234439644-ioVA7neog7eRHCDAsC0MixpZvt5kc99maS943qIsquNP9D77',
    );

    expect(await srv.destroy()).toBeUndefined();
  });
  it('should solve ComplexImageRecognition Task', async () => {
    expect.assertions(5);

    const srv = await createServerMock({
      responses: [
        { responseBody: '{"errorId":0,"taskId":1234567}' },
        {
          responseBody: '{"errorId":0,"status":"ready","solution":{"answer":[130.90909]}}',
        },
      ],
    });

    const cmcClient = CapMonsterCloudClientFactory.Create(
      new ClientOptions({ clientKey: '<your capmonster.cloud API key>', serviceUrl: `http://localhost:${srv.address.port}` }),
    );

    const binanceRequest = new ComplexImageTaskRecognitionRequest({
      imagesBase64: ['/9xwee/'],
      metaData: { Task: 'oocl_rotate' },
    });

    const task = await cmcClient.Solve(binanceRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"ComplexImageTask","class":"recognition","imagesBase64":["/9xwee/"],"metadata":{"Task":"oocl_rotate"}},"softId":54}',
    );
    expect(srv.caughtRequests[1]).toHaveProperty('body', '{"clientKey":"<your capmonster.cloud API key>","taskId":1234567}');
    expect(task).toHaveProperty('solution');
    expect(task).toHaveProperty('solution.answer', [130.90909]);

    expect(await srv.destroy()).toBeUndefined();
  });
});
