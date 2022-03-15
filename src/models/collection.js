'use strict';
class collection {
    constructor(model) {
        this.model = model;
    }

    async createRecord(obj) {
        console.log('this model is', this.model)
        try {

            return await this.model.create(obj);
        } catch (e) {
            console.error('error in creating a new record for model: ', this.model.name);
        }
    }

    async readRecord(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } })
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error('error in reading record(s) for model: ', this.model.name);
        }
    }
    async removeRecord(id) {
        try {
            return await this.model.destroy({ where: { id: id } });
          } catch (err) {
            console.log("error in dataDeleted");
          }
    }
    async updateRecord(obj,id) {
        try { if (obj,id) {
            
            return await this.model.update(obj,{where:{id:id},returning:true})
        } 
        } catch (e) {
            console.error('error in updating record(s) for model: ', this.model.name);
        }
    }

}

module.exports = collection;