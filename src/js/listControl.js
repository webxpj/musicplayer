(function(root){
    function listControl(data,dom){
        var list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
            musicList = [];
        dt.innerHTML = '播放列表';
        dl.appendChild(dt);
        data.forEach(function(item,index){
            var dd = document.createElement('dd');
            dd.innerHTML = item.name;
            dd.addEventListener('touchend',function(){
                changSelect(index);
            })
            dl.appendChild(dd);
            musicList.push(dd);
        })
        list.appendChild(dl);
        close.innerHTML = '关闭';
        close.className = 'close';
        list.appendChild(close);
        list.className = 'songList';
        dom.appendChild(list);
        changeSelect(0);
        var disY = list.offsetHeight;
        list.style.transform = 'translateY(' + disY + 'px)';
        function slideUp(){
            list.style.transition = '0.2s';
            list.style.transform = 'translateY(0)';
        }
        function slideDown(){
            list.style.transition = '0.2s';
            list.style.transform = 'translateY(' + disY + 'px)';
        }
        function  changeSelect(index) {
            for(var i = 0; i < musicList.length; i++){
                musicList[i].className = '';
            }
            musicList[index].className = 'active'
        }
        close.addEventListener('touchend',slideDown)
        return {
            dom:list,
            musicList:musicList,
            slideUp:slideUp,
            slideDown:slideDown,
            changeSelect:changeSelect
        }
    }
    root.listControl = listControl;
})(window.player || (window.player = {}))