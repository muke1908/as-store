# Asynchronous local storage
A local storage wrapper, that helps to write data to disk asynchronously. It uses in-mem cache for faster "READ" 

## Install  
`npm install as-store`

## Usage  

### Methods: 
1) `AsyncLS.setItem(key, value)` - set `value` for `key` in `as-store`  
2) `AsyncLS.getItem(key)` - lookup data for `key` from `as-store`  
3) `AsyncLS.removeItem(key)` - remove `key` from `as-store`  
4) `AsyncLS.flush()` - flush all the data from `as-store`  
5) `AsyncLS.onWriteComplete(function)` - attach handler to disk "WRITE". `funciton` will be called when writing to disk.  

### Why it's fast and non-blocking ?
`setItem` - doesn't write the data to disk immediately. Non-blocking. Process multiple write operation at once (with 500ms throttling).  
`getItem` - doesn't read data from disk. It maintain a hash map in client. It directly returns data from memory.  
