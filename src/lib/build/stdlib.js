/*
STANDARD LIBRARIES FOR DEVELOPMENT
CONTAINS: lib/async.js, lib/cloak.js, lib/cookie.js, lib/encryption.js, lib/firebase.js, lib/random.js, lib/ui.js
LAST UPDATE: 2/11/2026 19:50 GMT-05:00
*/
const TimeUnit = {
    ms: 1,
    msec: 1,
    millisecond: 1,
    milliseconds: 1,
    milis: 1,
    sec: 1000,
    second: 1000,
    seconds: 1000,
    s: 1000,
    hr: 3600000,
    hour: 3600000,
    h: 3600000,
    hours: 3600000,
    hrs: 3600000,
    min: 60000,
    minute: 60000,
    minutes: 60000,
    m: 60000
}
const delay = (u, unit = TimeUnit.msec) => new Promise(resolve => setTimeout(resolve, (u * unit)));
const getjson = (url, query, callback) => fetch(url + "?" + (new URLSearchParams(query)).toString()).then(data => {data.json()}).then(data => {callback(data)}).catch(error => {throw new Error(error)});
const Cloak = {
    open: function(settings) {
        var a=window.open();
        var b=a.document.createElement("iframe");
        var c=a.document.createElement("link");
        c.rel="icon";
        c.href=Cloak.undef(settings.favicon, "");
        c.type="image/x-icon";
        a.document.head.appendChild(c);
        b.style.width="100%";
        b.style.height="100%";
        b.style.border="none";
        b.src=Cloak.undef(settings.url, "");
        a.document.body.appendChild(b);
        a.document.title=Cloak.undef(settings.title, "");
        a.document.body.style.margin="0px";
    },
    undef: (a,b) => a === undefined ? b : a,
}
const Cookies = {
    retrieve: function(a) {
        const b = `; ${document.cookie};`;
        const c = b.split(`; ${a}=`);
        if (c.length === 2) return c.pop().split(';').shift();
        return null;
    },
    store: function(key,value) {
        Cookies.storeWithTime(key, value, 2419200000);
    },
    storeWithTime: function(key, value, ms) {
        document.cookie = `${key}=${value}; expires=${new Date(Date.now() + ms).toUTCString()}; path=/`;
        console.log(`Stored cookie ${key} with value ${value} and lifetime ${ms}`);
    }
}
const db = {
    initialized: false,
    setup: e => db.initialized ? (console.log("firebase already initialized."), Promise.resolve()) : new Promise(((i, r) => {
        const t = document.createElement("script");
        t.src = "https://static1.codehs.com/cdn/chsfirebase/latest/chsfirebase.min.js", document.head.appendChild(t), t.onload = () => {
            try {
                firebase.initialize({
                    projectName: e
                }), db.initialized = true, console.log("firebase project " + e + " initialized"), i()
            } catch (e) {
                r(e)
            }
        }, t.onerror = () => r("failed to load firebase script")
    })),
    create_key: e => {
        if (!db.initialized) return void console.log("firebase project not initialized");
        const i = firebase.database().ref(e);
        return console.log("created " + e), i
    },
    set_in_db: (e, i) => db.initialized ? new Promise(((r, t) => {
        i = i;
        db.create_key(e).set(i, (o => {
            o ? (console.error("error setting value in firebase:", o), t(o)) : (console.log("set '" + JSON.stringify(i) + "' as '" + e + "' in firebase."), r())
        }))
    })) : (console.log("firebase project not initialized"), Promise.reject("firebase project not initialized")),
    get_from_db: async e => {
        if (!db.initialized) return Promise.reject("firebase project not initialized");
        if (!e) return Promise.reject("enter valid key.");
        try {
            const i = await new Promise(((i, r) => {
                db.create_key(e).on("value", (e => {
                    e ? i(e) : r("no data stored as key.")
                }))
            }));
            return console.log("value retrieved for '" + e + "' is '" + JSON.stringify(i) + "'"), i
        } catch (e) {
            return "no data stored as key." === e ? console.log(e) : console.error("error retrieving data: " + e), null
        }
    }
};
const random = {
    numeric: (e = 0, i = 9, r = true) => {
        e > i && ([e, i] = [i, e]);
        const t = Math.random() * (i - e) + e;
        return (r ? Math.round(t) : t).toString()
    },
    alphabetic: (e = 6) => Array.from({
        length: e
    }, (() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ" [Math.floor(26 * Math.random())])).join(""),
    alpha_numeric: (e = 6) => Array.from(window.crypto.getRandomValues(new Uint8Array(e)), (e => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" [e % 62])).join(""),
    base_64: (e = 8) => Array.from(window.crypto.getRandomValues(new Uint8Array(e)), (e => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [e % 64])).join(""),
    hex: (e = 8) => Array.from(window.crypto.getRandomValues(new Uint8Array(e)), (e => "0123456789ABCDEF" [e % 16])).join(""),
    array_element: (arr = []) => arr[Math.floor(Math.random() * arr.length)],
};
const rand = random;
const Random = random;
const UIJS = {
    Element: class {
        constructor(selector) {this.elem = document.querySelectorAll(selector);}
        background_color(color) {this.style("background-color", color);return this;}
        font(font_family) {this.style("font-family", font_family);return this;}
        text_color(color) {this.style("color", color);return this;}
        background_rotation(background_list, milis) {
            background_list = UIJS.Image.getImageURL(background_list);
            this.style("background-image", background_list[Math.floor(Date.now() / milis) % background_list.length]);
            this.style("background-size", "cover");
            this.style("background-attachment", "fixed");
            this.style("background-position", "center center")
            return this;
        }
        style(property, value) {
            property.charAt(0).toUpperCase()
            
            this.elem.forEach((a) => {
                a.style[property] = value;
            })
            return this;
        }
        getElement(selector) {
            return new UIJS.Element(selector);
        }
    },
    Image: class {
        constructor(url) {this.url = url;}
        static getImageURL(x) {
            if (Array.isArray(x)) {
                for (let y in x) {
                    x[y] = UIJS.Image.getImageURL(x[y]);
                }
                return x;
            } else if (typeof x == "string") {return "url(\"" + x + "\")"
            } else if (x instanceof UIJS.Image) {return x.url;
            } else {
                throw new TypeError("Isn't of UIJS.Image, String, or Array!");
                return x;
            }
        }
    },
    getElement(selector) {
        return new UIJS.Element(selector);
    },
    start() {
        document.querySelectorAll("html, body").forEach((a) => {
            a.style["top"] = 0;
            a.style["left"] = 0;
            a.style["margin"] = 0;
            a.style["top"] = 0;
            a.style["height"] = "100%";
            a.style["width"] = "100%";
        });
        return this;
    }
};
const encryption = {
  stringToUint8Array: e => new TextEncoder().encode(e),

  padKey: (e, t) => {
    if (e.length >= t) return e.slice(0, t);
    const r = crypto.getRandomValues(new Uint8Array(t - e.length));
    return new Uint8Array([...e, ...r]);
  },

  sha_256: async e => {
    const t = new TextEncoder().encode(e);
    const r = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(r))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  },

  aes_256: {
    encrypt: async (plaintext, keyStr) => {
      const iv = crypto.getRandomValues(new Uint8Array(16));
      const keyBytes = encryption.stringToUint8Array(keyStr);
      const key = encryption.padKey(keyBytes, 32);

      const importedKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC" },
        false,
        ["encrypt", "decrypt"]
      );

      const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        importedKey,
        encryption.stringToUint8Array(plaintext)
      );

      const combined = new Uint8Array([...iv, ...new Uint8Array(ciphertext)]);
      return btoa(String.fromCharCode(...combined));
    },

    decrypt: async (base64Cipher, keyStr) => {
      const combined = new Uint8Array(atob(base64Cipher).split("").map(c => c.charCodeAt(0)));
      const iv = combined.slice(0, 16);
      const ciphertext = combined.slice(16);

      const keyBytes = encryption.stringToUint8Array(keyStr);
      const key = encryption.padKey(keyBytes, 32);

      const importedKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "AES-CBC" },
        false,
        ["encrypt", "decrypt"]
      );

      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CBC", iv },
        importedKey,
        ciphertext
      );

      return new TextDecoder().decode(decrypted);
    }
  }
};
