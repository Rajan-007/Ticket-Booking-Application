'use client'
import React from 'react';

// Primary Spinner Loader - Modern gradient spinner
export const SpinnerLoader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-indigo-500 border-r-indigo-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.75s' }}></div>
      </div>
    </div>
  );
};

// Pulse Loader - For content loading
export const PulseLoader = ({ className = '' }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

// Skeleton Loader - For content placeholders
export const SkeletonLoader = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`${width} ${height} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse ${className}`}></div>
  );
};

// Shimmer Loader - Advanced shimmer effect
export const ShimmerLoader = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
      <div className="h-full bg-gray-200"></div>
    </div>
  );
};

// Page Loader - Full page loading overlay
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <div className="relative">
        <div className="w-32 h-32 border-8 border-blue-500/20 rounded-full"></div>
        <div className="w-32 h-32 border-8 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin absolute top-0"></div>
        <div className="w-24 h-24 border-8 border-transparent border-t-indigo-400 border-r-indigo-400 rounded-full animate-spin absolute top-4 left-4" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      <p className="mt-8 text-xl font-semibold text-white animate-pulse">{message}</p>
    </div>
  );
};

// Button Loader - For button loading states
export const ButtonLoader = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

// Card Skeleton - For event cards
export const CardSkeleton = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 animate-pulse">
      <ShimmerLoader className="w-full h-48 rounded-xl mb-4" />
      <SkeletonLoader height="h-6" className="mb-2" />
      <SkeletonLoader width="w-3/4" height="h-4" className="mb-4" />
      <div className="space-y-2">
        <SkeletonLoader width="w-1/2" height="h-4" />
        <SkeletonLoader width="w-2/3" height="h-4" />
      </div>
    </div>
  );
};

// Default export for backward compatibility
const CustomLoader = () => {
  return <PageLoader />;
};

export default CustomLoader;