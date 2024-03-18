import {makeAutoObservable, runInAction} from 'mobx';
import {Login} from '@/models/Login';
import {Storage} from '@/core/Storage';

class AccountStore {
  /**
   * For authentication purpose
   * only use this userData
   */
  loginDto: Login | null = null;
  /**
   * For latest profile use this userData
   */
  constructor() {
    makeAutoObservable(this);
  }

  get loginData(): Login | null {
    return this.loginDto;
  }

  set loginData(login: Login | null) {
    this.loginDto = login;
  }

  async login(loginDto: Login) {
    await Storage.setItemAsync(Storage.keys.loginDto, JSON.stringify(loginDto));
    runInAction(() => {
      if (loginDto) {
        this.loginDto = loginDto;
        console.log('LOGIN', loginDto);
      }
    });
  }

  async loginAgain() {
    const loginDtoFromStore = await Storage.getItemAsync(Storage.keys.loginDto);
    console.log('LOGIN_DTO_FROM_STORE', loginDtoFromStore);

    runInAction(() => {
      if (loginDtoFromStore) {
        this.loginData = new Login(JSON.parse(loginDtoFromStore).dto);
      }
    });
  }

  isLogin(): boolean {
    // const loginDtoFromStore = Storage.getItemAsync(Storage.keys.loginDto);
    if (this.loginData?.token != null) {
      // return this.user?.token != '';
      return !!this.loginData.token;
    }
    return false;
  }

  logout(): void {
    this.loginData = null;
  }
}

export const accountStore = new AccountStore();
