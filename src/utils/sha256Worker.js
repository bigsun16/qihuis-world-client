importScripts('https://cdn.jsdelivr.net/npm/spark-md5@latest/spark-md5.min.js');
self.onmessage = function (e) {
    const { fileData, type } = e.data;
    if (type === 'sha256') {
        crypto.subtle.digest('SHA-256', fileData, true)
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                self.postMessage({ hash: hashHex });
            })
            .catch(err => {
                self.postMessage({ error: err.message });
            });
    } else if (type === 'md5') {
        const spark = new SparkMD5.ArrayBuffer();
        spark.append(fileData);
        const hash = spark.end();
        self.postMessage({ hash: hash });
    }
};
