/**
 * capmonster.cloud recognition modules
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/187269121/How+to+pass+module+name+to+CapMonster+Cloud+using+ApiKey+field+only}
 */
export enum CapMonsterModules {
  Amazon = 'amazon',
  Apple = 'apple',
  BotDetect = 'botdetect',
  Facebook = 'facebook',
  Gmx = 'gmx',
  Google = 'google',
  Hotmail = 'hotmail',
  MailRu = 'mailru',
  Ok = 'ok',
  OkNew = 'oknew',
  OkEng = 'okeng',
  OkRus = 'okrus',
  PartiallyBlur = 'partiallyblur',
  RamblerRus = 'ramblerrus',
  RamblerRusNew = 'ramblerrusnew',
  SolveMedia = 'solvemedia',
  Steam = 'steam',
  Vk = 'vk',
  Yandex = 'yandex',
  /**
   * Yandex (two words)
   */
  YandexNew = 'yandexnew',
  YandexWave = 'yandexwave',
  YandexWaveLatin = 'yandexwavelatin',
  Whatsapp = 'whatsapp',
  WikimediaPaddleEnsemble = 'wikimedia_paddle_ensemble',
  CaptchaMath = 'captcha_math',
  Sat = 'sat',
  BlsText = 'bls_text',
  /**
   * All other text captcha types
   */
  Universal = 'universal',
}
