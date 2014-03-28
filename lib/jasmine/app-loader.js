var scripts = {};

scripts.Lib = [
    "../../../lib/angular/1.2.6/angular.min.js",
    "../../../lib/angular/1.2.6/angular.min.js.map",
    "../../../lib/angular/1.2.6/angular-route.min.js",
    "../../../lib/angular/1.2.6/angular-route.min.js.map"
];

scripts.FileToEvaluate = [
    "../../../app/app.js"
];

scripts.SpecFiles = [
    "../../../test/spec/play_setup_spec.js"
];

for(var scriptCategory in scripts){

    document.writeln( "<!--[START] "+ scriptCategory +"-->"+"\n" );

    scripts[scriptCategory].forEach(function( scriptFile ){

        document.writeln( '<script type="text/javascript" src="'+scriptFile+'"></script>'+ '\n');

    });
};