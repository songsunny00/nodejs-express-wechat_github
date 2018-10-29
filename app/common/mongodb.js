var loggerObj=require('../../../utils/logger');
var logger=loggerObj.mongodb;
function mongodbModel(dbname,dataform) {
    var MongoClient,DB_CONN_STR,dbs,db,currcollection;
    this.init = function(callback) {
        MongoClient = require('mongodb').MongoClient;
        DB_CONN_STR = 'mongodb://localhost:27017';
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
    this.update=function(whereStr,updata,callback){
        currcollection.update(whereStr,updata,function(err,result){
            if(err){logger.error('update Error:'+ err);}
            if(callback) callback(err,result);
            //dbs.close();  
        })
    }
    /*这里是查询*/
    this.find=function(whereStr,callback){
        currcollection.find(whereStr).toArray(function(err, result) {
            if(err){logger.error('find Error:'+ err);}     
            if(callback) callback(err,result);
            //dbs.close(); ;
        });
    }
}

module.exports = mongodbModel;