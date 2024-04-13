import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as t,c as p,d as n,f as o,a as l,e as i}from"./app-Z85VJPgp.js";const c={},r={id:"regular-expression",tabindex:"-1"},u={class:"header-anchor",href:"#regular-expression"},d={href:"https://regexr-cn.com/",target:"_blank",rel:"noopener noreferrer"},k=i(`<blockquote><p>正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up XD：受益匪浅，就在title网站去学！！！</p></blockquote><h1 id="一、日常问题" tabindex="-1"><a class="header-anchor" href="#一、日常问题"><span>一、日常问题</span></a></h1><h2 id="_1-匹配空行" tabindex="-1"><a class="header-anchor" href="#_1-匹配空行"><span>1.匹配空行</span></a></h2><blockquote><p><code>^\\s*$</code> （* 指空格出现 0 次或多次）-&gt; * 匹配0个或更多前面的标记。</p></blockquote><p>1）除了常使用 ^ 另外 $ 也可以熟练用起来</p><p>2）正则匹配0次必须加星</p><h2 id="_2-使用错误" tabindex="-1"><a class="header-anchor" href="#_2-使用错误"><span>2.* / + 使用错误</span></a></h2><blockquote><p>做 LeetCode 发现</p></blockquote><p>&quot;the sky is blue&quot;.split(&quot;\\s*&quot;); //以 Char 为单位</p><ul><li>警告:表达式可以返回空匹配项，也可以匹配 在某些用例中是无限的。 有15个字符没有找到匹配项，包括14个空匹配项(*不显示)。 插入点:第0行，col 15，索引15</li></ul><p>&quot;the sky is blue&quot;.split(&quot;\\s+&quot;); //以 Word 为单位</p><h2 id="非集" tabindex="-1"><a class="header-anchor" href="#非集"><span>&gt; 非集</span></a></h2><blockquote><p>匹配不在集合中的任何字符。</p><p>场景：我匹每行开头不是 a 的 <code>^[^a]</code></p></blockquote><h2 id="capturing-group" tabindex="-1"><a class="header-anchor" href="#capturing-group"><span>&gt; capturing group</span></a></h2><blockquote><p>场景：sublime中 我个人频繁用到，替换东西时候又得带上原先的。。。$1..$n 可以复用 find 里被()包裹的组</p><p>把多个标记分在同一组并创建一个捕获分组，用来创建子串或引用。</p></blockquote><p>Target - <em>hahaha</em> <em>ha</em>a <em>ha</em>h!</p><p>Find：(ha)+</p><p>Replace：$1</p><p>突然发现 Java 正则也可以用复用这个组的概念：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> input <span class="token operator">=</span> <span class="token string">&quot;#0:%洪都%;#1:%洪都%;#2:%洪都%;#3:0;#4:150;&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// 定义正则表达式匹配模式</span>
        <span class="token class-name">String</span> regex <span class="token operator">=</span> <span class="token string">&quot;#\\\\d+:(.*?);&quot;</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建 Pattern 对象</span>
        <span class="token class-name">Pattern</span> pattern <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span>regex<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建 Matcher 对象</span>
        <span class="token class-name">Matcher</span> matcher <span class="token operator">=</span> pattern<span class="token punctuation">.</span><span class="token function">matcher</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建集合存储提取的结果</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> partsList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 迭代匹配结果并提取部分内容</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>matcher<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> part <span class="token operator">=</span> matcher<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            partsList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>part<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 打印提取的结果</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> part <span class="token operator">:</span> partsList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;提取的部分内容: &quot;</span> <span class="token operator">+</span> part<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lzay" tabindex="-1"><a class="header-anchor" href="#lzay"><span>&gt; lzay(?)</span></a></h2><blockquote><p>场景：[\\s\\S]*? World xxxxxWorld，这样只会匹配到前面</p><p>令前面的标记变慵懒，让其尽可能少地匹配字符。默认情况下，量词是贪婪的会尽可能多地匹配字符。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>b\\w+?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>b *be* *be*e *be*er *be*ers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="positive-lookahead-negative-lookahead" tabindex="-1"><a class="header-anchor" href="#positive-lookahead-negative-lookahead"><span><mark>&gt; positive lookahead / negative lookahead</mark></span></a></h2><blockquote><p>匹配主表达式后面的组而不将其包含在结果中。 (?=ABC)</p><p>指定主表达式后无法匹配的组（如果匹配，则结果将被丢弃）。(?!ABC)</p><blockquote><p>2024 再次使用，<mark>目的 -&gt; 匹配最小长度满足条件的值</mark></p><p>错误使用：<code>&lt;DataBinding[\\S\\s]*?ColumnKey=&quot;StartBusinessDate&quot;</code></p><p>文本：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;DataBinding
asdasd
&lt;DataBinding TableKey=&quot;DepositCollectHead&quot; ColumnKey=&quot;StartBusinessDate&quot;/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要改为：<code>&lt;DataBinding(?:(?!&lt;\\/DataBinding&gt;).)*?ColumnKey=&quot;StartBusinessDate&quot;\\/&gt;</code> //也是错的！不知道怎么处理</p><p>----------------还未理解透彻</p><h2 id="自己再研究" tabindex="-1"><a class="header-anchor" href="#自己再研究"><span>自己再研究</span></a></h2><p>发现：<code>&lt;DataBinding(.*)ColumnKey=&quot;StartBusinessDate&quot;\\/&gt;</code> 就行</p><p>其实就是区分 [\\S\\s]* 和 .* 的区分！！！！ <mark>前者包括换行符，后者不包只匹一行</mark></p><p>如果需要匹配跨行文本或保留换行符，则使用 &quot;[\\S\\s]<em>&quot; 可能更合适。而当只需匹配单行文本时，使用 &quot;.</em>&quot; 可能更简洁和直观。</p></blockquote></blockquote><p>(?=ABC)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\d(?=px)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><p>1pt <code>2</code>px 3em <code>4</code>px</p><p>(?!ABC)</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\d(?!px)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><p><code>1</code>pt 2px <code>3</code>em 4px</p><h2 id="other" tabindex="-1"><a class="header-anchor" href="#other"><span>Other</span></a></h2><ul><li><p>/：代表正则表达式的头和尾，所以很多时候需要转义再用</p></li><li><p>其实就是区分 [\\S\\s]* 和 .* 的区分！！！！ <mark>前者包括换行符，后者不包只匹一行</mark> 【看上面场景案例(?=ABC)】</p><p>如果需要匹配跨行文本或保留换行符，则使用 &quot;[\\S\\s]<em>&quot; 可能更合适。而当只需匹配单行文本时，使用 &quot;.</em>&quot; 可能更简洁和直观。</p></li></ul>`,37);function m(h,v){const a=s("ExternalLinkIcon");return t(),p("div",null,[n("h1",r,[n("a",u,[n("span",null,[n("a",d,[o("Regular Expression"),l(a)])])])]),k])}const x=e(c,[["render",m],["__file","Regexr.html.vue"]]),q=JSON.parse('{"path":"/studynotes/ZOther/Regexr.html","title":"Regular Expression","lang":"zh-CN","frontmatter":{"description":"Regular Expression 正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up XD：受益匪浅，就在title网站去学！！！ 一、日常问题 1.匹配空行 ^\\\\s*$ （* 指空格出现 0 次或多次）-> * 匹配0个或更多前面的标记。 1）除了常使用 ^ 另外 $ 也可以熟练用起来 2）正则匹配0次必须加星 2.* / + 使用错...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/studynotes/ZOther/Regexr.html"}],["meta",{"property":"og:site_name","content":"Zz"}],["meta",{"property":"og:title","content":"Regular Expression"}],["meta",{"property":"og:description","content":"Regular Expression 正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up XD：受益匪浅，就在title网站去学！！！ 一、日常问题 1.匹配空行 ^\\\\s*$ （* 指空格出现 0 次或多次）-> * 匹配0个或更多前面的标记。 1）除了常使用 ^ 另外 $ 也可以熟练用起来 2）正则匹配0次必须加星 2.* / + 使用错..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-13T08:39:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-13T08:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Regular Expression\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-13T08:39:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.匹配空行","slug":"_1-匹配空行","link":"#_1-匹配空行","children":[]},{"level":2,"title":"2.* / + 使用错误","slug":"_2-使用错误","link":"#_2-使用错误","children":[]},{"level":2,"title":"> 非集","slug":"非集","link":"#非集","children":[]},{"level":2,"title":"> capturing group","slug":"capturing-group","link":"#capturing-group","children":[]},{"level":2,"title":"> lzay(?)","slug":"lzay","link":"#lzay","children":[]},{"level":2,"title":"> positive lookahead / negative lookahead","slug":"positive-lookahead-negative-lookahead","link":"#positive-lookahead-negative-lookahead","children":[]},{"level":2,"title":"Other","slug":"other","link":"#other","children":[]}],"git":{"createdTime":1712997543000,"updatedTime":1712997543000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":2.81,"words":842},"filePathRelative":"studynotes/ZOther/Regexr.md","localizedDate":"2024年4月13日","autoDesc":true,"excerpt":"\\n<blockquote>\\n<p>正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up     XD：受益匪浅，就在title网站去学！！！</p>\\n</blockquote>\\n<h1>一、日常问题</h1>\\n<h2>1.匹配空行</h2>\\n<blockquote>\\n<p><code>^\\\\s*$</code>                     （* 指空格出现 0 次或多次）-&gt;  * 匹配0个或更多前面的标记。</p>\\n</blockquote>\\n<p>1）除了常使用 ^ 另外 $ 也可以熟练用起来</p>\\n<p>2）正则匹配0次必须加星</p>\\n<h2>2.* / + 使用错误</h2>"}');export{x as comp,q as data};
