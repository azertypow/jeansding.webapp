export function cleanIntroHTML(html: string) {
  const introHtml = new DOMParser().parseFromString(html, 'text/html')
  return introHtml.body.querySelector('p')?.innerHTML || ''
}
