import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe2,
  Star,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { getProjectBySlug } from "../services/projectApi";

const ProjectDetail = ({ language = "en" }) => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );

  if (notFound || !project)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <h2 className="text-2xl font-bold text-red-500">Project not found</h2>
      </div>
    );

  const displayTitle =
    language === "km" ? project.title_km || project.title : project.title;
  const displayTagline =
    language === "km" ? project.tagline_km || project.tagline : project.tagline;
  const displaySynopsis =
    language === "km"
      ? project.synopsis_km ||
        project.synopsis ||
        project.short_description_km ||
        project.short_description
      : project.synopsis || project.short_description;

  // ── Fix trailer URL ──────────────────────────────────
  // youtube_id = null → extract from trailer_url
  let youtubeUrl = "";
  if (project.youtube_id) {
    youtubeUrl = `https://www.youtube.com/watch?v=${project.youtube_id}`;
  } else if (project.trailer_url) {
    youtubeUrl = project.trailer_url; // use directly (youtu.be link)
  }

  const phases = [
    "Development",
    "Pre-Production",
    "Production",
    "Post-Production",
    "Completed",
  ];
  const currentPhaseIndex = phases.indexOf(project.status);
  const tabs = ["overview", "cast", "awards", "details"];

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative">
        {project.banner_image && (
          <div className="absolute inset-0 h-[520px]">
            <img
              src={project.banner_image}
              alt=""
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a2e]/70 to-[#1a1a2e]" />
          </div>
        )}

        <div className="relative container-custom pt-28 pb-8 px-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={project.poster_image}
                alt={displayTitle}
                className="w-[260px] rounded-xl shadow-2xl border border-white/10 object-cover"
                style={{ height: "390px" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 py-2">
              <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm mb-3">
                {project.genre && (
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold uppercase">
                    {project.genre}
                  </span>
                )}
                {project.year && (
                  <>
                    <span>•</span>
                    <span>{project.year}</span>
                  </>
                )}
                {project.duration && (
                  <>
                    <span>•</span>
                    <span>{project.duration} min</span>
                  </>
                )}
              </div>

              {/* Title + Rating */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {displayTitle}
                </h1>
                <div className="flex-shrink-0 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                  <Star
                    className="text-yellow-400"
                    fill="currentColor"
                    size={30}
                  />
                  <div>
                    <div className="text-2xl font-bold">
                      {project.rating || "N/A"}
                      <span className="text-sm text-gray-400">/10</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {project.votes || 0} votes
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              {displayTagline && (
                <div className="mb-4">
                  <p className="text-xs font-bold tracking-widest text-primary mb-1">
                    TAGLINE
                  </p>
                  <p className="text-base text-gray-200 italic leading-relaxed max-w-2xl">
                    {displayTagline}
                  </p>
                </div>
              )}

              {/* Synopsis */}
              {displaySynopsis && (
                <div className="mb-5">
                  <p className="text-xs font-bold tracking-widest text-primary mb-1">
                    SYNOPSIS
                  </p>
                  <p className="text-gray-300 leading-relaxed max-w-2xl">
                    {displaySynopsis}
                  </p>
                </div>
              )}

              {/* Trailer */}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg mb-6 transition-colors"
                >
                  <PlayCircle size={20} /> Watch Trailer
                </a>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-5">
                <StatBox
                  title="STATUS"
                  value={project.status}
                  icon={<CheckCircle2 size={18} />}
                />
                <StatBox
                  title="RELEASE DATE"
                  value={project.release_date || project.year}
                  icon={<Calendar size={18} />}
                />
                <StatBox
                  title="COUNTRY"
                  value={project.country}
                  icon={<Globe2 size={18} />}
                />
                <StatBox
                  title="LANGUAGE"
                  value={project.language}
                  icon={<Clock size={18} />}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-8 border-b border-white/10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-white border-b-2 border-primary"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "cast"
                  ? "Cast & Crew"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ──────────────────────────────── */}
      <div className="container-custom px-4 md:px-8 py-8">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-6">
              {/* Development Phase */}
              <Panel title="DEVELOPMENT PHASE">
                <div className="flex items-start gap-0 relative overflow-x-auto pb-2">
                  {phases.map((phase, i) => (
                    <div
                      key={phase}
                      className="flex-1 flex flex-col items-center relative min-w-[80px]"
                    >
                      {i < phases.length - 1 && (
                        <div
                          className={`absolute top-5 left-1/2 w-full h-0.5 z-0 ${i < currentPhaseIndex ? "bg-primary" : "bg-white/10"}`}
                        />
                      )}
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 mb-2 ${
                          i === currentPhaseIndex
                            ? "border-primary bg-primary/20 text-primary"
                            : i < currentPhaseIndex
                              ? "border-primary bg-primary text-white"
                              : "border-white/20 bg-white/5 text-gray-500"
                        }`}
                      >
                        <CheckCircle2 size={18} />
                      </div>
                      <p
                        className={`text-xs text-center leading-tight px-1 ${i === currentPhaseIndex ? "text-primary font-bold" : "text-gray-500"}`}
                      >
                        {phase}
                      </p>
                      {i === currentPhaseIndex && (
                        <p className="text-xs text-gray-400 mt-0.5">Current</p>
                      )}
                    </div>
                  ))}
                </div>
              </Panel>

              {/* Awards */}
              {project.awards && project.awards.length > 0 && (
                <Panel title="AWARDS & FESTIVALS">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.awards.map((award) => (
                      <div
                        key={award.id}
                        className="border border-white/10 rounded-xl p-5 text-center bg-white/5"
                      >
                        <div className="text-4xl mb-3">🏆</div>
                        <p className="font-bold text-white mb-1 text-sm">
                          {award.festival_name}
                        </p>
                        {award.award_title && (
                          <p className="text-xs text-gray-400">
                            {award.award_title}
                          </p>
                        )}
                        {award.year && (
                          <p className="text-xs text-primary font-bold mt-2">
                            {award.year}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Panel>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {project.director && (
                <Panel title="DIRECTOR">
                  <PersonCard name={project.director} />
                </Panel>
              )}
              {project.producers && project.producers.length > 0 && (
                <Panel title="PRODUCERS">
                  {project.producers.map((p) => (
                    <PersonCard key={p.id} name={p.name} photo={p.photo} />
                  ))}
                </Panel>
              )}
            </aside>
            {project.cast_members && project.cast_members.length > 0 && (
              <div className="py-6">
                <h2 className="text-[#FFB800] uppercase tracking-[0.2em] font-bold mb-6 px-2">
                  Main Cast
                </h2>

                {/* បង្កើត Scroll បែបផ្តេកដែលមើលទៅទាក់ទាញ */}
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide px-2">
                  {project.cast_members.map((person) => (
                    <div
                      key={person.id}
                      className="flex-shrink-0 group w-[120px] md:w-[140px]"
                    >
                      {/* រូបភាពតួអង្គរាងបញ្ឈរ (Portrait) */}
                      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-2xl border border-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/50">
                        {person.photo ? (
                          <img
                            src={person.photo}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center font-bold text-3xl text-white/20">
                            {person.name?.charAt(0)}
                          </div>
                        )}

                        {/* Gradient បិទបាំងពីក្រោមរូបភាពដើម្បីឱ្យមើលអក្សរច្បាស់ */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* ព័ត៌មានឈ្មោះ */}
                      <div className="text-center">
                        <p className="font-semibold text-white text-sm md:text-base truncate">
                          {person.name}
                        </p>
                        {person.role_name && (
                          <p className="text-[10px] md:text-xs text-gray-400 font-light truncate mt-0.5">
                            {person.role_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CAST TAB */}
        {activeTab === "cast" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <Panel title="MAIN CAST">
              {project.cast_members && project.cast_members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.cast_members.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      {person.photo ? (
                        <img
                          src={person.photo}
                          alt={person.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary text-xl flex-shrink-0">
                          {person.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white">
                          {person.name}
                        </p>
                        {person.role_name && (
                          <p className="text-sm text-gray-400">
                            as {person.role_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No cast members added yet.</p>
              )}
            </Panel>

            <aside className="space-y-6">
              {project.director && (
                <Panel title="DIRECTOR">
                  <PersonCard name={project.director} />
                </Panel>
              )}
              {project.producers && project.producers.length > 0 && (
                <Panel title="PRODUCERS">
                  {project.producers.map((p) => (
                    <PersonCard key={p.id} name={p.name} photo={p.photo} />
                  ))}
                </Panel>
              )}
            </aside>
          </div>
        )}

        {/* AWARDS TAB */}
        {activeTab === "awards" && (
          <Panel title="AWARDS & FESTIVALS">
            {project.awards && project.awards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.awards.map((award) => (
                  <div
                    key={award.id}
                    className="border border-white/10 rounded-xl p-6 text-center bg-white/5"
                  >
                    <div className="text-5xl mb-4">🏆</div>
                    <p className="font-bold text-lg text-white mb-2">
                      {award.festival_name}
                    </p>
                    {award.award_title && (
                      <p className="text-gray-400">{award.award_title}</p>
                    )}
                    {award.year && (
                      <p className="text-primary font-bold mt-2">
                        {award.year}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No awards added yet.</p>
            )}
          </Panel>
        )}

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <Panel title="DETAILS">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <DetailRow label="Title" value={project.title} />
              {project.title_km && (
                <DetailRow label="Title (Khmer)" value={project.title_km} />
              )}
              <DetailRow label="Genre" value={project.genre} />
              <DetailRow label="Country" value={project.country} />
              <DetailRow label="Language" value={project.language} />
              <DetailRow
                label="Duration"
                value={project.duration ? `${project.duration} min` : null}
              />
              <DetailRow
                label="Release Date"
                value={project.release_date || project.year}
              />
              <DetailRow label="Status" value={project.status} />
              <DetailRow label="Director" value={project.director} />
              <DetailRow
                label="Rating"
                value={project.rating ? `${project.rating}/10` : null}
              />
            </dl>
          </Panel>
        )}
      </div>
    </div>
  );
};

// ── Helper Components ─────────────────────────────────────
const StatBox = ({ title, value, icon }) => (
  <div>
    <div className="text-primary mb-1">{icon}</div>
    <p className="text-xs font-bold tracking-widest text-primary mb-1">
      {title}
    </p>
    <p className="text-gray-200 text-sm">{value || "N/A"}</p>
  </div>
);

const Panel = ({ title, children }) => (
  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
    {title && (
      <h2 className="text-xs font-bold tracking-widest text-primary mb-5">
        {title}
      </h2>
    )}
    {children}
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
    <dt className="text-gray-500 text-sm">{label}</dt>
    <dd className="text-gray-200 text-sm text-right">{value || "—"}</dd>
  </div>
);

const PersonCard = ({ name, role, photo }) => (
  <div className="flex items-center gap-3 mb-3 last:mb-0">
    {photo ? (
      <img
        src={photo}
        alt={name}
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />
    ) : (
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary flex-shrink-0">
        {String(name).charAt(0).toUpperCase()}
      </div>
    )}
    <div>
      <p className="text-gray-200 font-semibold">{name}</p>
      {role && <p className="text-xs text-gray-500">as {role}</p>}
    </div>
  </div>
);

export default ProjectDetail;
