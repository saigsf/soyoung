/**
 * 说明：通过正则验证表单输入
 * 时间：2017/11/15 17点14分
 * author：saber
 * 
 * verify()单个表单验证
 * verify()所有表单验证
 * 
 */

(function($) {
    $.fn.extend({
        verify: function(option, callback) {
            // var flag = false;
            // var inputVal = $(this).val();
            // if (reg.test(inputVal)) {
            //     flag = true;
            // } else {
            //     flag = false;
            // }
            callback(option);
            return $(this);
        },
        verifyAll: function(options, callback) {
            if (typeof options === "object") {
                if (options instanceof Array) {
                    console.log(1);
                    for (let i = 0; i < options.length; i++) {
                        const item = options[i];
                        console.log(item)
                    }
                } else {
                    for (const key in options) {
                        if (options.hasOwnProperty(key)) {
                            const item = options[key];
                            console.log(item)
                        }
                    }
                }
            }

            callback(options);
            return $(this);
        }
    })
})(jQuery);