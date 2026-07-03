export default function SplitText({ as: Tag = 'h2', className = '', children }) {
  const words = String(children).split(' ')
  return (
    <Tag className={className} aria-label={children}>
      {words.map((word, i) => (
        <span className="word" aria-hidden="true" key={i}>
          {[...word].map((c, j) => (
            <span className="char" key={j}>{c}</span>
          ))}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
