const ROWS=4;
const NUMBERS =[2,4];
cc.Class({
    extends: cc.Component,

    properties: {
       scoreLable:cc.Label,
       score:0,
       blockPrefab:cc.Prefab,
       gap:20,
       bg:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
       this.drawBgBlocks();
       this.init();
    },
    drawBgBlocks(){
        this.blocksize=(cc.winSize.width-this.gap*(ROWS+1))/ROWS;
        let x = this.blocksize/2+this.gap;
        let y = this.blocksize;
        this.positions=[];
        for(let i=0;i<ROWS;++i){
            this.positions.push([0,0,0,0]);
            for(let j=0;j<ROWS;++j){
                let block = cc.instantiate(this.blockPrefab);
                block.width=this.blocksize;
                block.height=this.blocksize;
                this.bg.addChild(block);
                block.setPosition(cc.Vec2(x,y));
                this.positions[i][j]=cc.Vec2(x,y);
                x+=this.gap+this.blocksize;
                block.getComponent('block').setNumber(0);
            }
            y+=this.gap+this.blocksize;
            x=this.gap+this.blocksize/2;
        }
        console.log(this.positions);
        
    },
    // update (dt) {},
    init(){
        this.updateScore(0);
        if(this.blocks){
            for(let i=0;i<this.blocks.length;++i){
                for(let j=0;j<this.blocks[i].length;++j){
                    if(this.blocks[i][j]!=null){
                        this.blocks[i][j].destroy();
                    }
                }   
            }
        }
        this.data=[];
        this.blocks=[];
        for(let i=0;i<ROWS;++i){
            this.blocks.push([null,null,null,null]);
            this.data.push([0,0,0,0]);
        }
        cc.log(this.blocks);
        cc.log(this.data);
        this.addBlock();
    },
    updateScore(number){
        this.score=number;
        this.scoreLable.string='分数'+ number;

    },
    getemptyLocation(){
        let locations=[];
        for(let i=0;i<this.blocks.length;++i){
            for(let j=0;j<this.blocks[i].length;++j){
                if(this.blocks[i][j]==null){
                    locations.push(i*ROWS+j);
                }
            }
        }
        return locations;
    },
    addBlock(){
        let locations=this.getemptyLocation();
        console.log(Math.random())
        let index=locations[Math.floor(Math.random()*locations.length)];
        let x = Math.floor(index/ROWS);
        let y = Math.floor(index%ROWS);
        let position = this.positions[x][y];
        cc.log(this.positions,x,y,position)
        let block = cc.instantiate(this.blockPrefab);
        block.width=this.blocksize;
        block.height=this.blocksize;
        this.bg.addChild(block);
        block.setPosition(position);
        //cc.log(NUMBERS[Math.floor(Math.random()*(NUMBERS.length))]);
        block.getComponent('block').setNumber(NUMBERS[Math.floor(Math.random()*(NUMBERS.length))]);
    }
});
