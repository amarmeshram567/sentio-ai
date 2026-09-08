import React from 'react';


import CustomCursor from '../components/landing-pages/CustomCursor.jsx'
import Navbar from '../components/landing-pages/Navbar.jsx'
import Hero from '../components/landing-pages/Hero.jsx'
import TrustIndicators from '../components/landing-pages/TrustIndicators.jsx'
import Introduction from '../components/landing-pages/Introduction.jsx'
import Capabilities from '../components/landing-pages/Capabilities.jsx'
import WorkspaceShowcase from '../components/landing-pages/WorkspaceShowcase.jsx'
import ModelSection from '../components/landing-pages/ModelSection.jsx'
import ThinkTogether from '../components/landing-pages/ThinkTogether.jsx'
import HumanCentered from '../components/landing-pages/HumanCentered.jsx'
import UseCases from '../components/landing-pages/UseCases.jsx'
import Security from '../components/landing-pages/Security.jsx'
import PerformanceStats from '../components/landing-pages/PerformanceStats.jsx'
import Testimonials from '../components/landing-pages/Testimonials.jsx'
import Pricing from '../components/landing-pages/Pricing.jsx'
import FAQ from '../components/landing-pages/FAQ.jsx'
import FinalCTA from '../components/landing-pages/FinalCTA.jsx'
import Footer from '../components/landing-pages/Footer.jsx'


const Home = () => {
    return (
        <div className="relative bg-obsidian-950 text-silver-200 selection:bg-core-violet/30">
            <CustomCursor />
            <Navbar />
            <main>
                <Hero />
                <TrustIndicators />
                <Introduction />
                <Capabilities />
                <WorkspaceShowcase />
                <ModelSection />
                <ThinkTogether />
                <HumanCentered />
                <div id="resources">
                    <UseCases />
                </div>
                <Security />
                <PerformanceStats />
                <Testimonials />
                <Pricing />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    )
}

export default Home;
