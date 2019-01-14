const allConfig = require('../../config/allConfig'),
    _INDEX = allConfig.INDEX;
const Configs={
    index:_INDEX,
    txts:['测试','生产'],
    ips:['10.68.26.167:2017','10.68.26.168:2017'],
}

let loggerObj=require('../../utils/logger');
var logger=loggerObj.mongodb;
var async = require('async');
function mongodbModel(dbname,dataform) {
    var MongoClient,DB_CONN_STR,dbs,db,currcollection;
    this.init = function(callback) {
        MongoClient = require('mongodb').MongoClient;
        DB_CONN_STR = 'mongodb://'+Configs.ips[Configs.index];
        logger.info('准备连接数据库')
        MongoClient.connect(DB_CONN_STR, function(err, client) {
            if(err){logger.error(DB_CONN_STR+"/"+dbname+"/"+dataform+"连接失败！"+ err);return;}
            logger.info(DB_CONN_STR+"/"+dbname+"/"+dataform+"连接成功！");
            dbs=client;
            db=client.db(dbname);
            currcollection = db.collection(dataform);//连接到表
            if(callback) callback();
        });
    }
    /*这里是插入数据*/
    this.insert = function(data,callback) {
        currcollection.insertMany(data, function(err, result) { 
            if(err){logger.error('insert Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();     
        });
    }
    /*这里是删除数据*/
    this.remove = function(whereStr,callback){
        currcollection.deleteOne(whereStr,function(err,result){
            if(err){logger.error('remove Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();     
        })
    }
    this.removeAll = function(callback){
        currcollection.deleteMany({},function(err,result){
            if(err){logger.error('removeAll Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();     
        })
    }
    /*这里是修改*/
    this.save=function(data,callback){
        currcollection.save(data,function(err,result){
            if(err){logger.error('save Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();  
        })
    }
    this.update=function(searchObj,callback){
        currcollection.update(searchObj.where,{$set:searchObj.setting},true,function(err,result){
            if(err){logger.error('update Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();  
        })
    }
    /*这里是查询*/
    this.find=function(searchObj,callback){
        currcollection.find(searchObj.where).sort(searchObj.sort).toArray(function(err, result) {
            if(err){logger.error('find Error:'+ err);}     
            if(callback) callback(err,result);
            //dbs.close(); ;
        });
    }
    this.findOne=function(searchObj,callback){
        currcollection.find(searchObj.where).sort(searchObj.sort).limit(1).toArray(function(err, result) {
            if(err){logger.error('find Error:'+ err);}  
            logger.error(result);   
            if(callback) callback(err,result);
            //dbs.close(); ;
        });
    }
    this.aggregate=function(searchObj,callback){
        let resultArray = [];
        currcollection.aggregate([
            {$match: searchObj.match},
            {$group: searchObj.group},
            {$sort: searchObj.sort}
        ],function(err,result) {
            if(err){logger.error('find Error:'+ err);}     
            if(callback) callback(err,result.toArray());
            
        })
    }
}

module.exports = mongodbModel;