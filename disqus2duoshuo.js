var fs = require('fs');
var filePath = process.argv[2];

fs.readFile(filePath, function (err, buffer) {
    if (err)
        throw err;
    var data = buffer.toString('utf-8');

    var outputAll = new Object();

    // threads
    var inputThread = data.match(/\<thread[\s\S]*?\<\/thread\>/g);
    var outputThread = new Array();
    for (var i in inputThread) {
        var thread = new Object();
        thread.author_key = inputThread[i].match(/name\>(.*)\</)[1];
        thread.thread_key = inputThread[i].match(/thread dsq:id=\"(.*)\"/)[1];
        thread.title = inputThread[i].match(/title\>(.*)\</)[1];
        thread.url = inputThread[i].match(/link\>(.*)\</)[1];
        outputThread[i] = thread;
    }
    outputAll.threads = outputThread;

    // posts
    var inputPost = data.match(/\<post[\s\S]*?\<\/post\>/g);
    var outputPost = new Array();
    for (var j in inputPost) {
        var post = new Object();
        post.author_key = inputPost[j].match(/username\>(.*)\</)[1];
        post.post_key = inputPost[j].match(/post dsq:id=\"(.*)\"/)[1];
        post.thread_key = inputPost[j].match(/thread dsq:id=\"(.*)\"/)[1];
        post.author_name = inputPost[j].match(/name\>(.*)\</)[1];
        post.author_email = inputPost[j].match(/email\>(.*)\</)[1];
        post.ip = inputPost[j].match(/ipAddress\>(.*)\</)[1];
        post.message = inputPost[j].match(/p\>(.*)\<\/p/)[1].replace('<br>', '\n');
        post.created_at = inputPost[j].match(/createdAt\>(.*)\</)[1].split('T')[0] + ' '
                        + inputPost[j].match(/createdAt\>(.*)\</)[1].split('T')[1].split('Z')[0];
        if (inputPost[j].match(/parent dsq:id=\"(.*)\"/))
            post.parent_key = inputPost[j].match(/parent dsq:id=\"(.*)\"/)[1];
        else
            post.parent_key = '';
        outputPost[j] = post;
    }
    outputAll.posts = outputPost;

    // to JSON
    var ouputJSON = JSON.stringify(outputAll);
    fs.writeFile('import.json', ouputJSON, function (err) {
        if (err)
            throw err;
        console.log('It\'s saved! Please import this file to Duoshuo!!!');
    });
});
