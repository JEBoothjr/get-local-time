/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GetLocalTimePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var { exec } = require("child_process");
var GetLocalTimePlugin = class extends import_obsidian.Plugin {
  getLocalTimeInTimeZone(timeZone) {
    const now = new Date();
    const options = {
      timeZone,
      month: "long",
      day: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const timeInTimeZone = formatter.format(now);
    return timeInTimeZone;
  }
  updateTimezone(file) {
    const cache = this.app.metadataCache.getFileCache(file);
    const fm = cache == null ? void 0 : cache.frontmatter;
    const timezone = (fm == null ? void 0 : fm.hasOwnProperty("timezone")) ? fm == null ? void 0 : fm.timezone : (fm == null ? void 0 : fm.hasOwnProperty("time_zone")) ? fm == null ? void 0 : fm.time_zone : null;
    const hasLocalTimeProperty = (fm == null ? void 0 : fm.hasOwnProperty("localtime")) || (fm == null ? void 0 : fm.hasOwnProperty("local_time"));
    if (!timezone || !hasLocalTimeProperty) {
      return;
    }
    const gmtTime = this.getLocalTimeInTimeZone(timezone);
    this.app.fileManager.processFrontMatter(file, (frontmatter) => {
      if (fm == null ? void 0 : fm.hasOwnProperty("local_time")) {
        frontmatter["local_time"] = gmtTime;
      } else {
        frontmatter["localtime"] = gmtTime;
      }
    });
  }
  async onload() {
    this.app.workspace.on("file-open", async (file) => {
      this.updateTimezone(file);
    });
  }
};
