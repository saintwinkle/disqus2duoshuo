使用说明
==============

####1、安装Node.js

####2、导出Disqus评论

收到邮件，下载.gz后缀的文件并解压。

####3、安装disqus2duoshuo

```
git clone https://github.com/saintwinkle/disqus2duoshuo.git
cd disqus2duoshuo
```

####4、XML to JSON

将解压后得到的文件`export-username-xxxxx`拷贝到`disqus2duoshuo`文件夹下，然后：
```
node disqus2duoshuo.js export-username-xxxxx
```

####5、导入JSON到多说

将得到的`import.json`导入多说。
