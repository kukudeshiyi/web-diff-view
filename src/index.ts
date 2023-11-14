import { COLLAPSE_LENGTH, EOL, TEXT_TYPE } from './constants';
import { DiffFile, DiffViewConfig, TargetElement, FileForView } from './types';
import { diffLines, diffChars, Change } from 'diff';

class WebDiffView {
  private fileList: DiffFile[];
  private diffViewConfig: DiffViewConfig;
  private html: string;
  private targetElement: HTMLElement | null;

  constructor(
    fileList: DiffFile[],
    diffViewConfig: DiffViewConfig,
    targetElement: TargetElement
  ) {
    this.fileList = fileList;
    this.diffViewConfig = diffViewConfig;
    this.targetElement =
      typeof targetElement === 'string'
        ? document.querySelector('#' + targetElement)
        : targetElement;
    // validate params
    // merge default configs
    // diff & handle after diff
    // off-screen render
    this.html = this.offScreenRender();
  }

  offScreenRender() {
    // const ctx = {
    //   fileList: this.fileList,
    //   fileForView:,
    // };
    const diffFiles = this.fileList.map((file) => {
      return diffLines(file.oldContent, file.newContent);
    });

    return '';
  }
  createFileForView(diffFiles: Array<Change[]>) {
    return diffFiles.map((diffFile) => {
      let leftOffset = 1,
        rightOffset = 1;
      diffFile.map((change, index) => {
        const { added, removed, value } = change;
        const type = added
          ? TEXT_TYPE.ADD
          : removed
          ? TEXT_TYPE.REMOVE
          : TEXT_TYPE.NORMAL;
        const lines = value.split(EOL);
        const count = lines.length;
        const res: FileForView = {
          type,
          count,
          content: {
            head: [],
            hidden: [],
            tail: [],
          },
          leftOffset,
          rightOffset,
        };
        switch (type) {
          case TEXT_TYPE.ADD:
            res.content.head.push(...lines);
            rightOffset += count;
            break;
          case TEXT_TYPE.REMOVE:
            res.content.head.push(...lines);
            leftOffset += count;
            break;
          case TEXT_TYPE.NORMAL:
            if (count <= COLLAPSE_LENGTH) {
              res.content.head.push(...lines);
            } else {
              const BLOCK_LENGTH = Math.floor(COLLAPSE_LENGTH / 2);
              res.content.head.push(...lines.slice(0, BLOCK_LENGTH));
              res.content.hidden.push(
                ...lines.slice(BLOCK_LENGTH, count - BLOCK_LENGTH)
              );
              res.content.tail.push(...lines.slice(count - BLOCK_LENGTH));
            }
            leftOffset += count;
            rightOffset += count;
        }
        return res;
      });
    });
  }
  render() {}
  highlight() {}
}
