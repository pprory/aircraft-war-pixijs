const { series, parallel, task, src, dest, watch } = require('gulp'),
    uglify = require('gulp-uglify'), // 压缩js
    connect = require("gulp-connect"),
    sass = require('gulp-sass'),
    { createProxyMiddleware } = require('http-proxy-middleware'),
    babel = require('gulp-babel'),
    webpack = require('webpack-stream'),
    named = require('vinyl-named'),
    minifycss = require("gulp-minify-css"), //css压缩
    autoprefix = require('gulp-autoprefixer'), // CSS前缀
    htmlmin = require('gulp-htmlmin'), // HTML压缩
    del = require('del'), // 清空指定文件夹
    open = require('gulp-open'),
    ip = require('ip'), // 本地IP
    host = ip.address(),
    // host = 'localhost',
    port = '8888',

    app = {  // 定义目录
        srcPath: 'src/',
        buildPath: 'build/',
        distPath: 'dist/'
    }

task('lib', function () {
    return src(app.srcPath + 'lib/**/*')
        .pipe(dest(app.distPath + 'lib'))
        .pipe(connect.reload())
})

task('js', function () {
    return src(app.srcPath + 'js/*.js')
/*         .pipe(named({}))
        .pipe(webpack({
            mode:'production'
        })) */
        .pipe(babel({
            presets: ['babel-preset-env']
        }))
        .pipe(uglify())
        .pipe(dest(app.distPath + 'js'))
        .pipe(connect.reload())
})

task('plugins', function () {
    return src(app.srcPath + 'plugins/*.js')
        .pipe(dest(app.distPath + 'plugins'))
})
task('html', function () {
    return src(app.srcPath + '**/*.html')  /*src下所有目录下的所有.html文件*/
        .pipe(dest(app.distPath))//gulp.dest 要把文件放到指定的目标位置
        .pipe(connect.reload()) // 当内容发生改变时，重新加载。
})

const htmlMin = function () {  // html压缩
    return new Promise(resolve => {
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        src(app.srcPath + '**/*.html')
            .pipe(htmlmin(options))
            .pipe(dest(app.distPath))
        resolve();
    });
};

task('css', function () {
    return src(app.srcPath + 'css/*.css')
        .pipe(autoprefix('last 3 versions'))  // 前缀
        .pipe(minifycss())
        .pipe(dest(app.distPath + 'css'))
        .pipe(connect.reload())
})
task('sass', ()=> {
    return src('./src/sass/*.scss')
            .pipe(sass())
            .pipe(dest('./src/css'))
            .pipe(connect.reload())
})

task("images", function () {
    return src(app.srcPath + 'images/**/*')
        .pipe(dest(app.distPath + 'images'))
        .pipe(connect.reload())
})

task('watch', function () {
    watch(app.srcPath + "**.html", series("html"));
    watch(app.srcPath + "images/**/*", series("images"));
    watch(app.srcPath + "js/*.js", series("js"));
    watch(app.srcPath + "css/*.css", series("css"));
    watch(app.srcPath + "sass/*.scss", series("sass"));
});

task("server", function () {
    connect.server({
        root: "dist", // 设置根目录
        // root: "src", // 设置根目录
        host: host,
        port: port,
        livereload: true, // 启动实时刷新功能
        middleware: function (connect, opt) {
            return [
                createProxyMiddleware('/fs', {
                    target: 'https://www.kurogame.com',
                    changeOrigin: true,
                    pathRewrite: { // 路径重写规则 
                        '^/fs': ''
                    }
                })
            ]
        }
    })
})
const openInBrowser = function () {
    return new Promise(resolve => {
        let options = {
            uri: 'http://' + host + ':' + port,
            // app: 'chrome' // 指定浏览器打开
        };
        src(__filename)
            .pipe(open(options));
        resolve();
    })
};

const cleanBuild = function () {
    // 清除build下的文件
    return del([
        app.distPath + '**/*',
    ]);
};


// npm install --save-dev minimist gulp-util

const minimist = require('minimist'); // 参数解析引擎
const gutil = require('gulp-util');

// 默认development环境
var knowOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
};

var options = minimist(process.argv.slice(2), knowOptions);
// 生成filename文件，存入string内容
function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}

task('constants', function() {
  // 读入config.json文件
  var myConfig = require('./config.json');
  // 取出对应的配置信息
  var envConfig = myConfig[options.env];
//   console.log(JSON.stringify(envConfig)); // {"apiUrl":"http://applicationName.com/api/projectName/"}
  var conConfig = 'var apiConfig = ' + JSON.stringify(envConfig);
  // 生成config.js文件
  return string_src("config.js", conConfig)
      .pipe(dest(app.distPath))
});

// 启动服务 命令：gulp
// task('default', series(parallel(connectServe, watchCode, openInBrowser)));
task('dev', series(['html','plugins', 'js', 'lib', 'sass' , 'css', 'images']));
task('default', series('constants', parallel('server', 'watch', 'dev', openInBrowser)));

// 打包压缩 命令：gulp build --env production
task('dist', series(['plugins','js', 'lib','sass', 'css', 'images']));
// task('build', series(cleanBuild, parallel(htmlMin, imgMin, cssMin, jsMin)));
task('build', series(cleanBuild, parallel('constants', 'dist', htmlMin)));