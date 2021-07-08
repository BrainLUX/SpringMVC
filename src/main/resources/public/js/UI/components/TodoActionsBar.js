import {HIDDEN_VALUE} from  '../../lib/CONST.js';
import {Eventable} from '../../lib/Eventable.js';

export class TodoActionsBar extends Eventable {
    constructor(root) {
        super();
        this._root = root;
        this._button = this._root.querySelector('.todos-toolbar_clear-completed');
        this._filters = this._root.querySelector('.filters');
        this._filters.addEventListener('click', this);
        this._button.addEventListener('click', this);

    }

    setItemsCount(itemsCount) {
        const counter = this._root.querySelector('.todos-toolbar_unready-counter');
        counter.innerHTML = itemsCount + ' items left';
    }

    showRemoveButton() {
        this._button.classList.remove(HIDDEN_VALUE);
    }

    hideRemoveButton() {
        this._button.classList.add(HIDDEN_VALUE);
    }

    clearFilters() {
        const list = this._root.querySelectorAll('.filters-item');
        for (var i = 0; i < list.length; i++)
            list[i].classList.remove('__selected');
    }

    handleEvent(e) {
        switch (e.target.className) {
            case 'todos-toolbar_clear-completed':
                this.trigger('clearCompleted');
                break;
            case 'filters-item':
                this.clearFilters();
                e.target.classList.add('__selected');
                this.trigger('filterSelected', e.target.id);
                break;
            case 'filters-item __selected':
                this.trigger('filterSelected', e.target.id);
                break;

        }
    }
}