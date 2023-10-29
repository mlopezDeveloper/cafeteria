const { src, dest, watch } = require('gulp'); //importamos mas de una funcion
const sass = require('gulp-sass')(require('sass')); //importamos solo una funcion
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css( done ){
    //compilar sass
    //pasos: 1 identificar archivo, 2 Compilar, 3 Guardar el .css
    src('src/scss/app.scss')//identificamos el archivo
        .pipe( sass() )
        //.pipe( sass({ outputStyle: 'expanded' }) )//compilamos el archivo que importamos arriba
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( dest('build/css') )//guardamos en la carpeta build/css

    done();
}

function dev(){
    watch( 'src/scss/app.scss', css );
}



exports.css = css;
exports.dev = dev;
exports.default = tareaDefault;
