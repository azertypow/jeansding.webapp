import type {Api} from "@/Utils/api";

export async function fetchImageData({articleName, fileName}: { articleName: string, fileName: string }): Promise<Api.IImage> {
    return await ( await window.fetch(`https://jeansdinge.sdrvl.ch/get/imageData?page=${encodeURIComponent(articleName)}&file=${fileName}` )).json()
}