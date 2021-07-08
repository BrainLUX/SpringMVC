export class TodoMain {
    constructor(todoBoard) {
        this._board = todoBoard;
    }

    showFullInterface() {
        this._board.classList.add('__has-content');
    }

    hideFullInterface() {
        this._board.classList.remove('__has-content');
    }
}