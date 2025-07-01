var b;(n=>(n.isTouch="ontouchstart"in window||navigator.maxTouchPoints>0,n.isChrome=navigator.userAgent.toLowerCase().includes("chrome/"),n.isWebKit=navigator.userAgent.toLowerCase().includes("applewebkit/"),n.isSafari=n.isWebKit&&!n.isChrome,n.isSafariDesktop=n.isSafari&&!n.isTouch,n.isWindows=/Win/u.test(navigator.platform),n.isMacOS=/Mac/u.test(navigator.platform),n.isAndroidWebView=n.isChrome&&navigator.userAgent.toLowerCase().includes("; wv)"),n.isIosWebView=n.isWebKit&&!navigator.userAgent.toLowerCase().includes("safari/"),n.isWebView=n.isAndroidWebView||n.isIosWebView))(b||={});var C="framer_",y="editSite";var w="__framer_hide_editorbar_until",v="2147483647";var h="__framer-editorbar-smooth-gutter-transition";function T(e,o){return function(c,r){let[a,t]=o(!1);return e(()=>{let u=s=>{s.origin===c&&typeof s.data=="object"&&s.data&&"apiVersion"in s.data&&"type"in s.data&&"component"in s.data&&s.data.apiVersion===1&&s.data.type==="initializeComponent"&&s.data.component===r&&t(!0)};return window.addEventListener("message",u),()=>{window.removeEventListener("message",u)}},[c,r]),a}}function D(e,o){let i=T(e,o);function c(r,a){let t=()=>{r?.current&&r.current.contentWindow?.postMessage({apiVersion:1,type:"updateScrollPosition",position:{top:window.scrollY}},a)};return t(),window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)}return function(a,t){let u=i(t,"OnPageSandboxStore/scrollRelayer");e(()=>{if(!u)return;let s=c(a,t);return()=>s()},[t,a,u])}}function A(e,o){return function(c=!0){let[r,a]=o(P);return e(()=>{if(!c)return;let t=new ResizeObserver(()=>{a(P())});return t.observe(document.documentElement),()=>{t.disconnect()}},[c]),r}}function P(){return window.innerWidth-document.documentElement.clientWidth}function M(e,o){let i=A(e,o);return function(r){let t=i(r)>0;e(()=>{if(r&&t)document.documentElement.classList.add(h);else{let u=()=>document.documentElement.classList.remove(h);if(t){let s=window.setTimeout(u,300);return()=>{window.clearTimeout(s)}}else u()}},[r,t])}}function U(e,o,i,c,r){return function(){let t=e(),u=i()?.activeLocale??void 0,{collectionUtils:s}=c(),[E,n]=r(),I=t?.id,g=t?.collectionId,S=t?.pathVariables;return o(()=>{if(!I)return;let R=!1;return k(u,g,s,S).then(x=>{R||n({collectionItemNodeId:x,webPageNodeId:I})}).catch(()=>{R||n({collectionItemNodeId:void 0,webPageNodeId:I})}),()=>{R=!0}},[u,g,s,S,I]),E}}async function k(e,o,i,c){if(!o)return;let r=Object.values(c??{}),[a]=r;if(r.length!==1||!a||typeof a!="string")return;let t=i?.[o];return await(await t?.())?.getRecordIdBySlug(a,e)}function W(e,o,i,c,r){let a=U(e,o,i,c,r),t=T(o,r);return function(s,E){let n=a(),I=t(E,"OnPageActiveRouteStore");o(()=>{I&&s.current?.contentWindow?.postMessage({apiVersion:1,type:"updateNodeIds",nodeIds:n},E)},[s,n,E,I])}}function G(){let e=localStorage.getItem(w);if(!e)return!1;let o=Date.now(),i=Number(e);return o>=i||Number.isNaN(i)?(localStorage.removeItem(w),!1):!0}function j(){return window.self!==window.top}var K=`
#__framer-editorbar {
    --padding-right: 10px;
    color-scheme: light;
    overflow: hidden;
    position: fixed;
    right: var(--padding-right);
    border: none;
    z-index: ${v};
    top: 0;
    width: calc(100vw - var(--padding-right));
    height: 100vh;
}

#__framer-editorbar.status_hidden {
    display: none;
}

#__framer-editorbar.status_measuring {
    clip-path: unset;
}

#__framer-editorbar.fullscreen {
    --padding-right: 0px;
    left: 0;
    right: initial;
}

body:has(#__framer-editorbar.fullscreen) {
    overflow: hidden;
}

html.${h}:has(#__framer-editorbar:not(.status_hidden)) {
    scrollbar-gutter: stable;
}
`,L=document.createElement("style");L.type="text/css";L.innerHTML=K;document.head.appendChild(L);var N=new URL(import.meta.url).origin;function Y(){let e=new URL(window.location.href),o=e.searchParams.has(y),i=e.searchParams.has(y.toLowerCase());if(!o&&!i)return!1;let c=o?y:y.toLowerCase(),r=e.searchParams.get(c);if(r!==""&&r!==null)return!1;for(let a of e.searchParams.keys())if(a!==y&&a!==y.toLowerCase()&&!a.startsWith(C))return!1;return e.searchParams.delete(y),e.searchParams.delete(y.toLowerCase()),window.history.replaceState({},"",e.toString()),!0}var X=Y();function ye({dependencies:e}){if(e.__version!==1)throw new Error("Unsupported dependencies version");if(G()||j()||b.isWebView)return function(){return null};let{createElement:o,memo:i,useCallback:c,useEffect:r,useRef:a,useState:t}=e.react,{createPortal:u}=e["react-dom"],{useCurrentRoute:s,useLocaleInfo:E,useRouter:n}=e.framer,I=D(r,t);function g(){let[f,p]=t(!1),d=c(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>{p(!0)}):setTimeout(()=>{p(!0)},300)},[]);return r(()=>{document.readyState==="complete"?d():document.addEventListener("readystatechange",()=>{document.readyState==="complete"&&d()},{once:!0})},[d]),f}let S=M(r,t);function R(){let[f,p]=t({className:"status_hidden"});return S(f.className!=="status_hidden"&&f.className!=="fullscreen"),r(()=>{function d(l){l.origin===N&&typeof l.data=="object"&&l.data?.apiVersion===1&&(l.data.type==="beginSizeMeasuring"&&p({className:"status_measuring"}),l.data.type==="updateStyle"&&p({style:{clipPath:l.data.clipPath}}),l.data.type==="editorBarHidden"&&(p({className:"status_hidden"}),window.removeEventListener("message",d)),l.data.type==="enterFullscreen"&&p({className:"fullscreen"}))}return window.addEventListener("message",d),()=>{window.removeEventListener("message",d)}},[]),f}function x(){let[f,p]=t(!1);return r(()=>{if(f)return;function d(l){if(l.origin===N&&typeof l.data=="object"&&l.data?.apiVersion===1&&l.data.type==="editorBarHidden"&&!f){let _=Date.now()+6048e5;localStorage.setItem(w,_.toString()),p(!0),window.removeEventListener("message",d)}}return window.addEventListener("message",d),()=>{window.removeEventListener("message",d)}},[]),f}let O=W(s,r,E,n,t);function F({framerSiteId:f,features:p,iframeRef:d,measuringProps:l}){O(d,N);let m=new URL(import.meta.url),_=m.pathname.lastIndexOf("/");if(_<0)throw new Error("Invalid pathname");let z=p?.editorBarDisableFrameAncestorsSecurity?"fake-domain.example":window.location.hostname;return m.pathname=m.pathname.slice(0,_),m.searchParams.set("framerSiteId",f),m.searchParams.set("source",z),m.searchParams.set("features",JSON.stringify(p||{})),X&&m.searchParams.set("forceShow","true"),o("iframe",{...l,id:"__framer-editorbar",ref:d,src:m.href})}function V({framerSiteId:f,features:p}){let d=a(null),l=g(),m=R();return x(),I(d,N),l?u(o(F,{framerSiteId:f,features:p,iframeRef:d,measuringProps:m}),document.body):null}return i(V)}export{ye as createEditorBar};
