var app = app || {};
app.is_sp = function () {
    return $('body').css('position') == 'relative';
};

$('.js-kv').height($(window).height());
$(".js-wrap").css({visibility: "visible"}).animate({opacity: 1});

app.map_options =  {
    scrollwheel: false,
    zoom: 14,
    styles:
        [
            {
                "featureType": "landscape",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 60
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 20
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 20
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 0
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 0
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -10
                    },
                    {
                        "saturation": -97
                    }
                ]
            }
        ]
};

app.submit_form_action = function (action) {
    var org_action = document.form1.action;
    document.form1.action = action;
    document.form1.submit();
    document.form1.action = org_action;
};

app.init = function () {

    app.w = $(window);

    app.init_kv();

    app.init_menu();
    app.init_menu_fixed();

    app.init_showroom_map();
    app.init_company_map();

    app.init_news();

    app.init_contact();

    app.init_lookbook();

    if (condesire.ua.ltIE8) {
        $('.sh__menu-link').addClass('x-hide-after');
        $('.sf__menu-link').addClass('x-hide-after');
    }

    $("input[type='radio']").change(function(){
        if($(this).is(":checked")){
            $('.ct__list label').removeClass("ct_on");
            $(this).parent().addClass("ct_on");
        }else{
            $(this).parent().removeClass("ct_on");
        }
    }).trigger("change");


};

app.init_kv = function () {

    if (!$('.js-slider-loaded').get(0)) {
        return;
    }

    $('.kv__img img').imagesLoaded(function() {
        $(".js-kv-div").css({visibility: "visible"}).animate({opacity: 1});
       start_slideshow();
    });


    $('.js-slider').find('img').each(function () {
            var $image = $(this);
            var imageAspectRatio = $image.attr('width') / $image.attr('height');
            var $screen = $(window);
            $(window).resize(resizeImage).trigger('resize');
            function resizeImage () {
                var swidth = $screen.width();
                var sheight = $screen.height();
                $(".js-kv").height(sheight);
                $(".js-slider").height(sheight);
                 if (imageAspectRatio > swidth / sheight) {
                    $image.css({ width: 'auto', height: '100%', top: 0, left: 0  });
                } else {
                    $image.css({ width: '100%', height: 'auto', top: -(swidth / imageAspectRatio - sheight) / 2, left: 0 });
                }
            }
        }
    );

    function start_slideshow () {
        var interval = 0;
            var $slider = $('.js-slider');
            $slider.each(function (index, element) {
                var $e = $(element);
                var $list = [];
                $e.children().each(function (index, element) {
                    var $e = $(element);
                    $list.push($e);
                });
                var current = 0;
                var $current = $list[current];
                var next = 1;
                var $next = $list[next];

                if (window.Modernizr && Modernizr.cssanimations) {
                    $current.css({opacity: 0, zIndex: 1});
                    $next.css({opacity: 0, zIndex:2});
                    slide();
                } else {
                    for (var i=0; i<$list.length; i++) {
                        $list[i].css({zIndex: 2, opacity: 1}).show();
                        $list[i].find("img").hide();
                    }
                    slide_ie8();
                }

                function slide_ie8 () {
                    var duration = 4400;

                    $next.find("img").fadeIn(duration, function () {

                        current++;
                        if( current >= $list.length ){
                            current = 0;
                        }
                        $current = $list[current];
                        next = ( current + 1 >= $list.length )? 0 : current + 1;
                        $next = $list[next];

                        $current.find('img').fadeOut(duration, function () {});
                        $current.css({zIndex: 2});
                        $next.css({zIndex: 1});

                        slide_ie8();
                    });

                }
                function slide () {
                    setTimeout(function () {
                        interval = 900;
                        //console.log("2400");
                        $next.css({opacity:1});

                        $next.find("img").addClass('js-fade').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
                            function (event) {
                                $(this).removeClass("js-fade");
                                //console.log("!end");
                            });

                        $next.addClass('js-down-sliding').on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
                            function (event) {
                                if ($(event.target).hasClass("js-down-sliding")) {
                                    //console.log("end");
                                    $(this).removeClass("js-down-sliding");

                                    $current.css({opacity: 0, zIndex: ""});
                                    current++;
                                    if( current >= $list.length ){
                                        current = 0;
                                    }
                                    $current = $list[current];
                                    next = ( current + 1 >= $list.length )? 0 : current + 1;
                                    $next = $list[next];

                                    $next.css({zIndex: 2, opacity: 1});
                                    $current.css({zIndex: 1, opacity: 0});

                                    slide();
                                }
                            }
                        );

                    }, interval);
                }

            });
        app.stop_slideshow = function () {
            clearInterval(app.slide_internval_id);
        };

        app.caption_interval = 2200;
        app.caption_duration = 3000;
        //app.caption_animation = 'easeInOutQuart';
        app.caption_animation = 'easeOutQuad';

        setTimeout(function() {
            var a = window.Modernizr.prefixed('opacity');
            if (window.Modernizr && Modernizr.cssanimations) {
                $(".js-kv-caption").animate({opacity: 1}, app.caption_duration, app.caption_animation);
            } else {
                $(".js-kv-caption").css({opacity: 1}).hide().fadeIn(app.caption_duration);
            }
            $(".js-kv-caption").css({visibility: 'visible', zIndex: 3});
        }, app.caption_interval);

    }

    var speed = 2.0;
    $(".js-slider").each(function (index, element) {
        var $e = $(element);
        var $parent = $e.parent();
        $e.find("img").imagesLoaded(function() {
            app.w.on("scroll", function () {
                if (!cd.ua.Mobile) {
                    var p_top = (app.w.scrollTop() - $parent.offset().top ) / speed;
                    $e.css({bottom:  -p_top});
                }
            }).trigger("scroll");
        });
    });
};

app.init_menu = function () {

    app.is_open_menu = function () {
        return $(".js-menu").is(":visible");
    };
    app.open_menu = function () {
        if (!app.is_open_menu()) {
            $(".js-kv-caption > img, .js-menu-outer").fadeOut(function () {});
            $(".js-menu, .js-menu-overlay").fadeIn(function () {});
            var $menu = $(".js-equal-spacing");
            var menu_len = $menu.length/2;
            var v = app.w.height() - ($menu.first().height()+6) * menu_len;
            $menu.css({paddingTop: v/(menu_len+1)});

            $.stop_scroll();
        }
    };
    app.close_menu = function (callback) {
        if (app.is_open_menu()) {

            $(".js-kv-caption > img, .js-menu-outer").fadeIn();
            $(".js-menu, .js-menu-overlay").fadeOut();

            $.start_scroll();
        }
    };

    $(".js-menu-open-btn").on("click", function () {
        app.open_menu();
    });

    $(".js-menu-close-btn").on("click", function () {
        app.close_menu();
    });

    app.w.on("scroll", function () {
        if (app.w.height() > app.w.scrollTop()) {
            $('.js-menu-outer').css({backgroundColor: 'transparent'});
        } else {
            $('.js-menu-outer').css({backgroundColor: ''});
        }
    }).trigger("scroll");
};

app.init_menu_fixed = function () {
    var classname = 'sh__nav--fix';
    var $nav = $('.js-nav');
    var $outer = $('.js-nav-outer');
    // $(window).scroll(function() {

    //     var top = $(window).scrollTop();
    //     if (top > $outer.offset().top + $nav.height()) {
    //         $nav.addClass(classname);
    //         if ($nav.css('top') != '0px') {
    //             $nav.css({top: 0});
    //         }
    //     } else if ($nav.hasClass(classname) && top < $outer.offset().top + $nav.height()){
    //         $nav.css({top: -$outer.height()});
    //         $nav.removeClass(classname);
    //         $nav.removeClass('sh__nav--fixnod');
    //     }
    // });

};

app.init_showroom_map = function () {
    var $target = $(".js-map-showroom");

    if ($target[0]) {
        app.open_map($target);
    }
};

app.init_company_map = function () {

    var is_open = false;
    var pre_top = 0;
    var pre_height = 0;
    $(".js-company-btn").each(function (index, element) {
        var $e = $(element);
        var content = $e.data("target");
        var $content = $e.parent().find(content);
        var $plus = $e.parent().find(".js-plus");
        $plus.hover(function () {
            $(this).siblings('.cm__btn').find('.cm__ttl').addClass('on');
        }, function () {
            $(this).siblings('.cm__btn').find('.cm__ttl').removeClass('on');
        });
        var src = $plus.find("img").attr("src");
        var close = $plus.find("img").data("src");

        $e.siblings('.js-plus').on('click.open',
            function () {
                onClick()
            }
        );
        $e.on("click", onClick);

        function onClick() {
            if ($content.is(":visible")) {
                $plus.removeClass('cm__plus--close');
                $plus.css({height:'', lineHeight: '', backgroundColor: ''});
                $('.js-plus').off("click.close");
                is_open = false;
                $content.slideUp();
                $plus.find("img").attr("src", src);
            } else {
                $(content).slideUp();
                $('.js-plus').removeClass('cm__plus--close');
                $(".js-plus").css({height:'', lineHeight: '', backgroundColor: ''});
                $(".js-plus").find("img").attr("src", src);

                $plus.addClass('cm__plus--close');
                $plus.css({'cssText' : 'height:86px !important; line-height: 86px !important; background-color: #fff;'});
                if (app.is_sp()) {
                    $plus.css({'cssText' : 'height:43px !important; line-height: 43px !important; background-color: #fff;'});
                }
                $('.js-plus').off("click.close");
                $plus.on("click.close", function () {
                    is_open = false;
                    $plus.css({height:'', lineHeight: '', backgroundColor: ''});
                    $(content).slideUp();
                    $plus.find("img").attr("src", src);
                    $plus.off("click.close");

                    var t = $e.offset().top;
                    var nav_h = $('.js-nav').height();
                    if (app.is_sp()) {
                        nav_h = $('.js-menu-outer').height();
                    }
                    $('html,body').stop(false).animate({scrollTop: t-nav_h});
                });

                var nav_h = $('.js-nav').height();
                if (app.is_sp()) {
                    nav_h = $('.js-menu-outer').height();
                }
                var tt = $e.offset().top;

                if (is_open) {
                    if (tt > pre_top && pre_top <= $content.offset().top + pre_height ) {
                        tt -= pre_height;
                    }
                }
                $('html,body').stop(false).animate({scrollTop: tt - nav_h});

                $content.slideDown(function () {
                    is_open = true;
                    pre_top = Math.floor($(this).offset().top - $(this).siblings('.js-company-btn').height());
                    pre_height = $(this).height() + $(this).siblings('.js-plus').height();
                });


                $plus.find("img").attr("src", close);
                var $jsmap = $content.find(".js-map");
                if ($jsmap.data("isopen") != true) {
                    $jsmap.data("isopen", true);
                    app.open_map($jsmap);
                }
            }
        }
    });
};

app.open_map = function ($target) {

    var maplat = parseFloat($target.data("lat"));
    var maplng = parseFloat($target.data("lng"));

    var targetLatlng = new google.maps.LatLng(maplat, maplng);

    var mapOptions = app.map_options;
    mapOptions['center'] = targetLatlng;
    var map = new google.maps.Map($target[0], mapOptions);
    var icon_width = 65;
    var icon_height = 97;
    var icon_scaleWidth = 65;
    var icon_scaleHeight = 97;
    if (condesire.ua.Mobile) {
        icon_scaleWidth = 32;
        icon_scaleHeight = 48;
    }

    var icon = new google.maps.MarkerImage(
        condesire.js_path + '../images/common/mapping.png',
        new google.maps.Size(icon_width, icon_height),
        new google.maps.Point(0, 0),
        new google.maps.Point(icon_scaleWidth/2, icon_scaleHeight),
        new google.maps.Size(icon_scaleWidth, icon_scaleHeight)
    );

    var marker = new google.maps.Marker({
        position: targetLatlng,
        map: map
        ,
        icon: icon
        //icon: condesire.js_path + '../images/common/mapping.png'
    });

    var infowindow = new google.maps.InfoWindow();
    var $map_window = $("#map-window").detach().show();
    infowindow.setContent($map_window[0]);

    google.maps.event.trigger(map, 'resize');

    google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
        infowindow.open(map, marker);
    });
    var handler = function() {
        if ($("#map-window").is(":visible")) {
            if (infowindow) {
                infowindow.close();
            }
        } else {
            infowindow.open(map, marker);
        }
    };
    google.maps.event.addListener(marker, "click", handler);

    $(window).onex('resize', function (e) {
        if (app.is_sp()) {
            infowindow.close();
            infowindow.setContent(null);
            $("#map-window").hide();
            google.maps.event.clearListeners(marker, "click");
        }
    });

    setTimeout(function () {
        map.setCenter(targetLatlng);
    }, 100);

};

app.init_news = function () {

    var $btn = $(".js-archives-btn");
    var $img = $btn.find("img");
    var open_src = $img.data("src");
    var close_src = $img.attr("src");

    $btn.on("click", function () {

        var $this = $(this);

        var target = $this.data("target");
        var $target = $this.parent().parent().find(target);
        if ($target.is(":visible")) {
            $target.slideUp();
            $img.attr("src", close_src);
        } else {
            $target.slideDown();
            $img.attr("src", open_src);
        }

    })

};

app.init_contact = function () {

    var $type = $(".js-select-type");
    if (!$type.get(0)) {
        return;
    }

    $type.on("change", function () {

        var index = $(this).val();
        var url = location.protocol + "//" + location.host + location.pathname;
        if (index == 1) {
            url += "?type=" + "inquiry";
        } else if (index == 2) {
            url += "?type=" + "new";
        } else if (index == 3) {
            url += "?type=" + "mid";
        }
        location.href = url;
    });

    $('.ct__policy').on("click", function (e) {

        if ($(this)[0] == e.target) {
            $(this).find("input").prop("checked", !$(this).find("input").prop("checked"));
        }

    });

};

app.init_lookbook = function () {

    var $imgs = $('.lb__obj');
    $imgs.each(function (index, element) {
        var $e = $(element);
        $(window).onex('scroll.fadein'+index, function (e) {

            if ($(window).scrollTop() + $(window).height() > $e.offset().top) {
                $e.addClass('lb__obj--show');
                $(window).off('scroll.fadein'+index);
            }

        });

    });

};

$(function() {
    condesire.init_jquery();

    if (cd.ua.ltIE8) {
        $("img").imagesLoaded(function () {
            // ie8 fix
            setTimeout(function () {
                $(window).trigger("resize");
            }, 100);
        });
    }

    $(".js-fit").each(function(index, element) {
        var $e = $(element).imagesLoaded(function () {
            var selector = $e.data("target");
            var $selector = $(window);
            if (selector) {
                $selector = $(selector);
            }
            $e.fit(function() {
                return $selector.width();
            }, function () {
                return $selector.height();
            });
        });
    });

    $(".js-over-fit").each(function(index, element) {
        var $e = $(element).imagesLoaded(function () {
            var selector = $e.data("target");
            var $selector = $(window);
            if (selector) {
                $selector = $(selector);
            }
            $e.fit(function() {
                return $selector.width();
            }, function () {
                return $selector.height()+100;
            });
        });
    });

    $(".js-fit-window > img").each(function(index, element) {
        var $e = $(element).imagesLoaded(function () {
            $e.closest(".js-fit-window").fitWindow();
        });
    });
    $(".js-fit-width > img").each(function(index, element) {
        var $e = $(element).imagesLoaded(function () {
            $e.closest(".js-fit-width").fitScreenWidth();
        });
    });

    $(".js-fit-height > img").each(function(index, element) {
        var $e = $(element).imagesLoaded(function () {
            var $target = $e.closest(".js-fit-height");
            $target.fitHeight(function () {
                return  app.w.height();
            });
        });
    });

    $(".js-height").heightTarget();

    var first = true;
    $(".js-nav-height").heightTarget(function (val) {
        if (first) {
            first = false;
            return true;
        }
        return false;
    });
    $(".js-flat").flat();
    $(".js-readmore").readmore();
    $(".js-wy-height").find("img").imagesLoaded(function () {
         $(".js-wy-height").heightTarget();
    });

    $(".js-page-scroll").each(function (index, element) {
        var $e = $(element);
        var target = $e.data("target");
        $e.smoothScroll(target);
    });

    app.init();
});
