let loggerObj = require('../../../utils/logger');//log日志记录
let Logger = loggerObj.mongodb;
let Tool = require('../../../utils/tool');
let MongodbModel = require('../../common/mongodb');
//聊天室信息
let mongodb_chat = new MongodbModel('wechat','chatList');
mongodb_chat.init();

let Chat ={
	addChat: (info)=>{
		return new Promise((resolve, reject)=> {
			Logger.info(info)
			mongodb_chat.save(info,(err,rs)=>{
				if(err) {
		        	reject(err);
		        	return;
		        }
		        resolve()
			});
		});
	},
	updateChat: (info,base64,filepath)=>{
		return new Promise((resolve, reject)=> {
			let searchObj ={
				where:{CreateTime:info.CreateTime,FromUserId:info.FromUserId},
				setting:{PicBase64:base64,PicPath:filepath,CreateTime:info.CreateTime,FromUserId:info.FromUserId}
			}
			mongodb_chat.update(searchObj);
		});
	},
	findChatList: ()=>{
		return new Promise((resolve, reject)=> {
			let _today = Tool.formatDate(new Date());
			let searchObj = {
				match:{CreateTime:{$regex: _today, $options:'i'},Platform:'wxwork'},
				//group:{$or:[{"_id" : "$FromUserId"},{"_id" : "$ToUserId"}],"FromUserId": {$first:"$FromUserId"}, "FromUserName": {$first:"$FromUserName"},"FromUserAvatar":{$first:"$FromUserAvatar"},"FromUserMobile":{$first:"$FromUserMobile"},"MsgType":{$last:"$MsgType"},"Content":{$last:"$Content"},"PicUrl":{$last:"$PicUrl"},"CreateTime":{$last:"$CreateTime"}},
				group:{_id : "$FromUserId","FromUserId": {$last:"$FromUserId"}, "FromUserDepartment": {$last:"$FromUserDepartment"},"FromUserName": {$last:"$FromUserName"},"FromUserAvatar":{$last:"$FromUserAvatar"},"FromUserMobile":{$last:"$FromUserMobile"},"MsgType":{$last:"$MsgType"},"Content":{$last:"$Content"},"PicUrl":{$last:"$PicUrl"},"CreateTime":{$last:"$CreateTime"}},
				sort:{CreateTime:-1}
			}
			mongodb_chat.aggregate(searchObj,function(err,info){
		        if(err) {
		        	Logger.error(err)
		        	reject(err);
		        	return;
		        }
		        if(info){
		        	Logger.info(info)
		        	resolve(info)		        	
		        }
		    });

		});
	},
	findUserChat: (param)=>{
		return new Promise((resolve, reject)=> {
			let searchObj ={
				where:{CreateTime:{$gt:param.time},$or:[{"FromUserId":param.userId},{"ToUserId": param.userId}]},
				sort:{CreateTime:1}
			}
			if(param.isPast) {
				let _today = Tool.formatDate(new Date(param.time));
				searchObj.where={CreateTime:{$lte:param.time,$gte:_today+' 00:00:00'},$or:[{"FromUserId":param.userId},{"ToUserId": param.userId}]}
			}
			if(param.keyWords) {
				searchObj.where['Content'] = {$regex: param.keyWords, $options:'i'}
			}
			mongodb_chat.find(searchObj,function(err,info){
		        if(err) {
		        	reject(err);
		        	return;
		        }
		        if(info){
		            resolve(info)
		        }
		    });
	    });
	},
	findUserLastestNews: (param)=>{
		return new Promise((resolve, reject)=> {
			let _today = Tool.formatDate(new Date());
			let searchObj ={
				where:{CreateTime:{$regex: _today, $options:'i'},$or:[{"FromUserId":param.userId},{"ToUserId": param.userId}]},
				sort:{CreateTime:-1}
			}
			mongodb_chat.findOne(searchObj,function(err,info){
		        if(err) {
		        	reject(err);
		        	return;
		        }
		        if(info){
		            resolve(info)
		        }
		    });
	    });
	}

}
module.exports = Chat;
