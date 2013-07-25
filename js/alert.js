Alert = {

    message                 : 'Alert Box Library',  // default message
    clickOnBodyToHide       : false,                //click anywhere to hide AlertBox
    showBtnSeparatorFooter  : true,                 //show separator between button and message 
    escapeToHide            : false,                //esacepe key hides the AlertBox
    OkBtnText               : "Ok",                 //Text displayed on "Ok" button
    alertBoxPosition        : 'auto',               // alternate settings sample= {top:"200px";left:"400px",bottom:'',right:''}
    showOverlay             : true,                 // show overlay for AlertBox
                                                    
    box                     : 'AlertBox',           //developer settings // dont change unless fully aware of usage 
    overlay                 : 'AlertOverlay',       //developer settings // dont change unless fully aware of usage     
    developerMode           : true,                 //Debug data in console 
    customAlert             : false,                // set to true if message is to be displayed with custom settings 
    
//    __constructor : function(){}(),
/*******************************************************************/
    init   : function(){
        this.initEl();
        this.initEvents();
    },
    
    initEl  : function(){
        this.initBox();
        this.initOverlay();        
    },
    
    initEvents : function(){
        this.initKeys();
        this.initMouse();
    },    
    
    initKeys: function(){
        document.body.onkeydown = function(event){
            event = event || window.event;
            var keycode = event.charCode || event.keyCode;
            // event to handle 'escape' key
            if(keycode === 27 && Alert.escapeToHide)  Alert.hide();
        }         
    },
    
    initMouse : function(){
        this.getOverlay().addEventListener('click', function(){
            if( this.clickOnBodyToHide)
                Alert.__hide()
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
    },
    
    createMsgBoard : function(){
        m = document.createElement('div');
        m.id="AlertMsgBoard";
        this.getEl('AlertBox').appendChild(m);         
    },
    
    createBoxFooter : function(){
        f = document.createElement('div');
        f.id="AlertFooter";
        f.innerHTML = this.getBtnSeparator() + this.getOkBtnHtml();
        this.getEl('AlertBox').appendChild(f);         
    },
    
    getBtnSeparator : function(){
        return this.showBtnSeparatorFooter ?  "<hr>" : ''; 
    },
    
    getOkBtnHtml : function(){
        return "<button class='AlertButton' id='okButton' onClick='Alert.hide()'>"+this.OkBtnText+"</button>";
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
        this.debug(msg)
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
            this.debug("cusotm")
        }
        else{
            this.debug("simple")
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
    
    debug : function(d){
        if(console && this.developerMode)
            console.log(d)
    }
} 
window.onload = Alert.init()