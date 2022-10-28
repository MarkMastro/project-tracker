export default function generateRandomString(length) {
    var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/'
    result = ''

    while (length > 0) {
        var bytes = new Uint8Array(16);
        var random = window.crypto.getRandomValues(bytes);

        random.forEach(function(c) {
            if (length == 0) {
                return;
            }
            if (c < charset.length) {
                result += charset[c];
                length--;
            }
        });
    }
    return result;
}