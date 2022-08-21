export class EmbedForm {
  private color: string;
  private title: string;
  private url: string;
  private author: {
    name: string;
    icon_url: string;
    url?: string;
  };
  private description: string;
  private thumbnail: {
    url: string;
  };

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}
