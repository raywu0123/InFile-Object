const fs = require('fs');


function createPersistentObject(path) {
    const writeData = (store) => {
        const s = JSON.stringify(store, null, 2);
        fs.writeFileSync(path, s);
    }

    const createProxy = (data, name, store, value, isSet) => {
        if (isSet) {
            data[name] = value;
            writeData(store);
            return value;
        }
        if (typeof(data[name]) === 'function') {
            return (...args) => {
                const r = data[name](...args);
                writeData(store);
                return r;
            };
        }
        if (
            data[name] === null
            || typeof(data[name]) === 'undefined'
            || typeof(data[name]) === 'boolean'
            || typeof(data[name]) === 'number' 
            || typeof(data[name]) === 'string'
        ) return data[name];
        try {
            const proxy = new Proxy(data[name], {
                get(t, n) {
                    // console.log('CREATE_PROXY_GET', t, n, data, name)
                    return createProxy(data[name], n, store);
                },
                set(t, n, v) {
                    // console.log('CREATE_PROXY_SET', t, n, data, name)
                    return createProxy(data[name], n, store, v, true)
                }
            });
            return proxy;
        } catch (error) {
            console.log(error);
            console.log(data, name, data[name], typeof(data[name]))
            return data[name];
        }
    }
    return new Proxy({}, {
        get(target, name) {
            let data = {};
            if (fs.existsSync(path)) {
                data = JSON.parse(fs.readFileSync(path));
            }
            return createProxy(data, name, data);
        },
        set(target, name, value) {
            let data = {};
            if (fs.existsSync(path)) {
                data = JSON.parse(fs.readFileSync(path));
            }
            return createProxy(data, name, data, value, true);
        }
    });
}

module.exports = createPersistentObject;
