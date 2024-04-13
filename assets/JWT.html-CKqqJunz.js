import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as s,e as t}from"./app-Z85VJPgp.js";const o={},a=t(`<h1 id="jwt" tabindex="-1"><a class="header-anchor" href="#jwt"><span>JWT</span></a></h1><blockquote><p>Token 续期问题面试杭州问过 长沙那个也问过！！！ 个人认为是频繁点</p></blockquote><h1 id="_0-项目实现" tabindex="-1"><a class="header-anchor" href="#_0-项目实现"><span>0.项目实现</span></a></h1><h2 id="_1-ruoyi" tabindex="-1"><a class="header-anchor" href="#_1-ruoyi"><span>1.RuoYi</span></a></h2><p>感觉跟直接用最简单方式 UUID 存 Redis 一样的做法！！！</p><p>我感觉这里 JWT 都有点多余，顶多是看上去更安全？？？？（我感觉是单体项目其实完全可 Session 解决，这里用 Token 避免分布式共享?其实UUID也行？）</p><p>感觉RuoYi是只用Redis ttl实现的， Token的作用像是只充当了个UUID和Redis关联</p><blockquote><p>个人总结：</p><ul><li>axios配置请求、响应拦截器</li><li>前端 Session 存JWT解析数据为 UUID， 后端 Redis 对应这个 UUID 有 User 数据</li><li>靠 Redis 驱动，Redis 一过期就返回 401，前端响应拦截器就删 Session 重定向到 login.html</li></ul><h4 id="前端存-session-不过期" tabindex="-1"><a class="header-anchor" href="#前端存-session-不过期"><span># 前端存 Session 不过期</span></a></h4><p>解密后的数据只有 <strong>HEADER</strong> &quot;alg&quot;: &quot;HS512&quot; &amp; <strong>PAYLOAD</strong> &quot;login_user_key&quot;: &quot;a667e3f6-5af2-4799-83d6-5c871507df08&quot;</p><h4 id="后端存-redis-通过login-user-key对应-存用户信息-loginuser-class" tabindex="-1"><a class="header-anchor" href="#后端存-redis-通过login-user-key对应-存用户信息-loginuser-class"><span># 后端存 Redis 通过login_user_key对应，存用户信息 LoginUser.class</span></a></h4><p>后端如果redis过期，则返回状态 401</p><p>核心方法：<code>com.ruoyi.framework.web.service.TokenService#getLoginUser</code></p><p><code>com.ruoyi.framework.web.service.TokenService#verifyToken</code> 验证令牌有效期，相差不足20分钟，自动刷新Redis缓存</p></blockquote><p>借助了 Redis</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">refreshToken</span><span class="token punctuation">(</span><span class="token class-name">LoginUser</span> loginUser<span class="token punctuation">)</span><span class="token punctuation">{</span>
    loginUser<span class="token punctuation">.</span><span class="token function">setLoginTime</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    loginUser<span class="token punctuation">.</span><span class="token function">setExpireTime</span><span class="token punctuation">(</span>loginUser<span class="token punctuation">.</span><span class="token function">getLoginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> expireTime <span class="token operator">*</span> <span class="token constant">MILLIS_MINUTE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 根据uuid将loginUser缓存</span>
    <span class="token class-name">String</span> userKey <span class="token operator">=</span> <span class="token function">getTokenKey</span><span class="token punctuation">(</span>loginUser<span class="token punctuation">.</span><span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    redisCache<span class="token punctuation">.</span><span class="token function">setCacheObject</span><span class="token punctuation">(</span>userKey<span class="token punctuation">,</span> loginUser<span class="token punctuation">,</span> expireTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="后端设置-token" tabindex="-1"><a class="header-anchor" href="#后端设置-token"><span>后端设置 Token</span></a></h4><ol><li>存Redis用户信息</li><li>登录完成最终返回了一个真正的token字符串 <code>return tokenService.createToken(loginUser);</code></li><li>Token 放在前端 session 里</li></ol><table><thead><tr><th>Admin-Token</th><th>eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImI1OWNlOTUyLWQwOTctNGNmOC1hYzYwLTU1MzdlOTBhNDg5ZSJ9.YxyKCvcLmj2EvWXVSjop1b2cCrW-j5PLtVmSMvL1V6H1PZUZCSxpcSInnp3BT1Okt48DJ-b_QAG7--kRjRhuKw</th></tr></thead></table><h4 id="前端有-token-后的请求" tabindex="-1"><a class="header-anchor" href="#前端有-token-后的请求"><span>前端有 Token 后的请求</span></a></h4><ol><li>后端 <code>JwtAuthenticationTokenFilter extends OncePerRequestFilter</code> 解析 Token 拿 UUID （这个时候过期就抛异常）</li><li>通过 UUID 再拿 Redis 存好的 UserInfo</li><li>拿到 UserInfo 代表 Token 未过期，那么 refreshToken <strong>不过这里我看只是setCacheObject，没有更换 Token</strong>？？？（少于20分钟就refresh）</li></ol><p>前端同样也搭配了 request拦截器、响应拦截器（axios）</p><p>看源码更新Token只更了 Redis，真正JWT没换啊？？？</p><h1 id="_1-视频学习" tabindex="-1"><a class="header-anchor" href="#_1-视频学习"><span>1.视频学习</span></a></h1><blockquote><p>https://www.bilibili.com/video/BV1Ke411X7V4/?spm_id_from=333.1007.top_right_bar_window_default_collection.content.click&amp;vd_source=0f3bf62c50d57c4a7d85b89b4d2633e0</p></blockquote><p>买了案例，我觉得前端 js 代码也很值得学习！</p><h2 id="_1-概念" tabindex="-1"><a class="header-anchor" href="#_1-概念"><span>1.概念</span></a></h2><blockquote><p>实际就是一个一次性字符串，会过期 parser 过期了会抛异常-就作废了</p><p><strong>JWT最大特点不就是状态存储在客户端么，可以实现多点登录，服务端不用做很多的额外工作</strong></p><ul><li><p>jwt颁发后，一般扩展包没提供让其失效方法。但是要让jwt失效依然很简单，因为jwt一般会放在redis或者mysql表，只要逻辑上去找到uid对应的jwt，删了就可以了。</p></li><li><p>个人认为jwt解决最大的问题不是跨域，而是前后端分离后，纯接口方面的用户认证问题。</p></li></ul></blockquote><p>jwt--&gt; JSONWeb Token，以JSON为载体，在不同系统（或语言）之间安全的传送信息，常用于认证授权方面。</p><p>三段：头部（Header）。载荷（PlayLoad）。签名（signature） 【它是一个很长的字符串，中间用点（<code>.</code>）分隔成三个部分】</p><h1 id="_2-双-token" tabindex="-1"><a class="header-anchor" href="#_2-双-token"><span>2.双 Token</span></a></h1><blockquote><p>我看我后来学的项目基本都是单 Token 看网上也比较认同 但是网上教程大部分为 **双Token ** access_token、refresh_token<br> --个人觉得没必要维护 2 个Token之所以有这样例子我也会思考存在必要性。。。。我猜2个token是因为节省相对 1token频繁续期？ 而2token可以在access_token过期后再刷，1token的话就每次时间&lt;20就刷每次判断？</p><p><strong>刷的操作都在 axios响应拦截器里</strong></p></blockquote><p>大致思路：重点在前端 请求/响应拦截器</p><p>后 -&gt; 前（登录）：Token 放 session/local storage</p><p>前 -&gt; 后：axios 请求拦截器带上放header-<code>config.headers[&#39;accessToken&#39;] = token;</code> 后端拦截校验 如过期，响应拦截器调用刷新2个token，此时拿的是refresh_token校验（过期是过期的access_token）</p><p>还有一种更方便的，不生成token直接生成一个guid当token用，redis里存过期时间。就是有点不安全哈</p><ul><li><p><mark>我们的方案是这样的，设置token过期时间30分钟，每次请求的时候走过滤器判断token是否过期，如果将要过期取token里用户名重新生成token返回前端，如果已经过期重新跳登</mark></p><ul><li>和RuoYi一样，只不过RuoYi是只用Redis ttl实现的， Token的作用像是只充当了个UUID和Redis关联</li></ul></li><li><p>怎么还让后端给你判断是否快过期，401就表示无权限就是已经过期了。前端自己记住token有限期，每次操作都前端直接检验下token有效期，例如设定在最后30分钟范围内的操作会刷新token，就可以保证30分钟内有操作就可以无感刷新。临近过期又超过30分钟没操作，就活该过期重登录。当然这30分钟可以根据产品灵活设定。</p></li><li><p>每次更新accessToken都会刷新refresh token？的只要一直在操作就不会过期而 refreshtoken一般是一天一周这种只要你中途打开页面就又续期了</p></li><li><p>如果是这样的话，refreshtoken的意义是什么呢。我一直以为使用refreshtoken的意义就是为了每次网络传输只使用有效期很短的accesstokenä，既然现在每次都要传递这两个，还不如只使用一个accesstoken来直接续期，因为我实在想不到refreshtoken存</p></li><li><p>能想到的大概是请求带accesstoken，被抓包后accesstoken容易被利用爬，所以把accesstoken几分钟有效，失效就用refresh去重新获取，但现在https加密，而且可以从很多角度去避免这种问题，实际项目中一个token搞定也不会有什么问题，用双token很多时候是给自己找麻烦</p></li><li><p>我这边的做法是： 后端返回token的有效期，比如2小时 前端通过有效期时间逆推出token的过期时间之后，把过期时间存入本地缓存中然后在axios拦截器里，去获取当前的时间，去对比判断token有没有过期过期了就调用refreshToken接口，获得新token</p></li><li><p>就是调用refreshTokenα，把旧 token给他然后换取新的token</p></li><li><p>不是很认可所谓的双token方案。 1.传统的web系统，只要用户在操作那么就一定在线，只有用户长期不操作才会下线。也就是让用户在操作中不下线是第一保障。 2.最早双token方案在哪出现的？在开放的api接口请求中。而不是在web应用设计里。 3.接2，开放API里？为了降低API服务的压力。可以通过简单比对token来快速处理外部应用访问。出现问题后哪怕全部token都失效，client全部刷新一次也基本是无感知的。 4.双token明显增加前后端的工作量，而并不一定能提升体验。还要专门设计一套token体系。 5.一般应用在使用jwt后，基本上都存在过期问题，要解决的是这个问题。简单一点，解析jwt后发现即将过期就生成一个新token，在请求中返回。复杂一点本地缓存自动刷新，只要用户的最近一次访问存在足够时间就刷新token的过期时间。 6.真当KPI项目搞啊？</p></li></ul>`,31),i=[a];function p(c,l){return n(),s("div",null,i)}const u=e(o,[["render",p],["__file","JWT.html.vue"]]),d=JSON.parse('{"path":"/studynotes/408-Network/JWT.html","title":"JWT","lang":"zh-CN","frontmatter":{"description":"JWT Token 续期问题面试杭州问过 长沙那个也问过！！！ 个人认为是频繁点 0.项目实现 1.RuoYi 感觉跟直接用最简单方式 UUID 存 Redis 一样的做法！！！ 我感觉这里 JWT 都有点多余，顶多是看上去更安全？？？？（我感觉是单体项目其实完全可 Session 解决，这里用 Token 避免分布式共享?其实UUID也行？） 感觉R...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/studynotes/408-Network/JWT.html"}],["meta",{"property":"og:site_name","content":"Zz"}],["meta",{"property":"og:title","content":"JWT"}],["meta",{"property":"og:description","content":"JWT Token 续期问题面试杭州问过 长沙那个也问过！！！ 个人认为是频繁点 0.项目实现 1.RuoYi 感觉跟直接用最简单方式 UUID 存 Redis 一样的做法！！！ 我感觉这里 JWT 都有点多余，顶多是看上去更安全？？？？（我感觉是单体项目其实完全可 Session 解决，这里用 Token 避免分布式共享?其实UUID也行？） 感觉R..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-13T08:39:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-13T08:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JWT\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-13T08:39:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.RuoYi","slug":"_1-ruoyi","link":"#_1-ruoyi","children":[]},{"level":2,"title":"1.概念","slug":"_1-概念","link":"#_1-概念","children":[]}],"git":{"createdTime":1712997543000,"updatedTime":1712997543000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":6.11,"words":1833},"filePathRelative":"studynotes/408-Network/JWT.md","localizedDate":"2024年4月13日","autoDesc":true,"excerpt":"\\n<blockquote>\\n<p>Token 续期问题面试杭州问过 长沙那个也问过！！！        个人认为是频繁点</p>\\n</blockquote>\\n<h1>0.项目实现</h1>\\n<h2>1.RuoYi</h2>\\n<p>感觉跟直接用最简单方式 UUID 存 Redis 一样的做法！！！</p>\\n<p>我感觉这里 JWT 都有点多余，顶多是看上去更安全？？？？（我感觉是单体项目其实完全可 Session 解决，这里用 Token 避免分布式共享?其实UUID也行？）</p>\\n<p>感觉RuoYi是只用Redis ttl实现的， Token的作用像是只充当了个UUID和Redis关联</p>"}');export{u as comp,d as data};
