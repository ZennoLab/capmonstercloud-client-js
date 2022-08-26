/**
 * capmonster.cloud recognition modules
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/187269121/How+to+pass+module+name+to+CapMonster+Cloud+using+ApiKey+field+only}
 */
export enum CapMonsterModules {
  Amazon = 'amazon',
  BotDetect = 'botdetect',
  Facebook = 'facebook',
  Gmx = 'gmx',
  Google = 'google',
  Hotmail = 'hotmail',
  MailRu = 'mailru',
  Ok = 'ok',
  OkNew = 'oknew',
  RamblerRus = 'ramblerrus',
  SolveMedia = 'solvemedia',
  Steam = 'steam',
  Vk = 'vk',
  Yandex = 'yandex',
  /**
   * Yandex (two words)
   */
  YandexNew = 'yandexnew',
  YandexWave = 'yandexwave',
  /**
   * All other text captcha types
   */
  Universal = 'universal',
}
