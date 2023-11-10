import { DiffFile, DiffViewConfig } from './types';

class WebDiffView {
  private fileList: DiffFile[];
  private diffViewConfig: DiffViewConfig;
  constructor(fileList: DiffFile[], diffViewConfig: DiffViewConfig) {
    this.fileList = fileList;
    this.diffViewConfig = diffViewConfig;
  }
  render() {}
}
