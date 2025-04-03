
export default class About{
    id:number
    content:string
    medias:string
    mediaslinks:string

    constructor(about: About){
        this.id = about.id
        this.content = about.content
        this.medias = about.medias
        this.mediaslinks = about.mediaslinks
    }
} 
