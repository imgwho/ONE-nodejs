var request = require('request')
var fs = require('fs')

var url = 'http://rest.wufazhuce.com/OneForWeb/one/getHpinfo?strDate='
var d = new Date()
var downUrl = url + d.toLocaleDateString()


request(downUrl, ((error, res, body) => {
		var jsonObj = JSON.parse(body)
		// console.log(data.hpEntity.strThumbnailUrl)
		// console.log(strThumbnailUrl)
		// var strThumbnailUrl = 'http://image.wufazhuce.com/Fhyd_Ag795olp_HLmW4hBtObhfqT'
		request(jsonObj.hpEntity.strThumbnailUrl).pipe(fs.createWriteStream(jsonObj.hpEntity.strHpTitle + '.jpg'))

		var str = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' + 
		 '<title>ONE</title></head><body>' +
		 '<div style=" position:relative;width: 960px;height: 720px;margin-left: auto;margin-right: auto;">' + 
		 '<img src=" ' + jsonObj.hpEntity.strHpTitle + '.jpg' + ' " width="960  height="720"">	</div>' + 
		 '<div style=" position:relative;width:960px;height:20px;z-index:0;top:0px;margin-left: auto;' + 
		 'margin-right: auto;text-align: center;background-color: #333;text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);color: white">' +
		  jsonObj.hpEntity.strHpTitle + '</div>' + 
		 '<div style=" position:relative;width:960px;height:120px;z-index:0;top:5px;margin-left: auto;margin-right: auto;text-align: center;">' + 
		 ' ' + jsonObj.hpEntity.strContent + ' </div></body></html>'	
						

		fs.writeFile(jsonObj.hpEntity.strHpTitle + '.html', str, (err) => {
		   if (err) throw err
		   console.log('It\'s saved!')
})
	})
)
