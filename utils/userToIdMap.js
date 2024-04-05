const map=new Map();

function setUser(id,user){
    map.set(id,user)
}
function getUser(id){
    return map.get(id)
}
module.exports={setUser,getUser}