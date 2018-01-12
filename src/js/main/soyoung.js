/*
* @Author: saigsf<qq: 2270029397 email: sai_gsf@163.com>
* @Date:   2017-12-12
* @Last Modified by:   M S I
* @Last Modified time: 2017-12-23
*/

// $(window).scrollTop(0);
(function () {
	$(function () {
		// 尺寸转换
		var changeSize = function (num) {
			return num * (document.documentElement.clientWidth / 3840)
		}
		// 转换数字为百分数
		var toPercent = function (str, num) {
			if (!Object.prototype.toString.call(str) === '[object Number]' || (!num === parseInt(num) && num > 0)) {
				return;
			}
			str = str.toFixed(num + 2);
			return str.slice(2, 4) + '.' + str.slice(4, 5) + '%';
		};
		// 获取随机数
		var random = function (num) { // 随机数字
			return Math.floor(Math.random() * num);
		}
		// 生成加数据
		var genFakeData = function (length, num) {
			var data = [];
			for (let i = 0; i < length; i++) {
				data.push(random(num));
			}
			return data;
		};
		// 数字格式化
		var numberFormat = function (number, type) {

		}

		var main = {
			render: function () {
				this.message();
				this.bullet();
				this.edition();
				this.move3D();
				this.musicCtrl();
				this.navConfirm();
				this.overlay();
				this.rolling();
				this.myEcharts();
			},
			message: function () {
				var message = document.querySelector("#message");
				var submit = document.querySelector(".submit");
				submit.addEventListener("click", function () {
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
							success: function (res) {
								if (res.code == 0) {
									alert("提交成功")
								} else if (res.code == 10004) {
									alert("内容不能为空")
								}
							},
							error: function (err) {
								if (err) {
									console.log(err);
									alert("提交失败,系统错误");
								}
							}
						});
					}

				}, false);

			},
			edition: function () {
				$(".top-logo a").click(function () {
					// console.log($("#white").attr('href'))
					if (!$("#white").attr('href')) {
						$("#white").attr('href', 'css/bwhite.css');

					} else {
						$("#white").attr('href', '');
					}

				})

			},
			rolling: function () {
				let $pageBox = $(".pageBox");
				let nowPage = 0;
				let lock = true;
				var pageMove = this.pageMove;
				$(document).mousewheel((e, delta) => {
					// toTop()
					if (!lock) {
						return;
					}
					nowPage -= delta;
					// 对参数进行判断
					if (nowPage < 0) {
						nowPage = 0;
					}
					if (nowPage > 4) {
						nowPage = 4;
					}
					pageMove($pageBox, nowPage);

					lock = false;
					/*函数节流，知道两秒钟后，才能执行该函数*/
					setTimeout(function () {
						lock = true;
					}, 1000);
				});

			},
			bullet: function () {
				let $pageBox = $(".pageBox");
				var pageMove = this.pageMove;
				$(".bullets .bullet").each(function (i) {
					$(this).click(function () {
						pageMove($pageBox, i);

					})
				})
			},
			pageMove: function (obj, page) {
				// console.log(page)
				$(".bullets .bullet").eq(page).addClass("bullet-active").siblings(".bullet-active").removeClass("bullet-active");
				$(".o-content .o-c-inner").eq(page).addClass("o-c-active").siblings(".o-c-active").removeClass("o-c-active");
				//方法一使用css样式 
				// console.log(obj.height())

				obj.css('top', -obj.height() / 5 * page + "px")
					.children(".page").each(function (i) {
						if (i == page) {
							$(this).addClass("ani-slide");
						} else {
							$(this).removeClass('ani-slide');
						}
					});

				//方法二 使用运动框架
				// $container.animate({
				//     "top": -nowPage * 100 + "%"
				// }, 1000);

				// obj.children(".page")[page].find(".ani")
			},
			overlay: function () {
				let $pageBox = $(".pageBox");
				var pageMove = this.pageMove;
				$(".o-content .o-c-inner").each(function (i) {
					$(this).click(function () {
						pageMove($pageBox, i);
					})
				})
			},
			navConfirm: function () {
				$(".header-btn-box .btn").click(function () {
					if (!!$(this).prop('isOpen')) {
						$(this).removeClass("btn-close").addClass("btn-open")
						$(this).prop('isOpen', false);
						$(".overlay").removeClass("ani-slide").addClass("ani-slide-o  hidden")

					} else {
						$(this).removeClass("btn-open").addClass("btn-close")
						$(this).prop('isOpen', true);
						$(".overlay").removeClass("ani-slide-o hidden").addClass("ani-slide")
					}

				});
			},
			musicCtrl: function () {
				$(".video").mouseover(function () {
					// console.log($(".music")[0].paused)
					if ($(".music")[0].paused) {
						$(".video-stop").removeClass("hidden")
					} else {
						$(".video-start").removeClass("hidden")

					}

				});
				$(".video").mouseout(function () {
					// console.log($(".music")[0].paused)

					$(".video-stop").addClass("hidden")

					$(".video-start").addClass("hidden")

				});

				$(".video").click(function (e) {
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

			},
			move3D: function () {
				var newX = 0,
					newY = 0;
				$(".block").mouseenter(function (e) {

					var x = e.clientX;
					var y = e.clientY;
					$(this).css({
						"transform": "scale(1.03) "
					})

					$(".block").mousemove(function (e) {

						newX = e.clientX - x;
						newY = e.clientY - y;
						$(this).css({
							"transition": 'none',
							"transform": "scale(1.03) translate(" + newX / 30 + "px," + newY / 30 + "px) rotateY(" + newX / 46 + "deg)"
						})
					})
				})
				$(".block").mouseleave(function (e) {
					$(this).css({
						"transition": "all 0.5s ease",
						"transform": "scale(1) "
					})
				})


			},
			myEcharts: function () {
				var data = [
					{
						name: 'javascript',
						value: 90
					}, {
						name: 'CSS3',
						value: 70
					}, {
						name: 'HTML5',
						value: 90
					}, {
						name: 'PHP',
						value: 75
					}, {
						name: 'MySQL',
						value: 80
					}, {
						name: 'skill',
						value: 100
					}],
					total = 100;

				var seriesLabel = {
					normal: {
						show: true,
						textBorderColor: '#333',
						textBorderWidth: 2
					}
				}
				var echartOne = echarts.init($('#echart-one')[0]),
					echartOneOptions = {
						title: {
							text: 'Legend:'
						},
						grid: {
							show: false,
							left: 100,
						},
						xAxis: {
							type: 'value',
							// name: 'score',
							axisLabel: {
								show: false,
								formatter: '{value}'
							},
							axisLine: { show: false },
							axisTick: { show: false },
							splitLine: { show: false },
							min: 0,
							max: 100
						},
						yAxis: {
							type: 'category',
							inverse: true,
							axisLine: { show: false },
							axisTick: { show: false },
							splitLine: { show: false },
							data: ['JavaScript', 'CSS3', 'HTML5', 'PHP', 'MySQL'],
						},
						series: [{
							name: 'City Alpha',
							type: 'bar',
							data: [{
								name: data[0].name,
								value: data[0].value,
								itemStyle: {
									normal: {
										color: '#97BE0D'
									}
								}
							}, {
								name: data[1].name,
								value: data[1].value,
								itemStyle: {
									normal: {
										color: '#D84F5F'
									}
								}
							}, {
								name: data[2].name,
								value: data[2].value,
								itemStyle: {
									normal: {
										color: '#88B8E6'
									}
								}
							}, {
								name: data[3].name,
								value: data[3].value,
								itemStyle: {
									normal: {
										color: '#BEDBE9'
									}
								}
							}, {
								name: data[4].name,
								value: data[4].value,
								itemStyle: {
									normal: {
										color: '#EDEBEE'
									}
								}
							}],
							label: seriesLabel,
						}
						]
					};


				var placeHolderStyle = {
					normal: {
						color: 'rgba(0,0,0,0)',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					},
					emphasis: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					}
				};
				var dataStyle = {
					normal: {
						label: { show: false },
						labelLine: { show: false },
						shadowBlur: changeSize(40),
						shadowColor: 'rgba(40, 40, 40, 0.5)',
					}
				};
				var labelLine = {
					normal: {
						show: false,
						length: changeSize(200),
						length2: changeSize(100),
						lineStyle: {
							type: 'dashed',
							width: 4,
						},
					},
				};
				var label = {
					normal: {
						show: false,
						position: "center",
						formatter: function (param) {
							console.log(param)
							str = param.name;
							return str;
						},
						textStyle: {
							fontSize: changeSize(50),
							fontFamily: "Microsoft Yahei",
							color: '#fff'
						},
					},
					emphasis: {
						show: true
					}
				};

				var startAngle = genFakeData(5, 360);
				var echartTwo = echarts.init($('#echart-two')[0]),
					echartTwoOptions = {
						color: ['rgba(166, 209, 14, .7)', 'rgba(216, 79, 95, .7)', 'rgba(149, 202, 153, .7)', 'rgba(190, 219, 233, .7)', '#EDEBEE', 'rgba(166, 209, 14, .7)'],
						legendHoverLink: true,
						hoverAnimation: true,
						series: [{
							avoidLabelOverlap: true,
							name: data[0].name,
							type: 'pie',
							clockWise: true,
							radius: [changeSize(530), changeSize(600)],
							//startAngle: startAngle[0],
							itemStyle: dataStyle,
							hoverAnimation: true,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[0].value,
									name: data[0].name
								},
								{
									value: total - data[0].value,
									name: 'invisible',
									itemStyle: placeHolderStyle,
								}

							],

						}, {
							name: data[1].name,
							type: 'pie',
							clockWise: true,
							radius: [changeSize(430), changeSize(500)],
							//startAngle: startAngle[1],
							itemStyle: dataStyle,
							hoverAnimation: true,
							avoidLabelOverlap: true,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[1].value,
									name: data[1].name,

								},
								{
									value: total - data[1].value,
									name: 'invisible',
									itemStyle: placeHolderStyle
								}
							],
						}, {
							name: data[2].name,
							type: 'pie',
							clockWise: true,
							hoverAnimation: true,
							avoidLabelOverlap: true,
							radius: [changeSize(330), changeSize(400)],
							//startAngle: startAngle[2],
							itemStyle: dataStyle,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[2].value,
									name: data[2].name,
								},
								{
									value: total - data[2].value,
									name: 'invisible',
									itemStyle: placeHolderStyle
								}
							],
						}, {
							name: data[3].name,
							type: 'pie',
							clockWise: true,
							hoverAnimation: true,
							avoidLabelOverlap: true,
							radius: [changeSize(230), changeSize(300)],
							//startAngle: startAngle[3],
							itemStyle: dataStyle,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[3].value,
									name: data[3].name,
								},
								{
									value: total - data[3].value,
									name: 'invisible',
									itemStyle: placeHolderStyle
								}
							],
						}, {
							name: data[4].name,
							type: 'pie',
							clockWise: true,
							hoverAnimation: true,
							avoidLabelOverlap: true,
							radius: [changeSize(130), changeSize(200)],
							//startAngle: startAngle[4],
							itemStyle: dataStyle,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[4].value,
									name: data[4].name,
								},
								{
									value: total - data[4].value,
									name: 'invisible',
									itemStyle: placeHolderStyle
								}
							],
						}, {
							name: data[4].name,
							type: 'pie',
							clockWise: true,
							hoverAnimation: true,
							avoidLabelOverlap: true,
							radius: [changeSize(0), changeSize(100)],
							itemStyle: dataStyle,
							labelLine: labelLine,
							label: label,
							data: [
								{
									value: data[5].value,
									name: data[5].name,
								},
								{
									value: total - data[5].value,
									name: 'invisible',
									itemStyle: placeHolderStyle
								}
							],
						}]
					};

				echartOne.setOption(echartOneOptions);
				echartTwo.setOption(echartTwoOptions);

			}
		}
		main.render();
	})
})();





