class Project{
    id : number;
    Name: string;
    Description : string;
    Image : string;
    Link : string; 
    keywords : string;
    Title : string;
    Client : string; 
    Role  : string; 
    Frames : string; 
    Images: string; 
    Git: string;
    video:string

    constructor(_project : Project){
        this.id = _project.id;
        this.Name = _project.Name;
        this.Description = _project.Description;
        this.Image = _project.Image;
        this.Link = _project.Link;
        this.keywords = _project.keywords;
        this.Title = _project.Title;
        this.Client = _project.Client;
        this.Role = _project.Role;
        this.Frames = _project.Frames;
        this.Images = _project.Images;
        this.Git = _project.Git;
        this.video = _project.video
    }

    getImageUrl(imageName: string) : string {
        return new URL(`../assets/${imageName}`, import.meta.url).href;
    }

}

export default Project;