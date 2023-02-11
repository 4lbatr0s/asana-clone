class BaseService{
    async findAll(){
        return this.model.find();
    }
    async add(item){
        return this.model.create(item);
    }
    async delete(itemId){
        return this.model.remove({_id: itemId});
    }
    async saveModel(){
        return this.model.save();
    }
    async find(itemId=1){
        return this.model.findById(itemId);
    }
}

export default BaseService;