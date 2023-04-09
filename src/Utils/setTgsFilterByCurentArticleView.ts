import {stateStore} from "@/stores/stateStore";
import type {Api} from "@/Utils/api";

export function getTagsOfArticle(
    {projectSection, articleUid}: { projectSection: string, articleUid: string }): string[] {

    const currentArticle: Api.IArticle | null =
        stateStore().apiProjects[projectSection]?.children['mediapage/'+projectSection+'/'+articleUid]

    return currentArticle?.category?.split(",")
      .map(word => word.trim())
      .filter(category => { return category.length > 0 }) || []
}

export function getSlugOfLinkedObjectsOfArticle(
    {projectSection, articleUid}: { projectSection: string, articleUid: string }): string[] {

    const currentArticle: Api.IArticle | null =
        stateStore().apiProjects[projectSection]?.children['mediapage/'+projectSection+'/'+articleUid]
    return currentArticle?.Linkwith?.split(",").map(category => category.trim()).filter(category => { return category.length > 0 }) || []
}
