import React, { useEffect, useRef, useState } from 'react';

interface VideoScrollProps {
    scrollLength?: number; // Total scroll height for the animation
    videoSrc: string;
}

export const VideoScroll: React.FC<VideoScrollProps> = ({ scrollLength = 6000, videoSrc }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Load video metadata to get duration
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setIsVideoLoaded(true);
            video.pause();
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        if (video.readyState >= 1) {
            handleLoadedMetadata();
        }

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [videoSrc]);

    // Sync scroll to video time
    useEffect(() => {
        // If video not loaded, we can't get duration, so skip
        if (!isVideoLoaded) return;

        const handleScroll = () => {
            if (!containerRef.current || !videoRef.current) return;

            const video = videoRef.current;
            const duration = video.duration;

            if (!Number.isFinite(duration)) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollY = -containerRect.top;

            const totalScrollableHeight = (scrollLength - window.innerHeight);
            let progress = scrollY / totalScrollableHeight;

            progress = Math.max(0, Math.min(1, progress));

            // Calculate target time
            const targetTime = progress * duration;

            if (Number.isFinite(targetTime)) {
                // Direct update is usually smooth enough for scroll
                video.currentTime = targetTime;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial set

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVideoLoaded, scrollLength]);


    return (
        <div ref={containerRef} style={{ height: `${scrollLength}px` }} className="relative w-full">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
                {!isVideoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-50 z-50">
                        <div className="text-brand-900 text-2xl font-bold">
                            Loading Video...
                        </div>
                    </div>
                )}

                <video
                    ref={videoRef}
                    src={videoSrc}
                    playsInline
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ display: isVideoLoaded ? 'block' : 'none' }}
                />
            </div>
        </div>
    );
};
