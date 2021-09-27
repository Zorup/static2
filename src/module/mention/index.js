export class UserInformation{
    constructor(userId, userName){
        if(!Number.isInteger(userId)){
            throw new Error("UserPk must be integer");
        }
        if(typeof userName !== 'string'){
            throw new Error("UserName must be string");
        }
        this.userId = userId;
        this.userName = userName;
    }
}

export class DeepUserInfoSet extends Set {
    add (o) {
        for (let i of this)
            if (this.deepCompare(o, i))
                return this;
        super.add.call(this, o);
        return this;
    };

    has(userId){
        for(let i of this){
            if(userId === i.userId){
                return true;
            }
        }
        return false;
    };

    deepCompare(o, i) {
        return o.userId === i.userId;
    };
}