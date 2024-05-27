export declare class State<T> {
    #private;
    onChange: (state: T, prevState: T) => void;
    onRender: (state: T) => string;
    constructor({ id, initial, wrapper, onChange, onRender, possibleValues, preserve }: {
        id: string;
        initial: T;
        wrapper?: HTMLElement;
        onChange?: (state: T, prevState: T) => void;
        onRender?: (state: T) => string;
        possibleValues?: (string | number)[];
        preserve?: boolean;
    });
    update(state: T): void;
    reset(): void;
    get id(): string;
    get current(): T;
    get isUsingOnRender(): boolean;
    get isEnum(): boolean;
    get possibleValues(): (string | number)[];
    get possibleValuesType(): string;
    get wrapper(): HTMLElement;
}
