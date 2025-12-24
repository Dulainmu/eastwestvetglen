

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "backOut" as const }
    }
};

export const hover3D = {
    rest: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
    },
    hover: {
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
        z: 20,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
        transition: { duration: 0.4, ease: "easeOut" as const }
    }
};
