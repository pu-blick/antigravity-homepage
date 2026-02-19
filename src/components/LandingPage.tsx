import React from 'react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
    return (
        <div className="relative">

            {/* 1. Hero Section (Fixed Video Background) */}
            {/* Parallax Effect: sticky position with z-0 implies content will scroll OVER it */}
            <div className="sticky top-0 h-screen w-full overflow-hidden -z-10 bg-black">
                <video
                    src="/video/v2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80" // Slight dim for text readability
                />

                {/* Hero Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-8xl font-bold text-brand-500 mb-6 drop-shadow-lg"
                    >
                        Nature's Vitality
                    </motion.h1>

                    {/* User Request: Second line text in WHITE */}
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-3xl text-white font-light tracking-wide w-full drop-shadow-md md:whitespace-nowrap"
                    >
                        Unlock your true potential with nature's best kept secret.
                    </motion.p>
                </div>

                {/* Scroll Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
                >
                    <span className="text-sm mb-2">SCROLL DOWN</span>
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-2 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>

            {/* 2. Scrollable Content (Covers the video) */}
            <div className="relative z-10 bg-brand-50 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] min-h-screen">

                {/* Section: First Image (Intro) */}
                <Section bg="bg-white">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">Pure & Natural Source</h2>
                            <p className="text-xl text-brand-700 leading-relaxed mb-6">
                                We harvest only the freshest ingredients from organic farms.
                                Every drop is packed with essential vitamins and minerals designed to
                                rejuvenate your body and mind.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-brand-800 font-medium">
                                <li>100% Organic Ingredients</li>
                                <li>No Artificial Preservatives</li>
                                <li>Sustainably Sourced</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* USER IMAGE 1 PLACEHOLDER */}
                            {/* User needs to save image as public/images/intro.jpg */}
                            <img
                                src="/images/v6.jpeg"
                                alt="Fresh Lemon and Broccoli"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/475569?text=Insert+Image+1';
                                }}
                            />
                        </motion.div>
                    </div>
                </Section>

                {/* Section: Benefits Cards */}
                <Section bg="bg-brand-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="lg:w-1/2 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="text-left mb-8"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">Why Choose Us?</h2>
                                    <p className="text-brand-700 text-lg">Experience the difference with our premium formula.</p>
                                </motion.div>
                                <div className="grid grid-cols-1 gap-4 flex-grow content-center">
                                    <FeatureItem title="Energy Boost" desc="Sustain energy all day long with natural extracts." delay={0} compact />
                                    <FeatureItem title="Immunity" desc="Fortify your body's defenses against daily stress." delay={0.2} compact />
                                    <FeatureItem title="Focus" desc="Sharpen your mind instantly for peak performance." delay={0.4} compact />
                                </div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl min-h-[300px] lg:min-h-auto"
                            >
                                <img
                                    src="/images/v5.png"
                                    alt="Why Choose Us"
                                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </motion.div>
                        </div>
                    </div>
                </Section>

                {/* Section: Second Image (Product Detail) */}
                <Section bg="bg-brand-900" textColor="text-brand-50">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <span className="text-brand-300 font-bold tracking-wider uppercase text-sm">Premium Selection</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-2">NMN Collagen Plus</h2>
                            <p className="text-xl text-brand-100 leading-relaxed mb-8">
                                Our flagship product combines the power of NMN and low-molecular collagen.
                                Designed for those who refuse to compromise on their health.
                            </p>
                            <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-brand-500/50">
                                View Product Details
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 w-full"
                        >
                            {/* USER IMAGE 2 PLACEHOLDER */}
                            {/* User needs to save image as public/images/product.jpg */}
                            <img
                                src="/images/v4.png"
                                alt="Product Bottle"
                                className="w-full rounded-xl shadow-2xl border-4 border-brand-800/50"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1e293b/cbd5e1?text=Insert+Image+2';
                                }}
                            />
                        </motion.div>
                    </div>
                </Section>

                {/* Section: Reviews */}
                <Section bg="bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-12">Verified Reviews</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <ReviewCard name="Sarah K." text="I've never felt more alive. This is a game changer!" />
                            <ReviewCard name="James D." text="The quality is unmatched. Better than anything else I've tried." />
                            <ReviewCard name="Michael R." text="Finally, a supplement that actually delivers on its promises." />
                        </div>
                    </div>
                </Section>

                {/* Section: CTA */}
                <Section bg="bg-brand-100">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-8">Start Your Journey Today</h2>
                        <p className="text-lg md:text-2xl text-brand-800 mb-10 md:whitespace-nowrap">Join thousands of satisfied customers who have transformed their health.</p>
                        <button className="bg-brand-600 hover:bg-brand-700 text-white text-xl md:text-2xl font-bold py-4 px-10 md:py-5 md:px-16 rounded-full shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
                            Order Now - $49.99
                        </button>
                    </motion.div>
                </Section>

                {/* Footer */}
                <div className="bg-brand-900 text-brand-200 py-12 text-center border-t border-brand-800">
                    <p className="mb-4 text-lg font-semibold">Nature's Vitality</p>
                    <p className="text-sm opacity-60">&copy; 2024 Nature's Vitality. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
};

// Helper Components

interface SectionProps {
    children: React.ReactNode;
    bg?: string;
    textColor?: string;
}

const Section: React.FC<SectionProps> = ({ children, bg = "bg-transparent", textColor = "" }) => {
    return (
        <div className={`relative w-full py-24 ${bg} ${textColor}`}>
            {children}
        </div>
    );
};

const FeatureItem = ({ title, desc, delay, compact = false }: { title: string, desc: string, delay: number, compact?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className={`bg-white ${compact ? 'p-6' : 'p-8'} rounded-2xl shadow-lg border border-brand-100 hover:-translate-y-2 transition-transform duration-300 flex items-start gap-5`}
    >
        <div className="shrink-0 w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-xl font-bold">
            {title[0]}
        </div>
        <div>
            <h3 className="text-2xl font-bold text-brand-900 mb-2">{title}</h3>
            <p className="text-brand-600 leading-relaxed">{desc}</p>
        </div>
    </motion.div>
);

const ReviewCard = ({ name, text }: { name: string, text: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-brand-50 p-8 rounded-2xl shadow-md text-left relative"
    >
        <div className="text-6xl text-brand-200 absolute top-4 left-4 font-serif">"</div>
        <p className="text-brand-800 text-lg italic mb-6 relative z-10">{text}</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-200 rounded-full"></div>
            <p className="text-brand-900 font-bold">- {name}</p>
        </div>
    </motion.div>
);
