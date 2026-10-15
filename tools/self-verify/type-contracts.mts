import { AlibabaRequest, HuntRequest, CapMonsterCloudClientFactory, ClientOptions } from '@zennolab_com/capmonstercloud-client';

const client = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: 'compile-only' }));
const task = new AlibabaRequest({
  websiteURL: 'https://example.com',
  metadata: { punishUrl: 'https://example.com/punish', cookieRequired: false },
});
const result = await client.Solve(task);
const cookie: string | undefined = result.solution?.domains?.['example.com'].cookies.x5sec;
const tokens: string | undefined = result.solution?.data?.tokens;
void cookie;
void tokens;
new HuntRequest({
  websiteURL: 'https://example.com',
  metadata: { apiGetLib: 'https://example.com/api.js', widgetUrl: 'https://example.com/widget' },
  proxy: { proxyType: 'http', proxyAddress: '127.0.0.1', proxyPort: 8080 },
});
// @ts-expect-error cookieRequired must remain boolean
new AlibabaRequest({ websiteURL: 'https://example.com', metadata: { punishUrl: 'https://example.com/punish', cookieRequired: 'true' } });

// Documented payloads must remain usable through the public package API.
import {
  AmazonRequest,
  AltchaRequest,
  ComplexImageTaskRecognitionRequest,
  RecaptchaV2Request,
  ImageToTextRequest,
  CapMonsterModules,
  TSPDRequest,
} from '@zennolab_com/capmonstercloud-client';

const amazon = () =>
  client.Solve(
    new AmazonRequest({
      websiteURL: 'https://example.com',
      websiteKey: 'key',
      captchaScript: 'https://example.com/jsapi.js',
      cookieSolution: true,
    }),
  );
const amazonSolution: NonNullable<Awaited<ReturnType<typeof amazon>>['solution']> = {
  cookies: { 'aws-waf-token': 'cookie' },
  userAgent: 'ua',
};
const wafCookie: string = amazonSolution.cookies['aws-waf-token'];
const amazonTokens: NonNullable<Awaited<ReturnType<typeof amazon>>['solution']> = { captcha_voucher: 'voucher', existing_token: 'token' };
void wafCookie;
void amazonTokens;

const altcha = () =>
  client.Solve(
    new AltchaRequest({
      websiteURL: 'https://example.com',
      websiteKey: '',
      metadata: { challenge: 'hash', iterations: '5000', salt: 'salt', signature: 'signature' },
    }),
  );
const altchaSolution: NonNullable<Awaited<ReturnType<typeof altcha>>['solution']> = { data: { token: 'token', number: 42 } };
const altchaToken: string = altchaSolution.data.token;
void altchaToken;
// @ts-expect-error number belongs inside data
const oldAltcha: NonNullable<Awaited<ReturnType<typeof altcha>>['solution']> = { number: 42 };
void oldAltcha;

const recognition = () => client.Solve(new ComplexImageTaskRecognitionRequest({ imagesBase64: ['base64'], metaData: { Task: 'shein' } }));
type RecognitionSolution = NonNullable<Awaited<ReturnType<typeof recognition>>['solution']>;
const coordinates: RecognitionSolution = { answer: [{ X: 69, Y: 201.9 }], metadata: { AnswerType: 'Coordinate' } };
const text: RecognitionSolution = { answer: '109', metadata: { AnswerType: 'Text' } };
const audio: RecognitionSolution = { answer: [6, 8, 4], metadata: { AnswerType: 'Text' } };
const grid: RecognitionSolution = { answer: [true, false], metadata: { AnswerType: 'Grid' } };
const rotation: RecognitionSolution = { answer: [130.9], metadata: { AnswerType: 'NumericArray' } };
void [coordinates, text, audio, grid, rotation];
// @ts-expect-error coordinates must contain numeric X/Y
const invalidCoordinates: RecognitionSolution = { answer: [{ X: '69', Y: 201 }] };
void invalidCoordinates;

const recaptcha = () => client.Solve(new RecaptchaV2Request({ websiteURL: 'https://example.com', websiteKey: 'key' }));
const recaptchaSolution: NonNullable<Awaited<ReturnType<typeof recaptcha>>['solution']> = {
  gRecaptchaResponse: 'token',
  userAgent: 'ua',
  cookies: { nocookies: 'true' },
};
void recaptchaSolution;
new ImageToTextRequest({ body: 'base64', CapMonsterModule: CapMonsterModules.BlsText });
new ImageToTextRequest({ body: 'base64', CapMonsterModule: 'my_custom_module' });
// @ts-expect-error module name must be a string
new ImageToTextRequest({ body: 'base64', CapMonsterModule: 42 });
new TSPDRequest({
  websiteURL: 'https://example.com',
  metadata: { tspdCookie: 'cookie', htmlPageBase64: 'base64' },
  proxy: { proxyType: 'http', proxyAddress: '1.2.3.4', proxyPort: 8080 },
});
