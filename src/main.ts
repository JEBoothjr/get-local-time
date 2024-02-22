import { Plugin, FileManager, TFile } from 'obsidian';
const { exec } = require('child_process');

export default class GetLocalTimePlugin extends Plugin {
  getLocalTimeInTimeZone(timeZone:string) {
    const now = new Date();
    const options:Intl.DateTimeFormatOptions = {
      timeZone: timeZone,
      month: 'long',
      day: 'numeric',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
  
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const timeInTimeZone = formatter.format(now);
  
    return timeInTimeZone;
  }

  updateTimezone(file:TFile) {
    const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter;
      const timezone = fm?.hasOwnProperty('timezone') ? fm?.timezone : fm?.hasOwnProperty('time_zone') ? fm?.time_zone : null;
      const hasLocalTimeProperty = fm?.hasOwnProperty('localtime') || fm?.hasOwnProperty('local_time');
      if(!timezone || !hasLocalTimeProperty){
        return;
      }
      const gmtTime = this.getLocalTimeInTimeZone(timezone);

      this.app.fileManager.processFrontMatter(file, (frontmatter) => {
        if(fm?.hasOwnProperty('local_time')){
          frontmatter["local_time"] = gmtTime;
        }else{
          frontmatter["localtime"] = gmtTime;
        }
    });
  }

  async onload() {
    this.app.workspace.on('file-open', async (file: TFile) => {
      this.updateTimezone(file);
    });
	}
}
