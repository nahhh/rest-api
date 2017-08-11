exports.getFileExtension = function(fileName) {
    if (!fileName) {
        return '';
    }

    let index = fileName.indexOf('.');

    if (index < 0) {
        return '';
    }

    return fileName.substring(index + 1);
}