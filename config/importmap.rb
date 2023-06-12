# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "phaser", preload: true
pin "dat.gui", to: "https://ga.jspm.io/npm:dat.gui@0.7.9/build/dat.gui.module.js"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "@popperjs/core", to: "popper.js", preload: true
pin 'game_loader', preload: true
pin 'healthbar', preload: true
pin 'knight', preload: true
pin 'skeleton', preload: true
pin 'phaser_health', preload: true
pin 'weapon', preload: true
pin 'pause_scene', preload: true
pin 'coin', preload: true
pin 'coin_count', preload: true
pin 'potion', preload: true
pin "typed.js", to: "https://ga.jspm.io/npm:typed.js@2.0.16/dist/typed.module.js"
