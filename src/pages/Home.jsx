import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Vision from '../components/Vision';
import CTA from '../components/CTA';

const Home = ({ language }) => {
  return (
    <div>
      <Hero language={language} />
      <FeaturedProjects language={language} />
      <Vision language={language} />
      <CTA language={language} />
    </div>
  );
};

export default Home;
