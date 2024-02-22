# Obsidian Get Local Time

Uses a `timezone` or `time_zone` frontmatter property and populates a `localtime` or `local_time` frontmatter property with the current day/time in that timezone when the document is opened.

## Usage

> This plugin has no settings.

In the frontmatter of a file, simply create either a `time_zone` or `timezone` property and enter an official IANA timezone in it, ie. `America/Chicago`. Also create either a `local_time` or `localtime` property.

When the document is opened, the plugin will take your current time and automatically populate the `local_time`/`localtime` property with what day/time it currently is in that timezone.

https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

## Support the development of the plugin

<a href='https://ko-fi.com/JEBoothjr' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
