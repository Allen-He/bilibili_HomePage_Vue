# bilibili_HomePage_Vue

效果预览：https://allen-he.github.io/bilibili_HomePage_Vue/index.html

项目重难点：
1. svg格式图片的应用；用定位可以把“由元素内容撑开”的盒子的宽高撑开到100%
2. 在生命周期钩子created中通过axios请求导航栏所需数据到data中（根据状态码的值决定是否进行下一步处理）--- axios的并发、配置axios默认值、axios拦截器、结果处理函数的封装(“单一职责”原则)
3. 导航条的关键样式
```css
.navList {
    white-space: nowrap;
    overflow-x: scroll;
}
.navList li{
    display: inline-block;
}
.navList::-webkit-scrollbar { /* 隐藏滚动条 */
    display: none;
}
```
4. 在生命周期钩子mounted中调用相关方法第一时间操作DOM元素实现轮播图（监听transitionend事件）--- 获取数据时，在请求到的数据banner数组最后再添加一个克隆后的第0项，且注意修改其id值以避免报错
5. 多行溢出打点展示(关键样式)
```css 
.videoList li .title {
    height: 10vw;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
```
6. bannerList最开始为空，此时通过它的长度渲染小圆点会报错，则应该给小圆点的父级设置`v-if="bannerList.length"`指令，即当bannerList为空时不渲染展示
7. 通过以下逻辑判断是否继续请求下一组video数据(①给“是否继续请求下一组数据”加上一个锁，以避免频繁请求；②判断当前请求过来的数据总长度是否等于后端数据池的总长度，若不小于，则停止请求数据)
```js
scrollHandle(e) {
    console.log(this.videoList.length);
    const {scrollHeight, offsetHeight, scrollTop} = this.$el;
    // console.log(scrollHeight, offsetHeight, scrollTop);
    const disToBottom = scrollHeight - offsetHeight - scrollTop;
    if(disToBottom < 200 && this.continueGetVideo && this.videoList.length < this.videoCount) {
    this.continueGetVideo = false;
    axios.get('/video', {
        params: {
        start: this.videoList.length,
        offset: 12,
        }
    }).then(res => {
        this.videoCount = res.count; 
        this.videoList.push(...res.data);

        this.continueGetVideo = true;
    });
    }
}
```
