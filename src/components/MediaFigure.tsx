import { Link } from 'react-router-dom';
import type { CuratedPhoto } from '../data/gallery';

export function MediaCredit({ image, title = true }: { image: CuratedPhoto; title?: boolean }) {
  return <span className="media-credit">{title && <strong>{image.kind === 'diagram' ? 'Learning illustration: ' : ''}{image.title}. </strong>}{image.credit} · {image.license}. <Link to={`/collection?photo=${image.id}`}>Image details ↗</Link>{image.subjectNote && <span className="image-subject-note">{image.subjectNote}</span>}</span>;
}
export function MediaFigure({ image, className = '' }: { image: CuratedPhoto; className?: string }) {
  return <figure className={`article-photo ${image.kind === 'diagram' ? 'diagram-figure' : ''} ${className}`}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption><MediaCredit image={image} /></figcaption></figure>;
}
