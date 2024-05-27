import { State } from "../../State";
export declare const domManagerValidators: {
    isContentToRenderValid: (content: string) => boolean;
    isShowIfAttributeValid: <T>(state: State<T>, showIfAttr: string) => boolean;
};
export declare const domManagerErrorMessages: {
    couldNotUpdateStateInDOM: string;
};
