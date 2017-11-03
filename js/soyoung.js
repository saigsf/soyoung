$(window).scrollTop(0);
$(function() {

    // 返回顶部方法调用

    // 隐藏栏显示

    message();
    edition();

    rolling();
    navConfirm();
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
            $.ajax({
                type: "get",
                url: "php/api_user.php",
                data: {
                    "name": "'" + name + "'",
                    "email": "'" + email + "'",
                    "phone": "'" + phone + "'",
                    "content": "'" + content + "'"
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
    // $(window).keyup(function(e) {
    //     if (!lock) {
    //         return;
    //     }
    //     switch (e.keyCode) {
    //         case 38:
    //             nowPage--;
    //             pageMove($pageBox, nowPage);
    //             break;
    //         case 40:
    //             nowPage++;
    //             pageMove($pageBox, nowPage);
    //             break;
    //         case 123:

    //             break;

    //         default:
    //             break;
    //     }
    //     lock = false;
    //     /*函数节流，知道两秒钟后，才能执行该函数*/
    //     setTimeout(function() {
    //         lock = true;
    //     }, 1000);
    // })
}

function pageMove(obj, page) {
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