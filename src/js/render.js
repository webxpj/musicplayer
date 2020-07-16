;(function(root){
    function renderImg(src){
        root.blurImg(src);
        var songImg = document.querySelector('.songImg img');
        songImg.src = src;
    }
    function renderInfo(data){
        var songInfo = document.querySelector('.songInfo');
        songInfo.children[0].innerHTML = data.name;
        songInfo.children[1].innerHTML = data.singer;
        songInfo.children[2].innerHTML = data.album;
    }
    function renderIsLike(isLike){
        var songControlBtn = document.querySelectorAll('.songControl ul li')[0];
        songControlBtn.className = isLike ? 'liking' : '';
    }  
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.player || (window.player = {}))