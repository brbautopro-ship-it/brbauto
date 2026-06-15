import { useEffect } from 'react'

const SITE_URL = 'https://brbautopro.fr'

function upsertMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SEO({ title, description, path = '/' }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    if (title) document.title = title
    if (description) upsertMeta('name', 'description', description)
    if (title) upsertMeta('property', 'og:title', title)
    if (description) upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertLink('canonical', url)
  }, [title, description, path])

  return null
}
