export namespace Api {
  export type ItemList = IItem[]

  export interface IItem {
    slug:           string
    title:          string
    id:             string
    text:           string
    tags:           string[]
    infoObject:     string
    infoMaterial:   string[]
    infoDate:       string
    infoLocation:   string
    infoMade_in:    string
    infoPrice:      string
    infoDimensions: string
    infoLoan:       string
    img:            {[key: string]: IImage}
  }

  export interface IProjects {
    "symposium": {
      "title":                string
      "description_title":    string
      "description_subtitle": string
      "description_author":   string
      "text":                 {[key: string]: string}
      "children":             {[key: string]: IArticle}
    }
    "artist-videos": {
      "title":                string
      "description_title":    string
      "description_subtitle": string
      "description_author":   string
      "text":                 {[key: string]: string}
      "children":             {[key: string]: IArticle}
    }
    "articles":      {
      "title":                string
      "description_title":    string
      "description_subtitle": string
      "description_author":   string
      "text":                 {[key: string]: string}
      "children":             {[key: string]: IArticle}
    }
    "projects": {
      "title":                string
      "description_title":    string
      "description_subtitle": string
      "description_author":   string
      "text":                 {[key: string]: string}
      "children":             {[key: string]: IArticle}
    }
  }

  export interface IImage {
    mediaUrl: string
  }

  export interface IArticle {
    title: string,
    subtitle: string,
    "vimeoLink": string,
    "author": string,
    "category": string,
    "description": string,
    "article_content": {[key: string]: string}
  }
}
