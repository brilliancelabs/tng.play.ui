var scripts = {};

scripts.Lib = [
    "lib/angular/1.2.6/angular.min.js",
    "lib/angular/1.2.6/angular-route.min.js",
    "lib/angular/1.2.6/angular-touch.min.js",
    "lib/firebase/0.0.0/firebase.js",
    "lib/firebase/0.0.0/firebase-simple-login.js",
    "https://cdn.firebase.com/libs/angularfire/0.5.0/angularfire.min.js"
];

scripts.App = [
    "app/app.js",
    "app/services/current_player.js",
    "app/services/current_round.js"
];

scripts.Auth = [
	"app/controllers/users.js",
	"app/services/firebase_auth.js"
];

scripts.PlaySetup = [
    "app/routes/play_setup.js",
    "app/services/play_setup.js",
    "app/controllers/play_setup.js"
];

scripts.PlayTracking = [
    "app/routes/play_tracking.js",
    "app/services/play_tracking.js",
    "app/controllers/play_tracking.js"
];

scripts.Test = [
//    "test/spec/play_setup_spec.js"
];

for(var scriptCategory in scripts){

    document.writeln( "<!--[START] "+ scriptCategory +"-->"+"\n" );

    scripts[scriptCategory].forEach(function( scriptFile ){
        var startingPositionOfExtension = scriptFile.lastIndexOf('.');
        var extensionSize = scriptFile.length - startingPositionOfExtension;
        var extension = scriptFile.substr(startingPositionOfExtension, extensionSize);
        var scriptTypes = {
            ".js": "text/javascript"
        };

        document.writeln( '<script type="'+scriptTypes[extension]+'" src="'+scriptFile+'"></script>'+ '\n');
    });
};