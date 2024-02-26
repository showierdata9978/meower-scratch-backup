export interface ScratchPost {
  id: number;
  username: string;
  editor: string;
  deleted: boolean;
  time: {
    posted: string;
    first_checked: string;
    html_last_checked: string;
    bbcode_last_checked: string;
    edited: boolean;
  };
  content: {
    html: string;
    bb: string;
  };
  parser: {
    version: number;
    highest: number;
  };
  topic: {
    id: number;
    title: string;
    category: string;
    closed: number;
    deleted: number;
    time: {
      first_checked: string;
      last_checked: string;
    };
  };
}

export type ScratchDump = ScratchPost[];
