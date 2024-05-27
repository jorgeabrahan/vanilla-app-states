function e(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var t,r=0;function n(e){return"__private_"+r+++"_"+e}function i(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}var o="undefined"==typeof document?void 0:document,a=!!o&&"content"in o.createElement("template"),u=!!o&&o.createRange&&"createContextualFragment"in o.createRange();function s(e,t){var r,n,i=e.nodeName,o=t.nodeName;return i===o||(r=i.charCodeAt(0),n=o.charCodeAt(0),r<=90&&n>=97?i===o.toUpperCase():n<=90&&r>=97&&o===i.toUpperCase())}function l(e,t,r){e[r]!==t[r]&&(e[r]=t[r],e[r]?e.setAttribute(r,""):e.removeAttribute(r))}var d={OPTION:function(e,t){var r=e.parentNode;if(r){var n=r.nodeName.toUpperCase();"OPTGROUP"===n&&(n=(r=r.parentNode)&&r.nodeName.toUpperCase()),"SELECT"!==n||r.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),r.selectedIndex=-1)}l(e,t,"selected")},INPUT:function(e,t){l(e,t,"checked"),l(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var r=t.value;e.value!==r&&(e.value=r);var n=e.firstChild;if(n){var i=n.nodeValue;if(i==r||!r&&i==e.placeholder)return;n.nodeValue=r}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var r,n,i=-1,o=0,a=e.firstChild;a;)if("OPTGROUP"===(n=a.nodeName&&a.nodeName.toUpperCase()))a=(r=a).firstChild;else{if("OPTION"===n){if(a.hasAttribute("selected")){i=o;break}o++}!(a=a.nextSibling)&&r&&(a=r.nextSibling,r=null)}e.selectedIndex=i}}};function f(){}function c(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var h=function(e,r,n){if(n||(n={}),"string"==typeof r)if("#document"===e.nodeName||"HTML"===e.nodeName||"BODY"===e.nodeName){var i=r;(r=o.createElement("html")).innerHTML=i}else l=(l=r).trim(),r=a?function(e){var t=o.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(l):u?function(e){return t||(t=o.createRange()).selectNode(o.body),t.createContextualFragment(e).childNodes[0]}(l):function(e){var t=o.createElement("body");return t.innerHTML=e,t.childNodes[0]}(l);else 11===r.nodeType&&(r=r.firstElementChild);var l,h=n.getNodeKey||c,p=n.onBeforeNodeAdded||f,v=n.onNodeAdded||f,b=n.onBeforeElUpdated||f,m=n.onElUpdated||f,y=n.onBeforeNodeDiscarded||f,g=n.onNodeDiscarded||f,w=n.onBeforeElChildrenUpdated||f,T=n.skipFromChildren||f,N=n.addChild||function(e,t){return e.appendChild(t)},O=!0===n.childrenOnly,A=Object.create(null),C=[];function E(e){C.push(e)}function S(e,t){if(1===e.nodeType)for(var r=e.firstChild;r;){var n=void 0;t&&(n=h(r))?E(n):(g(r),r.firstChild&&S(r,t)),r=r.nextSibling}}function P(e,t,r){!1!==y(e)&&(t&&t.removeChild(e),g(e),S(e,r))}function j(e){v(e);for(var t=e.firstChild;t;){var r=t.nextSibling,n=h(t);if(n){var i=A[n];i&&s(t,i)?(t.parentNode.replaceChild(i,t),x(i,t)):j(t)}else j(t);t=r}}function x(e,t,r){var n=h(t);if(n&&delete A[n],!r){if(!1===b(e,t))return;if(function(e,t){var r,n,i,o,a=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var u=a.length-1;u>=0;u--)n=(r=a[u]).name,o=r.value,(i=r.namespaceURI)?e.getAttributeNS(i,n=r.localName||n)!==o&&("xmlns"===r.prefix&&(n=r.name),e.setAttributeNS(i,n,o)):e.getAttribute(n)!==o&&e.setAttribute(n,o);for(var s=e.attributes,l=s.length-1;l>=0;l--)n=(r=s[l]).name,(i=r.namespaceURI)?t.hasAttributeNS(i,n=r.localName||n)||e.removeAttributeNS(i,n):t.hasAttribute(n)||e.removeAttribute(n)}}(e,t),m(e),!1===w(e,t))return}"TEXTAREA"!==e.nodeName?function(e,t){var r,n,i,a,u,l=T(e,t),f=t.firstChild,c=e.firstChild;e:for(;f;){for(a=f.nextSibling,r=h(f);!l&&c;){if(i=c.nextSibling,f.isSameNode&&f.isSameNode(c)){f=a,c=i;continue e}n=h(c);var v=c.nodeType,b=void 0;if(v===f.nodeType&&(1===v?(r?r!==n&&((u=A[r])?i===u?b=!1:(e.insertBefore(u,c),n?E(n):P(c,e,!0),n=h(c=u)):b=!1):n&&(b=!1),(b=!1!==b&&s(c,f))&&x(c,f)):3!==v&&8!=v||(b=!0,c.nodeValue!==f.nodeValue&&(c.nodeValue=f.nodeValue))),b){f=a,c=i;continue e}n?E(n):P(c,e,!0),c=i}if(r&&(u=A[r])&&s(u,f))l||N(e,u),x(u,f);else{var m=p(f);!1!==m&&(m&&(f=m),f.actualize&&(f=f.actualize(e.ownerDocument||o)),N(e,f),j(f))}f=a,c=i}!function(e,t,r){for(;t;){var n=t.nextSibling;(r=h(t))?E(r):P(t,e,!0),t=n}}(e,c,n);var y=d[e.nodeName];y&&y(e,t)}(e,t):d.TEXTAREA(e,t)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var r=t.firstChild;r;){var n=h(r);n&&(A[n]=r),e(r),r=r.nextSibling}}(e);var R,U,V=e,k=V.nodeType,I=r.nodeType;if(!O)if(1===k)1===I?s(e,r)||(g(e),V=function(e,t){for(var r=e.firstChild;r;){var n=r.nextSibling;t.appendChild(r),r=n}return t}(e,(R=r.nodeName,(U=r.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==U?o.createElementNS(U,R):o.createElement(R)))):V=r;else if(3===k||8===k){if(I===k)return V.nodeValue!==r.nodeValue&&(V.nodeValue=r.nodeValue),V;V=r}if(V===r)g(e);else{if(r.isSameNode&&r.isSameNode(V))return;if(x(V,r,O),C)for(var M=0,B=C.length;M<B;M++){var L=A[C[M]];L&&P(L,L.parentNode,!1)}}return!O&&V!==e&&e.parentNode&&(V.actualize&&(V=V.actualize(e.ownerDocument||o)),e.parentNode.replaceChild(V,e)),V},p="An error occurred while updating the state in the DOM",v=/*#__PURE__*/n("state"),b=/*#__PURE__*/n("elementsUsingState"),m=/*#__PURE__*/n("renderContentFromOnRender"),y=/*#__PURE__*/n("conditionallyShowElementBasedOnShowIfAttr"),g=/*#__PURE__*/n("conditionallyShowElementBasedOnBooleanState"),w=/*#__PURE__*/n("renderContentFromState"),T=/*#__PURE__*/function(){function t(t){Object.defineProperty(this,w,{value:C}),Object.defineProperty(this,g,{value:A}),Object.defineProperty(this,y,{value:O}),Object.defineProperty(this,m,{value:N}),Object.defineProperty(this,v,{writable:!0,value:void 0}),Object.defineProperty(this,b,{writable:!0,value:void 0}),e(this,v)[v]=t,e(this,b)[b]=Array.from(e(this,v)[v].wrapper.querySelectorAll('[data-state="'+e(this,v)[v].id+'"]'))}return t.prototype.updateElements=function(t){var r=this;e(this,b)[b].forEach(function(n){e(r,v)[v].isUsingOnRender?e(r,m)[m](t,n):null==n.getAttribute("data-show-if")?"boolean"!=typeof t?"string"!=typeof t&&"number"!=typeof t&&"bigint"!=typeof t||e(r,w)[w](t,n):e(r,g)[g](t,n):e(r,y)[y](t,n)})},t}();function N(t,r){var n=e(this,v)[v].onRender(t);if("string"!=typeof n&&(console.error('The "content" to render in the DOM must be a string'),1))return console.error(p);var i=r.cloneNode();i.innerHTML=n,h(r,i)}function O(t,r){var n,i=null!=(n=r.getAttribute("data-show-if"))?n:"";if(!function(e,t){if(!e.isEnum)return console.error('The "data-show-if" attribute is only supported for enum states'),!1;var r=t;return"number"===e.possibleValuesType&&(r=Number(t),isNaN(r))?(console.error('The "data-show-if" attribute must be a number if possible values are numbers'),!1):!!e.possibleValues.includes(r)||(console.error('The "data-show-if" attribute must be one of the possible values of the state'),!1)}(e(this,v)[v],i))return console.error(p);r.style.display=""+t===i?"":"none"}function A(e,t){var r=e?"":"none";t.style.display!==r&&(t.style.display=r)}function C(e,t){if("object"!=typeof e){var r=""+e;t.textContent!==r&&(t.textContent=r)}}var E="An error occurred while creating the state",S=/*#__PURE__*/n("isEnum"),P=/*#__PURE__*/n("possibleValues"),j=/*#__PURE__*/n("possibleValuesType"),x=/*#__PURE__*/n("preserve"),R=/*#__PURE__*/n("id"),U=/*#__PURE__*/n("initial"),V=/*#__PURE__*/n("current"),k=/*#__PURE__*/n("wrapper"),I=/*#__PURE__*/n("isUsingOnRender"),M=/*#__PURE__*/n("domManager"),B=/*#__PURE__*/n("changeState"),L=/*#__PURE__*/function(){function t(t){var r=this,n=t.id,i=t.initial,o=t.wrapper,a=t.onChange,u=t.onRender,s=t.possibleValues,l=t.preserve;Object.defineProperty(this,B,{value:D}),Object.defineProperty(this,S,{writable:!0,value:void 0}),Object.defineProperty(this,P,{writable:!0,value:void 0}),Object.defineProperty(this,j,{writable:!0,value:void 0}),Object.defineProperty(this,x,{writable:!0,value:void 0}),Object.defineProperty(this,R,{writable:!0,value:void 0}),Object.defineProperty(this,U,{writable:!0,value:void 0}),Object.defineProperty(this,V,{writable:!0,value:void 0}),Object.defineProperty(this,k,{writable:!0,value:void 0}),this.onChange=void 0,Object.defineProperty(this,I,{writable:!0,value:void 0}),this.onRender=void 0,Object.defineProperty(this,M,{writable:!0,value:void 0});var d=null!=o?o:document.body;if(!function(e){return"string"!=typeof e?(console.error('The "id" of your state must be of type string'),!1):!(""===e&&(console.error('The "id" of your state must be a non-empty string'),1))}(n))throw new Error(E);if(!function(e){return!!(e instanceof HTMLElement)||(console.error('The "wrapper" of your state must be an instance of HTMLElement'),!1)}(d))throw new Error(E);e(this,R)[R]=n,e(this,U)[U]=i,e(this,x)[x]=null!=l&&l,e(this,k)[k]=d;var f=function(){if(e(r,x)[x]){var t=localStorage.getItem(n);if(null!==t)return JSON.parse(t)}return i}();e(this,V)[V]=f,this.onChange=null!=a?a:function(){},e(this,S)[S]=null!=s,e(this,P)[P]=null!=s?s:[];var c=null!=s?function(e){return e.every(function(e){return"string"==typeof e})?"string":e.every(function(e){return"number"==typeof e})?"number":"unknown"}(s):"unknown";if(e(this,j)[j]=c,null!=s){if(!function(e,t){return e instanceof Array?0===e.length?(console.error('The "possible values" of an enum state must NOT be an empty array'),!1):!("unknown"===t||"string"!==t&&"number"!==t)||(console.error('The "possible values" of an enum state must be an array of strings or numbers'),!1):(console.error('The "possible values" of an enum state must be an array'),!1)}(s,c))throw new Error(E);if(!function(e,t){return!(typeof e!==t&&(console.error('The "initial value" of your enum state must be a '+t),1))}(i,c))throw new Error(E)}e(this,I)[I]=null!=u,this.onRender=null!=u?u:function(){return""},e(this,M)[M]=new T(this),e(this,M)[M].updateElements(f)}var r,n,o=t.prototype;return o.update=function(t){if(e(this,S)[S]&&!function(e,t,r){return typeof e!==r?(console.error('The "state" of your enum state must be a '+r),!1):!!t.includes(e)||(console.error('The "state" of your enum state must be one of the possible values'),!1)}(t,e(this,P)[P],e(this,j)[j]))return console.error("An error occurred while updating the state");e(this,M)[M].updateElements(t),e(this,B)[B](t),e(this,x)[x]&&localStorage.setItem(e(this,R)[R],JSON.stringify(t))},o.reset=function(){e(this,M)[M].updateElements(e(this,U)[U]),e(this,B)[B](e(this,U)[U]),e(this,x)[x]&&localStorage.removeItem(e(this,R)[R])},r=t,(n=[{key:"id",get:function(){return e(this,R)[R]}},{key:"current",get:function(){return e(this,V)[V]}},{key:"isUsingOnRender",get:function(){return e(this,I)[I]}},{key:"isEnum",get:function(){return e(this,S)[S]}},{key:"possibleValues",get:function(){return e(this,P)[P]}},{key:"possibleValuesType",get:function(){return e(this,j)[j]}},{key:"wrapper",get:function(){return e(this,k)[k]}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i(n.key),n)}}(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),r}();function D(t){var r=e(this,V)[V];e(this,V)[V]=t,this.onChange(t,r)}export{L as State};
//# sourceMappingURL=State.esm.js.map
