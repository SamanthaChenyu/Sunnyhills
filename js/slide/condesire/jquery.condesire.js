condesire.init_jquery = function () {

    $.fn.onex = function (event, handler) {

        var $this = $(this);
        var framerate = $.fx.interval;
        var args = [];

        $this.each(function (index, element) {
            var $e = $(element);
            $e.on(event, function (e) {

                var self = $(this);
                args = [e];
                animation(self);

            });

            function animation(closure) {

                setTimeout(function () {

                    handler.apply(closure, args);

                }, framerate);
            }
        });

    };
    $.fn.srcSuffix = function (suffix) {
        var $target = $(this);
        $target.each(function (index, element) {
            var $element = $(element);
            var reg=/(.*)(?:\.([^.]+$))/;
            var origin_src = $element.data("origin_src");
            if (origin_src == undefined) {
                origin_src = $element.attr('src');
                $element.data("origin_src", origin_src);
            }
            var origin_file = origin_src.match(reg)[1];
            var origin_ext = origin_src.match(reg)[2];
            $element.attr("src", origin_file + suffix + '.' + origin_ext);
        });


    };

    $.fn.smoothScroll = function (hash, marginTop) {
        var marginTop = marginTop || 0;
        $(this).on("click", function() {
            smoothScroll(hash)
        });
        function smoothScroll(hash){
            var defaults = {
                EASING : 'easeInOutQuart',
                SPEED : 700
            };
            if(hash){
                smoothScrollAction(hash);
                return false;
            }else{
                $('a[href="#"],area[href="#"]').click(function(){
                    $('html,body').stop(false).animate({scrollTop: 0},defaults.SPEED,defaults.EASING);
                    return false;
                });
                $('a[href^="#"],area[href^="#"]').each(function(){
                    var hash = $(this).attr('href');
                    if(hash.match(/^#./)){
                        $(this).click(function(){
                            if($(hash).size() > 0){
                                smoothScrollAction(hash);
                            }
                            return false;
                        });
                    }
                });
            }
            function smoothScrollAction(hash){
                var endPos = Math.round($(hash).offset().top);
                if(endPos != $(window).scrollTop()){
                    $('html,body').stop(false).animate({scrollTop: endPos+marginTop},defaults.SPEED,defaults.EASING);
                }
            }
        }
    };

    $.fn.hoverBtn = function (opt_enter_cond, opt_leave_cond) {
        if (opt_enter_cond === undefined) { opt_enter_cond = function () { return true; } }
        if (opt_leave_cond === undefined) { opt_leave_cond = function () { return true; } }
        var $target = $(this);
        $target.each(function (index, element) {
            var $element = $(element);
            var reg=/(.*)(?:\.([^.]+$))/;
            var origin_src = $element.data("origin_src");
            if (origin_src === undefined) {
                origin_src = $element.attr("src");
                $element.data('origin_src', origin_src);
            }
            var origin_file = origin_src.match(reg)[1];
            var origin_ext = origin_src.match(reg)[2];
            $element.hover(
                function() {
                    if (opt_enter_cond && opt_enter_cond(this)) {
                        $element.attr("src", origin_file + "_over." + origin_ext);
                    }
                },
                function () {
                    if (opt_leave_cond && opt_leave_cond(this)) {
                        $element.attr("src", origin_src);
                    }
                }
            );
        });
    };

    $.fn.fitScreenWidth = function () {
        var $target = $(this);
        $target.each(function (index, element) {
                var $element = $(element);
                var $image = $(this).find('img');
                var iwidth = $image.attr('width');
                var iheight = $image.attr('height');
                var $screen = $image.offsetParent();
                $(window).resize(resizeImage).trigger('resize');
                function resizeImage() {
                    var swidth = $screen.width();
                    var top = 0;
                    var theight = $image.height();
                    if (iheight < theight) {
//                        top =  -(theight -iheight) / 2;
                    }
                    if (iwidth > swidth) {
                        $image.css({ width: 'auto', height: '100%', top: top, left: -(iwidth - swidth) / 2 });
                    } else {
                        $image.css({ width: '100%', height: 'auto', top: top, left: 0});
                    }
                    $image.css({ width: '100%', height: 'auto', top: top, left: 0});

                    $element.parent().height($image.height());
                    $element.children().first().height($image.height());
                }
            }
        );
    };

    $.fn.fitScreenHeight =  function () {
        var $target = $(this);
        $target.css({position: "relative", overflow:"hidden"});
        $target.each(function (index, element) {
                var $image = $(this).find('img');
                var iwidth = $image.attr('width');
                var iheight = $image.attr('height');
                var $screen = $image.offsetParent();
                $image.css({position: "absolute"});
                $(window).resize(resizeImage).trigger('resize');
                function resizeImage() {
                    var swidth = $screen.width();
                    var top = 0;
                    var theight = $image.height();
                    if (iheight < theight) {
                        top =  -(theight -iheight) / 2;
                    }
                    if (iwidth > swidth) {
                        $image.css({ width: 'auto', height: '100%', top: top, left: -(iwidth - swidth) / 2 });
                    } else {
                        $image.css({ width: '100%', height: 'auto', top: top, left: 0});
                    }
                }
            }
        );
    };

    $.fn.fitWindow =  function (marginTop, minHeight, selector) {
        marginTop = marginTop || 0;
        selector = selector || 'img';
        var $target = $(this);
        $target.each(function () {
            var $image = $(this).children(selector);
            var imageAspectRatio = $image.attr('width') / $image.attr('height');
            var $screen = $(window);
            var $this = $(this);
            $this.css({position: "relative", top: 0, left: 0, width: "100%", height: $screen.outerHeight()-marginTop, overflow: "hidden"});
            $image.css({position: "absolute", top: 0, left: 0});
            $(window).resize(resizeImage).trigger('resize');
            function resizeImage () {
                var swidth = $screen.width();
                var sheight = $screen.height()-marginTop;
                $this.height(sheight);

                if (imageAspectRatio > swidth / sheight) {
                    $image.css({ width: 'auto', height: '100%', top: 0, left: -(sheight * imageAspectRatio - swidth) / 2 });
                } else {
                    var top = (swidth / imageAspectRatio - sheight) / 2;
                    if (minHeight > 0) {
                        $image.css({minHeight: minHeight+top});
                    }
                    $image.css({ width: '100%', height: 'auto', top: -top, left: 0 });
                }
            }
        });
    };

    $.fn.fitWindowIframe =  function (selector) {
        selector = selector || "iframe";
        var $target = $(this);
        $target.each(function () {
            var $selector = $(this).find(selector);
            var aspectratio = $selector.attr('width') / $selector.attr('height');
            var $screen = $(window);
            var $this = $(this);
            $this.css({position: "relative", top: 0, left: 0, width: "100%", height: $screen.outerHeight(), overflow: "hidden"});
            $selector.css({position: "absolute", top: 0, left: 0});
            $(window).resize(resizeImage).trigger('resize');
            function resizeImage () {
                var swidth = $screen.width();
                var sheight = $screen.height();
                $this.height(sheight);

                if (aspectratio > swidth / sheight) {
                    var width = sheight * aspectratio;
                    var left = (width - swidth)/2;
                    $selector.css({ width: width, height: $screen.height(), top: 0, left: -left });
                } else {
                    var height = swidth / aspectratio;
                    var top = (height - sheight)/2;
                    $selector.css({ width: swidth, height: height, top: -top, left: 0 });
                }
            }
        });
    };

    $.fn.aspectFixed = function (base_tag) {
        var $target = $(this);
        var $base = $(base_tag);
        $target.each(function (index, element) {
                var $element = $(element);
                var width = $element.attr("width");
                var height = $element.attr("height");
                var aspect = height / width;

                $element.attr("width", "100%");
                $(window).resize(resizeImage).trigger('resize');
                function resizeImage() {
                    $element.height($base.width() * aspect);
                }
            }
        );
    };

    $.fn.heightTarget = function (cond, calc) {
        calc = calc || function (val) {return val;};
        cond = cond || function () {return true;};
        var $target = $(this);
        $target.each(function (index, element) {
                var $element = $(element);
                var target_selector = $element.data('target');
                var target = $element.parent().find(target_selector).get(0) || $element.parent().parent().find(target_selector).get(0);
                var $target = $(target);
                $(window).resize(resize).trigger('resize');
                function resize() {
                    if (cond()) {
                        $element.height(calc($target.outerHeight()));
                    }
                }
            }
        );
    };

    $.fn.widthRemainder = function (cond) {
        var cond = cond || function () {return true};
        var $target = $(this);
        $target.each(function (index, element) {
                var $element = $(element);
                var target_selector = $element.data('target');
                var $parent = $element.parent();
                var $target = $parent.find(target_selector);
                $(window).resize(resize).trigger('resize');
                function resize() {
                    if (cond()) {
                        var width = $parent.width() - $target.width();
                        $element.width(width);
                    } else {
                        $element.width("auto");
                    }
                }
            }
        );
    };

    $.fn.readmore = function () {
        var $target = $(this);
        $target.each(function (index, element) {
                var $element = $(element);
                var target_selector = $element.data('target');
                var close_selector = $element.data('close');
                var hide_selector = $element.data('hide');
                var target = $element.parent().find(target_selector).get(0) || $element.parent().parent().find(target_selector).get(0);
                var $target = $(target);
                var hide = $element.parent().find(hide_selector).get(0) || $element.parent().parent().find(hide_selector).get(0);
                var $hide = $(hide);
                $element.on("click", function () {
                    if ($target.is(":visible")) {
                        $hide.fadeIn();
                        $target.slideUp();
                        $element.text('READ MORE');
                    } else {
                        $target.slideDown();
                        $element.text('CLOSE');
                        $hide.fadeOut();
                    }
                });
            }
        );
    };

    $.fn.fitHeight =  function (get_height, target_position) {
        var $w = $(window);
        var get_height = get_height || function () {return $w.height()};
        var $target = $(this);

        target_position = target_position || "relative";
        $target.css({position: target_position, overflow:"hidden"});
        $target.each(function (index, element) {
                var $selector= $(this).find('> img');
                var iwidth = $selector.attr('width');
                var iheight = $selector.attr('height');
                var $screen = $selector.offsetParent();
                var aspectratio = $selector.attr('width') / $selector.attr('height');
                var $this = $(this);
                $selector.css({position: "absolute"});
                $(window).resize(resizeImage).trigger('resize');
                function resizeImage() {
                    $target.height(get_height());

                    var swidth = $screen.width();
                    var sheight = $screen.height();
                    $this.height(sheight);

                    if (aspectratio > swidth / sheight) {
                        var width = sheight * aspectratio;
                        var left = (width - swidth)/2;
                        $selector.css({ width: width, height: $screen.height(), top: 0, left: -left });
                    } else {
                        var height = swidth / aspectratio;
                        var top = (height - sheight)/2;
                        $selector.css({ width: swidth, height: height, top: -top, left: 0 });
                    }

                }
            }
        );
    };
    
    $.fn.fit =  function (get_width, get_height) {
        var $w = $(window);
        var get_width = get_width || function () {return $w.width()};
        var get_height = get_height || function () {return $w.height()};
        var $target = $(this);
        $target.each(function () {
            $(window).resize(resizeImage).trigger('resize');
            function resizeImage () {
                $target.width(get_width());
                $target.height(get_height());
            }
        });
    };

    $.fn.flat = function () {

        var $target = $(this);
        $(window).resize(function () {
            var max = 0;
            $target.height("auto");
            $target.each(function (index, element) {
                if (max < $(element).height()) {
                    max = $(element).height();
                }
            });
            $target.height(max);

        }).trigger("resize");

    };

    $.stop_scroll = function () {

        $("body").css({overflow: "hidden"});
        $(window).on('touchmove.stopScroll', function(e) {
            e.preventDefault();
        });
    };

    $.start_scroll = function () {

        $("body").css({overflow: ""});
        $(window).off('.stopScroll');

    };
};