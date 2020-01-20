export default {
  set: (key: string, value: string, expiredDay: number) => {
    const exp: Date = new Date();
    exp.setTime(exp.getTime() + expiredDay * (24 * 60 * 60 * 1000)); // set exp date
    document.cookie =
      key + "=" + value + ";expires=" + exp.toUTCString() + ";path=/";
  },
  get: (key: string) => {
    key += "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const fragCookies = decodedCookie.split(";");
    for (let i = 0; i < fragCookies.length; i++) {
      let cookie = fragCookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(key) === 0) {
        return JSON.parse(cookie.substring(key.length, cookie.length));
      }
    }
    return "";
  },
  delete: (key: string) => {
    var now = new Date();
    // to make 7d before date now
    now.setTime(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    document.cookie = key + "=;expires=" + now + ";path=/";
  }
};
