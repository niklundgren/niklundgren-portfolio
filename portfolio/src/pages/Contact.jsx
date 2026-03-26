import { useMemo, useState } from 'react';
import './Contact.css';

const CONTACT = {
  email: 'nwlundgren@ucdavis.edu',
  phoneLabel: '(805) 433-5953',
  phoneHref: 'tel:+18054335953',
  linkedin: 'https://linkedin.com/in/niklundgren',
  scholar: 'https://scholar.google.com/scholar?q=%22Nicholas+W.+Lundgren%22',
};

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const mailtoHref = useMemo(() => {
    const subject = form.subject || 'Portfolio inquiry';
    const lines = [
      form.name ? `Name: ${form.name}` : null,
      form.email ? `Email: ${form.email}` : null,
      '',
      form.message || 'I am reaching out about a data-driven materials science opportunity.',
    ].filter(Boolean);

    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }, [form]);

  const updateField = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <p className="contact-eyebrow">Open To Opportunities</p>
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-intro">
          I&apos;m interested in data-driven materials science roles that need someone
          who can model, visualize, and clearly communicate complex physical data.
          If you&apos;re hiring for work at the intersection of simulation, scientific
          software, and technical storytelling, I&apos;d be glad to talk.
        </p>
      </header>

      <section className="contact-grid">
        <div className="contact-card contact-card-form">
          <p className="contact-card-label">Send A Note</p>
          <h2 className="contact-card-title">Email Draft</h2>
          <p className="contact-card-copy">
            Fill this out and launch your email client with a prefilled message,
            or use the direct links alongside it.
          </p>

          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Name</span>
              <input value={form.name} onChange={updateField('name')} placeholder="Your name" />
            </label>
            <label className="contact-field">
              <span>Email</span>
              <input value={form.email} onChange={updateField('email')} placeholder="you@example.com" />
            </label>
            <label className="contact-field contact-field-full">
              <span>Subject</span>
              <input value={form.subject} onChange={updateField('subject')} placeholder="Opportunity, collaboration, or question" />
            </label>
            <label className="contact-field contact-field-full">
              <span>Message</span>
              <textarea
                value={form.message}
                onChange={updateField('message')}
                rows={8}
                placeholder="Tell me about the role, team, or project."
              />
            </label>
          </div>

          <div className="contact-actions">
            <a className="contact-primary" href={mailtoHref}>
              Compose Email
            </a>
            <a className="contact-secondary" href={`mailto:${CONTACT.email}`}>
              Copy-Free Email Link
            </a>
          </div>
        </div>

        <div className="contact-card contact-card-links">
          <p className="contact-card-label">Direct Links</p>
          <h2 className="contact-card-title">Reach Me Here</h2>
          <div className="contact-links-list">
            <a className="contact-link-row" href={`mailto:${CONTACT.email}`}>
              <span className="contact-link-name">Email</span>
              <span className="contact-link-value">{CONTACT.email}</span>
            </a>
            <a
              className="contact-link-row"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-link-name">LinkedIn</span>
              <span className="contact-link-value">linkedin.com/in/niklundgren</span>
            </a>
            <a
              className="contact-link-row"
              href={CONTACT.scholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-link-name">Google Scholar</span>
              <span className="contact-link-value">Search profile and publications</span>
            </a>
            <a className="contact-link-row" href={CONTACT.phoneHref}>
              <span className="contact-link-name">Phone</span>
              <span className="contact-link-value">{CONTACT.phoneLabel}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
