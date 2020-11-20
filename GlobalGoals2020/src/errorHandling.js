// Check Svg
export function checkSvg(str) {
    if (typeof str == "string") {
        let match = str.replace(new RegExp("\\\\", 'gi'), '');
        return { checked: true, value: match }
    } else {
        return { checked: false, errorMessage: 'Svg was not a String' }
    }
}

// Verify URL
export function isValidUrl(url) {
    let request;

    if (typeof url == 'string') {
        let checkProtocal = new RegExp(/^https:/, 'i').test(url)

        if (!checkProtocal) {
            return { status: false, errorMessage: 'Protocal wasn\'t https' }
        } else {
            if (window.XMLHttpRequest) request = new XMLHttpRequest();
            else request = new ActiveXObject("Microsoft.XMLHTTP");

            request.open('GET', url, false);
            request.send();

            return request.status === 404
                ? { status: false, errorMessage: 'Url request status 404' }
                : { status: true, url: url }
        }
    } else {
        return { status: false, errorMessage: 'URL is not a string' }
    }
}