// import { Dungeon } from "../../public/phaser/dungeon";


const TILES = {
  TOP_LEFT_WALL: 3,
  TOP_RIGHT_WALL: 3,
  BOTTOM_RIGHT_WALL: 2,
  BOTTOM_LEFT_WALL: 2,
  TOP_WALL: [
    { index: 0, weight: 4 },
    { index: 0, weight: 1 }
  ],
  LEFT_WALL: [
    { index: 1, weight: 4 },
    { index: 1, weight: 1 }
  ],
  RIGHT_WALL: [
    { index: 1, weight: 4 },
    { index: 1, weight: 1 }
  ],
  BOTTOM_WALL: [
    { index: 0, weight: 4 },
    { index: 0, weight: 1 }
  ],
  FLOOR: [
    { index: 14, weight: 20 },
    { index: 14, weight: 1 }
  ]
};

export class DungeonMap {
  constructor(gameScene) {
    this.gameScene = gameScene;

    this.dungeon = new Dungeon({
      width: 50,
      height: 50,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true }
      }
    });
  }

  activeRoom;
  dungeon;
  map;
  player;
  cursors;
  cam;
  layer;
  lastMoveTime = 0;

  createDungeon() {
    const dungeon = new Dungeon({
      width: 50,
      height: 50,
      rooms: {
        width: { min: 7, max: 15, onlyOdd: true },
        height: { min: 7, max: 15, onlyOdd: true }
      }
    })

    var map = this.make.tilemap({ tileWidth: 16, tileHeight: 16, width: this.dungeon.width, height: this.dungeon.height });
  }





}

// Minified & modified dungeon generator at mikewesthad/dungeon (fork of nickgravelyn/dungeon)
!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.Dungeon=o():t.Dungeon=o()}("undefined"!=typeof self?self:this,function(){return function(t){function o(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}var e={};return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},o.p="",o(o.s=1)}([function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r={EMPTY:0,WALL:1,FLOOR:2,DOOR:3};o.default=r},function(t,o,e){"use strict";t.exports=e(2).default},function(t,o,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(t,o){var e=[],r=!0,i=!1,n=void 0;try{for(var h,a=t[Symbol.iterator]();!(r=(h=a.next()).done)&&(e.push(h.value),!o||e.length!==o);r=!0);}catch(t){i=!0,n=t}finally{try{!r&&a.return&&a.return()}finally{if(i)throw n}}return e}return function(o,e){if(Array.isArray(o))return o;if(Symbol.iterator in Object(o))return t(o,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=function(){function t(t,o){for(var e=0;e<o.length;e++){var r=o[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(o,e,r){return e&&t(o.prototype,e),r&&t(o,r),o}}(),a=e(3),s=e(4),u=r(s),f=e(0),l=r(f),d=e(5),m={width:50,height:50,rooms:{width:{min:5,max:15,onlyOdd:!1,onlyEven:!1},height:{min:5,max:15,onlyOdd:!1,onlyEven:!1},maxArea:150,maxRooms:50}},c=function(){function t(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t);var e=o.rooms||{};e.width=Object.assign({},m.rooms.width,e.width),e.height=Object.assign({},m.rooms.height,e.height),e.maxArea=e.maxArea||m.rooms.maxArea,e.maxRooms=e.maxRooms||m.rooms.maxRooms,e.width.min<3&&(e.width.min=3),e.height.min<3&&(e.height.min=3),e.width.max<e.width.min&&(e.width.max=e.width.min),e.height.max<e.height.min&&(e.height.max=e.height.min);var r=e.width.min*e.height.min;e.maxArea<r&&(e.maxArea=r),this.width=o.width||m.width,this.height=o.height||m.height,this.roomConfig=e,this.rooms=[],this.roomGrid=[],this.generate(),this.tiles=this.getTiles()}return h(t,[{key:"drawToConsole",value:function(t){(0,d.debugMap)(this,t)}},{key:"generate",value:function(){this.rooms=[],this.roomGrid=[];for(var t=0;t<this.height;t++){this.roomGrid.push([]);for(var o=0;o<this.width;o++)this.roomGrid[t].push([])}var e=this.createRandomRoom();e.setPosition(Math.floor(this.width/2)-Math.floor(e.width/2),Math.floor(this.height/2)-Math.floor(e.height/2)),this.addRoom(e);for(var r=5*this.roomConfig.maxRooms;this.rooms.length<this.roomConfig.maxRooms&&r>0;)this.generateRoom(),r-=1;for(var i=0;i<this.rooms.length;i++)for(var h=this.getPotentiallyTouchingRooms(this.rooms[i]),a=0;a<h.length;a++)if(!this.rooms[i].isConnectedTo(h[a])&&Math.random()<.2){var s=this.findNewDoorLocation(this.rooms[i],h[a]),u=n(s,2),f=u[0],l=u[1];this.addDoor(f),this.addDoor(l)}}},{key:"getRoomAt",value:function(t,o){return t<0||o<0||t>=this.width||o>=this.height?null:this.roomGrid[o][t][0]}},{key:"getMappedTiles",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t=Object.assign({},{empty:0,wall:1,floor:2,door:3},t),this.tiles.map(function(o){return o.map(function(o){return o===l.default.EMPTY?t.empty:o===l.default.WALL?t.wall:o===l.default.FLOOR?t.floor:o===l.default.DOOR?t.door:void 0})})}},{key:"addRoom",value:function(t){if(!this.canFitRoom(t))return!1;this.rooms.push(t);for(var o=t.top;o<=t.bottom;o++)for(var e=t.left;e<=t.right;e++)this.roomGrid[o][e].push(t);return!0}},{key:"canFitRoom",value:function(t){if(t.x<0||t.x+t.width>this.width-1)return!1;if(t.y<0||t.y+t.height>this.height-1)return!1;for(var o=0;o<this.rooms.length;o++)if(t.overlaps(this.rooms[o]))return!1;return!0}},{key:"createRandomRoom",value:function(){var t=0,o=0,e=0,r=this.roomConfig;do{t=(0,a.randomInteger)(r.width.min,r.width.max,{onlyEven:r.width.onlyEven,onlyOdd:r.width.onlyOdd}),o=(0,a.randomInteger)(r.height.min,r.height.max,{onlyEven:r.height.onlyEven,onlyOdd:r.height.onlyOdd}),e=t*o}while(e>r.maxArea);return new u.default(t,o)}},{key:"generateRoom",value:function(){for(var t=this.createRandomRoom(),o=150;o>0;){var e=this.findRoomAttachment(t);if(t.setPosition(e.x,e.y),this.addRoom(t)){var r=this.findNewDoorLocation(t,e.target),i=n(r,2),h=i[0],a=i[1];this.addDoor(h),this.addDoor(a);break}o-=1}}},{key:"getTiles",value:function(){for(var t=Array(this.height),o=0;o<this.height;o++){t[o]=Array(this.width);for(var e=0;e<this.width;e++)t[o][e]=l.default.EMPTY}for(var r=0;r<this.rooms.length;r++)for(var i=this.rooms[r],n=0;n<i.height;n++)for(var h=0;h<i.width;h++)t[n+i.y][h+i.x]=i.tiles[n][h];return t}},{key:"getPotentiallyTouchingRooms",value:function(t){for(var o=[],e=function(e,r,i){for(var n=i[r][e],h=0;h<n.length;h++)if(n[h]!=t&&o.indexOf(n[h])<0){var a=e-n[h].x,s=r-n[h].y;(a>0&&a<n[h].width-1||s>0&&s<n[h].height-1)&&o.push(n[h])}},r=t.x+1;r<t.x+t.width-1;r++)e(r,t.y,this.roomGrid),e(r,t.y+t.height-1,this.roomGrid);for(var i=t.y+1;i<t.y+t.height-1;i++)e(t.x,i,this.roomGrid),e(t.x+t.width-1,i,this.roomGrid);return o}},{key:"findNewDoorLocation",value:function(t,o){var e={x:-1,y:-1},r={x:-1,y:-1};return t.y===o.y-t.height?(e.x=r.x=(0,a.randomInteger)(Math.floor(Math.max(o.left,t.left)+1),Math.floor(Math.min(o.right,t.right)-1)),e.y=t.y+t.height-1,r.y=o.y):t.x==o.x-t.width?(e.x=t.x+t.width-1,r.x=o.x,e.y=r.y=(0,a.randomInteger)(Math.floor(Math.max(o.top,t.top)+1),Math.floor(Math.min(o.bottom,t.bottom)-1))):t.x==o.x+o.width?(e.x=t.x,r.x=o.x+o.width-1,e.y=r.y=(0,a.randomInteger)(Math.floor(Math.max(o.top,t.top)+1),Math.floor(Math.min(o.bottom,t.bottom)-1))):t.y==o.y+o.height&&(e.x=r.x=(0,a.randomInteger)(Math.floor(Math.max(o.left,t.left)+1),Math.floor(Math.min(o.right,t.right)-1)),e.y=t.y,r.y=o.y+o.height-1),[e,r]}},{key:"findRoomAttachment",value:function(t){var o=(0,a.randomPick)(this.rooms),e=0,r=0;switch((0,a.randomInteger)(0,3)){case 0:e=(0,a.randomInteger)(o.left+2-(t.width-1),o.right-2),r=o.top-t.height;break;case 1:e=o.left-t.width,r=(0,a.randomInteger)(o.top+2-(t.height-1),o.bottom-2);break;case 2:e=o.right+1,r=(0,a.randomInteger)(o.top+2-(t.height-1),o.bottom-2);break;case 3:e=(0,a.randomInteger)(o.left+2-(t.width-1),o.right-2),r=o.bottom+1}return{x:e,y:r,target:o}}},{key:"addDoor",value:function(t){for(var o=this.roomGrid[t.y][t.x],e=0;e<o.length;e++){var r=o[e],i=t.x-r.x,n=t.y-r.y;r.tiles[n][i]=l.default.DOOR}}}]),t}();o.default=c},function(t,o,e){"use strict";function r(t,o){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=e.onlyOdd,h=void 0!==r&&r,a=e.onlyEven,s=void 0!==a&&a;return h?n(t,o):s?i(t,o):Math.floor(Math.random()*(o-t+1)+t)}function i(t,o){t%2!=0&&t<o&&t++,o%2!=0&&o>t&&o--;var e=(o-t)/2;return 2*Math.floor(Math.random()*(e+1))+t}function n(t,o){t%2==0&&t++,o%2==0&&o--;var e=(o-t)/2;return 2*Math.floor(Math.random()*(e+1))+t}function h(t){return t[r(0,t.length-1)]}Object.defineProperty(o,"__esModule",{value:!0}),o.randomInteger=r,o.randomEvenInteger=i,o.randomOddInteger=n,o.randomPick=h},function(t,o,e){"use strict";function r(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function t(t,o){for(var e=0;e<o.length;e++){var r=o[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(o,e,r){return e&&t(o.prototype,e),r&&t(o,r),o}}(),n=e(0),h=function(t){return t&&t.__esModule?t:{default:t}}(n),a=function(){function t(o,e){r(this,t),this.width=o,this.height=e,this.setPosition(0,0),this.doors=[],this.tiles=[];for(var i=0;i<this.height;i++){for(var n=[],a=0;a<this.width;a++)0==i||i==this.height-1||0==a||a==this.width-1?n.push(h.default.WALL):n.push(h.default.FLOOR);this.tiles.push(n)}}return i(t,[{key:"setPosition",value:function(t,o){this.x=t,this.y=o,this.left=t,this.right=t+(this.width-1),this.top=o,this.bottom=o+(this.height-1),this.centerX=t+Math.floor(this.width/2),this.centerY=o+Math.floor(this.height/2)}},{key:"getDoorLocations",value:function(){for(var t=[],o=0;o<this.height;o++)for(var e=0;e<this.width;e++)this.tiles[o][e]==h.default.DOOR&&t.push({x:e,y:o});return t}},{key:"overlaps",value:function(t){return!(this.right<t.left)&&(!(this.left>t.right)&&(!(this.bottom<t.top)&&!(this.top>t.bottom)))}},{key:"isConnectedTo",value:function(t){for(var o=this.getDoorLocations(),e=0;e<o.length;e++){var r=o[e];if(r.x+=this.x,r.y+=this.y,r.x-=t.x,r.y-=t.y,!(r.x<0||r.x>t.width-1||r.y<0||r.y>t.height-1)&&t.tiles[r.y][r.x]==h.default.DOOR)return!0}return!1}}]),t}();o.default=a},function(t,o,e){"use strict";function r(t){var o=t.roomGrid.map(function(t){return t.map(function(t){return(""+t.length).padStart(2)})});console.log(o.map(function(t){return t.join(" ")}).join("\n"))}function i(t){var o,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e=Object.assign({},{empty:" ",emptyColor:"rgb(0, 0, 0)",wall:"#",wallColor:"rgb(255, 0, 0)",floor:"_",floorColor:"rgb(210, 210, 210)",door:".",doorColor:"rgb(0, 0, 255)",fontSize:"15px"},e);for(var r="",i=[],n=0;n<t.height;n+=1){for(var a=0;a<t.width;a+=1){var s=t.tiles[n][a];s===h.default.EMPTY?(r+="%c"+e.empty,i.push("color: "+e.emptyColor+"; font-size: "+e.fontSize)):s===h.default.WALL?(r+="%c"+e.wall,i.push("color: "+e.wallColor+"; font-size: "+e.fontSize)):s===h.default.FLOOR?(r+="%c"+e.floor,i.push("color: "+e.floorColor+"; font-size: "+e.fontSize)):s===h.default.DOOR&&(r+="%c"+e.door,i.push("color: "+e.doorColor+"; font-size: "+e.fontSize)),r+=" "}r+="\n"}(o=console).log.apply(o,[r].concat(i))}Object.defineProperty(o,"__esModule",{value:!0}),o.debugRoomGrid=r,o.debugMap=i;var n=e(0),h=function(t){return t&&t.__esModule?t:{default:t}}(n)}])});
