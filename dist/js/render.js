!function(o){o.render=function(e){var n,r,i,l;n=e.image,o.blurImg(n),document.querySelector(".songImg img").src=n,r=e,(i=document.querySelector(".songInfo")).children[0].innerHTML=r.name,i.children[1].innerHTML=r.singer,i.children[2].innerHTML=r.album,l=e.isLike,document.querySelectorAll(".songControl ul li")[0].className=l?"liking":""}}(window.player||(window.player={}));