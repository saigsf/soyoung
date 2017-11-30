## chart.js[使用说明](http://www.chartjs.org/docs/)
### 下载安装
两种方式导入：
#### 使用CDN
1. 使用CDN下载chart.js 文件 [Chart.js CDN](http://www.bootcdn.cn/Chart.js/)
2. 参考[中文文档](http://www.bootcss.com/p/chart.js/docs/)
3. 在页面中引入Chart.js文件
```JavaScript
<script src="Chart.js"></script>
// 或
<script src="//cdn.bootcss.com/Chart.js/2.1.6/Chart.bundle.js"></script>
```
4. 创建图表
```html
<canvas id="myChart" width="400" height="400"></canvas>
```
```JavaScript
// 原生
//Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).PolarArea(data);

// jQuery
//Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
var myNewChart = new Chart(ctx);
```

#### 使用npm下载
```
npm install chart.js --save
```
其他都一样

### 环形图的使用
```JavaScript
new Chart(ctx).Doughnut(data,options);

var data = [
	{
		value: 30,
		color:"#F7464A"
	},
	{
		value : 50,
		color : "#E2EAE9"
	},
	{
		value : 100,
		color : "#D4CCC5"
	},
	{
		value : 40,
		color : "#949FB1"
	},
	{
		value : 120,
		color : "#4D5360"
	}

]

Doughnut.defaults = {
	//Boolean - Whether we should show a stroke on each segment
	segmentShowStroke : true,
	
	//String - The colour of each segment stroke
	segmentStrokeColor : "#fff",
	
	//Number - The width of each segment stroke
	segmentStrokeWidth : 2,
	
	//The percentage of the chart that we cut out of the middle.
	percentageInnerCutout : 50,
	
	//Boolean - Whether we should animate the chart	
	animation : true,
	
	//Number - Amount of animation steps
	animationSteps : 100,
	
	//String - Animation easing effect
	animationEasing : "easeOutBounce",
	
	//Boolean - Whether we animate the rotation of the Doughnut
	animateRotate : true,

	//Boolean - Whether we animate scaling the Doughnut from the centre
	animateScale : false,
	
	//Function - Will fire on animation completion.
	onAnimationComplete : null
}
```

