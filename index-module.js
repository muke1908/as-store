const asyncStorage = {
	cache:{

	},
	setItem: function(key, value) {
        return new Promise((resolve, reject)=> {

            if(!(key && value)) {
                throw{
					error:"Data not valid. Expected: (key, value)"
				}
            }

    		if(localStorage.getItem('__AS')){
    			var __AS = JSON.parse(localStorage.getItem('__AS'));
    			__AS[key] = value;
    		}else{
    			var __AS = {};
    			__AS[key] = value;
    		}
    		asyncStorage.cache = __AS

    		writeToDisk(__AS, resolve)
        })
	},
	getItem: function(key) {

        if(asyncStorage.cache[key]) {
			console.log('returning from in-mem cache')
			return asyncStorage.cache[key];
		}
		if(localStorage.getItem('__AS')) {
			var __AS = JSON.parse(localStorage.getItem('__AS'));

            if(!asyncStorage.cache) {
                asyncStorage.cache = __AS;
            }

            if(__AS[key]) {
				return __AS[key];
			}else{
				return null;
			}
		}else{
			return null;
		}
	},
	removeItem: function(key) {
		if(localStorage.getItem('__AS')) {
			var __AS = JSON.parse(localStorage.getItem('__AS'));
			var keysArray = Object.keys(__AS);
			for(let x in keysArray) {
				if(keysArray[x] == key) {
					delete(__AS[key]);
				}
			}
			localStorage.setItem('__AS',JSON.stringify(__AS));
			asyncStorage.cache = __AS
		}
	},
	flush: function() {
		localStorage.removeItem('__AS');
	}
}



let writingToDisk = false
function writeToDisk(obj, resolve) {
	const __OBJ = obj;

	if(writingToDisk) {
		console.log('debouncing..')
	}else {
		writingToDisk = true;
		setTimeout(()=>{
			console.log('writing to disk');
			localStorage.setItem('__AS', JSON.stringify(__OBJ));
			writingToDisk = false;
			resolve(__OBJ)
		},500)
	}
}

module.exports = asyncStorage;
