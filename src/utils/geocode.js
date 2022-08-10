const request = require('postman-request');

const geocode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=d3e0d2e72bea82f06f886f5b5749a7b0&query='+encodeURIComponent(address);
    request({url,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to connect",undefined)
    }else if(body.error){
        callback("parameters error",undefined)
    }else{
        data=body.data[0];
        callback(undefined,data);
    }
});
}

module.exports=geocode;