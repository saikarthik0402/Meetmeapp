(self.webpackChunkmeetmeapplication=self.webpackChunkmeetmeapplication||[]).push([[239],{2239:(t,e,r)=>{"use strict";r.r(e),r.d(e,{LoginModule:()=>p});var i=r(8583),o=r(3679),n=r(8505),a=r(7716),s=r(4655),l=r(7001),c=r(5632);const d=function(t){return{"card-transform":t}},m=function(t){return{"button-transform":t}},g=[{path:"",component:(()=>{class t{constructor(t,e,r){this.router=t,this.HttpService=e,this.snackbar=r,this.loginform=new o.cw({}),this.isError=!1,this.errorresponse="",this.isValidationError=!1,this.isclicked=!1}ngOnInit(){this.isclicked=!1,this.loginform=new o.cw({email:new o.NI("",o.kI.required),password:new o.NI("",o.kI.required)}),this.HttpService.getLoginErrorResponse().subscribe(t=>{""!=t&&this.snackbar.open(t,"",{horizontalPosition:"center",verticalPosition:"top",panelClass:["warning-snackbar"],duration:5e3})})}login(){this.isclicked=!0,setTimeout(()=>{this.router.navigateByUrl("/signup")},700)}onSubmit(){this.loginform.valid&&this.ValidateUser()}ValidateUser(){var t,e;const r={email:null===(t=this.loginform.get("email"))||void 0===t?void 0:t.value.trim(),password:null===(e=this.loginform.get("password"))||void 0===e?void 0:e.value.trim()};console.log(r),this.HttpService.ValidateUser(r)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(s.F0),a.Y36(n.O),a.Y36(l.ux))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-login"]],features:[a._Bn([n.O])],decls:19,vars:9,consts:[[1,"card","z-index-0",3,"ngClass"],[1,"card-header","text-center","pt-4"],["src","../../assets/images/meetmelogo.png","width","200px","height","200px",2,"margin-top","-20px","margin-bottom","-40px"],[1,"card-body"],["role","form text-left","autocomplete","on",3,"formGroup","ngSubmit"],[3,"field"],[1,"mb-3"],["formControlName","email","type","email","placeholder","Email","aria-label","Email","aria-describedby","email-addon","autocomplete","email",1,"form-control"],["formControlName","password","type","password","placeholder","Password","aria-label","Password","aria-describedby","password-addon","autocomplete","current-password",1,"form-control"],[1,"text-center"],["type","submit","value","Login",1,"btn","bg-gradient-dark","w-100","my-4","mb-2",3,"ngClass"],[1,"text-sm","mt-3","mb-0",3,"click"],["href","javascript:;",1,"text-dark","font-weight-bolder"]],template:function(t,e){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"h5"),a._uU(3,"Login"),a.qZA(),a._UZ(4,"img",2),a.qZA(),a.TgZ(5,"div",3),a.TgZ(6,"form",4),a.NdJ("ngSubmit",function(){return e.onSubmit()}),a._UZ(7,"error-handling",5),a.TgZ(8,"div",6),a._UZ(9,"input",7),a.qZA(),a._UZ(10,"error-handling",5),a.TgZ(11,"div",6),a._UZ(12,"input",8),a.qZA(),a.TgZ(13,"div",9),a._UZ(14,"input",10),a.qZA(),a.TgZ(15,"p",11),a.NdJ("click",function(){return e.login()}),a._uU(16,"Register for a new Account "),a.TgZ(17,"a",12),a._uU(18,"Sign Up"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t&&(a.Q6J("ngClass",a.VKq(5,d,e.isclicked)),a.xp6(6),a.Q6J("formGroup",e.loginform),a.xp6(1),a.Q6J("field",e.loginform.get("email")),a.xp6(3),a.Q6J("field",e.loginform.get("password")),a.xp6(4),a.Q6J("ngClass",a.VKq(7,m,e.isclicked)))},directives:[i.mk,o._Y,o.JL,o.sg,c.u,o.Fj,o.JJ,o.u],styles:[".card[_ngcontent-%COMP%]{transition:transform 2s;transform-style:preserve-3d}.card-transform[_ngcontent-%COMP%]{transform:rotateY(180deg)}.button-transform[_ngcontent-%COMP%], .card-transform[_ngcontent-%COMP%]{-webkit-backface-visibility:hidden;backface-visibility:hidden}.alert[_ngcontent-%COMP%]{margin-bottom:10px;margin-top:20px;width:90%;height:auto;margin-left:10px}.alert-danger[_ngcontent-%COMP%]{background-image:none;color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}"]}),t})(),data:{title:"User Login"},outlet:"auth"}];let p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[i.ez,s.Bz.forChild(g)],s.Bz]}),t})()}}]);