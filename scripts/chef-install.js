function installChefClient(shell, installer){
    var cmd = "msiexec.exe /qn /i \"" + installer.Path + "\"";

    var result = shell.Run(cmd, 0 , true);
    return result;
}

function getFileObject(fso, filePath){
    var file = fso.GetFile(filePath);

    if (file.FileExists == false){
        return null;
    }

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
        WScript.Quit(1);
    }

    installerPath = args(0);

    var installer = getFileObject(fso, installerPath);
    if (installer == null){
        WScript.Quit(1);
    }

    var result = installChefClient(shell, installer);
    if (result != 0){
        WScript.Quit(1);
    }

    if (checkChefInstalled(fso, shell) == true){
        return
    } else {
        WScript.Quit(1);
    }
}

main();
