import { dict } from "./dictionary";

interface I18nProps {
  lang?: string;
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
      if (!this.loadDictionaryFile(this._lang)) {
        throw "Can not load language file";
      }
    }
  };

  loadDictionaryFile (lang: string) {
    try {
      this._dict = dict(lang);
      return !!this._dict;
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