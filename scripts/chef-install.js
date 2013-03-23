function installChefClient(shell, installer){
    var cmd = "msiexec.exe /qn /i \"" + installer.Path + "\"";

    var result = shell.Run(cmd, 0 , true);
    return result;
}

function getFileObject(fso, installerPath){
    var installer = fso.GetFile(installerPath);

    if( installer.FileExists == false ){
        return null;
    }

    return installer;
}

function main(){
    var args = WScript.Arguments;
    var fso = WScript.CreateObject("Scripting.FileSystemObject");
    var shell = WScript.CreateObject("WScript.Shell");

    installerPath = args(0);

    var installer = getFileObject(fso, installerPath);
    if( installer == null ){
        WScript.Quit(1);
    }

    var result = installChefClient(shell, installer);
    if( result != 0 ){
        WScript.Quit(1);
    }
}

main();
