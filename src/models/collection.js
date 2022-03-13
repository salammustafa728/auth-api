'use strict';

class Collection {
    constructor(model){
        this.model = model;
    }

    async createData(obj){
        // console.log(this.model,' tttttttt')
        try{
            return await this.model.create(obj);
        } catch(e){
            console.log('error in create new data:  ',this.model.name);
        }
    }

    async readData(recordid){
        try{
            if(recordid){
                return await this.model.findOne({where:{id:recordid}})
            }else{
                return await this.model.findAll()
            }
        }catch(e){
            console.log('error in read the data:  ',this.model.name);
        }
    }

    async deleteRecord(deleteid){
    try{
        if(deleteid){
            return await this.model.destroy({ where: { id: deleteid } })
        }
    }catch(e){
        console.log('error in deleteing the record:  ',this.model.name);
    }   
    }

    async updateRecord(obj,recordUpdateid){
        try{
            if(obj,recordUpdateid){
                return await this.model.update(obj,{where:{id:recordUpdateid}})
            }
        }catch(e){
            console.log('error in updating the record:  ',this.model.name);
        }
    }

}

module.exports = Collection;