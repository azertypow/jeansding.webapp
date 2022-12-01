import {stateStore} from "@/stores/stateStore";
import type {Api} from "@/Utils/api";

export function getTagsOfArticle(
    {projectSection, articleUid}: { projectSection: string, articleUid: string }): string[] {

    const currentArticle: Api.IArticle | null =
        stateStore().apiProjects[projectSection]?.children['mediapage/'+projectSection+'/'+articleUid]

    return currentArticle?.category.split(",")
}