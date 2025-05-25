export default class Prototype {
  id: number;
  Name: string;
  Description: string;
  Image: string;
  keywords: string;
  Title: string;
  Frames: string;

  constructor(_prototype: Prototype) {
    this.id = _prototype.id;
    this.Description = _prototype.Description;
    this.Name = _prototype.Name;
    this.Image = _prototype.Image;
    this.keywords = _prototype.keywords;
    this.Title = _prototype.Title;
    this.Frames = _prototype.Frames;
  }

  getImageUrl() {
    return `/images/${this.Image}`;
  }
  getMainLink() {
    return "prototypes";
  }
}
