# Confirmed API contract fixes — 2026-10-15

Scope: the six confirmed SDK/documentation mismatches from the read-only review. Source requirements were reviewed on 2026-10-15. Documentation ambiguities and service-side aliases were not changed.

## Changes and requirements

1. [Amazon](https://docs.capmonster.cloud/docs/captchas/amazon-task/): cookie solution now declares `cookies['aws-waf-token']` and optional `userAgent`; token mode retains `captcha_voucher` and `existing_token`.
2. [Altcha](https://docs.capmonster.cloud/docs/captchas/altcha-task/): solution now declares `data.token` and `data.number`.
3. [Complex Image](https://docs.capmonster.cloud/docs/captchas/compleximage/): recognition response now supports coordinate arrays, strings, numeric arrays and boolean arrays, plus optional `metadata.AnswerType`. Requirements include [shein](https://docs.capmonster.cloud/docs/captchas/compleximage/coordinate/shein/), [mathsum](https://docs.capmonster.cloud/docs/captchas/compleximage/text/mathsum/) and [bills_audio](https://docs.capmonster.cloud/docs/captchas/compleximage/audio/bills_audio/).
4. [reCAPTCHA](https://docs.capmonster.cloud/docs/captchas/no-captcha-task/): shared response declares optional `userAgent` and `cookies` without requiring them in ordinary token responses.
5. [ImageToText modules](https://docs.capmonster.cloud/docs/captchas/ImageToText/module-name/): module name accepts strings for built-in and custom modules; the convenience enum gains 11 documented names and retains existing values.
6. [TSPD](https://docs.capmonster.cloud/docs/captchas/tspd-task/): request User-Agent is optional, including the stored class property; omitted values are absent from JSON.

## Regression coverage

`npm run test-types` compiles public package imports with documented payloads and response fixtures. Negative cases reject a numeric module name, a string coordinate, and the old top-level Altcha number.

The HTTP matrix adds 13 scenarios in each module format: Amazon cookies/tokens, Altcha nested data, reCAPTCHA response context, six Complex Image answer examples, two module names and TSPD without User-Agent. Each scenario verifies response preservation; request-specific checks verify module serialization and omission of User-Agent.

Reproduce all checks with `npm run self-verify`. Individual checks: `npm run build`, `npm run test-types`, `npm run test-modules`.

## Compatibility and limitations

These are public declaration corrections. TypeScript consumers may need to update Amazon/Altcha property access and narrow Complex Image answers. The SDK still forwards API responses unchanged. No real API calls were made.

The six fixes do not resolve ambiguity about legacy NoCaptchaTask support, ImageToText field casing, or conflicting documentation examples. Runtime validation of all conditional field combinations and exhaustive live service compatibility remain outside this change. The mechanical report's QA readiness remains incomplete; no Jira notification was sent.

## Final executed result

Evidence: `latest.json`, generated 2026-10-15T09:34:00.809Z. `npm run self-verify` exited 0: build, type contracts, all 4 README examples, 69 CJS checks and 69 ESM checks passed. Jest passed 75 unit tests and 47 local integration tests. Targeted ESLint and `git diff --check` also passed.
