let request = require('request')
let fs = require('fs')
let dateFormat = require('dateformat')

//http://v3.wufazhuce.com:8000/api/hp/bymonth/ + yyyy-MM-dd + %2000:00:00?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android

{/*<img style="-webkit-user-select: none;background-position: 0px 0px, 10px 10px;background-size: 20px 20px;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);" src="http://image.wufazhuce.com/FuB1Ga9eZ1D7zHYTdAtaDpZv3RdJ">*/}

let dataurl = 'http://v3.wufazhuce.com:8000/api/hp/bymonth/' + dateFormat(new Date(), "yyyy-mm-dd") + '%2000:00:00?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android'

request(dataurl, ((error, res, body) => {
  if (error) {
    console.error(error)
  } else {
    //解析api
    let todaydata = JSON.parse(body).data[1]
    let imgurl = todaydata.hp_img_url
    let title = todaydata.hp_title
    //调用request下载图片
    request(imgurl).pipe(fs.createWriteStream(title + '.jpg'))

    console.log('Download pic successful~')
  }
}))
/*
request(downUrl, ((error, res, body) => {
  if (error) {
    console.error(error)
  } else {
    //解析api
    let jsonobj = JSON.parse(body).data
    //取出今天的内容
    let today = jsonobj.splice(1,jsonobj.length-1)
    //json转为字符串，再转为用","隔开的数组
    let todayarr = JSON.stringify(jsonobj).split(",")
    //取出数组中的图片数据
    let content = todayarr.splice(4,todayarr.length-4).shift()
    //去掉多余符号，取出图片url
    let imgurl = content.toString().replace(/\"/g, "").replace("hp_img_original_url:","")
    console.log(imgurl)
    //调用request下载图片
    request(imgurl).pipe(fs.createWriteStream(dateFormat(new Date(), "yyyy-mm-dd") + '.jpg'))
    console.log('OK~')
  }
}))
*/

