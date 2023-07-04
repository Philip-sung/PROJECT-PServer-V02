import {
    makeObservable,
    observable,
    action,
} from 'mobx'

class searchStore {
    DEFAULT_OFFSET = 0;
    DEFAULT_LIMIT = 10;
    DEFAULT_LIMIT_EXTEND = 5;

    curKeyword = "";
    offset = 0;
    limit = 10;

    constructor() {makeObservable(this, {
            curKeyword: observable,
            offset: observable,
            limit: observable,
            SetKeyword: action,
            InitializeOffsetLimit: action,
        });
    }

    SetKeyword(key){
        this.curKeyword = key;
    }

    InitializeOffsetLimit() {
        this.offset = this.DEFAULT_OFFSET;
        this.limit = this.DEFAULT_LIMIT;
    }
    
    ExtendLimit() {
        this.limit = this.limit + this.DEFAULT_LIMIT_EXTEND;
    }

}

const searchStoreObj = new searchStore();

export { searchStoreObj };