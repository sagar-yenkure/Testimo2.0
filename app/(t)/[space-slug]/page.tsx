import { TestimonialForm } from '@/components/testimonial-form'
import React from 'react'

const page = () => {

    return (
        <TestimonialForm formData={{
            collectionName: 'Testimo',
            logo: null,
            brandName: 'Testimo',
            formTitle: 'Testimonial Form',
            description: 'This is a testimonial form',
            collectStarRatings: true,
            collectCompany: false,
            collectEmail: false,
            collectUserRole: false,
            collectSocialLink: false,
            language: 'English',
            theme: 'light',
            bgPattern: 'none',
            fontFamily: 'Inter',
            accentColor: '#2D6CFF',
            consent: 'I agree to the terms and conditions',
            showConsent: true,
        }} />
    )
}

export default page