import { State } from './State';
export declare class DOMManager<T> {
    #private;
    constructor(state: State<T>);
    updateElements(state: T): void;
}
