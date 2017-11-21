$(window).scrollTop(0);
$(function() {
    // 返回顶部方法调用
    // 隐藏栏显示
    message();
    edition();
    rolling();
    bullet();
    overlay();
    navConfirm();
    musicCtrl();
    move3D();
});

function message() {
    var message = document.querySelector("#message");
    var submit = document.querySelector(".submit");
    submit.addEventListener("click", function() {
        var name = message.querySelector("#name").value;
        var email = message.querySelector("#email").value;
        var phone = message.querySelector("#phone").value;
        var content = message.querySelector("#content").value;
        var nameReg = /^[\u4E00-\u9FA5]+$/;
        var phoneReg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!nameReg.test(name)) {
            alert("姓名只能是汉字")
        } else if (!emailReg.test(email)) {
            alert("邮箱不正确")
        } else if (!phoneReg.test(phone)) {
            alert("电话格式不正确")
        } else {
            console.log(1);
            $.ajax({
                type: "POST",
                url: "http://localhost/myproject/soyoung/php/api_user.php",
                data: {
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "content": content
                },
                dataType: 'json',
                success: function(res) {
                    if (res.code == 0) {
                        alert("提交成功")
                    } else if (res.code == 10004) {
                        alert("内容不能为空")
                    }
                },
                error: function(err) {
                    if (err) {
                        console.log(err);
                        alert("提交失败,系统错误");
                    }
                }
            });
        }

    }, false);

}

function edition() {
    $(".top-logo a").click(function() {
        // console.log($("#white").attr('href'))
        if (!$("#white").attr('href')) {
            $("#white").attr('href', 'css/bwhite.css');

        } else {
            $("#white").attr('href', '');
        }

    })

}

function rolling() {

    let $pageBox = $(".pageBox");
    let nowPage = 0;
    let lock = true;
    $(document).mousewheel(function(e, delta) {
        // toTop()
        if (!lock) {
            return;
        }
        nowPage -= delta
        pageMove($pageBox, nowPage);
        lock = false;
        /*函数节流，知道两秒钟后，才能执行该函数*/
        setTimeout(function() {
            lock = true;
        }, 1000);
    });

}

function bullet() {
    let $pageBox = $(".pageBox");
    $(".bullets .bullet").each(function(i) {
        $(this).click(function() {
            pageMove($pageBox, i);
            $(this).addClass("bullet-active").siblings(".bullet-active").removeClass("bullet-active");
            $(".o-content .o-c-inner").eq(i).addClass("o-c-active").siblings(".o-c-active").removeClass("o-c-active");
        })
    })
}

function overlay() {
    let $pageBox = $(".pageBox");
    $(".o-content .o-c-inner").each(function(i) {
        $(this).click(function() {
            pageMove($pageBox, i);
            $(this).addClass("o-c-active").siblings(".o-c-active").removeClass("o-c-active");
            $(".bullets .bullet").eq(i).addClass("bullet-active").siblings(".bullet-active").removeClass("bullet-active");
        })
    })
}

function pageMove(obj, page) {
    // 对参数进行判断
    if (page < 0) {
        page = 0;
    }
    if (page > 4) {
        page = 4;
    }
    //让container进行动画 
    //方法一使用css样式 
    obj.css('top', -page * 100 + "%")
        .children(".page").each(function(i) {
            if (i == page) {
                $(this).addClass("ani-slide")
            }
        })

    //方法二 使用运动框架
    // $container.animate({
    //     "top": -nowPage * 100 + "%"
    // }, 1000);

    // obj.children(".page")[page].find(".ani")
}


function navConfirm() {
    $(".header-btn-box .btn").click(function() {
        if (!$(this).prop('isOpen')) {
            $(this).removeClass("btn-open").addClass("btn-close")
            $(this).prop('isOpen', true);
            $(".overlay").removeClass("ani-slide-o hidden").addClass("ani-slide")
        } else {
            $(this).removeClass("btn-close").addClass("btn-open")
            $(this).prop('isOpen', false);
            $(".overlay").removeClass("ani-slide").addClass("ani-slide-o  hidden")
        }

    });
}


function musicCtrl() {
    $(".video").mouseover(function() {
        // console.log($(".music")[0].paused)
        if ($(".music")[0].paused) {
            $(".video-stop").removeClass("hidden")
        } else {
            $(".video-start").removeClass("hidden")

        }

    });
    $(".video").mouseout(function() {
        // console.log($(".music")[0].paused)

        $(".video-stop").addClass("hidden")

        $(".video-start").addClass("hidden")

    });

    $(".video").click(function(e) {
        // console.log(e.target.className)
        if (e.target.className == "video-start") {
            $(".music")[0].pause();
            $(".video-stop").removeClass("hidden")
            $(".video-start").addClass("hidden")


        } else {
            $(".music")[0].play();
            $(".video-start").removeClass("hidden");
            $(".video-stop").addClass("hidden")

        }

    });

}

function move3D() {
    var newX = 0,
        newY = 0;

    $(".block").mouseenter(function(e) {

        var x = e.clientX;
        var y = e.clientY;
        $(this).css({
            "transform": "scale(1.03) "
        })

        $(".block").mousemove(function(e) {

            newX = e.clientX - x;
            newY = e.clientY - y;
            $(this).css({
                "transition": 'none',
                "transform": "scale(1.03) translate(" + newX / 30 + "px," + newY / 30 + "px) rotateY(" + newX / 46 + "deg)"
            })
        })
    })
    $(".block").mouseleave(function(e) {
        $(this).css({
            "transition": "all 0.5s ease",
            "transform": "scale(1) "
        })
    })


}