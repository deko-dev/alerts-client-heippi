"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[592],{4509:(v,c,t)=>{t.d(c,{l:()=>l});var i=t(8186),n=t(5985),a=t(2340),r=t(1584);let l=(()=>{class o extends n.sk{constructor(e){super({url:a.N.serverSocket,options:{query:{payload:e.get("user")}}}),this.cookieService=e,this.outEvent=new i.vpe,this.devicesOut=new i.vpe,this.ioSocket.on("response",s=>{console.log("Send Devices"),this.devicesOut.emit(s)})}hacerLogin(e,s={}){console.log("Emitiendo"),this.ioSocket.emit("default",{cookiePayload:this.cookieService.get("user"),event:e,payload:s})}login(e,s={}){console.log("Emitiendo"),this.ioSocket.emit("default",{cookiePayload:this.cookieService.get("user"),event:e,payload:s})}alert(){console.log("Emitiendo"),this.ioSocket.emit("default",{event:"alert",payload:"OK2Ws6QFnqW7UstgAAAC"})}sendMessage(e){this.ioSocket.emit("default",{cookiePayload:this.cookieService.get("user"),event:"message",payload:e})}getMessages(){this.ioSocket.emit("default",{cookiePayload:this.cookieService.get("user"),event:"messages"})}getSockets(){console.log("sockets"),this.ioSocket.emit("default",{event:"devices"})}sendAlert(e){this.ioSocket.emit("default",{event:"alert",payload:e})}}return o.\u0275fac=function(e){return new(e||o)(i.LFG(r.N))},o.\u0275prov=i.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()}}]);