import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
import LocalStorageService from './localStorage.service';

class CookieService {
  static writeInfo (info) {
    CookieService.write('kerbal-chat-session', info);
  }

  static getInfo (key) {
    const info = CookieService.read('kerbal-chat-session');
    if(info && key) {
      return info[key];
    }
    else {
      return info;
    }
  }

  static write(key, value) {
    value = AES.encrypt(JSON.stringify(value), 'kerbal chat app');
    LocalStorageService.write(key, value.toString());
  }

  static read(key) {
    const value = LocalStorageService.read(key);
    if(!value) {
      return value;
    }
    const decrypt = AES.decrypt(value, 'kerbal chat app');
    const info = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
    return info;
  }

  static remove(key) {
    LocalStorageService.remove(key);
  }
}

export default CookieService;