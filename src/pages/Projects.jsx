import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Filter, Play } from "lucide-react";
import { getAllProjects } from "../services/projectApi";

const translations = {
  en: {
    title: "Our Projects",
    subtitle: "Explore our portfolio of films and productions",
    all: "All",
    min: "min",
    view: "View Details",
    loading: "Loading projects...",
    empty: "No projects found.",
  },
  km: {
    title: "គម្រោងរបស់យើង",
    subtitle: "ស្វែងរកគម្រោងភាពយន្ត និងការផលិតរបស់យើង",
    all: "ទាំងអស់",
    min: "នាទី",
    view: "មើលព័ត៌មាន",
    loading: "កំពុងផ្ទុក...",
    empty: "រកមិនឃើញគម្រោងទេ។",
  },
};

const Projects = ({ language = "en" }) => {
  const t = translations[language];
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch from Laravel API ────────────────────────────
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // ── Genre filter ──────────────────────────────────────
  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        projects
          .map((p) => p.genre)
          .filter(Boolean)
      ),
    ];
    return [
      { key: "all", label: t.all },
      ...unique.map((name) => ({ key: name, label: name })),
    ];
  }, [projects, t.all]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.genre === activeFilter);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <div className="bg-gradient-to-r from-dark to-dark-light text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="heading-xl mb-4 animate-fade-in">{t.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="section-padding bg-gray-50 dark:bg-dark-light">
        <div className="container-custom">

          {/* Loading */}
          {loading && (
            <div className="text-center py-20 text-gray-400 text-xl">
              {t.loading}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-20 text-red-400 text-xl">
              {error}
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <>
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Filter className="text-primary" size={24} />
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveFilter(category.key)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      activeFilter === category.key
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white dark:bg-dark text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Empty */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-400 text-xl">
                  {t.empty}
                </div>
              )}

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="card animate-slide-up group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* ✅ ប្រើ project.slug — មិនមែន project.id */}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="relative overflow-hidden block cursor-pointer group"
                    >
                      <img
                        src={project.poster_image}
                        alt={
                          language === "km"
                            ? project.title_km || project.title
                            : project.title
                        }
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play
                          className="text-white w-16 h-16 opacity-80"
                          fill="currentColor"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.genre || "Film"}
                      </div>
                    </Link>

                    <div className="p-6">
                      {/* ✅ ប្រើ project.slug */}
                      <Link to={`/projects/${project.slug}`}>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {language === "km"
                            ? project.title_km || project.title
                            : project.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {language === "km"
                          ? project.short_description_km ||
                            project.short_description ||
                            project.tagline_km ||
                            project.tagline
                          : project.short_description || project.tagline}
                      </p>

                      <div className="flex items-center justify-between text-gray-500">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          <span>
                            {project.duration} {t.min}
                          </span>
                        </div>
                        {/* ✅ ប្រើ project.slug */}
                        <Link
                          to={`/projects/${project.slug}`}
                          className="text-primary font-bold hover:underline"
                        >
                          {t.view}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;