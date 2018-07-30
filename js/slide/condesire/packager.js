(function () {
    var condesire = window.condesire || {};

    condesire.define = function (ns, func, name) {

        //var nsmap = condesire.define;
        var nsmap = condesire;

        var p = ns.split(".");
        for (var i=0; i< p.length; i++) {
            var pack = p[i];
            nsmap[pack] = nsmap[pack] || {};
            nsmap = nsmap[pack];
        }

        nsmap[name] = func.apply(nsmap, [condesire.define]);

        return nsmap;
    };
    condesire.def = condesire.define;


    condesire.ua =  {
        ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
        ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
        ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
        ltIE9:document.uniqueID && !window.matchMedia,
        IE:document.uniqueID,
        Firefox:window.sidebar,
        Opera:window.opera,
        Webkit:!document.uniqueID && !window.opera && !window.sidebar && window.localStorage && typeof window.orientation == "undefined",
        Mobile:typeof window.orientation != "undefined"
    };


    window.condesire = condesire;
    window.cd = condesire;

})();