import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,e as s,t as a,a as l,o as e}from"./app-De_BJXCe.js";const t={},h=l(`<h1 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions"><span><a href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer">GitHub Actions</a></span></a></h1><blockquote><p><a href="https://www.bilibili.com/video/BV1C34y1t79H/?spm_id_from=333.788.recommend_more_video.1&amp;vd_source=0f3bf62c50d57c4a7d85b89b4d2633e0" target="_blank" rel="noopener noreferrer">100秒解释什么是DevOps CI/CD 中国DevOps社区</a></p><p><a href="https://www.bilibili.com/video/BV1RE411R7Uy/?spm_id_from=333.337.search-card.all.click&amp;vd_source=0f3bf62c50d57c4a7d85b89b4d2633e0" target="_blank" rel="noopener noreferrer">【CICD】github新功能actions全方位讲解！！</a></p><p>起因：LeetCode 自动打卡签到领积分 可见Actions可以拿来跑一些好用的脚本，例如定时签到类的 / 看视频感觉更多的是持续集成</p><p>1）可以围绕自己的仓库做一些流程自动化</p><p>2）CI/CD代表<code>持续集成</code>和<code>持续交付</code> 自动化构建部署 <strong>Continuous Integration/Continuous Deployment</strong></p><p>​ CI：新代码更新集成到现有的代码库中（GitHub Actions就是这个服务）</p><p><strong>CI/CD提供了如下两个主要的好处：它可以帮助你将原本必须由开发人员手动完成的事情自动化（应用交付给客户时候需要经过三个步骤：测试、构建、部署），从而提高你的速度；它也会在小问题发展成重大灾难之前及早地发现它们，从而提高代码质量。</strong></p><p>Devops的核心实践之一是持续集成：好像是有个CI服务器。就是为了避免下面的问题。 我理解：GitHub Actions不同的是 不需要CI服务器了，直接GitHub提供云中的Linux容器给你操作 1）get code 2）setup node 3）test/build/dploy</p><p>My：持续集成的流水线，以前的问题 码农1写了个API 码农2也写了一个UI 但是合并时候发现不兼容 <strong>合并地狱</strong>就需要推翻。而CI/CD会持续集成，每天提交的都会Actions跑看有没有问题。Actions里面写了测试...有问题就会马上显示出来！</p><p>https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html</p></blockquote><p>一个简单的实例：actions GitHub的官方用户</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">name:MYCI</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #GitHub Action on:schedule 到指定时间执行任务 / on:push 就是推送就执行</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  push</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    branches</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">master</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    paths</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">src/*</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">jobs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">  #任务名字可随意</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  jobl</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    #是个枚举一般用这个可以了</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    runs-on</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ubuntu-latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    steps</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#拷贝代码 输出hello </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    #这里可用 git clone xxx 将代码拷贝，但是还要cd到目录/代码私有麻烦。 GitHub考虑到了用下面的省事</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    #这里是复用GitHub的流程，其实它有个用户叫actions仓库叫checkout（看了确实是！）  封装了下载代码的流程</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">actions/checkout@vl</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">    #运行shell</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">echo hello</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>LeetCode的示例：</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">auto action runner</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">run-name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">\${{ github.actor }} is running</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  schedule</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">cron</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;50 16 * * *&#39;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  workflow_dispatch</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">jobs</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">  build</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    runs-on</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">ubuntu-latest</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">    steps</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Checkout</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">actions/checkout@v3</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">	</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">	  #理解了 user/repositoty/release version 下面三条就好理解都是装环境，能指定版本是因为ubuntu里全装了</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Node</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">actions/setup-node@v3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">          node-version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">16</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Install pnpm</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pnpm/action-setup@v2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        id</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pnpm-install</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">          version</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">7</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">          run_install</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">Install dependencies</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pnpm install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">run</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">pnpm dev \${{ secrets.ACCOUNT }} \${{ secrets.PASSWORD }}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),p=s("p",null,"可以放个 Docker 在它里面放node的iamge",-1),k=s("p",null,"可以跑个 nginx run的时候curl localhost:8080 是可以证明跑成功的",-1);function r(d,c){return e(),n("div",null,[h,s("p",null,"敏感信息放setting里面有个secrets可以设置 $"+a()+" 引用",1),p,k])}const y=i(t,[["render",r],["__file","GitHubActions.html.vue"]]),u=JSON.parse('{"path":"/studynotes/ZOther/GitHubActions.html","title":"GitHub Actions","lang":"zh-CN","frontmatter":{"description":"GitHub Actions 100秒解释什么是DevOps CI/CD 中国DevOps社区 【CICD】github新功能actions全方位讲解！！ 起因：LeetCode 自动打卡签到领积分 可见Actions可以拿来跑一些好用的脚本，例如定时签到类的 / 看视频感觉更多的是持续集成 1）可以围绕自己的仓库做一些流程自动化 2）CI/CD代表持...","head":[["meta",{"property":"og:url","content":"https://doc.zzq8.cn/studynotes/ZOther/GitHubActions.html"}],["meta",{"property":"og:site_name","content":"Piglet"}],["meta",{"property":"og:title","content":"GitHub Actions"}],["meta",{"property":"og:description","content":"GitHub Actions 100秒解释什么是DevOps CI/CD 中国DevOps社区 【CICD】github新功能actions全方位讲解！！ 起因：LeetCode 自动打卡签到领积分 可见Actions可以拿来跑一些好用的脚本，例如定时签到类的 / 看视频感觉更多的是持续集成 1）可以围绕自己的仓库做一些流程自动化 2）CI/CD代表持..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-01T02:42:48.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-01T02:42:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GitHub Actions\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-06-01T02:42:48.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1712997543000,"updatedTime":1717209768000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":2.46,"words":738},"filePathRelative":"studynotes/ZOther/GitHubActions.md","localizedDate":"2024年4月13日","autoDesc":true}');export{y as comp,u as data};