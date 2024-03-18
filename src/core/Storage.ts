import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static keys = Object.freeze({
    loginDto: 'loginDto',
    fcmToken: 'fcmToken',
    cityName: 'cityName',
    cityId: 'cityId',
    firstLaunch: 'firstLaunch',
    language: 'language',
  });
  static async setItemAsync(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async getItemAsync(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  static async existAsync(key: string): Promise<boolean> {
    const value = await AsyncStorage.getItem(key);
    return !!value;
  }

  static async deleteItemAsync(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async logout(): Promise<void> {
    const fcmToken = await this.getItemAsync(this.keys.fcmToken);
    const fistTime = await this.getItemAsync(this.keys.firstLaunch);
    const language = await this.getItemAsync(this.keys.language);
    await AsyncStorage.clear();
    await this.setItemAsync(this.keys.fcmToken, fcmToken ?? '');
    await this.setItemAsync(this.keys.firstLaunch, fistTime ?? 'false');
    await this.setItemAsync(this.keys.language, language ?? '');
  }
}
