export class EmbedForm {
  color: string;
  title: string;
  url: string;
  author: {
    name: string;
    icon_url: string;
    url?: string;
  };
  description: string;
  thumbnail: {
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
