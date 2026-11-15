import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, CodeXml as Github, ExternalLink, MapPin, Search, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaProjectDiagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiGooglescholar } from 'react-icons/si';
import { categories, projects, type Category } from './data';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function App() {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'featured' | 'az' | 'za'>('featured');

  const visibleProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesCategory = category === 'All' || project.categories.includes(category);
      const searchable = `${project.title} ${project.description} ${project.categories.join(' ')} ${project.tags.join(' ')}`.toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });
    if (sort === 'az') return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [category, query, sort]);

  return <>
    <main>
      <section id="about" className="hero wrap">
        <div className="hero-copy">
          <p className="hero-location"><MapPin />Dhaka, Bangladesh</p>
          <h1>Md. Meheraz Hossain Chayan</h1>
          <p className="role">Software Engineer</p>
          <p className="intro">I build reliable and user friendly software for web, AI, healthcare, security, and intelligent systems.</p>
          <div className="hero-actions">
            <a className="btn" href="https://scholar.google.com/citations?user=Eh3urZ8AAAAJ&hl=en" target="_blank" rel="noreferrer"><SiGooglescholar />Google Scholar</a>
            <a className="btn" href="https://www.linkedin.com/in/meherazchayan/" target="_blank" rel="noreferrer"><FaLinkedin />LinkedIn</a>
            <a className="btn" href="https://github.com/MeherazChayan" target="_blank" rel="noreferrer"><FaGithub />GitHub</a>
            <a className="btn" href="https://mail.google.com/mail/?view=cm&fs=1&to=meheraz.chayan@gmail.com" target="_blank" rel="noreferrer"><MdEmail />Email</a>
          </div>
        </div>
        <div className="portrait-wrap"><div className="portrait"><img src={asset('/portrait.jpg')} alt="Md. Meheraz Hossain Chayan" /></div></div>
      </section>

      <section id="projects" className="projects-section">
        <div className="wrap">
          <header className="section-head"><h2><FaProjectDiagram aria-hidden="true" />Projects</h2></header>

          <div className="filter-panel">
            <div className="category-list" aria-label="Filter projects by category">
              {(['All', ...categories] as const).map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}<span>{item === 'All' ? projects.length : projects.filter((project) => project.categories.includes(item)).length}</span></button>)}
            </div>
            <div className="utility-controls">
              <label className="search-box"><Search /><span className="sr-only">Search projects</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}</label>
              <label className="sort-box"><span className="sr-only">Sort projects</span><select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="featured">Featured order</option><option value="az">Name: A—Z</option><option value="za">Name: Z—A</option></select><ChevronDown /></label>
            </div>
          </div>

          <div className="result-row"><span>{visibleProjects.length} project{visibleProjects.length === 1 ? '' : 's'}</span><span>{category === 'All' ? 'All categories' : category}</span></div>

          {visibleProjects.length ? <div className="project-grid">
            {visibleProjects.map((project) => <article className="project-card" key={project.title}>
              <div className="card-categories">{project.categories.map((item) => <span key={item}>{item}</span>)}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a href={project.url} target="_blank" rel="noreferrer">{project.linkLabel}{project.url.includes('github.com') ? <Github /> : project.url.includes('youtube.com') ? <ExternalLink /> : <ArrowUpRight />}</a>
            </article>)}
          </div> : <div className="empty-state"><h3>No matching projects</h3><p>Try a different search or category.</p><button onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</button></div>}
        </div>
      </section>
    </main>

    <footer><span>Md. Meheraz Hossain Chayan</span><span>Project Portfolio · {new Date().getFullYear()}</span></footer>
  </>;
}
