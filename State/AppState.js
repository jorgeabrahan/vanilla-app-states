var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DOMUpdatesHandler_instances, _DOMUpdatesHandler_stateElements, _DOMUpdatesHandler_stateWrapper, _DOMUpdatesHandler_state, _DOMUpdatesHandler_handleCustomStateRendering, _DOMUpdatesHandler_handleSingleValueStateRendering, _State_instances, _State_stateId, _State_stateInitial, _State_stateCurrent, _State_possibleValues, _State_isEnum, _State_isCustomRenderEnabled, _State_domHandler, _State_changeState;
export class DOMUpdatesHandler {
    constructor(state, stateWrapper) {
        _DOMUpdatesHandler_instances.add(this);
        _DOMUpdatesHandler_stateElements.set(this, void 0);
        _DOMUpdatesHandler_stateWrapper.set(this, void 0);
        _DOMUpdatesHandler_state.set(this, void 0);
        __classPrivateFieldSet(this, _DOMUpdatesHandler_state, state, "f");
        __classPrivateFieldSet(this, _DOMUpdatesHandler_stateWrapper, stateWrapper, "f");
        __classPrivateFieldSet(this, _DOMUpdatesHandler_stateElements, Array.from(__classPrivateFieldGet(this, _DOMUpdatesHandler_stateWrapper, "f").querySelectorAll(`[data-state="${__classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").id}"]`)), "f");
    }
    updateDOMElements(state) {
        for (const element of __classPrivateFieldGet(this, _DOMUpdatesHandler_stateElements, "f")) {
            if (__classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").isCustomRenderEnabled) {
                __classPrivateFieldGet(this, _DOMUpdatesHandler_instances, "m", _DOMUpdatesHandler_handleCustomStateRendering).call(this, state, element);
                continue;
            }
            __classPrivateFieldGet(this, _DOMUpdatesHandler_instances, "m", _DOMUpdatesHandler_handleSingleValueStateRendering).call(this, state, element);
        }
    }
}
_DOMUpdatesHandler_stateElements = new WeakMap(), _DOMUpdatesHandler_stateWrapper = new WeakMap(), _DOMUpdatesHandler_state = new WeakMap(), _DOMUpdatesHandler_instances = new WeakSet(), _DOMUpdatesHandler_handleCustomStateRendering = function _DOMUpdatesHandler_handleCustomStateRendering(state, element) {
    // rendering state content with the onRender function
    const content = __classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").onRender(state);
    if (typeof content !== 'string')
        throw new Error('onRender must return a string');
    if (element.innerHTML !== content)
        element.innerHTML = content;
}, _DOMUpdatesHandler_handleSingleValueStateRendering = function _DOMUpdatesHandler_handleSingleValueStateRendering(state, element) {
    if (element.getAttribute('data-show-if') !== null) {
        if (!__classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").isEnum || __classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").possibleValues.some(value => typeof value !== 'string')) {
            console.error('data-show-if is only supported for enum states with string values');
            return;
        }
        if (!__classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").possibleValues.includes(element.getAttribute('data-show-if') ?? '')) {
            console.error(`data-show-if must be one of the possible values ${JSON.stringify(__classPrivateFieldGet(this, _DOMUpdatesHandler_state, "f").possibleValues)}`);
            return;
        }
        if (state === element.getAttribute('data-show-if'))
            element.style.display = '';
        else
            element.style.display = 'none';
        return;
    }
    if (typeof state === 'string' || typeof state === 'number' || typeof state === 'bigint') {
        const newContent = `${state}`;
        // if newContent is the same as the current content, do nothing
        if (element.textContent === newContent)
            return;
        // otherwise, update the text content of the element
        element.textContent = newContent;
        return;
    }
    if (typeof state === 'boolean') {
        // boolean states are used to toggle the visibility of an element
        const display = state ? '' : 'none';
        if (element.style.display === display)
            return;
        element.style.display = display;
    }
};
export class State {
    // since stateId and stateCurrent are readonly properties
    // they are declared as private and a getter is provided
    get id() {
        return __classPrivateFieldGet(this, _State_stateId, "f");
    }
    get current() {
        return __classPrivateFieldGet(this, _State_stateCurrent, "f");
    }
    get isCustomRenderEnabled() {
        return __classPrivateFieldGet(this, _State_isCustomRenderEnabled, "f");
    }
    get isEnum() {
        return __classPrivateFieldGet(this, _State_isEnum, "f");
    }
    get possibleValues() {
        return __classPrivateFieldGet(this, _State_possibleValues, "f");
    }
    constructor({ id, initial, wrapper = document.body, onChange = () => { }, onRender, possibleValues }) {
        _State_instances.add(this);
        _State_stateId.set(this, void 0);
        _State_stateInitial.set(this, void 0);
        _State_stateCurrent.set(this, void 0);
        _State_possibleValues.set(this, void 0);
        // this value determines if a possible values array is used
        _State_isEnum.set(this, void 0);
        _State_isCustomRenderEnabled.set(this, void 0);
        _State_domHandler.set(this, void 0);
        if (!id || typeof id !== 'string')
            throw new Error('id must be a non-empty string');
        if (!(wrapper instanceof HTMLElement))
            throw new Error('stateWrapper must be an instance of HTMLElement');
        __classPrivateFieldSet(this, _State_stateId, id, "f");
        __classPrivateFieldSet(this, _State_stateInitial, initial, "f");
        __classPrivateFieldSet(this, _State_stateCurrent, initial, "f");
        this.onStateChange = onChange;
        // if a possible values array is provided, then the state will be considered an enum
        // therefore when setting the state, the value must be one of the possible values
        __classPrivateFieldSet(this, _State_isEnum, possibleValues != null, "f");
        if (possibleValues != null) {
            __classPrivateFieldSet(this, _State_possibleValues, possibleValues, "f");
            if (!(possibleValues instanceof Array)) {
                throw new Error('possibleValues must be an array');
            }
            if (possibleValues.some((value) => typeof value !== 'string' && typeof value !== 'number'))
                throw new Error('possibleValues must be an array of strings or numbers');
            if (possibleValues.length === 0)
                throw new Error('possibleValues must NOT be an empty array');
            // currently, the possible values array must be a string or a number
            // therefore the state could only be set to a string or a number
            if (typeof initial !== 'string' && typeof initial !== 'number')
                throw new Error('initial must be a string or a number if possibleValues is provided');
        }
        else
            __classPrivateFieldSet(this, _State_possibleValues, [], "f");
        // if an onRender function is provided, it will be used to render the state
        // therefore 'custom rendering' will be enabled
        // otherwise, the default rendering will be used
        __classPrivateFieldSet(this, _State_isCustomRenderEnabled, onRender != null, "f");
        if (onRender != null)
            this.onRender = onRender;
        else
            this.onRender = () => ``;
        // create an dom handler instance to manage the DOM updates
        __classPrivateFieldSet(this, _State_domHandler, new DOMUpdatesHandler(this, wrapper), "f");
        // update dom elements with the initial state
        __classPrivateFieldGet(this, _State_domHandler, "f").updateDOMElements(__classPrivateFieldGet(this, _State_stateCurrent, "f"));
    }
    // this method is used to change the state value and update the DOM
    update(state) {
        // if the state is an enum, then the state must be of type string or number
        // also the state must be one of the possible values
        if (__classPrivateFieldGet(this, _State_isEnum, "f")) {
            if (typeof state !== 'string' && typeof state !== 'number') {
                console.error('State must be a string or a number to match one of the possible values');
                return;
            }
            if (!__classPrivateFieldGet(this, _State_possibleValues, "f").includes(state)) {
                console.error(`State must be one of the possible values ${JSON.stringify(__classPrivateFieldGet(this, _State_possibleValues, "f"))}`);
                return;
            }
        }
        __classPrivateFieldGet(this, _State_domHandler, "f").updateDOMElements(state);
        __classPrivateFieldGet(this, _State_instances, "m", _State_changeState).call(this, state);
    }
    // this method resets the state to the initial state
    reset() {
        __classPrivateFieldGet(this, _State_instances, "m", _State_changeState).call(this, __classPrivateFieldGet(this, _State_stateInitial, "f"));
        __classPrivateFieldGet(this, _State_domHandler, "f").updateDOMElements(__classPrivateFieldGet(this, _State_stateCurrent, "f"));
    }
}
_State_stateId = new WeakMap(), _State_stateInitial = new WeakMap(), _State_stateCurrent = new WeakMap(), _State_possibleValues = new WeakMap(), _State_isEnum = new WeakMap(), _State_isCustomRenderEnabled = new WeakMap(), _State_domHandler = new WeakMap(), _State_instances = new WeakSet(), _State_changeState = function _State_changeState(state) {
    const prevState = __classPrivateFieldGet(this, _State_stateCurrent, "f");
    __classPrivateFieldSet(this, _State_stateCurrent, state, "f");
    this.onStateChange(state, prevState);
};
