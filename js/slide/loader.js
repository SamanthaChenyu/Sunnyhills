(function () {
    var condesire = window.condesire || {};
    condesire.p = load_parallel;
    condesire.s = load_serial;

    var js_path = condesire.js_path || 'js/slide/';
    condesire.s([
            js_path + 'condesire/packager.js',
            //js_path + 'lib/jquery-1.11.0.min.js',
            js_path + 'lib/modernizr.custom.js',
            js_path + 'viewport.js',
            js_path + 'condesire/jquery.condesire.js'
    ], function () {
        condesire.p([
                js_path + 'lib/jquery.easing.1.3.js',
                //js_path + 'lib/imagesloaded.pkgd.min.js'
        ], function () {
            condesire.s([
                    js_path + 'app.js'
            ]);
        });
    });

    window.condesire = condesire;

    function loadScript(url, callback) {
        callback = callback || function () {};
        var script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    if (callback) {
                        callback(url);
                    }
                }
            };
        } else {
            script.onload = function () {
                callback(url);
            };
            script.onerror = function () {
                callback(url);
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function load_parallel (urls, callback) {
        callback = callback || function () {};
        var len = 0;
        for (var i=0; i<urls.length; i++) {
            loadScript(urls[i], function (url) {
                len++;
                if (len == urls.length) {
                    callback();
                }
            });
        }
    }

    function load_serial(urls, callback) {
        callback = callback || function () {};
        _load(urls, 0);
        function _load(urls, index) {
            loadScript(urls[index], function () {
                if (index >= urls.length-1) {
                    callback();
                } else {
                    index++;
                    _load(urls, index);
                }
            });
        }
    }

})();
