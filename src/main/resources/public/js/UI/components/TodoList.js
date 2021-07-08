import {Eventable} from '../../lib/Eventable.js';
import {COMPLETED_VALUE} from  '../../lib/CONST.js';
import {HIDDEN_VALUE} from  '../../lib/CONST.js';

var filter = 'all';

export class TodoList extends Eventable {
    constructor(root) {
        super();
        this._root = root;
    }

    setComponent(component) {
        this._component = component;
    }

    getItems() {
        return this._root.querySelectorAll('.todos-list_item');
    }

        getFilter(){
        return filter;
    }

    markAllAsDone() {
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            this._component.markAsDone(items[i]);
        }
    }

    getItemsCount() {
        return this.getItems().length;
    }

    getCompleted() {
        var count = 0;
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains(COMPLETED_VALUE))
                count++;
        }
        return count;
    }

    removeCompletedItems() {
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains(COMPLETED_VALUE))
                this._component.removeTodo(items[i]);
        }
    }

    showAllItems() {
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove(HIDDEN_VALUE);
        }
    }

    showCompleted() {
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            if (!items[i].classList.contains(COMPLETED_VALUE))
                items[i].classList.add(HIDDEN_VALUE);
            else
                items[i].classList.remove(HIDDEN_VALUE);
        }
    }

    showActive() {
        const items = this.getItems();
        for (var i = 0; i < items.length; i++) {
            if (items[i].classList.contains(COMPLETED_VALUE))
                items[i].classList.add(HIDDEN_VALUE);
            else
                items[i].classList.remove(HIDDEN_VALUE);
        }
    }


    setFilter(filterId) {
        filter = filterId;
        switch (filterId) {
            case 'all':
                this.showAllItems();
                break;
            case 'completed':
                this.showCompleted();
                break;
            case 'active':
                this.showActive();
                break;
        }
    }
}
