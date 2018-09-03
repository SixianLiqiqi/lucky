// 初始化装盘数据 正常情况下应该由后台返回
var wheelSurf;

var initData = {
    "success" : true,
    "list": [{
            "id": 100,
            "name": "5000元京东卡",
            "image": "./src/images/1.png",
            "rank":1,
            "percent":3
        },
        {
            "id": 101,
            "name": "1000元京东卡",
            "image": "./src/images/2.png",
            "rank":2,
            "percent":5
        },
        {
            "id": 102,
            "name": "100个比特币",
            "image": "./src/images/3.png",
            "rank":3,
            "percent":2
        },
        {
            "id": 103,
            "name": "50元话费",
            "image": "./src/images/4.png",
            "rank":4,
            "percent":49
        },
        {
            "id": 104,
            "name": "100元话费",
            "image": "./src/images/5.png",
            "rank":5,
            "percent":30
        },
        {
            "id": 105,
            "name": "500个比特币",
            "image": "./src/images/6.png",
            "rank":6,
            "percent":1
        },
        {
            "id": 106,
            "name": "500元京东卡",
            "image": "./src/images/7.png",
            "rank":7,
            "percent":10
        }
    ]
}


// 计算分配获奖概率(前提所有奖品概率相加100%)
function  getGift () {
    var percent  = Math.random() * 100;
    var totalPercent = 0;
    for (var i = 0, l = initData.list.length; i < l; i++) {
        totalPercent = totalPercent + initData.list[i].percent;
        if (percent <= totalPercent) {
            return initData.list[i];
        }
    }
}

var list = {};
var angel = 360 / initData.list.length;
// 格式化成插件需要的奖品列表格式

// 查看奖品列表格式
for (var i = 0, l = initData.list.length; i < l; i++) {
    list[initData.list[i].rank] = {
        id: initData.list[i].id,
        name: initData.list[i].name,
        image: initData.list[i].image
    }
}

// 定义转盘奖品
wheelSurf = $('#myCanvas').WheelSurf({
    list: list, // 奖品 列表(必填)
    outerCircle: {
        color: '#df1e15'  // 外圈颜色(可选)
    },
    innerCircle: {
        color: '#f4ad26'  // 里圈颜色(可选)
    },
    dots: ['#fbf0a9', '#fbb936'],  // 装饰点颜色(可选)
    disk: ['#ffb933', '#ffe8b5', '#ffb933', '#ffd57c', '#ffb933', '#ffe8b5', '#ffd57c'],  //中心奖盘的颜色，默认7彩(可选)
    title: {
        color: '#5c1e08',
        font: '19px Arial'
    }   // 奖品标题样式 19px 宋体 (可选)
})

// 初始化转盘
wheelSurf.init();

// 抽奖
var throttle = true;
$("#start").on('click', function () {
    var winData = getGift();

    $("#message").html('');
    if(!throttle) {
        return false;
    }
    throttle = false;
    var count = 0;
    // 计算奖品角度


    for (const key in list) {
        if (list.hasOwnProperty(key)) {                    
            if (winData.id == list[key].id) {
                break;
            }
            count++    
        }
    }

    // 转盘抽奖
    wheelSurf.lottery((count * angel + angel / 2), function () {
        $("#message").html(winData.name);
        throttle = true;
    })
})
