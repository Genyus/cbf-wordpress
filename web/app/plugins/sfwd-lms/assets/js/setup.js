/** This file is part of the LearnDash plugin and was generated automatically */
!function(){var e,t={120:function(){jQuery((function(e){e(document).on("click",".box .content",(function(t){var n=e(this).closest(".box"),o=n.data("url"),a=1===n.data("completed");o&&o.length>0&&!a&&(t.preventDefault(),window.location.href=o)})),e(document).on("click",'a[data-type="article"], a[data-type="overview_article"]',(function(t){t.preventDefault(),Beacon("article",e(this).data("helpscout_id"),{type:"modal"})})),e(document).on("click",'a[data-type="helpscout_action"]',(function(t){var n,o;switch(t.preventDefault(),e(this).data("action")){case"open_doc":(n=e(this).data("keyword")).length>0?Beacon("navigate","/docs/search?query="+n):(Beacon("suggest",[]),Beacon("navigate","/answers/")),Beacon("open");break;case"open_chat":Beacon("navigate","/ask/"),Beacon("open");break;case"suggest_articles":o=e(this).data("articles").split(","),Beacon("suggest",o),Beacon("navigate","/answers/"),Beacon("open")}})),e(document).on("click",'[data-type="youtube_video"]',(function(t){t.preventDefault();var n="https://www.youtube.com/embed/"+e(this).data("youtube_id")+"?autoplay=1&controls=1";e(".video-wrapper .video-iframe").attr("src",n),e(".video-wrapper").show()})),e(document).on("click",'[data-type="vimeo_video"]',(function(t){t.preventDefault();var n="https://player.vimeo.com/video/"+e(this).data("vimeo_id");e(".video-wrapper .video-iframe").attr("src",n),e(".video-wrapper").show()})),e(document).on("click",".video-wrapper .close",(function(t){t.preventDefault(),e(".video-wrapper .video-iframe").removeAttr("src"),e(".video-wrapper").hide()}))}))},431:function(){},128:function(){},832:function(){}},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=function(t,n,a,r){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],a=e[d][1],r=e[d][2];for(var c=!0,u=0;u<n.length;u++)(!1&r||i>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[u])}))?n.splice(u--,1):(c=!1,r<i&&(i=r));if(c){e.splice(d--,1);var s=a();void 0!==s&&(t=s)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,a,r]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={891:0,587:0,65:0,249:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,r,i=n[0],c=n[1],u=n[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(a in c)o.o(c,a)&&(o.m[a]=c[a]);if(u)var d=u(o)}for(t&&t(n);s<i.length;s++)r=i[s],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},n=self.webpackChunklearndash=self.webpackChunklearndash||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),o.O(void 0,[587,65,249],(function(){return o(120)})),o.O(void 0,[587,65,249],(function(){return o(431)})),o.O(void 0,[587,65,249],(function(){return o(128)}));var a=o.O(void 0,[587,65,249],(function(){return o(832)}));a=o.O(a)}();