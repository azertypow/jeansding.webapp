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
  }
}
