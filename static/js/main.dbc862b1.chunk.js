(this["webpackJsonpspace-app"]=this["webpackJsonpspace-app"]||[]).push([[0],{32:function(e,t,a){e.exports=a.p+"static/media/BgVideo2.88bfffbc.mp4"},36:function(e,t){e.exports=function(){var e=new Date;return[e.getFullYear(),String(e.getMonth()+1).padStart(2,"0"),String(e.getDate()).padStart(2,"0")].join("-")}},37:function(e,t,a){e.exports=a(85)},42:function(e,t,a){},43:function(e,t,a){},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},53:function(e,t,a){},67:function(e,t,a){},85:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(31),l=a.n(o),c=(a(42),a(4)),s=(a(43),a(32)),i=a.n(s),u=a(33),m=a.n(u),h=function(){var e=Object(n.useRef)(),t=Object(n.useState)(!0),a=Object(c.a)(t,2),o=a[0],l=a[1];return r.a.createElement("div",null,o?r.a.createElement("video",{autoPlay:!0,loop:!0,muted:!0,ref:e,onCanPlay:function(){e.current.playbackRate=.8},className:"bg bgVideo"},r.a.createElement("source",{src:i.a,type:"video/mp4"})):r.a.createElement("div",{className:"bg bgPicture"}),r.a.createElement("div",{className:"bgOnOff"},r.a.createElement("label",{htmlFor:"toggleBg",className:"srOnly"},"toggle background from video to picture"),r.a.createElement(m.a,{onChange:function(e){return l(!o)},checked:o,id:"toggleBg",onHandleColor:"#000000",offHandleColor:"#000000",onColor:"#ffffff",offColor:"#ffffff",checkedIcon:r.a.createElement("svg",{viewBox:"-10 -7 40 40",xmlns:"http://www.w3.org/2000/svg",fillRule:"evenodd",clipRule:"evenodd"},r.a.createElement("path",{d:"M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"})),uncheckedIcon:r.a.createElement("svg",{viewBox:"-6 -6 40 40",xmlns:"http://www.w3.org/2000/svg",fillRule:"evenodd",clipRule:"evenodd"},r.a.createElement("path",{d:"M24 23h-24v-21h24v21zm-20-1v-4h-3v4h3zm15 0v-19h-14v19h14zm4 0v-4h-3v4h3zm-6-9.5l-9 5v-10l9 5zm3 .5v4h3v-4h-3zm-16 4v-4h-3v4h3zm5-1.2l5.941-3.3-5.941-3.3v6.6zm11-7.8v4h3v-4h-3zm-16 4v-4h-3v4h3zm16-9v4h3v-4h-3zm-16 4v-4h-3v4h3z"}))})))},d=(a(45),a(46),function(e){var t=e.propsForError,a=t.showError,n=t.errorMsg;return r.a.createElement("div",{className:"popupBack"},r.a.createElement("div",{className:"popup"},r.a.createElement("p",null,n),r.a.createElement("button",{onClick:function(){return a(!1)}},"CLOSE")))}),p=function(){return r.a.createElement("header",null,r.a.createElement("h1",null,"Explore Space"))},f=a(8),v=(a(47),function(){return r.a.createElement("div",{className:"loadingLogo"},r.a.createElement("p",null,"Loading"),r.a.createElement("div",{"aria-hidden":"true"},r.a.createElement("div",{className:"line","aria-hidden":"true"}),r.a.createElement("div",{className:"line","aria-hidden":"true"}),r.a.createElement("div",{className:"line","aria-hidden":"true"})))}),E=function(e){var t=e.propsForApod,a=t.isLoading,n=t.results.dayPhoto,o=t.userInput,l=t.userSelectedQuery,c=t.findPhotoDay;return r.a.createElement("section",null,r.a.createElement("h2",null,"Photo/Video of the day"),r.a.createElement("p",null,"Select a desired date. If date is not selected, by default today's date is set. The result shows up the title of the photo of the selected date, author name, description and the photo as well."),r.a.createElement("form",{action:""},r.a.createElement("div",{className:"dayPhoto"},r.a.createElement("label",{htmlFor:"date",className:"srOnly"},"Pick a date"),r.a.createElement("input",{onChange:l,type:"date",id:"date",name:"date",placeholder:"e.g.: 2020-07-11",value:o.date}),r.a.createElement("button",{onClick:c},"SEARCH"),n.date&&!a.date?r.a.createElement(f.b,{to:"/photooftheday",className:"resultsLink"},"SEE RESULTS"):a.date?r.a.createElement(v,null):null)))},g=function(e){var t=e.propsForRovers,a=t.isLoading,n=t.results.roverPhotos,o=t.userInput,l=t.userSelectedQuery,c=t.findRoverPhotos;return r.a.createElement("section",null,r.a.createElement("h2",null,"Mars Rover photos"),r.a.createElement("p",null,"Select a rover. The result shows up photos taken by a selected rover on one of the days, information about rover; when it left Earth, landed on Mars, how many photos took(taken if still operates) as well as when the last photos were taken."),r.a.createElement("form",{action:""},r.a.createElement("div",{className:"roverPhotos"},r.a.createElement("label",{htmlFor:"rover",className:"srOnly"},"Select a rover"),r.a.createElement("select",{onChange:l,type:"rover",id:"rover",name:"roverName",value:o.roverName},r.a.createElement("option",{name:"roverName",value:""},"Pick a Mars rover"),r.a.createElement("option",{name:"roverName",value:"spirit"},"Spirit"),r.a.createElement("option",{name:"roverName",value:"opportunity"},"Opportunity"),r.a.createElement("option",{name:"roverName",value:"curiosity"},"Curiosity")),r.a.createElement("button",{onClick:c},"SEARCH"),n.length&&!a.roverName?r.a.createElement(f.b,{to:"/roverPhotos",className:"resultsLink"},"SEE RESULTS"):a.roverName?r.a.createElement(v,null):null)))},b=function(e){var t=e.propsForAddInfo,a=t.isLoading,n=t.results.spaceInfo,o=t.userInput,l=t.userSelectedQuery,c=t.findSpaceInfo;return r.a.createElement("section",null,r.a.createElement("h2",null,"Space information"),r.a.createElement("p",null,"Search space information based on the search input. The result shows up a list of items based on user requets. The list includes title of the event, its photo and description."),r.a.createElement("form",{action:""},r.a.createElement("div",{className:"spaceInfo"},r.a.createElement("label",{htmlFor:"text",className:"srOnly"},"Input your search query"),r.a.createElement("input",{onChange:l,type:"text",name:"searchText",id:"text",value:o.searchText,placeholder:"e.g. Nebulae"}),r.a.createElement("button",{onClick:c},"SEARCH"),n.hasOwnProperty("items")&&!a.searchText?r.a.createElement(f.b,{to:"/spaceInfo",className:"resultsLink"},"SEE RESULTS"):a.searchText?r.a.createElement(v,null):null)))},O=function(e){var t=e.isThereError;return r.a.createElement("div",null,r.a.createElement(p,null),t?r.a.createElement(d,{propsForError:e}):null,r.a.createElement(E,{propsForApod:e}),r.a.createElement(g,{propsForRovers:e}),r.a.createElement(b,{propsForAddInfo:e}))},P=a(2),y=(a(53),function(e){var t=e.changePage;return t?r.a.createElement("div",{className:"seeResLink"},r.a.createElement(f.b,{to:"/",className:"goBackLink",onClick:function(){return t("")}},"GO BACK")):r.a.createElement("div",{className:"seeResLink"},r.a.createElement(f.b,{to:"/",className:"goBackLink"},"GO BACK"))}),j=function(e){var t=e.propsForDayPhoto,a=t.title,n=t.url,o=t.copyright,l=t.date,c=t.explanation,s=t.media_type;return r.a.createElement("div",{className:"dayPhotoRes"},r.a.createElement("h3",null,a),e.propsForDayPhoto.hasOwnProperty("copyright")?r.a.createElement("p",null,"image"===s?"Photo of the day":"Video of the day"," ",r.a.createElement("span",null,l)," by ",o):r.a.createElement("p",null,"image"===s?"Photo of the day":"Video of the day"," ",r.a.createElement("span",null,l)," by unknown author"),r.a.createElement("p",null,c),r.a.createElement("div",null,"image"===s?r.a.createElement("img",{src:n,alt:a}):r.a.createElement("iframe",{src:n,frameBorder:"0",allow:"autoplay; encrypted-media",allowFullScreen:!0,title:"video",width:"550px",height:"325px"})),r.a.createElement(y,null))},x=a(35),N=a.n(x),k=(a(66),{desktop:{breakpoint:{max:3e3,min:1024},items:3,slidesToSlide:3},tablet:{breakpoint:{max:1024,min:325},items:2,slidesToSlide:2},mobile:{breakpoint:{max:325,min:0},items:1,slidesToSlide:1}}),w=function(e){var t=Object(c.a)(e.roverPhotos,1)[0],a=t.earth_date,n=t.rover,o=n.landing_date,l=n.launch_date,s=n.name,i=n.status,u=e.manifestData;return r.a.createElement("div",{className:"roverPhotosRes"},r.a.createElement("h3",null,"Photos"),r.a.createElement("p",null,"Rover name ",r.a.createElement("span",null,s)),r.a.createElement("p",null,"Photos taken on ",r.a.createElement("span",null,a)),r.a.createElement("p",null,"Rover left Earth ",r.a.createElement("span",null,l)),r.a.createElement("p",null,"Rover landed on Mars ",r.a.createElement("span",null,o)),r.a.createElement("p",null,"Total photos taken by ",s," ",r.a.createElement("span",null,u[s.toLowerCase()].total_photos)),r.a.createElement("p",null,"The last photos taken on ",r.a.createElement("span",null,u[s.toLowerCase()].max_date)),r.a.createElement("p",null,"Status ",r.a.createElement("span",null,i)),r.a.createElement(N.a,{swipeable:!0,draggable:!0,arrows:!0,keyBoardControl:!0,responsive:k,customTransition:"all .5",transitionDuration:500,containerClass:"roverPhotosContainer",itemClass:"roverPhotosItem",partialVisible:!1},e.roverPhotos.map((function(e){return r.a.createElement("div",{key:e.id},r.a.createElement("img",{src:e.img_src,alt:"taken by ".concat(e.rover.name," on ").concat(e.earth_date)}))}))),r.a.createElement(y,null))};var S=function(e){var t=e.changePage,a=function(e){if(e){if(2===e.length)return[e[0].href.split("&")[0].split("=")[1],e[1].href.split("&")[0].split("=")[1]];if(1===e.length){if("prev"===e[0].rel)return["prev",e[0].href.split("&")[0].split("=")[1]];if("next"===e[0].rel)return["next",e[0].href.split("&")[0].split("=")[1]]}}}(e.propsForAddInfo.links);return r.a.createElement("div",null,r.a.createElement("h3",null,"Space Information"),r.a.createElement("ul",{className:"spaceInfoRes"},e.propsForAddInfo.items.map((function(e){return r.a.createElement("li",{key:e.data[0].nasa_id},r.a.createElement("h4",null,e.data[0].title),e.hasOwnProperty("links")?r.a.createElement("div",{className:"imgParent"},r.a.createElement("img",{src:e.links[0].href,alt:"".concat(e.data[0].title)})):null,r.a.createElement("p",null,e.data[0].description))}))),"prev"===(a&&a[0])?r.a.createElement("div",{className:"prevNextPages"},r.a.createElement("button",{onClick:function(){return t(a[1])},"aria-label":"go to the previous page"},r.a.createElement("i",{className:"fas fa-chevron-left","aria-hidden":"true"}))):"next"===(a&&a[0])?r.a.createElement("div",{className:"prevNextPages"},r.a.createElement("button",{onClick:function(){return t(a[1])},"aria-label":"go to the next page"},r.a.createElement("i",{className:"fas fa-chevron-right","aria-hidden":"true"}))):a?r.a.createElement("div",{className:"prevNextPages"},r.a.createElement("button",{onClick:function(){return t(a[0])},"aria-label":"go to the previous page"},r.a.createElement("i",{className:"fas fa-chevron-left","aria-hidden":"true"})),r.a.createElement("button",{onClick:function(){return t(a[1])},"aria-label":"go to the next page"},r.a.createElement("i",{className:"fas fa-chevron-right","aria-hidden":"true"}))):null,r.a.createElement(y,{changePage:t}))},C=function(e){var t=e.results,a=t.dayPhoto,n=t.roverPhotos,o=t.spaceInfo,l=e.manifestData,c=e.currentPage,s=e.changePage;return r.a.createElement("div",null,r.a.createElement(P.a,{exact:!0,path:"/photooftheday"},r.a.createElement(j,{propsForDayPhoto:a})),r.a.createElement(P.a,{exact:!0,path:"/roverPhotos"},r.a.createElement(w,{roverPhotos:n,manifestData:l})),r.a.createElement(P.a,{exact:!0,path:"/spaceInfo"},r.a.createElement(S,{propsForAddInfo:o,currentPage:c,changePage:s})))},I=(a(67),function(){return r.a.createElement("footer",null,r.a.createElement("p",null,"2020 Made by Illia Nikitin"),r.a.createElement("a",{href:"https://github.com/Illia16",className:"github","aria-label":"github icon for Illia's profile"},r.a.createElement("i",{className:"fab fa-github","aria-hidden":"true"})),r.a.createElement("a",{href:"https://www.linkedin.com/in/illia-nikitin-a4a637122/",className:"linkedin","aria-label":"linkedin icon for Illia's profile"},r.a.createElement("i",{className:"fab fa-linkedin","aria-hidden":"true"})))}),T=a(13),L=a(1),R=Object(n.createContext)(),D=function(){return Object(n.useContext)(R)};function z(e){var t=e.children,a=Object(n.useState)({date:"",roverName:"",searchText:""}),o=Object(c.a)(a,2),l=o[0],s=o[1],i=Object(n.useState)({spirit:"",opportunity:"",curiosity:""}),u=Object(c.a)(i,2),m=u[0],h=u[1],d=Object(n.useState)({dayPhoto:[],roverPhotos:[],spaceInfo:[]}),p=Object(c.a)(d,2),f=p[0],v=p[1],E=Object(n.useState)(""),g=Object(c.a)(E,2),b=g[0],O=g[1];return r.a.createElement(R.Provider,{value:{userSelectedQuery:function(e){e.preventDefault(),s(Object(L.a)(Object(L.a)({},l),{},Object(T.a)({},e.target.name,e.target.value)))},userInput:l,userSelection:s,results:f,getData:v,manifestData:m,getManifestData:h,currentPage:b,changePage:O}},t)}var M=Object(n.createContext)(),F=function(){return Object(n.useContext)(M)};function A(e){var t=e.children,a=Object(n.useState)(!1),o=Object(c.a)(a,2),l=o[0],s=o[1],i=Object(n.useState)(""),u=Object(c.a)(i,2),m=u[0],h=u[1];return r.a.createElement(M.Provider,{value:{isThereError:l,showError:s,errorMsg:m,setErrorMsg:h}},t)}var B=Object(n.createContext)(),_=function(){return Object(n.useContext)(B)};function Q(e){var t=e.children,a=Object(n.useState)({date:!1,roverName:!1,searchText:!1}),o=Object(c.a)(a,2),l=o[0],s=o[1];return r.a.createElement(B.Provider,{value:{isLoading:l,setLoading:s}},t)}var G=a(11),U=a.n(G),V=a(36),H=a.n(V),K=Object(n.createContext)();function W(e){var t=e.children,a=D(),n=a.userInput,o=a.userSelection,l=a.results,c=a.getData,s=F(),i=s.showError,u=s.setErrorMsg,m=_(),h=m.isLoading,d=m.setLoading;return r.a.createElement(K.Provider,{value:{findPhotoDay:function(e){e.preventDefault(),d(Object(L.a)(Object(L.a)({},h),{},{date:!0})),U()({url:"https://api.nasa.gov/planetary/apod",method:"GET",params:{api_key:"RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm",date:n.date||H()()}}).then((function(e){d(Object(L.a)(Object(L.a)({},h),{},{date:!1})),c(Object(L.a)(Object(L.a)({},l),{},{dayPhoto:e.data})),o(Object(L.a)(Object(L.a)({},n),{},{date:e.data.date}))})).catch((function(e){d(Object(L.a)(Object(L.a)({},h),{},{date:!1})),i(!0),u(e.response.data.msg)}))}}},t)}var Y=Object(n.createContext)();function q(e){var t=e.children,a=D(),o=a.userInput.roverName,l=a.results,c=a.getData,s=a.manifestData,i=a.getManifestData,u=F(),m=u.showError,h=u.setErrorMsg,d=_(),p=d.isLoading,f=d.setLoading;Object(n.useEffect)((function(){s[o]&&(f(Object(L.a)(Object(L.a)({},p),{},{roverName:!0})),E().then((function(e){f(Object(L.a)(Object(L.a)({},p),{},{roverName:!1})),c(Object(L.a)(Object(L.a)({},l),{},{roverPhotos:e.data.photos}))})).catch((function(e){f(Object(L.a)(Object(L.a)({},p),{},{roverName:!1})),m(!0),h(e.response.data.errors)})))}),[s[o]]);var v=function(){return U()({url:"https://api.nasa.gov/mars-photos/api/v1/manifests/".concat(o,"/"),method:"GET",params:{api_key:"RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm"}})},E=function(){return U()({url:"https://api.nasa.gov/mars-photos/api/v1/rovers/".concat(o,"/photos"),method:"GET",params:{api_key:"RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm",sol:Math.floor(Math.random()*s[o].max_sol+1)}})};return r.a.createElement(Y.Provider,{value:{findRoverPhotos:function(e){if(e.preventDefault(),!o)return m(!0),void h("The input is empty.");v().then((function(e){i(Object(L.a)(Object(L.a)({},s),{},Object(T.a)({},o,e.data.photo_manifest)))})).catch((function(e){m(!0),h(e.message)}))}}},t)}var Z=Object(n.createContext)();function J(e){var t=e.children,a=D(),o=a.userInput,l=a.results,c=a.getData,s=a.currentPage,i=F(),u=i.showError,m=i.setErrorMsg,h=_(),d=h.isLoading,p=h.setLoading,f=function(){U()({url:"https://images-api.nasa.gov/search",method:"GET",params:{q:o.searchText,page:s||1}}).then((function(e){var t=e.data.collection;t.items.length?(p(Object(L.a)(Object(L.a)({},d),{},{searchText:!1})),c(Object(L.a)(Object(L.a)({},l),{},{spaceInfo:t}))):(p(Object(L.a)(Object(L.a)({},d),{},{searchText:!1})),u(!0),m("No results found based on your input."))})).catch((function(e){p(Object(L.a)(Object(L.a)({},d),{},{searchText:!1})),u(!0),m(e.response.data.reason)}))};return Object(n.useEffect)((function(){s&&(f(),window.scrollTo(0,0))}),[s]),r.a.createElement(Z.Provider,{value:{findSpaceInfo:function(e){if(e.preventDefault(),!o.searchText)return u(!0),void m("The input is empty.");p(Object(L.a)(Object(L.a)({},d),{},{searchText:!0})),f()}}},t)}var $=function(){var e=D(),t=e.userInput,a=e.manifestData,o=e.results,l=e.currentPage,c=e.changePage,s=e.userSelectedQuery,i=F(),u=i.isThereError,m=i.showError,d=i.errorMsg,p=_().isLoading,v=Object(n.useContext)(K).findPhotoDay,E=Object(n.useContext)(Y).findRoverPhotos,g=Object(n.useContext)(Z).findSpaceInfo;return r.a.createElement(f.a,{basename:"/spaceApp"},r.a.createElement(h,null),r.a.createElement("div",{className:"App wrapper"},r.a.createElement(P.a,{exact:!0,path:"/"},r.a.createElement(O,{isThereError:u,showError:m,errorMsg:d,isLoading:p,userInput:t,userSelectedQuery:s,findPhotoDay:v,results:o,findRoverPhotos:E,findSpaceInfo:g})),r.a.createElement(C,{results:o,manifestData:a,currentPage:l,changePage:c})),r.a.createElement(I,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null,r.a.createElement(A,null,r.a.createElement(Q,null,r.a.createElement(W,null,r.a.createElement(q,null,r.a.createElement(J,null,r.a.createElement($,null)))))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.dbc862b1.chunk.js.map