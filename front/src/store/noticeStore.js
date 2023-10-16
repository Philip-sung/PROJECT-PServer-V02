import {
    makeObservable,
    observable,
    action,
} from 'mobx'

class noticeStore {
    noticeNumber = 0;

    constructor() {makeObservable(this, {
            noticeNumber: observable,
            getNoticeNumber: action,
            setNoticeNumber: action,
        });
    }

    getNoticeNumber() {
        return this.noticeNumber;
    }
    
    setNoticeNumber(num) {
        this.noticeNumber = num;
    }
}

const noticeStoreObj = new noticeStore();

export { noticeStoreObj };