# Regular Expression

> 正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up

## > capturing group

> 场景：sublime中 我个人频繁用到，替换东西时候又得带上原先的。。。$1..$n 可以复用 find 里被()包裹的组
>
> 把多个标记分在同一组并创建一个捕获分组，用来创建子串或引用。

Target - *hahaha* *ha*a *ha*h!

Find：(ha)+

Replace：$1



## > lzay(?)

> 场景：[\s\S]*? World xxxxxWorld，这样只会匹配到前面
>
> 令前面的标记变慵懒，让其尽可能少地匹配字符。默认情况下，量词是贪婪的会尽可能多地匹配字符。

```
b\w+?
```

------

```
b *be* *be*e *be*er *be*ers
```



## > positive lookahead / negative lookahead

> 匹配主表达式后面的组而不将其包含在结果中。 (?=ABC)
>
> 指定主表达式后无法匹配的组（如果匹配，则结果将被丢弃）。(?!ABC)

(?=ABC)

```
\d(?=px)
```

------

1pt `2`px 3em `4`px



(?!ABC)

```
\d(?!px)
```

------

`1`pt 2px `3`em 4px



## > 正则匹配0次必须加星

\* 匹配0个或更多前面的标记。





## Other

* /：代表正则表达式的头和尾，所以很多时候需要转义再用
  * `\([A-Z])\w+\/\`