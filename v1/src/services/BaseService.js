class BaseService{
    async findAll(){
        return await this.model.find();
    }
    async add(item){
        return await this.model.create(item);
    }
    async delete(itemId){
        return await this.model.remove({_id: itemId});
    }
    async saveModel(){
        return await this.model.save();
    }
    async find(itemId=1){
        return await this.model.findById(itemId);
    }
}

export default BaseService;