import { TEXT_TYPE, VIEW_MODE } from './constants';

export interface File {
  fileName: string;
  language?: string; // if filename not include extension, you must add it
}

export interface DiffFile extends File {
  oldContent: string;
  newContent: string;
}

export interface DiffViewConfig {
  viewMode: VIEW_MODE;
}

export type TargetElement = HTMLElement | string;

export interface FileForView {
  [key: string]: any;
  type: TEXT_TYPE;
  count: number;
  content: {
    head: string[];
    hidden: string[];
    tail: string[];
  };
  leftOffset: number;
  rightOffset: number;
}

export interface Ctx {
  fileList: DiffFile[];
  fileForView: FileForView[];
}
