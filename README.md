# CapMonster Cloud Node.js SDK: TypeScript CAPTCHA Solver & Anti-Bot API Client

<p align="center">
  <a href="https://capmonster.cloud/en/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme">
    <img src="https://img.shields.io/badge/CapMonster%20Cloud-Node.js%20Captcha%20Solver-00B2FF?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="CapMonster Cloud Node.js SDK" height="40">
  </a>
</p>

<p align="center">
  <strong>Official Node.js and TypeScript SDK for automated CAPTCHA solving in web scraping, browser automation, and testing workflows.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zennolab_com/capmonstercloud-client"><img src="https://img.shields.io/npm/v/@zennolab_com/capmonstercloud-client.svg?style=flat-square&color=blue" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@zennolab_com/capmonstercloud-client"><img src="https://img.shields.io/npm/dm/@zennolab_com/capmonstercloud-client.svg?style=flat-square&color=green" alt="npm downloads"></a>
  <a href="https://github.com/CapMonsterCloud/capmonster-nodejs-captcha-solver/stargazers"><img src="https://img.shields.io/github/stars/CapMonsterCloud/capmonster-nodejs-captcha-solver?style=flat-square&color=yellow" alt="GitHub Stars"></a>
  <a href="https://github.com/CapMonsterCloud/capmonster-nodejs-captcha-solver/network/members"><img src="https://img.shields.io/github/forks/CapMonsterCloud/capmonster-nodejs-captcha-solver?style=flat-square" alt="GitHub Forks"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-orange.svg?style=flat-square" alt="License: MIT"></a>
</p>

---

Official JavaScript and TypeScript client library for [CapMonster Cloud](https://capmonster.cloud/en/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme). Add automated CAPTCHA-solving tasks to **Node.js, TypeScript, Puppeteer, Playwright, Cypress, and HTTP-based** workflows.

Use the SDK with supported CAPTCHA and anti-bot task types, including **reCAPTCHA v2/v3/Enterprise, Cloudflare Turnstile, GeeTest, DataDome, Amazon WAF, Imperva, and image-to-text tasks**.

**[👉 Get your Free API Key & Free Trial Balance on CapMonster Cloud](https://dash.capmonster.cloud/Account/SignUp?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)**

---

## ⚡ Highlights

- ⚡ **Node.js & TypeScript:** Typed request models for supported task types.
- 🧩 **Modern CAPTCHA coverage:** Work with reCAPTCHA, Turnstile, GeeTest, Amazon WAF, DataDome, Imperva, and more.
- 🌐 **Automation-ready:** Use with Playwright, Puppeteer, Cypress, scraping tools, and custom HTTP clients.
- 🛠️ **Dedicated or custom payloads:** Use request classes or `CommonCaptcha` to submit a full task payload.
- 📖 **Official docs:** Current task parameters and API methods are maintained in CapMonster Cloud documentation.

---

## 📦 Installation

Install the package from npm:

```bash
npm install @zennolab_com/capmonstercloud-client
```

The package published on npm already includes the compiled files and is ready to use after installation.

### Build from this repository

Git does not contain the compiled `dist` output. The examples below import `@zennolab_com/capmonstercloud-client`, and inside this repository that name points at `dist`. After cloning, install dependencies and build before running an example or a test:

```bash
npm install
npm run build
```

Run `npm run build` again after changing the source.

---

## 🚀 Quick Start

Create an API key in the [CapMonster Cloud Dashboard](https://dash.capmonster.cloud/Account/SignUp?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme), install the package, then use one of the examples below.

### 1. Solve reCAPTCHA v2 (TypeScript)

```ts
import {
  CapMonsterCloudClientFactory,
  ClientOptions,
  RecaptchaV2Request,
} from '@zennolab_com/capmonstercloud-client';

const client = CapMonsterCloudClientFactory.Create(
  new ClientOptions({ clientKey: 'YOUR_API_KEY' }),
);

const result = await client.Solve(
  new RecaptchaV2Request({
    websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
    websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
  }),
);

console.log(result.solution);
```

### 2. Solve Cloudflare Turnstile (TypeScript)

```ts
import {
  CapMonsterCloudClientFactory,
  ClientOptions,
  TurnstileRequest,
} from '@zennolab_com/capmonstercloud-client';

const client = CapMonsterCloudClientFactory.Create(
  new ClientOptions({ clientKey: 'YOUR_API_KEY' }),
);

const result = await client.Solve(
  new TurnstileRequest({
    websiteURL: 'https://tsinvisble.zlsupport.com',
    websiteKey: '0x4AAAAAAABUY0VLtOUMAHxE',
  }),
);

console.log(result.solution);
```

### 3. CommonJS Example and Balance Check

```javascript
const {
  CapMonsterCloudClientFactory,
  ClientOptions,
  RecaptchaV2Request,
} = require('@zennolab_com/capmonstercloud-client');

async function run() {
  const client = CapMonsterCloudClientFactory.Create(
    new ClientOptions({ clientKey: 'YOUR_API_KEY' }),
  );

  console.log('Balance:', await client.getBalance());

  const task = new RecaptchaV2Request({
    websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
    websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
  });

  const result = await client.Solve(task);
  console.log(result.solution);
}

run().catch(console.error);
```

### 4. Submit a Custom Payload with `CommonCaptcha`

Use `CommonCaptcha` when you need to provide a complete task payload directly.

```javascript
const {
  CapMonsterCloudClientFactory,
  ClientOptions,
  CommonCaptcha,
} = require('@zennolab_com/capmonstercloud-client');

async function run() {
  const client = CapMonsterCloudClientFactory.Create(
    new ClientOptions({ clientKey: 'YOUR_API_KEY' }),
  );

  const task = new CommonCaptcha({
    task: {
      type: 'RecaptchaV2Task',
      websiteURL: 'https://lessons.zennolab.com/captchas/recaptcha/v2_simple.php?level=high',
      websiteKey: '6Lcg7CMUAAAAANphynKgn9YAgA4tQ2KI_iqRyTwd',
    },
  });

  console.log(await client.Solve(task));
}

run().catch(console.error);
```

---

## 🛡️ Supported Task Families

Refer to the official [Supported CAPTCHA Types](https://docs.capmonster.cloud/docs/captchas/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme) for current task parameters, response formats, and examples.

| Task family | Example request classes in this SDK |
| :--- | :--- |
| **reCAPTCHA** | `RecaptchaV2Request`, `RecaptchaV2EnterpriseRequest`, `RecaptchaV3ProxylessRequest` |
| **Cloudflare Turnstile** | `TurnstileRequest` |
| **GeeTest** | `GeeTestRequest` |
| **Amazon WAF** | `AmazonRequest`, `AmazonProxylessRequest` |
| **Image-to-Text** | `ImageToTextRequest` |
| **Complex image tasks** | `ComplexImageRecaptchaRequest`, `ComplexImageTaskRecognitionRequest` |
| **Custom anti-bot tasks** | `DataDomeRequest`, `ImpervaRequest`, `TenDIRequest`, `ProsopoRequest`, `BasiliskRequest` |

---

## 🌐 Browser Use

The package can also be bundled for browser use. Browser implementations use native [`fetch`](https://caniuse.com/fetch), so use a compatible module bundler such as [Webpack](https://webpack.js.org/) when integrating it into a frontend build.

> Keep API keys private. Do not expose production CapMonster Cloud API keys in public frontend code.

---

## 🐛 Debugging

Set the `DEBUG` environment variable to enable the package logger:

```bash
DEBUG=cmc-* node app.js
```

---

## 🛠️ How It Works

```text
[ Node.js Script / Browser Automation ]
                    │
                    ▼
      [ Create task request with target data ]
                    │
                    ▼
[ CapMonster Cloud Node.js SDK ] ──► createTask API request
                    │
                    ▼
       [ SDK waits for the task result ]
                    │
                    ▼
[ Receive token / solution ] ──► Use it in your workflow
```

---

## ⚙️ Best Practices

- **Use the right task model:** Choose a request type that matches the target protection; validate all required fields against the official documentation.
- **Keep session context consistent:** For tasks that use a proxy, align the proxy settings with the associated browser or scraping session.
- **Use tokens promptly:** CAPTCHA tokens can expire, so submit or inject the returned solution immediately.
- **Monitor balance and API responses:** See the API methods reference for `createTask`, `getTaskResult`, and `getBalance`.

---

## 📚 Documentation & Support

- 📖 [Getting Started](https://docs.capmonster.cloud/docs/getting-start/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)
- 🧩 [Supported CAPTCHA Types](https://docs.capmonster.cloud/docs/captchas/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)
- ⚙️ [API Methods: createTask, getTaskResult, getBalance](https://docs.capmonster.cloud/docs/methods/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)
- 🌐 [Browser Extension Guides](https://docs.capmonster.cloud/docs/extension/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)
- 💬 [CapMonster Cloud](https://capmonster.cloud/en/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)

## Other official SDKs

- [Python](https://github.com/CapMonsterCloud/capmonster-python-captcha-solver)
- [.NET](https://github.com/CapMonsterCloud/capmonster-dotnet-captcha-solver)
- [n8n](https://github.com/CapMonsterCloud/capmonster-n8n-captcha-solver)
- [API Docs](https://github.com/CapMonsterCloud/capmonster-captcha-solver-docs)

---

## 📄 License

[MIT](./LICENSE) © [ZennoLab](https://zennolab.com/) / [CapMonster Cloud](https://capmonster.cloud/en/?utm_source=github&utm_medium=referral&utm_campaign=nodejs_repo_readme)

## Maintainer verification before QA

Run `npm run self-verify` to build and check README examples, CommonJS/ESM,
public type contracts and SDK requests against a local mock API. Read
[the self-verification guide](tools/self-verify/README.md) for configuration,
the AI-agent review prompt, coverage limits and report interpretation.
The generated report is evidence for the agent's documentation review;
a passing mock run alone does not establish QA readiness.
