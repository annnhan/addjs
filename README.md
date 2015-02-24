AddJS
=====

在浏览网站的时候，常常会遇到恼人的广告，或者觉得某个网站图片太多，真想自己写写js来修改一下页面的内容。于是，就有了这个插件。

功能：在指定的url的网页中添加自定义的javascript脚本。

**现在就开始使用AddJS**

<!--more-->

首先从chrome商店安装AddJS： <a target="_black" href="https://chrome.google.com/webstore/detail/addjs/aoahkpekljaimojhfefaiibfdcnmlhdi?hl=zh-CN">https://chrome.google.com/webstore/detail/addjs/aoahkpekljaimojhfefaiibfdcnmlhdi?hl=zh-CN</a>

或者下载安装：<a href="http://cssha.com/download/addjs.crx">http://cssha.com/download/addjs.crx</a>

至此，AddJS就可以使用了。下面是一些基本功能的使用操作方法：

**添加脚本**

点击“添加脚本”按钮，输入以下信息，然后保存：

*   **url**： 一个url地址或正则表达式，当请求的URL与之匹配时，规则生效。（注意:如果是正则，不要填开头的<code>/</code>和结束的<code>/gi</code>，如<code>/.\*/gi</code>请写成<code>.\*</code>，并勾选后面的reg），
*   **script**：js脚本的内容， 如果以http://或者file:///开头，则会以此为url加载对应地址的脚本。

**启动/禁用**

勾选/取消对应规则前面的勾选框即可。

**编辑规则**

鼠标移到响应规则上，点击“编辑”。

**删除规则**

鼠标移到响应规则上，点击“删除”。

**批量导入规则**

点击“管理规则”按钮进入管理页，点击顶部“导入”按钮，即可导入规则列表文件。规则列表文件是一个json文件，其格式如下：

<pre lang="javascript" line="1">[
    {
        "req":"^https?:\\/\\/.*test.com",
        "res":"alert(111)",
        "reg": true,
        "checked":false
    },
    {
        "req":"http://hanan.com",
        "res":"http://cssha.com/myscript.js",
        "reg": false,
        "checked":true
    }
]
</pre>

其中相关字段含义如下：

*   **req**：规则需要匹配的url
*   **res**：脚本内容或地址
*   **reg**：是否正则匹配
*   **checked**：是否启用

 

**本插件开发过程中采用了以下开源项目，感谢支持：**

*   LESS
*   Bootstrap
*   AngularJS
