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
  private fields: {
    name: string;
    value: string;
    inline?: boolean;
  }[];

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

  setUrl(url: string) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  setAuthor(author: { name: string; icon_url: string; url?: string }) {
    this.author = author;
  }

  getAuthor() {
    return this.author;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setThumbnail(thumbnail: { url: string }) {
    this.thumbnail = thumbnail;
  }

  getThumbnail() {
    return this.thumbnail;
  }

  setFields(field: { name: string; value: string; inline: boolean }) {
    this.fields.push(field);
  }

  getFields() {
    return this.fields;
  }
}
