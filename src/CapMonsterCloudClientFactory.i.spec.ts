import { createServerMock } from '../tests/helpers';
import { CapMonsterCloudClientFactory } from './CapMonsterCloudClientFactory';
import { CaptchaResult } from './CaptchaResult';
import { ClientOptions } from './ClientOptions';
import { ErrorType } from './ErrorType';
import { RecaptchaV2ProxylessRequest } from './Requests/RecaptchaV2ProxylessRequest';
import { RecaptchaV2Request } from './Requests/RecaptchaV2Request';
import { HCaptchaProxylessRequest } from './Requests/HCaptchaProxylessRequest';
import { ComplexImageRecaptchaRequest } from './Requests/ComplexImageRecaptchaRequest';
import { ComplexImageHCaptchaRequest } from './Requests/ComplexImageHCaptchaRequest';
import { ComplexImageFunCaptchaRequest } from './Requests/ComplexImageFunCaptchaRequest';
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

    const recaptchaV2ProxylessRequest = new RecaptchaV2ProxylessRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
    });

    const task = await cmcClient.Solve(recaptchaV2ProxylessRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTaskProxyless","websiteURL":"https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd"},"softId":54}',
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

    const HRecaptachRequest = new HCaptchaProxylessRequest({
      websiteURL: 'https://lessons.zennolab.com/captchas/hcaptcha/?level=easy',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
      fallbackToActualUA: true,
    });

    const task = await cmcClient.Solve(HRecaptachRequest);

    expect(srv.caughtRequests[0]).toHaveProperty(
      'body',
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"HCaptchaTaskProxyless","websiteURL":"https://lessons.zennolab.com/captchas/hcaptcha/?level=easy","websiteKey":"6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd"},"softId":54}',
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
      proxyType: 'http',
      proxyAddress: '8.8.8.8',
      proxyPort: 8080,
      proxyLogin: 'proxyLoginHere',
      proxyPassword: 'proxyPasswordHere',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.132 Safari/537.36',
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTaskProxyless","websiteURL":"websiteURL","websiteKey":"websiteKey","userAgent":"userAgent"},"softId":54}',
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTaskProxyless","nocache":true,"websiteURL":"websiteURL","websiteKey":"websiteKey","userAgent":"userAgent"},"softId":54}',
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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
      '{"clientKey":"<your capmonster.cloud API key>","task":{"type":"NoCaptchaTaskProxyless","websiteURL":"websiteURL","websiteKey":"websiteKey"},"softId":54}',
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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

    const recaptchaV2Request = new RecaptchaV2ProxylessRequest({
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
});
