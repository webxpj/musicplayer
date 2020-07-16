(function(root){
    function indexControl(len){
        this.index = 0;
        this.length = len;
    }
    indexControl.prototype = {
        next:function(){
            return this.get(1);
        },
        prev:function(){
            return this.get(-1);
        },
        get:function(val){
            this.index = (this.index + val + this.length) % this.length;
            return this.index;
        }
    }
    root.indexControl = indexControl;
})(window.player || (window.player = {}))