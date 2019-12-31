class LocalStorageService {
  static write (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static read (key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove (key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;