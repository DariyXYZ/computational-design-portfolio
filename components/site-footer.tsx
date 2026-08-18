import { home, person } from '@/content/site';
import { EmailIcon, GitHubIcon, TelegramIcon } from './icons';

/** Contact footer, shared by every page and the target of the `#contact` link. */
export function SiteFooter() {
  return (
    <footer id="contact">
      <div className="container">
        <p className="eyebrow">{home.contact.eyebrow}</p>
        <h2>{home.contact.heading}</h2>
        <ul className="contact-list">
          <li>
            <a href={`mailto:${person.email}`}>
              <EmailIcon /> Email
            </a>
          </li>
          <li>
            <a href={person.telegram} target="_blank" rel="noopener">
              <TelegramIcon /> Telegram
            </a>
          </li>
          <li>
            <a href={person.github} target="_blank" rel="noopener">
              <GitHubIcon /> GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
