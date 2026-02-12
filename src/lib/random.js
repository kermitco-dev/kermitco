// this was in db for some reason, i moved it
// it was obfuscated then deobfuscated, which
// is why it looks really weird

/*

docs

db.random.numeric(min, max, rounded=true)
    min inclusive, max exclusive. returned value
    is rounded by default

db.random.alphabetic(length)
    returns a random string of letters at the desired
    length

db.random.alphanumeric(length)
    its db.random.alphabetic but alphanumeric

*/

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
