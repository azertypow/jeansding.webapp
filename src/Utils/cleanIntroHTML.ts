export function cleanIntroHTML(html: string) {
  const introHtml = new DOMParser().parseFromString(html, 'text/html')
  const firstPElement = introHtml.body.querySelector('p')
  if(firstPElement == null) return 'read &#8594;'
  firstPElement.querySelector('article-footnote')?.remove()
  return firstPElement.innerHTML
}
