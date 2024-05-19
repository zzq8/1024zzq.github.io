import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,c as l,e,b as t,w as o,a,o as r,f as c}from"./app-Nl9UcaOC.js";const p={},d=a(`<h1 id="linux-docker" tabindex="-1"><a class="header-anchor" href="#linux-docker"><span>Linux Docker</span></a></h1><blockquote><p>以前碰过 Redis 没设密码被挖矿，现在设成简单密码依旧。。。</p></blockquote><h1 id="_1-基础环境" tabindex="-1"><a class="header-anchor" href="#_1-基础环境"><span>1.基础环境</span></a></h1><h2 id="_1-1-docker" tabindex="-1"><a class="header-anchor" href="#_1-1-docker"><span>1.1.<a href="https://www.runoob.com/docker/centos-docker-install.html" target="_blank" rel="noopener noreferrer">Docker</a></span></a></h2><blockquote><p>实测用idea操作Docker比用 xshell 舒服太多了！！！</p></blockquote><blockquote><p>理解成 Linux 和 Docker容器（<strong>可以理解为一个完整的Linux</strong>【容器的 bin/bash 里没有 wget，外面 linux有】）是隔离的，所以需要端口映射、目录挂载！！！</p><p>一个镜像可以创建多个容器</p><p>容器可 --restart=always</p><p><mark>当你在Docker容器中进行文件挂载时，宿主机必须存在这个文件</mark> 实测目录不用会自己新建</p></blockquote><p>curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun</p><p>systemctl start docker</p><p>docker search jdk</p><p>为了永久性保留更改，您可以修改 <code>/etc/docker/daemon.json</code> 文件并添加上 registry-mirrors 键值。</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token punctuation">{</span>
	<span class="token string">&quot;registry-mirrors&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;https://pee6w651.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改保存后重启 Docker 以使配置生效。</p><p><code>systemctl restart docker</code></p><h2 id="_1-2-java" tabindex="-1"><a class="header-anchor" href="#_1-2-java"><span>1.2.JAVA</span></a></h2><ol><li><p>拉取指定的版本 <code>docker pull java:8</code></p></li><li><p>运行上面拉去的镜像成容器 <code>docker run -d -it --name java java:8</code> 【必须加 -it 否则STATUS为Exited】</p></li></ol><ul><li><code>-d</code>：（daemon） 守护进程【后台运行】 <ul><li>如果不加<code>-d</code>选项，表示在前台（foreground）模式下运行容器。这意味着容器的输出将直接显示在当前终端上，并且您将无法继续在该终端中执行其他命令，直到容器停止。【前台运行】</li></ul></li><li><code>-it</code>：表示分配一个伪终端（pseudo-TTY），并将其与容器的标准输入（stdin）关联起来，以便可以与容器进行交互。 <ul><li><code>-it</code>参数：容器的 Shell 映射到当前的 Shell，然后你在本机窗口输入的命令，就会传入容器。</li><li>这意味着你可以在启动的Java 8容器中进行交互式操作</li><li><mark>xd 实测如果我不加这个容器run完状态是 exit</mark></li><li>interactive + tty（Linux 终端(<em>TTY</em>). <em>TTY</em> 是Teletype 或Teletypewriter 的缩写） 我这里理解为Terminal更好记 <ul><li>shell 交互命令的接口 所以最后还可以给 bash | /bin/bash</li></ul></li></ul></li><li><code>--name java</code>：表示为容器指定一个名称，这里命名为&quot;java&quot;。</li><li><code>java:8</code>：表示使用名为&quot;java&quot;的Docker镜像的版本8。</li></ul><ol start="3"><li>docker exec -it java bash</li></ol><h2 id="_1-3-mysql" tabindex="-1"><a class="header-anchor" href="#_1-3-mysql"><span>1.3.MySQL</span></a></h2><ol><li><p><code>docker pull mysql:5.7</code></p></li><li><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /root/mysql/log:/var/log/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /root/mysql/data:/var/lib/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /root/mysql/conf:/etc/mysql <span class="token punctuation">\\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>docker exec -it mysql bash</code></p></li></ol><h4 id="修改密码" tabindex="-1"><a class="header-anchor" href="#修改密码"><span>修改密码</span></a></h4><p>修改默认密码 <code>ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;new password&#39;;</code> 其中‘new password’替换成你要设置的密码，注意:密码设置必须要大小写字母数字和特殊符号（,/&#39;;:等）,不然不能配置成功</p><ul><li><p>MySQL版本5.7.6版本以前用户可以使用如下命令：<strong><a href="https://blog.csdn.net/muziljx/article/details/81541896" target="_blank" rel="noopener noreferrer">实测有用</a></strong>：场景提示密码过期需修改</p><div class="language-delphi line-numbers-mode" data-ext="delphi" data-title="delphi"><pre class="language-delphi"><code>mysql&gt; SET PASSWORD = PASSWORD(&#39;123456&#39;); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="开启mysql的远程访问-navicat" tabindex="-1"><a class="header-anchor" href="#开启mysql的远程访问-navicat"><span>开启mysql的远程访问-Navicat</span></a></h4><ol><li>执行以下命令开启远程访问限制（注意：下面命令开启的IP是 所有的，如要开启192.168.0.1，用IP代替%）：<code>grant all privileges on *.* to &#39;root&#39;@&#39;%&#39; identified by &#39;password&#39; with grant option;</code></li><li>刷新权限表 <code>flush privileges; </code></li><li>按Ctrl+D退出数据库后输入 <code>service mysqld restart</code> 重启mysql服务</li></ol><h2 id="_1-4-redis" tabindex="-1"><a class="header-anchor" href="#_1-4-redis"><span>1.4.Redis</span></a></h2><blockquote><p>如果要通过配置文件启动 Redis 就需要先创好文件！</p></blockquote><ol><li><p><code>docker pull redis</code></p></li><li><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token parameter variable">--name</span> redis <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /root/redis/data:/data <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> /root/redis/conf:/etc/redis <span class="token punctuation">\\</span>
<span class="token parameter variable">--requirepass</span> <span class="token string">&#39;Redis密码&#39;</span> <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>docker exec -it redis bash</code></p></li><li><p>Redis 从cli中设置密码 <code>config set requirepass xxx</code></p></li></ol><h2 id="_1-5-nginx" tabindex="-1"><a class="header-anchor" href="#_1-5-nginx"><span>1.5.Nginx</span></a></h2><blockquote><p>注意 <code>nginx.conf</code> 是个文件不是文件夹 <code>touch ~/nginx/conf/nginx.conf</code></p><p>再把这个文件填上网上的内容了就可以了，但是挂载的这些其他目录还是空的改没东西还是没东西</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>/roc/docker/nginx  -- 自己的根目录
├── nginx.conf -- 主配置文件
├── html 
	└──  index.html -- 存放 nginx 默认 index.html
├── conf.d 
	└──  default.conf -- 默认的子配置文件
└── log -- nginx 日志存放目录
	└──  xxx.log  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><ol><li><p><code>docker pull nginx</code></p></li><li><p>自己宿主机新建一个对应的文件并从网上给上默认内容 <code>touch ~/nginx/conf/nginx.conf</code></p></li><li><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">443</span>:443 <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token punctuation">\\</span>
<span class="token parameter variable">--name</span> nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> ~/nginx/conf/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> ~/nginx/conf/conf.d:/etc/nginx/conf.d <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> ~/nginx/log:/var/log/nginx <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> ~/nginx/html:/usr/share/nginx/html <span class="token punctuation">\\</span>
<span class="token parameter variable">-v</span> ~/nginx/conf/ssl:/etc/nginx/ssl  <span class="token punctuation">\\</span>
<span class="token parameter variable">-d</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>html 也可以自己随便给个index.html文件 【非必须】</p></li></ol><h2 id="_1-6-minio" tabindex="-1"><a class="header-anchor" href="#_1-6-minio"><span>1.6.MinIO</span></a></h2><blockquote><p>9090是web网页后台，9000是url请求地址</p><p>Buckets-Access Policy 记得改 public</p></blockquote><ol><li><p><code>docker pull minio/minio</code></p></li><li><p>mkdir -p ~/minio/config mkdir -p ~/minio/data</p></li><li><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -p 9000:9000 -p 9090:9090 \\
     --net=host \\
     --name minio \\
     -d --restart=always \\
     -e &quot;MINIO_ACCESS_KEY=minioadmin&quot; \\
     -e &quot;MINIO_SECRET_KEY=minioadmin&quot; \\
     -v ~/minio/data:/data \\
     -v ~/minio/config:/root/.minio \\
     minio/minio server \\
     /data --console-address &quot;:9090&quot; -address &quot;:9000&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>--net=host</code>: 使用主机网络模式，将容器与主机共享网络命名空间，使得容器可以通过主机的IP地址访问网络。</li><li><code>minio/minio server</code>: 使用minio/minio镜像来运行MinIO服务器。</li><li><code>/data --console-address &quot;:9090&quot; -address &quot;:9000&quot;</code>: 指定MinIO服务器的数据存储路径为<code>/data</code>，Web控制台的访问地址为&quot;:9090&quot;，MinIO服务器的访问地址为&quot;:9000&quot;。</li></ul></li><li><p>http://101.34.55.204:9090/</p></li></ol><h1 id="_2-upupor" tabindex="-1"><a class="header-anchor" href="#_2-upupor"><span>2.upupor</span></a></h1><p>Navicat连接，新建空数据库</p><blockquote><p>推荐直接 idea 连接服务器的 Docker 省时省力！！！ 直接idea运行Dockerfile</p></blockquote><ol><li><p>使用 Dockerfile 定制镜像</p><ul><li><p><code>vim Dockerfile</code></p></li><li><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FROM java:8 
ADD upupor-web-1.0.0.jar  /blog/upupor-web-1.0.0.jar
EXPOSE 2020
ENTRYPOINT [&quot;java&quot;,&quot;-jar&quot;,&quot;/blog/upupor-web-1.0.0.jar&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>docker build -t blog .</code></p></li></ul></li><li><p>即可看到 <code>docker imagse</code></p></li><li><p>需要用到Env variment相当于普通 java -jar之前的export步骤**（注意docker run jar的话，像mysql、redis的ip地址不能为localhost必须为服务器ip！！！）**</p><ol><li><code>vim .docker_blog_env</code></li></ol></li><li><p><code>docker run -d --name=upupor -p 2020:2020 blog</code></p><ul><li>如果配置文件没用敏感信息就 --env-file ~/blog/.docker_blog_env blog</li><li>我这里直接用了 application.properties 里面写好了敏感信息所以上述这部省略</li></ul></li></ol><h1 id="git-备份" tabindex="-1"><a class="header-anchor" href="#git-备份"><span>Git-备份</span></a></h1><h2 id="_1-前置配置" tabindex="-1"><a class="header-anchor" href="#_1-前置配置"><span><a href="https://blog.csdn.net/weixin_42310154/article/details/118340458" target="_blank" rel="noopener noreferrer">1.前置配置</a></span></a></h2><blockquote><p>云服务器的 Git 我捣鼓了好久~ 由于云服务器网络、地区CN http协议去连 Github 有点抽风，固我第一次尝试了 ssh 协议！！！ 好使</p></blockquote><ol><li>生成ssh key <code>ssh-keygen -t rsa -C &quot;xxx@xxx.com&quot;</code></li><li>获取ssh key公钥内容（id_rsa.pub） <code>cat ~/.ssh/id_rsa.pub</code></li><li>把 cat 到的公钥内容放入 Github SSH配置里</li><li>验证是否设置成功 <code>ssh -T git@github.com</code></li></ol><h3 id="通俗解释" tabindex="-1"><a class="header-anchor" href="#通俗解释"><span>通俗解释！！</span></a></h3><p>重点来了：<strong>一定要知道ssh key的配置是针对每台主机的！</strong>，比如我在某台主机上操作git和我的远程仓库，想要push时不输入账号密码，走ssh协议，就需要配置ssh key，放上去的key是<strong>当前主机的ssh公钥</strong>。那么如果我换了一台其他主机，想要实现无密登录，也就需要重新配置。</p><p>下面解释开头提出的问题： （1）为什么要配？ 配了才能实现push代码的时候不需要反复输入自己的github账号密码，更方便 （2）每使用一台主机都要配？ 是的，每使用一台新主机进行git远程操作，想要实现无密，都需要配置。并不是说每个账号配一次就够了，而是每一台主机都需要配。 （3）配了为啥就不用密码了？ 因为配置的时候是把当前主机的公钥放到了你的github账号下，相当于当前主机和你的账号做了一个关联，你在这台主机上已经登录了你的账号，此时此刻github认为是该账号主人在操作这台主机，在配置ssh后就信任该主机了。所以下次在使用git的时候即使没有登录github，也能直接从本地push代码到远程了。当然这里不要混淆了，你不能随意push你的代码到任何仓库，你只能push到你自己的仓库或者其他你有权限的仓库！</p><h2 id="_2-备份-minio" tabindex="-1"><a class="header-anchor" href="#_2-备份-minio"><span>2.备份 MinIO</span></a></h2><blockquote><p>场景：备份 MinIO 的文件到 Git</p><ol><li>使用 <code>crontab -e</code></li><li>一分钟执行一次 <code>* * * * * /home/minio/data/blog/test.sh &gt;&gt; /home/minio/data/test.log 2&gt;&amp;1</code></li></ol><p>问题：我需要保证我的shell脚本的git命令 auth 这一步</p><p>​ 手动一行行命令的时候用 <code>http</code> 可以：<code>git remote set-url origin http://github.com/zzq8/MinIO-upupor.git</code></p><p>​ 但是shell中批量总是报错！！！auth问题，网上冲浪发现用ssh好使 1）需要云服务器加私钥 2）把公钥加到Git ​ <code>git remote set-url origin git@github.com:zzq8/MinIO-upupor.git</code></p></blockquote><p>test.sh:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/minio/data/blog
<span class="token function">git</span> pull origin master
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;backup upupor static resource&#39;</span>
<span class="token function">git</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-备份-sql" tabindex="-1"><a class="header-anchor" href="#_3-备份-sql"><span>3.备份 sql</span></a></h2><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token assign-left variable">d</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> +%Y%m%d%H%M<span class="token variable">\`</span></span>
<span class="token comment"># 因为upupor的mysql数据库服务部署在docker容器中,所以\`mysqldump\`在容器中执行,然后将备份好的文件写到宿主主机地址      &gt; 后的目录需要提前建好</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> mysql mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-pxxx</span> --single-transaction <span class="token parameter variable">--databases</span> upupor <span class="token operator">&gt;</span> /home/minio/data/blog/SQLBackup/upupor<span class="token variable">\${d}</span>.sql
<span class="token function">gzip</span> <span class="token parameter variable">-c</span> /home/minio/data/blog/SQLBackup/upupor<span class="token variable">\${d}</span>.sql <span class="token operator">&gt;</span> /home/minio/data/blog/SQLBackup/upupor<span class="token variable">\${d}</span>.sql.gz
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /home/minio/data/blog/SQLBackup/upupor<span class="token variable">\${d}</span>.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>00 03 * * * /home/minio/data/blog/SQLBackup/sqlbackup.sh &gt;&gt; /home/minio/data/sqlbackup.log 2&gt;&amp;1</code></p><h1 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h1><hr><h1 id="-1" tabindex="-1"><a class="header-anchor" href="#-1"><span></span></a></h1><h1 id="-2" tabindex="-1"><a class="header-anchor" href="#-2"><span></span></a></h1><h1 id="下面是手工" tabindex="-1"><a class="header-anchor" href="#下面是手工"><span>---下面是手工---</span></a></h1><h1 id="linux环境部署-jre、mysql、nginx" tabindex="-1"><a class="header-anchor" href="#linux环境部署-jre、mysql、nginx"><span>Linux环境部署(JRE、MySQL、Nginx)</span></a></h1><blockquote><p>起因: 使用了一下云服务器的Redis开了6379端口写了点SpringBoot整合Redis的测试代码，结果用着用着突然连接断了，且腾讯云发来警告CPU和带宽被跑满。Redis没设密码结合百度发现中招了(可能被肉鸡了)，花了挺多时间不想再搞了就直接重装系统了，正好花点时间写一篇环境的部署的总结。</p></blockquote><blockquote><p>后话：今天学了用Docker，不过自己写的这篇很多东西还可以借鉴</p></blockquote><h1 id="一、jre" tabindex="-1"><a class="header-anchor" href="#一、jre"><span>一、JRE</span></a></h1><p>Oracle 下个JDK还需要登录，下载超慢... 所以用国内的镜像源。</p><p><a href="https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/8/jre/x64/linux/" target="_blank" rel="noopener noreferrer">国内下载镜像地址</a></p><ol><li>解压 <code>tar -zxvf xxx</code></li><li>环境变量配置：<code>vi /etc/profile</code></li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span>/home/environment/jdk8u312-b07-jre
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span><span class="token variable">$JRE_HOME</span>/lib/rt.jar:<span class="token variable">$JRE_HOME</span>/lib/ext
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JRE_HOME</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>添加完后执行 ：source /etc/profile （重置环境变量，使得修改生效）</li><li>查看是否成功</li></ol><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101201225905.png" alt="image-20220101201225905" tabindex="0" loading="lazy"><figcaption>image-20220101201225905</figcaption></figure><p>附录：</p><p><a href="https://www.cnblogs.com/wangzfChina/p/13065902.html?ivk_sa=1024320u" target="_blank" rel="noopener noreferrer">Oracle JDK与OpenJDK的区别</a></p><p><a href="https://www.cnblogs.com/alliance/p/7093784.html" target="_blank" rel="noopener noreferrer">Linux /etc/profile文件详解</a></p><p><a href="https://www.cnblogs.com/xzpin/p/11072787.html" target="_blank" rel="noopener noreferrer">linux source命令</a></p><h1 id="二、mysql" tabindex="-1"><a class="header-anchor" href="#二、mysql"><span>二、MySQL</span></a></h1><h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1. 安装</span></a></h2><ol><li><p>下载并安装MySQL官方的 <a href="https://so.csdn.net/so/search?q=Yum" target="_blank" rel="noopener noreferrer">Yum</a> Repository</p><p><code>wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm</code></p></li><li><p>使用上面的命令就直接下载了安装用的Yum Repository，大概25KB的样子，然后就可以直接yum安装</p></li></ol><p><code>yum -y install mysql57-community-release-el7-10.noarch.rpm</code></p><ol start="3"><li><p>之后就开始安装MySQL服务器</p><p><code>yum -y install mysql-community-server</code></p></li></ol><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><ol><li>首先启动MySQL <code>systemctl start mysqld.service</code>，查看MySQL运行状态 <code>systemctl status mysqld.service</code></li></ol><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101204701233.png" alt="image-20220101204701233" tabindex="0" loading="lazy"><figcaption>image-20220101204701233</figcaption></figure><ol start="2"><li>此时MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码，通过如下命令可以在日志文件中找出密码：<code>grep &quot;password&quot; /var/log/mysqld.log</code></li></ol><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101204949194.png" alt="image-20220101204949194" tabindex="0" loading="lazy"><figcaption>image-20220101204949194</figcaption></figure><ol start="3"><li><p>通过默认密码进入数据库，此时不能做任何事情，因为MySQL默认必须修改密码之后才能操作数据库</p></li><li><p>修改默认密码 <code>ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;new password&#39;;</code> 其中‘new password’替换成你要设置的密码，注意:密码设置必须要大小写字母数字和特殊符号（,/&#39;;:等）,不然不能配置成功</p><ul><li><p>MySQL版本5.7.6版本以前用户可以使用如下命令：<strong><a href="https://blog.csdn.net/muziljx/article/details/81541896" target="_blank" rel="noopener noreferrer">实测有用</a></strong>：场景提示密码过期需修改</p><div class="language-delphi line-numbers-mode" data-ext="delphi" data-title="delphi"><pre class="language-delphi"><code>mysql&gt; SET PASSWORD = PASSWORD(&#39;123456&#39;); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ol><blockquote><p>ps: 当然想设简单一点的密码也可以</p><p>解决办法：</p><blockquote><p>查看 mysql 初始的密码策略，<code>SHOW VARIABLES LIKE &#39;validate_password%&#39;;</code></p></blockquote><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101205730050.png" alt="image-20220101205730050" tabindex="0" loading="lazy"><figcaption>image-20220101205730050</figcaption></figure><p>关于 mysql 密码策略相关参数； 1）、validate_password_length 固定密码的总长度； 2）、validate_password_dictionary_file 指定密码验证的文件路径； 3）、validate_password_mixed_case_count 整个密码中至少要包含大/小写字母的总个数； 4）、validate_password_number_count 整个密码中至少要包含阿拉伯数字的个数； 5）、validate_password_policy 指定密码的强度验证等级，默认为 MEDIUM； 关于 validate_password_policy 的取值： 0/LOW：只验证长度； 1/MEDIUM：验证长度、数字、大小写、特殊字符； 2/STRONG：验证长度、数字、大小写、特殊字符、字典文件； 6）、validate_password_special_char_count 整个密码中至少要包含特殊字符的个数；</p><blockquote><p>例如：</p><ol><li><p><code>set global validate_password_policy=LOW;</code> 只验证长度</p></li><li><p><code>set global validate_password_length=6; </code> 固定密码长度只要6位</p></li><li><p><code>ALTER USER &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;123456&#39;; </code> 修改密码</p></li></ol></blockquote></blockquote><h2 id="_3-开启mysql的远程访问" tabindex="-1"><a class="header-anchor" href="#_3-开启mysql的远程访问"><span>3. 开启mysql的远程访问</span></a></h2><ol><li>执行以下命令开启远程访问限制（注意：下面命令开启的IP是 所有的，如要开启192.168.0.1，用IP代替%）：<code>grant all privileges on *.* to &#39;root&#39;@&#39;%&#39; identified by &#39;password&#39; with grant option;</code></li><li>刷新权限表 <code>flush privileges; </code></li><li>按Ctrl+D退出数据库后输入 <code>service mysqld restart</code> 重启mysql服务</li></ol><h2 id="_4-为firewalld添加开放端口" tabindex="-1"><a class="header-anchor" href="#_4-为firewalld添加开放端口"><span>4. 为firewalld添加开放端口</span></a></h2><ol><li>预备知识</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>systemctl status firewalld <span class="token comment">#查看firewalld状态</span>
systemctl start firewalld <span class="token comment">#开启防火墙</span>
systemctl stop firewalld <span class="token comment">#关闭防火墙</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>添加mysql端口3306和Tomcat端口8080</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">3306</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-port<span class="token operator">=</span><span class="token number">8080</span>/tcp <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span> <span class="token comment">#重新载入</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-更改mysql的语言" tabindex="-1"><a class="header-anchor" href="#_5-更改mysql的语言"><span>5. 更改mysql的语言</span></a></h2><ol><li>首先重新登录mysql，然后输入status，可以看到，红色框框处不是utf-8</li></ol><figure><img src="https://images.zzq8.cn/img/202207241646499.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ol start="2"><li>因此我们先退出mysql，然后再到etc目录下的my.cnf文件下修改一下文件内容 <code>vim /etc/my.cnf</code></li></ol><figure><img src="https://images.zzq8.cn/img/202207241646626.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment">#开头处</span>
<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
default-character-set<span class="token operator">=</span>utf8mb4

<span class="token comment">#结尾处</span>
character-set-server<span class="token operator">=</span>utf8mb4
collation-server<span class="token operator">=</span>utf8mb4_general_ci
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>保存更改后的my.cnf文件后，重启下mysql <code>service mysqld restart</code>，然后进入mysql输入status再次查看，你就会发现变化啦</li></ol><figure><img src="https://images.zzq8.cn/img/202207241647349.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>ps: 可以到Windows下用cmd命令启动mysql啦，个人喜欢用Navicat</p><h2 id="_6-linux-mysql导入sql文件" tabindex="-1"><a class="header-anchor" href="#_6-linux-mysql导入sql文件"><span>6. Linux-Mysql导入sql文件</span></a></h2><ol><li>创建空数据库 <code>create database xx</code></li><li><code>use xx</code></li><li>导入sql文件 <code>source /home/xx.sql;</code> <mark>注意：在 Windows 下路径也要变成左斜杠</mark></li></ol>`,100),m={id:"实测-运行-sql-文件的时长-取决于外存的好坏。例如-c-盘是固体对比其他盘机械硬盘差距很大",tabindex:"-1"},u={class:"header-anchor",href:"#实测-运行-sql-文件的时长-取决于外存的好坏。例如-c-盘是固体对比其他盘机械硬盘差距很大"},g=a(`<p>70分钟 vs 2分钟</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录"><span>附录</span></a></h2><p><a href="https://www.cnblogs.com/ftl1012/p/9265699.html" target="_blank" rel="noopener noreferrer">wget 是一个下载文件的工具</a></p><p><a href="https://www.cnblogs.com/diantong/p/10245526.html" target="_blank" rel="noopener noreferrer">rpm是一个包管理器，用于生成、安装、查询、核实、更新以及卸载单个软件包。</a></p><p><a href="https://www.runoob.com/linux/linux-comm-grep.html" target="_blank" rel="noopener noreferrer">Linux grep 命令</a></p><p><a href="https://blog.csdn.net/qq_17555933/article/details/101445526" target="_blank" rel="noopener noreferrer">mysql使用utf8mb4经验吐血总结</a></p><p><a href="https://blog.csdn.net/qq_36582604/article/details/80526287" target="_blank" rel="noopener noreferrer">CentOS7安装MySQL（完整版）</a></p><p><a href="https://www.cnblogs.com/horvey/p/10151706.html" target="_blank" rel="noopener noreferrer">MySQL 5.7 解压版 安装教程(图文详细)【Windows】</a></p><h1 id="三、nginx" tabindex="-1"><a class="header-anchor" href="#三、nginx"><span>三、Nginx</span></a></h1><h2 id="_1-前言" tabindex="-1"><a class="header-anchor" href="#_1-前言"><span>1. 前言</span></a></h2><p>目的：使用NGINX反向代理，将80端口转发到8080端口，反向代理（Reverse Proxy）方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。具体看图。</p><p><strong>正向代理</strong>（代理客户端）：</p><p>场景：科学上网，客户端请求到香港的一台服务器，由这台服务器再请求到美国等其它被墙地区的服务器。</p><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/kuangstudy46bdad36-d3e0-43b0-a223-43360b7e8fc7.png" alt="正向代理" tabindex="0" loading="lazy"><figcaption>正向代理</figcaption></figure><p><strong>反向代理</strong>（代理服务器端）：</p><p>场景：例如百度的服务器肯定不止一台，你会先访问到代理服务器再给你决定具体让你到哪一台服务器拿数据。</p><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/kuangstudy62a15097-6e2a-4dbe-bcf5-f0d7cab81089.png" alt="反向代理" tabindex="0" loading="lazy"><figcaption>反向代理</figcaption></figure><h2 id="_2-具体操作" tabindex="-1"><a class="header-anchor" href="#_2-具体操作"><span>2. 具体操作</span></a></h2><ol><li>下载安装Nginx <code>yum install nginx</code></li><li>加入开机启动 <code>systemctl enable nginx</code></li><li>使用命令 <code>find / -name &quot;nginx.conf&quot;</code> 进行查找nginx配置文件，进行配置 <code>vim /etc/nginx/nginx.conf</code></li><li>批量注释服务配置如图（vim命令看附录），因为一个服务器一般会有很多个服务要跑，如果直接在服务配置修改的话就不方便拓展，这里将server注释，也就是不用这个server，而是在include另外添加配置文件。咱们可以理解为nginx.conf是一个总配置文件，include所包含的是子配置文件，如果要添加一个服务，就可以再/etc/nginx/conf.d/目录下去添加一个子配置文件，这里也是用的这种方式。</li></ol><figure><img src="https://gitee.com/codezzq/blogImage/raw/master/img/image-20220102103441091.png" alt="image-20220102103441091" tabindex="0" loading="lazy"><figcaption>image-20220102103441091</figcaption></figure><ol start="5"><li>在/etc/nginx/conf.d/目录下创建*.conf文件，我这里命名为myblog.conf <code>vim /etc/nginx/conf.d/myblog.conf</code> 填入以下数据：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen       <span class="token number">80</span><span class="token punctuation">;</span>  <span class="token comment">#监听80端口</span>
    server_name  1024zzq.com<span class="token punctuation">;</span>  <span class="token comment">#转发到哪个地址</span>
    location / <span class="token punctuation">{</span>
        proxy_pass   http://101.34.55.204:8080<span class="token punctuation">;</span>  <span class="token comment">#代理到哪个地址</span>
        index  index.html index.htm<span class="token punctuation">;</span>
        proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span>
        proxy_set_header X-Real-Ip <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
        proxy_set_header X-Forwarded-For <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment">#    access_log /logs/1024.zzq.com.access.log; #表示记录日志信息</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>启动Nginx <code>systemctl start nginx</code></li></ol><h1 id="四、其他附录" tabindex="-1"><a class="header-anchor" href="#四、其他附录"><span>四、其他附录</span></a></h1><p><a href="https://blog.csdn.net/weixin_34055910/article/details/92964753" target="_blank" rel="noopener noreferrer">什么是YUM</a></p><p><a href="http://yum.baseurl.org/" target="_blank" rel="noopener noreferrer">YUM</a>(Yellowdog Updater Modified)是Fedora、CentOS、RedHat中的软件包管理器。基于 RPM 包管理，YUM通过分析RPM header数据，自动处理依赖关系，从指定服务器自动下载安装所有依赖的软件包。</p><p><a href="http://c.biancheng.net/view/824.html" target="_blank" rel="noopener noreferrer">YUM其他介绍</a></p><p><a href="https://www.cnblogs.com/ryanzheng/p/11322375.html" target="_blank" rel="noopener noreferrer">linux中yum与rpm区别（重点）</a></p><p><a href="http://www.360doc.com/content/18/0412/15/11935121_745034658.shtml" target="_blank" rel="noopener noreferrer">usr 是 unix system resources 的缩写</a></p>`,29);function h(b,v){const n=i("font");return r(),l("div",null,[d,e("h4",m,[e("a",u,[e("span",null,[t(n,{color:"red"},{default:o(()=>[c("实测：运行 SQL 文件的时长，取决于外存的好坏。例如 C 盘是固体对比其他盘机械硬盘差距很大！")]),_:1})])])]),g])}const f=s(p,[["render",h],["__file","Linux环境部署(JRE、MySQL、Nginx).html.vue"]]),q=JSON.parse('{"path":"/studynotes/Linux/Linux%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2(JRE%E3%80%81MySQL%E3%80%81Nginx).html","title":"Linux Docker","lang":"zh-CN","frontmatter":{"description":"Linux Docker 以前碰过 Redis 没设密码被挖矿，现在设成简单密码依旧。。。 1.基础环境 1.1.Docker 实测用idea操作Docker比用 xshell 舒服太多了！！！ 理解成 Linux 和 Docker容器（可以理解为一个完整的Linux【容器的 bin/bash 里没有 wget，外面 linux有】）是隔离的，所以需要...","head":[["meta",{"property":"og:url","content":"https://doc.zzq8.cn/studynotes/Linux/Linux%E7%8E%AF%E5%A2%83%E9%83%A8%E7%BD%B2(JRE%E3%80%81MySQL%E3%80%81Nginx).html"}],["meta",{"property":"og:site_name","content":"Zz"}],["meta",{"property":"og:title","content":"Linux Docker"}],["meta",{"property":"og:description","content":"Linux Docker 以前碰过 Redis 没设密码被挖矿，现在设成简单密码依旧。。。 1.基础环境 1.1.Docker 实测用idea操作Docker比用 xshell 舒服太多了！！！ 理解成 Linux 和 Docker容器（可以理解为一个完整的Linux【容器的 bin/bash 里没有 wget，外面 linux有】）是隔离的，所以需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101201225905.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-13T08:39:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-13T08:39:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux Docker\\",\\"image\\":[\\"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101201225905.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101204701233.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101204949194.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220101205730050.png\\",\\"https://images.zzq8.cn/img/202207241646499.png\\",\\"https://images.zzq8.cn/img/202207241646626.png\\",\\"https://images.zzq8.cn/img/202207241647349.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/kuangstudy46bdad36-d3e0-43b0-a223-43360b7e8fc7.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/kuangstudy62a15097-6e2a-4dbe-bcf5-f0d7cab81089.png\\",\\"https://gitee.com/codezzq/blogImage/raw/master/img/image-20220102103441091.png\\"],\\"dateModified\\":\\"2024-04-13T08:39:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.1.Docker","slug":"_1-1-docker","link":"#_1-1-docker","children":[]},{"level":2,"title":"1.2.JAVA","slug":"_1-2-java","link":"#_1-2-java","children":[]},{"level":2,"title":"1.3.MySQL","slug":"_1-3-mysql","link":"#_1-3-mysql","children":[]},{"level":2,"title":"1.4.Redis","slug":"_1-4-redis","link":"#_1-4-redis","children":[]},{"level":2,"title":"1.5.Nginx","slug":"_1-5-nginx","link":"#_1-5-nginx","children":[]},{"level":2,"title":"1.6.MinIO","slug":"_1-6-minio","link":"#_1-6-minio","children":[]},{"level":2,"title":"1.前置配置","slug":"_1-前置配置","link":"#_1-前置配置","children":[{"level":3,"title":"通俗解释！！","slug":"通俗解释","link":"#通俗解释","children":[]}]},{"level":2,"title":"2.备份 MinIO","slug":"_2-备份-minio","link":"#_2-备份-minio","children":[]},{"level":2,"title":"3.备份 sql","slug":"_3-备份-sql","link":"#_3-备份-sql","children":[]},{"level":2,"title":"1. 安装","slug":"_1-安装","link":"#_1-安装","children":[]},{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 开启mysql的远程访问","slug":"_3-开启mysql的远程访问","link":"#_3-开启mysql的远程访问","children":[]},{"level":2,"title":"4. 为firewalld添加开放端口","slug":"_4-为firewalld添加开放端口","link":"#_4-为firewalld添加开放端口","children":[]},{"level":2,"title":"5. 更改mysql的语言","slug":"_5-更改mysql的语言","link":"#_5-更改mysql的语言","children":[]},{"level":2,"title":"6. Linux-Mysql导入sql文件","slug":"_6-linux-mysql导入sql文件","link":"#_6-linux-mysql导入sql文件","children":[]},{"level":2,"title":"附录","slug":"附录","link":"#附录","children":[]},{"level":2,"title":"1. 前言","slug":"_1-前言","link":"#_1-前言","children":[]},{"level":2,"title":"2. 具体操作","slug":"_2-具体操作","link":"#_2-具体操作","children":[]}],"git":{"createdTime":1712997543000,"updatedTime":1712997543000,"contributors":[{"name":"Fighting","email":"1024zzq@gmail.com","commits":1}]},"readingTime":{"minutes":13.5,"words":4051},"filePathRelative":"studynotes/Linux/Linux环境部署(JRE、MySQL、Nginx).md","localizedDate":"2024年4月13日","autoDesc":true}');export{f as comp,q as data};
