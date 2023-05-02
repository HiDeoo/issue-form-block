import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const defaultLinkRenderer =
  md.renderer.rules['link_open'] ??
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules['link_open'] = function (tokens, idx, options, env, self) {
  tokens[idx]?.attrPush(['target', '_blank'])

  return defaultLinkRenderer(tokens, idx, options, env, self)
}

export function getMarkdownHtml(markdown?: string): string {
  return markdown ? md.render(markdown) : ''
}
