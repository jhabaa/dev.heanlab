export default class Technology {
  id: number;
  name: string;
  logo: string;
  level: number;

  constructor(technology: Technology) {
    this.id = technology.id;
    this.name = technology.name;
    this.logo = technology.logo;
    this.level = technology.level;
  }

  getImageUrl() {
    return `/images/${this.logo}`;
  }
}
