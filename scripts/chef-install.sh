#!/bin/sh

script_dir=${0%/*}
package_dir="${script_dir}/../packages/"
arch=""
os_version=""


check_arch(){
    arch_string=`uname -m`
    if [ $arch_string = "x86_64" ] ; then
        arch=$arch_string
    else
        arch="i686"
    fi
}

check_osversion(){
    if [ -f /etc/redhat-release ] ; then
        os_version=`sed -n s/.\+\srelease\s\([0-9]\)\.[0-9].\+/\1/ /etc/redhat-release`
    fi
    if [ -n $os_version ] ; then
        # set default
        os_version="6"
    fi
}

install_chef_client(){
    package_path="${package_dir}chef-11.4.0-1.el${os_version}.${arch}.rpm"
    
    if [ ! -e $package_path ] ; then
        echo "${package_path} not found."
        exit 1
    fi
    
    rpm -ivh $package_path
}

init(){
    cd $script_dir

    if [ -n $arch ] ; then
        check_arch
    fi
    
    if [ -n $os_version ] ; then
        check_osversion
    fi
}

check_chef_installed(){
    rpm -q chef > /dev/null 2>&1
        
    if [ $? -eq 0 ] ; then
        return 1
    else
        return 0
    fi  
}

# main

check_chef_installed

if [ $? -eq 1 ] ; then
    echo "chef-client already installed."
    exit 1
fi

init

echo "Install chef-client start."

install_chef_client

check_chef_installed

if [ $? -eq 1 ] ; then
    echo "Install chef-client finished."
else
    echo "Install chef-client failed."
    exit 1
fi

