import {
    makeObservable,
    observable,
    action,
} from 'mobx'

class postStore {
    loadedPosts = [];

    constructor() {makeObservable(this, {
            loadedPosts: observable,
            PushPostStack: action,
            ClearPostStack: action,
        });
    }

    PushPostStack(arr) {
        if(arr !== undefined){
            for(let i = 0; i < arr.length; i++) {
                this.loadedPosts.push(arr[i]);
            }
        }
        else {}
    }

    ClearPostStack() {
        this.loadedPosts = [];
    }
}

const postStoreObj = new postStore();

export { postStoreObj };