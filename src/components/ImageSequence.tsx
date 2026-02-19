import React, { useEffect, useRef, useState } from 'react';

interface ImageSequenceProps {
    scrollLength?: number; // Total scroll height for the animation
}

const FRAME_COUNT = 200;

export const ImageSequence: React.FC<ImageSequenceProps> = ({ scrollLength = 6000 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];
        const imagePromises: Promise<void>[] = [];

        // Filenames are typically ezgif-frame-001.jpg to ezgif-frame-200.jpg
        // Need to pad numbers with zeros

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const padIndex = i.toString().padStart(3, '0');
            const src = `/sequence/ezgif-frame-${padIndex}.jpg`;

            const promise = new Promise<void>((resolve) => {
                img.onload = () => {
                    loadedCount++;
                    setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${src}`);
                    // Resolve anyway to not break the chain, but might show gaps
                    resolve();
                };
            });

            img.src = src;
            loadedImages[i - 1] = img; // Store in order
            imagePromises.push(promise);
        }

        Promise.all(imagePromises).then(() => {
            setImages(loadedImages);
            setIsLoaded(true);
        });
    }, []);

    // Handle Scroll and Draw
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d', { alpha: false }); // Optimize by disabling alpha if not needed

        if (!canvas || !context) return;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        // Set canvas dimensions to match window (or container)
        // For high DPI screens
        const updateDimensions = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            // Adjust canvas styling to match window dimensions visually
            // but the internal buffer is higher resolution
            // Note: Use style prop on the canvas tag or CSS for visual size, 
            // but since we are position fixed/absolute full screen, just setting internal width/height is enough 
            // IF we ensure the context scales? No, we just draw to the larger buffer.

            // We need to pass the larger dimensions to drawImageProp
            const initialImg = images[0];
            if (initialImg) drawImageProp(context, initialImg, 0, 0, canvas.width, canvas.height);
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const scrollY = -containerRect.top; // How far we've scrolled into the container

            // Calculate active frame
            // We want the animation to play over 'scrollLength' pixels
            // Start when container top hits 0 (or is visible)
            // For sticky, the container is usually very tall.

            // Example: Container is 6000px tall. Sticky window is 100vh.
            // Progress 0 to 1
            const totalScrollableHeight = (scrollLength - window.innerHeight);
            let progress = scrollY / totalScrollableHeight;

            progress = Math.max(0, Math.min(1, progress));

            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * FRAME_COUNT)
            );

            const img = images[frameIndex];
            if (img) {
                requestAnimationFrame(() => {
                    drawImageProp(context, img, 0, 0, canvas.width, canvas.height);
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial draw

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoaded, images, scrollLength]);


    // Helper to cover/contain image in canvas
    function drawImageProp(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, offsetX?: number, offsetY?: number) {
        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    return (
        <div ref={containerRef} style={{ height: `${scrollLength}px` }} className="relative w-full">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-50 z-50">
                        <div className="text-brand-900 text-2xl font-bold">
                            Loading... {loadingProgress}%
                        </div>
                    </div>
                )}
                <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} className="block object-cover" />
            </div>
        </div>
    );
};
