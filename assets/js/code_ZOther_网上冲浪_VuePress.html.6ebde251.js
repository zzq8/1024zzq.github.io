"use strict";(self.webpackChunklearn_data=self.webpackChunklearn_data||[]).push([[9216],{9874:(e,t)=>{t.A=(e,t)=>{const p=e.__vccOpts||e;for(const[e,a]of t)p[e]=a;return p}},6419:(e,t,p)=>{p.r(t),p.d(t,{comp:()=>s,data:()=>n});var a=p(2360);const o=[(0,a.Fv)('<h1 id="vuepress-theme-hope" tabindex="-1"><a class="header-anchor" href="#vuepress-theme-hope"><span>VuePress Theme Hope</span></a></h1><blockquote><p>一个具有强大功能的 vuepress 主题✨</p><p>之前我是用 Docify 做自己的 <mark>笔记 静态网站</mark></p><p>但是 1）没有笔记目录 2）而且 JavaGuide 逛多了 希望搞个一样的</p><p>后续：发现一个<a href="https://newzone.top/web/docsify.html" target="_blank" rel="noopener noreferrer">大佬</a></p></blockquote><h2 id="cdn" tabindex="-1"><a class="header-anchor" href="#cdn"><span>CDN</span></a></h2><p>algolia actions脚本报错：<strong>514 frequency capped</strong></p><p>需要 CDN 配置开启 HTTPS</p><h2 id="gitpage" tabindex="-1"><a class="header-anchor" href="#gitpage"><span>GitPage</span></a></h2><p>设置自己的域名：只需要 DNS 解析给 2 个 CNAME 记录就行（顶级域名）</p><p>二级域名估计只要一个 CNAME 就行</p><p>记录值： zzq8.github.io.</p><p>虽然这个记录值是 404 没关系，DNS 设置到这就行！</p><h2 id="feature" tabindex="-1"><a class="header-anchor" href="#feature"><span>Feature</span></a></h2><ul><li>md 里面可以写 js+vue 语法 会渲染到页面 具体参考demo 【真牛】</li><li>md 加 frontmatter 设置各种参数 icon、title</li></ul><h2 id="search-plug" tabindex="-1"><a class="header-anchor" href="#search-plug"><span>search plug</span></a></h2><blockquote><p>引入algolia并自定义crawler爬虫</p><p>XDDD 终于两天时间，配置这里&quot;lang&quot;解决问题！！！</p></blockquote><p><strong>处理了两天的问题</strong>：已用 actions 爬虫 上传站点信息的 records 到 Algolia 平台，但是 vuepress 集成的这个插件去搜怎么都搜不到，其他测试平台地方一下就可以搜：https://codesandbox.io/p/sandbox/suspicious-nash-xfpsjv?file=%2Fsrc%2Findex.js%3A11%2C1</p><p>后来发现 vuepress 搜的时候会多带一个参数 lang：https://juejin.cn/post/7160948190375018504</p><p>最后的最后解决是处理修改上传的爬虫配置，让 records 带上 lang 信息即可，这一点我搜 GPT 帮我带错了很多次。还是在一个网站多试了别人的才成功：https://hub.nstudy.org/p2024/12/Vuepress/148a1e.html</p><h2 id="sitemap-plug" tabindex="-1"><a class="header-anchor" href="#sitemap-plug"><span>sitemap plug</span></a></h2><blockquote><p>搞了一下午，卡在版本的问题 结果我就在npm一个个试所有的version 直到不报错！！！ <mark>肯定有其他方法</mark></p><p>第二次搞：</p><blockquote><ul><li><p>npm install 没报错</p></li><li><p>测试时候先测 <code>npm run docs:build</code> 后测 <code>npm run docs:dev</code> 两个都没问题就行</p></li></ul></blockquote><ol><li>先所有都整成最新版 <code>npm install --legacy-peer-deps</code></li><li>后再试试 npm install 哪些依赖冲突（npm ci） <ul><li>我这里是 vuepress、vuepress-theme-hope 统一降一个版本就又好了</li></ul></li></ol></blockquote><p>http://localhost:8080/sitemap.xml</p><p>这个插件 npm install 完后不需要配什么东西，可以直接访问试下就拿到数据了！！！</p><h2 id="碰到的问题" tabindex="-1"><a class="header-anchor" href="#碰到的问题"><span>碰到的问题</span></a></h2><blockquote><p>md 笔记该怎么记：因为自己的一篇 md 会有很多 h1</p></blockquote><p>看了 雪峰的 git 仓有一些规范，</p><blockquote><p>构建 md 解析错误</p></blockquote><p><code>{brandId,showStatus}</code></p><p>这种 vuepress 解析会有错误，，最好``包一下</p><p>😭 为什么，上面一开始我没加导致又报错，又犯了一次错误</p><p>​ 1. <strong>Vue 模板语法冲突</strong>：VuePress 使用 Vue 作为底层框架，Vue 模板语法中的大括号 {} 会被识别为 Vue 模板中的插值表达式。如果你的 Markdown 文件中包含 {}，Vue 可能会尝试解析它们，这会导致渲染问题。</p><p>​ 2. <strong>未转义的大括号</strong>：如果你的 Markdown 文件中包含原始的大括号 {}，这些字符可能需要转义，避免被 Vue 模板引擎解析。</p>',30)],r={},s=(0,p(9874).A)(r,[["render",function(e,t){return(0,a.uX)(),(0,a.CE)("div",null,o)}]]),n=JSON.parse('{"path":"/code/ZOther/%E7%BD%91%E4%B8%8A%E5%86%B2%E6%B5%AA/VuePress.html","title":"VuePress Theme Hope","lang":"zh-CN","frontmatter":{"article":false,"description":"VuePress Theme Hope 一个具有强大功能的 vuepress 主题✨ 之前我是用 Docify 做自己的 笔记 静态网站 但是 1）没有笔记目录 2）而且 JavaGuide 逛多了 希望搞个一样的 后续：发现一个大佬 CDN algolia actions脚本报错：514 frequency capped 需要 CDN 配置开启 HT...","head":[["meta",{"property":"og:url","content":"https://doc.zzq8.cn/code/ZOther/%E7%BD%91%E4%B8%8A%E5%86%B2%E6%B5%AA/VuePress.html"}],["meta",{"property":"og:site_name","content":"Piglet"}],["meta",{"property":"og:title","content":"VuePress Theme Hope"}],["meta",{"property":"og:description","content":"VuePress Theme Hope 一个具有强大功能的 vuepress 主题✨ 之前我是用 Docify 做自己的 笔记 静态网站 但是 1）没有笔记目录 2）而且 JavaGuide 逛多了 希望搞个一样的 后续：发现一个大佬 CDN algolia actions脚本报错：514 frequency capped 需要 CDN 配置开启 HT..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-15T08:06:41.000Z"}],["meta",{"property":"article:author","content":"Piglet"}],["meta",{"property":"article:modified_time","content":"2024-06-15T08:06:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"VuePress Theme Hope\\",\\"description\\":\\"VuePress Theme Hope 一个具有强大功能的 vuepress 主题✨ 之前我是用 Docify 做自己的 笔记 静态网站 但是 1）没有笔记目录 2）而且 JavaGuide 逛多了 希望搞个一样的 后续：发现一个大佬 CDN algolia actions脚本报错：514 frequency capped 需要 CDN 配置开启 HT...\\"}"]]},"headers":[{"level":2,"title":"CDN","slug":"cdn","link":"#cdn","children":[]},{"level":2,"title":"GitPage","slug":"gitpage","link":"#gitpage","children":[]},{"level":2,"title":"Feature","slug":"feature","link":"#feature","children":[]},{"level":2,"title":"search plug","slug":"search-plug","link":"#search-plug","children":[]},{"level":2,"title":"sitemap plug","slug":"sitemap-plug","link":"#sitemap-plug","children":[]},{"level":2,"title":"碰到的问题","slug":"碰到的问题","link":"#碰到的问题","children":[]}],"git":{"createdTime":1717209768000,"updatedTime":1718438801000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":3},{"name":"MiniPC","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":2.36,"words":707},"filePathRelative":"code/ZOther/网上冲浪/VuePress.md","localizedDate":"2024年6月1日","excerpt":"\\n<blockquote>\\n<p>一个具有强大功能的 vuepress 主题✨</p>\\n<p>之前我是用 Docify 做自己的 <mark>笔记 静态网站</mark></p>\\n<p>但是 1）没有笔记目录 2）而且 JavaGuide 逛多了 希望搞个一样的</p>\\n<p>后续：发现一个<a href=\\"https://newzone.top/web/docsify.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">大佬</a></p>\\n</blockquote>\\n<h2>CDN</h2>\\n<p>algolia actions脚本报错：<strong>514 frequency capped</strong></p>","autoDesc":true}')}}]);