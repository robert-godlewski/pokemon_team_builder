// Utilizing a cache so that we don't overload the api
class Cache {
    constructor(size=25, max_calls=100) {
        this.size = size;
        this.max_calls = max_calls;
        this.current_calls = 0; // need to create a function based on time to reset this every day so that we can access the data.
        this.data = {};
    };

    isFull() {
        if (Object.keys(this.data).length < this.size) {
            return false;
        } else {
            return true;
        };
    };

    incrementCalls() {
        this.current_calls++;
    };

    callsLeft() {
        return this.max_calls-this.current_calls;
    };

    getTimesCalled(url) {
        if (url in this.data) {
            if ('times_called' in this.data[url]) {
                return this.data[url]['times_called'];
            };
        };
        return 0;
    };

    isRecentlyCalled(url) {
        if (url in this.data) {
            if ('recently_called' in this.data[url]) {
                return this.data[url]['recently_called'];
            };
        };
        return false;
    }

    _incrementItemCalled(key) {
        // key is the api url
        if (key in this.data) {
            if ('times_called' in this.data[key]) {
                this.data[key]['times_called']++;
            };
            if (this.isRecentlyCalled(key)) {
                this.data[key]['recently_called'] = false
            };
        };
    };

    getDetails(url) {
        if (url in this.data) {
            this._incrementItemCalled(url);
            return this.data[url]['details'];
        };
    };

    add(url, res) {
        /*
        url is a string
        res is an object
        */
        if (this.callsLeft() > 0) {
            if (this.isFull()) {
                this.remove();
            };
            let newKey = url;
            this.data[newKey] = {
                times_called: 1,
                recently_called: true,
                details: res
            };
        };
    };

    _getPossibleKeys() {
        // Finds and returns an array of possible keys to remove from the cache
        // Helper function for remove()
        let leastNumCalls = 100;
        let possibleKeys = [];
        for (let key in this.data) {
            if ('times_called' in this.data[key]) {
                if (leastNumCalls > this.data[key]['times_called']) {
                    possibleKeys = [key];
                    leastNumCalls = this.data[key]['times_called'];
                } else if (leastNumCalls === this.data[key]['times_called']) {
                    possibleKeys.push(key);
                };
            };
        };
        return possibleKeys;
    };

    remove() {
        // takes out an item from the cache based on the lowest value
        let possibleKeys = this._getPossibleKeys();
        let removeKey = '';
        if (possibleKeys.length === 1) {
            removeKey = possibleKeys[0];
        } else {
            let index = 0;
            let i = 0;
            while (index === 0 && i < possibleKeys.length) {
                if ('recently_called' in this.data[possibleKeys[i]]) {
                    if (!this.data[possibleKeys[i]]['recently_called']) {
                        index = i;
                    };
                };
                i++;
            };
            removeKey = possibleKeys[index];
        };
        delete this.data[removeKey];
    };

    pop(url) {
        // unlike remove this will remove a specific key in the cache based on the url
        let details = this.getDetails(url);
        delete this.data[url];
        return details;
    };
};


export default Cache;