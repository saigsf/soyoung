/*
* @Author: saigsf<qq: 2270029397 email: sai_gsf@163.com>
* @Date:   2017-12-26
* @Last Modified by:   M S I
* @Last Modified time: 2017-12-26
*/
// 图片切换
function carousel(data) {
    // 元素
    var el = data.el.find(".carousel-item");
    if (!el) {
        return;
    }

    if (data.isCtrl.isLR) {
        data.el.find(".ctrlBtn").show();
    } else {
        data.el.find(".ctrlBtn").hide();
    }
    if (data.isCtrl.isSpot) {
        data.el.find(".spot").show();
    } else {
        data.el.find(".spot").hide();
    }

    var oSpots = data.el.find(".spot").find("li");

    // 模式
    var b = data.b || 0;
    // 宽和高
    var c = data.c || el.width();
    var d = data.d || el.height();
    //切换速度
    var e = data.e || 5000;

    // 循环
    var timer = null;
    // 信号量
    var index = 0;

    var oldIndex = 0;
    var newIndex = 0;
    el.eq(index).show();
    // 初始化方法
    function init() {
        var windowW = document.documentElement.clientWidth;
        el.parents(".carousel").parent().height(windowW / 2);

        // 宽和高
        c = el.width();
        d = el.height();
        // console.log()


    }
    init();
    window.onresize = function() {
        init();
    }

    // 运动模式
    var moveModule = {
        toLeft: function(o, newIndex, oldIndex) {
            // console.log(newIndex, oldIndex);
            o.eq(newIndex).css({
                "left": c,
                "display": "block"

            }).animate({
                "left": 0
            }, 1000);

            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "left": -c
            }, 1000, function() {

                $(this).css({
                    "left": 0,
                    "display": "none"
                });
            });
        },
        toUp: function(o, newIndex, oldIndex) {

            //console.log(o.eq(newIndex));
            o.eq(newIndex).css({
                "top": d,
                "display": "block"

            }).animate({
                "top": 0
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "top": -d
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "top": 0
                });
            });

        },
        toRight: function(o, newIndex, oldIndex) {
            //			var newIndex = index % el.length;
            //			index = index - 1;
            //console.log(o.eq(newIndex));
            o.eq(newIndex).css({
                "left": -c,
                "display": "block"

            }).animate({
                "left": 0
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "left": c
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "left": 0
                });
            });

        },
        toDown: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            //console.log(o.eq(newIndex));
            o.eq(newIndex).css({
                "top": -d,
                "display": "block"

            }).animate({
                "top": 0
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "top": d
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "top": 0
                });
            });

        },
        breath: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            o.eq(newIndex).css({
                "opacity": 0,
                "display": "block"

            }).animate({
                "opacity": 1
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "opacity": 0
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "opacity": 1
                });
            });

        },
        enlargeLT: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            o.eq(newIndex).css({
                "width": 0,
                "height": 0,
                "display": "block"

            }).animate({
                "width": c,
                "height": d
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "opacity": 0
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "opacity": 1
                });
            });

        },
        enlargeRT: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            o.eq(newIndex).css({
                "width": 0,
                "height": 0,
                "top": 0,
                "left": c,
                "display": "block"

            }).animate({
                "width": c,
                "height": d,
                "left": 0

            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "opacity": 0
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "opacity": 1
                });
            });

        },
        enlargeRB: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            o.eq(newIndex).css({
                "width": 0,
                "height": 0,
                "top": d,
                "left": c,
                "display": "block"

            }).animate({
                "top": 0,
                "left": 0,
                "width": c,
                "height": d
            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "opacity": 0
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "opacity": 1
                });
            });

        },
        enlargeLB: function(o, newIndex, oldIndex) {
            //var newIndex = index % el.length;
            //index = index - 1;
            o.eq(newIndex).css({
                "width": 0,
                "height": 0,
                "top": d,
                "left": 0,
                "display": "block"

            }).animate({
                "width": c,
                "height": d,
                "top": 0

            }, 1000);
            o.eq(newIndex).find("img").css("opacity", 1);

            o.eq(oldIndex).animate({
                "opacity": 0
            }, 1000, function() {

                $(this).css({
                    "display": "none",
                    "opacity": 1
                });
            });

        },
        shutter: function(o, newIndex, oldIndex) {
            var sum = 0;
            //var newIndex = index % el.length;
            //index = index - 1;
            addColumn(o.eq(oldIndex));
            o.eq(oldIndex).find("img").css("opacity", 0);
            o.eq(oldIndex).css({
                "display": "block",
                "z-index": 0
            }).children(".inner").each(function(i) {

                $(this).delay(i * 100).animate({
                    "opacity": 0,
                }, 400);
            });

            o.eq(newIndex).css({
                "display": "block",
                "z-index": -1111,
                "opacity": 0
            }).animate({
                "opacity": 1
            }, 2000);
            o.eq(newIndex).find("img").css("opacity", 1);

        }

    }

    // 添加图片分栏
    function addColumn(o) {
        o.find(".inner").remove();
        var src = o.find("img").attr("src");

        for (var i = 0; i < 10; i++) {
            var oDiv = $("<div class='inner'></div>");
            oDiv.css({
                "backgroundImage": "url(" + src + ")",
                "backgroundSize": "" + c + "px " + d + "px",
                "backgroundPosition": -c * i / 10 + "px 0px ",
                "position": "absolute",
                "top": 0,
                "left": c * i / 10,
                "width": c / 10,
                "height": d,
                "opacity": 1

            });
            o.append(oDiv);

        }

    }

    // 运动方法
    function move(b, newIndex, oldIndex) {
        switch (b) {
            case 1:
                moveModule.toLeft(el, newIndex, oldIndex);
                break;
            case 2:
                moveModule.toUp(el, newIndex, oldIndex);
                break;
            case 3:
                moveModule.toRight(el, newIndex, oldIndex);
                break;
            case 4:
                moveModule.toDown(el, newIndex, oldIndex);
                break;
            case 5:
                moveModule.breath(el, newIndex, oldIndex);
                break;
            case 6:
                moveModule.enlargeLT(el, newIndex, oldIndex);
                break;
            case 7:
                moveModule.enlargeRT(el, newIndex, oldIndex);
                break;
            case 8:
                moveModule.enlargeRB(el, newIndex, oldIndex);
                break;
            case 9:
                moveModule.enlargeLB(el, newIndex, oldIndex);
                break;
            case 10:
                moveModule.shutter(el, newIndex, oldIndex);
                break;
            default:
                break;
        }

    }

    //run(b);

    function run(b) {

        oldIndex = index % el.length;
        index++;
        if (index > el.length) {
            index = 1;
        }
        newIndex = index % el.length;
        move(b, newIndex, oldIndex);
        spotChange(newIndex, oldIndex);

    }

    // 循环执行
    timer = setInterval(function() {
        b = b === 0 ? Math.floor(Math.random() * 9 + 1) : b;
        run(b);
    }, e);

    data.el.mouseover(function() {
        clearInterval(timer)
    })
    data.el.mouseleave(function() {
        // 循环执行
        timer = setInterval(function() {
            b = b === 0 ? Math.floor(Math.random() * 9 + 1) : b;
            run(b);
        }, e);
    })

    btnEvent()

    function btnEvent() {
        var leftBtn = data.el.find(".leftBtn");
        leftBtn.click(function(event) {
            event.preventDefault();
            oldIndex = index % el.length;
            index--;
            if (index < 1) {
                index = el.length;
            }
            newIndex = index % el.length;
            move(b, newIndex, oldIndex);
            spotChange(newIndex, oldIndex);

        });

        var rightBtn = data.el.find(".rightBtn");
        rightBtn.click(function(event) {
            event.preventDefault();
            run(b);
        });
    }
    //点变
    function spotChange(newIndex, oldIndex) {
        oSpots.eq(oldIndex).removeClass("cur");
        oSpots.eq(newIndex).addClass("cur");
    }
    //点点事件
    function spotEvent() {

        oSpots.each(function(i) {
            $(this).click(function() {
                oldIndex = index % el.length;
                index = i;
                newIndex = index % el.length;
                move(b, newIndex, oldIndex);
                spotChange(newIndex, oldIndex);
            });
        });

    }
    spotEvent();

}