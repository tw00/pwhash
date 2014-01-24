function basE91(){
    var self = this
    self.eTab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'
    self.dTab = new Array()
    self.e_bp
    self.e_nm
    self.e_str
    self.d_bp
    self.d_nm
    self.d_v
    self.d_str
    
    self.Make = function(){
    this.eReset()
    this.dReset()
    var i = 256
    while(i--) this.dTab[i] = -1
    i = 91
    while(i--) this.dTab[this.eTab.charCodeAt(i)] = i
    return this
    }
    self.eReset = function(){
    this.e_bp = 0
    this.e_nm = 0
    this.e_str = ''
    }
    self.dReset = function(){
    this.d_bp = 0
    this.d_nm = 0
    this.d_str = ''
    this.d_v = -1
    }
    self.Encode = function(string){
    var i, ev, x = 0
    while(!isNaN(i = string.charCodeAt(x++))){
        var addStrs = new Array
        while(parseInt(i/256)){
        addStrs.unshift(i%256)
        i = parseInt(i/256)
        }
        addStrs.unshift(i)
        var Z
        for(Z in addStrs){
        this.e_bp |= (addStrs[Z] & 255) << this.e_nm
        if((this.e_nm += 8) > 13){
            if((ev = this.e_bp & 8191) > 88){
            this.e_bp >>= 13
            this.e_nm -=  13
            }else{
            ev = this.eb_p & 16383
            this.e_bp >>= 14
            this.e_nm -=  14
            }
            this.e_str += ''+this.eTab.charAt(ev%91)
            this.e_str += ''+this.eTab.charAt(ev/91)
        }
        }
    }
    
    return this
    }
    self.endEnc = function(){
    var retStr
    if(this.e_nm > 0){
        this.e_str += ''+this.eTab.charAt(this.e_bp%91)
        if(this.e_nm > 7 || this.e_bp > 90)
        this.e_str += ''+this.eTab.charAt(this.e_bp/91)
    }
    
    retStr = this.e_str
    this.eReset()
    return retStr
    }
    
    self.Decode = function(string){
    var i, x = 0
    while(!isNaN(i = string.charCodeAt(x++))){
        if(i > 255 || this.dTab[i] == -1)
        continue
        if(this.d_v == -1)
        this.d_v =  this.dTab[i]
        else{
        this.d_v  += this.dTab[i] * 91
        this.d_bp |= (this.d_v << this.d_nm)
        this.d_nm += (this.d_v & 8191)>88?13:14
        do{
            this.d_str  +=  ''+String.fromCharCode(this.d_bp & 255)
            this.d_bp >>= 8
            this.d_nm -=  8
        }while(this.d_nm > 7)
        this.d_v = -1
        }
    }
    
    return this
    }
    
    self.endDec = function(){
    var retStr
    if(this.d_v != -1)
        this.d_str += ''+String.fromCharCode((this.d_bp | this.d_v << this.d_nm) & 255)
    retStr = this.d_str
    this.dReset()
    return retStr
    }
    
}
    
var tb91 = new basE91();
tb91.Make();
tb91.Encode("Hello World!");
var estr = tb91.endEnc();
console.log(estr);
tb91.Decode(estr);
var dstr = tb91.endDec();
console.log(dstr);
