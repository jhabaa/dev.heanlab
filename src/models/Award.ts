export default class Award {
  logo: string;
  name: string;
  link: string;

  constructor(award: Award) {
    this.logo = award.logo;
    this.name = award.name;
    this.link = award.link;
  }
}
