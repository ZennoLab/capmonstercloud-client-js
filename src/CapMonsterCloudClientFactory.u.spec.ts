import { CapMonsterCloudClient } from './CapMonsterCloudClient';
import { CapMonsterCloudClientFactory } from './CapMonsterCloudClientFactory';
import { ClientOptions } from './ClientOptions';

describe('Check unit tests for CapMonsterCloudClientFactory()', () => {
  it('should create instance of CapMonsterCloudClient', () => {
    const cmcClient = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: '<your capmonster.cloud API key>' }));

    expect(cmcClient).toBeDefined();
    expect(cmcClient).toBeInstanceOf(CapMonsterCloudClient);
  });
});
