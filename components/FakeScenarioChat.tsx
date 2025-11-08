"use client";

import { useState, useEffect, useRef } from 'react';
import { config } from '@/src/config/landingPageConfig';

// الأيقونات المضمنة كـ SVG
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-3 my-4 animate-fade-in">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <BotIcon />
    </div>
    <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-1">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-short"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-short delay-150"></span>
      <span className
