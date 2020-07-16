;(function($,player){
    function MusicPlayer(dom){
        this.wrap = dom;
        this.dataList = [];
        this.indexObj = null;
        this.rotate = null;
        this.list = null;
        this.curIndex = 0;
    }
    MusicPlayer.prototype = {
        init:function(){
            this.getDom();
            this.getData('../mock/data.json');
        },
        getDom:function(){
            this.record = document.querySelector('.songImg img');
            this.controlBtns = document.querySelectorAll('.songControl ul li')
        },
        getData:function(url){
            var _this = this;
            $.ajax({
                url:url,
                method:'get',
                success:function(data){
                    console.log(data);
                    _this.dataList = data;
                    _this.listControl();
                    _this.indexObj = new player.indexControl(_this.dataList.length);
                    _this.loadMusic(_this.indexObj.index);
                    _this.musicControl()
                },
                error:function(){
                    console.log('fail')
                }
            })
        },
        loadMusic:function(index){
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audioSrc);
            if(player.music.status == 'play'){
                console.log(11)
                player.music.play();
                this.controlBtns[2].className = 'playing';
                this.imgRotate(0);
            }
            this.list.changeSelect(index);
            this.curIndex = index;
        },
        musicControl:function(){
            var _this = this;
            this.controlBtns[1].addEventListener('touchend',function(){
                player.music.status = 'play';
                _this.loadMusic(_this.indexObj.prev())
            })
            this.controlBtns[2].addEventListener('touchend',function(){
                if(player.music.status == 'play'){
                    player.music.pause();
                    this.className = '';
                    _this.imgStop();
                }else{
                    player.music.play();
                    this.className = 'playing';
                    var deg = _this.record.dataset.rotate || 0;
                    _this.imgRotate(deg);
                }
            })
            this.controlBtns[3].addEventListener('touchend',function(){
                player.music.status = 'play';
                _this.loadMusic(_this.indexObj.next())
            })
        },
        imgRotate:function(deg){
            clearInterval(this.rotate)
            var _this = this;
            this.rotate = setInterval(function(){
                deg = +deg + 0.2;
                _this.record.style.transform = "rotate(" + deg + "deg)";
                _this.record.dataset.rotate = deg;
            },16)
        },
        imgStop:function(){
            clearInterval(this.rotate);
        },
        listControl:function(){
            var _this = this;
            this.list = player.listControl(this.dataList,this.wrap);
            this.controlBtns[4].addEventListener('touchend',function(){
                _this.list.slideUp();
            })
            this.list.musicList.forEach(function(item,index){
                item.addEventListener('touchend',function(){
                    if(_this.curIndex == index){
                        return
                    }
                    player.music.status = 'play';
                    _this.indexObj.index = index;
                    _this.loadMusic(_this.indexObj.index);
                    _this.list.slideDown();
                })
            })
        }
    }
    var musicPlayer = new MusicPlayer(document.getElementById('wrap'))
    musicPlayer.init();
})(window.Zepto,window.player)