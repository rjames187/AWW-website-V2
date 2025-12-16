import './VoteLink.css'

interface VoteLinkProps {
  href: string;
  text: string;
}

function VoteLink({ href, text }: VoteLinkProps) {
  return (
    <a className="vote-link" href={href} target={'_blank'}>🗳️ {text}</a>
  )
}

export default VoteLink;