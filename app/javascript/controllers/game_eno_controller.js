import { Controller } from "@hotwired/stimulus"
import * as Phaser from "phaser"
import {Skeleton} from "../skeleton.js"
import {Knight} from "../knight.js"
import { loadAnimations } from "../game_loader.js"
import { DungeonMap } from "../dungeon_map.js"
// Connects to data-controller="game-eno"
export default class extends Controller {
  static values = {

  }

  connect() {
    console.log('connected')
  }
}
