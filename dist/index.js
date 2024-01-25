import{proxy as u,subscribe as h,snapshot as P}from"valtio/vanilla";const o=u({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),$={state:o,subscribe(e){return h(o,()=>e(o))},push(e,t){e!==o.view&&(o.view=e,t&&(o.data=t),o.history.push(e))},reset(e){o.view=e,o.history=[e]},replace(e){o.history.length>1&&(o.history[o.history.length-1]=e,o.view=e)},goBack(){if(o.history.length>1){o.history.pop();const[e]=o.history.slice(-1);o.view=e}},setData(e){o.data=e}},i={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return!1},isIos(){return!1},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatUniversalUrl(e,t,s){let n=e;n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,s);const r=encodeURIComponent(t);return`${n}wc?uri=${r}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e){var t;(t=window.Telegram)!=null&&t.WebApp?window.Telegram.WebApp.openLink(e):Telegram!=null&&Telegram.WebApp&&Telegram.WebApp.openLink(e)},setWalletConnectDeepLink(e,t){try{localStorage.setItem(i.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(i.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(i.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(i.WCM_VERSION,"2.6.2")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=$.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},_=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),a=u({enabled:_,userSessionId:"",events:[],connectedWalletId:void 0}),R={state:a,subscribe(e){return h(a.events,()=>e(P(a.events[a.events.length-1])))},initialize(){a.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(a.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){a.connectedWalletId=e},click(e){if(a.enabled){const t={type:"CLICK",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}},track(e){if(a.enabled){const t={type:"TRACK",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}},view(e){if(a.enabled){const t={type:"VIEW",name:e.name,userSessionId:a.userSessionId,timestamp:Date.now(),data:e};a.events.push(t)}}},c=u({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),p={state:c,subscribe(e){return h(c,()=>e(c))},setChains(e){c.chains=e},setWalletConnectUri(e){c.walletConnectUri=e},setIsCustomDesktop(e){c.isCustomDesktop=e},setIsCustomMobile(e){c.isCustomMobile=e},setIsDataLoaded(e){c.isDataLoaded=e},setIsUiLoaded(e){c.isUiLoaded=e},setIsAuth(e){c.isAuth=e}},W=u({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),C={state:W,subscribe(e){return h(W,()=>e(W))},setConfig(e){var t,s;R.initialize(),p.setChains(e.chains),p.setIsAuth(Boolean(e.enableAuthMode)),p.setIsCustomMobile(Boolean((t=e.mobileWallets)==null?void 0:t.length)),p.setIsCustomDesktop(Boolean((s=e.desktopWallets)==null?void 0:s.length)),i.setModalVersionInStorage(),Object.assign(W,e)}};var V=Object.defineProperty,k=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable,D=(e,t,s)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,K=(e,t)=>{for(var s in t||(t={}))B.call(t,s)&&D(e,s,t[s]);if(k)for(var s of k(t))H.call(t,s)&&D(e,s,t[s]);return e};const L="https://explorer-api.walletconnect.com",E="wcm",O="js-2.6.2";async function w(e,t){const s=K({sdkType:E,sdkVersion:O},t),n=new URL(e,L);return n.searchParams.append("projectId",C.state.projectId),Object.entries(s).forEach(([r,l])=>{l&&n.searchParams.append(r,String(l))}),(await fetch(n)).json()}const m={async getDesktopListings(e){return w("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return w("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return w("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return w("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${L}/w3m/v1/getWalletImage/${e}?projectId=${C.state.projectId}&sdkType=${E}&sdkVersion=${O}`},getAssetImageUrl(e){return`${L}/w3m/v1/getAssetImage/${e}?projectId=${C.state.projectId}&sdkType=${E}&sdkVersion=${O}`}};var z=Object.defineProperty,U=Object.getOwnPropertySymbols,J=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable,M=(e,t,s)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,F=(e,t)=>{for(var s in t||(t={}))J.call(t,s)&&M(e,s,t[s]);if(U)for(var s of U(t))q.call(t,s)&&M(e,s,t[s]);return e};const T=i.isMobile(),d=u({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),te={state:d,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=C.state;if(e==="NONE"||t==="ALL"&&!e)return d.recomendedWallets;if(i.isArray(e)){const s={recommendedIds:e.join(",")},{listings:n}=await m.getAllListings(s),r=Object.values(n);r.sort((l,v)=>{const I=e.indexOf(l.id),f=e.indexOf(v.id);return I-f}),d.recomendedWallets=r}else{const{chains:s,isAuth:n}=p.state,r=s?.join(","),l=i.isArray(t),v={page:1,sdks:n?"auth_v1":void 0,entries:i.RECOMMENDED_WALLET_AMOUNT,chains:r,version:2,excludedIds:l?t.join(","):void 0},{listings:I}=T?await m.getMobileListings(v):await m.getDesktopListings(v);d.recomendedWallets=Object.values(I)}return d.recomendedWallets},async getWallets(e){const t=F({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:n}=C.state,{recomendedWallets:r}=d;if(n==="ALL")return d.wallets;r.length?t.excludedIds=r.map(x=>x.id).join(","):i.isArray(s)&&(t.excludedIds=s.join(",")),i.isArray(n)&&(t.excludedIds=[t.excludedIds,n].filter(Boolean).join(",")),p.state.isAuth&&(t.sdks="auth_v1");const{page:l,search:v}=e,{listings:I,total:f}=T?await m.getMobileListings(t):await m.getDesktopListings(t),A=Object.values(I),j=v?"search":"wallets";return d[j]={listings:[...d[j].listings,...A],total:f,page:l??1},{listings:A,total:f}},getWalletImageUrl(e){return m.getWalletImageUrl(e)},getAssetImageUrl(e){return m.getAssetImageUrl(e)},resetSearch(){d.search={listings:[],total:0,page:1}}},b=u({open:!1}),se={state:b,subscribe(e){return h(b,()=>e(b))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:n}=p.state;if(i.removeWalletConnectDeepLink(),p.setWalletConnectUri(e?.uri),p.setChains(e?.chains),$.reset("ConnectWallet"),s&&n)b.open=!0,t();else{const r=setInterval(()=>{const l=p.state;l.isUiLoaded&&l.isDataLoaded&&(clearInterval(r),b.open=!0,t())},200)}})},close(){b.open=!1}};var G=Object.defineProperty,S=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable,N=(e,t,s)=>t in e?G(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Y=(e,t)=>{for(var s in t||(t={}))Q.call(t,s)&&N(e,s,t[s]);if(S)for(var s of S(t))X.call(t,s)&&N(e,s,t[s]);return e};function Z(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const y=u({themeMode:Z()?"dark":"light"}),ne={state:y,subscribe(e){return h(y,()=>e(y))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&(y.themeMode=t),s&&(y.themeVariables=Y({},s))}},g=u({open:!1,message:"",variant:"success"}),oe={state:g,subscribe(e){return h(g,()=>e(g))},openToast(e,t){g.open=!0,g.message=e,g.variant=t},closeToast(){g.open=!1}};export{C as ConfigCtrl,i as CoreUtil,R as EventsCtrl,te as ExplorerCtrl,se as ModalCtrl,p as OptionsCtrl,$ as RouterCtrl,ne as ThemeCtrl,oe as ToastCtrl};
//# sourceMappingURL=index.js.map
