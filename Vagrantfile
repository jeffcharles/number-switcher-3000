# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 3001, host: 3001

  config.vm.provision "docker" do |d|
    d.build_image "/vagrant", args: "-t number-switcher-3000"
    d.run "number-switcher-3000", args: "-p 3001:3000"
  end
end
