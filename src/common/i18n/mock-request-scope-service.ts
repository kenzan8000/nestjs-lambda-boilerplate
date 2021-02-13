import { translateOptions } from "nestjs-i18n";

export class MockI18nRequestScopeService {
  public async translate(
    key: string, options?: translateOptions,
  ): Promise<any> {
    return Promise.resolve('YOUR FAKE TRANSLATION HERE')
  }
}