function e(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var t,r=0;function n(e){return"__private_"+r+++"_"+e}var i="undefined"==typeof document?void 0:document,o=!!i&&"content"in i.createElement("template"),a=!!i&&i.createRange&&"createContextualFragment"in i.createRange();function s(e,t){var r,n,i=e.nodeName,o=t.nodeName;return i===o||(r=i.charCodeAt(0),n=o.charCodeAt(0),r<=90&&n>=97?i===o.toUpperCase():n<=90&&r>=97&&o===i.toUpperCase())}function l(e,t,r){e[r]!==t[r]&&(e[r]=t[r],e[r]?e.setAttribute(r,""):e.removeAttribute(r))}var u={OPTION:function(e,t){var r=e.parentNode;if(r){var n=r.nodeName.toUpperCase();"OPTGROUP"===n&&(n=(r=r.parentNode)&&r.nodeName.toUpperCase()),"SELECT"!==n||r.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),r.selectedIndex=-1)}l(e,t,"selected")},INPUT:function(e,t){l(e,t,"checked"),l(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var r=t.value;e.value!==r&&(e.value=r);var n=e.firstChild;if(n){var i=n.nodeValue;if(i==r||!r&&i==e.placeholder)return;n.nodeValue=r}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var r,n,i=-1,o=0,a=e.firstChild;a;)if("OPTGROUP"===(n=a.nodeName&&a.nodeName.toUpperCase()))a=(r=a).firstChild;else{if("OPTION"===n){if(a.hasAttribute("selected")){i=o;break}o++}!(a=a.nextSibling)&&r&&(a=r.nextSibling,r=null)}e.selectedIndex=i}}};function d(){}function c(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var f=function(e,r,n){if(n||(n={}),"string"==typeof r)if("#document"===e.nodeName||"HTML"===e.nodeName||"BODY"===e.nodeName){var l=r;(r=i.createElement("html")).innerHTML=l}else f=(f=r).trim(),r=o?function(e){var t=i.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(f):a?function(e){return t||(t=i.createRange()).selectNode(i.body),t.createContextualFragment(e).childNodes[0]}(f):function(e){var t=i.createElement("body");return t.innerHTML=e,t.childNodes[0]}(f);else 11===r.nodeType&&(r=r.firstElementChild);var f,h=n.getNodeKey||c,p=n.onBeforeNodeAdded||d,b=n.onNodeAdded||d,m=n.onBeforeElUpdated||d,v=n.onElUpdated||d,y=n.onBeforeNodeDiscarded||d,g=n.onNodeDiscarded||d,w=n.onBeforeElChildrenUpdated||d,N=n.skipFromChildren||d,T=n.addChild||function(e,t){return e.appendChild(t)},O=!0===n.childrenOnly,A=Object.create(null),C=[];function E(e){C.push(e)}function S(e,t){if(1===e.nodeType)for(var r=e.firstChild;r;){var n=void 0;t&&(n=h(r))?E(n):(g(r),r.firstChild&&S(r,t)),r=r.nextSibling}}function P(e,t,r){!1!==y(e)&&(t&&t.removeChild(e),g(e),S(e,r))}function j(e){b(e);for(var t=e.firstChild;t;){var r=t.nextSibling,n=h(t);if(n){var i=A[n];i&&s(t,i)?(t.parentNode.replaceChild(i,t),x(i,t)):j(t)}else j(t);t=r}}function x(e,t,r){var n=h(t);if(n&&delete A[n],!r){if(!1===m(e,t))return;if(function(e,t){var r,n,i,o,a=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var s=a.length-1;s>=0;s--)n=(r=a[s]).name,o=r.value,(i=r.namespaceURI)?e.getAttributeNS(i,n=r.localName||n)!==o&&("xmlns"===r.prefix&&(n=r.name),e.setAttributeNS(i,n,o)):e.getAttribute(n)!==o&&e.setAttribute(n,o);for(var l=e.attributes,u=l.length-1;u>=0;u--)n=(r=l[u]).name,(i=r.namespaceURI)?t.hasAttributeNS(i,n=r.localName||n)||e.removeAttributeNS(i,n):t.hasAttribute(n)||e.removeAttribute(n)}}(e,t),v(e),!1===w(e,t))return}"TEXTAREA"!==e.nodeName?function(e,t){var r,n,o,a,l,d=N(e,t),c=t.firstChild,f=e.firstChild;e:for(;c;){for(a=c.nextSibling,r=h(c);!d&&f;){if(o=f.nextSibling,c.isSameNode&&c.isSameNode(f)){c=a,f=o;continue e}n=h(f);var b=f.nodeType,m=void 0;if(b===c.nodeType&&(1===b?(r?r!==n&&((l=A[r])?o===l?m=!1:(e.insertBefore(l,f),n?E(n):P(f,e,!0),n=h(f=l)):m=!1):n&&(m=!1),(m=!1!==m&&s(f,c))&&x(f,c)):3!==b&&8!=b||(m=!0,f.nodeValue!==c.nodeValue&&(f.nodeValue=c.nodeValue))),m){c=a,f=o;continue e}n?E(n):P(f,e,!0),f=o}if(r&&(l=A[r])&&s(l,c))d||T(e,l),x(l,c);else{var v=p(c);!1!==v&&(v&&(c=v),c.actualize&&(c=c.actualize(e.ownerDocument||i)),T(e,c),j(c))}c=a,f=o}!function(e,t,r){for(;t;){var n=t.nextSibling;(r=h(t))?E(r):P(t,e,!0),t=n}}(e,f,n);var y=u[e.nodeName];y&&y(e,t)}(e,t):u.TEXTAREA(e,t)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var r=t.firstChild;r;){var n=h(r);n&&(A[n]=r),e(r),r=r.nextSibling}}(e);var R,U,V=e,I=V.nodeType,M=r.nodeType;if(!O)if(1===I)1===M?s(e,r)||(g(e),V=function(e,t){for(var r=e.firstChild;r;){var n=r.nextSibling;t.appendChild(r),r=n}return t}(e,(R=r.nodeName,(U=r.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==U?i.createElementNS(U,R):i.createElement(R)))):V=r;else if(3===I||8===I){if(M===I)return V.nodeValue!==r.nodeValue&&(V.nodeValue=r.nodeValue),V;V=r}if(V===r)g(e);else{if(r.isSameNode&&r.isSameNode(V))return;if(x(V,r,O),C)for(var B=0,L=C.length;B<L;B++){var D=A[C[B]];D&&P(D,D.parentNode,!1)}}return!O&&V!==e&&e.parentNode&&(V.actualize&&(V=V.actualize(e.ownerDocument||i)),e.parentNode.replaceChild(V,e)),V};const h="An error occurred while updating the state in the DOM";var p=/*#__PURE__*/n("state"),b=/*#__PURE__*/n("elementsUsingState"),m=/*#__PURE__*/n("renderContentFromOnRender"),v=/*#__PURE__*/n("conditionallyShowElementBasedOnShowIfAttr"),y=/*#__PURE__*/n("conditionallyShowElementBasedOnBooleanState"),g=/*#__PURE__*/n("renderContentFromState");class w{constructor(t){Object.defineProperty(this,g,{value:A}),Object.defineProperty(this,y,{value:O}),Object.defineProperty(this,v,{value:T}),Object.defineProperty(this,m,{value:N}),Object.defineProperty(this,p,{writable:!0,value:void 0}),Object.defineProperty(this,b,{writable:!0,value:void 0}),e(this,p)[p]=t,e(this,b)[b]=Array.from(e(this,p)[p].wrapper.querySelectorAll(`[data-state="${e(this,p)[p].id}"]`))}updateElements(t){e(this,b)[b].forEach(r=>{e(this,p)[p].isUsingOnRender?e(this,m)[m](t,r):null==r.getAttribute("data-show-if")?"boolean"!=typeof t?"string"!=typeof t&&"number"!=typeof t&&"bigint"!=typeof t||e(this,g)[g](t,r):e(this,y)[y](t,r):e(this,v)[v](t,r)})}}function N(t,r){const n=e(this,p)[p].onRender(t);if("string"!=typeof n&&(console.error('The "content" to render in the DOM must be a string'),1))return console.error(h);const i=r.cloneNode();i.innerHTML=n,f(r,i)}function T(t,r){var n;const i=null!=(n=r.getAttribute("data-show-if"))?n:"";if(!((e,t)=>{if(!e.isEnum)return console.error('The "data-show-if" attribute is only supported for enum states'),!1;let r=t;return"number"===e.possibleValuesType&&(r=Number(t),isNaN(r))?(console.error('The "data-show-if" attribute must be a number if possible values are numbers'),!1):!!e.possibleValues.includes(r)||(console.error('The "data-show-if" attribute must be one of the possible values of the state'),!1)})(e(this,p)[p],i))return console.error(h);r.style.display=`${t}`===i?"":"none"}function O(e,t){const r=e?"":"none";t.style.display!==r&&(t.style.display=r)}function A(e,t){if("object"==typeof e)return;const r=`${e}`;t.textContent!==r&&(t.textContent=r)}const C="An error occurred while creating the state";var E=/*#__PURE__*/n("isEnum"),S=/*#__PURE__*/n("possibleValues"),P=/*#__PURE__*/n("possibleValuesType"),j=/*#__PURE__*/n("preserve"),x=/*#__PURE__*/n("id"),R=/*#__PURE__*/n("initial"),U=/*#__PURE__*/n("current"),V=/*#__PURE__*/n("wrapper"),I=/*#__PURE__*/n("isUsingOnRender"),M=/*#__PURE__*/n("domManager"),B=/*#__PURE__*/n("changeState");class L{constructor({id:t,initial:r,wrapper:n,onChange:i,onRender:o,possibleValues:a,preserve:s}){Object.defineProperty(this,B,{value:D}),Object.defineProperty(this,E,{writable:!0,value:void 0}),Object.defineProperty(this,S,{writable:!0,value:void 0}),Object.defineProperty(this,P,{writable:!0,value:void 0}),Object.defineProperty(this,j,{writable:!0,value:void 0}),Object.defineProperty(this,x,{writable:!0,value:void 0}),Object.defineProperty(this,R,{writable:!0,value:void 0}),Object.defineProperty(this,U,{writable:!0,value:void 0}),Object.defineProperty(this,V,{writable:!0,value:void 0}),this.onChange=void 0,Object.defineProperty(this,I,{writable:!0,value:void 0}),this.onRender=void 0,Object.defineProperty(this,M,{writable:!0,value:void 0});const l=null!=n?n:document.body;if(!(e=>"string"!=typeof e?(console.error('The "id" of your state must be of type string'),!1):!(""===e&&(console.error('The "id" of your state must be a non-empty string'),1)))(t))throw new Error(C);if(!(e=>!!(e instanceof HTMLElement)||(console.error('The "wrapper" of your state must be an instance of HTMLElement'),!1))(l))throw new Error(C);e(this,x)[x]=t,e(this,R)[R]=r,e(this,j)[j]=null!=s&&s,e(this,V)[V]=l;const u=(()=>{if(e(this,j)[j]){const e=localStorage.getItem(t);if(null!==e)return JSON.parse(e)}return r})();e(this,U)[U]=u,this.onChange=null!=i?i:()=>{},e(this,E)[E]=null!=a,e(this,S)[S]=null!=a?a:[];const d=null!=a?(e=>e.every(e=>"string"==typeof e)?"string":e.every(e=>"number"==typeof e)?"number":"unknown")(a):"unknown";if(e(this,P)[P]=d,null!=a){if(!((e,t)=>e instanceof Array?0===e.length?(console.error('The "possible values" of an enum state must NOT be an empty array'),!1):!("unknown"===t||"string"!==t&&"number"!==t)||(console.error('The "possible values" of an enum state must be an array of strings or numbers'),!1):(console.error('The "possible values" of an enum state must be an array'),!1))(a,d))throw new Error(C);if(!((e,t)=>!(typeof e!==t&&(console.error(`The "initial value" of your enum state must be a ${t}`),1)))(r,d))throw new Error(C)}e(this,I)[I]=null!=o,this.onRender=null!=o?o:()=>"",e(this,M)[M]=new w(this),e(this,M)[M].updateElements(u)}update(t){if(e(this,E)[E]&&!((e,t,r)=>typeof e!==r?(console.error(`The "state" of your enum state must be a ${r}`),!1):!!t.includes(e)||(console.error('The "state" of your enum state must be one of the possible values'),!1))(t,e(this,S)[S],e(this,P)[P]))return console.error("An error occurred while updating the state");e(this,M)[M].updateElements(t),e(this,B)[B](t),e(this,j)[j]&&localStorage.setItem(e(this,x)[x],JSON.stringify(t))}reset(){e(this,M)[M].updateElements(e(this,R)[R]),e(this,B)[B](e(this,R)[R]),e(this,j)[j]&&localStorage.removeItem(e(this,x)[x])}get id(){return e(this,x)[x]}get current(){return e(this,U)[U]}get isUsingOnRender(){return e(this,I)[I]}get isEnum(){return e(this,E)[E]}get possibleValues(){return e(this,S)[S]}get possibleValuesType(){return e(this,P)[P]}get wrapper(){return e(this,V)[V]}}function D(t){const r=e(this,U)[U];e(this,U)[U]=t,this.onChange(t,r)}export{L as State};
//# sourceMappingURL=State.modern.js.map