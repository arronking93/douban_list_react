# 说明：
1. 黑马的豆瓣小项目，主要技术有react、antd等，对原视频内容做了部分改进和发挥；
2. 在网上找到了可用的豆瓣api接口，防止被禁，请节约使用，getAndSet(Detail)Data函数为获取实际数据，getAndSet(Detail)Data1函数为获取模拟数据，未免频繁调用实际接口被封，调试时可使用后者，将"1"去掉，给前者注释掉即可;
3. 有些图片不能加载，是豆瓣服务器的原因，点击具体图片缓存到本地后，再次刷新页面可以正常加载（原视频的解决办法不起作用，欢迎大佬分析原因）

## I.起步
1. 使用antd来布局
2. 路由切换组件页
* 刷新页面选中路由：用window.location.hash得到当前路由参数，整理后作为选中字符串，各个Link的key也设置一致的字符串
3. movie组件页布局
4. movie组件页内部切换
* 注意HashRouter只要根组件一个即可
* 内部切换的内容结构一致，用同一个组件即可，区别是传入参数的不同去渲染不同的数据

## II.获取数据
1. 在Vue中用的是vue-resource；在React中，用的是fetch API来获取数据，它同样是基于ES6的Promise封装的
```js
// 第一个then用于传参(回调函数)
fetch(url).then(response => {
  // 返回一个新的propmise，下一次拿到数据
  return response.json();
}).then(data => {
  console.log(data);
});
```

> Promise规范：就是一个异步的代码规范；
* 更好的帮我们解决回调地狱问题
* 能帮我们很好的实现代码的复用

2. 在 componentWillMount 事件中请求(相当于Vue的created)，尽早发出异步请求

3. isLoading 标识实现“正在加载中...”和“列表页”的切换，注意状态改变后，会自动触发render

4. 使用第三方包解决跨域问题 fetch-jsonp 
`npm install fetch-jsonp -S`
`import fetchJSONP from 'fetch-jsonp'`
* Make JSONP request like window.fetch. => fetch的扩展

## III.渲染数据
1. 必要时将重复模版抽出为组件，循环时注意key的设置，若需要url参数，可通过window.location.hash获得

2. 图片加载不出来(豆瓣屏蔽)，用下列方法未果：
`this.props.images.small.replace('img3', 'img1')`
* 给图片动画，transform + transition即可(cursor非必须)
```scss
cursor: pointer;
transition: all 0.3s ease;
...
&:hover {
  opacity: 0.9;
  transform: rotate(1deg) scale(1.03);
}
```

3. 利用antd UI制作评分星星图标
* 向下取整再除以2，可以设置为半星图标

4. 对电影容器组件的子组件movieShow组件，动态设置网页内容，传递参数type得以实现
* 模拟数据转换为实际数据时需要注意：传参数进来后重置state部分项目，此时未得到新数据，movies不需要更新；setState是异步操作，用回调函数的方式去获取数据，得到数据后再次setState如isLoading、movies、total等属性(page、type已经由之前传参时确定)
* 新方法：即请求数据，直接传参，不修改state，等数据回来，统一修改state(但第一次要设置isLoading为ture，这样会和后面请求数据同样是异步调用，前者会先触发)，上面操作在componentWillReceiveProps中进行，和componentWillMount中的处理类似，予以封装为函数

## IV.其他
7. 实现分页的功能
```jsx
// 这种借用BOM的方式不合规范，应该使用history属性
window.location.href = `/#/movie/${this.state.currentType}/${count}`;

// 注意这种方法不需要前面的`/#`(react-router-dom的方法)
this.props.history.push(`/movie/${this.state.currentType}/${count}`);
```
* https://api.douban.com/v2/movie/in_theaters?start=0&count=20&apikey=0df993c66c0c636e29ecbb5344252a4a 测试用

8. willComponentReceiveProps的触发条件之一是路由监听到url的改变，而路由匹配将至关重要；处理多个路由同时匹配，精确匹配无效时，可采用Switch：
```html
<Switch>
  <Route path='/movie/detail/:id' component={MovieItemDetail}></Route>
  <Route path='/movie/:type/:page' component={MovieShow} exact></Route>
</Switch>
```
* 该法匹配到即结束，不同于exact要全部遍历

9. this.props.history除了push，还有go等，实现返回导航
```jsx
goBack = () => {
  this.props.history.go(-1);
};
```

10. 模仿movie列表页对详情页进行填充、设计样式

## 使用Node服务器转接豆瓣API
`?apikey=0df993c66c0c636e29ecbb5344252a4a`
* [正在热映 - in_theaters](https://api.douban.com/v2/movie/in_theaters)
* [即将上映 - coming_soon](https://api.douban.com/v2/movie/coming_soon)
* [top250](https://api.douban.com/v2/movie/top250)
* [电影详细信息 - subject](https://api.douban.com/v2/movie/subject/26309788)

## 相关文章
+ [跨域资源共享 CORS 详解 - 阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

+ [Request - Simplified HTTP client](https://github.com/request/request)

+ [CSS3 transform 属性](http://www.w3school.com.cn/cssref/pr_transform.asp)

+ [ES6 - Promise规范 - 阮一峰](http://es6.ruanyifeng.com/#docs/promise)

+ [刘龙彬 - 博客园 - Javascript中Promise的简单使用](http://www.cnblogs.com/liulongbinblogs/p/6731288.html)

+ [Javascript 中的神器——Promise](http://www.jianshu.com/p/063f7e490e9a)

+ [MDN - Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

+ [MDN - Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

+ [fetch-jsonp - 支持JSONP的Fetch实现](https://www.npmjs.com/package/fetch-jsonp)