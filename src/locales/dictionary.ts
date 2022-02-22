const ja = {
  "menu_bar": {
    "file_menu": {
      "label": "ファイル",
      "open": "ファイルを開く",
      "save": "保存",
      "save_as": "名前を付けて保存",
      "close": "終了",
      "create_new": "新規ファイル作成"
    },
    "tool_menu": {
      "label": "ツール",
      "gen_uuid": "UUID挿入(ver.4)"
    },
    "option_menu": {
      "label": "オプション",
      "config": "コンフィグ",
    },
  },
  "dialog": {
    "buttons": {
      "yes": "はい",
      "no": "いいえ"
    },
    "messages": {
      "confirm_file_change": "編集中の内容を破棄してもよろしいですか？",
    }
  },
  "config": {
    "config_menu": {
      "top": {
        "label": "トップ",
        "description": ""
      },
      "language": {
        "label": "Language",
        "description": ""
      },
      "text": {
        "label": "テキスト",
        "description": ""
      },
      "close": {
        "label": "閉じる",
        "description": ""
      }
    },
    "main_page": {
      "main": "サイドメニューから設定を開いてください。",
    },
  }
};

const en = {
  "menu_bar": {
    "file_menu": {
      "label": "File",
      "open": "Open..",
      "save": "Save..",
      "save_as": "SaveAs..",
      "close": "Close",
      "create_new": "CreateNewFile"
    },
    "tool_menu": {
      "label": "Tool",
      "gen_uuid": "InsertUUID(ver.4)"
    },
    "option_menu": {
      "label": "Option",
      "config": "Config",
    },
  },
  "dialog": {
    "buttons": {
      "yes": "Yes",
      "no": "No"
    },
    "messages": {
      "confirm_file_change": "Are you sure you want to discard changes?"
    }
  },
  "config": {
    "config_menu": {
      "top": {
        "label": "Top",
        "description": "",
      },
      "language": {
        "label": "Language",
        "description": "",
      },
      "text": {
        "label": "Text",
        "description": "",
      },
      "close": {
        "label": "Close",
        "description": "",
      }
    },
    "main_page": {
      "main": "Open Settings from the side menu.",
    },
  }
};

export const dict = (lang: string) => {
  switch (lang) {
    case "ja":
      return ja;
    case "en":
      return en;
    default:
      return;
  }
};

