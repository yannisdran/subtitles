# Code School Course Subtitles

This repository holds all of the subtitles currently available for Code School courses.
For now we focus exclusively on English subtitles but if you wish to translate the
subtitles into a different language we accept pull requests and will deploy these
subtitles (after review) to our courses for the benefit of all.

## Contributing
Feel free to fork this repository and work on new subtitle files in your own fork.
Once you've completed at least a whole video subtitle file, feel free to open a pull
request to discuss it and we'll do our best to get it merged in a timely manner.

Please name the subtitle files as follows:
- `level1-en.srt` for English
- `level1-fr.srt` for French
- `level1-es.srt` for Spanish

You can find a list of the [ISO 639-1 language codes on Wikipedia](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) if you're not sure
which one to use.

### subtitle-converter

Once you have added a new subtitle in SRT format, you can create a WebVTT copy
by running `node subtitle-converter` in the root directory of this repository.
For example, if you added `my-cool-course/level1-en.srt` then you can make a
WebVTT copy using:

``` shell
npm install
node subtitle-converter --i "my-cool-course/level1-en.srt"
```

*Options*

- Input Path(s): `--i "path/to/file.srt"`
  - Specify the subtitle files to convert
  - Accepts glob patterns, such as `"*/level1-*.srt"`
  - If you do not include an input path, the default path (`"**/*.srt"`) will be used
- Output Folder: `--o "output/files/here/"`
  - Specify the output folder
  - If you do not include an output folder, the files will be generated in the same directory as the input files

If you have a Code School account, make sure to let us know what your username is in
your pull request. Wouldn't be surprised if you get some free stuff. :-)

## Deployment on Code School
We will only release new subtitles to a course when all videos for all levels have
been translated.
