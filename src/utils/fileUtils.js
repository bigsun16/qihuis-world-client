import SparkMD5 from "spark-md5";

// const md5WorkerUrl = new URL('./md5Worker.js', import.meta.url).href;
const sha256WorkerUrl = new URL('sha256Worker.js', import.meta.url).href;

// 直接在主线程上计算文件的MD5哈希（不推荐用于大文件）
async function calculateMD5Directly(file) {
    const reader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    return new Promise((resolve, reject) => {
        reader.onload = function (e) {
            const arrayBuffer = e.target.result;
            spark.append(arrayBuffer);
            const hash = spark.end();
            resolve(hash);
        };

        reader.onerror = function (e) {
            reject(e);
        };

        reader.readAsArrayBuffer(file);
    });
}
function calculateMD5ByChunk(file) {
    return new Promise((resolve, reject) => {
        const chunkSize = 2 * 1024 * 1024; // Read in chunks of 2MB
        const chunks = Math.ceil(file.size / chunkSize);
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();

        let currentChunk = 0;

        fileReader.onload = function (e) {
            const input = e.target.result;
            spark.append(input);
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                const hash = spark.end();
                resolve(hash);
            }
        };

        fileReader.onerror = function () {
            reject('Error reading file');
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        loadNext();
    });
}
function calculateMD5ByWorker(file) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(sha256WorkerUrl);
        const reader = new FileReader();

        reader.onload = function (e) {
            worker.postMessage({ fileData: e.target.result, type: 'md5' });
        };

        reader.onerror = function () {
            reject('Error reading file for MD5 worker');
        };

        reader.readAsArrayBuffer(file);

        worker.onmessage = function (e) {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data.hash);
            }
        };

        worker.onerror = function (e) {
            reject('Error in MD5 worker');
        };
    });
}

async function calculateSHA256Directly(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = async function (e) {
            const arrayBuffer = e.target.result;
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            resolve(hashHex);
        };

        reader.onerror = function (e) {
            reject(e);
        };

        reader.readAsArrayBuffer(file);
    });
}

function calculateSHA256ByChunk(file) {
    return new Promise((resolve, reject) => {
        const chunkSize = 50 * 1024 * 1024; // Read in chunks of 2MB
        const chunks = Math.ceil(file.size / chunkSize);
        const hashBuffer = [];
        const fileReader = new FileReader();

        let currentChunk = 0;
        let totalBytesRead = 0;

        fileReader.onload = function (e) {
            const arrayBuffer = e.target.result;
            hashBuffer.push(arrayBuffer);
            totalBytesRead += arrayBuffer.byteLength;
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                calculateHash();
            }
        };

        fileReader.onerror = function () {
            reject('Error reading file');
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        function calculateHash() {
            crypto.subtle.digest('SHA-256', mergeBuffers(hashBuffer), true)
                .then(hashBuffer => {
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    resolve(hashHex);
                })
                .catch(err => reject(err));
        }

        function mergeBuffers(bufferArray) {
            let totalLength = bufferArray.reduce((sum, buffer) => sum + buffer.byteLength, 0);
            let mergedArrayBuffer = new ArrayBuffer(totalLength);
            let mergedView = new Uint8Array(mergedArrayBuffer);

            let offset = 0;
            for (let i = 0; i < bufferArray.length; i++) {
                mergedView.set(new Uint8Array(bufferArray[i]), offset);
                offset += bufferArray[i].byteLength;
            }

            return mergedArrayBuffer;
        }

        loadNext();
    });
}

function calculateSHA256ByWorker(file) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(sha256WorkerUrl);
        const reader = new FileReader();

        reader.onload = function (e) {
            worker.postMessage({ fileData: e.target.result, type: 'sha256' });
        };

        reader.onerror = function () {
            reject('Error reading file for SHA256 worker');
        };

        reader.readAsArrayBuffer(file);

        worker.onmessage = function (e) {
            if (e.data.error) {
                reject(e.data.error);
            } else {
                resolve(e.data.hash);
            }
        };

        worker.onerror = function (e) {
            reject('Error in SHA256 worker');
        };
    });
}

export {
    calculateMD5Directly,
    calculateMD5ByChunk,
    calculateMD5ByWorker,
    calculateSHA256Directly,
    calculateSHA256ByChunk,
    calculateSHA256ByWorker
};