import {Eventable} from "../../lib/Eventable.js";

export class TodoCreatorComponent extends Eventable {

    /**
     *
     * @param {HTMLElement} root
     */
    constructor(root) {
        super();
        this._input = root.querySelector('.jsTodoText');

        const markAllAsDoneElement = root.querySelector('.jsTodoCheckAllAsDone');

        root.addEventListener('submit', this);
        this._input.addEventListener('keyup', this);
        markAllAsDoneElement.addEventListener('mouseup', this);


    }

    processCurrentInput() {
        const inputValue = this._input.value.trim();

        if (inputValue) {
            this._input.value = '';
            this.trigger('todoAdded', inputValue);
        }
    }

    markAllAsDone() {
        this.trigger('markAllAsDone');
    }

    handleEvent(e) {
        switch (e.type) {
            case 'submit':
                e.preventDefault();
                break;
            case 'mouseup':
                this.markAllAsDone();
                break;
            case 'keyup':
                if (e.keyCode === 13)
                    this.processCurrentInput(e);
                break;
        }
    }
}