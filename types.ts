// Fix: Import React to resolve the namespace issue for ReactNode
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PricingPlanProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  image: string;
}
