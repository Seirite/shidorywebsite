(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"+BTK":function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),u("tNxZ"),u("t/Na"),n.AboutProvider=function(){function l(l,n){this.serviceFirestore=l,this.httpService=n}return l.prototype.getPosition=function(){return new Promise(function(l,n){navigator.geolocation.getCurrentPosition(function(n){l({lng:n.coords.longitude,lat:n.coords.latitude})},function(l){n(l)})})},l.prototype.getFormatedAddress=function(l,n){var u=this;return new Promise(function(e,t){u.httpService.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+l+","+n+"&key=AIzaSyDuAExFNG4dYsvLDnTfTUp646ZFW7NoTSs&sensor=true").subscribe(function(l){e(l)},function(l){t(l)})})},l.prototype.getCountryReport=function(l){return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(l).collection("COUNTRY_REPORT",function(l){return l.where("key","==","COUNTRY")}))},l.prototype.getNumberOfOrder=function(l){return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("SHIDORY").doc("ORG1").collection("COUNTRY").doc(l).collection("COMMISSION_TRACK_MST"))},l.prototype.getNumberOfVisitors=function(){return this.serviceFirestore.getListFromFireStore(this.serviceFirestore.firestore.collection("RESTRO_USER"))},l}()},"1oE1":function(l,n,u){"use strict";var e=u("B5SS"),t=u("CcnG"),o=u("Ip0R"),a=u("gIcY"),i=u("Y9Lo"),r=u("zWaH"),d=u("ZYCi"),s=u("o3x0"),c=u("+BTK"),p=u("vARd"),m=t.\u0275crt({encapsulation:0,styles:[e.styles],data:{}});function g(l){return t.\u0275vid(0,[(l()(),t.\u0275eld(0,0,null,null,10,"li",[["class","list-inline-item dropdown"]],null,null,null,null,null)),(l()(),t.\u0275eld(1,0,null,null,2,"a",[["aria-expanded","false"],["aria-haspopup","true"],["class","dropdown-toggle"],["data-toggle","dropdown"],["id","dropdownMenuLink"],["role","button"]],null,null,null,null,null)),(l()(),t.\u0275eld(2,0,null,null,0,"i",[["class","icofont icofont-ui-user"]],null,null,null,null,null)),(l()(),t.\u0275ted(3,null,[" ",""])),(l()(),t.\u0275eld(4,0,null,null,6,"ul",[["aria-labelledby","dropdownMenuLink"],["class","dropdown-menu dropdown-menu-right drophover"]],null,null,null,null,null)),(l()(),t.\u0275eld(5,0,null,null,2,"li",[["class","dropdown-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(6,0,null,null,1,"a",[["href","profile"]],null,null,null,null,null)),(l()(),t.\u0275ted(7,null,["",""])),(l()(),t.\u0275eld(8,0,null,null,2,"li",[["class","dropdown-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(9,0,null,null,1,"a",[],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.logOut()&&e),e},null,null)),(l()(),t.\u0275ted(-1,null,["Sign out"]))],null,function(l,n){var u=n.component;l(n,3,0,u.loginUserName),l(n,7,0,u.loginUserEmail)})}function f(l){return t.\u0275vid(0,[(l()(),t.\u0275eld(0,0,null,null,7,"li",[["class","list-inline-item dropdown"]],null,null,null,null,null)),(l()(),t.\u0275eld(1,0,null,null,2,"a",[["aria-expanded","false"],["aria-haspopup","true"],["class","dropdown-toggle"],["data-toggle","dropdown"],["id","dropdownMenuLink"],["role","button"]],null,null,null,null,null)),(l()(),t.\u0275eld(2,0,null,null,0,"i",[["class","icofont icofont-ui-user"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,[" My Account"])),(l()(),t.\u0275eld(4,0,null,null,3,"ul",[["aria-labelledby","dropdownMenuLink"],["class","dropdown-menu dropdown-menu-right drophover"]],null,null,null,null,null)),(l()(),t.\u0275eld(5,0,null,null,2,"li",[["class","dropdown-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(6,0,null,null,1,"a",[],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.openLoginDialog()&&e),e},null,null)),(l()(),t.\u0275ted(-1,null,["Login"]))],null,null)}function h(l){return t.\u0275vid(0,[(l()(),t.\u0275eld(0,0,null,null,227,"div",[["class","wrapper"]],null,null,null,null,null)),(l()(),t.\u0275eld(1,0,null,null,15,"div",[["class","loader"]],null,null,null,null,null)),(l()(),t.\u0275eld(2,0,null,null,14,"div",[["class","loader-inner"]],null,null,null,null,null)),(l()(),t.\u0275eld(3,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Cooking in progress.."])),(l()(),t.\u0275eld(5,0,null,null,11,"div",[["id","cooking"]],null,null,null,null,null)),(l()(),t.\u0275eld(6,0,null,null,0,"div",[["class","bubble"]],null,null,null,null,null)),(l()(),t.\u0275eld(7,0,null,null,0,"div",[["class","bubble"]],null,null,null,null,null)),(l()(),t.\u0275eld(8,0,null,null,0,"div",[["class","bubble"]],null,null,null,null,null)),(l()(),t.\u0275eld(9,0,null,null,0,"div",[["class","bubble"]],null,null,null,null,null)),(l()(),t.\u0275eld(10,0,null,null,0,"div",[["class","bubble"]],null,null,null,null,null)),(l()(),t.\u0275eld(11,0,null,null,5,"div",[["id","area"]],null,null,null,null,null)),(l()(),t.\u0275eld(12,0,null,null,2,"div",[["id","sides"]],null,null,null,null,null)),(l()(),t.\u0275eld(13,0,null,null,0,"div",[["id","pan"]],null,null,null,null,null)),(l()(),t.\u0275eld(14,0,null,null,0,"div",[["id","handle"]],null,null,null,null,null)),(l()(),t.\u0275eld(15,0,null,null,1,"div",[["id","pancake"]],null,null,null,null,null)),(l()(),t.\u0275eld(16,0,null,null,0,"div",[["id","pastry"]],null,null,null,null,null)),(l()(),t.\u0275eld(17,0,null,null,58,"header",[["style","background: #171a29; position: absolute; left: 0; right: 0; z-index: 2; top: 0;"]],null,null,null,null,null)),(l()(),t.\u0275eld(18,0,null,null,25,"div",[["class","top"],["style","background: #171a29; right: 0;"]],null,null,null,null,null)),(l()(),t.\u0275eld(19,0,null,null,24,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(20,0,null,null,23,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.\u0275eld(21,0,null,null,22,"div",[["class","col-sm-12 col-xs-12"]],null,null,null,null,null)),(l()(),t.\u0275eld(22,0,null,null,0,"ul",[["class","list-inline float-left icon"]],null,null,null,null,null)),(l()(),t.\u0275eld(23,0,null,null,20,"ul",[["class","list-inline float-right icon"]],null,null,null,null,null)),(l()(),t.\u0275eld(24,0,null,null,5,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(25,0,null,null,4,"a",[["href","cart"]],null,null,null,null,null)),(l()(),t.\u0275eld(26,0,null,null,2,"i",[["class","icofont icofont-cart-alt"],["style","font-size: larger"]],null,null,null,null,null)),(l()(),t.\u0275eld(27,0,null,null,1,"span",[["class","badge badge-info"]],null,null,null,null,null)),(l()(),t.\u0275ted(28,null,["",""])),(l()(),t.\u0275ted(-1,null,[" Cart "])),(l()(),t.\u0275and(16777216,null,null,1,null,g)),t.\u0275did(31,16384,null,0,o.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),t.\u0275and(0,[["login",2]],null,0,null,f)),(l()(),t.\u0275eld(33,0,null,null,10,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(34,0,null,null,9,"ul",[["class","list-inline social"]],null,null,null,null,null)),(l()(),t.\u0275eld(35,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(36,0,null,null,1,"a",[["href","https://www.facebook.com/spheretheme/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(37,0,null,null,0,"i",[["class","icofont icofont-social-facebook"]],null,null,null,null,null)),(l()(),t.\u0275eld(38,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(39,0,null,null,1,"a",[["href","https://twitter.com/spheretheme/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(40,0,null,null,0,"i",[["class","icofont icofont-social-twitter"]],null,null,null,null,null)),(l()(),t.\u0275eld(41,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(42,0,null,null,1,"a",[["href","https://www.instagram.com/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(43,0,null,null,0,"i",[["class","icofont icofont-social-instagram"]],null,null,null,null,null)),(l()(),t.\u0275eld(44,0,null,null,31,"div",[["class","container"],["style","background: #171a29; right: 0;"]],null,null,null,null,null)),(l()(),t.\u0275eld(45,0,null,null,30,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.\u0275eld(46,0,null,null,3,"div",[["class","col-md-3 col-sm-6 col-xs-12"]],null,null,null,null,null)),(l()(),t.\u0275eld(47,0,null,null,2,"div",[["id","logo"]],null,null,null,null,null)),(l()(),t.\u0275eld(48,0,null,null,1,"a",[["href","home"]],null,null,null,null,null)),(l()(),t.\u0275eld(49,0,null,null,0,"img",[["alt","logo"],["class","img-fluid"],["id","logo_img"],["src","assets/images/logo/logo.png"],["title","logo"]],null,null,null,null,null)),(l()(),t.\u0275eld(50,0,null,null,21,"div",[["class","col-md-7 col-sm-6 col-xs-12 paddleft"]],null,null,null,null,null)),(l()(),t.\u0275eld(51,0,null,null,20,"div",[["id","menu"]],null,null,null,null,null)),(l()(),t.\u0275eld(52,0,null,null,19,"nav",[["class","navbar navbar-expand-md"]],null,null,null,null,null)),(l()(),t.\u0275eld(53,0,null,null,4,"div",[["class","navbar-header"]],null,null,null,null,null)),(l()(),t.\u0275eld(54,0,null,null,1,"span",[["class","menutext d-block d-md-none"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Menu"])),(l()(),t.\u0275eld(56,0,null,null,1,"button",[["class","btn btn-navbar navbar-toggler"],["data-target",".navbar-ex1-collapse"],["data-toggle","collapse"],["type","button"]],null,null,null,null,null)),(l()(),t.\u0275eld(57,0,null,null,0,"i",[["class","icofont icofont-navigation-menu"]],null,null,null,null,null)),(l()(),t.\u0275eld(58,0,null,null,13,"div",[["class","collapse navbar-collapse navbar-ex1-collapse padd0"]],null,null,null,null,null)),(l()(),t.\u0275eld(59,0,null,null,12,"ul",[["class","nav navbar-nav"]],null,null,null,null,null)),(l()(),t.\u0275eld(60,0,null,null,2,"li",[["class","nav-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(61,0,null,null,1,"a",[["href","home"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["HOME"])),(l()(),t.\u0275eld(63,0,null,null,2,"li",[["class","nav-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(64,0,null,null,1,"a",[["href","about"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["about us"])),(l()(),t.\u0275eld(66,0,null,null,2,"li",[["class","nav-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(67,0,null,null,1,"a",[["href","career"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Career"])),(l()(),t.\u0275eld(69,0,null,null,2,"li",[["class","nav-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(70,0,null,null,1,"a",[["href","contact"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["contact us"])),(l()(),t.\u0275eld(72,0,null,null,3,"div",[["class","col-md-2 col-sm-12 col-xs-12 button-top paddleft"],["id","menu"]],null,null,null,null,null)),(l()(),t.\u0275eld(73,0,null,null,2,"nav",[["class","navbar navbar-expand-md"]],null,null,null,null,null)),(l()(),t.\u0275eld(74,0,null,null,1,"div",[["class","collapse navbar-collapse navbar-ex1-collapse padd0"]],null,null,null,null,null)),(l()(),t.\u0275eld(75,0,null,null,0,"ul",[["class","nav navbar-nav"]],null,null,null,null,null)),(l()(),t.\u0275eld(76,0,null,null,10,"div",[["style","position:relative; min-height: 150px; margin-top: 8%; background: #171a29;"]],null,null,null,null,null)),(l()(),t.\u0275eld(77,0,null,null,9,"div",[["style","position:absolute; bottom:20px; left:0; right:0; text-align:center; margin:0 auto; width:244px; background: rgba(0, 0, 0, 0.35); padding:15px 0;"]],null,null,null,null,null)),(l()(),t.\u0275eld(78,0,null,null,1,"h2",[["style","font-family: 'Great Vibes',cursive; color:#fff; font-size:30px; font-weight:400; margin:0; text-transform:capitalize;"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["About Us"])),(l()(),t.\u0275eld(80,0,null,null,6,"ul",[["class","list-inline"]],null,null,null,null,null)),(l()(),t.\u0275eld(81,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(82,0,null,null,1,"a",[["href","home"],["style","color: #FFF;"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["HOME > "])),(l()(),t.\u0275eld(84,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(85,0,null,null,1,"a",[["style","color: #FFF;"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["About Us"])),(l()(),t.\u0275eld(87,0,null,null,20,"div",[["class","about"]],null,null,null,null,null)),(l()(),t.\u0275eld(88,0,null,null,19,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(89,0,null,null,18,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.\u0275eld(90,0,null,null,6,"div",[["class","col-sm-12 commontop text-center"]],null,null,null,null,null)),(l()(),t.\u0275eld(91,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Shidory"])),(l()(),t.\u0275eld(93,0,null,null,3,"div",[["class","divider style-1 center"]],null,null,null,null,null)),(l()(),t.\u0275eld(94,0,null,null,0,"span",[["class","hr-simple left"]],null,null,null,null,null)),(l()(),t.\u0275eld(95,0,null,null,0,"i",[["class","icofont icofont-ui-press hr-icon"]],null,null,null,null,null)),(l()(),t.\u0275eld(96,0,null,null,0,"span",[["class","hr-simple right"]],null,null,null,null,null)),(l()(),t.\u0275eld(97,0,null,null,10,"div",[["class","col-sm-12 col-md-12 col-xs-12 commontop text-left"]],null,null,null,null,null)),(l()(),t.\u0275eld(98,0,null,null,1,"p",[["class","des"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["\u201cEmpowering local economy, while bringing culture and taste together\u201d"])),(l()(),t.\u0275eld(100,0,null,null,1,"p",[["class","des"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["\u201cSharing food and local taste\u201d provides great aspect of social endeavor and making micro economical backbone of a country strong. We are focused on bringing those values in all our modules by developing and providing an opportunity to Local business and local culture to be recognized."])),(l()(),t.\u0275eld(102,0,null,null,1,"p",[["class","des"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Experience the taste of royalty with SHIDORY\u2019s gourmet food from your choice of restaurant in local vicinity that will pamper your taste buds like never before. With authentic Local and continental choice making up the sumptuous of your order, this is one meal you are not likely to forget in a hurry, brought to you by SHIDORY. Our partners from local community have recipes that have been handed down from generations, leaving your satiated. At SHIDORY, fine dining acquires whole new meaning when you are on run or busy somewhere else."])),(l()(),t.\u0275eld(104,0,null,null,1,"p",[["class","des"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Serving up mouthwatering local cuisine builds a special relationship with all our customers who keep coming back for more, both to enjoy local food as well as helping micro economy of their own neighborhood. We have pledged to bring world what they are missing and provide face of local business to the world."])),(l()(),t.\u0275eld(106,0,null,null,1,"p",[["class","des"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["For us at SHIDORY, \u201cEmpowering Local Economy\u201d isn\u2019t just an adage but a way of life."])),(l()(),t.\u0275eld(108,0,null,null,38,"div",[["class","fun-factor"]],null,null,null,null,null)),(l()(),t.\u0275eld(109,0,null,null,37,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(110,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.\u0275eld(111,0,null,null,2,"div",[["class","col-sm-12 commontop text-center"]],null,null,null,null,null)),(l()(),t.\u0275eld(112,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Shidory Today"])),(l()(),t.\u0275eld(114,0,null,null,32,"div",[["class","row "]],null,null,null,null,null)),(l()(),t.\u0275eld(115,0,null,null,7,"div",[["class","col-sm-3 col-6"]],null,null,null,null,null)),(l()(),t.\u0275eld(116,0,null,null,6,"div",[["class","single-box"]],null,null,null,null,null)),(l()(),t.\u0275eld(117,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.\u0275eld(118,0,null,null,0,"i",[["class","icofont icofont-spoon-and-fork"]],null,null,null,null,null)),(l()(),t.\u0275eld(119,0,null,null,1,"h4",[["class","number"],["data-from","100"],["data-refresh-interval","10"],["data-to","300"]],null,null,null,null,null)),(l()(),t.\u0275ted(120,null,["",""])),(l()(),t.\u0275eld(121,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["NUMBER OF RESTAURANT"])),(l()(),t.\u0275eld(123,0,null,null,7,"div",[["class","col-sm-3 col-6"]],null,null,null,null,null)),(l()(),t.\u0275eld(124,0,null,null,6,"div",[["class","single-box"]],null,null,null,null,null)),(l()(),t.\u0275eld(125,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.\u0275eld(126,0,null,null,0,"i",[["class","icofont icofont-waiter-alt"]],null,null,null,null,null)),(l()(),t.\u0275eld(127,0,null,null,1,"h4",[["class","number"],["data-from","100"],["data-refresh-interval","10"],["data-to","600"]],null,null,null,null,null)),(l()(),t.\u0275ted(128,null,["",""])),(l()(),t.\u0275eld(129,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["NUMBER OF VISITORS"])),(l()(),t.\u0275eld(131,0,null,null,7,"div",[["class","col-sm-3 col-6"]],null,null,null,null,null)),(l()(),t.\u0275eld(132,0,null,null,6,"div",[["class","single-box"]],null,null,null,null,null)),(l()(),t.\u0275eld(133,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.\u0275eld(134,0,null,null,0,"i",[["class","icofont icofont-food-cart"]],null,null,null,null,null)),(l()(),t.\u0275eld(135,0,null,null,1,"h4",[["class","number"],["data-from","100"],["data-refresh-interval","10"],["data-to","400"]],null,null,null,null,null)),(l()(),t.\u0275ted(136,null,["",""])),(l()(),t.\u0275eld(137,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["NUMBER OF ORDER"])),(l()(),t.\u0275eld(139,0,null,null,7,"div",[["class","col-sm-3 col-6"]],null,null,null,null,null)),(l()(),t.\u0275eld(140,0,null,null,6,"div",[["class","single-box"]],null,null,null,null,null)),(l()(),t.\u0275eld(141,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.\u0275eld(142,0,null,null,0,"i",[["class","icofont icofont-location-pin"]],null,null,null,null,null)),(l()(),t.\u0275eld(143,0,null,null,1,"h4",[["class","number"],["data-from","10"],["data-refresh-interval","10"],["data-to","100"]],null,null,null,null,null)),(l()(),t.\u0275ted(144,null,["",""])),(l()(),t.\u0275eld(145,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["NUMBER OF CITY SERVING"])),(l()(),t.\u0275eld(147,0,null,null,11,"div",[["class","service"]],null,null,null,null,null)),(l()(),t.\u0275eld(148,0,null,null,10,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(149,0,null,null,9,"div",[["class","row "]],null,null,null,null,null)),(l()(),t.\u0275eld(150,0,null,null,6,"div",[["class","col-sm-12 col-xs-12 commontop text-center"]],null,null,null,null,null)),(l()(),t.\u0275eld(151,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Why Choose Us ?"])),(l()(),t.\u0275eld(153,0,null,null,3,"div",[["class","divider style-1 center"]],null,null,null,null,null)),(l()(),t.\u0275eld(154,0,null,null,0,"span",[["class","hr-simple left"]],null,null,null,null,null)),(l()(),t.\u0275eld(155,0,null,null,0,"i",[["class","icofont icofont-ui-press hr-icon"]],null,null,null,null,null)),(l()(),t.\u0275eld(156,0,null,null,0,"span",[["class","hr-simple right"]],null,null,null,null,null)),(l()(),t.\u0275eld(157,0,null,null,1,"div",[["class","col-sm-12 col-xs-12 video"]],null,null,null,null,null)),(l()(),t.\u0275eld(158,0,null,null,0,"img",[["alt","image"],["class","img-fluid"],["src","assets/images/about/about-bg.jpg"],["title","image"]],null,null,null,null,null)),(l()(),t.\u0275eld(159,0,null,null,13,"div",[["id","newsletter"]],null,null,null,null,null)),(l()(),t.\u0275eld(160,0,null,null,12,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(161,0,null,null,11,"div",[["id","subscribe"]],null,null,null,null,null)),(l()(),t.\u0275eld(162,0,null,null,10,"form",[["class","form-horizontal"],["name","subscribe"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.\u0275nov(l,164).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.\u0275nov(l,164).onReset()&&e),e},null,null)),t.\u0275did(163,16384,null,0,a.\u0275angular_packages_forms_forms_bg,[],null,null),t.\u0275did(164,4210688,null,0,a.NgForm,[[8,null],[8,null]],null,null),t.\u0275prd(2048,null,a.ControlContainer,null,[a.NgForm]),t.\u0275did(166,16384,null,0,a.NgControlStatusGroup,[[4,a.ControlContainer]],null,null),(l()(),t.\u0275eld(167,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.\u0275eld(168,0,null,null,3,"div",[["class","col-sm-6 col-md-7"]],null,null,null,null,null)),(l()(),t.\u0275eld(169,0,null,null,2,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),t.\u0275eld(170,0,null,null,1,"span",[["class","news"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Get your App"])),(l()(),t.\u0275eld(172,0,null,null,0,"div",[["class","col-sm-6 col-md-5 form-group"]],null,null,null,null,null)),(l()(),t.\u0275eld(173,0,null,null,54,"footer",[],null,null,null,null,null)),(l()(),t.\u0275eld(174,0,null,null,36,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(175,0,null,null,35,"div",[["class","row inner"]],null,null,null,null,null)),(l()(),t.\u0275eld(176,0,null,null,18,"div",[["class","col-sm-6 col-md-6 col-lg-3"]],null,null,null,null,null)),(l()(),t.\u0275eld(177,0,null,null,1,"h5",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Contact Us"])),(l()(),t.\u0275eld(179,0,null,null,15,"ul",[["class","list-unstyled"]],null,null,null,null,null)),(l()(),t.\u0275eld(180,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(181,0,null,null,1,"a",[["href","about"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["About Us"])),(l()(),t.\u0275eld(183,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(184,0,null,null,1,"a",[["href","career"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Careers"])),(l()(),t.\u0275eld(186,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(187,0,null,null,1,"a",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["How It Works"])),(l()(),t.\u0275eld(189,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(190,0,null,null,1,"a",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Investors"])),(l()(),t.\u0275eld(192,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(193,0,null,null,1,"a",[],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Term Of Use"])),(l()(),t.\u0275eld(195,0,null,null,14,"div",[["class","col-sm-6 col-md-6 col-lg-3"]],null,null,null,null,null)),(l()(),t.\u0275eld(196,0,null,null,0,"h5",[],null,null,null,null,null)),(l()(),t.\u0275eld(197,0,null,null,12,"ul",[["class","list-unstyled"]],null,null,null,null,null)),(l()(),t.\u0275eld(198,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(199,0,null,null,1,"a",[["href","contact"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Contact us"])),(l()(),t.\u0275eld(201,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(202,0,null,null,1,"a",[["href","#"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Cities"])),(l()(),t.\u0275eld(204,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(205,0,null,null,1,"a",[["href","reservation"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Become a partner"])),(l()(),t.\u0275eld(207,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),t.\u0275eld(208,0,null,null,1,"a",[["href","#"]],null,null,null,null,null)),(l()(),t.\u0275ted(-1,null,["Privacy Policy"])),(l()(),t.\u0275eld(210,0,null,null,0,"div",[["class","w-100 d-none d-xs-block"]],null,null,null,null,null)),(l()(),t.\u0275eld(211,0,null,null,16,"div",[["class","footer-bottom"]],null,null,null,null,null)),(l()(),t.\u0275eld(212,0,null,null,15,"div",[["class","container"]],null,null,null,null,null)),(l()(),t.\u0275eld(213,0,null,null,14,"div",[["class","row powered"]],null,null,null,null,null)),(l()(),t.\u0275eld(214,0,null,null,1,"div",[["class","col-md-3 col-sm-6 order-md-1"]],null,null,null,null,null)),(l()(),t.\u0275eld(215,0,null,null,0,"img",[["alt","logo"],["class","img-fluid"],["src","assets/images/logo/logo-white.png"],["title","logo"]],null,null,null,null,null)),(l()(),t.\u0275eld(216,0,null,null,10,"div",[["class","col-md-3 col-sm-6 text-right order-md-3"]],null,null,null,null,null)),(l()(),t.\u0275eld(217,0,null,null,9,"ul",[["class","list-inline social"]],null,null,null,null,null)),(l()(),t.\u0275eld(218,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(219,0,null,null,1,"a",[["href","https://www.facebook.com/spheretheme/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(220,0,null,null,0,"i",[["class","icofont icofont-social-facebook"]],null,null,null,null,null)),(l()(),t.\u0275eld(221,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(222,0,null,null,1,"a",[["href","https://twitter.com/spheretheme/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(223,0,null,null,0,"i",[["class","icofont icofont-social-twitter"]],null,null,null,null,null)),(l()(),t.\u0275eld(224,0,null,null,2,"li",[["class","list-inline-item"]],null,null,null,null,null)),(l()(),t.\u0275eld(225,0,null,null,1,"a",[["href","https://www.instagram.com/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.\u0275eld(226,0,null,null,0,"i",[["class","icofont icofont-social-instagram"]],null,null,null,null,null)),(l()(),t.\u0275eld(227,0,null,null,0,"div",[["class","col-md-6 col-sm-12 text-center order-md-2"]],null,null,null,null,null))],function(l,n){l(n,31,0,"true"==n.component.loginDone,t.\u0275nov(n,32))},function(l,n){var u=n.component;l(n,28,0,u.cartLength),l(n,120,0,u.numberOfRestaurant),l(n,128,0,u.numberOfVisitors),l(n,136,0,u.numberOfTotalOrders),l(n,144,0,u.numberOfCity),l(n,162,0,t.\u0275nov(n,166).ngClassUntouched,t.\u0275nov(n,166).ngClassTouched,t.\u0275nov(n,166).ngClassPristine,t.\u0275nov(n,166).ngClassDirty,t.\u0275nov(n,166).ngClassValid,t.\u0275nov(n,166).ngClassInvalid,t.\u0275nov(n,166).ngClassPending)})}function v(l){return t.\u0275vid(0,[(l()(),t.\u0275eld(0,0,null,null,1,"app-about",[],null,null,null,h,m)),t.\u0275did(1,114688,null,0,i.AboutComponent,[r.AuthService,d.Router,s.MatDialog,c.AboutProvider,p.MatSnackBar],null,null)],function(l,n){l(n,1,0)},null)}n.RenderType_AboutComponent=m,n.View_AboutComponent_0=h,n.View_AboutComponent_Host_0=v,n.AboutComponentNgFactory=t.\u0275ccf("app-about",i.AboutComponent,v,{},{},[])},"4zsM":function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.AboutModule=function(){}},B5SS:function(l,n,u){"use strict";n.styles=[".badge-info[_ngcontent-%COMP%]{background-color:#17a2b8;border-radius:50%;color:#000}"]},IHe0:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),u("ZYCi"),u("Y9Lo"),n.AboutRoutingModule=function(){}},MJ5X:function(l,n,u){"use strict";var e=u("CcnG"),t=u("4zsM"),o=u("pMnS"),a=u("1oE1"),i=u("t68o"),r=u("zbXB"),d=u("NcP4"),s=u("xYTU"),c=u("yWMr"),p=u("s1Hh"),m=u("Ip0R"),g=u("gIcY"),f=u("eDkP"),h=u("Fzqc"),v=u("M2Lx"),M=u("uGex"),b=u("Wf4p"),y=u("o3x0"),O=u("jQLj"),_=u("dWZg"),C=u("v9Dh"),T=u("4epT"),S=u("4tE/"),R=u("wmQ5"),A=u("alUD"),w=u("tNxZ"),L=u("t/Na"),k=u("+BTK"),E=u("ZYCi"),F=u("IHe0"),N=u("4c35"),I=u("qAlS"),D=u("seP3"),P=u("/VYK"),x=u("b716"),Y=u("UodH"),U=u("lLAP"),B=u("FVSy"),G=u("y4qS"),H=u("BHnd"),V=u("SMsm"),z=u("Z+uX"),j=u("LC5p"),W=u("0/Q6"),K=u("r43C"),Z=u("de3e"),q=u("9It4"),J=u("Blfk"),Q=u("vARd"),X=u("BgWK"),$=u("Lwpp"),ll=u("mZSY"),nl=u("pfbp"),ul=u("a+zv"),el=u("Y9Lo"),tl=u("7s9P");n.AboutModuleNgFactory=e.\u0275cmf(t.AboutModule,[],function(l){return e.\u0275mod([e.\u0275mpd(512,e.ComponentFactoryResolver,e.\u0275CodegenComponentFactoryResolver,[[8,[o.\u0275EmptyOutletComponentNgFactory,a.AboutComponentNgFactory,i.MatDialogContainerNgFactory,r.MatDatepickerContentNgFactory,r.MatCalendarHeaderNgFactory,d.TooltipComponentNgFactory,s.MatSnackBarContainerNgFactory,s.SimpleSnackBarNgFactory,c.MatBottomSheetContainerNgFactory,p.LoginComponentNgFactory]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e.\u0275mpd(4608,m.NgLocalization,m.NgLocaleLocalization,[e.LOCALE_ID,[2,m.\u0275angular_packages_common_common_a]]),e.\u0275mpd(4608,g.\u0275angular_packages_forms_forms_i,g.\u0275angular_packages_forms_forms_i,[]),e.\u0275mpd(4608,g.FormBuilder,g.FormBuilder,[]),e.\u0275mpd(4608,f.Overlay,f.Overlay,[f.ScrollStrategyOptions,f.OverlayContainer,e.ComponentFactoryResolver,f.OverlayPositionBuilder,f.OverlayKeyboardDispatcher,e.Injector,e.NgZone,m.DOCUMENT,h.Directionality]),e.\u0275mpd(5120,f.\u0275c,f.\u0275d,[f.Overlay]),e.\u0275mpd(4608,v.MutationObserverFactory,v.MutationObserverFactory,[]),e.\u0275mpd(5120,M.MAT_SELECT_SCROLL_STRATEGY,M.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,[f.Overlay]),e.\u0275mpd(4608,b.ErrorStateMatcher,b.ErrorStateMatcher,[]),e.\u0275mpd(5120,y.MAT_DIALOG_SCROLL_STRATEGY,y.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,[f.Overlay]),e.\u0275mpd(4608,y.MatDialog,y.MatDialog,[f.Overlay,e.Injector,[2,m.Location],[2,y.MAT_DIALOG_DEFAULT_OPTIONS],y.MAT_DIALOG_SCROLL_STRATEGY,[3,y.MatDialog],f.OverlayContainer]),e.\u0275mpd(4608,O.MatDatepickerIntl,O.MatDatepickerIntl,[]),e.\u0275mpd(5120,O.MAT_DATEPICKER_SCROLL_STRATEGY,O.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY,[f.Overlay]),e.\u0275mpd(4608,b.DateAdapter,b.NativeDateAdapter,[[2,b.MAT_DATE_LOCALE],_.Platform]),e.\u0275mpd(5120,C.MAT_TOOLTIP_SCROLL_STRATEGY,C.MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,[f.Overlay]),e.\u0275mpd(5120,T.MatPaginatorIntl,T.MAT_PAGINATOR_INTL_PROVIDER_FACTORY,[[3,T.MatPaginatorIntl]]),e.\u0275mpd(5120,S.MAT_AUTOCOMPLETE_SCROLL_STRATEGY,S.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,[f.Overlay]),e.\u0275mpd(4608,R.MatStepperIntl,R.MatStepperIntl,[]),e.\u0275mpd(4608,A.LoginProvider,A.LoginProvider,[w.firestoreService]),e.\u0275mpd(4608,L.HttpClient,L.HttpClient,[L.HttpHandler]),e.\u0275mpd(4608,k.AboutProvider,k.AboutProvider,[w.firestoreService,L.HttpClient]),e.\u0275mpd(1073742336,m.CommonModule,m.CommonModule,[]),e.\u0275mpd(1073742336,E.RouterModule,E.RouterModule,[[2,E.\u0275angular_packages_router_router_a],[2,E.Router]]),e.\u0275mpd(1073742336,F.AboutRoutingModule,F.AboutRoutingModule,[]),e.\u0275mpd(1073742336,g.\u0275angular_packages_forms_forms_bb,g.\u0275angular_packages_forms_forms_bb,[]),e.\u0275mpd(1073742336,g.FormsModule,g.FormsModule,[]),e.\u0275mpd(1073742336,g.ReactiveFormsModule,g.ReactiveFormsModule,[]),e.\u0275mpd(1073742336,h.BidiModule,h.BidiModule,[]),e.\u0275mpd(1073742336,N.PortalModule,N.PortalModule,[]),e.\u0275mpd(1073742336,_.PlatformModule,_.PlatformModule,[]),e.\u0275mpd(1073742336,I.ScrollDispatchModule,I.ScrollDispatchModule,[]),e.\u0275mpd(1073742336,f.OverlayModule,f.OverlayModule,[]),e.\u0275mpd(1073742336,b.MatCommonModule,b.MatCommonModule,[[2,b.MATERIAL_SANITY_CHECKS]]),e.\u0275mpd(1073742336,b.MatRippleModule,b.MatRippleModule,[]),e.\u0275mpd(1073742336,b.MatPseudoCheckboxModule,b.MatPseudoCheckboxModule,[]),e.\u0275mpd(1073742336,b.MatOptionModule,b.MatOptionModule,[]),e.\u0275mpd(1073742336,v.ObserversModule,v.ObserversModule,[]),e.\u0275mpd(1073742336,D.MatFormFieldModule,D.MatFormFieldModule,[]),e.\u0275mpd(1073742336,M.MatSelectModule,M.MatSelectModule,[]),e.\u0275mpd(1073742336,P.TextFieldModule,P.TextFieldModule,[]),e.\u0275mpd(1073742336,x.MatInputModule,x.MatInputModule,[]),e.\u0275mpd(1073742336,Y.MatButtonModule,Y.MatButtonModule,[]),e.\u0275mpd(1073742336,y.MatDialogModule,y.MatDialogModule,[]),e.\u0275mpd(1073742336,U.A11yModule,U.A11yModule,[]),e.\u0275mpd(1073742336,O.MatDatepickerModule,O.MatDatepickerModule,[]),e.\u0275mpd(1073742336,b.NativeDateModule,b.NativeDateModule,[]),e.\u0275mpd(1073742336,b.MatNativeDateModule,b.MatNativeDateModule,[]),e.\u0275mpd(1073742336,B.MatCardModule,B.MatCardModule,[]),e.\u0275mpd(1073742336,G.CdkTableModule,G.CdkTableModule,[]),e.\u0275mpd(1073742336,H.MatTableModule,H.MatTableModule,[]),e.\u0275mpd(1073742336,V.MatIconModule,V.MatIconModule,[]),e.\u0275mpd(1073742336,C.MatTooltipModule,C.MatTooltipModule,[]),e.\u0275mpd(1073742336,T.MatPaginatorModule,T.MatPaginatorModule,[]),e.\u0275mpd(1073742336,z.MatProgressBarModule,z.MatProgressBarModule,[]),e.\u0275mpd(1073742336,b.MatLineModule,b.MatLineModule,[]),e.\u0275mpd(1073742336,j.MatDividerModule,j.MatDividerModule,[]),e.\u0275mpd(1073742336,W.MatListModule,W.MatListModule,[]),e.\u0275mpd(1073742336,K.MatGridListModule,K.MatGridListModule,[]),e.\u0275mpd(1073742336,Z.MatCheckboxModule,Z.MatCheckboxModule,[]),e.\u0275mpd(1073742336,q.MatRadioModule,q.MatRadioModule,[]),e.\u0275mpd(1073742336,J.MatProgressSpinnerModule,J.MatProgressSpinnerModule,[]),e.\u0275mpd(1073742336,S.MatAutocompleteModule,S.MatAutocompleteModule,[]),e.\u0275mpd(1073742336,Q.MatSnackBarModule,Q.MatSnackBarModule,[]),e.\u0275mpd(1073742336,X.MatBottomSheetModule,X.MatBottomSheetModule,[]),e.\u0275mpd(1073742336,$.CdkStepperModule,$.CdkStepperModule,[]),e.\u0275mpd(1073742336,R.MatStepperModule,R.MatStepperModule,[]),e.\u0275mpd(1073742336,ll.AngularMaterialModule,ll.AngularMaterialModule,[]),e.\u0275mpd(1073742336,nl.LoginRoutingModule,nl.LoginRoutingModule,[]),e.\u0275mpd(1073742336,ul.LoginModule,ul.LoginModule,[]),e.\u0275mpd(1073742336,t.AboutModule,t.AboutModule,[]),e.\u0275mpd(1024,E.ROUTES,function(){return[[{path:"",component:el.AboutComponent}],[{path:"",component:tl.LoginComponent}]]},[]),e.\u0275mpd(256,b.MAT_DATE_FORMATS,b.MAT_NATIVE_DATE_FORMATS,[])])})},Y9Lo:function(l,n,u){"use strict";var e=this&&this.__awaiter||function(l,n,u,e){return new(u||(u=Promise))(function(t,o){function a(l){try{r(e.next(l))}catch(l){o(l)}}function i(l){try{r(e.throw(l))}catch(l){o(l)}}function r(l){l.done?t(l.value):new u(function(n){n(l.value)}).then(a,i)}r((e=e.apply(l,n||[])).next())})},t=this&&this.__generator||function(l,n){var u,e,t,o,a={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(u)throw new TypeError("Generator is already executing.");for(;a;)try{if(u=1,e&&(t=e[2&o[0]?"return":o[0]?"throw":"next"])&&!(t=t.call(e,o[1])).done)return t;switch(e=0,t&&(o=[0,t.value]),o[0]){case 0:case 1:t=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,e=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(t=(t=a.trys).length>0&&t[t.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!t||o[1]>t[0]&&o[1]<t[3])){a.label=o[1];break}if(6===o[0]&&a.label<t[1]){a.label=t[1],t=o;break}if(t&&a.label<t[2]){a.label=t[2],a.ops.push(o);break}t[2]&&a.ops.pop(),a.trys.pop();continue}o=n.call(l,a)}catch(l){o=[6,l],e=0}finally{u=t=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};Object.defineProperty(n,"__esModule",{value:!0}),u("CcnG"),u("zWaH"),u("ZYCi");var o=u("7s9P");u("f7VI"),u("+BTK"),n.AboutComponent=function(){function l(l,n,u,e,t){this.auth=l,this.router=n,this.dialog=u,this.provider=e,this.snackBar=t,this.numberOfTotalOrders=0,this.numberOfVisitors=0,this.numberOfCity=0,this.numberOfRestaurant=0}return l.prototype.ngOnInit=function(){this.cartLength=localStorage.getItem("cartLength"),this.getLoginUserData(),this.getUserPosition()},l.prototype.getLoginUserData=function(){this.loginDone=localStorage.getItem("isLoggedin"),null!=this.loginDone&&(this.loginUserName=this.auth.getSession().displayName,this.loginUserImage=this.auth.getSession().photoURL,this.loginUserEmail=this.auth.getSession().email)},l.prototype.logOut=function(){localStorage.removeItem("isLoggedin"),localStorage.clear(),localStorage.clear(),this.router.navigate(["/home"])},l.prototype.openLoginDialog=function(){var l=this;this.component=o.LoginComponent,this.dialog.open(this.component,{height:"400px",width:"480px",disableClose:!0,hasBackdrop:!0,margin:"0 auto"}).afterClosed().subscribe(function(n){l.router.navigate(["/home"])})},l.prototype.getUserPosition=function(){var l=this;this.provider.getPosition().then(function(n){l.provider.getFormatedAddress(n.lat,n.lng).then(function(n){n.results[0].address_components.forEach(function(n){return e(l,void 0,void 0,function(){return t(this,function(l){switch(l.label){case 0:return"country"===n.types[0]&&(this.countryName=n.long_name.trim().toUpperCase()),"administrative_area_level_1"===n.types[0]&&(this.stateName=n.long_name.trim().toUpperCase()),"locality"!==n.types[0]&&"administrative_area_level_2"!==n.types[0]||(this.cityName=n.long_name.trim().toUpperCase()),[4,this.getCountryReport()];case 1:return l.sent(),[4,this.getNumberOfVisitors()];case 2:return l.sent(),[4,this.getNumberOfOrder()];case 3:return l.sent(),[2]}})})})}).catch(function(n){l.openSnackBarAddress("Please check your internet setting","")})}).catch(function(n){l.openSnackBarAddress("Please check your internet setting","")})},l.prototype.openSnackBarAddress=function(l,n){this.snackBar.open(l,n,{duration:5e3})},l.prototype.getCountryReport=function(){var l=this;this.provider.getCountryReport(this.countryName).subscribe(function(n){l.numberOfRestaurant=n[0].RESTRO_COUNT,l.numberOfCity=n[0].CITY_COUNT})},l.prototype.getNumberOfOrder=function(){var l=this;this.provider.getNumberOfOrder(this.countryName).subscribe(function(n){n.forEach(function(n){l.numberOfTotalOrders+=n.ACCEPTED_ORDERS})})},l.prototype.getNumberOfVisitors=function(){var l=this;this.provider.getNumberOfVisitors().subscribe(function(n){l.numberOfVisitors=n.length})},l}()}}]);