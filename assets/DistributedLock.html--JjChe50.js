import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,c as n,e,b as o,w as r,a,f as i,o as p}from"./app-Nl9UcaOC.js";const c={},d=a(`<h1 id="distributedlock" tabindex="-1"><a class="header-anchor" href="#distributedlock"><span>DistributedLock</span></a></h1><blockquote><blockquote><p>搞不懂事务和锁的概念-可以用@Transactional代替Redisson吗</p><p>@Transactional 和 Redisson 是两个不同的概念和用途，它们不能直接相互替代。</p><ul><li><p>@Transactional 处理数据库<strong>事务</strong>的一致性。可以确保一组数据库操作要么全部成功提交，要么全部回滚</p></li><li><p>Redisson 是一个用于 Redis 的分布式对象的 Java 客户端库用于解决分布式环境中的线程<strong>并发</strong>访问问题</p></li></ul><p>在某些情况下，您可以将 @Transactional 和 Redisson 结合使用。例如，在进行数据库操作之前，可以使用 Redisson 获取分布式锁来确保在事务期间对共享资源的独占访问</p></blockquote><p>【尚硅谷】分布式锁全家桶丨一套搞定Redis/Zookeeper/MySQL实现分布式锁 <a href="https://www.bilibili.com/video/BV1kd4y1G7dM" target="_blank" rel="noopener noreferrer">尚硅谷视频地址</a></p><p>建议 SQL 和 Redis 都先到其客户端写好对应语句，再到 idea 构建代码，这样逻辑就清晰多了</p><p>结合后面学的 GuliMall 缓存那一篇一起学习，这一篇回顾起来有点陌生可能没<strong>大处着眼</strong>。需要层层递进看解决什么问题带着3w才能学好！</p><p>个人觉得 GuliMall 从本地锁开始层层递进阐述抛出问题好理解。而这一篇可能自己走马观花了</p></blockquote><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><h3 id="_1-认识-jmeter" tabindex="-1"><a class="header-anchor" href="#_1-认识-jmeter"><span>1. 认识 JMeter</span></a></h3><blockquote><p>GUliMall 压测章节也用了好用。可以搭配 jvisualvm 这个软件可以直接设置中文就不用看的那么费劲了！</p></blockquote><figure><img src="https://images.zzq8.cn/img/202209010902577.png" alt="image-20220901090225517" tabindex="0" loading="lazy"><figcaption>image-20220901090225517</figcaption></figure><p>throughput 吞吐量</p><figure><img src="https://images.zzq8.cn/img/202209010004959.png" alt="image-20220901000424905" tabindex="0" loading="lazy"><figcaption>image-20220901000424905</figcaption></figure><h2 id="jvm-本地锁" tabindex="-1"><a class="header-anchor" href="#jvm-本地锁"><span>JVM 本地锁</span></a></h2><blockquote><p>Java 自带的锁只适用于单个 JVM 内的线程同步</p><p>两种方法：</p><ol><li>ReentrantLock</li><li>Synchronized</li></ol><p>在实际开发中很少出现，因为一般我们的共享资源在服务外部（MySQL...）由此引出分布式锁</p><figure><img src="https://images.zzq8.cn/img/202209010057437.png" alt="image-20220901005746190" tabindex="0" loading="lazy"><figcaption>image-20220901005746190</figcaption></figure></blockquote><hr><h2 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁"><span>分布式锁</span></a></h2><p>以下两种方式是：</p><ol><li>基于数据库的实现：使用数据库的v和锁机制来实现分布式锁。可以创建一个专门的表来存储锁状态，通过在事务中对该表进行操作来获取和释放锁。使用数据库可以提供 ACID（原子性、一致性、隔离性和持久性）的特性，确保分布式锁的可靠性。</li><li>基于缓存的实现：利用分布式缓存系统如Redis或Memcached来实现分布式锁。可以利用缓存的原子性操作（如SETNX）来实现锁的获取和释放。获取锁时尝试设置一个特定的键值对，如果设置成功则表示获取到了锁，否则表示锁已被其他进程持有。</li></ol><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql"><span>MySQL</span></a></h2><blockquote><p>没有最好的，只有最适合的</p></blockquote><ol><li><h4 id="jvm-本地锁-synchronized-reentrantlock-三种情况导致锁失效-2-3是很难避免的-也就是说必须要单机部署单例模式-【600吞吐】" tabindex="-1"><a class="header-anchor" href="#jvm-本地锁-synchronized-reentrantlock-三种情况导致锁失效-2-3是很难避免的-也就是说必须要单机部署单例模式-【600吞吐】"><span>JVM 本地锁（synchronized / ReentrantLock）：三种情况导致锁失效（2，3是很难避免的，也就是说必须要单机部署单例模式）【600吞吐】</span></a></h4><ul><li>多例模式（@Scope(value = &quot;prototype&quot;, proxyMode = ScopedProxyMode.TARGET_CLASS)） <ul><li>每个请求的都是一个单独的对象，锁不住。单例模式所有请求都是同一个对象</li></ul></li><li>事务（事务B在事务A提交之前获取锁，就相当于事务B把A的事又干一遍） <ul><li>事务设置 read_uncommitted 可解决，但是我们不能这样用。（<mark>这里还需来理解</mark>）</li><li><img src="https://images.zzq8.cn/img/202209022328177.png" alt="image-20220902232830929" tabindex="0" loading="lazy"><figcaption>image-20220902232830929</figcaption></li></ul></li><li>集群部署（和多例模式有点类似）</li></ul><p>不推荐JVM本地锁</p></li><li><h4 id="一个sql语句解决-把判断和更新等语句合成一个语句-【2000吞吐】" tabindex="-1"><a class="header-anchor" href="#一个sql语句解决-把判断和更新等语句合成一个语句-【2000吞吐】"><span>一个SQL语句解决（把判断和更新等语句合成一个语句）【2000吞吐】</span></a></h4><ul><li><p>有很大局限性：</p><ul><li>1.锁范围问题表级锁行级锁 2.同一个商品有多条库存记录 3.无法记录库存变化前后的状态</li></ul></li><li><p>使用==<code>select … for update</code>==给数据加锁的时候，咱们需要注意锁的级别，MySQL InnoDB 默认行级锁。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> my_table <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token keyword">FOR</span> <span class="token keyword">UPDATE</span><span class="token punctuation">;</span>
<span class="token comment">-- 对 id 为 1 的数据行加悲观锁</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><mark>行级锁都是基于索引的，如果一条 SQL 语句用不到索引是不会使用行级锁的，而会使用表级锁把整张表锁住，这点需要咱们格外的注意</mark></p><ul><li>1）要使用行级锁：查询或者更新条件必须是索引字段</li><li>2）查询或更新条件必须是具体值</li></ul></li></ul></li><li><h4 id="悲观锁-select-for-update-用这个语句查-就锁住了-其他线程不能update。但能查-【600吞吐】" tabindex="-1"><a class="header-anchor" href="#悲观锁-select-for-update-用这个语句查-就锁住了-其他线程不能update。但能查-【600吞吐】"><span>悲观锁：select ... for update（用这个语句查，就锁住了，其他线程不能update。但能查）【600吞吐】</span></a></h4><ul><li>问题： <ol><li>性能问题</li><li>死锁问题：对多条数据加锁时，加锁顺序要一致</li><li>库存操作要统一：select.…for update 普通select</li></ol></li><li><mark>如果写并发量较高，一般会经常冲突，此时选择乐观锁的话，会导致业务代码不间断的重试。</mark><mark>优先选择：mysql悲观锁</mark></li></ul></li><li><h4 id="乐观锁-时间戳、version版本号、cas-机制-变量等于旧值就允许更新-例如修改密码" tabindex="-1"><a class="header-anchor" href="#乐观锁-时间戳、version版本号、cas-机制-变量等于旧值就允许更新-例如修改密码"><span>乐观锁：时间戳、version版本号、CAS 机制（变量等于旧值就允许更新，例如<mark>修改密码</mark>）</span></a></h4><ul><li><img src="https://images.zzq8.cn/img/202209031621459.png" alt="image-20220903162138040" style="zoom:50%;"></li><li>不会导致死锁，悲观锁则有一定概率会</li><li>在高并发下，吞吐量低。因为总是在内旋重试，浪费CPU资源</li><li><mark>ABA问题（图片很形象）</mark><ul><li><img src="https://images.zzq8.cn/img/202209031637908.png" alt="image-20220903163701486" tabindex="0" loading="lazy"><figcaption>image-20220903163701486</figcaption></li></ul></li><li><mark>如果写并发量较低（多读），争抢不是很激烈的情况下优先选择：乐观锁</mark></li></ul></li></ol><h2 id="redis" tabindex="-1"><a class="header-anchor" href="#redis"><span>Redis</span></a></h2><blockquote><p>这个笔记很详细！！！ <a href="../Redis/%E5%B0%9A%E7%A1%85%E8%B0%B7_Redis6%E8%AF%BE%E4%BB%B6.docx">老师的Redis 笔记</a> 结合这个看！！！案例都一样</p><p>注意在 xShell 云服务器上用 Redis 命令有提示，方便些</p></blockquote><h3 id="_1-jvm本地锁机制-单机情况下" tabindex="-1"><a class="header-anchor" href="#_1-jvm本地锁机制-单机情况下"><span>1. jvm本地锁机制（单机情况下）</span></a></h3><h3 id="_2-redis乐观锁-事务-乐观锁-watch-lua" tabindex="-1"><a class="header-anchor" href="#_2-redis乐观锁-事务-乐观锁-watch-lua"><span>2. redis乐观锁：事务 + 乐观锁（Watch）+ Lua</span></a></h3>`,21),u=e("p",null,"watch：可以监控一个或者多个key的值，如果在事务（exec）执行之前，key的值发生变化则取消事务执行 multi：开启事务 exec：执行事务",-1),h=e("p",null,[i("注意：java 代码中不能想当然的使用这三条指令！！！要把这三条指定包在execute里面，可以搞个匿名内部类实现 "),e("mark",null,"<T> T execute(SessionCallback<T> var1);")],-1),m=e("p",null,"缺点：性能得不到保障",-1),g=a('<h4 id="_3-分布式锁-跨进程、跨服务、跨服务器【细说】" tabindex="-1"><a class="header-anchor" href="#_3-分布式锁-跨进程、跨服务、跨服务器【细说】"><span><mark>3. 分布式锁：跨进程、跨服务、跨服务器【细说】</mark></span></a></h4><blockquote><p>首先分布式锁是一种<strong>跨进程跨机器节点的互斥锁</strong>，可以保证在多机器节点下对共享资源的排他性，通过第三方服务比如 reids 去共享锁，保证同一时刻只能有一个实例能够获取到锁。</p><p>然后分布式锁主要使用 Redisson 去实现的，Redisson的底层逻辑是基于 lua 脚本去实现的；</p><p>如果是第一次加锁，就会在 key 对应的 hash结构中添加一个 UUID：线程标识和1，代表了该线程对这个 key加锁了一次；</p><p>并且key的过期时间默认为30秒，如果启用了 watchdog机制，就会在后台启用一个线程，该线程会去执行一个定时任务，每10秒检查一次，如果key存在，就重置key的生存时间为30秒；</p><p>并且 Redisson 也实现了可重入锁的机制，当再次加锁，会对key对应的value加1，当value为0或者宕机，锁就会释放。</p></blockquote><blockquote><h2 id="分布式锁用的redis的哪种数据结构" tabindex="-1"><a class="header-anchor" href="#分布式锁用的redis的哪种数据结构"><span>分布式锁用的redis的哪种数据结构？</span></a></h2><p>hash结构，用来线程id+重入次数，（然后扯一下它的流程和原理）</p></blockquote><blockquote><p>场景：</p><ol><li>超卖现象（NoSQL）</li><li>缓存击穿（一个热点 key 过期，缓存有过期时间） <ul><li>MySQL 是放在硬盘上的数据库，属于文件性的数据库，性能低。</li><li>Redis 内存性，性能好，但是能支持的数据量比较少。加入缓存就可以支持更多数据！ <ul><li>解决：可在中间加锁</li></ul></li></ul></li></ol></blockquote><p><strong>分布式锁的实现方式：</strong></p><ol><li><mark>基于redis实现</mark></li><li><mark>基于zookeeper/etcd实现</mark></li><li><mark>基于mysql实现</mark></li></ol><p><strong>🌟特征：（<mark>遇到问题，一步步进阶！</mark>，看自己标注的【✨】）</strong> 我这个笔记也把下面的总结了一边： <a href="../%E8%B0%B7%E7%B2%92%E5%95%86%E5%9F%8E/%E5%88%86%E5%B8%83%E5%BC%8F%E9%AB%98%E7%BA%A7#3%EF%BC%89%E5%88%86%E5%B8%83%E5%BC%8F%E9%94%81">GuliMall</a></p><blockquote><p>一定要注意：Redis 不保证原子性，所以不能一条语句解决的问题都要考虑是否产生问题！！！</p><p>解决：一条指令解决 / Lua（<strong>世界上 90% 的外挂都是 Lua写的</strong>）</p></blockquote><ol><li><p>独占排他使用 setnx（猜缩写，not exist）【保证只有一个线程会拿到锁】</p></li><li><p>防死锁发生 如果redis客户端程序从redis服务中<strong>获取到锁之后立马宕机</strong> 解决：给锁设置过期时间。expire【防宕机没释放锁，导致死锁】</p></li><li><p>原子性： 获取锁和过期时间之间：set key value ex 3 nx【因Redis不保证原子性，所以这里只用一条命令设置锁和过期时间】</p><p>判断和释放锁之间：Lua 脚本 原因 No.4</p></li><li><p>防误删：解铃还需系铃人【新人程序员，锁没加上就解锁把别人的解了。还有No.5的情况。恶意的还是无意的都要防止一下】</p></li><li><p>可重入性：hash + lua脚本，有些复杂我暂时略过了</p></li><li><p>自动续期【当业务处理时间比锁的过期时间长，时间到锁一释放自己在裸奔，最后del操作还会把其他服务器的锁释放（就是No.4的操作 ）】</p></li></ol><p>**操作：**具体看一下自己的代码</p><ol><li>加锁：setnx（当 lock 的值不存在才能设置成功）</li><li>解锁：del</li><li>重试：递归、循环</li></ol><img src="https://images.zzq8.cn/img/202209041046981.png" alt="image-20220904104624847" style="zoom:50%;"><blockquote><p>场景：假如获取锁后服务器宕机，那么其他服务也拿不到自己就算重启也要重新拿锁也拿不到。</p><p>解决：设置锁的过期时间 expire / pexpire ttl 查看过期时间 或一条命令 set 设置 set lock 111 ex 20 xx/nx</p></blockquote><h3 id="lua脚本" tabindex="-1"><a class="header-anchor" href="#lua脚本"><span>lua脚本：</span></a></h3><p>一次性发送多个指令给redis。<strong>redis单线程执行指令遵守one-by-one规则</strong> EVAL SCript numkeys key[key..J arg[arg1] 输出的不是print，而是return</p><p>script：lua脚本字符串 numkeys：key列表的元素数量</p><p>key列表：以空格分割。获取方式：KEYS[index，应该是从1开始]</p><p>arg列表：以空格分割。ARGV[下标]</p><p>变量： 全局变量：a=5 局部变量：local a=5 (Redis 只能用 <strong>局部变量</strong>)</p><p>分支控制： if条件 then 代码块 elseif条件 then 代码库 else 代码块 end</p><figure><img src="https://images.zzq8.cn/img/202209041441300.png" alt="image-20220904144154210" tabindex="0" loading="lazy"><figcaption>image-20220904144154210</figcaption></figure><p><strong>可以这样操作 Redis 数据库里的数据：</strong></p><p>eval &quot;return redis.call(&#39;get&#39;, &#39;stock&#39;)&quot; 0</p><h2 id="reentrantlock-底层" tabindex="-1"><a class="header-anchor" href="#reentrantlock-底层"><span><a href="../juc/juc">ReentrantLock 底层</a></span></a></h2><p>略。。。<a href="../juc/juc">看自己juc篇的笔记</a></p><p>unsafe 相当于jdk留的后门，可通过指针操作内存 有大量硬件级别的 CAS 原子操作</p>',26);function k(b,y){const t=s("RouteLink");return p(),n("div",null,[d,e("blockquote",null,[e("p",null,[o(t,{to:"/studynotes/Redis/Redis.html"},{default:r(()=>[i("自己的Redis 笔记")]),_:1})]),u,h,m]),g])}const z=l(c,[["render",k],["__file","DistributedLock.html.vue"]]),x=JSON.parse('{"path":"/studynotes/DistributedLock/DistributedLock.html","title":"DistributedLock","lang":"zh-CN","frontmatter":{"description":"DistributedLock 搞不懂事务和锁的概念-可以用@Transactional代替Redisson吗 @Transactional 和 Redisson 是两个不同的概念和用途，它们不能直接相互替代。 @Transactional 处理数据库事务的一致性。可以确保一组数据库操作要么全部成功提交，要么全部回滚 Redisson 是一个用于 Re...","head":[["meta",{"property":"og:url","content":"https://doc.zzq8.cn/studynotes/DistributedLock/DistributedLock.html"}],["meta",{"property":"og:site_name","content":"Zz"}],["meta",{"property":"og:title","content":"DistributedLock"}],["meta",{"property":"og:description","content":"DistributedLock 搞不懂事务和锁的概念-可以用@Transactional代替Redisson吗 @Transactional 和 Redisson 是两个不同的概念和用途，它们不能直接相互替代。 @Transactional 处理数据库事务的一致性。可以确保一组数据库操作要么全部成功提交，要么全部回滚 Redisson 是一个用于 Re..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://images.zzq8.cn/img/202209010902577.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-08T15:48:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-08T15:48:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DistributedLock\\",\\"image\\":[\\"https://images.zzq8.cn/img/202209010902577.png\\",\\"https://images.zzq8.cn/img/202209010004959.png\\",\\"https://images.zzq8.cn/img/202209010057437.png\\",\\"https://images.zzq8.cn/img/202209022328177.png\\",\\"https://images.zzq8.cn/img/202209031637908.png\\",\\"https://images.zzq8.cn/img/202209041441300.png\\"],\\"dateModified\\":\\"2024-05-08T15:48:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[{"level":3,"title":"1. 认识 JMeter","slug":"_1-认识-jmeter","link":"#_1-认识-jmeter","children":[]}]},{"level":2,"title":"JVM 本地锁","slug":"jvm-本地锁","link":"#jvm-本地锁","children":[]},{"level":2,"title":"分布式锁","slug":"分布式锁","link":"#分布式锁","children":[]},{"level":2,"title":"MySQL","slug":"mysql","link":"#mysql","children":[]},{"level":2,"title":"Redis","slug":"redis","link":"#redis","children":[{"level":3,"title":"1. jvm本地锁机制（单机情况下）","slug":"_1-jvm本地锁机制-单机情况下","link":"#_1-jvm本地锁机制-单机情况下","children":[]},{"level":3,"title":"2. redis乐观锁：事务 + 乐观锁（Watch）+ Lua","slug":"_2-redis乐观锁-事务-乐观锁-watch-lua","link":"#_2-redis乐观锁-事务-乐观锁-watch-lua","children":[]},{"level":3,"title":"lua脚本：","slug":"lua脚本","link":"#lua脚本","children":[]}]},{"level":2,"title":"ReentrantLock 底层","slug":"reentrantlock-底层","link":"#reentrantlock-底层","children":[]}],"git":{"createdTime":1712997543000,"updatedTime":1715183298000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":1},{"name":"MiniPC","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":8.68,"words":2603},"filePathRelative":"studynotes/DistributedLock/DistributedLock.md","localizedDate":"2024年4月13日","autoDesc":true}');export{z as comp,x as data};
