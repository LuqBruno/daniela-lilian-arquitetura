import type { ImgHTMLAttributes, Ref } from 'react'
import { srcset, type Imagem } from '../data/assets'

type Props = {
  img: Imagem
  sizes: string
  prioridade?: boolean
  ref?: Ref<HTMLImageElement>
  alt?: string // "" quando a mesma imagem já foi descrita na página
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'alt' | 'width' | 'height'>

/** AVIF + WebP responsivos, com dimensões reservadas. Prioridade só para a imagem principal. */
export function Picture({ img, sizes, prioridade = false, alt = img.alt, ...rest }: Props) {
  const maior = img.larguras[img.larguras.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(img, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(img, 'webp')} sizes={sizes} />
      <img
        src={`${img.base}-${maior}.webp`}
        alt={alt}
        width={img.largura}
        height={img.altura}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        decoding={prioridade ? 'sync' : 'async'}
        {...rest}
      />
    </picture>
  )
}
