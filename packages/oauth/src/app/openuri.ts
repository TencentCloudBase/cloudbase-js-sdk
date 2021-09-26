export type OpenURIWithCallback = (url: string, opts?: OpenURIOptions) => Promise<{ [key: string]: string }>;

export interface OpenURIOptions {
    width: string;
    height: string;
}

/**
 * default use iframe to open url can return callback
 * for example : open https://example.com/callback?rediret_uri=http://127.0.0.1:8080/
 *     the it is done, it will callback http://127.0.0.1:8080/?data1=x&data2=3
 *
 * for example : open https://example.com/callback?rediret_uri=http://127.0.0.1:8080/?__iframe==on
 *      window.addEventListener('message', function(e) {
        console.log(e)
        alert('data from domain2 ---> ' + e.data);
    }, false);
 *
 */
export const defaultOpenURIWithCallback: OpenURIWithCallback = (url: string, opts?: OpenURIOptions): Promise<{ [key: string]: string }> => {
    let iframeTag = '__iframe';
    if (window.location.search.indexOf(iframeTag) > 0) {
        document.body.style.display = 'none';
    }
    if (!opts) {
        opts = {
            width: '355px',
            height: '355px'
        }
    }
    if (document.getElementById('_iframe_panel_wrap') === null) {
        var elementDiv = document.createElement('div');
        elementDiv.style.cssText =
            'background-color: rgba(0, 0, 0, 0.7);position: fixed;left: 0px;right: 0px;top: 0px;bottom: 0px;padding: 9vw 0 0 0;display: none;z-index:100;';
        elementDiv.setAttribute('id', '_iframe_panel_wrap');
        document.body.appendChild(elementDiv);
    }
    const target = document.getElementById('_iframe_panel_wrap'),
        iframe = document.createElement('iframe')
    target.innerHTML = '';
    const openURL = new URL(url);
    const redirectUri = openURL.searchParams.get('redirect_uri')
    if (redirectUri) {
        const redirectUrl = new URL(redirectUri);
        redirectUrl.searchParams.append(iframeTag, "on")
        openURL.searchParams.set('redirect_uri', redirectUrl.href)
        url = openURL.href
    }
    iframe.setAttribute('src', url)
    iframe.setAttribute('id', '_iframe_panel_wrap_iframe')
    iframe.style.cssText = `min-width:${opts.width};display:block;height:${opts.height};margin:0 auto;background-color: rgb(255, 255, 255);border: none;`;
    target.appendChild(iframe);
    target.style.display = 'block';

    let callBack = new Callback()
    // handle callback from iframe post message
    window.addEventListener('message', e => {
        if (e.origin == openURL.origin && callBack.callFunc) {
            target.style.display = 'none';
            const data = JSON.parse(e.data);
            try {
                callBack.callFunc(data)
            } catch (e) {
            }
        }
    }, false);
    return new Promise<{ [key: string]: string }>((resolve, reject) => {
        callBack.callFunc = data => {
            if (data.error) {
                return reject(data)
            }
            return resolve(data)
        }
        // handle callback from iframe redirect uri
        iframe.onload = () => {
            try {
                var windowLocation = window.location;
                var iframeLocation = iframe.contentWindow.location;
                if (
                    iframeLocation.host +
                    iframeLocation.pathname ===
                    windowLocation.host +
                    windowLocation.pathname
                ) {
                    target.style.display = 'none';
                    const iframeUrlParams = new URLSearchParams(iframeLocation.search);
                    const data: { [key: string]: string } = {};
                    iframeUrlParams.forEach((v, k) => {
                        data[k] = v;
                    })
                    if (data.error) {
                        return reject({
                            error: iframeUrlParams.get('error'),
                            error_description: iframeUrlParams.get('error_description')
                        })
                    }
                    return resolve(data)
                } else {
                    target.style.display = 'block';
                }
            } catch (error) {
                target.style.display = 'block';
            }
        };
    })
}


class Callback {
    public callFunc: (data?: { [key: string]: string }) => void;
}