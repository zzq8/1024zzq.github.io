---
article: false
---
# [Regular Expression](https://regexr-cn.com/)

> 正则很多地方都可以用，各类文本编辑器！处理文本等工作效率 up     XD：受益匪浅，就在title网站去学！！！

# 一、日常问题

## 词边界

\b 词边界。匹配一个单词边界，也就是指单词和空格间的位置。

```java
Edit the //匹配到单词最后的 t 字母
```



## 匹配空行

> `^\s*$`                     （* 指空格出现 0 次或多次）->  \* 匹配0个或更多前面的标记。

1）除了常使用 ^ 另外 $ 也可以熟练用起来

2）正则匹配0次必须加星



## * / + 使用错误

> 做 LeetCode 发现

"the sky is blue".split("\\s*");  //以 Char 为单位

* 警告:表达式可以返回空匹配项，也可以匹配
  在某些用例中是无限的。
  有15个字符没有找到匹配项，包括14个空匹配项(*不显示)。
  插入点:第0行，col 15，索引15

"the sky is blue".split("\\s+");  //以 Word 为单位  



## 非集

> 匹配不在集合中的任何字符。   
>
> 场景：我匹每行开头不是 a 的  `^[^a]`



## ✨capturing group

> 场景：sublime中 我个人频繁用到，替换东西时候又得带上原先的。。。$1..$n 可以复用 find 里被()包裹的组
>
> 把多个标记分在同一组并创建一个捕获分组，用来创建子串或引用。

Target - *hahaha* *ha*a *ha*h!

Find：(ha)+

Replace：$1



突然发现 Java 正则也可以用复用这个组的概念：

```java
public static void main(String[] args) {
        String input = "#0:%洪都%;#1:%洪都%;#2:%洪都%;#3:0;#4:150;";

        // 定义正则表达式匹配模式
        String regex = "#\\d+:(.*?);";

        // 创建 Pattern 对象
        Pattern pattern = Pattern.compile(regex);

        // 创建 Matcher 对象
        Matcher matcher = pattern.matcher(input);

        // 创建集合存储提取的结果
        List<String> partsList = new ArrayList<>();

        // 迭代匹配结果并提取部分内容
        while (matcher.find()) {
            String part = matcher.group(1);
            partsList.add(part);
        }

        // 打印提取的结果
        for (String part : partsList) {
            System.out.println("提取的部分内容: " + part);
        }
    }
```



## lzay(?)

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



> 场景二：可选项

```
colou?r
```

------

```
*color* *colour*
```



## ==> positive lookahead / negative lookahead==

> 匹配主表达式后面的组而不将其包含在结果中。 (?=ABC)
>
> 指定主表达式后无法匹配的组（如果匹配，则结果将被丢弃）。(?!ABC)
>
> > 2024 再次使用，==目的 -> 匹配最小长度满足条件的值==
> >
> > 错误使用：`<DataBinding[\S\s]*?ColumnKey="StartBusinessDate"`
> >
> > 文本：
> >
> > ```
> > <DataBinding
> > asdasd
> > <DataBinding TableKey="DepositCollectHead" ColumnKey="StartBusinessDate"/>
> > ```
> >
> >
> > 需要改为：`<DataBinding(?:(?!<\/DataBinding>).)*?ColumnKey="StartBusinessDate"\/>`     //也是错的！不知道怎么处理
> >
> > ----------------还未理解透彻
> >
> > ## 自己再研究
> >
> > 发现：`<DataBinding(.*)ColumnKey="StartBusinessDate"\/>` 就行
> >
> > 其实就是区分 [\S\s]*  和   .*    的区分！！！！            ==前者包括换行符，后者不包只匹一行==
> >
> > 如果需要匹配跨行文本或保留换行符，则使用 "[\S\s]*" 可能更合适。而当只需匹配单行文本时，使用 ".*" 可能更简洁和直观。

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









## Other

* /：代表正则表达式的头和尾，所以很多时候需要转义再用

* 其实就是区分 [\S\s]*  和   .*    的区分！！！！            ==前者包括换行符，后者不包只匹一行==          【看上面场景案例(?=ABC)】

  如果需要匹配跨行文本或保留换行符，则使用 "[\S\s]*" 可能更合适。而当只需匹配单行文本时，使用 ".*" 可能更简洁和直观。