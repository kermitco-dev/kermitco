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
