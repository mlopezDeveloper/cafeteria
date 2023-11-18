const { src, dest, watch, series, parallel } = require('gulp'); //importamos mas de una funcion

//dependencia de CSS y SASS
const sass = require('gulp-sass')(require('sass')); //importamos solo una funcion
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ){
    //compilar sass
    //pasos: 1 identificar archivo, 2 Compilar, 3 Guardar el .css
    src('src/scss/app.scss')//identificamos el archivo
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        //.pipe( sass({ outputStyle: 'expanded' }) )//compilamos el archivo que importamos arriba
        .pipe( postcss([ autoprefixer(), cssnano() ]) )//postcss puede tomar varios plugins en este caso tenemos 2
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') )//guardamos en la carpeta build/css

    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp(){//para que funcion tiene que ser imagenes jpg o png
    //se utiliza para crear una version mas ligera de las imagenes de tu sitio web
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe ( webp( opciones ) )
        .pipe ( dest('build/img') )
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe ( avif( opciones ) )
        .pipe ( dest('build/img') )
}

function dev(){
    watch( 'src/scss/**/*.scss', css ); //comodin, busca todos los archivos .scss
    watch( 'src/img/**/*', imagenes );
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );


//Series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
//Parallet - Todas inician al mismo tiempo