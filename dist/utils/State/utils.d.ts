export declare const determinePossibleValuesType: (possibleValues: (string | number)[]) => "string" | "number" | "unknown";
export declare const enumStateValidators: {
    isPossibleValuesValid: (possibleValues: (string | number)[], type: string) => boolean;
    isInitialStateValid: <T>(initial: T, possibleValuesType: string) => boolean;
    isUpdateStateValid: <T_1>(state: T_1, possibleValues: (string | number)[], possibleValuesType: string) => boolean;
};
export declare const stateValidators: {
    isIdValid: (id: string) => boolean;
    isWrapperValid: (wrapper: HTMLElement) => boolean;
};
export declare const stateErrorMessages: {
    couldNotCreate: string;
    couldNotUpdate: string;
};
