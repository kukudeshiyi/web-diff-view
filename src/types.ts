import { VIEW_MODE } from './constants';

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
