import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import _ from "lodash";

class TimeStore extends EventEmitter {

    constructor() {
        super();

        this.term = "S"; // F, I, S
        this.year = 2018;
    }

    getTerm(action) {
        return this.term;
    }

    getYear() {
        return this.year;
    }

    handleActions(action) {
        switch(action.type) {
            case "TIME": {
                this.getTerm();
                break;
            }
        }
    }

}

const timeStore = new TimeStore();
dispatcher.register(timeStore.handleActions.bind(timeStore));

export default timeStore;