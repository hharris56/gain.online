"use client"

import { useState, useCallback, useEffect } from 'react';

const useIsMobile = () => {

    const width = 650
    const [targetReached, setTargetReached] = useState(true);

    const updateTarget = useCallback((e: any) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addListener(updateTarget);

        // Check on mount (callback is not called until a change occurs)
        if (!media.matches) {
            setTargetReached(false);
        }

        return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
};

const isMobileFn = () => {
    const width = 650
    const media = window.matchMedia(`(max-width: ${width}px)`)
    return media.matches
}

export { useIsMobile, isMobileFn };