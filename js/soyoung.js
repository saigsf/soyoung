$(window).scrollTop(0);
$(function() {
    // 返回顶部方法调用
    toTop();
    // 隐藏栏显示
    showSideBar();
    message();
    edition();

});

function toTop() {

    var toTopBtn = document.querySelector("#toTop");

    $(window).scroll(function() {

        if ($(window).scrollTop() > 400) {
            toTopBtn.parentNode.style.opacity = 1;
        } else {
            toTopBtn.parentNode.style.opacity = 0;
        }
    });
    var lock = true;
    var timer = null;
    toTopBtn.addEventListener("click", function() {
        if (!lock) {
            return;
        }
        clearInterval(timer)

        var scroll = $(window).scrollTop();
        timer = setInterval(function() {
            scroll -= 20;
            if (scroll < 0) {
                clearInterval(timer);
            }
            $(window).scrollTop(scroll);
        }, 5);
        console.log(scroll)
        lock = false;
        setTimeout(function() {
            lock = true;

        }, 1000);

    }, false);
}

function showSideBar() {
    var wxBtn = document.querySelector("#sweixin");
    var closeBtn = document.querySelector(".close-btn");
    var shareBtn = document.querySelector("#mobile");
    var wxCode = document.querySelector(".wx-code");
    var wxlink = document.querySelector(".wx-link");

    wxBtn.addEventListener("click", function() {
        var sideBar = document.querySelector(".side-hiden");
        sideBar.style.right = 0 + "px";
        this.parentNode.style.left = 50 + "px";
    }, false);

    closeBtn.addEventListener("click", function() {
        var sideBar = document.querySelector(".side-hiden");
        sideBar.style.right = -200 + "px";
        wxBtn.parentNode.style.left = 0 + "px";
    }, false);
    wxlink.addEventListener("click", function() {
        wxCode.style.display = "block";
    }, false);
    shareBtn.addEventListener("click", function() {
        wxCode.style.display = "block";
    }, false);
    wxCode.addEventListener("click", function(event) {
        event.preventDefault();
        if (event.target.parentNode.className != "code-pic") {
            wxCode.style.display = "none";
        }

    }, false);

    // 小屏幕时的sideBar
    var openAssist = document.querySelector("#openAssist");
    var oDivs = document.querySelectorAll(".assist div");

    var isOpen = false;
    var lock = true;
    openAssist.addEventListener("click", function() {
        if (!lock) {
            return;
        }
        if (isOpen) {
            this.className = "active hidden-lg";
            for (var i = 0; i < oDivs.length; i++) {
                oDivs[i].className = "";

            }

            isOpen = false;
        } else {
            this.className = "";
            for (var i = 0; i < oDivs.length; i++) {
                oDivs[i].className = "active";

            }

            isOpen = true;
        }
        lock = false;
        setTimeout(function() {
            lock = true;

        }, 300);

    }, false);

}

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
                url: "./php/api_user.php",
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
                        //console.log(err);
                        alert("提交失败,系统错误");
                    }
                }
            });
        }

    }, false);

}

function edition() {
    $(".top-logo .logo").click(function() {
        console.log($("#white").attr('href'))
        if (!$("#white").attr('href')) {
            $("#white").attr('href', 'css/bwhite.css');

        } else {
            $("#white").attr('href', '');
        }

    })

}