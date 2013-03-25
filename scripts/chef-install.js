function installChefClient(shell, installer){
    var cmd = "msiexec.exe /qn /i \"" + installer.Path + "\"";

    var result = shell.Run(cmd, 0 , true);
    return result;
}

function getFileObject(fso, filePath){
    if (fso.FileExists(filePath) == false){
        return null;
    }

    var file = fso.GetFile(filePath);

    return file;
}

function checkChefInstalled(fso, shell){
    var chefClientPath = "C:\\opscode\\chef\\bin\\chef-solo.bat";
    var chefClient = getFileObject(fso, chefClientPath);

    if (chefClient == null){
        return false;
    }

    var result = shell.Run(chefClient.Path + " -version", 0, true);

    if (result == 0){
        return true;
    } else{
        return false;
    }
}

function main(){
    var args = WScript.Arguments;
    var fso = WScript.CreateObject("Scripting.FileSystemObject");
    var shell = WScript.CreateObject("WScript.Shell");

    if (checkChefInstalled(fso, shell) == true){
        WScript.Echo("chef-client already installed.");
        WScript.Quit(1);
    }

    installerPath = args(0);

    var installer = getFileObject(fso, installerPath);
    if (installer == null){
        WScript.Echo(installer.Path + " not found.");
        WScript.Quit(1);
    }

    WScript.Echo("Install chef-client start.");
    var result = installChefClient(shell, installer);
    if (result != 0){
        WScript.Echo("Install chef-client failed.");
        WScript.Quit(1);
    }

    if (checkChefInstalled(fso, shell) == true){
        WScript.Echo("Install chef-client finished.");
    } else {
        WScript.Echo("Checking chef-client failed.");
        WScript.Quit(1);
    }
}

main();
