(this["webpackJsonp@acala-dapp/apps"]=this["webpackJsonp@acala-dapp/apps"]||[]).push([[7],{2372:function(e,t,r){e.exports={root:"SwapConsole_root__3G5EI",inputAreaRoot:"SwapConsole_inputAreaRoot__376vf",title:"SwapConsole_title__3TDaU",main:"SwapConsole_main__oklzd",swapInfoRoot:"SwapConsole_swapInfoRoot__1vqid",info:"SwapConsole_info__24iir",swapBtn:"SwapConsole_swapBtn__3XHdA",txBtn:"SwapConsole_txBtn__1ctYw",addon:"SwapConsole_addon__2fmH5",swapRoute:"SwapConsole_swapRoute__38Mhe"}},2407:function(e,t,r){e.exports={root:"TagInput_root__3uRV9",primary:"TagInput_primary__Tp6Iu",clickable:"TagInput_clickable__28EM9",error:"TagInput_error__2ELmQ",input:"TagInput_input__2OQKl"}},2408:function(e,t,r){e.exports={root:"SlippageInputArea_root__2w92S",title:"SlippageInputArea_title__26KMB"}},2409:function(e,t,r){e.exports={headerCell:"AllMarkets_headerCell___2Iue"}},2415:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),c=r(7),u=r(32),l=r(33),o=r(280),i=r(9),s=r(3),p=r(2372),m=r.n(p),b=r(6),d=r(166),y=r(54),f=r(597),C=function(e){return{base:Object(s.convertToFixed18)(e.base),other:Object(s.convertToFixed18)(e.other)}},O=Object(a.createContext)({}),g=Object(a.memo)((function(e){var t=e.children,r=Object(i.e)().api,l=Object(i.w)(),o=l.isInitialized,p=l.setEnd,m=Object(i.i)().dexBaseCurrency,g=Object(a.useRef)(),j=Object(a.useMemo)((function(){var e=r.consts.dex.enabledCurrencyIds.toArray();return e.push(m),e}),[r.consts.dex.enabledCurrencyIds,m]),v=Object(a.useMemo)((function(){return j.slice()}),[j]),x=Object(a.useMemo)((function(){return j[0]}),[j]),E=Object(a.useMemo)((function(){return r.consts.dex.getExchangeFee}),[r]),N=Object(a.useState)(.005),h=Object(b.a)(N,2),_=h[0],S=h[1],F=Object(a.useState)(0),w=Object(b.a)(F,2),T=w[0],k=w[1],I=Object(a.useState)({supplyCurrency:"",supplySize:0,targetCurrency:"",targetSize:0}),M=Object(b.a)(I,2),z=M[0],R=M[1],B=Object(a.useCallback)((function(e,t){g.current&&g.current.unsubscribe(),Object(u.Y)(e,m)&&!Object(u.Y)(t,m)&&(g.current=r.derive.dex.pool(t).subscribe((function(r){R({supplyCurrency:e,supplySize:Object(s.convertToFixed18)(r.base).toNumber(),targetCurrency:t,targetSize:Object(s.convertToFixed18)(r.other).toNumber()})}))),Object(u.Y)(t,m)&&!Object(u.Y)(e,m)&&(g.current=r.derive.dex.pool(e).subscribe((function(r){R({supplyCurrency:e,supplySize:Object(s.convertToFixed18)(r.other).toNumber(),targetCurrency:t,targetSize:Object(s.convertToFixed18)(r.base).toNumber()})}))),Object(u.Y)(t,m)||Object(u.Y)(e,m)||(g.current=Object(d.b)([r.derive.dex.pool(e),r.derive.dex.pool(t)]).subscribe((function(r){var a=Object(b.a)(r,2),n=a[0],c=a[1];R({supplyCurrency:e,supplySize:Object(s.convertToFixed18)(n.other).toNumber(),targetCurrency:t,targetSize:Object(s.convertToFixed18)(c.other).toNumber()})}))),Object(u.Y)(e,m)&&Object(u.Y)(t,m)&&R({supplyCurrency:e,supplySize:0,targetCurrency:t,targetSize:0})}),[r.derive,m,R]),q=Object(a.useCallback)((function(e,t,a,n){return Object(d.b)([r.derive.dex.pool(e),r.derive.dex.pool(t)]).pipe(Object(y.a)((function(r){var c=Object(b.a)(r,2),u=c[0],l=c[1];return u&&l?!e.eq(m)&&t.eq(m)?Object(s.calcSupplyInOtherToBase)(s.Fixed18.fromNatural(a),C(u),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():e.eq(m)&&!t.eq(m)?Object(s.calcSupplyInBaseToOther)(s.Fixed18.fromNatural(a),C(l),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():e.eq(m)||t.eq(m)?0:Object(s.calcSupplyInOtherToOther)(s.Fixed18.fromNatural(a),C(u),C(l),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():0})),Object(f.a)())}),[r.derive,m,E]),P=Object(a.useCallback)((function(e,t,a,n){return Object(d.b)([r.derive.dex.pool(e),r.derive.dex.pool(t)]).pipe(Object(y.a)((function(r){var c=Object(b.a)(r,2),u=c[0],l=c[1];return u&&l?!e.eq(m)&&t.eq(m)?Object(s.calcTargetInOtherToBase)(s.Fixed18.fromNatural(a),C(u),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():e.eq(m)&&!t.eq(m)?Object(s.calcTargetInBaseToOther)(s.Fixed18.fromNatural(a),C(l),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():e.eq(m)||t.eq(m)?0:Object(s.calcTargetInOtherToOther)(s.Fixed18.fromNatural(a),C(u),C(l),Object(s.convertToFixed18)(E),s.Fixed18.fromNatural(n||0)).toNumber():0})),Object(f.a)())}),[r.derive,m,E]);return Object(a.useEffect)((function(){z.supplyCurrency&&!o&&p()}),[o,z,p]),Object(a.useEffect)((function(){B(x,m)}),[x,m,B]),n.a.createElement(O.Provider,{value:{calcSupply:q,calcTarget:P,dexBaseCurrency:m,isInitialized:o,pool:z,priceImpact:T,setCurrency:B,setPriceImpact:k,setSlippage:S,slippage:_,supplyCurrencies:j,targetCurrencies:v}},o?t:n.a.createElement(c.z,null))}));g.displayName="SwapProvider";var j=function(e){var t=e.basePriceRate,r=e.current,c=e.target,l=Object(i.C)(r),o=Object(i.C)(c),p=Object(a.useMemo)((function(){return l&&o?l.div(o):s.Fixed18.ZERO}),[l,o]);return n.a.createElement(u.p,{color:t.isLessThan(p)?"error":"success",pair:[{balance:s.Fixed18.fromNatural(1),currency:r},{balance:p,currency:c}],pairSymbol:"\u2248"})},v=function(e){var t=e.pool,r=e.supply,c=e.target,l=Object(a.useContext)(O).setPriceImpact,o=Object(i.m)(t.supplyCurrency,t.targetCurrency),s=Object(i.m)(t.supplyCurrency,t.targetCurrency,r,c),p=Object(a.useMemo)((function(){var e=Math.abs(s.sub(o).div(o).toNumber());return e>1?1:e}),[s,o]);return Object(a.useEffect)((function(){l(p)}),[p,l]),p<.001?null:n.a.createElement("p",null,"Price Impact is ",n.a.createElement(u.s,{color:p<.01?"success":p>.05?"error":void 0,data:p}))},x=function(e){var t=e.pool,r=Object(i.i)().dexBaseCurrency,c=Object(i.e)().api,l=Object(a.useMemo)((function(){return!Object(u.Y)(t.supplyCurrency,r)&&!Object(u.Y)(t.targetCurrency,r)}),[t,r]);return n.a.createElement("div",{className:m.a.info},"Transaction Fee is ",n.a.createElement(u.s,{data:Object(s.convertToFixed18)(c.consts.dex.getExchangeFee).mul(l?s.Fixed18.fromNatural(2):s.Fixed18.fromNatural(1))}))},E=Object(a.memo)((function(e){var t=e.supply,r=e.supplyCurrency,l=e.target,o=e.targetCurrency,p=Object(a.useContext)(O),b=p.pool,d=p.slippage,y=Object(a.useMemo)((function(){var e=s.Fixed18.fromNatural(l).div(s.Fixed18.fromNatural(1+d));return e.isNaN()?0:e}),[l,d]),f=Object(i.m)(b.supplyCurrency,b.targetCurrency);return n.a.createElement("div",{className:m.a.swapInfoRoot},n.a.createElement("p",null,"You are selling",n.a.createElement(c.K,null,n.a.createElement(u.p,{balance:t,currency:r})),"for at least",n.a.createElement(c.K,null,n.a.createElement(u.p,{balance:y,currency:o}))),n.a.createElement("p",null,"Current Market Price is ",n.a.createElement(j,{basePriceRate:f,current:r,target:o})),n.a.createElement(x,{pool:b}),n.a.createElement(v,{pool:b,supply:t,target:l}))}));E.displayName="SwapInfo";var N=r(27),h=r(39),_=r(13),S=r(446),F=r(2407),w=r.n(F),T=function(e){var t=e.className,r=e.error,a=e.label,c=Object(h.a)(e,["className","error","label"]);return n.a.createElement("div",{className:Object(_.a)(t,w.a.root,Object(N.a)({},w.a.error,r))},n.a.createElement(S.a,Object.assign({},c,{className:w.a.input})),a?n.a.createElement("span",null,a):null)},k=r(2408),I=r.n(k),M=Object(a.memo)((function(){var e=Object(a.useContext)(O),t=e.setSlippage,r=e.slippage,u=Object(a.useState)(0),l=Object(b.a)(u,2),o=l[0],i=l[1],s=[.001,.005,.01],p=Object(a.useCallback)((function(e){t(e)}),[t]),m=Object(a.useCallback)((function(e){return"".concat(100*e,"%").concat(e===s[1]?" (suggested)":"")}),[s]),d=Object(a.useCallback)((function(e){var r=Number(e);i(r),t(r/100)}),[t]);return n.a.createElement("div",{className:I.a.root}," ",n.a.createElement("p",{className:I.a.title},"Limit addtion price slippage"),n.a.createElement(c.L,null,s.map((function(e){return n.a.createElement(c.K,{color:r===e?"primary":"white",key:"suggest-".concat(e),onClick:function(){return p(e)}},m(e))})),n.a.createElement(T,{id:"custom",label:"%",max:50,min:0,name:"custom",onChange:d,placeholder:"Custom",value:o})))}));M.displayName="SlippageInputArea";var z=function(e){var t=e.addon,r=e.currencies,l=e.error,o=e.inputName,i=e.maxInput,s=e.onChange,p=e.onTokenChange,b=e.showMax,d=void 0!==b&&b,y=e.title,f=e.token,C=e.value,O=Object(a.useCallback)((function(){s&&i&&s(i.toNumber())}),[i,s]);return n.a.createElement("div",{className:m.a.inputAreaRoot},n.a.createElement("div",{className:m.a.title},y,n.a.createElement(c.i,{condition:!!i},n.a.createElement("p",null,"Max:",n.a.createElement(u.p,{balance:i,currency:f})))),n.a.createElement(u.c,{className:m.a.input,currencies:r,enableTokenSelect:!0,error:l,name:o,onChange:s,onMax:O,onTokenChange:p,showMaxBtn:d,token:f,value:C}),t)};function R(e){var t=e.onClick;return n.a.createElement(c.s,{className:m.a.swapBtn,color:"primary",icon:"swap",onClick:t,size:"large",type:"border"})}var B=Object(a.memo)((function(){var e=Object(a.useContext)(O),t=e.calcSupply,r=e.calcTarget,p=e.pool,b=e.priceImpact,d=e.setCurrency,y=e.slippage,f=e.supplyCurrencies,C=e.targetCurrencies,g=Object(i.g)(p.supplyCurrency),j=Object(i.u)({supply:{currency:p.supplyCurrency,max:p.supplySize,min:0,type:"balance"},target:{max:p.targetSize,min:0,type:"number"}}),v=Object(o.a)({initialValues:{supply:"",target:""},onSubmit:l.noop,validate:j}),x=Object(a.useCallback)((function(){d(p.targetCurrency,p.supplyCurrency),v.resetForm()}),[d,p.targetCurrency,p.supplyCurrency,v]),N=Object(a.useCallback)((function(e){r(p.supplyCurrency,p.targetCurrency,e).subscribe((function(e){Object(c.Q)((function(){return v.setFieldValue("target",e)}))})),Object(c.Q)((function(){return v.setFieldValue("supply",e)}))}),[r,p.supplyCurrency,p.targetCurrency,v]),h=Object(a.useCallback)((function(e){t(p.supplyCurrency,p.targetCurrency,e).subscribe((function(e){Object(c.Q)((function(){return v.setFieldValue("supply",e)}))})),Object(c.Q)((function(){return v.setFieldValue("target",e)}))}),[t,p.supplyCurrency,p.targetCurrency,v]),_=Object(a.useCallback)((function(e){d(e,p.targetCurrency),t(e,p.targetCurrency,v.values.target).subscribe((function(e){e&&Object(c.Q)((function(){return v.setFieldValue("supply",e)}))}))}),[t,v,p.targetCurrency,d]),S=Object(a.useCallback)((function(e){d(p.supplyCurrency,e),r(p.supplyCurrency,e,v.values.supply).subscribe((function(e){e&&Object(c.Q)((function(){return v.setFieldValue("target",e)}))}))}),[r,v,p.supplyCurrency,d]),F=Object(a.useMemo)((function(){return!(!v.errors.supply&&!v.errors.target)||(!v.values.target||!v.values.supply)}),[v]),w=Object(a.useMemo)((function(){return g?Object(s.convertToFixed18)(g).min(s.Fixed18.fromNatural(p.supplySize)):void 0}),[g,p.supplySize]),T=Object(a.useMemo)((function(){return[p.supplyCurrency,Object(u.X)(v.values.supply),p.targetCurrency,s.Fixed18.fromNatural(v.values.target).div(s.Fixed18.fromNatural(1+y)).innerToString()]}),[v,p,y]);return n.a.createElement(c.f,{className:m.a.root,padding:!1},n.a.createElement("div",{className:m.a.main},n.a.createElement(z,{currencies:f,error:v.errors.supply,inputName:"supply",maxInput:w,onChange:N,onTokenChange:_,showMax:!0,title:"Pay With",token:p.supplyCurrency,value:v.values.supply}),n.a.createElement(R,{onClick:x}),n.a.createElement(z,{addon:n.a.createElement("div",{className:m.a.addon},n.a.createElement("p",null,"Exchange Rate"),n.a.createElement(u.i,{supply:p.supplyCurrency,target:p.targetCurrency})),currencies:C,error:v.errors.target,inputName:"target",onChange:h,onTokenChange:S,title:"Receive (Estimate)",token:p.targetCurrency,value:v.values.target}),n.a.createElement(u.N,{className:m.a.txBtn,color:b>.05?"danger":"primary",disabled:F,method:"swapCurrency",onSuccess:v.resetForm,params:T,section:"dex",size:"large"},b>.05?"Swap Anyway":"Swap")),n.a.createElement(E,{supply:v.values.supply,supplyCurrency:p.supplyCurrency,target:v.values.target,targetCurrency:p.targetCurrency}),n.a.createElement(M,null))}));B.displayName="SwapConsole";var q=r(2409),P=r.n(q),A=function(){var e=Object(a.useContext)(O),t=e.dexBaseCurrency,r=e.supplyCurrencies.filter((function(e){return e.toString()!==t.toString()})),l=[{align:"left",render:function(e){return n.a.createElement(u.F,{currency:e,icon:!0})},title:"Token Pair",width:1},{align:"left",render:function(e){return n.a.createElement(u.i,{supply:e})},title:"Market Price",width:3},{align:"left",render:function(e){return n.a.createElement(u.j,{token:e})},title:"Pool Size",width:3}];return n.a.createElement(c.C,{title:"All Markets"},n.a.createElement(c.f,{padding:!1},n.a.createElement(c.I,{config:l,data:r,headerCellClassName:P.a.headerCell,showHeader:!0})))},Y=function(e){var t=e.supply,r=e.supplyCurrency,a=e.target,c=e.targetCurrency;return n.a.createElement(u.p,{pair:[{balance:s.Fixed18.fromParts(t),currency:r},{balance:s.Fixed18.fromParts(a),currency:c}],pairSymbol:"->"})},Q=function(){var e=Object(a.useRef)([{align:"left",dataIndex:"hash",render:function(e){return n.a.createElement(u.q,{hash:e})},title:"Tx Hash",width:1},{align:"left",dataIndex:"params",render:function(e){return n.a.createElement(Y,{supply:e[1],supplyCurrency:e[0],target:e[3],targetCurrency:e[2]})},title:"Action",width:3},{align:"left",dataIndex:"time",render:function(e){return n.a.createElement(u.t,{time:e})},title:"When",width:1},{align:"right",dataIndex:"success",render:function(e){return n.a.createElement(c.E,{success:e})},title:"Result",width:1}]);return n.a.createElement(u.d,{config:e.current,method:"swap_currency",section:"dex"})};t.default=function(){return n.a.createElement(g,null,n.a.createElement(c.y,null,n.a.createElement(c.y.Title,{title:"Swap"}),n.a.createElement(c.y.Content,null,n.a.createElement(c.r,{container:!0},n.a.createElement(c.r,{item:!0},n.a.createElement(u.R,null)),n.a.createElement(c.r,{item:!0},n.a.createElement(B,null)),n.a.createElement(c.r,{item:!0},n.a.createElement(A,null)),n.a.createElement(c.r,{item:!0},n.a.createElement(Q,null))))))}}}]);
//# sourceMappingURL=7.98a0f8fa.chunk.js.map