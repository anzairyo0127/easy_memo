import fs from "fs";

interface I18nProps {
  lang?: string;
  nameSpace?: string;
  dir?: string;
}

// https://blog.katsubemakito.net/nodejs/electron/electron-i18n
export class I18n {
  static DEFAULT_LANG = "ja";
  static SUPPURT_LANG = ["ja", "en"];

  public _nameSpace: string = "default";
  public _lang: string = "";
  public _dir: string = "./locales";
  public _dict: any = undefined;

  constructor (props?: I18nProps) {
    if (props) {
      if (props.lang && I18n.SUPPURT_LANG.includes(props.lang)) {
        this._lang = props.lang;
      }
      if (props.nameSpace) {
        this._nameSpace = props.nameSpace;
      }
      if (props.dir) {
        this._dir = props.dir;
      };
      if (!this.loadDictionaryFile(`${this._dir}/${this._nameSpace}/${this._lang}.json`)) {
        throw "Can not load language file";
      }
    }
  };

  loadDictionaryFile (path: string) {
    try {
      this._dict = JSON.parse(fs.readFileSync(path, "utf-8"));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  t(key: string) {
    const keys = key.split('.');
    let value = this._dict;
    for (let layer = 0, recursive = keys.length; layer <= recursive - 1; layer++) {
      value = value[keys[layer]];
    };
    return value;
  }
}