Settings =  {
  overRideJsAlert: true
};

AlertBox = {

    message                 : 'AlertBox Library',  // default message
    clickOnBodyToHide       : false,                //click anywhere to hide AlertBox
    showBtnSeparatorFooter  : true,                 //show separator between button and message 
    escapeToHide            : false,                //esacepe key hides the AlertBox
    OkBtnText               : "Ok",                 //Text displayed on "Ok" button
    alertBoxPosition        : 'auto',               // alternate settings sample= {top:"200px";left:"400px",bottom:'',right:''}
    showOverlay             : true,                 // show overlay for AlertBox
                                                    
    box                     : 'AlertBox',           //developer settings // dont change unless fully aware of usage 
    overlay                 : 'AlertOverlay',       //developer settings // dont change unless fully aware of usage     
    developerMode           : false,                 //Debug data in console 
    customAlert             : false,                // set to true if message is to be displayed with custom settings 
    
//    __constructor : function(){}(),
/*******************************************************************/
    init   : function(config){
        if(typeof(config)=="object")
            this.forceSettings(config);
        this.de("Initialzed",true);
        this.initEl();
        this.initEvents();
    },
    
    initEl  : function(){
        this.initBox();
        this.initOverlay();    
        this.de("Initialzed  Elements");
    },
    
    initEvents : function(){
        this.initKeys();
        this.initMouse();
        this.de("Initialzed  Events");
    },    
    
    initKeys: function(){
        document.body.onkeydown = function(event){
            event = event || window.event;
            var keycode = event.charCode || event.keyCode;
            // event to handle 'escape' key
            if(keycode === 27 && AlertBox.escapeToHide)  AlertBox.hide();
        }         
    },
    
    initMouse : function(){
        this.getOverlay().addEventListener('click', function(){
            if( this.clickOnBodyToHide)
                AlertBox.__hide()
        }, false)         
    },
    
    initBox : function(){
        this.createcontainerBox();
        this.createMsgBoard();
        this.createBoxFooter();
            
    },
    
    createcontainerBox : function(){
        // create alert box
        c = document.createElement('div');
        c.id="AlertBox";
        c.style.visibility = 'hidden';
        document.body.appendChild(c);  
        this.de("Container Box created");  
    },
    
    createMsgBoard : function(){
        m = document.createElement('div');
        m.id="AlertMsgBoard";
        this.getEl('AlertBox').appendChild(m); 
        this.de("MsgBoard created");          
    },
    
    createBoxFooter : function(){
        f = document.createElement('div');
        f.id="AlertFooter";
        f.innerHTML = this.getBtnSeparator() + this.getOkBtnHtml();
        this.getEl('AlertBox').appendChild(f); 
        this.de("Footer created");             
    },
    
    getBtnSeparator : function(){
        return this.showBtnSeparatorFooter ?  "<hr>" : ''; 
    },
    
    getOkBtnHtml : function(){
        return "<button class='AlertButton' id='okButton' onClick='AlertBox.hide()'>"+this.OkBtnText+"</button>";
    },
    
    initOverlay : function(){
        // create overlay
        o = document.createElement('div')
        o.id="AlertOverlay"
        o.style.visibility = 'hidden'
        document.body.appendChild(o)        
    },
/**************************************************************************************/
    getStyle : function(el,style){
        el = this.getEl(el);
        
        if(el.currentStyle) {
            style = style.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
            data = el.currentStyle[style];
        } else if (window.getComputedStyle) {
            data = document.defaultView.getComputedStyle(el,null).getPropertyValue(style);
        } else {
            data = 'undefined';
        }
        return data;        
    },
    
    getEl : function(el){
        return typeof(el)=='object' ?  el : document.getElementById(el)
    },
    
    isValidCustomData : function(data){
        m = c =  false;
        for(d in data){
            if(d=="customAlert")    c = true;
            if(d=="message")        m = true;
        }
        return (m&&c)
    },  
    
    __show : function(){// dynamic content not being used currently
        this.setBoxPos();
        
        if(this.showOverlay)
            this.getOverlay().style.visibility='visible'
        this.getBox().style.visibility='visible'  
    },
        
    __hide : function(){
        this.getOverlay().style.visibility='hidden'
        this.getBox().style.visibility='hidden'  
    },    
/**************************************************************************************/
    getPos : function(){
        if(typeof(this.alertBoxPosition)=='object'){
            alert("Insert code for manual positioning")
        }
        return {top:'250px',left:'600px',right:'',bottom:''};
    },
    
    setBoxPos : function(){
        pos =  this.getPos();
        this.getBox().style.top     = pos.top ;
        this.getBox().style.left    = pos.left ;
        this.getBox().style.right   = pos.right ;
        this.getBox().style.bottom  = pos.bottom ;
    },
    
    getBox : function(){
        return this.getEl(this.box)
    },
    
    getOverlay : function(){
        return this.getEl(this.overlay)
    },

    setMsg : function(msg){
        this.de(msg)
        this.message = typeof(msg)=='object' ? JSON.stringify(msg) :  msg;
        this.updateMsgBoard();
    },
    
    updateMsgBoard : function(){
        this.getEl('AlertMsgBoard').innerHTML = this.getMsg();
    },
    
    getMsg: function(){
        return this.message ;
    },
/****************************************************************/
    hide : function(){
        this.__hide();
    },

    show : function(msg){
        if(typeof(msg)=="object" && this.isValidCustomData(msg)){
            this.processCustom(msg)
            this.de("cusotm")
        }
        else{
            this.de("simple")
            this.processSimple(msg)
        }
    },
    
    processSimple : function(msg){
        this.setMsg(msg);
        this.__show()
    },

    processCustom : function(data){
        msg = data.message;
        this.setMsg(msg);
        this.__show()
    },
    
    de : function(d,bool){
        if(console && this.developerMode)
            console.log(d)
        if(bool && this.developerMode)
            alert(d)
    },
    
    forceSettings : function(config){
        for(c in config)
            this[c] = config[c]
    }
    
} 

window.onload = function(){

//    AlertBox.init({OkBtnText:"Accept"}); // example when config is passed 
    AlertBox.init(); // example when config is absent
    Alert = function(msg,config){
        AlertBox.show(msg);
        if(typeof(config)=="object"){
            alert("set settings")
        }
    }
    if(Settings.overRideJsAlert) alert =  Alert;
}