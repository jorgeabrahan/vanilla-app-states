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
var _DOMHandler_instances, _DOMHandler_stateElements, _DOMHandler_stateId, _DOMHandler_stateWrapper, _DOMHandler_isCustomRenderEnabled, _DOMHandler_onRender, _DOMHandler_handleCustomRendering, _DOMHandler_handleNativeRendering, _AppState_instances, _AppState_stateId, _AppState_stateInitial, _AppState_stateCurrent, _AppState_isCustomRenderEnabled, _AppState_domHandler, _AppState_changeState;
const isOneOfType = (types, value) => types.some((type) => typeof value === type);
class DOMHandler {
    constructor(stateId, stateWrapper, isCustomRenderEnabled, onRender) {
        _DOMHandler_instances.add(this);
        _DOMHandler_stateElements.set(this, void 0);
        _DOMHandler_stateId.set(this, void 0);
        _DOMHandler_stateWrapper.set(this, void 0);
        _DOMHandler_isCustomRenderEnabled.set(this, void 0);
        _DOMHandler_onRender.set(this, void 0);
        __classPrivateFieldSet(this, _DOMHandler_stateId, stateId, "f");
        __classPrivateFieldSet(this, _DOMHandler_stateWrapper, stateWrapper, "f");
        __classPrivateFieldSet(this, _DOMHandler_stateElements, Array.from(__classPrivateFieldGet(this, _DOMHandler_stateWrapper, "f").querySelectorAll(`[data-state="${__classPrivateFieldGet(this, _DOMHandler_stateId, "f")}"]`)), "f");
        __classPrivateFieldSet(this, _DOMHandler_isCustomRenderEnabled, isCustomRenderEnabled, "f");
        __classPrivateFieldSet(this, _DOMHandler_onRender, onRender, "f");
    }
    updateElements(state) {
        for (const element of __classPrivateFieldGet(this, _DOMHandler_stateElements, "f")) {
            if (__classPrivateFieldGet(this, _DOMHandler_isCustomRenderEnabled, "f")) {
                __classPrivateFieldGet(this, _DOMHandler_instances, "m", _DOMHandler_handleCustomRendering).call(this, state, element);
                continue;
            }
            __classPrivateFieldGet(this, _DOMHandler_instances, "m", _DOMHandler_handleNativeRendering).call(this, state, element);
        }
    }
}
_DOMHandler_stateElements = new WeakMap(), _DOMHandler_stateId = new WeakMap(), _DOMHandler_stateWrapper = new WeakMap(), _DOMHandler_isCustomRenderEnabled = new WeakMap(), _DOMHandler_onRender = new WeakMap(), _DOMHandler_instances = new WeakSet(), _DOMHandler_handleCustomRendering = function _DOMHandler_handleCustomRendering(state, element) {
    const content = __classPrivateFieldGet(this, _DOMHandler_onRender, "f").call(this, state);
    if (typeof content === 'string') {
        if (element.innerHTML !== content) {
            element.innerHTML = content;
        }
    }
    else {
        throw new Error('onRender must return a string');
    }
}, _DOMHandler_handleNativeRendering = function _DOMHandler_handleNativeRendering(state, element) {
    const types = ['string', 'number', 'bigint'];
    if (isOneOfType(types, state)) {
        const newContent = `${state}`;
        if (element.textContent !== newContent) {
            element.textContent = newContent;
        }
    }
    else if (typeof state === 'boolean') {
        const display = state ? '' : 'none';
        if (element.style.display !== display) {
            element.style.display = display;
        }
    }
};
export class AppState {
    get stateId() {
        return __classPrivateFieldGet(this, _AppState_stateId, "f");
    }
    get stateCurrent() {
        return __classPrivateFieldGet(this, _AppState_stateCurrent, "f");
    }
    constructor({ stateId, stateWrapper = document.body, stateInitial, onStateChange = () => { }, onRender }) {
        _AppState_instances.add(this);
        _AppState_stateId.set(this, void 0);
        _AppState_stateInitial.set(this, void 0);
        _AppState_stateCurrent.set(this, void 0);
        _AppState_isCustomRenderEnabled.set(this, void 0);
        _AppState_domHandler.set(this, void 0);
        if (!stateId || typeof stateId !== 'string') {
            throw new Error('stateId must be a non-empty string');
        }
        if (!(stateWrapper instanceof HTMLElement)) {
            throw new Error('stateWrapper must be an instance of HTMLElement');
        }
        __classPrivateFieldSet(this, _AppState_stateId, stateId, "f");
        __classPrivateFieldSet(this, _AppState_stateInitial, stateInitial, "f");
        __classPrivateFieldSet(this, _AppState_stateCurrent, stateInitial, "f");
        this.onStateChange = onStateChange;
        __classPrivateFieldSet(this, _AppState_isCustomRenderEnabled, onRender != null, "f");
        if (onRender != null)
            this.onRender = onRender;
        else
            this.onRender = () => ``;
        __classPrivateFieldSet(this, _AppState_domHandler, new DOMHandler(stateId, stateWrapper, __classPrivateFieldGet(this, _AppState_isCustomRenderEnabled, "f"), this.onRender), "f");
        __classPrivateFieldGet(this, _AppState_domHandler, "f").updateElements(__classPrivateFieldGet(this, _AppState_stateCurrent, "f"));
    }
    updateState(state) {
        __classPrivateFieldGet(this, _AppState_instances, "m", _AppState_changeState).call(this, state);
        __classPrivateFieldGet(this, _AppState_domHandler, "f").updateElements(__classPrivateFieldGet(this, _AppState_stateCurrent, "f"));
    }
    setInitialState() {
        __classPrivateFieldGet(this, _AppState_instances, "m", _AppState_changeState).call(this, __classPrivateFieldGet(this, _AppState_stateInitial, "f"));
        __classPrivateFieldGet(this, _AppState_domHandler, "f").updateElements(__classPrivateFieldGet(this, _AppState_stateCurrent, "f"));
    }
}
_AppState_stateId = new WeakMap(), _AppState_stateInitial = new WeakMap(), _AppState_stateCurrent = new WeakMap(), _AppState_isCustomRenderEnabled = new WeakMap(), _AppState_domHandler = new WeakMap(), _AppState_instances = new WeakSet(), _AppState_changeState = function _AppState_changeState(state) {
    const prevState = __classPrivateFieldGet(this, _AppState_stateCurrent, "f");
    __classPrivateFieldSet(this, _AppState_stateCurrent, state, "f");
    this.onStateChange(state, prevState);
};
