
if (!process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN) {
    throw new Error("NEXT_PUBLIC_AWS_DISTRIBUTION_CDN is not defined");
}

export const config = {
    public: {
        logo_light: `${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN}/public/icon_light.png`,
        logo_dark: `${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN}/public/icon_dark.png`,
        logo_moto_dark: `${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN}/public/logo_moto_dark.png`,
        logo_moto_light: `${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN}/public/logo_moto_light.png`,
        opengraph_image: `${process.env.NEXT_PUBLIC_AWS_DISTRIBUTION_CDN}/public/opengraph.png`,
    }
}