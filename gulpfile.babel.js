/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:03:35 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-21 14:45:44
 */
import gulp from 'gulp';
import path from 'path';
import del from 'del';
import pump from 'pump';
import gulpLoadPlugins from 'gulp-load-plugins';
import babelCompiler from 'babel-core/register';
import * as isparta from 'isparta';
import rollupIncludePaths from 'rollup-plugin-includepaths';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';

const plugins = gulpLoadPlugins();
// const minify = composer(uglifyjs, console);

const paths = {
    include: ['./**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.babel.js'],
    file: ['src/class', 'src/lib', 'src/models', 'src/routes'],
    entry: 'src/app.js'
};

gulp.task('clean-bundle', () =>
    del(['dist/app.js', 'dist/app.js.map', '!dist'])
);

gulp.task('clean-bundle-min', () => {
    del(['dist/app.min.js', 'dist/app.min.js.map', '!dist'])
})

gulp.task('bundle', ['clean-bundle'], () => {
    gulp.src([...paths.include], { base: '.' })
        .pipe(plugins.rollup({
            entry: paths.entry,
            sourceMap: true,
            format: 'es',
            plugins: [
                rollupIncludePaths({
                paths: paths.file,
                }),
                plugins.babel({
                exclude: 'node_modules/**',
                presets: ['es2015-rollup']
                })
            ]
        }))
        .pipe(plugins.babel())
        .on('error', plugins.util.log)
        .pipe(plugins.rename('app.js'))
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('bundle-min', ['clean-bundle-min'], (cb) => {
    pump([
        gulp
            .src([...paths.include], { base: '.' })
            .pipe(plugins.rollup({
                entry: paths.entry,
                sourceMap: true,
                format: 'es',
                plugins: [
                    rollupIncludePaths({
                        paths: paths.file
                    }),
                    plugins.babel({
                        exclude: 'node_modules/**',
                        presets: ['es2015-rollup']
                    })
                ]
            }))
            .pipe(plugins.babel())
            .on('error', plugins.util.log)
            .pipe(plugins.rename('app.min.js'))
            .pipe(plugins.sourcemaps.write('.', {
                includeContent: false,
                sourceRoot(file) {
                    return path.relative(file.path, __dirname);
                }
            })),
            plugins.uglify(),
            gulp.dest('dist')
    ], cb);
});